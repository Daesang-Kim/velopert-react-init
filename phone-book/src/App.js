import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm'
import PhoneInfoList from './components/PhoneInfoList';
import Freesample from './components/Freesample';
import './App.css';

class App extends Component {
  id = 3
  state = {
    information: [
      {
        id: 0,
        name: 'ab',
        phone: '010-0000-0000'
      },
      {
        id: 1,
        name: 'aabb',
        phone: '010-0000-0001'
      },
      {
        id: 2,
        name: 'aaaa',
        phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    });
  }
  handleCreate = (data) => {
    const { information } = this.state;
    this.setState({
      information: information.concat({ id: this.id++, ...data })
    })
  }
  
  handleRemove = (id) => {
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    })
  }

  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
        ? {...info, ...data}
        : info
      )
    })
  }

  render() {
    const { information, keyword } = this.state;
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input 
            placeholder="검색 할 이름을 입력하세요.." 
            onChange={this.handleChange}
            value={keyword}
          />
        </p>
        <hr />
        <PhoneInfoList data={filteredList} onRemove={this.handleRemove} onUpdate={this.handleUpdate}/>
        <div>
          <input type="image" src="https://www.google.co.kr/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png" onfocus='this.blur()'></input> 
          <button type="button" style={{width:'150px', height:'150px', color:'red', fill:'green'}}>
            <div>
              버튼이다
              <Freesample/>
            </div>
          </button>
          <button type="button" style={{width:'100px', height:'100px', color:'blue', fill:'black'}}>
            <div>
              이것도
              <Freesample/>
            </div>
          </button>
        </div>
        
      </div>
    );
  }
}

export default App;
