import ReadMore from './ReadMore';
import ExternalLink from './ExternalLink';
import rPiImg from 'images/raspberry-pi-1.jpg';
import styled from '@emotion/styled';

const MY_GITHUB_URL = 'https://github.com/esantini';

const ProjectRaspberry = () => (
  <div className="project">
    <h2>Raspberry Pi</h2>
    <p>
      This website, hosted on a Raspberry Pi and developed with <strong className="highlight">React</strong> for
      the frontend and a <strong className="highlight">Node.js API</strong> for the backend, serves as a creative
      playground to explore the Raspberry Pi&apos;s GPIO pins and develop a web interface for controlling apartment lighting.
      Furthermore, by integrating a camera stream, this project has evolved into a valuable addition to my home security system.
    </p>
    <br />
    <p>
      Check out the <ExternalLink href={`${MY_GITHUB_URL}/eSantini`} className="highlight">Front-End repo</ExternalLink>
      {' '}and the <ExternalLink href={`${MY_GITHUB_URL}/api`} className="highlight">API repo</ExternalLink>.
    </p>
    <ReadMore>
      <div className="raspiContainer">
        <div className="raspiText">
          <RaspiImage
            src={rPiImg}
            alt="Raspberry Pi 1"
          />
          <p>
            In this project I transformed my apartment into a tech playground.
            Hosting this site on a Raspberry Pi, shielded
            by <strong className="highlight">Cloudflare</strong> and streamlined
            with <strong className="highlight">NGINX</strong>,
            I ventured into electronics by controlling lights and screens via web interfaces.
          </p>
          <br />
          <p>
            The project also includes a homemade <strong className="highlight">CI/CD</strong> system,
            using <strong className="highlight">GitHub Actions</strong> and <strong className="highlight">Node.js</strong> to
            deploy updates through bash scripts—clunky yet effective. Plus,
            a <strong className="highlight">live feed camera</strong> adds a personal touch.
          </p>
          <br />
          <p>
            It&apos;s a hands-on dive into web hosting, automation, and a bit of electronics,
            showcasing the versatility of software engineering beyond conventional boundaries.
          </p>
        </div>
      </div>
    </ReadMore>
  </div>
);

export default ProjectRaspberry;

const RaspiImage = styled.img`
  float: right;
  position: relative;
  width: 12em;
  margin-top: 0.5rem;
  margin-right: 0.3em;
  margin-left: 1em;
  border-radius: 15px;
  box-shadow: 0.1em 0.3em 0.3em rgba(0, 0, 0, 0.6);

  @media (max-width: 420px) {
    float: none;
    margin: 0;
    margin-bottom: 1em;
    left: 50%;
    transform: translateX(-50%);
  }
`;