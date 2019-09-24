import React from 'react';
import styled from 'styled-components';

const Wrapper =
/*#__PURE__*/
(() => {
  const Wrapper =
  /*#__PURE__*/
  styled.div.withConfig({
    displayName: "code__Wrapper",
    componentId: "e0so0f-0"
  })(["color:blue;"]);
  Wrapper.defaultProps = {};
  return Wrapper;
})();

export const FunctionComponent =
/*#__PURE__*/
(() => {
  function FunctionComponent() {
    return <Wrapper />;
  }

  FunctionComponent.displayName = 'FancyName1';
  FunctionComponent.defaultProps = {};
  return FunctionComponent;
})();
