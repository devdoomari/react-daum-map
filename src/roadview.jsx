import React from 'react';
import ReactDOM from 'react-dom';
import daumAPIWrapper from './daum-api-wrapper';
import uuid from 'node-uuid';
import _ from 'lodash';
// const daumAPIWrapper = require('./daum-api-wrapper');

export default React.createClass({
  displayName: 'ReactDaumMap::roadview',
  propTypes: {
    APIKey: React.PropTypes.string,
    daumAPILoading: React.PropTypes.node,
    daumAPILoadFailed: React.PropTypes.node,
    position: React.PropTypes.array.isRequired,
    onChangePosition: React.PropTypes.func,
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
      roadviewClient: null,
      roadview: null,
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
      this.setState({
        daumMapAPI,
        roadview: new daumMapAPI.Roadview(containerDiv),
        roadviewClient: new daumMapAPI.RoadviewClient(),
      });
    })
    .catch((rejection)=> {
      ReactDOM.unmountComponentAtNode(containerDiv);
      ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
    });
  },
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  },
  render() {
    //const daumMapAPI = daumAPIWrapper.getDaumMapAPI();
    //const position = daumMapAPI.LatLng(this.props.position);
    return (
      <div ref="containerDiv"></div>
    );
  },
});
