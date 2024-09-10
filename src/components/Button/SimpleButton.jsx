const SimpleButton = ({
  type = "button",
  children,
  text = "Click",
  extraClasses = "",
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-100 bg-gray-600 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none text-nowrap ${extraClasses}`}
      {...rest}
    >
      {children || text}
    </button>
  );
};

export default SimpleButton;
