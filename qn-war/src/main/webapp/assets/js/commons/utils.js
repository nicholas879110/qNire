/**
 * 获取资源类型对应的图标
 * @param d 资源对象
 * @returns {string}
 */
function getResourceIcon(d) {
    var icon = "";
    switch (d.srcFileType) {
        case 1 :
//            icon = "fa-file-word-o";
            icon = "docx.png";
            break;
        case 2 :
//            icon = "fa-file-excel-o";
            icon = "xls.gif";
            break;
        case 3 :
//            icon = "fa-file-powerpoint-o";
            icon = "ppt.gif";
            break;
        case 4 :
//            icon = "fa-file-text";
            icon = "file.ico";
            break;
        case 5 :
//            icon = "fa-file";
            icon = "swf.gif"
            break;
        case 6 :
//            icon = "fa-file-audio-o";
            icon = "mp3.gif";
            break;
        case 7 :
            icon = "mp4.gif";
//            break;
        case 8 :
//            icon = "fa-file-video-o";
            icon = "flv.gif";
            break;
        case 9 :
//            icon = "fa-file-pdf-o";
            icon = "pdf.gif";
            break;
        default :
//            icon = "fa-file";
            icon = "file.ico";
    }
    return getContentPath() + "/assets/css/img/" + icon;
}