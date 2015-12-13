import React from 'react';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlay::onScreen',
  propTypes: {
    top: React.PropTypes.number.isRequired,
    left: React.PropTypes.number.isRequired,
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },
});
