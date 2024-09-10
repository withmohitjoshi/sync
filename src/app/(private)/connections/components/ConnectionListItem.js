import Avatar from "../../../../components/Avatar";
import { formatDateTime } from "../../../../helpers/formatters";
const ConnectionListItem = ({ user, actionButtons }) => {
  const { username, id, createdAt } = user;
  return (
    <div
      key={id}
      className=" flex justify-between items-center p-4 rounded-md text-gray-100 border-gray-600 border-[1px] bg-gray-900"
    >
      <div className="flex gap-2 h-full w-full items-center">
        <div className="size-10">
          <Avatar name={username} />
        </div>
        <div className="flex flex-col">
          <span
            title={username}
            className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden"
          >
            {username}
          </span>
          <span className="text-gray-600 text-xs">
            {formatDateTime(createdAt)}
          </span>
        </div>
      </div>
      <div className="flex h-full gap-2">{actionButtons}</div>
    </div>
  );
};

export default ConnectionListItem;
