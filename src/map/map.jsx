"use strict";
var React = require('react');
var ReactDOM = require('react-dom');
var daum_api_wrapper_1 = require('../daum-api-wrapper');
var utils_1 = require('../utils');
var base_map_types_1 = require('./constants/base-map-types');
var container_1 = require('./overlay/container');
var Promise = require('q');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = React.createClass({
    displayName: 'ReactDaumMap::map',
    propTypes: {
        APIKey: React.PropTypes.string,
        daumAPILoading: React.PropTypes.node,
        daumAPILoadFailed: React.PropTypes.node,
        position: React.PropTypes.array.isRequired,
        onMove: React.PropTypes.func,
        style: React.PropTypes.object,
        baseMapType: React.PropTypes.oneOf([..._.keys(base_map_types_1.default), undefined]),
        overlayMapTypes: React.PropTypes.array,
        zoomLevel: React.PropTypes.number,
    },
    getInitialState() {
        if (this.props.APIKey) {
            daum_api_wrapper_1.default.load(this.props.APIKey);
        }
        const initDeferred = Promise.defer();
        const initPromise = initDeferred.promise;
        return {
            map: null,
            options: {},
            API: null,
            initPromise: initPromise, initDeferred: initDeferred,
            position: null,
            bounds: {
                minLat: null,
                maxLat: null,
                minLng: null,
                maxLng: null,
            },
        };
    },
    getDefaultProps() {
        return {
            apiKey: null,
            daumAPILoading: <h1> 다음 지도 API를 로드하는 중입니다. </h1>,
            daumAPILoadFailed: <h1> 다음 지도 API 로드를 실패하였습니다. </h1>,
            onMove: () => { },
        };
    },
    componentDidMount() {
        const containerDiv = ReactDOM.findDOMNode(this.refs.containerDiv);
        ReactDOM.render(this.props.daumAPILoading, containerDiv);
        daum_api_wrapper_1.default.loadPromise.then(() => {
            ReactDOM.unmountComponentAtNode(containerDiv);
            this.state.API = daum_api_wrapper_1.default.getDaumMapAPI();
            const daumLatLng = new this.state.API.LatLng(...this.props.position);
            this.state.options = {
                center: daumLatLng,
                level: 3,
                mapTypeId: base_map_types_1.convertToDaumBaseMapType(this.props.baseMapType),
            };
            this.state.map = new this.state.API.Map(containerDiv, this.state.options);
            this.state.API.event.addListener(this.state.map, 'center_changed', this.onMove);
            const position = utils_1.daumMapCoordsToArrayCoords(this.state.map.getCenter());
            const bounds = utils_1.daumMapBoundsToMinMaxBounds(this.state.map.getBounds());
            this.setState({
                position: position,
                bounds: bounds,
            });
            this.state.initDeferred.resolve();
        })
            .catch((rejection) => {
            console.error(rejection);
            ReactDOM.unmountComponentAtNode(containerDiv);
            ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
            this.state.initDeferred.reject(rejection);
        });
    },
    componentWillReceiveProps(nextProps) {
        const positionChanged = !_.isEqual(this.props.position, nextProps.position);
        if (positionChanged) {
            this.state.initPromise.then(() => {
                this.state.map.setCenter(new this.state.API.LatLng(...nextProps.position));
                const position = utils_1.daumMapCoordsToArrayCoords(this.state.map.getCenter());
                const bounds = utils_1.daumMapBoundsToMinMaxBounds(this.state.map.getBounds());
                this.setState({ position: position, bounds: bounds });
            });
        }
        const zoomLevelChanged = !_.isEqual(this.props.zoomLevel, nextProps.zoomLevel);
        if (zoomLevelChanged) {
            this.state.initPromise.then(() => {
                this.state.map.setLevel(nextProps.zoomLevel);
                const bounds = utils_1.daumMapBoundsToMinMaxBounds(this.state.map.getBounds());
                this.setState({ bounds: bounds });
            });
        }
        const baseMapTypeChanged = !_.isEqual(this.props.baseMapType, nextProps.baseMapType);
        if (baseMapTypeChanged) {
            this.state.initPromise.then(() => {
                this.state.map.setMapTypeId(base_map_types_1.convertToDaumBaseMapType(nextProps.baseMapType));
            });
        }
    },
    onMove() {
        const daumPosition = this.state.map.getCenter();
        const position = utils_1.daumMapCoordsToArrayCoords(daumPosition);
        const bounds = utils_1.daumMapBoundsToMinMaxBounds(this.state.map.getBounds());
        this.setState({ position: position, bounds: bounds });
        this.props.onMove(position);
    },
    render() {
        return (<div key='rootContainer' style={_.assign({}, this.props.style, { position: 'relative' })}>
        <div key="container" style={_.assign({}, this.props.style, {
            position: 'absolute',
            zIndex: 1
        })} ref="containerDiv"/>
        <div key="overlays" style={{
            position: 'absolute',
            zIndex: 2,
            overlay: 'hidden'
        }}>
          <container_1.default position={this.state.position} bounds={this.state.bounds} width={this.props.style.width} height={this.props.style.height}>
            {this.props.children}
          </OverlayContainer>
        </div>
      </div>);
    },
});
