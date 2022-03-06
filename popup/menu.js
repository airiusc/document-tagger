document.getElementById("upload_doc").addEventListener("click", async () => LoadUploadWindow())
document.getElementById("search").addEventListener("click", async () => LoadSearchWindow())
document.getElementById("update_doc").addEventListener("click", async () => LoadUpdateWindow())

function LoadUploadWindow(){
    var popupURL = browser.extension.getURL("upload/upload.html");

    var creating = browser.windows.create({
        url: popupURL,
        type: "popup",
        height: 600,
        width: 600
    });
    creating.then(onCreated, onError);
}

function LoadSearchWindow(){
  var popupURL = browser.extension.getURL("fileSearch/fileSearch.html");

  var creating = browser.windows.create({
      url: popupURL,
      type: "normal",
      height: 600,
      width: 600
  });
  creating.then(onCreated, onError);
}

function LoadUpdateWindow(){
  var popupURL = browser.extension.getURL("fileUpdate/fileUpdate.html");

  var creating = browser.windows.create({
      url: popupURL,
      type: "normal",
      height: 600,
      width: 600
  });
  creating.then(onCreated, onError);
}

function onCreated(windowInfo) {
    console.log(`Created window: ${windowInfo.id}`);
  }
  
  function onError(error) {
    console.log(`Error: ${error}`);
  }