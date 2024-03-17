import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { trackEvent } from 'utils';

const ReadMore = ({ maxHeight = 720, track, children }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = useCallback(
    () => {
      setIsReadMore(v => !v);
      trackEvent('click', 'ReadMore', track, isReadMore ? 'less' : 'more');
    },
    [setIsReadMore],
  );
  return (
    <div
      className={`readMoreSection ${isReadMore ? 'display' : ''}`}
      style={{ maxHeight: isReadMore ? maxHeight : 120 }}
    >
      <button
        className="readMoreBtn"
        onClick={toggleReadMore}
      >
        {isReadMore ? 'Read Less' : 'Read More'}
      </button>
      {children}
    </div>
  );
};

ReadMore.propTypes = {
  maxHeight: PropTypes.number,
  track: PropTypes.string,
  children: PropTypes.node,
};

export default ReadMore;
