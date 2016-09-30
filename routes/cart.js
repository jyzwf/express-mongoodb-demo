module.exports = function(app){
	//查看购物车商品
	app.get('/cart',function(req,res){
		var Cart = global.dbHelper.getModel('cart');

		if(!req.session.user){
			req.session.error = '用户已过期，请重新登录';
			res.redirect('/login');
		}else{
			Cart.find({'uId':req.session.user._id,'cStatus':false},function(error,docs){
				res.render('cart',{carts:docs});
			});
		}
	});

	// 添加购物车商品
	app.get('/addToCart/:id',function(req,res){
		if(!req.session.user){
			req.session.error = '用户已过期，请重新登录';
			res.redirect('/login');
		}else{
			var Commodity = global.dbHelper.getModel('commodity'),
				Cart = global.dbHelper.getModel('cart');

			Cart.findOne({'uId':req.session.user._id,'cId':req.session.id},function(error,doc){
				// 商品存在 +1
				if(doc){
					Cart.update({'uId':req.session.user._id,'cId':req.params.id},{$set:{cQuantity:doc.cQuantity + 1}},function(err,doc){
						if(doc > 0){
							res.redirect('/home');
						}
					})
				}else{
					// 商品不存在
					Commodity.findOne({'_id':req.params.id},function(err,doc){
						if(doc){
							Cart.create({
								uId: req.session.user._id,
                                cId: req.params.id,
                                cName: doc.name,
                                cPrice: doc.price,
                                cImgSrc: doc.imgSrc,
                                cQuantity : 1
							},function(err,doc){
								if(doc){
									res.redirect('/home');
								}
							})
						}
					})
				}
			})
		}
	})


	// 删除商品
	app.get('/delFromCart/:id',function(req,res){
		var Cart = global.dbHelper.getModel('cart');
		Cart.remove({'_id':req.params.id},function(err,doc){
			console.log(doc)
			if(doc > 0){
				res.redirect('/cart');
			}
		})
	});


	// 购物车结算
	 app.post("/cart/clearing",function(req,res){
        var Cart = global.dbHelper.getModel('cart');
        Cart.update({"_id":req.body.cid},{$set : { cQuantity : req.body.cnum,cStatus:true }},function(error,doc){
            //更新成功返回1  失败返回0
            if(doc > 0){
                res.send(200);
            }
        });
    });


}