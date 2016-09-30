$(function(){
	var about_login = {
		check_rule:{
			// 非空
			require:function(str,err){
				console.log(str)
				if((/^\s*$/).test(str)){
					return err;
				}
			},

			// 最小长度为8
			min_length:function(str,err){
				if(str.trim().length<8){
					return err;
				}
			},

			// 密码只能为数字，字母，下划线
			format_pswd:function(str,err){
				if( !(/^[a-zA-Z0-9_]+$/).test(str) ){
					return err;
				}
			}
		},

		send:function(){
			var data = {
				"uname":$('#uname').val(),
				"upwd"	: $('#upswd').val()
			};

			$.ajax({
                url:'/login',
                type:'POST',
                data:data,
                success:function(data,status){
                    if(status == 'success'){
                        location.href='home';
                    }
                },
                error:function(data,err){
                	alert('登录失败，请稍后再试');
                }
            });
		},

		// 开始验证
		check_start:function(check_arr){
			var i =0 ,m,n,err;
			for(;m=check_arr[i++];){
				console.log(m);
				for(n in m.rules){
					if(err = this.check_rule[n](m.target,m.rules[n])){
						return err;
					}
				}
			}
		},



		init:function(obj){

			var result = this.check_start([
					{
						target:$('#uname').val(),
						rules:{
							require:'用户名不能为空'
						}
					},

					{
						target:$('#upswd').val(),
						rules:{
							require:'密码不能为空',
							min_length:'密码最小长度为8位',
							format_pswd:'密码只能是数字、字母、下划线'
						}
					}
				])

			if(result){
				alert(result);
				return false;
			}

			// ajax请求
			this.send();
		}

	}

	$('#login_btn').click(function(){
		about_login.init();
	})	
})

