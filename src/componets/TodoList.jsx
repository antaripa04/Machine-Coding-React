import { useState } from "react";

export const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");

  // Add a new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: inputValue,
          completed: false,
        },
      ]);
      setInputValue("");
    }
  };

  // Toggle todo completion status
  const toggleTodo = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter todos based on selected filter
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // Count active todos
  const activeTodoCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center py-6 bg-blue-500 text-white">Todo App</h1>

        <div className="p-6">
          {/* Todo Input Form */}
          <form onSubmit={addTodo} className="mb-6">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Add
              </button>
            </div>
          </form>

          {/* Todo List */}
          <ul className="divide-y divide-gray-200">
            {filteredTodos.map((todo) => (
              <li key={todo.id} className="py-3 flex items-center">
                <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="h-5 w-5 text-blue-500 rounded focus:ring-blue-400" />
                <span className={`ml-3 flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}>{todo.text}</span>
                <button onClick={() => deleteTodo(todo.id)} className="ml-2 text-red-500 hover:text-red-700" aria-label="Delete todo">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* Todo Status and Filters */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>
              {activeTodoCount} {activeTodoCount === 1 ? "item" : "items"} left
            </span>

            <div className="flex space-x-2">
              <button onClick={() => setFilter("all")} className={`px-2 py-1 rounded ${filter === "all" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}>
                All
              </button>
              <button onClick={() => setFilter("active")} className={`px-2 py-1 rounded ${filter === "active" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}>
                Active
              </button>
              <button onClick={() => setFilter("completed")} className={`px-2 py-1 rounded ${filter === "completed" ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"}`}>
                Completed
              </button>
            </div>

            <button onClick={clearCompleted} className="hover:underline">
              Clear completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
