const MailHelper = require("../helpers/mailHelper");



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
module.exports = {
  sendContactEmail,
  sendCareerEmail
};
