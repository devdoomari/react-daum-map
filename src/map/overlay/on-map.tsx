import * as React from 'react';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlay::onMap',
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
