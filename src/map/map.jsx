import React from 'react';
import ReactDOM from 'react-dom';
import daumAPIWrapper from '../daum-api-wrapper';
import Promise from 'q';
import _ from 'lodash';


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
  /* Daum Map API specific objects are stored in this.daumMap */

  componentWillMount() {
    if (this.props.APIKey) {
      daumAPIWrapper.load(this.props.APIKey);
    }
    const initDeferred = Promise.defer();
    const initPromise = initDeferred.promise;
    this.daumMap = {
      map: null,
      options: {},
      API: null,
      initPromise, initDeferred,
    };
  },
  componentDidMount() {
    const containerDiv = ReactDOM.findDOMNode(this.refs.containerDiv);
    ReactDOM.render(this.props.daumAPILoading, containerDiv);
    daumAPIWrapper.loadPromise.then(()=> {
      ReactDOM.unmountComponentAtNode(containerDiv);
      this.daumMap.API = daumAPIWrapper.getDaumMapAPI();
      const position = new this.daumMap.API.LatLng(...this.props.position);
      this.daumMap.options = {
        center: position,
        level: 3,
      };
      this.daumMap.map = new this.daumMap.API.Map(containerDiv, this.daumMap.options);
      this.daumMap.initDeferred.resolve();
    })
    .catch((rejection)=> {
      console.error(rejection);
      ReactDOM.unmountComponentAtNode(containerDiv);
      ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
      this.daumMap.initDeferred.reject(rejection);
    });
  },
  componentWillReceiveProps(nextProps) {
    const positionChanged = !_.isEqual(this.props.position, nextProps.position);
    if (positionChanged) {
      this.daumMap.initPromise.then(()=> {
        this.daumMap.map.panTo(new this.daumMap.API.LatLng(...nextProps.position));
      });
    }
  },
  shouldComponentUpdate() {
    // don't update react-dom ever.
    return false;
  },
  render() {
    return (
      <div style={this.props.style} ref="containerDiv"></div>
    );
  },
});
