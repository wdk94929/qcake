/**
 * Created by web-01 on 2017/9/17.
 */
(()=>{
    //1.定义变量,并向数据库发送ajax请求
    var html="";
    var n=0,TRANS=500,INTERVAL=2000;
    $.ajax({
        type:"GET",
        url:"data/bottom_slider.php",
        success:function(data){
            for(var p of data){
                //console.log(data)
                html+=`
                <li>
                    <a href="javascript:;">
                        <img src="${p.img}" alt="">
                    </a>
                </li>`;
            }
            //为了让效果类似轮播，在底部拼接前三张照片
            html+=`
                    <li>
                        <a href="javascript:;">
                            <img src="${data[0].img}" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="${data[1].img}" alt="">
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <img src="${data[2].img}" alt="">
                        </a>
                    </li>`
            var $ul=$(".footer-slider-box>ul");
            $ul.html(html);
            //获取li的宽度
            var WIDTH=$(".footer-slider-box>ul>li").width();
            //将计算后宽度赋值给ul
            $ul.width(parseInt(WIDTH)*parseInt(data.length)+1200);//ul宽度需要加上1200px;
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
            //点击效果
            // 3.1左侧箭头绑定单击事件
            $(".btn1").click(function(){
                if(n>0){
                    n--;
                    var left=parseInt(WIDTH)*-n;
                    console.log(left);
                    $ul.css("margin-left",left+"px");
                }else{
                    $ul.css("transition","none");
                    n=$ul.children().length-3;
                    left=parseInt(WIDTH)*-n;
                    $ul.css("margin-left",left+"px");
                    n--;
                    setTimeout(()=>{
                        $ul.css("transition",`all .${TRANS/100}s linear`);
                        var left=parseInt(WIDTH)*-n;
                        $ul.css("margin-left",left+"px");
                    },100);
                }
            })
            //3.2右侧箭头绑定单击事件
            $(".btn2").click(function(){
                if(n<$ul.children().length-3){
                    n++;
                    var left=parseInt(WIDTH)*-n;
                    $ul.css("margin-left",left+"px");
                }else{
                    $ul.css("transition","none");
                    $ul.css("margin-left",0);
                    n=0;
                    n++;
                    setTimeout(()=>{
                        $ul.css("transition",`all .${TRANS/100}s linear`);
                        n=1;
                        var left=parseInt(WIDTH)*n;
                        $ul.css("margin-left",-left+"px");
                    },100)
                }
            })
        },
        error:function(){
            alert("网络错误，请检查网络");
        }
    });
})()