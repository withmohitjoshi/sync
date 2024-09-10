import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const MiddleBox = ({
  children,
  headingName,
  showBackButton = false,
  backTo = "",
}) => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <div className="flex items-center text-gray-100">
          {showBackButton && (
            <span
              className="cursor-pointer"
              onClick={() => (backTo ? router.replace(backTo) : router.back())}
            >
              <ChevronLeft />
            </span>
          )}
          {headingName && (
            <h2 className="text-3xl font-bold text-center w-full">
              {headingName}
            </h2>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default MiddleBox;
