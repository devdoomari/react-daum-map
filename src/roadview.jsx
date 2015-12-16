"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
var daum_api_wrapper_1 = require('./daum-api-wrapper');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = React.createClass({
    displayName: 'ReactDaumMap::roadview',
    propTypes: {
        APIKey: React.PropTypes.string,
        daumAPILoading: React.PropTypes.node,
        daumAPILoadFailed: React.PropTypes.node,
        position: React.PropTypes.array.isRequired,
        onChangePosition: React.PropTypes.func,
        style: React.PropTypes.object,
    },
    getDefaultProps() {
        return {
            apiKey: null,
            daumAPILoading: <h1> 다음 지도 API를 로드하는 중입니다. </h1>,
            daumAPILoadFailed: <h1> 다음 지도 API 로드를 실패하였습니다. </h1>,
        };
    },
    getInitialState() {
        if (this.props.APIKey) {
            daum_api_wrapper_1.default.load(this.props.APIKey);
        }
        return {
            initialized: false,
            roadviewClient: null,
            roadview: null,
            daumMapAPI: null,
            daumMapPosition: null,
        };
    },
    componentDidMount() {
        const containerDiv = ReactDOM.findDOMNode(this.refs.containerDiv);
        ReactDOM.render(this.props.daumAPILoading, containerDiv);
        daum_api_wrapper_1.default.loadPromise.then(() => {
            ReactDOM.unmountComponentAtNode(containerDiv);
            const daumMapAPI = daum_api_wrapper_1.default.getDaumMapAPI();
            const roadview = new daumMapAPI.Roadview(containerDiv);
            const roadviewClient = new daumMapAPI.RoadviewClient();
            const daumMapPosition = new daumMapAPI.LatLng(...this.props.position);
            roadviewClient.getNearestPanoId(daumMapPosition, 50, (panoId) => {
                roadview.setPanoId(panoId, daumMapPosition);
            });
            this.setState({
                daumMapAPI: daumMapAPI,
                roadview: roadview,
                roadviewClient: roadviewClient,
                daumMapPosition: daumMapPosition,
            });
        })
            .catch((rejection) => {
            console.error(rejection);
            ReactDOM.unmountComponentAtNode(containerDiv);
            ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
        });
    },
    shouldComponentUpdate() {
        return false;
    },
    render() {
        return (<div style={this.props.style} ref="containerDiv"></div>);
    },
});
