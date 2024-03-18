import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import githubLogo from 'assets/images/GitHub_Logo_Black.png';
import octocat from 'assets/images/Octocat.png';

const GithubLink = ({ compact = false }) => (
  <A
    compact={compact}
    href="https://github.com/esantini/eSantini"
    target="_blank"
    rel="noopener noreferrer"
  >
    {!compact && (
      <img
        src={octocat}
        alt="octocat"
        id="octocat"
      />
    )}
    <img src={githubLogo} alt="github logo" className='githubLogo' />
  </A>
);

GithubLink.propTypes = {
  compact: PropTypes.bool,
};

export default GithubLink;

const A = styled.a`
  width: 9em;
  #octocat {
    width: 30%;
  }
  img {
    width: ${({ compact }) => (compact ? 'calc(86px + 2vmin)' : '60%')};
  }
  .githubLogo {
    margin: .2em;
    ${({ compact }) => (compact ? '' : 'margin-left: 0;')}
  }
`;
