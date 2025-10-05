import { useRef } from 'react';
import useData from '../data/useData';

const AddButton = () => {
  const inputFileRef = useRef(null);
  const { addStory } = useData();

  const handleClick = () => {
    inputFileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      addStory(file);
      // Reset the input
      e.target.value = '';
    }
  };

  return (
    <div>
      <input
        type="file"
        name="inputFile"
        accept="image/*"
        className="hidden"
        ref={inputFileRef}
        onChange={handleFileChange}
      />
      <button
        type="button"
        className="btn btn-outline btn-primary w-20 h-20 rounded-full p-5 text-4xl"
        onClick={handleClick}
      >
        +
      </button>
    </div>
  );
};

export default AddButton;
