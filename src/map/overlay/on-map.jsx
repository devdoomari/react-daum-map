import React from 'react';

class DaumMapOverlayOnMap extends React.Component {
  componentDidMount() {
    console.log(this.refs);
    this.setDimen();
  }
  setDimen = () => {
    this.refs.outerBox.style.left = this.props.centered ? `${(0 - this.refs.outerBox.offsetWidth / 2)}px` : 0;
    this.refs.outerBox.style.top = this.props.centered ? `${(0 - this.refs.outerBox.offsetHeight / 2)}px` : 0;
  }
  render() {
    return (
      <div
        ref="outerBox"
        style={{
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

DaumMapOverlayOnMap.propTypes = {
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  centered: React.PropTypes.bool,
};

export default DaumMapOverlayOnMap;
