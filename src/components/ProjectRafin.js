import ReadMore from './ReadMore';
import ExternalLink from './ExternalLink';
import styled from '@emotion/styled';
import rafinImage from 'images/RafinBassFishing.png'

const RAFIN_URL = 'https://rafinbassfishing.com.mx/';

const ProjectRafin = () => (
  <div className="project">
    <h2>Rafin Bass Fishing</h2>
    <p>
      Check out the <ExternalLink href={RAFIN_URL} className="highlight">Rafin Bass Fishing</ExternalLink> site,
      this project was the perfect excuse to dive into <strong className="highlight">Next.js</strong>,
      a framework that had just surged in popularity. It blends my newfound skills with the excitement
      of <i>Amigo Style</i> fishing at Oviachic Lake.
    </p>
    <ReadMore maxHeight={820} track='Rafin'>
      <ColumnWrapper>
        <div className="column">
          <h3>About Rafin&apos;s Website</h3>
          Embark on a journey with Rafin, a champion fisherman, as he guides you through the abundant
          bass spots of Oviachic Lake. Experience his <i>Amigo Style</i> hospitality,
          which transforms fishing into a communal outdoor adventure, leaving guests eager to return.
          The vibrant community of passionate anglers on Facebook further enriches the memorable experiences.
        </div>
        <div className="column">
          <h3>Building with Next.js</h3>
          Rafin Bass Fishing&apos;s website, built on <strong className="highlight">Next.js</strong>, showcases cutting-edge
          responsive design and modern web technologies. Starting with version 11, the site evolved as a
          learning platform, particularly with the adoption of Next.js 14, improving performance and achieving
          over 95% scores in <strong className="highlight">Google&apos;s Lighthouse</strong>. Enhancements include
          seamless user experiences through <strong className="highlight">Server Side Rendering</strong> and an
          easy <strong className="highlight">Contact Us</strong> feature, ensuring Rafin is just a click away.
        </div>
      </ColumnWrapper>

      <div className="rafinBassLink">
        <p>
          Ready for your adventure? Visit Rafin Bass Fishing to start your journey
        </p>
        <div style={{ position: 'relative', height: 150 }}>
          <ExternalLink href={RAFIN_URL}>
            <img
              src={rafinImage}
              alt="Rafin Bass Fishing"
              style={{ height: '-webkit-fill-available' }}
            />
          </ExternalLink>
        </div>
      </div>
    </ReadMore>
  </div>
);

export default ProjectRafin;

const ColumnWrapper = styled.div`
  display: flex;
  gap: 2rem;

  /* Extra small devices (phones, 600px and down) */
  @media (max-width: 600px) {
    display: block;

    .column {
      margin-bottom: 1rem;
    }
  }

`;