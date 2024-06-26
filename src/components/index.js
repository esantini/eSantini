import styled from '@emotion/styled'

export { default as Chat } from './Chat';
export { default as NavMenu } from './NavMenu';
export { default as CornerLogo } from './CornerLogo';
export { default as MyDebugger } from './MyDebugger';
export { default as GithubLink } from './GithubLink';
export { default as InputMessage } from './InputMessage';
export { default as ExternalLink } from './ExternalLink';
export { default as UserProvider } from './UserProvider';
export { default as PageAnalytics } from './PageAnalytics';
export { default as LatestProjects } from './LatestProjects';
export { default as ProjectRaspberry } from './ProjectRaspberry';
export { default as ChatConversations } from './ChatConversations';
export { default as GoogleLoginButton } from './GoogleLoginButton';

export const Hr = styled.hr`
  border: 0; /* Remove the default border */
  height: 2px; /* Set the height */
  background: linear-gradient(to right, #e3e7db11, var(--h1-color), #e3e7db11);
  width: 80%;
  margin: 1.5em 0;
`;

export const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.6em;
  font-size: 0.6em;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus {
    border-color: #3f7204;
  }
`;

export const Button = styled.button`
  font-size: 0.7em;
  font-weight: bold;
  background: none;
  height: 2em;
  border-radius: 0.6em;
  border: 0;
  padding-left: 1em;
  padding-right: 1em;

  ${({ disabled }) => disabled ?
    'color: #ccc;' :
    `
    background: #e0ebe1;
    color: #008506;
    cursor: pointer;
    &:hover {
      color: #005203;
      background: #cce6cf;
    }
  `}
`;
