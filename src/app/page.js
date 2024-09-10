"use client";
import { useState } from "react";
import Header from "./components/Header";
import SearchUserModal from "./components/SearchUserModal";

export default function Home() {
  const [query, setQuery] = useState("");
  const [openSearchUserModal, setOpenSearchUserModal] = useState(false);
  
  const toggleOpenSearchUserModal = () => setOpenSearchUserModal((p) => !p);
  return (
    <div>
      <Header toggleOpenSearchUserModal={toggleOpenSearchUserModal} />
      <SearchUserModal
        isOpen={openSearchUserModal}
        onClose={toggleOpenSearchUserModal}
      />
    </div>
  );
}

/* <button
onClick={() => {
  for (let i = 1; i <= 78; i++) {
    // fetch("api/auth/fakesignup", {
    //   body: JSON.stringify({
    //     username: `demo${i}`,
    //     password: "Demo@123",
    //     email: `demo${i}@example.com`,
    //   }),
    //   method: "POST",
    // });
    // fetch("api/connections/fakesend", {
    //   body: JSON.stringify({
    //     email: `demo${i}@example.com`,
    //   }),
    //   method: "POST",
    // });
  }
}}
>
Make fake users
</button> */
