import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import GoogleLoginButton from 'pages/auth/GoogleLoginButton';
import { logOut, useClickOutside } from 'utils';
import styled from '@emotion/styled';

const UserHeader = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));
  return (
    <TopRightDiv isOpen={isOpen} onClick={() => setIsOpen(true)} ref={wrapperRef}>
      {user?.name ?
        <>
          <div className='userHeader'>
            <img alt='User Profile Image' src={user.picture} />
            {user.name}
          </div>
          {isOpen &&
            <>
              <hr />
              <button
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  // Prevent propagation for the parent onClick which opens the menu
                  e.stopPropagation();
                  logOut(setUser);
                  setIsOpen(false);
                }}
              >
                Log out
              </button>
            </>
          }
        </>
        :
        <>
          <button>Log In</button>
          {isOpen &&
            <>
              <hr />
              <GoogleLoginButton
                setUser={(user) => {
                  setUser(user);
                  setIsOpen(false);
                }}
              />
            </>
          }
        </>
      }
    </TopRightDiv>
  );
}
UserHeader.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default UserHeader;

const TopRightDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: .5em 1em;
  font-weight: bold;
  border-bottom-left-radius: 1em;
  overflow: hidden;
  max-width: 290px;

  transition:
    background-color 0.35s ease,
    box-shadow 0.35s ease;

  ${({ isOpen }) => isOpen ? `
    background-color: #008741;
    box-shadow: -2px 3px 6px #7f7f7f;
    padding-bottom: .8em;
  ` : ''}

  .userHeader {
    display: flex;
    align-items: center;
    gap: .5em;
    cursor: default;
  }
  
  button {
    color: #b2fdd6;
    background: none;
    border: none;
    font-weight: bold;
    font-size: 1.1em;
  }
  img {
    border-radius: 50%;
    height: 2em;
  }
  &:hover {
    background-color: #008741${({ isOpen }) => isOpen ? '' : '88'};
    box-shadow: -2px 3px 6px #7f7f7f;
  }
`;
