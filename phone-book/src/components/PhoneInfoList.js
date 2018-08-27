// src/components/PhoneInfoList.js
import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
  static defaultProps = {
    data: [],
    onRemove: () => console.warn('onRemove not defined')
  }

  render() {
    const { data, onRemove } = this.props;
    const list = data.map(
      info => (<PhoneInfo key={info.id} info={info} onRemove={onRemove}/>)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;