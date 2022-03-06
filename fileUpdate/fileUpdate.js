
document.getElementById("submit").addEventListener(
    "click", async () =>  getAccessToken().then(updateDoc));

async function updateDoc(accessToken) {
    const API_KEY = await fetch("../credentials.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        apiKey = data.apiKey;
        return apiKey;
    });
    const url =  document.getElementById("file_id").value;
    fileID = url.slice(url.indexOf("/d/")+3,url.indexOf("/edit"));
    console.log(fileID)
    const ids = ["author", "attribution", "license", "propClass", "dataClass", "govClass",
    "role", "docVersion", "date", "extGov", "docTitle"];

    // create the properties json
    let properties = {};
    ids.forEach(item => {
      value = document.getElementById(item).value;;
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
      console.log(res);
      console.log(res.json())
    })
  }
