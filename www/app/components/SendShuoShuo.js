// redux 开发组件实际在开发类
import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
// 引入路由
import { routerRedux } from 'dva/router';

// 文本框
import { Input } from 'antd';

// 上传图片
import PicturesWall from './PicturesWall.js';

const { TextArea } = Input;

class SendShuoShuo extends React.Component {
  constructor({ picshow, dispatch, params }) {
    super();
    this.state = {
      text: '',
    };
  }

  componentDidMount() {}

  textInput(e) {
    const text = e.target.value;
    this.setState({
      text,
    });
  }

  // 清空输入框
  emptyText() {
    this.setState({
      text: '',
    });
  }

  render() {
    return (
      <div className="" style={{ marginTop: '15px' }}>
        <TextArea
          style={{ fontSize: '14px' }}
          rows={4}
          placeholder="有什么新鲜事要分享？"
          onChange={this.textInput.bind(this)}
          value={this.state.text}
        />
        <div style={{ marginTop: '15px' }} />
        <PicturesWall
          text={this.state.text}
          emptyText={this.emptyText.bind(this)}
        />
      </div>
    );
  }
}

export default connect(({ user }) => ({
  user,
}))(SendShuoShuo);
