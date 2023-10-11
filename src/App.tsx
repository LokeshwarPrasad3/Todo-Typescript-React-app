import AddToDo from "./Components/AddToDo"
import FilterHeading from "./Components/FilterHeading.tsx"
import Todos from './Components/TodoLists.tsx'

function App() {

  return (
    <>
     <main className="flex mt-8 flex-col justify-center items-center m-auto w-[25rem]" >
      <h1 className="mb-8 font-semibold font-overpass bg-green-300 px-3 rounded py-1 text-center h-9 text-gray-700 text-2xl" >TODO APP REACT + TYPESCRIPT</h1>
      <FilterHeading />
      <AddToDo />
      <Todos />
     </main>
    </>
  )
}

export default App
