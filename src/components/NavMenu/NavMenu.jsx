import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./NavMenu.module.css";

const linkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
}

export default function NavMenu()
{
    return (
        <nav className={css.nav}>
            <NavLink className={linkClass} to="/">Home</NavLink>
            <NavLink className={linkClass} to="/movies">Movies</NavLink>
        </nav>
    );
}