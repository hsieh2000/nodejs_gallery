// 顯示目前是使用者
$(".User").html(`User: ${document.cookie.split("=").pop()}`);
console.log(document.cookie.split("=").pop());