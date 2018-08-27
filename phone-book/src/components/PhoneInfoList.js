// src/components/PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined')
  }

  shouldComponentUpdate(nextProps, nextState) {
    // 객체를 복사해서 썼기 때문에 기존 데이터와 현재 데이터가 다름을 비교할 수 있다.
    // 복사하지 않았으면 항상 같은 데이터일 것이다. 레퍼런스 카피
    return nextProps.data !== this.props.data;
  }

  render() {
    console.log('render PhoneInfoList');
    const { data, onRemove, onUpdate } = this.props;
    const list = data.map(
      info => (<PhoneInfo key={info.id} info={info} onRemove={onRemove} onUpdate={onUpdate}/>)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;