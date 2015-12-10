import ReactDOM from 'react-dom';
import React from 'react';
import {
  DaumRoadView,
} from '../../src/index';
import {
  APIKEY,
} from '../config';

const DaumRoadViewDemo = React.createClass({
  getInitialState() {
    return {
      position: [37.566826, 126.9786567],
      note1Position: [37.566826, 126.97865],
    };
  },
  render() {
    return (
      <DaumRoadView style={{width: 400, height: 400}} position={this.state.position}
                    APIKey={APIKEY}>
        <div position={this.state.note1Position}> Some Notes! </div>
      </DaumRoadView>
    );
  },
});

ReactDOM.render(
  <DaumRoadViewDemo/>,
  document.getElementById('app')
);
