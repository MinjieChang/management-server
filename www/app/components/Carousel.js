import React from 'react';
import { getStyle, startMove } from './move.js';

const Tabs = React.createClass({
  // 顶层组件
  getInitialState() {
    return {
      iNow: 0,
      bCheck: true,
    };
  },
  setInow(index) {
    // 核心状态计算工具：依赖定时器进行实时刷新
    if (index !== undefined) {
      // 如果参数有内容。
      this.setState({
        iNow: index,
      });
    } else {
      const _this = this;
      this.timer = setInterval(() => {
        if (_this.state.bCheck) {
          // console.log(_this.state.bCheck)
          _this.setState(function(prev) {
            if (prev.iNow == this.props.nums - 1) {
              return {
                iNow: 0,
              };
            }
            return {
              iNow: prev.iNow + 1,
            };
          });
        } else {
          // console.log('该停了!')
          return false;
        }
      }, this.props.timer);
    }
  },
  checkSwitch() {
    // console.log(this.state.bCheck)
    this.setState(prev => ({
      bCheck: !prev.bCheck,
    }));
  },
  render() {
    return (
      <div
        id={this.props.idNames.main}
        onMouseOver={this.checkSwitch}
        onMouseOut={this.checkSwitch}
      >
        <Btns
          iNow={this.state.iNow}
          setInow={this.setInow}
          nums={this.props.nums}
          idNames={this.props.idNames}
        />

        <Imgs
          iNow={this.state.iNow}
          nums={this.props.nums}
          idNames={this.props.idNames}
          imgType={this.props.imgType}
        />
      </div>
    );
  },
});

const Btns = React.createClass({
  componentDidMount() {
    this.props.setInow();
  },
  getIndex(e) {
    // 获取a的父级索引值
    const list = e.target.parentNode.parentNode.childNodes;
    for (let i = 0; i < list.length; i++) {
      if (list[i] === e.target.parentNode) {
        return i;
      }
    }
  },
  changeInow(e) {
    // 回调方法
    // console.log($(e.target).parent().index());
    // console.log(this.getIndex(e));
    const index = this.getIndex(e);
    this.props.setInow(index);
  },

  render() {
    const arr = [];
    for (let i = 0; i < this.props.nums; i++) {
      let btnsContent = null;
      const index = i;
      if (i == this.props.iNow) {
        btnsContent = (
          <li key={i.toString()}>
            <a
              onMouseOver={this.changeInow}
              id={this.props.idNames.active}
              href="javascript:;"
            />
          </li>
        );
      } else {
        btnsContent = (
          <li key={i.toString()}>
            <a onMouseOver={this.changeInow} href="javascript:;" />
          </li>
        );
      }
      arr.push(btnsContent);
    }

    return <ul id={this.props.idNames.btns}>{arr}</ul>;
  },
});

const Imgs = React.createClass({
  componentDidMount() {
    // 刚开始加载时，就执行动画函数
    const iNow = this.props.iNow;
    const obj = document
      .getElementById(this.props.idNames.imgs)
      .getElementsByTagName('li')[iNow].childNodes[0];
    startMove(obj, { opacity: 100 });
  },
  componentWillReceiveProps(nextProps) {
    // 每当收到新的props就执行动画
    const obj = document
      .getElementById(this.props.idNames.imgs)
      .getElementsByTagName('li')[nextProps.iNow].childNodes[0];
    // console.log(obj)
    startMove(obj, { opacity: 100 });
  },

  render() {
    const arr = [];
    for (let i = 0; i < this.props.nums; i++) {
      let imgsContent = null;
      const src = `${this.props.imgType.url +
        this.props.imgType.name +
        (i + 1)}.${this.props.imgType.type}`;
      if (i == this.props.iNow) {
        imgsContent = (
          <li key={i.toString()}>
            <img style={{ opacity: '0', width: '680px' }} src={src} />
          </li>
        );
        arr.push(imgsContent);
      } else {
        imgsContent = (
          <li key={i.toString()}>
            <img style={{ display: 'none', width: '680px' }} src={src} />
          </li>
        );
        arr.push(imgsContent);
      }
    }
    return <ul id={this.props.idNames.imgs}>{arr}</ul>;
  },
});

export default Tabs;
