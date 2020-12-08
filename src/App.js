import React, { Component } from 'react';
import Subject from './components/Subject';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Control from './components/Control';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.max_content_id = 3;
    // state 값이 바뀌면, 이 state를 가지고 있는 모든 컴퍼넌트의 render 함수 다시 호출
    this.state = {
      mode: 'create',
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

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>;
    } else if (this.state.mode === 'create') {
      _article = <CreateContent onSubmit={function (_title, _desc) {
        // add content tot this.state.contents
        // console.log(_title, _desc);
        this.max_content_id = this.max_content_id + 1;

        // concat으로 원본은 보존하고, 복제된 배열 사용
        var _contents = this.state.contents.concat(
          { id: this.max_content_id, title: _title, desc: _desc }
        )
        // push는 원본 수정하여 사용
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        // );

        this.setState({
          contents: _contents
          // contents:this.state.contents
        });
      }.bind(this)}></CreateContent>;
    } else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={
        function (_id, _title, _desc) {

          var _contents = Array.from(this.state.contents);
          var i = 0;
          while(i < _contents.length) {
            if(_contents[i].id === _id) {
              _contents[i] = {id: _id, title: _title, desc: _desc};
              break;
            }
            i = i + 1;
          }
          // var _contents = this.state.contents.concat(
          //   { id: this.max_content_id, title: _title, desc: _desc }
          // )

          this.setState({
            contents: _contents
          });
        }.bind(this)}></UpdateContent>;
    }
    return _article;
  }


  // 어떤 html을 그릴 것인지 결정 -> 화면이 다시 그려짐
  render() {
    console.log('App render');

    return (
      <div className="App">

        {/* Subject.js에서 props->state */}
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' });
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
          onChangePage={function (id) {
            // debugger;
            // alert('hi');
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>

        <Control onChangeMode={function (_mode) {
          this.setState({
            mode: _mode
          });
        }.bind(this)}></Control>

        {this.getContent()}
        {/* {_article} */}
        {/* <ReadContent title={_title} desc={_desc}></ReadContent> */}

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
