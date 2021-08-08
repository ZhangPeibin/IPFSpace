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

          <link rel="icon" type="image/png" sizes="32x32" href="/static/ipfspace.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="/static/ipfspace.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/ipfspace.png" />

          <link rel="shortcut icon" href="/static/favicon.ico" />

          <link rel="apple-touch-icon" href="/static/ipfspace.png" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        {this.props.children}
      </React.Fragment>
    );
  }
}
