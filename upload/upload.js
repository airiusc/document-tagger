// Add an authorize and logout button

document.getElementById("submit").addEventListener(
    "click", async () =>  GetToken());


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

    return final_string;
    
}

/**
 * Get the authorization token for the user.
 */
function GetToken() {
    chrome.identity.getAuthToken({interactive: true,scopes:["https://www.googleapis.com/auth/drive"]}, function(token) {
        UploadFile(token);
    })     
}


/**
Upload a file with metadata to google docs
*/
function UploadFile(token){
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

    const file = document.getElementById("choose-file").files[0];

    
    const fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = (f) => {
        const fileMetadata = {
            name: name,
        }

        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(fileMetadata)], {type: 'application/json'}));
        form.append('file', new Blob([new Uint8Array(f.target.result)], {type: file.type}));

        
        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({'Authorization': 'Bearer ' + token}),
            body: form
        }).then(res => res.json()).then(res => {
            console.log(res);

            // Replace the placeholder image with the Airius logo            
            const airius_id = '../icons/placeholder.png';
            if (res.id !== null){
                chrome.notifications.create('UploadSuccess', {
                    type: 'basic',
                    iconUrl: airius_id,
                    title: 'Upload Successful!',
                    message: 'Log into your Google Drive to access the document',
                    priority: 2
                });
            }
            else {
                chrome.notifications.create('UploadFailure', {
                    type: 'basic',
                    iconUrl: airius_id,
                    title: 'Your Document Failed to Upload',
                    message: `${res.status}: ${res.statusText}`,
                    priority: 2
                });
            }
        });
    };
}