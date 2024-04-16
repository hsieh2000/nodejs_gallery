// 檔案上傳alert
const mediaForm = $("#upload");
const fileInput = $('#media');
fileInput.on("change", (event)=>{
    console.log(event.target.files.length);
    if (event.target.files.length === 1) {
        alert(`Choose ${event.target.files.length} file`);
    } else {
        alert(`Choose ${event.target.files.length} files`);
    }
});


