import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useTodos } from "../context/todos";

const FilterHeading = () => {
  const { todos } = useTodos(); // Access the todos data using the useTodos hook.

  const [showAll, setShowAll] = useState(false); // State variable to track if "All" filter is active.
  const [showCompleted, setShowCompleted] = useState(false); // State variable to track if "Completed" filter is active.
  const [showActive, setShowActive] = useState(false); // State variable to track if "Active" filter is active.

  const [searchParams] = useSearchParams(); // Access query parameters from the URL.

  useEffect(() => {
    // Use an effect to determine the active filter based on URL parameters.
    const paramsData = searchParams.get("todos"); // Get the "todos" query parameter from the URL.
    if (paramsData === "completed") {
      setShowCompleted(true);
      setShowAll(false);
      setShowActive(false);
    } else if (paramsData === "active") {
      setShowActive(true);
      setShowAll(false);
      setShowCompleted(false);
    } else {
      setShowAll(true);
      setShowCompleted(false);
      setShowActive(false);
    }
  }, [todos, searchParams]);

  return (
    <>
      <nav className="text-white font-overpass font-medium flex items-center justify-between px-6 text-xl w-full">
        <div className={`selected transition-all duration-300 flex flex-col justify-center ${showAll?'bg-slate-400':''} rounded px-2 py-1 min-w-[6rem] text-center`}>
          <Link
            to="/"
            className={`px-1 font-semibold ${
              showAll ? "text-white" : "text-green-600"
            }`}
          >
            All
          </Link>
          {showAll && <hr className="transition-all duration-300 relative" />}
        </div>
        <div className={`selected transition-all duration-300 flex flex-col justify-center ${showActive?'bg-slate-400':''} rounded px-2 py-1 min-w-[6rem] text-center`}>
          <Link
            to="/?todos=active"
            className={`px-1 font-semibold ${
              showActive ? "" : "text-green-600"
            }`}
          >
            Active
          </Link>
          {showActive && (
            <hr className="transition-all duration-300 relative" />
          )}
        </div>
        <div className={`selected transition-all duration-300 flex flex-col justify-center ${showCompleted?'bg-slate-400':''} rounded px-2 py-1 min-w-[6rem] text-center`}>
          <Link
            to="/?todos=completed"
            className={`px-1 font-semibold ${
              showCompleted ? "" : "text-green-600"
            }`}
          >
            Completed
          </Link>
          {showCompleted && (
            <hr className="transition-all duration-300 relative" />
          )}
        </div>
      </nav>
    </>
  );
};

export default FilterHeading;
