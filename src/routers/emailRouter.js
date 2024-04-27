const { Router } = require("express")
const router = Router()
const { sendContactEmail,sendCareerEmail } = require("./../controllers/emailController")

const { contactFormValidationRules, careerFormValidationRules, isContactFormValidation } = require("./../helpers/validator")


router.post("/contact-email",contactFormValidationRules(),isContactFormValidation, sendContactEmail);
router.post("/career-email",careerFormValidationRules(),isContactFormValidation, sendCareerEmail);

module.exports = router;