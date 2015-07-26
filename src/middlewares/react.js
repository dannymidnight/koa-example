import React from 'react';
import Html from '../components/Html';
import path from 'path';

function renderReact(componentPath, props={}) {
  componentPath = path.join('../components', componentPath);

  delete require.cache[componentPath];
  let Component = require(componentPath);

  return React.renderToStaticMarkup(React.createElement(Html, {
    title: props.title,
    styles: props.styles.map(style => this.asset(style)),
    scripts: props.scripts.map(script => this.asset(script)),
    markup: React.renderToString(React.createElement(Component, props))
  }));
}

export default function *(next) {
  this.react = renderReact;
  yield next;
}
