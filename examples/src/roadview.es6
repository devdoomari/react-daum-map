import ReactDOM from 'react-dom';
import React from 'react';
import {
  daumAPIWrapper,
  DaumRoadView,
} from '../../src/index';
import {
  APIKEY,
} from '../config';

const DaumRoadViewDemo = React.createClass({
  getInitialState() {
    return {
      position: [37.566826, 126.9786567],
    };
  },
  render() {
    return <DaumRoadView position={this.state.position}
                         APIKey={APIKEY} />;
  },
});

ReactDOM.render(
  <DaumRoadViewDemo/>,
  document.getElementById('app')
);
