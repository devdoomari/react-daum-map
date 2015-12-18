const React = require('react');
import OverlayOnMap from './on-map';
import OverlayOnScreen from './on-screen';

export default React.createClass({
  displayName: 'ReactDaumMap::map::overlay::container',
  propTypes: {
    bounds: React.PropTypes.object.isRequired,
    children: React.PropTypes.array,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  },

  getInitialState() {
    const children = this.getPositionedChildren(
        this.props.children, this.props.bounds);
    return {
      children,
    };
  },
  getPositionedChildren(children, bounds) {
    return React.Children.map(children, (child)=> {
      if (child.type === OverlayOnMap) {
        const lat = child.props.lat;
        const lng = child.props.lng;
        //const relativeLat = lat - bounds.
      } else if (child.type === OverlayOnScreen) {
        const top = child.props.top;
        const left = child.props.left;
        return (
          <div style={{ position: 'absolute', top, left }}>
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
