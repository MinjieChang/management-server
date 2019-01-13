export default{
	namespace : "user",
	state : {
		user : {
			email : "",
			nickname : "",
			password : "",
			avata : "",
			shuoshuo : []
 		},
 		
 	},

	reducers : {
		sync_doLogin(state,{user}){
			return {
				...state,
				user : {
					...state.user,
					email : user.email,
					nickname : user.nickname,
					avata : user.avata
				}
			}
		},
		sync_logOut(state){
			return {
				...state,
				user : {
					email : "",
					nickname : "",
					password : "",
					avata : "",
					shuoshuo : []
				}
			}
		},
		sync_refresh(state,{user}){
			return{
				...state,
				user : {
					...state.user,
					email : user.email,
					nickname : user.nickname,
					avata : user.avata
				}
			}
		}
	},

	effects : {
		doLogin : function* ({user},{put}) {
			// console.log(user);
			yield put({"type":"sync_doLogin",user});
		},
		logOut : function* (action,{put}) {
			var {result,user} =  yield fetch("/logOut",{
				method : "GET",
				credentials: 'include'
			}).then((res)=>{
  				return res.json();
  			})
			yield put({"type":"sync_logOut"});
		},
		refresh : function* (action,{put}) {
			var {result,user} =  yield fetch("/refresh",{
				method : "GET",
				credentials: 'include'
			}).then((res)=>{
  				return res.json();
  			})
  			if (result==1) {
  				yield put({"type":"sync_refresh",user});
  			}else{
  				yield put({"type":"sync_logOut"});
  			}
  			
		}
	}
}