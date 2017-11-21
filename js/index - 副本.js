/**
 * Created by web-01 on 2017/9/2.
 */
/*头部轮播*/
(function () {
    var n = 5, m = 0, TRANS = 0.5, INTERVAL = 3000;
    var WIDTH = $(".slider").width(), HEIGHT = $(".slider").css("height"), LIWIDTH = WIDTH * n;
    var $container = $("#container"), $leftArrow = $("#slider .left-arrow");
    var $rightArrow = $("#slider .right-arrow");
    $container.css("width", LIWIDTH);
    $container.css("height", HEIGHT);
    function moveSlider() {
        m++;
        var left = WIDTH * -m;
        $container.css("left", left);
        $container.css("transition", "all " + TRANS + "s linear");
        //console.log(left)
        // if(left==-1350){
        //     console.log(1)
        // }else if(left==-2700){
        //     console.log(2)
        //     $("#container div:nth-child(2) div:first-child").addClass("bear");
        // }else if(left==-4050){
        //     console.log(3)
        // }else if(left==-5400){
        //     console.log(1)
        // }
        navCir();
        if (m === n) {
            $container.css("transition", "none")
            $container.css("left", 0);
            m = 0;
            setTimeout(function () {
                $container.css("transition", "all " + TRANS + "s linear");
                m = 1;
                var left = WIDTH * -m;
                $container.css("left", left);
            }, 10)
        }
    }

    //小圆点跟随动画移动事件
    function navCir() {
        $("#slider #navCir .hover").removeClass("hover");
        $("#slider #navCir li:nth-child(" + parseInt(m + 1) + ")").addClass("hover");
        if (m == n - 1) {
            $("#slider #navCir li:nth-child(" + parseInt(m) + ")").removeClass("hover");
            $("#slider #navCir li:nth-child(1)").addClass("hover")
        }
        if (m == n) {
            setTimeout(function () {
                m = 1;
                $("#slider #navCir li:nth-child(" + parseInt(m + 1) + ")").addClass("hover")
            }, 10)
        }
    }

    //设置鼠标移入移出事件
    $container.hover(
        function () {
            clearInterval(timer);
            timer = null;
        },
        function () {
            timer = setInterval(moveSlider, INTERVAL + TRANS)
        }
    );
    //设置箭头点击事件
    function rightMove() {
        if (m > 0) {
            m--;
            var left = WIDTH * -m;
            $container.css("left", left);
            $container.css("transition", "all " + TRANS + "s linear")
            navCir();
        } else {
            $container.css("transition", "none");
            m = n - 1;
            $("#slider #navCir li:nth-child(" + parseInt(m) + ")").addClass("hover");
            $("#slider #navCir li:nth-child(1)").removeClass("hover")
            var left = WIDTH * -m;
            $container.css("left", left);
            m--;
            setTimeout(function () {
                $container.css("transition", "all " + TRANS + "s linear")
                var left = WIDTH * -m;
                $container.css("left", left)
            }, 50)
        }
    }
    //左侧
    $leftArrow.click(function (e) {
        e.preventDefault();
        //点击时清除动画
        clearInterval(timer)
        rightMove();
    })
    //右侧
    $rightArrow.click(function (e) {
        e.preventDefault();
        clearInterval(timer)
        moveSlider();
    })
    //设置点击小圆点跳到对应照片
    $("#slider #navCir li").click(function (e) {
        clearInterval(timer)
        var $target = $(e.target);
        var index = $target.index();
        m = index;
        // console.log(index)
        $target.addClass("hover");
        $target.siblings().removeClass("hover");
        $container.css("left", WIDTH * -index);
        $container.css("transition", "all " + TRANS + "s linear")
    })
    var timer = setInterval(moveSlider, INTERVAL + TRANS);
})();

