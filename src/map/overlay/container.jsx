import React, {
  cloneElement,
} from 'react';
import OverlayOnMap from './on-map';
import OverlayOnScreen from './on-screen';

import {
  translateBoundPos,
} from '../../utils';

export default class DaumMapOverlayContainer extends React.Component {
  constructor(props) {
    super(props);
    const children = this.getPositionedChildren(
      this.props.children, this.props.bounds,
      this.props.width, this.props.height);
    this.state = {
      children,
    };
  }
  componentWillReceiveProps(nextProps) {
    const children = this.getPositionedChildren(
      nextProps.children, nextProps.bounds,
      nextProps.width, nextProps.height);
    this.setState({
      children,
    });
  }
  getPositionedChildren = (children, bounds, width, height) => (
    React.Children.map(children, (child) => {
      const childCopy = cloneElement(
        child, {
          ...child.props,
          redirectEventsToDaumMap: this.props.redirectEventsToDaumMap,
        });
      if (child.type === OverlayOnMap) {
        const lat = child.props.lat;
        const lng = child.props.lng;
        const { left, top } = translateBoundPos({
          bounds: this.props.bounds,
          width, height, lat, lng,
        });

        // debugger;
        // child.props.mapContainer = this.props.mapContainer;
        return (
          <div
            key={child.key}
            style={{ position: 'absolute', top, left }}
          >
            <p>OverlayOnMap</p>
            {childCopy}
          </div>
        );
      } else if (child.type === OverlayOnScreen) {
        const top = child.props.top;
        const left = child.props.left;
        return (
          <div
            key={child.key}
            style={{ position: 'absolute', top, left }}
          >
            <p> OverlayOnScreen </p>
            {childCopy}
          </div>
        );
      }
      // raise error.
      return (<h1> Unknown Overlay Type </h1>);
    })
  )
  render() {
    return (
      <div>
        {this.state.children}
      </div>);
  }
}

DaumMapOverlayContainer.propTypes = {
  bounds: React.PropTypes.object.isRequired,
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};
