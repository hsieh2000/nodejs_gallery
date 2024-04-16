// 設定元素位置
$(".container").height(window.innerHeight);

$(".msg").width(window.innerWidth).css({
    position: "absolute",
    top:($(".container").outerHeight() - $(".loader").outerHeight())/2 - 36,
    left: 0,
});

$(".loader").css({
    position: "absolute",
    top: ($(".container").outerHeight() - $(".loader").outerHeight())/2,
    left: ($(".container").outerWidth() - $(".loader").outerWidth())/2,
});

$("#timeBox").css({
    position: "absolute",
    top: ($(".container").outerHeight() - $("#timeBox").outerHeight())/2,
    left: ($(".container").outerWidth() - $("#timeBox").outerWidth())/2,
});

// 設定秒數
var count = 3;
function countDown(){
    // 將秒數寫在指定元素中
    $("#timeBox").html(`<span class="align-text-top">${count}</span>`) ;
    // 每次執行就減1
    count -= 1;
    // 當 count = 0 時跳轉頁面
    if (count == 0) {
        if ($(".msg").text() == "Login Success") {
            location.pathname="/1222/";
        } else{
            location.pathname="/login/";
        }
        
    } 
    // 設定每秒執行1次
    setTimeout("countDown()",1000);
}
// 執行 countDown
countDown();

