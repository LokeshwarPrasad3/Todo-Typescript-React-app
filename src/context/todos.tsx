import {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export type TodosProviderProps = {
  children: ReactNode; // ReactNode represents the children elements that this component can wrap.
};

export type Todo = {
  id: string; // A unique identifier for each todo item.
  task: string; // A description of the todo task.
  completed: boolean; // Indicates whether the todo task is completed or not.
  createdAt: Date; // The date and time when the todo task was created.
};

export type TodosContext = {
  todos: Todo[]; // An array of todo items.
  handleAddToDo: (task: string) => void; // A function to add a new todo item.
  toggleTodoAsCompleted: (id: string) => void; // A function to toggle a todo's completion status.
  handleDeleteTodo: (id: string) => void; // A function to delete a todo item by its ID.
};


// Create a context to provide and consume todos data
// eslint-disable-next-line
export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: TodosProviderProps) => {
  // Initialize todos state from local storage or an empty array
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      // Attempt to load todos from local storage; otherwise, initialize as an empty array
      return JSON.parse(localStorage.getItem("todos") || "[]") as Todo[];
    } catch (error) {
      // Handle errors during initialization, such as invalid JSON data
      console.error("Error loading todos from local storage:", error);
      return [];
    }
});

  // Function to save todos to local storage
  const saveTodosToLocalStorage = (newTodos: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(newTodos));
  };

  // Function to update todos with a modifier function
  const updateTodos = (modifier: (prev: Todo[]) => Todo[]) => {
    setTodos((prev) => {
        // Modify the previous todos using the provided modifier function
      const newTodos = modifier(prev);

      // Save the updated todos to local storage
      saveTodosToLocalStorage(newTodos);

      return newTodos;
    });
  };

  // Function to add a new todo
  const handleAddToDo = (task: string) => {
    updateTodos((prev) => [
      {
        id: Math.random().toString(), // Generate a unique ID for the new todo
        task: task,
        completed: false,
        createdAt: new Date(),
      },
      ...prev,
    ]);
  };

  // Function to delete a todo by ID
  const handleDeleteTodo = (id: string) => {
    updateTodos((prev) => prev.filter((todo) => id !== todo.id));
  };

  // Function to toggle a todo's completed status
  const toggleTodoAsCompleted = (id: string) => {
    updateTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Use an effect to save todos to local storage when the state changes
  useEffect(() => {
      saveTodosToLocalStorage(todos);
    }, [todos]);

  return (
    // Provide todos data to the context
    <todosContext.Provider
      value={{
          todos,
        handleAddToDo,
        toggleTodoAsCompleted,
        handleDeleteTodo,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

// Create a custom hook for consuming the todos context
// eslint-disable-next-line
export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
      // Throw an error if useTodos is used outside of the TodosProvider context
    throw new Error("useTodos used outside of provider");
  }
  return todosConsumer;
};
