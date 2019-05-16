import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import MdFile from './Chapter3_scope_closures.md';

const input = <MdFile/>;

class App extends Component {
  render() {
    return (
      <div className="App">
        <ReactMarkdown source={<MdFile/>}/>
      </div>
    );
  }
}

export default App;
