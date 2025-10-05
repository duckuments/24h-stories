import { useState, useRef } from 'react'


const AddButton = () => {
  const inputFileRef = useRef(null)

  const handleClick = () => {
    inputFileRef.current.click();
  }

  return (
    <div>
      <input type="file" name="inputFile" accept="image/*" className="hidden" ref={inputFileRef} />
      <button type="button" className='btn btn-outline btn-primary w-20 h-20 rounded-full p-5 text-4xl' onClick={handleClick}>+</button>
    </div>
  )
}
export default AddButton
