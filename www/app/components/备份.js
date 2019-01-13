import React from "react";
import {Row , Col , Button , Table, Avatar, Modal} from "antd";
import { connect } from "dva";
import { routerRedux } from 'dva/router';
 
class ShowStaff extends React.Component{
	constructor({carpicker , dispatch}){
		super();

		this.state = {
			cols :  [
				{
					title : '头像',
					dataIndex : 'icon',
					key : 'icon',
					render(text , record , index){
						// return <img src={`icon/icon.jpg`} width="80"/>
						return <Avatar src={`icon/icon.jpg`} size = 'large'/>
					},
					width : 140
				},
				{
				  title: '姓名',
				  dataIndex: 'name',
				  key: 'name',
				  sorter : true
				}, 
				{
				  title: '年龄',
				  dataIndex: 'age',
				  key: 'age',
				  sorter : true
				},
				{
				  title: '部门',
				  dataIndex: 'department',
				  key: 'department',
				  sorter : true
				},
				{
				  title: '入职时间',
				  dataIndex: 'hiredate',
				  key: 'hiredate',
				  sorter : true
				},
				{
				  title: '籍贯',
				  dataIndex: 'address',
				  key: 'address',
				  sorter : true
				},
				{
				  title: '邮箱',
				  dataIndex: 'email',
				  key: 'email' ,
				  sorter : true
				},
				{
				  title: '电话',
				  dataIndex: 'phone',
				  key: 'phone' ,
				  sorter : true
				},
				{
				  title: '操作',
				  key: 'manipulate',
				  render(text , record){
				  	return <div>
				  		<Button>Edit</Button>
				  	</div>
				  }
				}
			],
			staffs : [],
			visible : false
		}
	}

  	showModal(val){
		alert(333);
	    this.setState({
		    visible: true
		});
	}

  	handleOk(e){
    	console.log(e);
    	this.setState({
      		visible: false
    	});
  	}
  	handleCancel(e){
   	console.log(e);
    this.setState({
      		visible: false
    	});
 	}




	componentWillReceiveProps({stafftab}){
		this.setState({
			...this.state,
			staffs : stafftab.staffs.data
		})
	}
	 
	render(){
		return <div>
			<Table 
				dataSource={this.state.staffs} 
				columns={this.state.cols} 
				rowKey="id"
			/>
				<div>
		       
		        <Modal
		          title="Basic Modal"
		          visible={this.state.visible}
		          onOk={this.handleOk.bind(this)}
		          onCancel={this.handleCancel.bind(this)}
		        >
		          <p>Some contents...</p>
		          <p>Some contents...</p>
		          <p>Some contents...</p>
		        </Modal>
		      </div>
		</div>
	}
}

export default connect(
	({stafftab})=>{
		return {
			stafftab
		}
	}
)(ShowStaff);