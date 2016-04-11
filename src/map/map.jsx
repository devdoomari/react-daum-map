import React from 'react';
import ReactDOM from 'react-dom';
import {
  defer,
} from 'q';
import _ from 'lodash';

import daumAPIWrapper from '../daum-api-wrapper';

import {
  daumMapCoordsToArrayCoords,
  daumMapBoundsToMinMaxBounds,
} from '../utils';

import DAUM_BASE_MAP_TYPES, { convertToDaumBaseMapType } from './constants/base-map-types';
import OverlayContainer from './overlay/container';
import Bounds from '../datatypes/bounds';

export default class DaumMap extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.APIKey) {
      this.daumAPILoadPromise = daumAPIWrapper.load(this.props.APIKey);
    }

    this.initDeferred = defer();
    this.initPromise = this.initDeferred.promise;

    this.state = {
      map: null,
      options: {},
      API: null,
      position: null,
      bounds: new Bounds({
        minLat: null,
        maxLat: null,
        minLng: null,
        maxLng: null,
      }),
    };
  }
  componentDidMount() {
    const containerDiv = ReactDOM.findDOMNode(this.refs.containerDiv);
    ReactDOM.render(this.props.daumAPILoading, containerDiv);
    this.daumAPILoadPromise.then(() => {
      ReactDOM.unmountComponentAtNode(containerDiv);
      const daumAPI = daumAPIWrapper.getDaumMapAPI();
      const daumLatLng = new daumAPI.LatLng(...this.props.position);
      const options = {
        center: daumLatLng,
        level: 3,
        mapTypeId: convertToDaumBaseMapType(this.props.baseMapType),
      };
      const daumMap = new daumAPI.Map(containerDiv, options);

      daumAPI.event.addListener(
        daumMap, 'center_changed', this.onMove);
      const position = daumMapCoordsToArrayCoords(daumMap.getCenter());
      const bounds = daumMapBoundsToMinMaxBounds(daumMap.getBounds());

      this.map = daumMap;
      this.mapAPI = daumAPIWrapper.getDaumMapAPI();
      this.setState({
        options,
        position,
        bounds,
      });
      this.initDeferred.resolve();
    })
    .catch((rejection) => {
      console.error(rejection);
      ReactDOM.unmountComponentAtNode(containerDiv);
      ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
      this.initDeferred.reject(rejection);
    });
  }
  componentWillReceiveProps = (nextProps) => {
    const positionChanged = !_.isEqual(this.props.position, nextProps.position);
    if (positionChanged) {
      this.initPromise.then(() => {
        this.map.setCenter(new this.mapAPI.LatLng(...nextProps.position));
        const position = daumMapCoordsToArrayCoords(
          this.map.getCenter());
        const bounds = daumMapBoundsToMinMaxBounds(
          this.map.getBounds());
        this.setState({ position, bounds });
      });
    }
    const zoomLevelChanged = !_.isEqual(this.props.zoomLevel, nextProps.zoomLevel);
    if (zoomLevelChanged) {
      this.initPromise.then(() => {
        this.map.setLevel(nextProps.zoomLevel);
        const bounds = daumMapBoundsToMinMaxBounds(
          this.map.getBounds());
        this.setState({ bounds });
      });
    }
    const baseMapTypeChanged = !_.isEqual(this.props.baseMapType, nextProps.baseMapType);
    if (baseMapTypeChanged) {
      this.initPromise.then(() => {
        this.map.setMapTypeId(convertToDaumBaseMapType(nextProps.baseMapType));
      });
    }
  }
  onMove = () => {
    const daumPosition = this.map.getCenter();
    const position = daumMapCoordsToArrayCoords(daumPosition);
    const bounds = daumMapBoundsToMinMaxBounds(
      this.map.getBounds());
    this.setState({ position, bounds });
    this.props.onMove(position);
  }
  render() {
    return (
      <div
        key="rootContainer"
        style={{ ...this.props.style, position: 'relative' }}
      >
        <div
          key="container"
          style={{
            ...this.props.style,
            position: 'absolute',
            zIndex: 1,
          }}
          ref="containerDiv"
        />
        <div
          key="overlays"
          style={{
            position: 'absolute',
            zIndex: 2,
          }}
        >
          <OverlayContainer
            position={this.state.position}
            bounds={this.state.bounds}
            width={this.props.style.width}
            height={this.props.style.height}
          >
            {this.props.children}
          </OverlayContainer>
        </div>
      </div>
    );
  }
}

DaumMap.propTypes = {
  children: React.PropTypes.oneOf([
    React.PropTypes.array,
    React.PropTypes.object,
  ]),
  APIKey: React.PropTypes.string,
  daumAPILoading: React.PropTypes.node,
  daumAPILoadFailed: React.PropTypes.node,
  position: React.PropTypes.array.isRequired,
  onMove: React.PropTypes.func,
  style: React.PropTypes.object,
  baseMapType: React.PropTypes.oneOf([
    ..._.keys(DAUM_BASE_MAP_TYPES),
    undefined,
  ]),
  overlayMapTypes: React.PropTypes.array,
  zoomLevel: React.PropTypes.number,
};

DaumMap.defaultProps = {
  apiKey: null,
  daumAPILoading: <h1> 다음 지도 API를 로드하는 중입니다. </h1>,
  daumAPILoadFailed: <h1> 다음 지도 API 로드를 실패하였습니다. </h1>,
  onMove: () => {},
};
