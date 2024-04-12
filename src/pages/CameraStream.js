import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useUser } from 'utils';
import videoLocked from 'assets/images/video-locked.png';

const CameraStream = () => {
  const [user] = useUser();
  useEffect(() => {
    document.title = 'Camera Stream - eSantini';
  }, []);
  return (
    <>
      <h1>Camera Stream</h1>

      <PlayerWrapper>
        {user?.isWhitelisted ?
          <img src={isLocalhost ? '/api/stream.mp4' : '/stream'} className='camera' />
          :
          <>
            <p>
              You must be {user?.name ? '' : 'Logged In and '}
              Whitelisted to view this camera feed.
            </p>
            <ImgLocked src={videoLocked} alt='video locked' />
          </>
        }
      </PlayerWrapper>
    </>
  );
};

export default CameraStream;

const PlayerWrapper = styled.div`
  .camera {
    width: 100%;
  }
  img {
    border-radius: 1em;
  }
  @media (max-width: 768px) {
    max-width: 100vw;
  }
  p {
    margin-top: .5em;
    text-align: center;
  }
`;

const ImgLocked = styled.img`
  width: 75%;
  left: 50%;
  position: relative;
  transform: translateX(-50%);
  margin-top: 1.3em;
`;