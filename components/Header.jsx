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
      <nav className="header flex gap-10">
        <p>
          <FontAwesomeIcon icon={faUser} /> {name}
        </p>
        <NavButton link="/" name="Home" className="lstyles" />
        <NavButton
          link={`/user/${user.id}`}
          name="My Lists"
          className="lstyles"
        />
        <NavButton link="/listnew" name="Create" className="lstyles" />
        <NavButton link="/" name="Login" className="lstyles" />
        <NavButton link="/" name="Register" className="lstyles" />
        <NavButton link="/logout" name="Logout" className="lstyles" />
      </nav>
    );
  } else if (!user) {
    return (
      <nav className="header flex gap-10">
        <p>
          <FontAwesomeIcon icon={faUser} /> {name}
        </p>
        <NavButton link="/" name="Home" className="lstyles" />
        <NavButton link="/login" name="My Lists" className="lstyles" />
        <NavButton link="/login" name="Login" className="lstyles" />
        <NavButton link="/register" name="Register" className="lstyles" />
      </nav>
    );
  }
};

export default Header;
