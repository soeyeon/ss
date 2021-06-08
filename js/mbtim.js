var W   =  515; //각 이미지의 넓이
var go  =   -1; //어느 방향으로 갈 것인지 저장.(-1 : 왼쪽방향 1 pixel 이동, +1 : 오른쪽 방향 1 pixel 이동)
var stop;       //스크롤을 중지하기 위한 setTimeout 의 id 값을 저장하기 위한 변수.
var ctnt=new Array( "<a href=# onclick='alert(1)'><img src=img/enfj.jpg></a>"
, "<a href=# onclick='alert(2)'><img src=img/enfp.jpg></a>"
, "<a href=# onclick='alert(3)'><img src=img/entj.jpg></a>"
, "<a href=# onclick='alert(4)'><img src=img/entp.jpg></a>"
, "<a href=# onclick='alert(5)'><img src=img/esfj.jpg></a>"
, "<a href=# onclick='alert(6)'><img src=img/esfp.jpg></a>"
, "<a href=# onclick='alert(7)'><img src=img/estj.jpg></a>"
, "<a href=# onclick='alert(8)'><img src=img/estp.jpg></a>"
, "<a href=# onclick='alert(9)'><img src=img/infj.jpg></a>"
, "<a href=# onclick='alert(10)'><img src=img/infp.jpg></a>"
, "<a href=# onclick='alert(11)'><img src=img/intj.jpg></a>"
, "<a href=# onclick='alert(12)'><img src=img/intp.jpg></a>"
, "<a href=# onclick='alert(13)'><img src=img/isfj.jpg></a>"
, "<a href=# onclick='alert(14)'><img src=img/isfp.jpg></a>"
, "<a href=# onclick='alert(15)'><img src=img/istj.jpg></a>"
, "<a href=# onclick='alert(16)'><img src=img/istp.jpg></a>");
var stop_time   = 1000;    // 하나의 아이템이 돌아가고 잠시 멈칫 하는 시간 (1초 = 1000)
var sspeed      =   10;    // 아이템이 움직이는 시간
function scroll(){
clearTimeout(stop); // 일시정지,재생
var isStop = false;
for(var i=0;i<ctnt.length;i++){
var temp=document.getElementById("slider_"+i);
var max = W*ctnt.length;
temp.style.left= (max+parseInt(temp.style.left)+go+W)%max-W;
if(go < 0 && parseInt(temp.style.left) == 0){
isStop = true;
}
else if(go > 0 && parseInt(temp.style.left) + parseInt(temp.firstChild.firstChild.width) == parseInt(temp.parentNode.style.width)){
isStop = true;
}
}
if(isStop){
stop=setTimeout("scroll()", stop_time);
}
else{
stop=setTimeout("scroll()", sspeed);
}
}
function stopImage(){
clearTimeout(stop);
}
function gogoXing(n){
stopImage();
go = n;
scroll();
}


// 왼쪽(n=-1) 오른쪽(n=1) 한칸씩 이동
function scrollMove(n){
for(var i=0;i<ctnt.length;i++){
var temp=document.getElementById("slider_"+i);
var max = W*ctnt.length;
if(n < 0){
temp.style.left= (max+parseInt(temp.style.left))%max-W;
}
else if(n > 0){
// alert((parseInt(temp.style.left))%max+W);
temp.style.left= W*ctnt.length == (parseInt(temp.style.left))%max+W ? 0 : (parseInt(temp.style.left))%max+W;
}
}
}