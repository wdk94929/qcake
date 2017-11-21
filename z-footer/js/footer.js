/**
 * Created by web-01 on 2017/9/17.
	(()=>{
		//1.定义变量,并向数据库发送ajax1请求
		var html="";
		var n=0,TRANS=500,INTERVAL=2000;
		$.ajax({
			type:"GET",
			url:"data/bottom_slider.php",
			success:function(data){
				console.log(data);
				for(var p of data){
					html+=`
					<li>
						<a href="#">
							<img src="${p.img}" alt="">
						</a>
					</li>`;
				}
				//为了让效果类似轮播，在底部拼接前三张照片
				html+=`
						<li>
							<a href="#">
								<img src="${data[0].img}" alt="">
							</a>
						</li>
						<li>
							<a href="#">
								<img src="${data[1].img}" alt="">
							</a>
						</li>
						<li>
							<a href="#">
								<img src="${data[2].img}" alt="">
							</a>
						</li>`
				var $ul=$(".footer-slider-box>ul");
				$ul.html(html);
				//获取li的宽度
				var =$(".footer-slider-box>ul>li").();
				//将计算后宽度赋值给ul
				$ul.(parseInt(WIDTH)*parseInt(data.length)+1200);//ul宽度需要加上1200px;
				//2.定义函数使ul进行移动
				function move(){
					n++;
					//计算位移距离
					var left=parseInt(WIDTH)*n;
					//设置每次位移的距离 两种方法都可以
					// $ul.css("transform",`translateX(${-left}px)`);
					$ul.css("margin-left",-left+"px");
					//console.log(left);
					if(n==data.length+1){
						//当n的值为最后一张照片时 把trisition 去掉，并且将margin-left设为0
						$ul.css("transition","");
						$ul.css("margin-left",0);
						//将n设为0 第一张显示
						n=0;
						//此时将动画清除
						clearInterval(timer);
						//设置10秒之后执行之内的代码
						setTimeout(()=>{
						  $ul.css("transition",`all .${TRANS/100}s linear`);
							n=1;
							var left=parseInt(WIDTH)*n;
							// $ul.css("transform",`translateX(${-left}px)`);
							$ul.css("margin-left",-left+"px");
							timer=setInterval(move,INTERVAL+TRANS);
						},100)
					}
				}
				var timer=setInterval(move,INTERVAL+TRANS);
				//定义鼠标移入移出时的效果  用hover 可代替 mouseover和mouseout
				$ul.parent().hover(
					function(){
						clearInterval(timer);
						timer=null;
					},
					function(){timer=setInterval(move,INTERVAL+TRANS);}
				)
					// $ul.parent().mouseover(function(){
					//     clearInterval(timer);
					//     timer=null;
					// })
					// $ul.parent().mouseout(function(){
					//     timer=setInterval(move,INTERVAL);
					// })
					//点击效果
				// 3.1左侧箭头绑定单击事件
				$(".btn1").click(function(){
					if(n<$ul.children().length-3){
						n++;
						var left=parseInt(WIDTH)*-n;
						$ul.css("margin-left",left+"px");
					}else{
						n++;
						var left=parseInt(WIDTH)*-n;
						$ul.css("margin-left",left+"px");
						setTimeout(()=>{
							$ul.css("transition","");
							$ul.css("margin-left",0);
							n=0;
							$ul.css("transition",`all .${TRANS/100}s linear`)
						},100)
					}
				})
				//3.2右侧箭头绑定单击事件
				$(".btn2").click(function(){
					if(n>0){
						n--;
						var left=parseInt(WIDTH)*-n;
						console.log(left);
						$ul.css("margin-left",left+"px");
					}else{
						$ul.css("transition","");
						n=$ul.children().length-3;
						console.log(n);
						$ul.css("margin-left",left+"px");
						setTimeout(()=>{
							$ul.css("transition",`all .${TRANS/100}s linear`);
							n--;
							console.log(n);
							var left=parseInt(WIDTH)*-n;
							console.log(left);
							$ul.css("margin-left",left+"px");
						},100);
					}
				})
			},
			error:function(){
				alert("网络错误，请检查网络");
			}
		});
	})();
 */

