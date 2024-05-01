const nodemailer = require("nodemailer");
require("dotenv").config();

// const emailName = process.env.EMAIL_FROM_NAME;
// const emailAddress = process.env.EMAIL_FROM_ADDRESS;
// const emailAuthUser = process.env.EMAIL_AUTH_USER;
// const emailPassword = process.env.EMAIL_AUTH_PASSWORD;

const transporter = nodemailer.createTransport({
  // service: process.env.SMTP_OPTION_SERVICE ?? "",
  host: process.env.SMTP_OPTION_HOST ?? "",
  port: process.env.SMTP_OPTION_PORT ?? "",
  secure: process.env.SMTP_OPTION_SECURE ?? "",
  auth: {
    user: process.env.EMAIL_AUTH_USER ?? "",
    pass: process.env.EMAIL_AUTH_PASSWORD ?? "",
  },
});



// Sending email from this function
const sendEmail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email send sucessfully...");
    return true;
  } catch (error) {
    console.error("Email Error: ", error);
    return false;
  }
};

// Creating contact form page details with option and message
const createContactFormMailOption = async (requestBody) => {
  const mailOptionContactForm = {
    from: {
      name: process.env.EMAIL_FROM_NAME ?? "",
      address: process.env.EMAIL_FROM_ADDRESS ?? "",
    },
    to: [process.env.EMAIL_TO_ADDRESS],
    subject: `Contact Form Lead | ${requestBody.industry} | ${requestBody.name} `,
    text: `Hi, there is message from Website, Name: ${requestBody.name}, Email: ${requestBody.email}, Contact No. ${requestBody.contact}, Industry: ${requestBody.industry}, Message: ${requestBody.message} `,
    html: `
    <p>Hi, <br> Here is new lead from ${requestBody.name}</p>
    <table>
        <tr>
            <td>Name: </td>
            <td>${requestBody.name} </td>
        </tr>
        <tr>
            <td>Email: </td>
            <td> ${requestBody.email}</td>
        </tr>
        <tr>
            <td>Contact No. : </td>
            <td> ${requestBody.contact} </td>
        </tr>
        <tr>
            <td>Indutry: </td>
            <td>  ${requestBody.industry} </td>
        </tr>
        <tr>
            <td>Message: </td>
            <td>  ${requestBody.message} </td>
        </tr>
    </table>
    `,
  };

  return mailOptionContactForm;
};

// Creating career form page details with option and message
const createCareerFormMailOption = async (requestBody) => {
  const mailOptionContactForm = {
    from: {
      name: process.env.EMAIL_FROM_NAME ?? "",
      address: process.env.EMAIL_FROM_ADDRESS ?? "",
    },
    to: [process.env.EMAIL_TO_ADDRESS],
    subject: `Career Page  | ${requestBody.name} `,
    text: `Hi, Here is new message from career, Name: ${requestBody.name}, Email: ${requestBody.email}, Contact No. ${requestBody.contact}, Message: ${requestBody.message} `,
    html: `
    <p>Hi, <br> Here is new message from career page by ${requestBody.name}</p>
    <table>
        <tr>
            <td>Name: </td>
            <td>${requestBody.name} </td>
        </tr>
        <tr>
            <td>Email: </td>
            <td> ${requestBody.email}</td>
        </tr>
        <tr>
            <td>Contact No. : </td>
            <td> ${requestBody.contact} </td>
        </tr>
        <tr>
            <td>Message: </td>
            <td>  ${requestBody.message} </td>
        </tr>
    </table>
    `,
  };

  return mailOptionContactForm;
};

// Creating commong function for reply to email
const commonFormReplyMailOption = async (requestBody) => {
  const mailOption = {
    from: {
      name: process.env.EMAIL_FROM_NAME ?? "",
      address: process.env.EMAIL_FROM_ADDRESS ?? "",
    },
    to: [`${requestBody.email}`],
    subject: `Reply Form ${process.env.EMAIL_FROM_NAME}`,
    text: `Hi ${requestBody.name}, Thank you fro connecting with us. We will try to connect to you as soon as possible. `,
    html: `
    <p>Hi ${requestBody.name},</p>
    <p>Thank you fro connecting with us. We will try to connect to you as soon as possible.</p>
    `,
  };

  return mailOption;
};

// Sending contact mail otion
const sendFormEmail = async (requestBody, isContactForm = true) => {
  let returnMailResponse = 0; 
  
  // Chekcing is contact us form or not
  if (isContactForm) {
    const mailOtions = await createContactFormMailOption(requestBody);
    returnMailResponse = await sendEmail(transporter, mailOtions);
  } else {
    const mailOtions = await createCareerFormMailOption(requestBody);
    returnMailResponse = await sendEmail(transporter, mailOtions);
  }

  // Sending common reply email 
  if (process.env.EMAIL_REPLY_TO) {
    const mailOtions = await commonFormReplyMailOption(requestBody);
    returnMailResponse = await sendEmail(transporter, mailOtions);
  }

  return returnMailResponse;
};

// const sendCareerFormEmail = async (requestBody, isContactForm = true) => {
//   if (isContactForm) {
//     const mailOtions = await createCareerFormMailOption(requestBody);
//     const mailResult = await sendEmail(transporter, mailOtions);
//     if (process.env.EMAIL_REPLY_TO) {
//       const mailOtions = await createContactFormReplyMailOption(requestBody);
//       const mailResult = await sendEmail(transporter, mailOtions);
//     }
//     return mailResult;
//   }
// };

module.exports = {
  sendFormEmail
};
