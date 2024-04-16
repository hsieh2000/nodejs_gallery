// arr 矩陣用於儲存頁面 <img> 元素
let arr = [];

// 將縮圖遍歷新增至 arr 中
$(".Thumbnail").each((index, element) => {
    console.log(index, element);
    arr.push(element);
});

// 放大與切換圖片程式碼
function change_page(img) {
    // 先清除原本的 <img>
    $("#carousel-pic").remove();
    // 計算圖片比例
    let pic_ratio = $(img).outerHeight()/$(img).outerWidth();
    // 如果 寬比高長
    if(pic_ratio < 1) {
        carousel_width = window.innerWidth*0.8;
        carousel_height = $(img).outerHeight() * carousel_width / $(img).outerWidth();
    } else {
        carousel_height = window.innerHeight*0.9;
        carousel_width = $(img).outerWidth() * carousel_height / $(img).outerHeight();
    }

    // 設定放大圖 <img>
    let large_image = `<img id="carousel-pic" src=${decodeURI($(img).attr("src"))}></img>`;
    // 新增放大圖至 .pic_area
    $(".pic_area").append(large_image);
    // 設定放大圖的尺寸、位置
    $("#carousel-pic").height(carousel_height).width(carousel_width).css({
        top: (window.innerHeight - carousel_height)/2,
        left: (window.innerWidth - carousel_width)/2,

    });

    // 設定換頁功能，上一頁與下一頁元素位置，設定完後顯示元素
    $("#prev").height(carousel_height).width(carousel_width/2).css({
        top: (window.innerHeight - carousel_height)/2,
        left: (window.innerWidth - carousel_width)/2,
    }).show();
    $("#next").height(carousel_height).width(carousel_width/2).css({
        top: (window.innerHeight - carousel_height)/2,
        left: (window.innerWidth - carousel_width)/2 + carousel_width/2,
    }).show();  
    // 顯示遮罩
    $("#fade").css({height: $(document).height()}).show();
}

$(document).ready(function() {

    // 紀錄當前圖片在 arr 中的 index，預設值為 0
    let img_index = 0;
    // img_target 為換頁目標圖片元素
    let img_target;
    // go 為決定下一頁或是前一頁的參數
    let go;

    // 點擊縮圖時，處發放大效果
    $(".Thumbnail").click(function(element) {
        img_index = arr.indexOf(element.currentTarget);
        console.log(img_index);
        change_page(this);
    });
    // 點擊 .go_page 元素（#prev, #next）執行圖片切換功能
    $(".go_page").on("click", function() {
        if($(this).attr("id") === "prev") {
            go = -1;
        } else if($(this).attr("id") === "next"){
            go = 1;
        }
        // 這裡不知道為啥不能用之前的 arr 或是 jquery 的方式選取 .Thumbnail 元素陣列，只能用原生方式取得
        let queryThumbnail = document.querySelectorAll(".Thumbnail");
        img_target = queryThumbnail[img_index + go];
        // 如果 img_index + go 超出 索引範圍，回歸第一張圖（就是下一張到底的時候會回到第一張）
        if(!Boolean(img_target)) {
            if(img_index>0) {
                img_index = 0;
                img_target = queryThumbnail[img_index];
            } else {
                img_index = queryThumbnail.length -1;
                img_target = queryThumbnail[img_index];
            }

        }

        change_page(img_target);
        // 更新 img_index 
        img_index += go;

    });

    // 點擊遮著關閉放大
    $("#fade").on("click", function() {
        $(this).hide();    
        $("#carousel-pic").hide();
        $("#prev").hide();
        $("#next").hide();
    });
    
});