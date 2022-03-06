# Airius Webextension

This webplugin serves as a frontend for Airius services. 

## Try it out yourself
This repository hosts all necessary files, but has an incomplete credentials.json. You will need to provide your own client ID and api key to it.

To test the plugin, first open firefox. Type about:debugging into the search bar, then click the This Firefox menu option. Click Load Temporary add-on, then select your manifest.json file. 

The first time the app authenticates with the google api you should get an uri_redirect error. Copy the url link that the redirect is coming from. Open your google project for this plugin, then edit the Client ID you've created. Add the copied url to the list of Authorized redirect URIs.

## Getting a client ID and api key
1. Create a project in the Developer Consoler.
2. Go to the API & Services tab
3. In API & Services click OAuth consent screen and fill out the form
4. In API & Services click Credentials. Use create credentials to make an API key and Client ID
5. Add the Client ID and API key to credentials.json




