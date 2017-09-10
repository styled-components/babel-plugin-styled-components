import React from 'react';
import styled from 'styled-components';

class Component extends React.Component {}

const _default = styled(Component).withConfig({
  displayName: 'before',
  componentId: 'pc6q8a-0'
})(['color:black;']);

export default _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Component, 'Component', '{{fixturesDir}}/before.js');

  __REACT_HOT_LOADER__.register(_default, 'default', '{{fixturesDir}}/before.js');
}();

;
