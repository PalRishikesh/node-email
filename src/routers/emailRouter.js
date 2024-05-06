const { Router } = require("express")
const router = Router()
const { sendContactEmail,sendCareerEmail, saveSubscription, } = require("./../controllers/emailController")

const { contactFormValidationRules, careerFormValidationRules, saveSubscriptionValidationRules, isContactFormValidation } = require("./../helpers/validator")


router.post("/contact-email",contactFormValidationRules(),isContactFormValidation, sendContactEmail);
router.post("/career-email",careerFormValidationRules(),isContactFormValidation, sendCareerEmail);
router.post("/save-subscription",saveSubscriptionValidationRules(),isContactFormValidation, saveSubscription);

module.exports = router;