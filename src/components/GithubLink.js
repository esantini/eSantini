import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import githubLogo from '../images/GitHub_Logo_White.png';
import octocat from '../images/Octocat.png';

const A = styled.a`
  width: 30%;
  max-width: 250px;
  #octocat {
    width: 30%;
  }
  img {
    width: ${({ compact }) => (compact ? 'calc(86px + 2vmin)' : '60%')};
  }
`;

const GithubLink = ({ compact = false }) => (
  <A
    compact={compact}
    href="https://github.com/esantini/eSantini"
    target="_blank"
    rel="noopener noreferrer"
  >
    {!compact && (
      <img
        src="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        alt="octocat"
        id="octocat"
      />
    )}
    <img src={githubLogo} alt="github logo" />
  </A>
);

GithubLink.propTypes = {
  compact: PropTypes.bool,
};

export default GithubLink;
