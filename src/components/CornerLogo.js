import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';

import logo from '../images/logo.svg';

const CornerLogo = () => {
  const { pathname } = useLocation();
  return pathname === '/' ? null : (
    <Container>
      <Link to="/">
        <img alt="Logo link to home" src={logo} />
      </Link>
    </Container>
  );
}
export default CornerLogo;

const Container = styled.nav`
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
