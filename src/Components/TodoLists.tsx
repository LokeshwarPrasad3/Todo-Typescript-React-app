import React, { useEffect, useState } from "react";
import { useTodos } from "../context/todos";
import { useSearchParams } from "react-router-dom";

const Todos = () => {
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();

  const [searchParams] = useSearchParams();
  const todosData = searchParams.get("todos");

  const [filterData, setFilterData] = useState(todos);

  useEffect(() => {
    let filteredTodos = todos;

    if (todosData === "active") {
      filteredTodos = todos.filter((task) => !task.completed);
    } else if (todosData === "completed") {
      filteredTodos = todos.filter((task) => task.completed);
    }

    setFilterData(filteredTodos);
  }, [todos, todosData]);

  return (
    <>
      <ul className="flex flex-col font-overpass mt-8 gap-2 text-black">
        <h1 className="text-center text-white text-xl font-overpass">
          Your Todo-List Visible Here
        </h1>
        {filterData.map((todo) => (
          <React.Fragment key={todo.id}>
            <li className="bg-slate-400 min-w-[24rem] flex items-center rounded-md justify-between px-3 h-11">
              <div className="showdata flex items-center justify-center h-full gap-2">
                <input
                  type="checkbox"
                  name=""
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => toggleTodoAsCompleted(todo.id)}
                  // Toggle todo completion status.
                />
                <label className={`text-lg ${!todo.completed?'text':'line-through'} `} htmlFor={`todo-${todo.id}`}>
                  {todo.task}
                </label>
              </div>

              {todo.completed && (
                <button
                  type="button"
                  className="button h-8 bg-red-400 hover:bg-red-500"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  Delete
                </button>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </>
  );
};

export default Todos;
