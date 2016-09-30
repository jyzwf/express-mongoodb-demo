module.exports = function(app){
	app.get('/home',function(req,res){
		if(req.session.user){
			var Commoity = global.dbHelper.getModel('commodity');
			Commoity.find({},function(err,docs){
				res.render('home',{Commoditys:docs});
			})
		}else{
			req.session.err = '请先登录';
			res.redirect('/login');
		}
	});


	app.get('/add',function(req,res){
		res.render('add');
	});

	app.post('/add',function(req,res){
		var Commoity = global.dbHelper.getModel('commodity');
		Commoity.create({
			name:req.body.name,
			price:req.body.price,
			imgSrc:req.body.imgSrc
		},function(error,doc){
			if(doc){
				res.send(200)
			}else{
				res.send(404)
			}
		})
	})
}