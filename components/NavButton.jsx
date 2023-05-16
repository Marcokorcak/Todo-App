import Link from "next/link";

const NavButton = ({ link, name }) => {
  return (
    <Link
      className="btn bg-neutral hover:bg-violet-200 stroke-none rounded-2xl w-50 text-lg text-violet-500"
      href={link}
    >
      {name}
    </Link>
  );
};

export default NavButton;
