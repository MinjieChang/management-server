// redux 开发组件实际在开发类
import React from "react";
import { connect } from "dva";
import classnames from "classnames";
import { Modal } from 'antd';
// 引入路由
import { routerRedux } from 'dva/router';
import "./PicShow.less";
import PicPreview from "../components/PicPreview.js";

class ShuoShuoList extends React.Component{
	constructor({picPath,index,pathArr}){
		super();
		this.state = {
			picPath,
			index,
			previewVisible : false,
			pathArr
		};
	}

	componentDidMount(){
		var index = this.state.index;
		$(".outerbox").find("a").css({
			"margin" : "3px"
		})
	}

	handleCancel(){
		this.setState({
			previewVisible : false
		})
	}

	imgClick(){
		this.setState({
			previewVisible : true
		})
	}

	render(){
		const { nickname, avata } = this.props.user.user;
		const { previewVisible, pathArr, index } = this.state;
		return <div className="outerbox">
			<a style={{float:'left'}} onClick={this.imgClick.bind(this)}>
				<img src={`uploads/shuoshuopic/${this.state.picPath}`} style={{display:'block',width:"150px",height:"150px" }}/>
			</a>
			<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
				<PicPreview picPath={this.state.picPath} pathArr={pathArr} index={index}></PicPreview>
			</Modal>
		</div>
	}
}

// <img alt="example" style={{ width: '100%' }} src={`uploads/shuoshuopic/${this.state.picPath}`} />
export default connect(
	({user})=>{
		return {
			user
		}
	}
)(ShuoShuoList);

