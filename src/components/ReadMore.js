import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const ReadMore = ({ maxHeight = 720, children }) => {
  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = useCallback(
    () => setIsReadMore(v => !v),
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
  children: PropTypes.node,
};

export default ReadMore;
