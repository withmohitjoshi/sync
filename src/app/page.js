"use client";
import ChatArea from "./components/ChatArea";
import ChatsList from "./components/ChatsList";
import Header from "./components/Header";
import MessageUserModal from "./components/MessageUserModal";

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex flex-1 gap-4 text-gray-100 overflow-hidden">
        <ChatsList />
        <ChatArea />
      </div>
      <MessageUserModal />
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
