$(function(){
	var about_add = {
		check_rule:{
			// 非空
			require:function(str,err){
				console.log(str)
				if((/^\s*$/).test(str)){
					return err;
				}
			}
		},

		send:function(){
			var data = {
				"name":$('#cname').val(),
				"price"	: $('#cprice').val(),
				"imgSrc":'https://avatars3.githubusercontent.com/u/12515800?v=3&s=466'
			};

			$.ajax({
                url:'/add',
                type:'POST',
                data:data,
                success:function(data,status){
                    if(status == 'success'){
                        alert('添加成功')
                    }
                },
                error:function(data,err){
                	alert('添加失败，请稍后再试');
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
						target:$('#cname').val(),
						rules:{
							require:'商品名不能为空'
						}
					},

					{
						target:$('#cprice').val(),
						rules:{
							require:'商品价格名不能为空'
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

	$('#add_btn').click(function(){
		about_add.init();
	})	
})

