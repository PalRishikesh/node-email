## Setup Google Cloud Function
- Clone the project/repo and run 'npm i '  
    ```sh
    npm i
    ```
- Set up billing plan as "Blaze plan"
- Install the global dependecy in local system (nodeJS should be already installed in system)
    ```sh
    npm install -g firebase-tools
    ```
- Login firebase with command
    ```sh
    firebase login
    ```
- Intialize firebase 
    ```sh
    firebase init
    ```
- We will also be prompted to select a project that we want to link to this directory. Since we’ve already created one, we can select Use an existing project and then select our new project.
- Make Changes in firebase.json file
    ```sh
    {
    "functions": [{
      "source": "."
        }
    ]
    }
    ```
    - Put (.) inside source key as we are putting parent folder on cloud function.
- Make Changes in index.js or main file, instead of default app listen, we have to exports.api (any end route name you can put) of firebase function
    ```sh
    const functions = require("firebase-functions")
    -
    -
    -
    exports.api = functions.https.onRequest(app);
    ```
- Done some changes, added deploy key in package.json file of script object with function that should be deploy 
    ```sh
    "deploy":"firebase deploy --only functions:api"
    ```
- Create .env file copy from .env.example and put the credentials
    ```sh
    .env
    ```
- Push the code on cloud function
    ```sh
    npm run deploy
    ```
- After sucessfull deploy it will return the url 
-
![alt text]("gcf1.png)
