import Link, { LinkProps } from "next/link";
import { Link as MUILink } from "@mui/material";

type NavLinkT = LinkProps & {
  children: React.ReactNode;
};

export const NavLink = ({ href, prefetch, children, ...rest }: NavLinkT) => {
  return (
    <Link
      href={href}
      passHref
      prefetch={prefetch}
      {...rest}
      style={{ textDecoration: "none" }}
    >
      <MUILink variant="body2" component={"span"}>
        {children}
      </MUILink>
    </Link>
  );
};
