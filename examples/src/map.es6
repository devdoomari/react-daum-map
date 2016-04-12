import ReactDOM from 'react-dom';
import React, {
  Component
} from 'react';
import {
  Row, Col,
  Button,
  Input,
} from 'react-bootstrap';
import _ from 'lodash';
import {
  DaumMapView,
  DaumMapOverlayOnMap, DaumMapOverlayOnScreen,
  DAUM_BASE_MAP_TYPES,
  DAUM_OVERLAY_MAP_TYPES,
} from '../../src/index';
import {
  APIKEY,
} from '../config';

class DaumRoadViewDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [37.566826, 126.9786567],
      reportedPosition: [null, null],
      note1Position: [37.566826, 126.97865],
      zoomLevel: 3,
      baseMapType: DAUM_BASE_MAP_TYPES.ROADMAP,
      children: [],
    }
  }
  handleAddChild = () => {
    const children = _.concat(this.state.children, [<h1> Some Child! </h1>]);
    this.setState({ children });
  }
  handleMove = (reportedPosition) => {
    this.setState({ reportedPosition });
  }
  handleZoomChange = (zoomLevel) => {
    this.setState({ zoomLevel });
  }
  handleSetBaseMapType = (event) => {
    const baseMapType = event.target.value;
    this.setState({ baseMapType });
  }
  handleZoomOut = () => {
    const zoomLevel = this.state.zoomLevel + 1;
    this.setState({ zoomLevel });
  }
  handleMovePositionUp = () => {
    const position = _.clone(this.state.position);
    position[0] = position[0] + 0.001;
    this.setState({ position });
  }
  render = () => {
    return (
      <div>
        <Row>
          <Col md={12}>
            <DaumMapView style={{ width: 800, height: 600 }}
                         position={this.state.position}
                         APIKey={APIKEY}
                         zoomLevel={this.state.zoomLevel}
                         onMove={this.handleMove}
                         onZoomChange={this.handleZoomChange}
                         baseMapType={this.state.baseMapType}>
              <DaumMapOverlayOnMap lat={37.5668} lng={126.978} centered>
                <h3> Map Bound Overlay! </h3>
              </DaumMapOverlayOnMap>
              <DaumMapOverlayOnMap lat={37.5668} lng={126.978} centered>
                <img src={require('./imgs/target.svg')} style={{ width: 50, height: 50 }} />
              </DaumMapOverlayOnMap>
              <DaumMapOverlayOnMap lat={37.5628} lng={126.978} centered>
                <img src={require('./imgs/target.svg')} style={{ width: 50, height: 50 }} />
              </DaumMapOverlayOnMap>
              <DaumMapOverlayOnScreen top={200} left={200}>
                <h3> Screen Bound Overlay! </h3>
              </DaumMapOverlayOnScreen>

            </DaumMapView>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button onClick={this.handleMovePositionUp}> up! </Button>
            <Button onClick={this.handleZoomOut}> Zoom Out! </Button>
            <Button onClick={this.handleAddChild}> add child! </Button>
            <Input type="select" label="BaseMapType" onChange={this.handleSetBaseMapType}>
              <option value={DAUM_BASE_MAP_TYPES.ROADMAP}> ROADMAP </option>
              <option value={DAUM_BASE_MAP_TYPES.SKYVIEW}> SKYVIEW </option>
              <option value={DAUM_BASE_MAP_TYPES.HYBRID}> HYBRID </option>
            </Input>
            <h1>{`${this.state.reportedPosition[0]} : ${this.state.reportedPosition[1]}`}</h1>
            <h1>{`Zoom Level is: ${this.state.zoomLevel}`} </h1>
          </Col>
        </Row>
      </div>
    );
  }
}

ReactDOM.render(
  <DaumRoadViewDemo/>,
  document.getElementById('app')
);
