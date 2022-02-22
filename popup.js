document.getElementById("submit").addEventListener("click", async () => GenerateFileName())
document.getElementById("copy").addEventListener("click", async () => CopyFilename())

function GenerateFileName() {
    // The order of ids determines the order of the final string
    let ids = ["author", "attribution", "license", "prop_class", "data_class", "gov_class",
        "role", "doc_version", "date", "ext_gov", "doc_title"
    ];
    // The delimiter between each section of data
    let delimiter = "-";

    // Create the Filename string and add the input to it
    let final_string = "";
    let value = "";
    ids.forEach(item => {
        value = document.getElementById(item).value;
        if (value != +"") {
            final_string += value + delimiter;
        }
    });

    // Remove the trailing delimiter and replace spaces with underscores
    final_string = final_string.slice(0, -1).replaceAll(" ", "_");

    document.getElementById("result").innerHTML = final_string;
}

function CopyFilename() {
    // Copies output to clipboard
    navigator.clipboard.writeText(document.getElementById("result").innerHTML);
}