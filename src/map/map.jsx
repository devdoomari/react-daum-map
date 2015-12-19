import React from 'react';
import ReactDOM from 'react-dom';
import Promise from 'q';
import _ from 'lodash';

import daumAPIWrapper from '../daum-api-wrapper';
import {
  getChildName,
  daumMapCoordsToArrayCoords,
  daumMapBoundsToMinMaxBounds,
} from '../utils';
import DAUM_BASE_MAP_TYPES, {
  convertToDaumBaseMapType,
} from './constants/base-map-types';
import OverlayContainer from './overlay/container';
import Bounds from '../datatypes/bounds';


export default React.createClass({
  displayName: 'ReactDaumMap::map',
  propTypes: {
    APIKey: React.PropTypes.string,
    daumAPILoading: React.PropTypes.node,
    daumAPILoadFailed: React.PropTypes.node,
    position: React.PropTypes.array.isRequired,
    onMove: React.PropTypes.func,
    style: React.PropTypes.object,
    baseMapType: React.PropTypes.oneOf([..._.keys(DAUM_BASE_MAP_TYPES), undefined]),
    overlayMapTypes: React.PropTypes.array,
    zoomLevel: React.PropTypes.number,
  },
  getInitialState() {
    if (this.props.APIKey) {
      daumAPIWrapper.load(this.props.APIKey);
    }
    const initDeferred = Promise.defer();
    const initPromise = initDeferred.promise;
    return {
      map: null,
      options: {},
      API: null,
      initPromise, initDeferred,
      position: null,
      bounds: new Bounds({
        minLat: null,
        maxLat: null,
        minLng: null,
        maxLng: null,
      }),
    };
  },
  getDefaultProps() {
    return {
      apiKey: null,
      daumAPILoading: <h1> 다음 지도 API를 로드하는 중입니다. </h1>,
      daumAPILoadFailed: <h1> 다음 지도 API 로드를 실패하였습니다. </h1>,
      onMove: ()=> {},
    };
  },
  componentDidMount() {
    const containerDiv = ReactDOM.findDOMNode(this.refs.containerDiv);
    ReactDOM.render(this.props.daumAPILoading, containerDiv);
    daumAPIWrapper.loadPromise.then(()=> {
      ReactDOM.unmountComponentAtNode(containerDiv);
      this.state.API = daumAPIWrapper.getDaumMapAPI();
      const daumLatLng = new this.state.API.LatLng(...this.props.position);
      this.state.options = {
        center: daumLatLng,
        level: 3,
        mapTypeId: convertToDaumBaseMapType(this.props.baseMapType),
      };
      this.state.map = new this.state.API.Map(containerDiv, this.state.options);

      this.state.API.event.addListener(
        this.state.map, 'center_changed', this.onMove);
      const position = daumMapCoordsToArrayCoords(
          this.state.map.getCenter());
      const bounds = daumMapBoundsToMinMaxBounds(
          this.state.map.getBounds());
      this.setState({
        position,
        bounds,
      });


      this.state.initDeferred.resolve();
    })
    .catch((rejection)=> {
      console.error(rejection);
      ReactDOM.unmountComponentAtNode(containerDiv);
      ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
      this.state.initDeferred.reject(rejection);
    });
  },
  componentWillReceiveProps(nextProps) {
    const positionChanged = !_.isEqual(this.props.position, nextProps.position);
    if (positionChanged) {
      this.state.initPromise.then(()=> {
        this.state.map.setCenter(new this.state.API.LatLng(...nextProps.position));
        const position = daumMapCoordsToArrayCoords(
          this.state.map.getCenter());
        const bounds = daumMapBoundsToMinMaxBounds(
          this.state.map.getBounds());
        this.setState({ position, bounds });
      });
    }
    const zoomLevelChanged = !_.isEqual(this.props.zoomLevel, nextProps.zoomLevel);
    if (zoomLevelChanged) {
      this.state.initPromise.then(()=> {
        this.state.map.setLevel(nextProps.zoomLevel);
        const bounds = daumMapBoundsToMinMaxBounds(
          this.state.map.getBounds());
        this.setState({ bounds });
      });
    }
    const baseMapTypeChanged = !_.isEqual(this.props.baseMapType, nextProps.baseMapType);
    if (baseMapTypeChanged) {
      this.state.initPromise.then(()=> {
        this.state.map.setMapTypeId(convertToDaumBaseMapType(nextProps.baseMapType));
      });
    }
  },
  onMove() {
    const daumPosition = this.state.map.getCenter();
    const position = daumMapCoordsToArrayCoords(daumPosition);
    const bounds = daumMapBoundsToMinMaxBounds(
      this.state.map.getBounds());
    this.setState({ position, bounds });
    this.props.onMove(position);
  },
  render() {
    return (
      <div key="rootContainer" style={{...this.props.style, position: 'relative' }}>
        <div key="container"
             style={{
                ...this.props.style,
                position: 'absolute',
                zIndex: 1
             }}
             ref="containerDiv"/>
        <div key="overlays"
             style={{
               position: 'absolute',
               zIndex: 2,
               //overlay: 'hidden'
             }}>
          <OverlayContainer
              position={this.state.position}
              bounds={this.state.bounds}
              width={this.props.style.width}
              height={this.props.style.height}>
            {this.props.children}
          </OverlayContainer>
        </div>
      </div>
    );
  },
});
