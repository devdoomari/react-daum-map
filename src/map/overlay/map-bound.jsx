import React from 'react';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlay::mapBoundOverlay',
  propTypes: {
    lat: React.PropTypes.number.isRequired,
    lng: React.PropTypes.number.isRequired,
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },
});
