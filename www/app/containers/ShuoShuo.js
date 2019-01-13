// redux 开发组件实际在开发类
import React from "react";
import { connect } from "dva";
import { Layout, Menu, Breadcrumb, Button, Modal, Avatar } from 'antd';
const { Header, Content, Footer } = Layout;
import classnames from "classnames";
// 引入路由
import { routerRedux } from 'dva/router';

import "./ShuoShuo.less";

import Tabs from "../components/Carousel.js";
import Login from "../components/Login.js";

// 发表说说组件
import SendShuoShuo from "../components/SendShuoShuo.js";
import ShuoShuoList from "../components/ShuoShuoList.js";

class ShuoShuo extends React.Component{
	constructor({talk}){
		super();
		this.state = {
		    visible : false,
		    talk : talk
		};

	}


	/*
		存放轮播图的组件
		<Tabs
			nums={6}
          	timer={3000}
          	idNames={
              	{main:"tabs",btns:"btns",imgs:"imgs",active:"btn-active"}
          	}
          	imgType={
              	{type:"jpg",url:"images/",name:"banner"}
          	}
		></Tabs>
	*/

	componentWillReceiveProps(props){
		var talk = props.talk;
		this.setState({
			talk : talk
		})
	}

	componentDidMount(){
		// 拉取初始数据
		this.props.dispatch({
			"type":"talk/init"
		});
		this.props.dispatch({
			"type" : "user/refresh"
		})		
	}

  	loginBtnClick(){
  		this.setState({
  			visible : true
  		})
  	}

  	showModal(val){
      	this.setState({
        	visible: true
	    });
	}

	handleCancel(e){
	    
	    this.setState({
	        visible: false
	    });
	}

	// 退出
	logOut(){
		
		this.props.dispatch({"type":"user/logOut"});
	}

	render(){
		const {email, nickname, avata} = this.props.user.user;
		return <div className="stafftabwrap">
			<Layout>
				<Header>
					<div className="logo" ></div>
					{
						email == ""?
							<Button style={{float:'right',cursor:'pointer'}} className="btn" 
								onClick={()=>{this.loginBtnClick()}}
							>登录</Button>
						:
						<div>
							<p className="header_right">
								<a onClick={this.logOut.bind(this)}>退出</a>
							</p>

							<p className="header_right">
								<a>设置</a>
							</p>

							<p className="header_right">
								<a>{email}</a>
							</p>

							<p className="header_right avata">
								<Avatar style={{ backgroundColor: '#87d068' }} icon="user" size='large' />
							</p>
						</div>
					}
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['1']}
						style={{ lineHeight: '64px', fontSize : "14px" }}
					>
						<Menu.Item key="1">
							<span onClick={()=>{this.props.dispatch(routerRedux.push("/"))}}>员工系统</span>
						</Menu.Item>
						<Menu.Item key="2">
							朋友圈
						</Menu.Item>
					</Menu>
				</Header>

				<Layout>
					<Content style={{ padding: '5px 50px', minHeight: 380}}>
						<div style={{}}>
							<Menu
								style={{ lineHeight: '54px',fontSize : "14px"}}
								mode="horizontal"
								defaultSelectedKeys={['1']}
							>
								<Menu.Item className={classnames({"menuitem":true})} key="1">好友动态</Menu.Item>
								<Menu.Item className={classnames({"menuitem":true})} key="2">技术分享</Menu.Item>
								<Menu.Item className={classnames({"menuitem":true})} key="3">工作日志</Menu.Item>
								<Menu.Item className={classnames({"menuitem":true})} key="4">娱乐节目</Menu.Item>
							</Menu>
						</div>
						<div style={{ background: '#fff', padding: 24, minHeight: 380, overflow: 'hidden'}}>
							
							<div className="left-side inner-content">
								新鲜事
							</div>
							<div className="right-side inner-content">
								
								<SendShuoShuo></SendShuoShuo>
								{
									this.props.talk.talks.map((talk,index)=>{
										return <ShuoShuoList talk={talk} key={index} index={index}></ShuoShuoList>
									})
								}
							</div>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>
						员工管理系统 ©2016 Created by MJ
					</Footer>
				</Layout>
			</Layout>

			<div>
				<Modal
		          	title="登录"
		          	visible={this.state.visible}
		          	onCancel={this.handleCancel.bind(this)}
		          	footer={null}
		          	width = '450'
		        >
		        	<Login handleCancel={this.handleCancel.bind(this)}></Login>
		        </Modal>
			</div>

		</div>
	}
}

// <div>{JSON.stringify(this.props.talk.talks)}</div>
// 每一条talk是一个json

export default connect(
	({user,talk})=>{
		return {
			user,
			talk
		}
	}
)(ShuoShuo);

