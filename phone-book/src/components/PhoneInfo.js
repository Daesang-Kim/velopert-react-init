// file: src/components/PhoneInfo.js
import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: '이름',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    editing: false,
    name:'',
    phone:''
  }

  handleRemove = () => {
    // 삭제 버튼이 클릭되면 onRemove 에 id 넣어서 호출
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }

  // editing 값을 반전시키는 함수입니다
  // true -> false, false -> true
  handleToggleEdit = () => {    /* 2. 수정,적용 버튼이 눌러짐으로 인해 이 함수가 호출되고 */
    const { editing } = this.state;
    this.setState({ editing: !editing });     /* 3. 여기서 state를 변경하여 */
  }

  // input 에서 onChange 이벤트가 발생 될 때
  // 호출되는 함수입니다
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState) {              /* 4. 라이프 사이클에 의해 이 함수가 호출된다. -> 5번 또는 6번으로 이동*/
    // 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.

    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing) {        /* 5. 여기서 수정모드로 변경 하면 이 페이지에서 UI만 변경시키는 것이기 때문에 내부에서만 처리함 */
      // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다
      // 여기서는 데이터를 위로 올려보내줄 필요가 없음.
      // 단지 데이터만 변경되는것이기 때문에 setState로 칸에 값만 넣어준다.
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if (prevState.editing && !this.state.editing) {     /* 6. 적용 버튼을 눌렀다면 update를 호출하여 상위 컴포넌트로 전달 한다. */
      // editing 값이 true -> false 로 전환 될 때
      // 적용을 눌렀을 시점에는 데이터가 변경되기 때문에 onUpdate를 호출하여 위로 올려준다. (onUpdate는 부모로부터 프로퍼티로 전달 받은 함수포인터)
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  
  render() {
    const style = {
      border: '1px solid black',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    
    if (editing) { // 수정모드
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="이름"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="전화번호"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>적용</button>
          <button onClick={this.handleRemove}>삭제</button>
        </div>
      );
    }

    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>수정</button>   {/*1. 여기서 수정 버튼을 누르면*/}
        <button onClick={this.handleRemove}>삭제</button>
      </div>
    );
  }
}

export default PhoneInfo;