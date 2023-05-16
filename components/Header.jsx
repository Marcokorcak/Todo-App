"use client";
import Link from "next/link";
import NavButton from "./NavButton";

const Header = () => {
  return (
    <nav className="header">
      <NavButton link="/" name="Home" />
      <NavButton link="/user" name="My Account" />
      <NavButton link="/contact" name="User List" />
      <NavButton link="/login" name="Login" />
      <NavButton link="/register" name="Register" />
    </nav>
  );
};

export default Header;