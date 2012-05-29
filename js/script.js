$(document).ready(function() {
	
	// hover
	
	$('#splash_menu a').hover(function(){
		$(this).find('.bord').stop().animate({top:-80})	
		$(this).find('img').stop().animate({top:-72, height:204})
		$(this).find('.button').stop().animate({top:132, height:52,paddingTop:0})								   
	}, function(){
		$(this).find('.bord').stop().animate({top:0})	
		$(this).find('img').stop().animate({top:8, height:0})
		$(this).find('.button').stop().animate({top:8, height:66,paddingTop:10})								   
	})
	
	$('.button1 span').css({opacity:0})
	$('.button1').hover(function(){
		$(this).find('span').stop().animate({opacity:1})						 
	}, function(){
		$(this).find('span').stop().animate({opacity:0})						 
	})
	
	$('#gallery1 a').hover(function(){
		$(this).find('img').stop().animate({opacity:0.8})
	}, function(){
		$(this).find('img').stop().animate({opacity:1})
	})
	
	$('#gallery1').cycle({
		fx:    'scrollVert',
		pager:'.pagination',  // selector for element to use as pager container
		activePagerClass: 'active', // class name used for the active pager link
		timeout: false, // milliseconds between slide transitions (0 to disable auto advance)
		speed: 800, // speed of the transition (any valid fx speed value)
		prev: '.prev',  // selector for element to use as event trigger for previous slide 
		next: '.next'  // selector for element to use as event trigger for next slide 
	});	
	
	$('ul#menu').superfish({
      delay:       600,
      animation:   {height:'show'},
      speed:       600,
      autoArrows:  false,
      dropShadows: false
    });
	
	$('#ContactForm').forms({
		ownerEmail:'#'
	})
	
	day=['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
	SetData();
    function SetData() {
	    var now = new Date();
		$('.date').html(day[now.getDay()]+' ');
	    if (now.getDate()<10) {$('.date').append('0')}
		$('.date').append(now.getDate()+', ');
		$('.date').append(now.getFullYear());
		Cufon.replace('.date', { fontFamily: 'Oswald'});
	}
 });

$(window).load(function() {	
	
	// scroll
	$('.scroll').cScroll({
		duration:700,
		step:54,
		trackCl:'track',
		shuttleCl:'shuttle'
	})		
	fl=false;
	//content switch
	var content=$('#content'),
		nav=$('.menu');
	nav.navs({
		useHash:true,
		hoverIn:function(li){
			$('> a .bord',li).stop().animate({height:84},600);
		},
		hoverOut:function(li){
			if (!$(li).hasClass('sfHover')) {$('> a .bord',li).stop().animate({height:6},600);}
		},
		hover:true
	})		
	nav.navs(function(n, _){
		content.cont_sw(n);
		if (_.n==-1) {
			$('.bord',nav).stop().animate({height:6},600);
		}
	})
	content.cont_sw({
		showFu:function(){
			var _=this					
			$.when(_.li).then(function(){	
				_.next.css({display:'block'}).stop().animate({height:576, paddingTop:60},600);	
			});
			$('#content').stop().animate({height:858},600);
			$('.bg_menu').stop().animate({marginTop:-40, height:164})
			$('#splash_menu').find('.bord').stop().animate({top:0})	
			$('#splash_menu').find('.button').stop().animate({top:8, height:66,paddingTop:10})
			$('#splash_menu').find('img').stop().animate({top:8, height:0}, function(){
				$('#splash_menu').css({display:'none'})																 
			})
			fl=true;
			setSize();																  
			
		},
		hideFu:function(){
			var _=this
			_.li.stop().animate({height:0, paddingTop:0},600, function(){$(this).css({display:'none'})})
		},
		preFu:function(){
			var _=this
			_.li.css({position:'absolute', display:'none'});
		}
	})
	var h, new_h;
	setHeight();
	h=new_h;
	setSize();
	function setHeight(){
		new_h=$(window).height();
	}
	function setSize(){
		if (fl) {h_cont=992;} else {h_cont=496;}
		if (h>h_cont) {
			$('#content').parent().stop().animate({paddingTop:~~((h-h_cont)/2)});	
		} else {
			$('#content').parent().stop().animate({paddingTop:0});	
		}
	}
	setInterval(setNew,1);
	function setNew(){
		setHeight();
		if ((h!=new_h)) {
			h=new_h;
			setSize();
		}
	}
})