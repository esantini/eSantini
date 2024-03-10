import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import GoogleLoginButton from 'pages/auth/GoogleLoginButton';
import { logOut, useClickOutside } from 'utils';
import styled from '@emotion/styled';

const LINKS = [
  { path: '/', text: 'Home' },
  { path: '/raspberrypi', text: 'Raspberry Pi' },
  { path: '/camera', text: 'Camera Stream' }
];

const renderLinks = (p) => (<>
  <hr />
  <LinksWrapper>
    {LINKS.map(({ path, text }) => (
      <Link key={path} to={path} className={p === path ? 'disabled' : ''} >
        {text}
      </Link>
    ))}
  </LinksWrapper>
  <hr />
</>);

const TopMenu = ({ user, setUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, () => setIsOpen(false));

  const location = useLocation();
  const { pathname } = location;

  const toggleMenu = e => {
    e.stopPropagation();
    setIsOpen(v => !v);
  };
  return (
    <TopRightDiv isOpen={isOpen} onClick={() => setIsOpen(true)} ref={wrapperRef}>
      {user?.name ?
        <>
          <div className='userMenu' onClick={toggleMenu}>
            <img alt='User Profile Image' src={user.picture} />
            {user.name}
          </div>
          {isOpen &&
            <>
              {renderLinks(pathname)}
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
          <button onClick={toggleMenu}>Menu</button>
          {isOpen &&
            <>
              {renderLinks(pathname)}
              Log In
              <Br />
              <div className="loginWrapper">
                <GoogleLoginButton
                  setUser={(user) => {
                    setUser(user);
                    setIsOpen(false);
                  }}
                />
              </div>
            </>
          }
        </>
      }
    </TopRightDiv>
  );
}
TopMenu.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
};

export default TopMenu;

const TopRightDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: .5em 1em;
  font-weight: bold;
  border-bottom-left-radius: 1em;
  overflow: hidden;

  transition:
    background-color 0.35s ease,
    box-shadow 0.35s ease;

  ${({ isOpen }) => isOpen ? `
    background-color: #008741;
    box-shadow: -2px 3px 6px #7f7f7f;
    padding-bottom: .8em;
  ` : ''}

  .userMenu {
    display: flex;
    align-items: center;
    gap: .5em;
    cursor: default;
  }
  
  button, a {
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
  .loginWrapper {
    display: flex;
    justify-content: center;
  }
  a.disabled {
    color: #ddd;
    pointer-events: none;
    text-decoration: none;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Br = styled.br`
  margin-bottom: .5em;
  display: block;
  content: '';
`;