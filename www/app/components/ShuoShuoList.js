// redux 开发组件实际在开发类
import React from "react";
import { connect } from "dva";
import { Button, Modal, Avatar, Icon } from 'antd';
import classnames from "classnames";
// 引入路由
import { routerRedux } from 'dva/router';
import "./ShuoShuoList.less";
import PicShow from "./PicShow.js";

class ShuoShuoList extends React.Component{
	constructor({talk}){
		super();
		this.state = {
			email : talk.email,
		    date : talk.date,
		    text : talk.text,
		    pathArr : talk.pathArr,
		    clicked : false,
		    like : false,
		    likeCount : 0
		};

	}

	componentDidMount(){
		var self = this;
		var id = this.props.talk._id;
		$(this.refs.arrow).mouseenter(function (event) {

			$(self.refs.alert).css("display","block")
			$(self.refs.remove).click(function (event) {
				self.props.dispatch({"type":"talk/removeTalk",id});
			})
		})
		$(this.refs.alert).mouseleave(function (event) {
			$(self.refs.alert).css("display","none");
		})
	}

	toggle(){
		this.setState({
			clicked : !this.state.clicked
		})
	}
	likeClick(){
		this.setState({
			like : !this.state.like
		})
	}

	render(){
		const { nickname, avata } = this.props.user.user;
		return <div className="wrapbox" ref="wrapbox"
				style={{marginTop:'10px', width:'100%', position:'relative',overflow:'hidden', borderBottom:'1px solid #ccc'}}
			>
			
			<div className="left_icon box" style={{width : "8%",float:'left'}}>
				<Avatar icon="user" size='large' />
			</div>
			<div className="right_content box" style={{width : "92%",float:'left'}}>
				<p style={{fontWeight:'bold',fontSize:'14px'}}>{this.state.email}</p>
				<p style={{fontSize:'12px'}}>{this.state.date}</p>
				<p style={{fontSize:'14px',lineHeight:'22px'}}>{this.state.text}</p>
				<div ref="arrow" style={{position:'absolute',right:'5px',top:'10px'}} >
					<Icon className='arrow' type="down" />
				</div>
				<div>
					{
						this.state.pathArr.map((item,index)=>{
							return <div key={index} style={{position:'relative'}}>
								<PicShow picPath={item} index={index} pathArr={this.state.pathArr}></PicShow>
							</div>
						})
					}
				</div>
				<div ref="alert" className='alert' style={{display:'none'}}>
					<p ref="remove">删除</p>
					<p>置顶</p>
					<p>加标签</p>
					<p>转换为仅自己可见</p>
				</div>
			</div>
			<div style={{clear:'both'}}></div>
			<div className="footer" style={{display:'block'}}>
				<p>
					<Icon className="trigger2"
						type={this.state.clicked ? 'heart' : 'heart-o'}
				        onClick={()=>{this.toggle()}}
					/> 收藏
				</p>
				<p><Icon type="select" /> 转发</p>
				<p><Icon type="message" /> 评论</p>
				<p className="noborder">
					<Icon className="trigger2"
						type={this.state.like ? 'like' : 'like-o'}
				        onClick={()=>{this.likeClick()}}
					/> 点赞 ({this.state.likeCount})
				</p>
			</div>

		</div>
	}
}

export default connect(
	({user})=>{
		return {
			user
		}
	}
)(ShuoShuoList);

