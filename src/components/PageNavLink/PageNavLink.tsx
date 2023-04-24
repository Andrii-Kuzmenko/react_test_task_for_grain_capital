import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import './PageNavLink.scss';

type Props = {
  to: string;
  text: string;
};

export const PageNavLink = React.memo<Props>(({ to, text }) => (
  <NavLink
    className={({ isActive }) => classNames(
      'nav-link',
      { 'nav-link__active': isActive },
    )}
    to={to}
  >
    {text}
  </NavLink>
));
