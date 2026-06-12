"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const uploadImage = (fileBuffer, filename) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary_1.v2.uploader.upload_stream({ resource_type: "image", public_id: filename }, (error, result) => {
            if (error)
                reject(error);
            else
                resolve(result?.secure_url ?? filename);
        });
        stream.end(fileBuffer);
    });
};
exports.uploadImage = uploadImage;
