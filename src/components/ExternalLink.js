import PropTypes from 'prop-types';

const ExternalLink = ({ href, children, className = '', style = {} }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={className} style={style}>
    {children}
  </a>
);

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ExternalLink;
