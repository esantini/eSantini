import styled from '@emotion/styled'

export { default as GithubLink } from './GithubLink';
export { default as InputMessage } from './InputMessage';
export { default as Nav } from './CornerLogo';
export { default as Chat } from './Chat';
export { default as TopMenu } from './TopMenu';
export { default as ExternalLink } from './ExternalLink';
export { default as LatestProjects } from './LatestProjects';
export { default as ProjectRaspberry } from './ProjectRaspberry';

export const Hr = styled.hr`
  border: 0; /* Remove the default border */
  height: 2px; /* Set the height */
  background: linear-gradient(to right, #e3e7db11, var(--h1-color), #e3e7db11);
  width: 80%;
  margin: 1.5em 0;
`;
