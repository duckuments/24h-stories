import AddButton from "./components/AddButton"
import Stories from "./components/Stories"

function App() {
  return (
    <div className="min-w-fit py-10">
      <h1 className="font-bold capitalize text-4xl px-10 mb-9">Stories</h1>
      <div className='flex min-w-fit flex-row gap-6 px-10 py-4 bg-base-200'>
        <AddButton />
        <Stories />
      </div>
    </div>
  )
}

export default App
