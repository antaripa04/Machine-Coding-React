import { useState } from "react";

export const StarRating = () => {
  let arr = new Array(5).fill(0);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="font-bold text-3xl text-center">
        <div className="mb-4">Star Rating</div>
        <div className="mb-3">
          {arr.map((currentValue, index) => (
            <span key={index} onClick={() => setRating(index + 1)} onMouseEnter={() => setHover(index + 1)} onMouseLeave={() => setHover(0)} className={`cursor-pointer ${(hover === 0 && rating > index) || hover > index ? "text-amber-400" : ""}`}>
              &#9733;
            </span>
          ))}
        </div>
        <div className="font-normal text-2xl">{rating}/5</div>
      </div>
    </div>
  );
};
