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

  if (user) {
    return (
      <nav className="header">
        <p>
          <FontAwesomeIcon icon={faUser} /> {name}
        </p>
        <NavButton link="/" name="Home" />
        <NavButton link={`/user/${user.id}`} name="My Lists" />
        {/*  <NavButton link="/contact" name="User List" /> */}
        {/* <NavButton link="/register" name="Register" /> */}
        <NavButton link="/listnew" name="Create" />
        <NavButton link="/logout" name="Logout" />
      </nav>
    );
  } else if (!user) {
    return (
      <nav className="header">
        <p>
          <FontAwesomeIcon icon={faUser} /> {name}
        </p>
        <NavButton link="/" name="Home" />
        {/* <NavButton link="/login" name="My Account" /> */}
        <NavButton link="/login" name="User List" />
        <NavButton link="/login" name="Login" />
        <NavButton link="/register" name="Register" />
      </nav>
    );
  }
};

export default Header;
