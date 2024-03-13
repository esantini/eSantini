import ProjectRafin from './ProjectRafin.js';
import ProjectRaspberry from './ProjectRaspberry.js';
import ExternalLink from './ExternalLink.js';
import styled from '@emotion/styled';
import { Hr } from 'components';

const MY_LINKEDIN_URL = 'https://www.linkedin.com/in/estebansantini';

const LatestProjects = () => (
  <>
    <Hr />
    <H1>Latest Projects</H1>
    <ProjectsIntro>
      These projects are personal <strong className="highlight">hobbies</strong> and
      showcases of my <strong className="highlight">technical exploration</strong>.
    </ProjectsIntro>
    <ProjectsIntro>
      If you&apos;re more interested in my professional achievements and experiences, please
      visit my <ExternalLink href={MY_LINKEDIN_URL} className="highlight" >LinkedIn</ExternalLink> profile.
    </ProjectsIntro>
    <Hr />
    <ProjectRaspberry />
    <Hr />
    <ProjectRafin />
    <Hr />
  </>
);

export default LatestProjects;

const H1 = styled.h1`
  margin-bottom: 1em;
`;

const ProjectsIntro = styled.p`
  width: 90%;
  text-align: justify;
  margin-bottom: 1rem;
`;