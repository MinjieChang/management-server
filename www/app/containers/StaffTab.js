// redux 开发组件实际在开发类
import React from "react";
import { connect } from "dva";
import {Row , Col , Layout , Menu, Breadcrumb , Icon} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
import "./StaffTab.less";
import ShowStaff from "../components/ShowStaff.js";

// 路由
import { routerRedux } from 'dva/router';

class StaffTab extends React.Component{
	constructor({picshow , dispatch , params}){
		super();
		this.state = {
		    collapsed: false
		};

	}

	componentDidMount(){
		// 拉取数据
		this.props.dispatch({
			"type" : "stafftab/init"
		});
	}

	toggle (){
	    this.setState({
		    collapsed: !this.state.collapsed
	    })
  	}

  	changeDepart(val){
  		this.props.dispatch({
  			"type" : "stafftab/changeDepart",
  			"department" : val
  		});
  	}

	render(){
		return <div className="stafftabwrap">
			<Layout>
				<Header>
					<div className="logo" ></div>
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={['1']}
						style={{ lineHeight: '64px', fontSize : "14px" }}
					>
						<Menu.Item key="1">员工系统</Menu.Item>
						<Menu.Item key="2" >
							<span onClick={()=>{this.props.dispatch(routerRedux.push("/shuoshuo"))}}>朋友圈</span>
						</Menu.Item>
					</Menu>


				</Header>

				<Layout>
	        		<Sider
	          			trigger={null}
	          			collapsible
	         	 		collapsed={this.state.collapsed}
	        		>
		          		<div className="sidelogo" />
			          	<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
				            <Menu.Item key="1">
				              	<Icon type="team" />
			              		<span onClick={()=>{this.changeDepart("development")}}>研发部</span>
				            </Menu.Item>
				            <Menu.Item key="2">
				               	<Icon type="video-camera" />
				              	<span onClick={()=>{this.changeDepart("product")}}>产品部</span>
				            </Menu.Item>
				            <Menu.Item key="3">
				               	<Icon type="flag" />
				              	<span onClick={()=>{this.changeDepart("ui")}}>UI设计</span>
				            </Menu.Item>
				            <Menu.Item key="4">
					            <Icon type="area-chart" />
				                <span onClick={()=>{this.changeDepart("sale")}}>销售部</span>
				            </Menu.Item>
				            <Menu.Item key="5">
					            <Icon type="bank" />
				                <span onClick={()=>{this.changeDepart("service")}}>综合部</span>
				            </Menu.Item>
		                </Menu>
	        		</Sider>
		        	<Layout>
				        <Header style={{ background: '#fff', padding: 0 }}>
				            <Icon
				              	className="trigger"
				              	type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
				              	onClick={()=>{this.toggle()}}
				            />
				        </Header>
		          		<Content style={{ margin: '16px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
		            		<ShowStaff></ShowStaff>
		          		</Content>
		        		<Footer style={{ textAlign: 'center' , margin: '-10px 20px'}}>
				     		员工管理系统 ©2016 Created by MJ
			    		</Footer>
		        	</Layout>
	      		</Layout>
			</Layout>
		</div>
	}
}

export default connect(
	({stafftab})=>{
		return {
			stafftab
		}
	}
)(StaffTab);
