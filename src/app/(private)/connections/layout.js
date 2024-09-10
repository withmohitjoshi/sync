"use client";
import MiddleBox from "../../../components/Layouts/MiddleBox";
import LinkButton from "../../../components/Button/LinkButton";
import { usePathname } from "next/navigation";
import { routes } from "./constants";

const Layout = ({ children }) => {
  const pathname = usePathname();
  return (
    <MiddleBox showBackButton headingName={"Connections"} backTo="/">
      <div className="w-full text-gray-300 flex gap-4 items-center">
        {routes.map(({ href, name }) => {
          return (
            <LinkButton
              key={href}
              href={href}
              extraClasses={
                href === pathname ? "bg-red-600 hover:bg-red-700" : ""
              }
            >
              {name}
            </LinkButton>
          );
        })}
      </div>
      <div className="w-full min-h-[40vh] max-h-[40vh] overflow-y-auto">
        {children}
      </div>
    </MiddleBox>
  );
};

export default Layout;
