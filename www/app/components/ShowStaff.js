/* eslint-disable react/no-multi-comp */
import React from 'react';
import { Table, Input, Icon, Button, Popconfirm, Avatar } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

import './ShowStaff.less';

class EditableCell extends React.Component {
  constructor({ value, id, thekey, index }) {
    super();
    this.state = {
      value,
      id,
      key: thekey,
      index,
      editable: false,
    };
  }

  // 当父组件的数据被改变时,子组件的数据也要实时改变，在此方法中接收传递来的数据。
  componentWillReceiveProps(props) {
    this.setState({
      value: props.value,
      id: props.id,
      key: props.thekey,
      index: props.index,
      editable: false,
    });
  }

  componentDidMount() {
    const cell = this.refs.editablecell;
    const self = this;
    $(cell).on('mouseenter', function(event) {
      // console.log(event.target.index);
      $(this)
        .find('.editable-cell-icon')
        .css({
          display: 'block',
          position: 'absolute',
          top: 10,
          right: 0,
          width: 20,
          cursor: 'pointer',
        });
    });
    $(cell).on('mouseleave', event => {
      $('.editable-cell-icon').css('display', 'none');
    });
  }

  // 编辑时候触发该方法
  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }
  // 点击打钩按钮或按下enter键，结束编辑，需要发送请求，将state.value传递出去
  check() {
    // 解构语法
    const { value, id, key, index, editable } = this.state;
    this.setState({ editable: false });
    if (this.props.onChange) {
      // 调用父亲的方法
      this.props.onChange(value, id, key, index);
    }
  }
  // 点击铅笔，开始编辑
  edit() {
    this.setState({ editable: true });
  }

  // <span>value:{value}id:{id}index:{index}key:{key}</span>

  render() {
    const { value, id, key, index, editable } = this.state;
    return (
      <div className="editable-cell" ref="editablecell">
        {editable ? (
          <div className="editable-cell-input-wrapper">
            <Input
              value={value}
              onChange={this.handleChange.bind(this)}
              onPressEnter={this.check.bind(this)}
            />
            <Icon
              type="check"
              className="editable-cell-icon-check"
              onClick={this.check.bind(this)}
            />
          </div>
        ) : (
          <div className="editable-cell-text-wrapper">
            {value || ' '}
            <Icon
              type="edit"
              className="editable-cell-icon"
              onClick={this.edit.bind(this)}
              style={{ display: 'none' }}
            />
          </div>
        )}
      </div>
    );
  }
}

class ShowStaff extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '头像',
        dataIndex: 'icon',
        key: 'icon',
        render(text, record, index) {
          // return <img src={`icon/icon.jpg`} width="80"/>
          return <Avatar src="icon/icon.jpg" size="large" key={index} />;
        },
        width: 120,
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true,
        render: (text, record, index) => (
          // <span>{index}{text}</span>
          <EditableCell
            value={text}
            id={record.id}
            thekey="name"
            index={index}
            onChange={this.onChangeCell.bind(this)}
          />
        ),
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: true,
        render: (text, record, index) => (
          <EditableCell
            value={text}
            id={record.id}
            thekey="age"
            index={index}
            onChange={this.onChangeCell.bind(this)}
          />
        ),
      },
      {
        title: '部门',
        dataIndex: 'department',
        key: 'department',
      },
      {
        title: '入职时间',
        dataIndex: 'hiredate',
        key: 'hiredate',
        sorter: true,
        render: (text, record, index) => (
          <EditableCell
            value={text}
            id={record.id}
            thekey="hiredate"
            index={index}
            onChange={this.onChangeCell.bind(this)}
          />
        ),
      },
      {
        title: '籍贯',
        dataIndex: 'address',
        key: 'address',
        sorter: true,
        render: (text, record, index) => (
          <EditableCell
            value={text}
            id={record.id}
            thekey="address"
            index={index}
            onChange={this.onChangeCell.bind(this)}
          />
        ),
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            id={record.id}
            thekey="email"
            index={index}
            onChange={this.onChangeCell.bind(this)}
          />
        ),
      },
      {
        title: '电话',
        dataIndex: 'phone',
        key: 'phone',
        render: (text, record, index) => (
          <EditableCell
            value={text}
            id={record.id}
            thekey="phone"
            index={index}
            onChange={this.onChangeCell.bind(this)}
          />
        ),
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record, index) =>
          this.state.dataSource.length > 1 ? (
            <Popconfirm
              title="确定删除?"
              onConfirm={() => this.onDelete(index, record.id)}
            >
              <a href="#">Delete</a>
            </Popconfirm>
          ) : null,
      },
    ];

    this.state = {
      dataSource: [],
    };
  }

  // 在此生命周期中接收数据
  componentWillReceiveProps({ stafftab }) {
    this.setState({
      dataSource: stafftab.staffs.staffs,
    });
  }

  // 编辑cell来到这个方法
  onChangeCell(value, id, key, index) {
    // 1、修改本地数据
    const dataSource = [...this.state.dataSource];
    dataSource[index][key] = value;
    this.setState({ dataSource });

    // 2、发送命令，修改数据库的数据
    this.props.dispatch({
      type: 'stafftab/onChangeCell',
      value,
      id,
      key,
    });
  }
  // 点击删除按钮
  onDelete(index, id) {
    console.log(index, id);
    const dataSource = [...this.state.dataSource];
    dataSource.splice(index, 1);
    this.setState({ dataSource });

    // 2 发送命令，删除数据库对应id的内容
    this.props.dispatch({
      type: 'stafftab/onDelete',
      id,
    });
  }

  // 在哪个部门下添加员工，显示的就要是对应的部门，部门不能写死
  department() {
    switch (this.props.stafftab.filter) {
      case 'development':
        return '研发';
      case 'product':
        return '产品';
      case 'ui':
        return 'UI';
      case 'service':
        return '综合';
      case 'sale':
        return '销售';
    }
  }

  // 点击添加按钮 触发
  handleAdd() {
    // 还要来一个随机的id
    const num = '123456';
    let id = '';
    for (let i = 0; i < num.length; i++) {
      id += num[parseInt(Math.random() * 6)];
    }
    const department = this.department();
    const { dataSource } = this.state;
    const newStaff = {
      id,
      name: `张三`,
      age: 30,
      department,
      engname: this.props.stafftab.filter,
      hiredate: '2017-03-05',
      icon: '',
      address: '北京',
      phone: '123456789',
      email: '4444444@163.com',
    };
    this.setState({
      dataSource: [...dataSource, newStaff],
    });
    // 2、发送请求
    this.props.dispatch({
      type: 'stafftab/addStaff',
      newStaff,
    });
  }

  // 排序方法
  onchangehandler(pagination, filters, sorter) {
    this.props.dispatch({
      type: 'stafftab/sortStaff',
      field: sorter.field || 'id',
      order: sorter.order || 'ascend',
    });
  }

  // <div>{JSON.stringify(dataSource)}</div>

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button style={{ marginBottom: 8 }} onClick={this.handleAdd.bind(this)}>
          Add
        </Button>{' '}
        <Table
          bordered
          dataSource={dataSource}
          columns={columns}
          onChange={(pagination, filters, sorter) => {
            this.onchangehandler(pagination, filters, sorter);
          }}
        />
      </div>
    );
  }
}

export default connect(({ stafftab }) => ({
  stafftab,
}))(ShowStaff);
