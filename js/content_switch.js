/*0.2*/
;(function($){
	$.fn.navs=function(opt){
		if(opt===undefined)
			opt={}
		this.each(function(){
			var th=$(this),
				data=th.data('navs'),
				_={
					enable:true,
					activeCl:'active',
					event:'click',
					backLink:'a[data-type=back]',
					closeLink:'a[data-type=close]',
					blockSame:true,
					useHash:false,
					contRetFalse:false,
					hover:true,
					preFu:function(){
						_.n=-1
						_.curr=false
						_.li.each(function(i){
							var th=$(this)
							th.data({num:i})
							if(th.hasClass(_.activeCl))
								_.n=i,
								_.curr=th,
								_.hoverIn(th)
						})
					},
					refreshFu:function(){
						if(!_.enable)
							return false
						_.li.each(function(i){
							var th=$(this),
								tmp
							if(th.hasClass(_.activeCl))
								_.curr=th,
								_.n=th.data('num')
						})
						
						if(_.curr)
							_.hoverIn(_.curr)
							
						_.li.not(_.curr).each(function(){
							var th=$(this)
							_.hoverOut(th)							
						})
					},
					changeFu:function(n,param){
						param=param||n
						if(!_.enable)
							return false
						if(n==_.n&&_.blockSame)
							return false
							
						_.prev=_.n

						_.li.removeClass(_.activeCl)
						_.li.each(function(i){
							var th=$(this)
							if(typeof n=='number')
								if(n==i)
									th.addClass(_.activeCl),
									_.n=i
							if(typeof n=='string')
								if(n==th.attr('href'))
									th.addClass(_.activeCl),
									_.n=i
						})
						_.refreshFu()
						_.onChangeFu(param)
					},
					onChangeMas:[],
					onChangeFu:function(param){
						$(_.onChangeMas).each(function(){
							if(typeof this=='function')
								this.call(_.me,param,_)
						})
					},
					nextFu:function(){
						var n=_.n
						_.changeFu(++n<_.li.length?n:0)
					},
					prevFu:function(){
						var n=_.n
						_.changeFu(--n>=0?n:_.li.length-1)
					},
					controlsFu:function(){
						_.li.each(function(i){
							var li=$(this)
							$('>a',li)
								.bind(_.event,function(){
									_.changeFu(i)
									if(_.contRetFalse)
										return false
								})									
						})
					},
					navFu:function(){
						$(_.backLink)
							.live(_.event,function(){
								if(!_.enable)
									return false
								_.backFu()
								return false
							})
						$(_.closeLink)
							.live(_.event,function(){
								if(!_.enable)
									return false
								_.closeFu()
							})
					},
					backFu:function(){
						location.hash=_.prevHash
					},
					closeFu:function(){
						var n=_.n
						_.prev=n
						_.n=-1
						_.curr=false
						_.li.removeClass(_.activeCl)
						_.li.each(function(){_.hoverOut($(this))})
						_.onChangeFu('close')
					},
					hoverFu:function(){
						_.li.each(function(i){
							$('>a',this)
								.bind('mouseenter',function(){
									if(_.enable)
										if(_.hover&&!_.li.eq(i).hasClass(_.activeCl))
											_.hoverIn(_.li.eq(i))
								})
								.bind('mouseleave',function(){
									if(_.enable)
										if(_.hover&&!_.li.eq(i).hasClass(_.activeCl))
											_.hoverOut(_.li.eq(i))
								})
						})
					},
					hashFu:function(){
						$(window)
							.bind('hashchange',function(){
								if(!_.enable)
									return false
								_.prevHash=_.hash
								_.hash=location.hash
								if(location.hash.slice(0,2)=='#!')
									_.hashChFu()
							})
					},
					hashChFu:function(){
						var ch=false
						
						_.li.each(function(i){
							var tmp=$('>a',this).attr('href')
							if(tmp==location.hash)
								_.changeFu(i,location.hash),
								ch=true
						})
						if(!ch)
							_.prev=_.n,
							_.n=-1,
							_.curr=false,
							_.li.removeClass(_.activeCl),
							_.li.each(function(){_.hoverOut($(this))}),
							_.onChangeFu(location.hash)
					},
					init:function(){
						_.me=this
						_.ul=$('>ul',_.me)
						_.li=$('>li',_.ul)
						
						_.preFu()
						if(_.useHash)
							_.hashFu()
						else
							_.controlsFu()
						_.navFu()
						_.hoverFu()
						_.hoverOut(_.li)
						_.refreshFu()
						if(location.hash.slice(0,2)=='#!'){
							var hash=location.hash
							location.hash=''
							location.hash=hash
						}
							
					},
					hoverIn:function(){},
					hoverOut:function(){}
				}
			if(!data)
				(typeof opt=='object'?$.extend(_,opt):_).init.call(th),
				th.data({navs:_}),
				data=_
			else
				_=typeof opt=='object'?$.extend(data,opt):data
			if(typeof opt=='number')
				_.changeFu(opt)
			if(typeof opt=='string')
				if(opt=='prev'||opt=='next'||opt=='close'||opt=='back')
					_[opt+'Fu']()
				else
					if(opt.slice(0,2)=='#!')
						location.hash=opt

			if(typeof opt=='function')
				_.onChangeMas.push(opt)
			if(typeof opt=='boolean')
				_.enable=opt
		})
		return this
	}
	
	$.fn.cont_sw=function(opt){
		if(opt===undefined)
			opt={}
		this.each(function(){
			var th=$(this),
				data=th.data('cont_sw'),
				_={
					enable:true,
					blockSame:true,
					duration:800,
					easing:'linear',
					preFu:function(){
						_.li.hide()
					},
					showFu:function(){
						_.next
							.css({opacity:0})
							.show()
							.stop()
							.animate({
								opacity:1
							},{
								duration:_.duration,
								easing:_.easing
							})
					},
					hideFu:function(){
						_.li.hide()
					},
					nextFu:function(){
						var n=_.n
					_.changeFu(++n<_.li.length?n:0)
					},
					prevFu:function(){
						var n=_.n
						_.changeFu(--n>=0?n:_.li.length-1)
					},
					navFu:function(str){
						if(_.prevStr==str)
							return false
						_.prevStr=str
						_.li.each(function(i){
							var th=$(this)
							if(th.attr('id')==str.slice(3))
								_.next=th,
								_.prev=_.n,
								_.n=i,
								_.hideFu(),
								_.showFu()
						})						
					},
					closeFu:function(){
						if(_.prevStr=='close')
							return false
						_.n=-1
						_.prevStr='close'
						_.hideFu()
					},
					backFu:function(){
						_.changeFu(_.prev)
					},
					changeFu:function(n){
						if(!_.enable)
							return false
						if(n==_.n&&_.blockSame)
							return false
						var fu=function(){
							_.prev=_.n
							_.n=n
							_.next=_.li.eq(n)
							_.hideFu(_)
							_.showFu(_)
							_.onChangeFu(n)
						}
						$.when(_.li).then(fu)
					},
					onChangeMas:[],
					onChangeFu:function(param){
						$(_.onChangeMas).each(function(){
							if(typeof this=='function')
								this.call(_.me,param,_)
						})
					},
					init:function(){
						_.me=this
						_.ul=$('>ul',_.me)
						_.li=$('>li',_.ul)
						
						_.preFu()
					}
				}
			if(!data)
				(typeof opt=='object'?$.extend(_,opt):_).init.call(th),
				th.data({cont_sw:_}),
				data=_
			else
				_=typeof opt=='object'?$.extend(data,opt):data
			
			if(typeof opt=='number')
				_.changeFu(opt)

			if(typeof opt=='string')
				if(opt=='prev'||opt=='next'||opt=='close'||opt=='back')
					_[opt+'Fu']()
				else
					if(opt.slice(0,2)=='#!')
						_.navFu(opt)

			if(typeof opt=='function')
				_.onChangeMas.push(opt)
			if(typeof opt=='boolean')
				_.enable=opt
		})
		return this
	}
})(jQuery)