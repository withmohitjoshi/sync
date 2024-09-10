"use client";
import SimpleButton from "../../../../components/Button/SimpleButton";

const LogoutUser = () => {
  return (
    <SimpleButton
      text="Logout"
      extraClasses="bg-red-600 hover:bg-red-400"
      onClick={() =>
        fetch("api/auth/logout").then(() => window.location.reload())
      }
    />
  );
};

export default LogoutUser;
