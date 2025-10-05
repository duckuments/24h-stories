import useData from '../data/useData';

const Stories = () => {
  const { myStories, removeStory } = useData();

  const handleDelete = (id) => {
    removeStory(id);
  };

  return (
    <div className="flex min-w-fit flex-row gap-3 overflow-hidden overscroll-x-auto items-center">
      {myStories.map((story) => (
        <div key={story.id} className="relative">
          <button className="w-20" type="button" onClick={() => document.getElementById(`story_modal_${story.id}`).showModal()}>
            <img
              className="mask mask-circle w-20"
              src={story.url}
              alt="Story"
            />
          </button>
          <dialog id={`story_modal_${story.id}`} className="modal">
            <div className="modal-box">
              <div className="flex mb-5 gap-1">
                {myStories.map((item) => {
                  return <progress className="progress w-full" value="50" max="100"></progress>
                })}
              </div>
              <img
                className="w-full rounded-xl"
                src={story.url} />
              <div className="join mt-5 w-full justify-center">
                <button className="btn join-item">{"<"}</button>
                <button className="btn join-item" onClick={() => handleDelete(story.id)}>x</button>
                <button className="btn join-item">{">"}</button>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      ))}

    </div>
  );
};

export default Stories;
