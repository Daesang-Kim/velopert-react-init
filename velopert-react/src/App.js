import React, { Component } from 'react';
import MyName from './MyName'
import Counter from './Counter'
import './App.css';

class App extends Component {
  render() {
   
    return (
      <div className='App'>
        안녕하세요 Hi there!
        <MyName name='도깨비' />
        <MyName  />
        <MyName name='방망이' />
        <Counter />
      </div>
    );
  }
}
/**
 * props 는 부모 컴포넌트가 자식 컴포넌트에게 주는 값
 * 자식 컴포넌트에서는 props 를 받아오기만하고, 받아온 props 를 직접 수정 할 수 는 없습니다.
 * 반면에 state 는 컴포넌트 내부에서 선언하며 내부에서 값을 변경 할 수 있습니다.
 */
export default App;
