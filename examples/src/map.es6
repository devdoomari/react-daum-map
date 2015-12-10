import ReactDOM from 'react-dom';
import React from 'react';
import {
  Row, Col,
  Button,
} from 'react-bootstrap';
import _ from 'lodash';
import {
  DaumMapView,
} from '../../src/index';
import {
  APIKEY,
} from '../config';

const DaumRoadViewDemo = React.createClass({
  getInitialState() {
    return {
      position: [37.566826, 126.9786567],
      note1Position: [37.566826, 126.97865],
      zoomLevel: 3,
    };
  },
  movePositionUp() {
    const position = _.clone(this.state.position);
    console.log(position);
    position[0] = position[0] + 0.001;
    console.log(position);
    this.setState({ position });
  },
  zoomOut() {
    const zoomLevel = this.state.zoomLevel + 1;
    this.setState({ zoomLevel });
  },
  onMove(newPosition) {
    console.log(`new Position: ${newPosition}`);
  },
  render() {
    return (
      <div>
        <Row>
          <Col md={12}>
            <DaumMapView style={{ width: 400, height: 400 }}
                         position={this.state.position}
                         APIKey={APIKEY}
                         zoomLevel={this.state.zoomLevel}
                         onMove={this.onMove}>
              <div position={this.state.note1Position}> Some Notes! </div>
            </DaumMapView>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.movePositionUp}> up! </Button>

          <Button onClick={this.zoomOut}> Zoom Out! </Button>
        </Row>
      </div>
    );
  },
});

ReactDOM.render(
  <DaumRoadViewDemo/>,
  document.getElementById('app')
);
