// Add an authorize and logout button

document.getElementById("submit").addEventListener(
    "click", async () =>  getAccessToken().then(UploadFile));


function CheckFile(){
    let file = document.getElementById("file");
    console.log(file[0].type);
}

function GenerateFileName() {
    // The order of ids determines the order of the final string
    let ids = ["author", "attribution", "license", "propClass", "dataClass", "govClass",
        "role", "docVersion", "date", "extGov", "docTitle"
    ];
    // The delimiter between each section of data
    let delimiter = "-";

    // Create the Filename string and add the input to it
    let final_string = "";
    let value = "";
    ids.forEach(item => {
        value = document.getElementById(item).value;
        if (value != "") {
            final_string += value + delimiter;
        }
    });

    // Remove the trailing delimiter and replace spaces with underscores
    final_string = final_string.slice(0, -1).replaceAll(" ", "_");
    document.getElementById("result").innerHTML = final_string;

    return final_string;
    
}

/**
Upload a file with metadata to google docs
*/
function UploadFile(ACCESS_TOKEN) {
    let properties = {};
    let name = GenerateFileName();
    const ids = ["author", "attribution", "license", "propClass", "dataClass", "govClass",
    "role", "docVersion", "date", "extGov", "docTitle"];

    // Read the form to get the properties
    ids.forEach(item => {
        value = document.getElementById(item).value;
        if (value != "") {
            properties.item = value;
        }
    });

    const file = document.getElementById("file").files[0];


    console.log(typeof file);
    console.log(file.text());

    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (f) => {
    const fileMetadata = {
        name: name,
        //parents: this.currentDirectoryId ? [this.currentDirectoryId] : []  // This is from your script.
    }
    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(fileMetadata)], {type: 'application/json'}));
    form.append('file', new Blob([new Uint8Array(f.target.result)], {type: file.type}));
    fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
        method: 'POST',
        headers: new Headers({'Authorization': 'Bearer ' + ACCESS_TOKEN}),
        body: form
    }).then(res => res.json()).then(res => console.log(res));
    };
}