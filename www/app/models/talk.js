export default{
	namespace : "talk",
	state : {
		talks : [
		]  		
 	},

	reducers : {
		sync_submitShuoShuo(state,{talk}){
			var date = talk.date;

			date = new Date(date);
			var year = date.getFullYear(),
	      		month = date.getMonth() + 1,
	      		day = date.getDate();

			// month = `${month>9?'0':''}${month}`;
			// day = `${day>9?'0':''}${day}`;

			// console.log(`${year}-${month}-${day}`);
			talk.date = `${year}-${month}-${day}`;

			return {
				...state,
				talks : [
					...state.talks,
					talk
				]
			}
		},
		sync_init(state,{talks}){
			return {
				...state,
				talks : [
					...talks
				]
			}
		},
		sync_removeTalk(state,{id}){
			console.log(id);
			return{
				...state,
				talks : state.talks.filter((item,index)=>{
					return item._id != id;
				})
			}
		},
	},

	effects : {
		submitShuoShuo : function* ({email,text,pathArr},{put}) {
			var {talk} = yield fetch("/submitShuoShuo",{
				"method" : "POST",
				"headers": {
    				'Content-Type': 'application/json'
  				},
  				"body" : JSON.stringify({
  					email,
  					text,
  					pathArr : JSON.stringify(pathArr)
  				})
			}).then((talk)=>{
				return talk.json();
			});
			yield put({"type":"sync_submitShuoShuo",talk});
			// yield put({"type":"init"});
		},

		// 拉取初始数据
		init : function* (action,{put}) {
			var {talks} = yield fetch("/init",{
				"method" : "GET"
			}).then((talks)=>{
				return talks.json();
			});
			yield put({"type":"sync_init",talks});
		},

		// 删除说说
		removeTalk : function* ({id},{put}) {
			
			// 删除本地的
			// console.log(id);
			yield put({"type":"sync_removeTalk",id});
			// 删除服务器的
			var {result} =  yield fetch("/removeTalk",{
				"method" : "POST",
				"headers": {
    				'Content-Type': 'application/json'
  				},
  				"body" : JSON.stringify({
  					id
  				})
			}).then((res)=>{
  				return res.json();
  			})
			console.log(result);
		},
		
	}
}