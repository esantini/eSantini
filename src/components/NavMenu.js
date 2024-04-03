import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logOut, useClickOutside, trackEvent } from 'utils';
import defaultProfileImg from 'assets/images/default-profile-img.png';
import styled from '@emotion/styled';

const NavMenu = ({ user, setUser, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleClickOutside = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      trackEvent('click', 'NavMenu', 'close', 'outside');
    }
  }, [isOpen]);
  useClickOutside(wrapperRef, handleClickOutside);

  const openMenu = useCallback(() => {
    if (!isOpen) {
      setIsOpen(true);
      trackEvent('click', 'NavMenu', 'open', 'inside');
    }
  }, [isOpen]);

  const toggleMenu = useCallback(e => {
    e.stopPropagation();
    setIsOpen(v => !v);
    trackEvent('click', 'NavMenu', isOpen ? 'close' : 'open', 'inside');
  }, [isOpen]);

  return (
    <TopRightDiv isOpen={isOpen} onClick={openMenu} ref={wrapperRef}>
      {user?.name ?
        <>
          <div className='userMenu' onClick={toggleMenu}>
            <UserLogo
              alt='User Profile Image'
              src={user.picture}
              onError={e => e.target.src = defaultProfileImg}
            />
            {user.name}
          </div>
          {isOpen &&
            <>
              {renderLinks(pathname, user.isWhitelisted)}
              <button
                style={{ cursor: 'pointer' }}
                onClick={(e) => {
                  // Prevent propagation for the parent onClick which opens the menu
                  e.stopPropagation();
                  logOut(setUser);
                  setIsOpen(false);
                  trackEvent('click', 'NavMenu', 'Log Out');
                }}
              >
                Log out
              </button>
            </>
          }
        </>
        :
        <>
          <button onClick={toggleMenu} style={{ cursor: 'pointer', paddingLeft: '.2em' }}>
            {isLoading && <>
              <LoadingSpinner
                src={`${process.env.PUBLIC_URL}/loadingSpinner.svg`}
                alt='Loading...'
              />{' '}
            </>}Menu
          </button>
          {isOpen &&
            <>
              {renderLinks(pathname)}
              <Link to='/login' className={pathname === '/login' ? 'disabled' : ''}>
                Log In
              </Link>
            </>
          }
        </>
      }
    </TopRightDiv>
  );
}
NavMenu.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  isLoading: PropTypes.bool,
};

export default NavMenu;

const TopRightDiv = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  overflow: hidden;
  padding: .5em 1em .5em 0.7em;
  font-weight: bold;
  font-size: 0.85em;
  color: var(--font-color-2);
  border-bottom-left-radius: 1em;
  background-color: var(--menu-background-closed);

  transition:
    background-color 0.35s ease,
    box-shadow 0.35s ease;

  ${({ isOpen }) => isOpen ? `
    background-color: var(--menu-background);
    box-shadow: -2px 3px 6px #7f7f7f;
    padding-bottom: .8em;
  ` : ''}

  .userMenu {
    display: flex;
    align-items: center;
    gap: .5em;
    cursor: default;
    height: 1.3em;
  }
  
  button, a {
    color: var(--font-color-2);
    background: none;
    border: none;
    font-weight: bold;
    font-size: 1.1em;
    white-space: nowrap;
  }
  &:hover {
    ${({ isOpen }) => isOpen ? '' : `
      background-color: var(--menu-background-hover);
    `}
    box-shadow: -2px 3px 6px #7f7f7f;
  }
  a.disabled {
    color: var(--menu-disabled);
    pointer-events: none;
    text-decoration: none;
  }
`;

const UserLogo = styled.img`
  border-radius: 50%;
  padding: 0.3em 0;
  height: 2em;
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  padding: 0.5em 0;
  margin-bottom: .5em;
`;

const LoadingSpinner = styled.img`
  height: 1.2em;
  margin-bottom: -0.3em;
`;

const LINKS = [
  { path: '/', text: 'Home' },
  { path: '/raspberrypi', text: 'Raspberry Pi' },
  { path: '/camera', text: 'Camera Stream' },
  { path: '/analytics', text: 'Analytics', whitelist: true },
];

const renderLinks = (p, isWhitelisted) => (<>
  <hr style={{ marginTop: '.3em' }} />
  <LinksWrapper>
    {LINKS.map(({ path, text, whitelist }) => (!whitelist || isWhitelisted) ? (
      <Link key={path} to={path} className={p === path ? 'disabled' : ''} >
        {text}
      </Link>
    ) : null)}
  </LinksWrapper>
  <hr />
</>);
