//请求数据 && 放大镜
(() => {
    //请求大图 小图
    var htmlSm = "", htmlMd = "", font = "", htmlLg = "", rightDetails = "";
	var cid = localStorage.getItem('index');
    $.ajax({
        type: "GET",
        url: "data/product_details_fu.php",
		data:{index:cid},
        success: function (data) {
            //console.log(data);
			//console.log(data.descData)
            for (var i of data.picData) {
                htmlSm += `
                 <li class="cur">
                    <img src="${i.sm}" alt="">
                 </li>   
                `
                htmlMd += `
                  <li>
                    <img src="${i.md}" alt="">
                 </li> 
                `
                htmlLg += `
                 <li>
                    <img src="${i.lg}" class="bg_img">
                 </li>
                `
            }
			for(var i of data.descData){
				font += `
					<p class="fre_font">${i.details.split("+")[0]}</p>
					<p class="che_font">${i.details.split("+")[1]}</p>
				`;
				rightDetails += `
					<div class="pro_name">
						<span>${i.fre_title}</span>
						${i.che_title}
					</div>
					<div class="pro_price">
						¥
						<span>${i.price}</span>
					</div>
					<div class="pro_weight">
						<div>
							<i></i>
							<span>${i.weight}磅</span>
						</div>
					</div>
					<div class="pro_desc">
						<span>${i.spec.split("+")[0]}</span>
						<span>${i.spec.split("+")[1]}</span>
						<p>${i.spec.split("+")[2]}</p>
						<p>若不及时食用，请放置冰箱冷冻室储存</p>
					</div>
				`;
			}
            $(".mid_sm_img ul").html(htmlSm);
            $(".hide_md_img").prepend(htmlMd);
            $(".hide_bg_img ul").html(htmlLg);
            $(".right_big_img").append(font);
            $(".pro_detail").prepend(rightDetails);
            // console.log(1)
        },
        error: function () {
            alert("网络错误，请检查")
        }
    })
    //放大镜
        .then(() => {
            (() => {
                //点击小图切换中图、大图
                var $sm = $(".mid_sm_img>ul");
                $sm.on("click", "li", function (e) {
                    var index = $(e.target).parent().index() + 1;
                    var $md = $(".hide_md_img li:nth-child(" + index + ")");
                    var $lg = $(".hide_bg_img li:nth-child(" + index + ")");
                    $md.css({display: "block"});
                    $md.siblings().css({display: "none"});
                    $lg.css({display: "block"});
                    $lg.siblings().css({display: "none"});
                });
                //放大镜
                var $mdBox = $(".hide_md_img");//中图
                var $zoomPointer = $(".zoom_pointer");//移动遮罩层
                var $bgBox = $(".hide_bg_img");//大图
                var $bgImg = $(".bg_img");//大图片
                var $bgImgWidth = 960, $bgImgHeight = 960;
                var $mdBoxParent = $(".right_big_img");
                // var scrollTop;
                //定义鼠标移入中图时，大图和遮罩层出现
                $mdBox.hover(
                    function () {
                        $zoomPointer.css("display", "block");
                        $bgBox.css("display", "block");
                    },
                    function () {
                        $zoomPointer.css("display", "none");
                        $bgBox.css("display", "none");
                    }
                );
                //定义鼠标移动事件
                $mdBox.mousemove(
                    function (e) {
                        //获得鼠标移动时距离页面顶部和左边的距离
                        var y = e.pageY, x = e.pageX;
                        //获得距离当前元素距离页面顶部的距离
                        var left = $mdBoxParent.offset().left;
                        var top = $mdBoxParent.offset().top;
                        //鼠标在元素内的移动距离
                        var xLeft = x - left - $zoomPointer.width() / 2;
                        var yTop  = y - top - $zoomPointer.height() / 2;
                        //确保遮罩层的移动范围在中图范围内
                        var maxXMove = $mdBox.width() - $zoomPointer.width();
                        var maxYMove = $mdBox.height() - $zoomPointer.height();
                        if (xLeft <= 0) {
                            xLeft = 0;
                        } else if (xLeft >= maxXMove) {
                            xLeft = maxXMove;
                        }
                        ;
                        if (yTop <= 0) {
                            yTop = 0;
                        } else if (yTop >= maxYMove) {
                            yTop = maxYMove;
                        }
                        ;
                        //设置遮罩层跟随鼠标移动
                        $zoomPointer.css({top: yTop, left: xLeft});
                        //设置大图跟随鼠标移动
                        //计算:移动系数=鼠标移动时XY的值/鼠标移动时最大的XY值
                        // xi=xLeft/maxXMove,yi=yTop/maxYTop
                        var xi = xLeft / maxXMove, yi = yTop / maxYMove;
                        var xiLeft = xi * ($bgBox.width() - $bgImgWidth);
                        var yiTop = yi * ($bgBox.height() - $bgImgHeight);
                        $bgImg.css({top: yiTop, left: xiLeft});
                    }
                )
            })();
        });
    //热销排行榜
    $.ajax({
        type: "GET",
        url: "data/products_count.php",
        success: function (data) {
            // console.log(data);
            var html = "";
            for (var obj of data) {
                html += `
                    <div class="cake-list">
                        <a href="#">
                            <img src=${obj.pic} alt="">
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
                            <span class="cake-sweet">甜度指数:</span>`
                for (var i = 0; i < obj.sweetness_index; i++) {
                    html += `
                        <i></i>
                        `;
                }
                html += `</div>
                    </div>
                `
            }
            $("#cake-box").html(html);
        },
        error: function () {
            alert("网络错误，请检查")
        }
    });
})();
/**
    等待页面结构加载完成时，执行此段代码 $(document).Ready||$().ready(function(){})
*/
//$(window).Load(function(){})
// $(window).onload(function(){
//右侧详细介绍
(() => {
    var $subLeft = $(".cake_num dl>dd:first-child");
    var $addRight = $(".cake_num dl>dd:last-child");
    var $inputMid = $(".cake_num dl>dt>input");
    var $addCart = $("#buy_btn_box>li:first-child input");
    var $buyNow = $("#buy_btn_box>li:last-child input");
    var $selectDe = $(".select_view>li:first-child");
    var $selectPr = $(".select_view>li:last-child");
    var cid = localStorage.getItem('index');
    var uid = sessionStorage.getItem('uid');
    //设置全局变量
    var num;
	//点击时进行自增 && 自减 以及输入框的数字的正则判断
	//调用 common.js的addCartReg
    addCartReg($inputMid,$addRight,$subLeft);
    /*
    * 设置按钮的悬停时样式 && 调用 common.js的inChange
    * */
    inChange($addCart, "Ajuter au panier", "加入购物车");
    inChange($buyNow, "Commander", "立即购买");
    /*
    * 点击立即购买时判断是否登录，如果没有登录
    * 则跳转至登录页，否则跳转至购物车
    * */
    isLogin($buyNow);
    /*
    * 点击加入购物车时将商品信息
    * */
    $addCart.click((e)=>{
        var buyCount=parseInt($(e.target).parents("#buy_btn_box").siblings(".cake_num").children().children().children().val());
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
                    var $propContainerBox = $("#prop_container_box");
                    var $propBox = $("#prop_box");
                    $propContainerBox.css("display","block");
                    $propBox.css("display","block");
                    setTimeout(()=>{
                        $propContainerBox.css("display","none");
                        $propBox.css("display","none");
                    },2000);
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
    //评论和介绍转换
    $selectDe.click(function () {
        $(".ingredient_show").css("display", "block");
        $(".ingredient_show").siblings().css("display", "none");
        console.log($selectPr.children("p")[0])
        $selectPr.find("p").css("border-bottom", "3px solid #d9e8eb");
        $selectDe.find("p").css("border-bottom", "3px solid #7b9196");
    });
    $selectPr.click(function () {
        $(".evaluation_hide").css("display", "block");
        $(".evaluation_hide").siblings().css("display", "none");
        $selectDe.find("p").css("border-bottom", "3px solid #d9e8eb");
        $selectPr.find("p").css("border-bottom", "3px solid #7b9196");
    })
})();


