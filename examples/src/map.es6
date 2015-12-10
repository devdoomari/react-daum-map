import ReactDOM from 'react-dom';
import React from 'react';
import {
  Row, Col,
  Button,
  Input,
} from 'react-bootstrap';
import _ from 'lodash';
import {
  DaumMapView,
  DAUM_BASE_MAP_TYPES,
  DAUM_OVERLAY_MAP_TYPES,
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
      baseMapType: DAUM_BASE_MAP_TYPES.ROADMAP,
    };
  },

  onMove(newPosition) {
    console.log(`new Position: ${newPosition}`);
  },
  onSetBaseMapType(event) {
    const baseMapType = event.target.value;
    this.setState({ baseMapType });
  },
  zoomOut() {
    const zoomLevel = this.state.zoomLevel + 1;
    this.setState({ zoomLevel });
  },
  movePositionUp() {
    const position = _.clone(this.state.position);
    position[0] = position[0] + 0.001;
    this.setState({ position });
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
                         onMove={this.onMove}
                         baseMapType={this.state.baseMapType}>
              <div position={this.state.note1Position}> Some Notes! </div>
            </DaumMapView>
          </Col>
        </Row>
        <Row>
          <Button onClick={this.movePositionUp}> up! </Button>
          <Button onClick={this.zoomOut}> Zoom Out! </Button>
          <Input type="select" label="BaseMapType" onChange={this.onSetBaseMapType}>
            <option value={DAUM_BASE_MAP_TYPES.ROADMAP}> ROADMAP </option>
            <option value={DAUM_BASE_MAP_TYPES.SKYVIEW}> SKYVIEW </option>
            <option value={DAUM_BASE_MAP_TYPES.HYBRID}> HYBRID </option>
          </Input>
        </Row>
      </div>
    );
  },
});

ReactDOM.render(
  <DaumRoadViewDemo/>,
  document.getElementById('app')
);
