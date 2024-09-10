"use client";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import ProfilePicture from "./components/ProfilePicture";
import ChangeUsername from "./components/ChangeUsername";
import LogoutUser from "./components/LogoutUser";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import useGetDetails from "../../../hook/useGetDetails";
import CenterSinner from "../../../components/Loaders/CenterSinner";

const MyAccountPage = () => {
  const { data = {}, isLoading } = useGetDetails();
  const { email, username } = data;
  return (
    <MiddleBox headingName={"Manage account"} showBackButton>
      <div className="w-full space-y-6 text-gray-300">
        {isLoading ? (
          <CenterSinner />
        ) : (
          <>
            <ProfilePicture />
            <p className="text-gray-400 text-center">{email}</p>
            <ChangeUsername username={username} />
            <Link
              href={"/change-password"}
              className="flex items-center justify-between"
            >
              <span>Change Password</span>
              <span className="cursor-pointer">
                <ChevronRight />
              </span>
            </Link>
            <LogoutUser />
          </>
        )}
      </div>
    </MiddleBox>
  );
};

export default MyAccountPage;
