import React from 'react';
import {
  FaCircle,
  FaHome,
  FaPowerOff,
  FaSignInAlt,
  FaUserAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from './styled';
import * as actions from '../../store/modules/auth/actions';

function Header() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
  };

  return (
    <Nav>
      <Link to="/">
        <FaHome size={24} />
      </Link>
      <Link to="/register">
        <FaUserAlt size={24} />
      </Link>
      {isLoggedIn ? (
        <Link onClick={handleLogout} to="/logout">
          <FaPowerOff size={24} />
        </Link>
      ) : (
        <Link to="/login">
          <FaSignInAlt size={24} />
        </Link>
      )}

      {isLoggedIn && <FaCircle size={24} color="#66ff33" />}
    </Nav>
  );
}

export default Header;
