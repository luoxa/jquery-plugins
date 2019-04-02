;(function($,window,document){
	"use strict";
	var Default={
		background:'#EEEEEE',
		color:'#009688',
		listWidth:300,
		icon:'tv',
		control:{
				show:false,
				text:['Previous','Next'],
				textStyle:{
					color:'#f00',
					fontSize:12
				}
		},
		startIndex:0,
		animationDuration:300,
		data:[{name:'step01',page:'./pages/page1.html',icon:'sitemap',isCancel:false},
		      {name:'step02',page:'./pages/page2.html',icon:'gears'},
		      {name:'step03',page:'./pages/page3.html'}
			]
	};
	function Vlist($ele,option){
		this.$ele=$ele;
		this.option=$.extend(true,Default,option);
		this.init();
	}
	Vlist.prototype={
		constructor:Vlist,
		init:function(){
			this.render();
			this.bindEvent();
			this.$ele.find('.val-list>li').eq(this.option.startIndex).click();
		},
		render:function(){
			var option=this.option;
			var listWidth=(typeof option.listWidth =='number' )?option.listWidth+'px':option.listWidth;
			var html='<div class="val-list-container"><div class="val-list-body" style="width:'+listWidth+';height:100%;position:relative;background:'+option.background+';">';
			var vlist1='<ul class="val-list val-list-bottom" style="width:'+listWidth+';color:#aaa;">'
						+$.map(option.data,function(item,i){
								if(item.isCancel) return '';
								return '<li data-page="'+item.page+'">'
										+ '<i class="val-arrow fa fa-long-arrow-down"></i>'
										+ ' <div class="val-body">'
										+ '<i class="fa fa-circle-thin"></i><i class="fa fa-circle"></i>'
										+ '<i class="val-mark fa fa-'+(item.icon||option.icon)+'"></i>'
										+ '  <label class="val-content">'+item.name+'</label>'
										+ ' </div>'
										+ '</li>';
						}).join('')+'</ul>';
			var vlist2='<ul class="val-list val-list-top" style="height:56px;position:absolute;top:0px;z-index:1;overflow: hidden;width:'+listWidth+';background:'+option.background+';color:'+option.color+';">'
						+$.map(option.data,function(item,i){
								if(item.isCancel) return '';
								return '<li data-page="'+item.page+'">'
										+'<i class="val-arrow fa fa-long-arrow-down"></i>'
										+ ' <div class="val-body">'
										+ '<i class="fa fa-circle-thin"></i><i class="fa fa-circle"></i>'
										+ '<i class="val-mark fa fa-'+(item.icon||option.icon)+'"></i>'
										+ '  <label class="val-content">'+item.name+'</label>'
										+ ' </div>'
										+ '</li>';
						}).join('')+'</ul>';
			html+=vlist1+vlist2;
			html+=' </div>'
				 +' <div class="val-frame" style="margin-left:'+listWidth+';">'
				 +'  <iframe src=""  frameborder="no"  border="0"></iframe>'
				 +'	 <div class="val-control" style="display:none;">'
				 +'		<a style="float:left;'+('color:'+option.control.textStyle.color+';')+('font-size:'+option.control.textStyle.fontSize+'px;')+'">'
				 +'			<i class="fa  fa-arrow-circle-left"></i>'+option.control.text[0]
				 +'		</a>'
				 +'		<a style="float:right;'+('color:'+option.control.textStyle.color+';')+('font-size:'+option.control.textStyle.fontSize+'px;')+'">'
				 +          option.control.text[1]+'<i class="fa fa-arrow-circle-right"></i>'
				 +'		</a>'
				 +'	 </div>'
				 +' </div>'
				 +'</div>';
			this.$ele.html(html);

			this.$ele.find('.val-list>li:first-child>.val-arrow').remove();
			if(option.control.show) this.showControl();
			this.$ele.find('.val-list-body').niceScroll( {
				cursorcolor : "#000000",
				zindex : 999999,
				bouncescroll : true,
				cursoropacitymax : 0.4,
				cursorborder : "",
				cursorborderradius : 0,
				cursorwidth : "7px",
				railalign : "left",
				autohidemode : false,
				railoffset : {
					left : 0
				}
			});

		},
		bindEvent:function(){
			var that=this;
			that.$ele.on('click','.val-list>li',function(){
				var $this=$(this),index=$(this).index();
				var $li_height=that.$ele.find('ul.val-list-bottom>li').eq(1).height()+5;

				//变色效果
				that.$ele.find('ul.val-list-top').stop().animate({height:index*$li_height+56},that.option.animationDuration,'linear',function(){
					that.$ele.find('ul.val-list-top>li').eq(index).addClass('val-active').siblings().removeClass('val-active');
				});

				//禁用上一步或下一步控制标签
				that.$ele.find('.val-control a:eq(0)').toggleClass('val-control-ban',$this.prev().length==0);
				that.$ele.find('.val-control a:eq(1)').toggleClass('val-control-ban',$this.next().length==0);

				//滚动条定位
				that.$ele.find('.val-list-body').stop().animate({
                    scrollTop: $this.position().top-60
                }, 600);

				//切换页面
				var $frame=$this.parent().parent().siblings('.val-frame').find('iframe');
				$frame.attr('src',$this.attr('data-page'));
			});
			that.$ele.on('click','.val-control a:eq(0)',function(){
				that.prevStep();
			});
			that.$ele.on('click','.val-control a:eq(1)',function(){
				that.nextStep();
			});
		},
		prevStep:function(){
			this.$ele.find('.val-list>li.val-active').prev().click();
		},
		nextStep:function(){
			this.$ele.find('.val-list>li.val-active').next().click();
		},
		showControl:function(){
			this.$ele.find('.val-control').show();
		},
		hideControl:function(){
			this.$ele.find('.val-control').hide();
		}
	};
	$.fn.vlist=function(option){
		return new Vlist($(this),option);
	};
})(jQuery,window,document);
