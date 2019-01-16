import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Modal,
} from 'antd';
import './Register.less';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      emailValidate: true,
      visible: false,
      content: '恭喜！注册成功',
      autoCompleteResult: [],
    };
  }

  hideModal() {
    this.setState({
      visible: false,
    });
    // 执行页面的跳转
    this.props.dispatch(routerRedux.push('/shuoshuo'));
  }

  // 点击注册按钮调用此方法
  handleSubmit(showModal) {
    // e.preventDefault();
    const self = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        /*
					value 是个json
					Object {email: "1121181506@qq.com", password: "123", confirm: "123", nickname: "1223", agreement: true}
        			在这里发送请求
        		*/
        // console.log('Received values of form: ', values);
        $.ajax({
          type: 'post',
          url: '/account/register',
          data: values,
          success(data) {
            if (data.data) {
              console.log('注册成功');
              // 跳转到登录页面
              // self.setState({ visible: true });
            } else if (data.errorCode === 'DUP') {
              console.log('邮箱被占用');
            } else {
              console.log('存储失败');
              self.setState({ visible: true, content: '服务器繁忙,稍后再试' });
            }
          },
        });
      }
    });
  }

  // 验证邮箱是否有效
  emailConfirmBlur(e) {
    // 使用ajax实现
    const value = e.target.value;
    const self = this;
    $.ajax({
      type: 'patch',
      url: '/account/emailConfirm',
      data: {
        email: value,
      },
      success(data) {
        if (!data.data) {
          // 邮箱已经被注册
          console.log('用户已经被占用！');
          self.setState({
            emailValidate: false,
          });
        } else if (data.data) {
          console.log('邮箱可使用！');
          self.setState({
            emailValidate: true,
          });
        }
      },
    });
  }

  checkEmail(rule, value, callback) {
    const form = this.props.form;
    const emailValidate = this.state.emailValidate;
    if (value && !emailValidate) {
      callback('邮箱已经被注册!');
    } else {
      callback();
    }
  }

  // 验证两次密码是否相同
  passwordConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value,
    });
  }

  // 验证再次输入的密码是否相同
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('密码错误!');
    } else {
      callback();
    }
  }
  // 验证首次输入的密码是否相同
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  loginClick() {
    this.hideModal();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    return (
      <div>
        <Form
          onSubmit={() => {
            this.handleSubmit(this.showModal);
          }}
          style={{ padding: '50px 0', margin: '0 auto', width: '650px' }}
        >
          <FormItem
            {...formItemLayout}
            label="邮箱"
            extra={
              this.state.emailValidate ? (
                ''
              ) : (
                <span style={{ color: 'red' }}>
                  <Icon type="exclamation-circle" style={{ color: 'orange' }} />{' '}
                  该邮箱已注册可
                  <a onClick={this.loginClick.bind(this)}>直接登录</a>
                </span>
              )
            }
            hasFeedback
          >
            {getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '邮箱格式不正确!',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ],
            })(<Input onBlur={this.emailConfirmBlur.bind(this)} />)}
          </FormItem>

          <FormItem {...formItemLayout} label="密码" hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码!',
                },
                {
                  validator: this.checkConfirm.bind(this),
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请再次输入密码!',
                },
                {
                  validator: this.checkPassword.bind(this),
                },
              ],
            })(
              <Input
                type="password"
                onBlur={this.passwordConfirmBlur.bind(this)}
              />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>昵称</span>} hasFeedback>
            {getFieldDecorator('nickname', {
              rules: [
                { required: true, message: '请输入昵称!', whitespace: true },
              ],
            })(<Input />)}
          </FormItem>

          <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>
                我已阅读<a href="">相关条款</a>
              </Checkbox>,
            )}
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              立即注册
            </Button>
          </FormItem>
        </Form>
        <div>
          <Modal
            title="提示消息"
            visible={this.state.visible}
            onOk={this.hideModal.bind(this)}
            onCancel={this.hideModal.bind(this)}
            width="450"
          >
            <h3 style={{ textAligh: 'center' }}>
              {this.state.content}
              <Icon
                type="check"
                style={{ color: 'red', marginLeft: '10px', fontSize: '16px' }}
              />
            </h3>
          </Modal>
        </div>
      </div>
    );
  }
}

const Register = Form.create()(RegistrationForm);

export default connect(({ stafftab }) => ({
  stafftab,
}))(Register);
