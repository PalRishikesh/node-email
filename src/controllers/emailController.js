
var admin = require("firebase-admin");
require("dotenv").config();
var serviceAccount = require("./../config/admin.json");

// console.log("serviceAccount: ",serviceAccount);
// const firebaseConfig = {
//   apiKey: "AIzaSyCW8JYy_heuvCWoQ8O9GTK5HzWw8BdyoQY",
//   authDomain: "gmapandroid-153521.firebaseapp.com",
//   databaseURL: "https://gmapandroid-153521-default-rtdb.firebaseio.com",
//   projectId: "gmapandroid-153521",
//   storageBucket: "gmapandroid-153521.appspot.com",
//   messagingSenderId: "204133375941",
//   appId: "1:204133375941:web:a062cfecd30784f83035ac"
// };

let firebaseConfig = {
  type: `${process.env.FIREBASE_TYPE}`,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL,
  universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN,
}
console.log("a: ",firebaseConfig);

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: process.env.FIREBASE_DATABASE_URL
});

const MailHelper = require("../helpers/mailHelper");

const db=admin.database();
const userRef=db.ref("users");

const sendContactEmail = async (req, res) => {
  try {
    console.log(req.body);
    const mailResponse = await MailHelper.sendFormEmail(req.body, true);
    if (mailResponse) {
      return res.json({
        status: 1,
        message: "Form Submited Succesfully.",
      });
    }
    return res.json({
      status: 0,
      message: "Please try again afer some time.",
      errors: [],
    });
  } catch (error) {
    return res.status(422).json({
      status: 0,
      message: "Something went wrong.",
      errors: extractedErrors,
    });
  }
};


const sendCareerEmail = async (req, res) => {
    try {
      console.log(req.body);
      const mailResponse = await MailHelper.sendFormEmail(req.body, false);
      if (mailResponse) {
        return res.json({
          status: 1,
          message: "Form Submited Succesfully.",
        });
      }
      return res.json({
        status: 0,
        message: "Please try again afer some time.",
        errors: [],
      });
    } catch (error) {
      return res.status(422).json({
        status: 0,
        message: "Something went wrong.",
        errors: extractedErrors,
      });
    }
  };


  const checkEmailisPresent = (email) => {
    return new Promise((resolve, reject) => {
        userRef.on('value', (snapshot) => {
            snapshot.forEach((dinoSnapshot) => {
                if (snapshot.val()[dinoSnapshot.key].email == email) {
                    resolve(true); // Email found, resolve the promise with true
                }
            });
            resolve(false); // Email not found, resolve the promise with false
        });
    });
};


const pushAndSet = (userRef, userObject) => {
  return new Promise((resolve, reject) => {
      userRef.push().set(userObject, (error) => {
          if (error) {
              reject(0); // Reject the promise if there's an error
          } else {
              resolve(1); // Resolve the promise if the operation is successful
          }
      });
  });
};


const saveSubscription = async(req, res)=>{
  try {
    const emailId = req.body.email;
    const isEmailExist = await checkEmailisPresent(emailId)
    if(isEmailExist){
      return res.json({
        status: 0,
        message: `${emailId} email is is already exists.`,
        errors: [],
      });
    }
    const userObject = {
      name:req.body.name,
      email: req.body.email
    }
    const setSet =  await pushAndSet(userRef, userObject)
    if(setSet){
      return res.json({
        status: 1,
        message: "Subscription saved successfully.",
      });
    }
    return res.json({
      status: 0,
      message: "Please try again afer some time.",
      errors: [],
    });
  } catch (error) {
    console.log(error);
    return res.status(422).json({
      status: 0,
      message: "Something went wrong."
    });
  }
}
module.exports = {
  sendContactEmail,
  sendCareerEmail,
  saveSubscription
};
