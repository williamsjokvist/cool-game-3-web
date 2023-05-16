"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { type FunctionComponent } from "react";

type NavItemProps = {
  name: string;
  href: string;
  toolTip?: string;
  children?: React.ReactNode;
};

const NavItems: NavItemProps[] = [
  {
    name: "Home",
    href: "/",
    children: <Icon icon="ri:home-7-line" className="w-11 h-11" />,
  },
  {
    name: "Rankings",
    href: "/rankings",
    toolTip: "View the coolest gamers",
    children: <Icon icon="icon-park-outline:ranking" className="w-11 h-11" />,
  },
  {
    name: "Register",
    href: "/register",
    toolTip: "Become a cool gamer",
    children: (
      <Icon icon="material-symbols:power-rounded" className="w-11 h-11" />
    ),
  },
  {
    name: "Patch Notes",
    href: "/patch-notes",
    toolTip: "Look how the coolest game becomes even cooler",
    children: <Icon icon="ph:scroll-bold" className="w-12 h-12" />,
  },
];

const NavItem: FunctionComponent<NavItemProps> = (props) => {
  const { href, name, children } = props;
  return (
    <li className="group flex flex-col xl:flex-row items-center justify-center">
      <div className="nav-link-container relative flex justify-between items-center h-32 w-32 bg-[#1C1C25] rounded-xl">
        <div className="flex flex-col justify-between h-full">
          <i className="w-3 h-3 bg-[#3B3B44] rounded-full ml-2 mt-2" />
          <i className="w-3 h-3 bg-[#3B3B44] rounded-full ml-2 mb-2" />
        </div>
        <Link
          href={href}
          className="relative transition-all link-drop-shad top-[-5px] hover:translate-y-[10px] active:bg-[#802500] active:text-[#622e19] active:translate-y-[20px] hover:filter-none hover:text-[#e9e9e9cc] text-[#802500] hover:underline bg-orange-500 rounded-full w-16 h-16 flex items-center justify-center"
        >
          {children}
        </Link>
        <div className="flex flex-col justify-between h-full">
          <i className="w-3 h-3 bg-[#3B3B44] rounded-full mr-2 mt-2" />
          <i className="w-3 h-3 bg-[#3B3B44] rounded-full mr-2 mb-2" />
        </div>
      </div>
      {props.toolTip && (
        <span className="z-50 whitespace-nowrap absolute top-[-50px] xl:top-auto xl:left-[155px] bg-black px-5 py-2 rounded-xl group-hover:block hidden text-xs text-center">
          {props.toolTip}
        </span>
      )}
    </li>
  );
};

const Nav: FunctionComponent = (props) => {
  return (
    <nav className="z-50 fixed bottom-0 left-0 w-screen justify-center bg-[#25252F] xl:bg-transparent xl:w-auto md:left-[-2px] xl:top-0 xl:h-screen font-arial text-white text-md flex items-center">
      <ul className="rounded-r-xl transition-all flex xl:flex-col gap-4 border-[#25252F] bg-[#25252F] xl:hover:bg-[#2D2D38] xl:hover:border-[#97979B] border-[0.5px] border-solid p-3 shadow-sm">
        {NavItems.map((navItem) => {
          return (
            <NavItem
              name={navItem.name}
              href={navItem.href}
              toolTip={navItem.toolTip}
              children={navItem.children}
              key={navItem.name}
            />
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
