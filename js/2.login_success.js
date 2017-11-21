/**
 * Created by web-01 on 2016/10/23.
 */
window.onload = function(){
    (()=>{
        let $samp=$(".succ_right samp");
        let num = parseInt($samp.html());
        console.log(sessionStorage.getItem("uname"))
        if(sessionStorage.getItem("uname")!=null){
            var timer = setInterval(()=>{
                $samp.html(num);
                num--;
                if(num <= 0){
                    location.replace("1.index.html");
                    clearInterval(timer);
                }
            },1000);
            //console.log(timer);
        }
    })();
};
