// const _ = require('lodash');
import _ from 'lodash';

export default function getChildName(child) {
  let childName = '?';
  if (_.isString(child.type)) {
    childName = child.type;
  } else if (_.isFunction(child.type)) {
    if (child.type.displayName) {
      childName = child.type.displayName;
    }
    else {
      childName = child.type.name;
    }
  } else {
    console.error(`Could not get child name for: ${child}`);
  }
  return childName;

}
