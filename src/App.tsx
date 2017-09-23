import * as React from "react"

interface AppProps {
  compiler: string
  framework: string
}

class App extends React.Component<AppProps, undefined> {
  render() {
    return (
      <h1>Hello World from {this.props.compiler} and {this.props.framework}!</h1>
    )
  }
}

export {
  App,
  AppProps,
}