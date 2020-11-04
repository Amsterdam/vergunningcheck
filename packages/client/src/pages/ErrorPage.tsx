import { Paragraph } from "@amsterdam/asc-ui";
import React, { Component } from "react";
import { Helmet } from "react-helmet";

import Error from "../components/Error";

interface ITestProps {
  error: { stack: any; message: any } | any;
}

interface ITestState {
  error: any;
  errorInfo: any;
}
interface TestVectorLayer {
  // members of your "class" go here
}

export default class ErrorPage extends Component<ITestProps, ITestState> {
  constructor(props: Readonly<ITestProps>) {
    super(props);

    this.state = { error: { ...props.error }, errorInfo: "" };
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
      <>
        <Helmet>
          <title>Er is een fout opgetreden - Amsterdam Vergunningcheck</title>
        </Helmet>
        {error.length > 0 && (
          <Error {...error} heading={"Er is een fout opgetreden"} />
        )}
        {/* eslint-disable-next-line no-throw-literal */}
        <Paragraph
          onClick={() => {
            throw String("error");
          }}
        >
          asdadssda
        </Paragraph>
        {children}
      </>
    );
  }
}
