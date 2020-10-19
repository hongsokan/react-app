import React, { Component } from 'react';

class Subject extends Component {
    render() {
      return (
        // 하나의 최상위 태그만 써야한다
        // JSX 문법, html 태그 인식
        <header>
          <h1>{this.props.title}</h1>
          {this.props.sub}
        </header>
      );
    }
  }

export default Subject;