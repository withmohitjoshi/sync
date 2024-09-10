import React from "react";

const Avatar = ({ name }) => {
  return (
    <div className="w-full h-full rounded-full bg-gray-600 flex items-center justify-center text-gray-300 text-xl uppercase">
      {name?.[0] || "U"}
    </div>
  );
};

export default Avatar;
