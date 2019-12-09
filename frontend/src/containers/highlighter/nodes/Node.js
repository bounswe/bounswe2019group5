import React from 'react';
import PropTypes from 'prop-types';

const Node = props => {
  const getStyle = range => range ? (range.highlightStyle? range.highlightStyle: props.highlightStyle) : props.style;
  const getRangeKey = () => `${props.id}-${props.range.start}-${props.charIndex}`;
  const getNormalKey = () => `${props.id}-${props.charIndex}`;
  const getKey = range => range ? getRangeKey() : getNormalKey();

  return (<span data-position={props.charIndex}
    key={getKey(props.range)}
    style={getStyle(props.range)}
    onMouseOver={() => props.onMouseOver(props.range, true)}>
    {props.children}
  </span>);
};

Node.propTypes = {
  highlightStyle: PropTypes.object,
  style: PropTypes.object,
  id: PropTypes.string,
  charIndex: PropTypes.number,
  range: PropTypes.object,
  children: PropTypes.node
};

export default Node;