(()=>{
	$.ajax({
		type:"GET",
		url:"data/bottom_slider.php",
		success:function(data){
			var html="";
			console.log(data);
			for(var p of data){
				html+=`
				<li>
					<a href="#">
						<img src="${p.img}" alt="">
					</a>
				</li>`;
			}
			$ul=$(".footer-slider-box ul");
			$ul.html(html);
			//每次left移动的值
			var WIDTH=parseInt($(".footer-slider-box ul li").css("width"));
			//动态加载ul的宽高   觉得可有可无
			$ul.css("width",WIDTH*data.length);
			$ul.css("height",$(".footer-slider-box ul li").height());
			console.log(WIDTH);
			//记录最左侧照片的下标
			var left_li=0;
			//记录最右侧照片的下标
			var right_li=2;
			//查找ul下的所有li元素，并返回一个集合
            var li=$ul.find("li");
            //console.log(li);
            //console.log($(li))
            //所有图片向左移动20个单位
            function moveLeft(){
            	//循环遍历 当i<照片的长度的时候为每张照片的left-20
            	for(var i=0;i<data.length;i++){
            		$(li[i]).css("left",parseInt($(li[i]).css("left"))-20);
            		//console.log(parseInt($(li[i]).css("left")));
				}
			}
			//所有图片向右移动20个单位
            function moveRight(){
            	//同moveLeft
            	for(var i=0;i<data.length;i++){
            		$(li[i]).css("left",parseInt($(li[i]).css("left"))+20);
				}
			}
			function moveLeftOnce(){
				//当显示区的最后一张照片不为整个照片的最后一张的时候
            	if(right_li<data.length-1){
                    // console.log($(li[right_li]).css("left"))
                    // console.log($(li[right_li]).css("width"))
                    console.log(right_li)
					//将下一个即将要显示的照片 通过改变其left top值的方式 设置在显示区的最后一张照片后面 将right_li自增
                    $(li[right_li+1]).css("left",parseInt($(li[right_li]).css("left"))+WIDTH);//1200
					$(li[right_li+1]).css("top",0);
					right_li++;

					// console.log(right_li)
					// console.log($(li[right_li]).css("left"))
				//如果显示区最后一张照片等于整个最后一张照片的时候 将第一张放在显示区后面一张的位位置上，将right_li重置为0
				}else if(right_li==data.length-1){
					$(li[0]).css("left",parseInt($(li[right_li]).css("left"))+WIDTH);
                    $(li[0]).css("top",0);
                    right_li=0;
				}
			 	var n=0;
				//设置定时器移动照片，因为每次移动20px 所以移动20次
			 	var timer=setInterval(function(){
					n++;
					if(n<=20){
						moveLeft();
					}else{
						clearInterval(timer);
						timer=null;
					}
				},20)
			}
            function moveRightOnce(){
				//当显示区第一张不是整个第一张时，将他的前一张放在他的前面，
				if(left_li>0){
					console.log(left_li)
                    $(li[left_li-1]).css("left",parseInt($(li[left_li]).css("left"))-WIDTH);
                    $(li[left_li-1]).css("top",0);
                    left_li--;
				}else if(left_li==0){
                    console.log(left_li)
					//当显示区的第一张时整个的第一张时，将整个的最后一张放在第一张的前面。
                    $(li[data.length-1]).css("left",parseInt($(li[left_li]).css("left"))-WIDTH);
                    $(li[data.length-1]).css("top",0);
                    left_li=data.length-1;
				}
				var n=0;
				var timer=setInterval(function(){
					n++;
					if(n<=20){
						moveRight();
					}else{
						clearInterval(timer);
						timer=null;
					}
				},0)
            }
            //调用
            var timer=setInterval(moveLeftOnce,2000)
            //定义鼠标移入移出事件
            $(".footer-slider-box").hover(
                function(){
                    clearInterval(timer);
                    timer=null;
                },
                function(){
                    //必须用timer接着，不然相当于重新调用函数
                    timer=setInterval(moveLeftOnce,2000);
                }
            )
			//定义单击事件
			$(".footer-slider-box .btn1").click(function(){
				// clearInterval(timer);
				moveLeftOnce();
                // timer=setInterval(moveLeftOnce,2000);
                $(".footer-slider-box .btn1").click(function(){})
                $(".footer-slider-box .btn2").click(function(){})
			})
			//当无脑　点击右边时，如果正常比例会有bug，如果缩小页面，bug消失，但点击左边时不会出现此bug。
			$(".footer-slider-box .btn2").click(function(){
					// clearInterval(timer);
					moveRightOnce();
					// right_li=2;
					// timer=setInterval(moveLeftOnce,2000);
					// $(".footer-slider-box .btn2").click(function(){})
					// $(".footer-slider-box .btn1").click(function(){})
			})
		},
		error:function(){
			alert:("网络错误，请检查");
		}
	})
})();