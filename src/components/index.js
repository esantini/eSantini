import styled from '@emotion/styled'

export { default as Chat } from './Chat';
export { default as NavMenu } from './NavMenu';
export { default as CornerLogo } from './CornerLogo';
export { default as MyDebugger } from './MyDebugger';
export { default as GithubLink } from './GithubLink';
export { default as InputMessage } from './InputMessage';
export { default as ExternalLink } from './ExternalLink';
export { default as PageAnalytics } from './PageAnalytics';
export { default as LatestProjects } from './LatestProjects';
export { default as ProjectRaspberry } from './ProjectRaspberry';
export { default as GoogleLoginButton } from './GoogleLoginButton';

export const Hr = styled.hr`
  border: 0; /* Remove the default border */
  height: 2px; /* Set the height */
  background: linear-gradient(to right, #e3e7db11, var(--h1-color), #e3e7db11);
  width: 80%;
  margin: 1.5em 0;
`;
