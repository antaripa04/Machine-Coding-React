import { useState } from "react";

export const ColorBoxes = () => {
  const [colors, setColors] = useState(["#b1dcc5", "#d8289c", "#d72540"]);
  const [selectedColor, setSelectedColor] = useState("#d28989");
  const addColor = (e) => {
    e.preventDefault();
    if (!colors.includes(selectedColor)) {
      setColors((prev) => [...prev, selectedColor]);
    }
  };
  return (
    <div className="">
      <form onSubmit={addColor} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <input type="color" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="w-12 h-12 cursor-pointer" />
          <span className="font-mono font-bold p-2 rounded bg-white shadow-inner" style={{ color: selectedColor }}>
            {selectedColor}
          </span>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Color
        </button>
      </form>
      <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {colors.map((color, index) => (
          <div key={index} className="size-40 relative rounded" style={{ backgroundColor: color }}>
            <button
              onClick={() => setColors((prev) => prev.filter((_, i) => i !== index))}
              className="absolute top-0 right-2 p-1 text-white font-bold cursor-pointer hover:text-gray-200 active:text-gray-300"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
