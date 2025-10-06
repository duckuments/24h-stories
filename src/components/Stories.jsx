import { useState, useEffect, useRef } from 'react';
import useData from '../data/useData';

const Stories = () => {
  const { myStories, removeStory } = useData();

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const [timeLeft, setTimeLeft] = useState(3);  // countdown from 3 seconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const CloseModalButton = useRef(null)

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.min((elapsed / 3000) * 100, 100);
        setProgress(newProgress);

        if (elapsed >= 3000) {
          clearInterval(intervalRef.current);
          if (currentStoryIndex < myStories.length - 1) {
            setCurrentStoryIndex((prev) => prev + 1);
            setProgress(0);
          } else {
            setIsRunning(false);
            CloseModalButton.current?.click();
          }
        }
      }, 50); // Update every 50ms for smooth animation
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, currentStoryIndex]);


  const handleOpenStory = (index) => {
    setCurrentStoryIndex(index)
    setProgress(0);  // Reset progress to 0
    document.getElementById("story_modal").showModal();
    if (timeLeft === 0) {
      setTimeLeft(3);    // reset timer if it ended
    }
    setIsRunning(true);
  }

  const handleClickNext = () => {
    if (currentStoryIndex === myStories.length - 1) {
      CloseModalButton.current.click()
    } else {
      setTimeLeft(3)
      setCurrentStoryIndex(currentStoryIndex + 1)
      setProgress(0);  // Reset progress for new story
    }
  }

  const handleClickPrev = () => {
    if (currentStoryIndex === 0) {
      setCurrentStoryIndex(myStories.length - 1);
    } else {
      setTimeLeft(3)
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
    setProgress(0);  // Reset progress for new story
  }

  const handleDelete = () => {
    if (myStories.length > 0) {
      removeStory(myStories[currentStoryIndex].id);
      setCurrentStoryIndex((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };

  return (
    <div className="flex min-w-fit flex-row gap-3 overflow-hidden overscroll-x-auto items-center">
      {myStories.map((story, index) => (
        <div key={story.id} className="relative">
          <button className="w-20" type="button" onClick={() => handleOpenStory(index)}>
            <img
              className="mask mask-circle w-20"
              src={story.url}
              alt="Story"
            />
          </button>
        </div>
      ))
      }
      <dialog id="story_modal" className="modal">
        <div className="modal-box">
          <div className="flex mb-5 gap-1">
            {myStories.map((item, index) => {
              return <progress key={item.id} className="progress w-full" value={index === currentStoryIndex ? progress : (index < currentStoryIndex ? 100 : 0)} max="100"></progress>
            })}
          </div>
          <img
            className="w-full rounded-xl"
            src={myStories[currentStoryIndex]?.url} />
          <div className="join mt-5 w-full justify-center">
            <button className="btn join-item" onClick={handleClickPrev}>{"<"}</button>
            <button className="btn join-item" onClick={() => handleDelete()}>x</button>
            <button className="btn join-item" onClick={handleClickNext}>{">"}</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button ref={CloseModalButton}>close</button>
        </form>
      </dialog>

    </div >
  );
};

export default Stories;
