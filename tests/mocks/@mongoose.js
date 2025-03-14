// @mongoose.js
const mongoose = require('mongoose');

// Optionally override some Mongoose methods
mongoose.connect = async (uri, options) => {
    console.log(`Intercepted connection to MongoDB at ${uri}`);
    // Call the original connect method
    return "";
};

// You can add mock logic or additional helpers here if needed
module.exports = mongoose;