/** Exported getAccessToken 
 * Call this function before any function that needs access to gapi
*/

// const REDIRECT_URL = chrome.identity.getRedirectURL();
// const CLIENT_ID = await fetch("../credentials.json")
//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         clientId = data.clientID;
//         return clientId;
//     });
// const SCOPES = ["https://www.googleapis.com/auth/drive"];
// const AUTH_URL =
// `https://accounts.google.com/o/oauth2/auth\
// ?client_id=${CLIENT_ID}\
// &response_type=token\
// &redirect_uri=${encodeURIComponent(REDIRECT_URL)}\
// &scope=${encodeURIComponent(SCOPES.join(' '))}`;
// const VALIDATION_BASE_URL="https://www.googleapis.com/oauth2/v3/tokeninfo";

// function extractAccessToken(redirectUri) {
//   let m = redirectUri.match(/[#?](.*)/);
//   if (!m || m.length < 1)
//     return null;
//   let params = new URLSearchParams(m[1].split("#")[0]);
//   return params.get("access_token");
// }

// /**
// Validate the token contained in redirectURL.
// This follows essentially the process here:
// https://developers.google.com/identity/protocols/OAuth2UserAgent#tokeninfo-validation
// - make a GET request to the validation URL, including the access token
// - if the response is 200, and contains an "aud" property, and that property
// matches the clientID, then the response is valid
// - otherwise it is not valids
// */
// function validate(redirectURL) {
//   const accessToken = extractAccessToken(redirectURL);
//   if (!accessToken) {
//     throw "Authorization failure";
//   }
//   const validationURL = `${VALIDATION_BASE_URL}?access_token=${accessToken}`;
//   const validationRequest = new Request(validationURL, {
//     method: "GET"
//   });

//   function checkResponse(response) {
//     return new Promise((resolve, reject) => {
//       if (response.status != 200) {
//         reject("Token validation error");
//       }
//       response.json().then((json) => {
//         if (json.aud && (json.aud === CLIENT_ID)) {
//           resolve(accessToken);
//         } else {
//           reject("Token validation error");
//         }
//       });
//     });
//   }

//   return fetch(validationRequest).then(checkResponse);
// }

// /**
// Authenticate and authorize using browser.identity.launchWebAuthFlow().
// If successful, this resolves with a redirectURL string that contains
// an access token.
// */
// function authorize() {
//   return browser.identity.launchWebAuthFlow({
//     interactive: true,
//     url: AUTH_URL
//   });
// }

async function getAccessToken() {
  // chrome.identity.getAuthToken({interactive: true,scopes:["https://www.googleapis.com/auth/drive"]}, function(token) {
  //   console.log(token);
  //   console.log(typeOf(token));
  //   return token
  // });
  const token = await chrome.identity.getAuthToken({interactive: true,scopes:["https://www.googleapis.com/auth/drive"]}, function(token) {
      console.log(token);
      return token
    });
  console.log(token)
  return token
}
