import { CircleUserRound, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

const Header = ({ toggleOpenSearchUserModal }) => {
  return (
    <div className="p-4 flex justify-between items-center bg-gray-800">
      <h1 className="text-3xl font-bold text-gray-100">Sync</h1>
      <div className="text-gray-100 flex gap-8 [&>*]:cursor-pointer">
        <Search size={20} onClick={toggleOpenSearchUserModal}/>
        <Link href={"/myaccount"}>
          <CircleUserRound size={20} />
        </Link>
      </div>
    </div>
  );
};

export default Header;
