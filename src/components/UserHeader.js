import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

const UserHeader = ({ user }) => (
  <TopRightDiv>
    {user?.name ?
      <>
        <img alt="User Profile Image" src={user.picture} />
        {user.name}
      </>
      : <Link to="/login">Login</Link>}
  </TopRightDiv>
);

UserHeader.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default UserHeader;

const TopRightDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  gap: .5em;
  padding: .5em 1em;
  font-weight: bold;
  border-bottom-left-radius: 1em;
  cursor: default;
  transition: background-color 0.35s ease;
  a {
    color: #b2fdd6;
  }
  img {
    border-radius: 50%;
    height: 2em;
  }
  &:hover {
    background-color: #00874188;
  }
`;
