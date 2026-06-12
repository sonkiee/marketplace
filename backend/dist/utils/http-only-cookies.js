"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookie = void 0;
require("dotenv/config");
const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV === "production";
const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    domain: isProduction ? ".dappertech.org" : undefined,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
exports.cookie = {
    set: (res, token) => {
        res.cookie("access_token", token, options);
    },
    clear: (res) => {
        res.clearCookie("access_token", options);
    },
};
