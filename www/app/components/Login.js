import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor({ handleCancel }) {
    super();
    this.state = {
      handleCancel,
      visible: false,
    };
  }

  handleSubmit(e) {
    const self = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log('Received values of form: ', values);
        // 这里使用ajax发送登录请求，如果登录成功，在回调函数中修改全局数据
        $.ajax({
          type: 'post',
          url: '/account/login',
          data: values,
          success(data) {
            if (data.data) {
              // 修改全局数据
              self.props.dispatch({
                type: 'user/doLogin',
                user: data.data.user,
              });
              // 登录成功后，隐藏登录窗口
              if (self.props.handleCancel) {
                self.props.handleCancel();
              }
            } else if (data.errorCode) {
              console.log('登录失败');
              self.setState({ visible: true });
            }
          },
        });
      }
    });
  }

  componentDidMount() {}

  textInput() {
    this.setState({ visible: false });
  }

  registerClick() {
    this.props.dispatch(routerRedux.push('/register'));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    const result = visible ? 'block' : 'none';
    $(this.refs.tip).css('display', result);
    return (
      <div style={{ position: 'relative' }}>
        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: '请输入用户名!' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="用户名"
                onChange={this.textInput.bind(this)}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码!' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder="密码"
                onChange={this.textInput.bind(this)}
              />,
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(<Checkbox>记住我</Checkbox>)}
            <a className="login-form-forgot" href="" style={{ float: 'right' }}>
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ display: 'block', width: '100%' }}
            >
              登录
            </Button>
            还没有账号？
            <a onClick={this.registerClick.bind(this)}>立即注册!</a>
          </FormItem>
        </Form>
        <p
          ref="tip"
          style={{
            position: 'absolute',
            bottom: '95px',
            left: '156px',
            color: 'red',
            display: 'none',
          }}
        >
          用户名或密码错误！
        </p>
      </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);

export default connect(({ user }) => ({
  user,
}))(Login);
