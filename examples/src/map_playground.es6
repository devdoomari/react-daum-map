import ReactDOM from 'react-dom';
import React from 'react';
import {
  Row, Col,
  Button,
  Input,
} from 'react-bootstrap';
import Playground from 'component-playground';

import _ from 'lodash';
import {
  DaumMapView,
  DaumMapOverlayOnMap, DaumMapOverlayOnScreen,
  DAUM_BASE_MAP_TYPES,
  DAUM_OVERLAY_MAP_TYPES,
} from '../../src/index';
import {
  APIKEY,
} from '../config';
import {
  SimpleMapCode
} from './playground_samples/'

const PlaygroundDemo = React.createClass({
  render() {
    return (
      <div>
        <Playground codeText={SimpleMapCode}
                    scope={{React: React,
                            Button: Button,
                            ReactDOM: ReactDOM,
                          }}
                    collapsableCode={true}
                    es6Console={true}
        />
      </div>
    );
  },
});

ReactDOM.render(
  <PlaygroundDemo/>,
  document.getElementById('app')
);
