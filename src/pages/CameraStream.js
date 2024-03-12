import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import videoLocked from '../images/video-locked.png';

const CameraStream = ({ user }) => (
  <>
    <h1>Camera Stream</h1>

    <PlayerWrapper>
      {user?.isWhitelisted ?
        <img src="/stream" />
        :
        <>
          <p>
            You must be {user.name ? '' : 'Logged In and '}
            Whitelisted to view this camera feed.
          </p>
          <img src={videoLocked} alt="video locked" style={{ width: '75%' }} />
        </>
      }
    </PlayerWrapper>
  </>
);

CameraStream.propTypes = {
  user: PropTypes.object,
};

export default CameraStream;

const PlayerWrapper = styled.div`
  max-width: 50vw;
  img {
    width: 100%;
    min-height: 10em;
    border-radius: 1em;
  }
`;
