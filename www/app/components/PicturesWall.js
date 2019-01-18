// redux 开发组件实际在开发类
import React from 'react';
import { connect } from 'dva';
import classnames from 'classnames';
import { Upload, Icon, Modal, Button } from 'antd';

import './PicturesWall.less';

class PicturesWall extends React.Component {
  constructor(text) {
    super();
    // 这里的text是从父元素sendShuoshuo 传递进来的，是textArea中的输入内容
    this.state = {
      previewVisible: false,
      warnVisible: false,
      warnText: '',
      previewImage: '',
      fileList: [],
      text,
      pathArr: [],
    };
  }

  // 接收从父元素传递来的参数
  componentWillReceiveProps(props) {
    this.setState({
      text: props.text,
    });
  }

  handleCancel() {
    this.setState({ previewVisible: false, warnVisible: false });
  }

  handlePreview(file) {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange({ file, fileList, event }) {
    const { name, response } = file;
    // console.log(response);
    this.setState({
      fileList,
    });
  }

  // 发表说说
  sumit() {
    // 检测本地有没有用户登录信息
    const { email, nickname, avata } = this.props.user.user;
    const { fileList, text, warnVisible, warnText } = this.state;
    if (!email) {
      this.setState({
        warnVisible: true,
        warnText: '登录才能发表',
      });
      return;
    }

    if (text == '' && fileList.length == 0) {
      this.setState({
        warnVisible: true,
        warnText: '您并没有输入内容',
      });
      return;
    }

    // 检测到有登录，可以发表。
    const pathArr = this.state.fileList.map(
      (item, index) => item.response.data.picPath,
    );

    this.props.dispatch({
      type: 'talk/submitShuoShuo',
      email,
      text,
      pathArr,
    });

    // 发表完成后，清空图片和输入框内容
    this.setState({
      fileList: [],
    });
    if (this.props.emptyText) {
      this.props.emptyText();
    }
  }

  render() {
    const {
      previewVisible,
      warnVisible,
      warnText,
      previewImage,
      fileList,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">点击上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="/community/uploadPic"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview.bind(this)}
          onChange={this.handleChange.bind(this)}
        >
          {fileList.length >= 9 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Modal
          title="提示!"
          width="300px"
          visible={warnVisible}
          footer={null}
          onCancel={this.handleCancel.bind(this)}
        >
          {warnText}
        </Modal>
        <div style={{ clear: 'both' }} />
        <div>
          <Button
            type="primary"
            onClick={() => {
              this.sumit();
            }}
          >
            发布
          </Button>
        </div>
      </div>
    );
  }
}

export default connect(({ user }) => ({
  user,
}))(PicturesWall);
