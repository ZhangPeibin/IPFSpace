import * as React from "react";

import Head from "next/head";

export default class WebsitePrototypeWrapper extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Head>
          <title>{this.props.title}</title>
          <meta name="title" content={this.props.title} />
          <meta name="description" content={this.props.description} />

          <link rel="shortcut icon" href="/static/favicon.ico" />

          <link rel="apple-touch-icon" href="/static/ipfspace.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        {this.props.children}
      </React.Fragment>
    );
  }
}
