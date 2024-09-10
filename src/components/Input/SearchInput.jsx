import { Search } from "lucide-react";
import React from "react";

const SearchInput = ({ ...rest }) => {
  return (
    <div className="relative w-full">
      <Search className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
      <input
        type="search"
        className="block w-full px-3 py-2 text-gray-100 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
