import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Content from './components/Content';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    // state 값이 바뀌면, 이 state를 가지고 있는 모든 컴퍼넌트의 render 함수 다시 호출
    this.state = {
      mode: 'read',
      selected_content_id: 2, // contents에서 선택된 내용 화면에 표시
      subject: { title: 'WEB', sub: 'World Wide Web!' },
      welcome: { title: 'Welcome', desc: 'Hello, React!' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is for information' },
        { id: 2, title: 'CSS', desc: 'CSS is for design' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive' }
      ]
    }
  }

  // 어떤 html을 그릴 것인지 결정 -> 화면이 다시 그려짐
  render() {
    console.log('App render');
    var _title, _desc = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if (this.state.mode === 'read') {
      var i = 0;
      while(i < this.state.contents.length) {
        var data = this.state.contents[i];
        if(data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        i = i + 1;
      }
    }

    return (
      <div className="App">

        {/* Subject.js에서 props->state */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode:'welcome'});
          }.bind(this)}
        >
        </Subject>

        {/* 컴포넌트 <Subject></Subject> */}
        {/* 컴포넌트 + props <Subject title="WEB" sub="world wide web!"></Subject> */}
        {/* 컴포넌트 + state */}
        {/* <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}>
        </Subject> */}
        {/* <Subject title="React" sub="For UI"></Subject> */}

        {/* <TOC></TOC> */}
        <TOC 
          onChangePage={function(id){
            // debugger;
            // alert('hi');
            this.setState({
              mode:'read',
              selected_content_id: Number(id)
            });
          }.bind(this)} 
          data={this.state.contents}
        ></TOC>

        <Content title={_title} desc={_desc}></Content>

      </div>

      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //   </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //   </a>
      //   </header>
      // </div>
    );
  }
}

// 함수 방식도 가능하지만 수업에선 class 로 진행
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
