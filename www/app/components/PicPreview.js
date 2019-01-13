// redux 开发组件实际在开发类
import React from "react";
import { connect } from "dva";
import classnames from "classnames";
import { Modal } from 'antd';
import "./PicPreview.less";

class PicPreview extends React.Component{
	constructor({picPath,pathArr, index}){
		super();
		this.state = {
			picPath,
			pathArr,
			index
		};
	}

	componentDidMount(){
		console.log(this.state.picPath);
		console.log(this.state.pathArr);
	}

	imgClick(item,idx){
		var index = $(this.refs.now_click).index();
		this.setState({
			picPath : item,
			index : idx
		})

	}

	render(){
		const { index } = this.state;
		return <div className="" style={{overflow:"hidden"}}>
			<div>
				<img alt="example" style={{ width: '90%' , display:'block', margin:'0 auto'}} src={`uploads/shuoshuopic/${this.state.picPath}`} />
			</div>
			<div className="picNav">
				{
					this.state.pathArr.map((item,idx)=>{
						return <a key={idx} ref="now_click" className={classnames({"cur": idx==index})} style={{float:'left', margin:'8px 5px'}} onClick={()=>{this.imgClick(item,idx)}}>
							<img src={`uploads/shuoshuopic/${item}`} style={{display:'block',width:"50px",height:"50px" }}/>
						</a>
					})
				}
			</div>
		</div>
	}
}

export default connect(
	({talk})=>{
		return {
			talk
		}
	}
)(PicPreview);

