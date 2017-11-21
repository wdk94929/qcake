/*
* 跳转时加载页面数据
* */
(()=>{
    var uid = sessionStorage.getItem('uid');
    var $table = $(".list_table>li>table");
    function onLoad(){
        $.ajax({
            type:"GET",
            url:"data/addCartList.php",
            data:{'uid':uid},
            success:function(data){
                //console.log(data.msg);
                if(data.msg==""){
                    $(".user_list .car_empty").css("display","block").siblings().css("display","none");
                }else{
                    let html="";
                    for(var obj of data.msg){
                        html+=`
                        <tbody data-id="${obj.sid}">
                            <tr>
                                <td class="cartCheck" style="padding-left: 20px;border-bottom: 1px solid #d9e8ec;">
                                    <span>
                                        <i class="cho_bg"></i>
                                        <em class="cho_bg_ok"></em>
                                        <input type="checkbox" style="hidden:visible">
                                    </span>
                                </td>
                                <td class="pro_left" style="border-bottom: 1px solid #d9e8ec;width:41.5%">
                                    <div class="buy_pro_img">
                                        <a href="#">
                                            <img src="${obj.pic}" width="114" height="114" alt="${obj.che_title}">
                                        </a>
                                    </div>
                                    <div class="aleft">
                                        <a href="#">
                                            <b>${obj.fre_title}</b>
                                        </a>
                                        <br>
                                        ${obj.che_title}
                                        <br><br>
                                        赠品：标配餐具10份  生日蜡烛1支
                                    </div>
                                </td>
                                <td width="10%" style="border-bottom: 1px solid #d9e8ec;">
                                    <div class="cake_num">${obj.weight}磅</div>
                                    <span>${obj.spec.split("+")[0]}</span>
                                </td>
                                <td class="price" width="10%" style="border-bottom: 1px solid #d9e8ec;">¥${obj.price}</td>
                                <td width="10%" style="border-bottom: 1px solid #d9e8ec;">
                                    <div class="cake_num clear">
                                        <dl>
                                            <dd class="red">-</dd>
                                            <dt>
                                                <input type="text" value="${obj.count}">
                                            </dt>
                                            <dd class="add">+</dd>
                                        </dl>
                                    </div>
                                </td>
                                <td class="totalPrice" width="10%" style="border-bottom: 1px solid #d9e8ec;">¥${obj.price*obj.count}.00</td>
                                <td width="10%" style="border-bottom: 1px solid #d9e8ec;">
                                    <a href="#">删除</a>
                                    <div class="del_conform">
                                        <input type="submit" value="确定">
                                        <input type="submit" value="取消">
                                    </div>
                                </td>
                            </tr>
                        </tbody>   
                     `
                    }
                    $table.prepend(html);

                }
            },
            error:function(){
                alert("网络错误,请检查");
            }
        }).then((data)=>{
            var $handleDele = $(".list_table table td:last-child a");
            var $delConfirm = $(".del_conform");
            var $confirm = $(".del_conform input:first-child");
            var $cancel = $(".del_conform input:last-child");
            $delConfirm.css("display","none");
            //console.log(data.msg);
            $handleDele.click(function(e){
                e.preventDefault();
                $(this).siblings().show();
            });
            $cancel.click(function(e){
                e.preventDefault();
                $(this).parent().hide();
            });
            $confirm.click(function(e){
                e.preventDefault();
                var sid = parseInt($(e.target).parents("tbody")[0].dataset.id);
                $.ajax({
                   type:"GET",
                   url:"data/cartDel.php",
                   data:{"sid":sid},
                   success:function(result){
                       if(result.code == 200){
                           console.log(data.msg.count);
                           $(e.target).parents("tbody").remove();
                           var $propContainerBox = $("#prop_container_box");
                           var $propBox = $("#prop_box");
                           $propContainerBox.css("display","block");
                           $propBox.css("display","block");
                           setTimeout(()=>{
                               $propContainerBox.css("display","none");
                               $propBox.css("display","none");
                               location.reload(true);
                           },2000);
                       }
                   },
                   error:function(){
                       alert("网络错误，请检查111");
                   }
               });
            })
        }).then(()=>{
            // 全选功能
            var $cartCheck = $(".cartCheck");
            var off = true;
            var $checkAll = $(".border_top span");
            $cartCheck.on("click","em",function(e){
                e.preventDefault();
                if(off==true){
                    $(e.target).css("background","none");
                    off = false;
                }else{
                    $(e.target).css("background","url('images/ok.png') no-repeat 0 -280px");
                    off = true;
                }
            });
            var allOff = true;
            $checkAll.on("click","em",function(e){
                e.preventDefault();
                if(allOff==true){
                    $(e.target).css("background","none");
                    allOff = false;
                    $(".cartCheck em").css("background","none")
                }else{
                    $(e.target).css("background","url('images/ok.png') no-repeat 0 -280px");
                    allOff = true;
                    $(".cartCheck em").css("background","url('images/ok.png') no-repeat 0 -280px");
                }
            })
        }).then(()=>{
            var $addRight = $(".cake_num .add");
            var $subLeft = $(".cake_num .red");
            var $midinput = $(".cake_num input");
            var num;
            var $totalPrice = $(".total_all>span b");
            $midinput.blur(function (e) {
                var $target = $(e.target);
                var price = parseInt($target.parents("td").prev().html().slice(1,-3));
                num = parseInt($target.val());
                var aReg = /^[1-9]\d{0,5}$/;
                if (aReg.test(num)) {
                    $target.val(num);
                    $target.parents("td").next().html("¥"+(price*num).toFixed(2));
                    TotalPrice()
                } else {
                    $target.val(1);
                    $target.parents("td").next().html("¥"+(price*1).toFixed(2));
                    TotalPrice()
                }
            });
            //点击增加
            $addRight.click(function (e) {
                var $target = $(e.target);
                var price = parseInt($target.parents("td").prev().html().slice(1,-3));
                num = parseInt($target.prev().children().val());
                num++;
                $target.prev().children().val(num);
                $target.parents("td").next().html("¥"+(price*num).toFixed(2));
                TotalPrice();
            });
            //点击减少
            $subLeft.click(function (e) {
                var $target = $(e.target);
                var price = parseInt($target.parents("td").prev().html().slice(1,-3));
                if (num > 1) {
                    num--;
                    $target.next().children().val(num);
                    $target.parents("td").next().html("¥"+(price*num).toFixed(2));
                    TotalPrice()
                } else {
                    $target.next().children().val(1);
                    $target.parents("td").next().html("¥"+(price).toFixed(2));
                    TotalPrice()
                }
            });
            function TotalPrice() {
                var Arr = [];
                var ArrCount = [];
                $midinput.each((index,elem)=>{
                    ArrCount.push(parseInt($(elem).val()));
                });
                var COUNT = ArrCount.reduce((prev,next)=> prev+next);
                $(".total_all>span a").html(" "+COUNT+" ");
                $(".totalPrice").each((index,elem)=>{
                    Arr.push(parseInt($(elem).html().slice(1,-3)));
                })
                var result = Arr.reduce((prev,next)=> prev+next);
                $totalPrice.html("¥"+result.toFixed(2));
            }
            TotalPrice();
        })
    }
    onLoad();
})();

