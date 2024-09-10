import Link from "next/link";
import React from "react";

const NavigateLink = ({ text, href, ...rest }) => {
  return (
    <Link
      className="text-sm text-blue-500 hover:underline"
      href={href}
      {...rest}
    >
      {text}
    </Link>
  );
};

export default NavigateLink;
