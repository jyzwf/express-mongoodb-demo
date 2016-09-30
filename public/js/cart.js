// 计算商品总价
var sum = 0;

function tamount(){
	sum = 0;
	$('input[name="check_item"]:checked').each(function(){
		var self = $(this),
			price = self.data('price'),
			index = self.data('index');

		var quantity = $('#Q'+index).val();
		sum +=(parseFloat(price)*parseFloat(quantity));
	});

	$('#money').text('￥'+sum.toFixed(2));
}


function  Clearing(){
    $('input[name="chkItem"]:checked').each(function(){
                var self = $(this),
                        index = self.attr('data-index'),
                        cid = self.attr('data-id');
                var quantity = $('#Q'+index).val();
                var data = { "cid": cid, "cnum":quantity};
                $.ajax({
                    url:'/cart/clearing',
                    type:'post',
                    data:data,
                    success:function(data,status){
                    },
                    error:function(data,status){
                    }
                });
    });
    alert('￥'+sum);
    location.href = "cart";
}

$(function(){

// 商品加减
$('.operate_count span').click(function(){
	var self = $(this),
		type = self.data('type'),
		num = parseFloat(self.siblings('input').val());

	if(type=='add'){
		num+=1;
	}else if(type=='sub'){
		if(num>1){
			num-=1
		}else{
			return false;
		}
	}

	self.siblings('input').val(num);
	tamount();
});


//单选事件
$('input[name="check_item"]:checkbox').click(function(){
	var is_check = $('input[name="check_item"]:not(:checked)').length?false:true;
	$('#CheckAll').prop("checked",is_check);
    tamount();
})

// 全选事件
 $('#CheckAll').click(function(){
    var self = $(this);
    $('input[name="check_item"]').each(function(){
        $(this).prop("checked",self.is(':checked'));
    });
    tamount();
});

$('#pay').click(function(){
	Clearing();
})



})