document.getElementById("submit").addEventListener(
    "click", async () =>  GetToken());

/**
 * Get the authorization token for the user.
 */
function GetToken() {
  chrome.identity.getAuthToken({interactive: true,scopes:["https://www.googleapis.com/auth/drive"]}, function(token) {
      UpdateDoc(token);
  })     
}

async function UpdateDoc(accessToken) {
    const API_KEY = await fetch("../credentials.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        apiKey = data.apiKey;
        return apiKey;
    });
    const url =  document.getElementById("file_id").value;
    fileID = url.slice(url.indexOf("/d/") + 3, url.indexOf("/edit"));
    console.log(fileID)
    const ids = ["author", "attribution", "license", "propClass", "dataClass", "govClass",
    "role", "docVersion", "date", "extGov", "docTitle"];

    // create the properties json
    let properties = {};
    ids.forEach(item => {
      console.log(item);
      value = document.getElementById(item).value;
      if (value != ""){
        properties[item] = value;
      }
    });
    console.log(properties);
    const fileMetadata = {"properties":properties};
    console.log(JSON.stringify(fileMetadata));

    fetch(`https://www.googleapis.com/drive/v3/files/${fileID}?key=${API_KEY}`, {
        method: 'PATCH',
        headers: new Headers({'Authorization': 'Bearer ' + accessToken, "Accept": "application/json",
          "Content-Type": "application/json"}),
        body: JSON.stringify(fileMetadata)
    })
    .then(res => {
      const airius_id = '../icons/placeholder.png';
      if (res.status==200){
        chrome.notifications.create('UpdateSuccess', {
          type: 'basic',
          iconUrl: airius_id,
          title: 'Update Successful',
          message: "Your document's metadata was updated",
          priority: 2
        });
      }
      else {
        chrome.notifications.create('UpdateFailure', {
          type: 'basic',
          iconUrl: airius_id,
          title: 'Your Document Failed to Update',
          message: `${res.status}: ${res.statusText}`,
          priority: 2
        });
      }
    })
  }
