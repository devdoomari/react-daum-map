import React from 'react';
import ReactDOM from 'react-dom';
import daumAPIWrapper from './daum-api-wrapper';
import uuid from 'node-uuid';
import _ from 'lodash';
// const daumAPIWrapper = require('./daum-api-wrapper');

export default React.createClass({
  displayName: 'ReactDaumMap::map',
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
      daumAPIWrapper.load(this.props.APIKey);
    }
    return {
      initialized: false,
      daumMap: null,
      daumMapOptions: {},
      daumMapAPI: null,
      daumMapPosition: null,
    };
  },
  componentDidMount() {
    const containerDiv = ReactDOM.findDOMNode(this.refs.containerDiv);
    ReactDOM.render(this.props.daumAPILoading, containerDiv);
    daumAPIWrapper.loadPromise.then(()=> {
      ReactDOM.unmountComponentAtNode(containerDiv);
      const daumMapAPI = daumAPIWrapper.getDaumMapAPI();
      const daumMapPosition = new daumMapAPI.LatLng(...this.props.position);
      const daumMapOptions = {
        center: daumMapPosition,
        level: 3,
      };
      const daumMap = new daumMapAPI.Map(containerDiv, daumMapOptions);
      this.setState({
        daumMapAPI,
        daumMap,
        daumMapOptions,
        daumMapPosition,
      });
    })
    .catch((rejection)=> {
      console.error(rejection);
      ReactDOM.unmountComponentAtNode(containerDiv);
      ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
    });
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render() {
    return (
      <div style={this.props.style} ref="containerDiv"></div>
    );
  },
});
