import React from 'react';
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
      daumAPILoadPromise: daumAPIWrapper.loadPromise,
      initialized: false,
      roadviewClient: null,
      roadViewContainer: null,
      roadview: null,
      containerDivId: uuid.v4(),
    };
  },

  componentWillMount() {
    if (!this.state.daumAPILoadPromise.isFulfilled()) {
      this.state.daumAPILoadPromise.then(()=> {
        this.setState({ daumAPILoadPromise: this.state.daumAPILoadPromise });
      });
    }
  },
  componentDidMount() {
    debugger;
    this.state.daumAPILoadPromise.then(()=> {
      const self = this;
      debugger;
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
