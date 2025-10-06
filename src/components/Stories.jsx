import { useState, useEffect, useRef } from 'react';
import useData from '../data/useData';

const Stories = () => {
  const { myStories, removeStory } = useData();

  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const CloseModalButton = useRef(null)

  // TODO : fix timer life cycle - fix duble Increment for currentStoryIndex

  useEffect(() => {
    console.log(currentStoryIndex)
  }, [currentStoryIndex])


  useEffect(() => {
    if (myStories.length === 0) return;
    setProgress(0)

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStoryIndex === myStories.length - 1) {
            CloseModalButton.current?.click();
          } else {
            setCurrentStoryIndex((prevIndex) => (prevIndex + 1));
          }
          return 0;
        }
        return prev + (100 / 30); // Assuming 30 steps for 3 seconds
      });
    }, 100); // Update every 100ms

    return () => clearInterval(timer);
  }, [currentStoryIndex, myStories.length]);

  const handleOpenStory = (index) => {
    setCurrentStoryIndex(index)
    document.getElementById("story_modal").showModal();
  }

  const handleClickNext = () => {
    if (currentStoryIndex === myStories.length - 1) {
      CloseModalButton.current.click()
    } else {
      setCurrentStoryIndex(currentStoryIndex + 1)
    }
  }

  const handleClickPrev = () => {
    if (currentStoryIndex === 0) {
      setCurrentStoryIndex(myStories.length - 1);
    } else {
      setCurrentStoryIndex(currentStoryIndex - 1)
    }
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
