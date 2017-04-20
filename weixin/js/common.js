
//执行“轮播及商品滑动”
window.onload=function(){
    slide(
		  "#banner",
		  "#banner_ul",
		  "#banner_ul .slide_li",
		  "#banner_dot",
		  "#banner_dot_ul"
		);
	slide(
		  "#product1",
		  "#product_ul1",
		  "#product_ul1 .slide_li",
		  "#product_dot1",
		  "#product_dot_ul1"
		);
	slide(
		  "#product2",
		  "#product_ul2",
		  "#product_ul2 .slide_li",
		  "#product_dot2",
		  "#product_dot_ul2"
		);
};
/*待付款列表图片高度*/
$(function () {
	for(i=0;i<$('.obligation_ul img').length;i++){
		$('.obligation_ul img:eq('+i+')').css("min-height",$('.obligation_ul li:eq('+i+') div').height());
	}
})


/*轮播及商品滑动*/
function slide(slidebd,slide_ul,slide_li,slide_dot,slide_dot_ul){
	var acindex = 0;
	var flag="right";
	var curindex = 0;
	var lihtml = '<li></li>';
	$(slidebd) .find(slide_li).each(function(){
		acindex++;
		$(slidebd) .find(slide_dot_ul).append(lihtml);
	});
	$(slide_li).width($(slidebd).width());
	$(slide_li+":not(:first-child)").hide();
	$(slide_ul).width($(slide_li).eq(0).width()*acindex);
	$(slide_li).show();
	$(slide_dot_ul).find("li").eq(0).addClass("active");
	var dotulw=($(slidebd).width()-$(slide_dot_ul).width())/2;

	function slideplayprev(){
		$(slide_dot_ul).find("li").removeClass("active");
		$(slide_ul).find("li:last").prependTo($(slidebd) .find(slide_ul));
		$(slide_ul).css({'margin-left':-$(slidebd).find(slide_li).eq(0).width()});
		$(slidebd) .find(slide_ul).animate({
				'margin-left':0
			},
			function(){
				curindex--;
				if(curindex <= -1){
					curindex = acindex-1;
				}
				$(slide_dot_ul).find("li").eq(curindex).addClass("active");
			});
		flag = "left";
	}


	function slideplaynext() {
		$(slide_ul).animate({
			'margin-left' : -$(slide_li).eq(0).width()
		}, function() {
			$(slide_ul).find("li:first").appendTo($(slide_ul));
			$(slidebd) .find(slide_ul).css({
				'margin-left' : 0
			});
			curindex++;
			if (curindex >= acindex) {
				curindex = 0;
			}
			$(slide_dot_ul).find("li").removeClass("active");
			$(slide_dot_ul).find("li").eq(curindex).addClass("active");
		});
		flag = "right";
	}

	var timeInt;
	function setTimeInt(){
		if($(slidebd).attr("other")=="product"){	//商品滑动
			if(acindex>1){
				timeInt =function () {
					alert(1);
					if(flag == 'left'){
						slideplayprev();
					}else{
						slideplaynext();
					}
				}
			}else{
				$(slide_dot_ul).hide();
			}

		}else{										//定时轮播
			if(acindex>1){
				timeInt =setInterval(function(){
					if(flag == 'left'){
						slideplayprev();
					}else{
						slideplaynext();
					}
				},3000);
			}else{
				$(slide_dot_ul).hide();
			}
		}
	}
	setTimeInt();

	$(window).resize(function(){
		$(slide_li).width($(slidebd).width());
		$(slide_ul).width(($(slide_li).width()*acindex+1));
	});

	$(slidebd) .touchwipe({
		wipeLeft: function() {
			clearInterval(timeInt);
			slideplaynext();
			setTimeInt();
		},
		wipeRight: function() {
			clearInterval(timeInt);
			slideplayprev();
			setTimeInt();
		},
		wipeUp: function() {
			var t = $(window).scrollTop()-200;
			if(t<=0)t=0;
			$('body,html').animate({scrollTop:t},500);
		},
		wipeDown: function() {
			$('body,html').animate({scrollTop:$(window).scrollTop()+200},500);
		},
	});
}