const React = require('react');
const ReactDOM = require('react-dom');
import daumAPIWrapper from './daum-api-wrapper';

export default React.createClass({
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
      const roadview = new daumMapAPI.Roadview(containerDiv);
      const roadviewClient = new daumMapAPI.RoadviewClient();
      const daumMapPosition = new daumMapAPI.LatLng(...this.props.position);
      roadviewClient.getNearestPanoId(daumMapPosition, 50, (panoId)=> {
        roadview.setPanoId(panoId, daumMapPosition);
      });
      this.setState({
        daumMapAPI,
        roadview,
        roadviewClient,
        daumMapPosition,
      });
    })
    .catch((rejection)=> {
      console.error(rejection);
      ReactDOM.unmountComponentAtNode(containerDiv);
      ReactDOM.render(this.props.daumAPILoadFailed, containerDiv);
    });
  },
  shouldComponentUpdate() {
    return false;
  },
  render() {
    return (
      <div style={this.props.style} ref="containerDiv"></div>
    );
  },
});
