"use strict";

var config = {
    "templateBucket" : "freighticket",
    "templateKey" : "freighticket-email-template.html",
    "targetAddress" : "ran.styr@gmail.com",
    "fromAddress": "Me <ran.styr@gmail.com>",
    "defaultSubject" : "Email From {{name}}"
}

module.exports = config;


