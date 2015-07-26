import React from 'react';

class Html extends React.Component {
  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

          <title>{this.props.title}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content={this.props.description} />

          <link rel="shortcut icon" href="/static/favicon.png" />

          {this.props.styles.map((path) => {
            return <link key={path} rel="stylesheet" href={path} />;
          })}
        </head>

        <body>
          <div id="app" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          <script dangerouslySetInnerHTML={{__html: this.props.state}}></script>
        </body>

        {this.props.scripts.map((path) => {
          return <script key={path} src={path} />;
        })}
      </html>
    );
  }
}

Html.propTypes = {
  scripts: React.PropTypes.array,
  styles: React.PropTypes.array,
  title: React.PropTypes.string.isRequired,
  markup: React.PropTypes.string.isRequired
};

export default Html;
