import { PageNavLink } from "../PageNavLink";
import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <PageNavLink to="/" text="Home" />
      <PageNavLink to="/users" text="Users" />
    </nav>
  );
};