"use client";
import Link from "next/link";
import NavButton from "./NavButton";
import useUserMustBeLogged from "@/hooks/useUserMustBeLogged";
import useUser from "@/hooks/useUser";
import { getCurrentUser } from "@/app/utils/data";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [name, setName] = useState("");
  const { user } = useUser();
  var loggedOut = !!useUserMustBeLogged(user, "out", "/");

  useEffect(() => {
    const getCurUser = async () => {
      const { data, error } = await getCurrentUser();

      if (data) {
        setName(data.ListoMeta?.name || "");
      } else {
        console.log("Error fetching current user:", error);
      }
    };
    getCurUser();
  }, []);

  if (!!loggedOut) {
    return (
      <nav className="header">
        <p>
          <FontAwesomeIcon icon={faUser} /> {name}
        </p>
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
        <p>
          <FontAwesomeIcon icon={faUser} /> {name}
        </p>
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
