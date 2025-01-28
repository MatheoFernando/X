import {
  House,
  MagnifyingGlass,
  Bell,
  EnvelopeSimple,
  DotsThree,
  Plus,
  XLogo
} from "@phosphor-icons/react";
import profile from "/Moco.jpg";
import React from "react";

type NavItemProps = {
  text: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItemProps[] = [
  { text: "Home", href: "/", icon: House },
  { text: "Explore", href: "/explore", icon: MagnifyingGlass },
  { text: "Notifications", href: "/notifications", icon: Bell },
  { text: "Messages", href: "/messages", icon: EnvelopeSimple },
  { text: "More", href: "/more", icon: DotsThree },
];

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, text }) => (
  <div className="flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-200/10 rounded-full w-full">
    <Icon size={32} />
    <a href={href} className="hidden lg:block text-white">{text}</a>
  </div>
);

// Navbar component
const Navbar: React.FC = () => {
  return (
    <nav className="w-20 lg:w-64 sticky top-0 p-3 h-screen flex flex-col space-y-3 mt-4">
      <a href="#">
        <XLogo size={32} />
      </a>

      {navItems.map(({ text, href, icon }) => (
        <NavItem key={href} href={href} icon={icon} text={text} />
      ))}

      <button className="flex items-center justify-center  w-full bg-[#1D9BF0] text-white text-lg font-semibold p-2 rounded-full mt-6 lg:w-44 ">
        <Plus size={24} className="lg:mr-2" />
        <span className="hidden lg:inline">Post</span>
      </button>

      {/* Profile image */}
      <div className="mt-auto flex items-center space-x-4 cursor-pointer p-2 hover:bg-gray-200/10 rounded-full w-full">
        <img
          src={profile}
          alt="Profile"
          className="w-10 h-10 rounded-full"
        />
        <a href="/profile" className="hidden lg:block text-white">
          Profile
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
