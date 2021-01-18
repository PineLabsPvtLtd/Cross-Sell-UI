const config = {
    backendURL: process.env.REACT_APP_BACKEND_URL,
    backendDetailsEndpoint: process.env.REACT_APP_BACKEND_DETAILS_ENDPOINT,
    backendOTPEndpoint: process.env.REACT_APP_BACKEND_OTP_ENDPOINT,
    backendSubmitEndpoint: process.env.REACT_APP_BACKEND_SUBMIT_ENDPOINT,
    backendFeedbackEndpoint: process.env.REACT_APP_BACKEND_FEEDBACK_ENDPOINT,
    jumboTNCLink: process.env.REACT_APP_JUMBO_TNC_LINK,
    instaTNCLink: process.env.REACT_APP_INSTA_TNC_LINK,
};

module.exports = config;
