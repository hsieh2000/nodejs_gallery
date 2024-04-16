let checkCookie = document.cookie;
// 在每秒檢查一次Cookie是否有變化
setInterval(function() {
    var currentCookie = document.cookie;

    // 檢查當前Cookie是否與上一次記錄的Cookie不同
    if (currentCookie !== checkCookie) {
        // Cookie已經發生變化，執行相應的操作
        // 更新記錄的Cookie
        checkCookie = currentCookie;
        location.pathname="/login/";
        
    }
}, 1000); // 1000毫秒 = 1秒