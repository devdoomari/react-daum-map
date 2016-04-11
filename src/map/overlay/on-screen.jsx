import React from 'react';

const DaumMapOverlayOnScreen = (props) => (
  <div>
    {props.children}
  </div>
);

DaumMapOverlayOnScreen.propTypes = {
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

export default DaumMapOverlayOnScreen;
