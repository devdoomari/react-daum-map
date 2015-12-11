import React from 'react';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlayContainer',
  // propTypes: {
  //   children:
  // },
  defaultProps: {
    children: [],
  },
  componentDidMount() {

  },
  componentWillReceiveProps(nextProps) {

  },
  render() {
    const boundsText = (
      <div>
        <h5>
          {this.props.bounds.minLat} : {this.props.bounds.maxLat}
        </h5>
        <h5>
          {this.props.bounds.minLng} : {this.props.bounds.maxLng}
        </h5>
      </div>
    );
    return (
      <div>
        <h3>{boundsText}</h3>
        {this.props.children}
      </div>);
  },
});
