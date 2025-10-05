const initDB = () => {

  let db;

  const request = indexedDB.open("stories");

  request.onerror(() => {
    console.log("something went wrong")
  })

  request.onsuccess((e) => {
    db = e.target.request;
    console.log("db init success")
  })

  db.createObjectStore("stories", { autoIncrement: true });
  return db;
}

const addStory = (db, image) => {

  // TODO : save time of upload file for remove every 23h

  const request = db
    .transaction(["stories"], "readwrite")
    .objectStore("stories")
    .add(image)

  request.onsuccess = (event) => {
    console.log("image saved")
  };
}


const removeStory = (db, image) => {

  const request = db
    .transaction(["stories"], "readwrite")
    .objectStore("stories")
    .delete(image)

  request.onsuccess = () => {
    console.log("image removed")
  };
}


const getStories = (db, image) => {

  // TODO : make get-all and get-one function 

  const request = db
    .transaction(["stories"], "readwrite")
    .objectStore("stories")
    .delete(image)

  request.onsuccess = () => {
    console.log("get all stories")
  };
}

export { addStory, removeStory, getStories, initDB }
