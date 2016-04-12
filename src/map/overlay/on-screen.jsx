import React, {
  Component,
} from 'react';

window.mouseEvents = [];

class DaumMapOverlayOnScreen extends Component {
  constructor(props) {
    super(props);
  }
  passMouseEvent = (mouseEvent) => {
    const nativeEvent = mouseEvent.nativeEvent;
     window.mouseEvents.push(nativeEvent);
    this.props.redirectEventsToDaumMap(nativeEvent);
  }
  render = () => {
    return (
      <div
        onClick={this.passMouseEvent}
        onMouseDown={this.passMouseEvent}
        onMouseMove={this.passMouseEvent}
        onMouseUp={this.passMouseEvent}
      >
        {this.props.children}
      </div>
    );
  }
}

DaumMapOverlayOnScreen.propTypes = {
  top: React.PropTypes.number.isRequired,
  left: React.PropTypes.number.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
};

export default DaumMapOverlayOnScreen;
