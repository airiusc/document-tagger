document.getElementById("upload_doc").addEventListener("click", async () => LoadUploadWindow())
document.getElementById("search").addEventListener("click", async () => LoadSearchWindow())
document.getElementById("update_doc").addEventListener("click", async () => LoadUpdateWindow())

function LoadUploadWindow(){
    chrome.tabs.create({ url: "upload/upload.html" });
}

function LoadSearchWindow(){
  chrome.tabs.create({ url: "fileSearch/fileSearch.html" });
}

function LoadUpdateWindow(){
  chrome.tabs.create({ url: "fileUpdate/fileUpdate.html" });
}
