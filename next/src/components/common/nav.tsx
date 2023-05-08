import Link from "next/link";
import { Icon } from "@iconify/react";
import { type FunctionComponent } from "react";

type NavItemProps = {
  name: string;
  href: string;
  toolTip?: string;
};
const NavItem: FunctionComponent<NavItemProps> = (props) => {
  const { href, name } = props;
  return (
    <li className="relative group flex flex-col justify-center items-center">
      <Link href={href} className="hover:underline">
        {name}
      </Link>
      {props.toolTip && (
        <span className="whitespace-nowrap absolute bottom-[-25px] group-hover:block hidden text-xs text-center">
          {props.toolTip}
        </span>
      )}
    </li>
  );
};

const Nav: FunctionComponent = (props) => {
  return (
    <nav className="font-arial text-black dark:text-white text-md pt-12 mb-12">
      <ul className="flex justify-center gap-8">
        <NavItem name="Home" href="/" />
        <NavItem
          name="Rankings"
          href="/rankings"
          toolTip="View the coolest gamers"
        />
        <NavItem
          name="Register"
          href="/register"
          toolTip="Become a cool gamer"
        />
        <NavItem
          name="Patch Notes"
          href="/patch-notes"
          toolTip="Look how the coolest game becomes even cooler"
        />
      </ul>
    </nav>
  );
};

export default Nav;
