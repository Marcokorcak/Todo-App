"use client";
import Link from "next/link";
import NavButton from "./NavButton";
import useUserMustBeLogged from "@/hooks/useUserMustBeLogged";
import useUser from "@/hooks/useUser";

const Header = () => {
  const { user } = useUser();
  var loggedOut = !!useUserMustBeLogged(user, "out", "/");

  if (!!loggedOut) {
    return (
      <nav className="header">
        <NavButton link="/" name="Home" />
        <NavButton link="/user" name="My Account" />
        <NavButton link="/contact" name="User List" />
        <NavButton link="/register" name="Register" />
        <NavButton link="/logout" name="Logout" />
      </nav>
    );
  }

  loggedOut = true;

  if (loggedOut === true) {
    return (
      <nav className="header">
        <NavButton link="/" name="Home" />
        <NavButton link="/login" name="My Account" />
        <NavButton link="/contact" name="User List" />
        <NavButton link="/login" name="Login" />
        <NavButton link="/register" name="Register" />
      </nav>
    );
  }
};

export default Header;
