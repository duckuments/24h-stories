
const Stories = () => {
  return (
    <div className="flex min-w-fit flex-row gap-3 overflow-hidden overscroll-x-auto items-center">
      <button className="w-20" type="button" onClick={() => document.getElementById('my_modal_2').showModal()}>
        <img
          className="mask mask-circle w-20"
          src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" />
      </button>

      <button className="w-20" type="button" onClick={() => document.getElementById('my_modal_2').showModal()}>
        <img
          className="mask mask-circle w-20"
          src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" />
      </button>

      <button className="w-20" type="button" onClick={() => document.getElementById('my_modal_2').showModal()}>
        <img
          className="mask mask-circle w-20"
          src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" />
      </button>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <div className="flex mb-5 gap-1">
            <progress className="progress w-full" value="50" max="100"></progress>
            <progress className="progress w-full" value="0" max="100"></progress>
            <progress className="progress w-full" value="0" max="100"></progress>
          </div>
          <img
            className="w-full rounded-xl"
            src="https://img.daisyui.com/images/stock/photo-1567653418876-5bb0e566e1c2.webp" />
          <div className="join mt-5 w-full justify-center">
            <button className="btn join-item">{"<"}</button>
            <button className="btn join-item">delete</button>
            <button className="btn join-item">{">"}</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  )
}
export default Stories
