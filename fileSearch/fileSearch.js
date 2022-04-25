
document.getElementById("submit").addEventListener(
    "click", async () =>  search()) ;
    //"click", async () =>  getAccessToken().then(search).then(setResult));

        
async function search() {
    const API_KEY = await fetch("../credentials.json")
    .then(response => {
        return response.json();
    })
    .then(data => {
        apiKey = data.apiKey;
        return apiKey;
    });

    const ids = ["author", "attribution", "license", "propClass", "dataClass", "govClass",
    "role", "docVersion", "date", "extGov", "docTitle"];

    // create the q parameter
    let q = "";
    let first = true;

    ids.forEach(item => {
        value = document.getElementById(item).value;
        if (value != "" && first != true){
            q += ` and properties has {key='${item}' and value='${value}'}`;
        }
        else if (value != ""){
            q += `properties has {key='${item}' and value='${value}'}`;
            first = false;
        }
        
    });
    q = encodeURIComponent(q);

    chrome.identity.getAuthToken({interactive: true,scopes:["https://www.googleapis.com/auth/drive"]}, function(token) {
      const requestURL = `https://www.googleapis.com/drive/v3/files?q=${q}&key=${API_KEY}`;
      const requestHeaders = new Headers();
      requestHeaders.append('Authorization', 'Bearer ' + token);
      
      const driveRequest = new Request(requestURL, {
        method: "GET",
        headers: requestHeaders
      });
      return fetch(driveRequest).then((response) => {
        if (response.status === 200) {
          console.log(response)
          return response.json();
        } else {
          console.log(response.json());
          throw response.status;
        }
      })
      .then(setResult);
    });
  }

function setResult(data){

    const files = data.files;
    
    var result = "";
    files.forEach(file=> {
        result += `Name: ${file.name} ID: ${file.id}\n`
    });

    result = result.slice(0, -1)
    
    document.getElementById("result").innerHTML = result;
}
