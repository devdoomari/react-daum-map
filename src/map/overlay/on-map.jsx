import React from 'react';

const DaumMapOverlayOnMap = (props) => (
  <div>
    {props.children}
  </div>
);

DaumMapOverlayOnMap.propTypes = {
  lat: React.PropTypes.number.isRequired,
  lng: React.PropTypes.number.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

export default DaumMapOverlayOnMap;
