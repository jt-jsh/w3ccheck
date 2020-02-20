const DocParser = (file, no) => {
    let header = "<html><head><meta charset='utf-8'></head><body>";
    let footer = "</body></html>";

    let sourceHTML = header+''+footer;









    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");

    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'hi098123file.'+file;
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

export default DocParser;