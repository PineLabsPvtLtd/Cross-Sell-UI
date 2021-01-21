const config = {
    backendURL: process.env.REACT_APP_BACKEND_URL,
    backendPrimaryKey: process.env.REACT_APP_BACKEND_PRIMARY_KEY,
    backendDetailsEndpoint: process.env.REACT_APP_BACKEND_DETAILS_ENDPOINT,
    backendOTPEndpoint: process.env.REACT_APP_BACKEND_OTP_ENDPOINT,
    backendSubmitEndpoint: process.env.REACT_APP_BACKEND_SUBMIT_ENDPOINT,
    backendFeedbackEndpoint: process.env.REACT_APP_BACKEND_FEEDBACK_ENDPOINT,
    jumboProdCode: process.env.REACT_APP_JUMBO_PRODUCT_CODE,
    instaProdCode: process.env.REACT_APP_INSTA_PRODUCT_CODE,
    enhancementProdCode: process.env.REACT_APP_ENHANCEMENT_PRODUCT_CODE,
    jumboTNCLink: process.env.REACT_APP_JUMBO_TNC_LINK,
    instaTNCLink: process.env.REACT_APP_INSTA_TNC_LINK,
};

module.exports = config;
