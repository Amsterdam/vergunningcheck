import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Error from "../components/Error";
import Layout from "../components/Layouts/DefaultLayout";

interface ITestProps {
  error: { stack: any; message: any } | any;
}

interface ITestState {
  error: any;
  errorInfo: any;
}

export default class ErrorPage extends Component<ITestProps, ITestState> {
  constructor(props: Readonly<ITestProps>) {
    super(props);

    this.state = { error: { ...props.error } };
  }

  componentDidCatch(error: any, errorInfo: any) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;
    return (
      <Layout>
        <Helmet>
          <title>Er is een fout opgetreden - Amsterdam Vergunningcheck</title>
        </Helmet>
        <Error
          {...error}
          children={children}
          heading={"Er is een fout opgetreden"}
        />
      </Layout>
    );
  }
}
