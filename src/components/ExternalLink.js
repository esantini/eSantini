import PropTypes from 'prop-types';

const ExternalLink = ({ href, children, onClick, className = '', style = {} }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClick} className={className} style={style}>
    {children}
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
};

export default ExternalLink;
