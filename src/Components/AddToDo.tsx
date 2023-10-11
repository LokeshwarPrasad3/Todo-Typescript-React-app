import { useState, FormEvent } from "react"; // Import useState and FormEvent from React.
import { useTodos } from "../context/todos"; // Import the useTodos hook from the context/todos.

const AddToDo = () => {
  const [todo, setTodo] = useState(""); // Create a state variable 'todo' and a function 'setTodo' to manage the todo input value.
  const { handleAddToDo } = useTodos(); // Use the useTodos hook to access the 'handleAddToDo' function from the context.

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior.
    handleAddToDo(todo); // Call the 'handleAddToDo' function to add the todo.
    setTodo(""); // Clear the todo input field.
  };

  return (
    <>
      <form
        onSubmit={handleFormSubmit}
        className="flex justify-center items-center gap-1 mt-6"
      >
        <input
          className="rounded-sm min-w-[21rem] h-10 font-overpass placeholder:font-overpass focus:outline-none px-3 text-lg"
          type="text"
          name=""
          value={todo}
          onChange={(e) => setTodo(e.target.value)} // Update the 'todo' state as the user types.
          placeholder="Add Your List Here"
        />
        <button
          type="submit"
          className="add_button bg-blue-400 hover:bg-blue-500 transition-all duration-300 px-2 h-10 text-xl font-signika "
        >
          Add
        </button>
      </form>
    </>
  );
};

export default AddToDo; // Export the AddToDo component.
