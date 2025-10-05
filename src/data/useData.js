import { useState, useEffect, useCallback } from 'react';

const useData = () => {
  const [myStories, setStories] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const initDB = () => {
      const request = indexedDB.open("myStories", 10);

      request.onerror = () => console.error("Failed to open IndexedDB");

      request.onsuccess = (e) => {
        setDb(e.target.result);
        loadStories(e.target.result);
      };

      request.onupgradeneeded = (e) => {
        e.target.result.createObjectStore("myStories", { autoIncrement: true });
      };
    };

    initDB();
  }, []);

  const loadStories = useCallback((dbInstance) => {
    const transaction = dbInstance.transaction(["myStories"], "readonly");
    const store = transaction.objectStore("myStories");
    const storiesWithUrls = [];
    const request = store.openCursor();

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        storiesWithUrls.push({
          id: cursor.key,
          url: URL.createObjectURL(cursor.value.data),
          timestamp: cursor.value.timestamp || Date.now()
        });
        cursor.continue();
      } else {
        setStories(storiesWithUrls);
      }
    };

    request.onerror = () => console.error("Failed to load stories");
  }, []);

  const addStory = useCallback((file) => {
    if (!db || !file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: file.type });
      const transaction = db.transaction(["myStories"], "readwrite");
      const store = transaction.objectStore("myStories");
      const storyData = {
        data: blob,
        timestamp: Date.now()
      };
      store.add(storyData);

      transaction.oncomplete = () => {
        loadStories(db);
      };

      transaction.onerror = () => console.error("Failed to add story");
    };
    reader.readAsArrayBuffer(file);
  }, [db, loadStories]);

  const removeStory = useCallback((id) => {
    if (!db) return;

    const transaction = db.transaction(["myStories"], "readwrite");
    const store = transaction.objectStore("myStories");
    store.delete(id);

    transaction.oncomplete = () => {
      loadStories(db);
    };

    transaction.onerror = () => console.error("Failed to remove story");
  }, [db, loadStories]);

  // Optional: Clean up old myStories (e.g., older than 23 hours)
  const cleanupOldStories = useCallback(() => {
    if (!db) return;

    const cutoff = Date.now() - (23 * 60 * 60 * 1000); // 23 hours ago
    const transaction = db.transaction(["myStories"], "readwrite");
    const store = transaction.objectStore("myStories");
    const request = store.openCursor();

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        if (cursor.value.timestamp < cutoff) {
          cursor.delete();
        }
        cursor.continue();
      }
    };

    transaction.oncomplete = () => {
      loadStories(db);
    };
  }, [db, loadStories]);

  useEffect(() => {
    if (db) {
      cleanupOldStories();
    }
  }, [db, cleanupOldStories]);

  return { myStories, addStory, removeStory, cleanupOldStories };
};

export default useData;