//请求中间商品蛋糕部分内容
(() => {
    $.ajax({
        type: "GET",
        url: "data/index_product.php",
        success: function (data) {
            // console.log(data)
            // console.log(data[0]);
            var htmlCake = "";
            var html = "";
            for (var obj of data) {
                // console.log(obj.sweetness_index)
                if (obj.category === "cake") {
                    htmlCake += `
                    <div class="cake-list-box" data-id="${obj.cid}" data-fid="${obj.family_id}">
                    <div class="cake-list">
                        <a href="#">
                            <img src="${obj.pic}" alt="">
                        </a>
                        <div class="show-font">
                            <a href="# ">
                                <span class="font-french">${obj.fre_title}</span>
                                <span class="font-chs">${obj.che_title}</span>
                                <img src="${obj.nature_img}" class="xinpin">
                            </a>
                        </div>
                        <div class="hidden-font">
                            <span class="cake-weight">${obj.weight}磅/${obj.price}RMB</span>
                            <span class="cake-sweet">甜度指数:</span>
                            `
                    for (var i = 0; i < obj.sweetness_index; i++) {
                        htmlCake += `
                          <i></i>
                      `;
                    }
                    htmlCake += `
                            <a href="#"></a>
                        </div>
                    </div>
                </div>
                  `;
                } else {
                    html += `
                    <div class="cake-list-box" data-id="${obj.cid}">
                    <div class="cake-list">
                        <a href="javascript:;">
                            <img src="${obj.pic}" alt="">
                        </a>
                        <div class="show-font">
                            <a href="javascript:;">
                                <span class="font-french">${obj.fre_title}</span>
                                <span class="font-chs">${obj.che_title}</span>
                                <img src="${obj.nature_img}" class="xinpin">
                            </a>
                        </div>
                        <div class="hidden-font">
                            <span class="cake-weight">${obj.weight}克/${obj.price}RMB</span>
                            <span class="cake-sweet">甜度指数:</span>`
                        for (var i = 0; i < obj.sweetness_index; i++) {
                            html += `
                            <i></i>
                        `;
                        }
                    html += `
                            <a href="javascript:;"></a>
                        </div>
                    </div>
                </div>
                  `;
                }
            }
            $("#cake-box").html(htmlCake);
            $("#refreshments-box").html(html);
        },
        error: function () {
            alert("网络错误，请您检查");
        }
    }).then((data)=>{
		 //点击跳转到对应的详情页 && 点击时加入购物车
			var $cakeBox = $("#cake-box");
			var $refreshmentsBox = $("#refreshments-box");
			var $cakeListBox = $(".cake-box").children();
			var $addCart = $(".cake-box .hidden-font a");
			var $closeBox = $("#maximPanel>a");
			//console.log($addCart)
			$cakeListBox.click(function (e) {
				e.preventDefault();
				//将当前的data-id获取，并存储在index中
				//存储在localStorage中
				var cid = this.dataset.id;
				localStorage.setItem('index',cid);
				location.href = data[0].href;
			});
			//点击时弹出遮罩层 && 加入购物车
			$addCart.click(function(e){
				e.preventDefault();
				//阻止冒泡
				e.stopPropagation();
                var cid = $(e.target).parents(".cake-list-box")[0].dataset.id;
                localStorage.setItem('CartId',cid);
				$("#container_box").css("display","block");
				$("#maximPanel").css("display","block");
			});
			//点击时取消遮罩层 && 加入购物车
			$closeBox.click(function(e){
				e.preventDefault();
				$("#container_box").css("display","none");
				$("#maximPanel").css("display","none");
			})
	})
	.then(() => {
        (() => {
            let $redHeart = $(".right-part .top-ul li i");
            let $redHeartShow = $(".right-part .top-ul li");
            $redHeart.css("display", "none");
            $redHeartShow.hover(
                function (e) {
                    var $target = $(e.target);
                    $target.children("i").parent().siblings().children("i").css("display", "none");
                    $target.children("i").css("display", "block");
                },
                function (e) {
                    var $target = $(e.target);
                    $target.children("i").css("display", "none");
                }
            )
        })();
        (() => {
            let $topUl = $(".top-ul");
            let $cakeListBox = $("#cake-box").children();
            var b;
            $topUl.on("click", "li", function (e) {
                e.preventDefault();
                var index = $(this).index() - 1;
                var actions = [];
                /**
                 * actions成员:
                 * {
                 *   $e: jquery对象
                 *   before: 状态对象,
                 *   after: 状态对象,
                 * }
                 * 状态对象:
                 * {
                 *   left: 水平位置
                 *   top: 垂直位置
                 *   hidden: 是否显示
                 * }
                 */
                $cakeListBox.each(function () {
                    actions.push({$e: $(this)});
                });
                actions.forEach(function (item) {
                    item.before = item.$e.position();
                    item.before.hidden = item.$e.is(':hidden');//bool

                    // console.log(item.$e.is(':hidden'));
                });
                index == 0 || index == -1
                    ? $cakeListBox.show()
                    : $cakeListBox.hide().filter(`[data-fid=${index}]`).show();
                $("#cake-box").height('').height($("#cake-box").height());
                actions.forEach(function (item) {
                    item.after = item.$e.position();
                    item.after.hidden = item.$e.is(':hidden');
                });
                console.table(actions.map(({$e, before, after}) => ({
                    action: before.hidden && after.hidden && 'none' ||
                    before.hidden && !after.hidden && 'show' ||
                    !before.hidden && after.hidden && 'hide' ||
                    !before.hidden && !after.hidden && 'move'
                    ,
                    top_before: before.top,
                    top_after: after.top,
                    left_before: before.left,
                    left_after: after.left,
                })));
                actions.forEach(function (item) {
                    item.$e.css({
                        'position': 'absolute',
                        'top': item.before.top,
                        'left': item.before.left,
                    });
                    if (item.before.hidden && !item.after.hidden) {
                        // 显示它
                        if (Math.random() > .5) {
                            // 淡入
                            item.$e.css('opacity', 0).show()
                                .animate({
                                    opacity: 1
                                }, 500, unposition);
                        } else {
                            // 飞入
                            item.$e.css(around(item.$e)).animate({
                                top: item.after.top,
                                left: item.after.left,
                            }, 500, unposition);
                        }
                    } else if (!item.before.hidden && item.after.hidden) {
                        // 隐藏它
                        if (Math.random() > .5) {
                            // 淡出
                            item.$e.css('opacity', 1)
                                .animate({
                                    opacity: 0
                                }, 500, function () {
                                    $(this).hide();
                                    unposition.call(this);
                                })
                        } else {
                            // 飞出
                            item.$e.css({
                                top: item.after.top,
                                left: item.after.left,
                            }).animate(around(item.$e), 500, unposition);
                        }
                    } else if (!item.before.hidden && !item.after.hidden) {
                        // 移动它
                        item.$e.animate({
                            top: item.after.top,
                            left: item.after.left
                        }, 500, unposition);
                    } else {
                        // 不管它
                        unposition.call(item.$e);
                    }
                });
                function unposition() {
                    $(this).css({
                        position: '',
                        top: '',
                        left: '',
                        opacity: '',
                    })
                }

                /**
                 * 返回外容器四周的任意位置
                 * @return { top, left }
                 */
                function around($e) {
                    switch (parseInt(Math.random() * 4)) {
                        case 0:
                            // 上边
                            return {
                                top: -$e.height(),
                                left: Math.random() * 100 + '%'
                            };
                        case 1:
                            // 右边
                            return {
                                left: '100%',
                                top: Math.random() * 100 + '%'
                            };
                        case 2:
                            // 下边
                            return {
                                top: '100%',
                                left: Math.random() * 100 + '%'
                            };
                        case 3:
                            // 左边
                            return {
                                left: -$e.width(),
                                top: Math.random() * 100 + '%'
                            }
                    }
                }
            })
        })()
    })
})();
//加入购物车的遮罩层 选择购买数量
(()=>{
	var $subLeft = $(".tc-con-1 .cake_num dl>dd:first-child");
    var $addRight = $(".tc-con-1 .cake_num dl>dd:last-child");
    var $inputMid = $(".tc-con-1 .cake_num dl>dt>input");
	var $addCart = $(".tc-con-1 .buy_btn>li:first-child input");
    var $buyNow = $(".tc-con-1 .buy_btn>li:last-child input");
    var uid = sessionStorage.getItem('uid');
	var num;
	//点击时进行自增 && 自减 以及输入框的数字的正则判断
	//调用 common.js的addCartReg
	addCartReg($inputMid,$addRight,$subLeft)
	//设置按钮的悬停时样式 && 调用 common.js的inChange
    inChange($addCart, "Ajuter au panier", "加入购物车");
    inChange($buyNow, "Commander", "立即购买");
	//点击立即购买时判断是否登录
	isLogin($buyNow);
    $addCart.click((e)=>{
        var buyCount=parseInt($(e.target).parents(".buy_btn").siblings(".cake_num").children().children().children().val());
        var cid = localStorage.getItem('CartId');
        //console.log(buyCount);
        $.ajax({
            type:"GET",
            url:"data/addCart.php",
            data:{'index':cid,'uid':uid,'buyCount':buyCount},
            success:function(data){
                if(data.code == 200){
                    var $count = $("#register-box ul>li").first().children("a");
                    let n = parseInt($count.html().slice(0,-1));
                    let m = 0;
                    //console.log(n++)
                    m=n+buyCount;
                    $count.html(m+"件");
                    $(e.target).parents("#maximPanel").css("display","none");
                    $(e.target).parents("#maximPanel").siblings("#container_box").css("display","none");
                    //setTimeout(()=>{
                        var $propContainerBox = $("#prop_container_box");
                        var $propBox = $("#prop_box");
                        $propContainerBox.css("display","block");
                        $propBox.css("display","block");
                        setTimeout(()=>{
                            $propContainerBox.css("display","none");
                            $propBox.css("display","none");
                        },2000);
                    //},100)
                }else{
                    sessionStorage.getItem('uid');
                    if(uid==null){
                        location.href = "2.login.html";
                    }
                }
            },
            error:function(){
                alert("网络错误,请检查")
            }
        })

    });
})();
(()=>{
    let $littleFood = $(".right-part .bottom-ul");
    $littleFood.on("click","li",function(e){
        e.preventDefault();
        e.stopPropagation();
        var y1 = $("#little-food").height();
        var y2 = $("#little-food").offset().top;
        var top = $(e.target).offset().top;
        var timer = setInterval(()=>{
            if(top<(y2-y1*2)){
                top = top+10;
                $(window).scrollTop(top);
            }else{
                clearInterval(timer);
            }
        },5)
    })
})();
