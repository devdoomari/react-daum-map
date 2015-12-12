import React from 'react';
import MapBoundOverlay from './map-bound';
import ScreenBoundOverlay from './screen-bound';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlay::container',
  propTypes: {
    bounds: React.PropTypes.object.isRequired,
    children: React.PropTypes.array,
  },
  getInitialState() {
    const children = React.Children.map(this.props.children, (child)=> {
      return child;
    });
    return {
      children,
    };
  },
  // componentWillReceiveProps(nextProps) {
  //
  // },
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
        {boundsText}
        {this.state.children}
      </div>);
  },
});
