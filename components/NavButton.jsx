import Link from 'next/link';

const NavButton = ({link, name}) => {
    return (
        <Link className="btn bg-neutral hover:bg-slate-600 stroke-none border-none text-lg text-violet-500" href={link}>{name}</Link>
    )
}


export default NavButton;