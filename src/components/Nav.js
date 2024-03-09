import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import logo from '../images/logo.svg';

const Nav = () => (
  <NavContainer>
    <Link to="/">
      <img alt="Logo link to home" src={logo} />
    </Link>
  </NavContainer>
);

export default Nav;

const NavContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  margin: 10px;
  a,
  img {
    width: 10vw;
    min-width: 70px;
  }
`;
