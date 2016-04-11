import React from 'react';
import OverlayOnMap from './on-map';
import OverlayOnScreen from './on-screen';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlay::container',
  propTypes: {
    bounds: React.PropTypes.object.isRequired,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    children: React.PropTypes.array,
  },
  getInitialState() {
    const children = this.getPositionedChildren(
        this.props.children, this.props.bounds,
        this.props.width, this.props.height);
    return {
      children,
    };
  },
  componentWillReceiveProps(nextProps) {
    const children = this.getPositionedChildren(
      nextProps.children, nextProps.bounds,
      nextProps.width, nextProps.height);
    this.setState({children});
  },
  translateBoundPos({bounds, width, height, lat, lng}={}) {
    const boundsLatSize = bounds.maxLat - bounds.minLat;
    const boundsLngSize = bounds.maxLng - bounds.minLng;
    const relativeLat = lat - bounds.minLat;
    const relativeLng = lng - bounds.minLng;
    const latRatio = relativeLat / boundsLatSize;
    const lngRatio = relativeLng / boundsLngSize;
    return {
      left: width * lngRatio,
      top: (-1) * height * latRatio,
    };
  },
  getPositionedChildren(children, bounds, width, height) {
    return React.Children.map(children, (child)=> {
      if (child.type === OverlayOnMap) {
        if(!child.props.visibilityFunc(child.props, bounds)) {
          return null;
        }
        const lat = child.props.lat;
        const lng = child.props.lng;
        const {left, top} = this.translateBoundPos({
          bounds: this.props.bounds,
          width, height, lat, lng,
        });
        return (
          <div key={child.key} style={{ position: 'absolute', top, left }}>
            {child}
          </div>
        );
      } else if (child.type === OverlayOnScreen) {
        const top = child.props.top;
        const left = child.props.left;
        return (
          <div key={child.key} style={{ position: 'absolute', top, left }}>
            {child}
          </div>
        )
      } else {
        // raise error.
        return <h1> asdsad </h1>
      }
    });
  },
  // componentWillReceiveProps(nextProps) {
  //
  // },
  render() {
    return (
      <div>
        {this.state.children}
      </div>);
  },
});
