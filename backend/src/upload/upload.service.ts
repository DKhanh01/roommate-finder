import { Injectable } from "@nestjs/common";
import cloudinary from "./config/cloudinary.config";

@Injectable()
export class UploadService {

    async uploadImage(file: Express.Multer.File): Promise<string> {
        console.log(file);
        return new Promise((resolve, reject) => {
            cloudinary.uploader
            .upload_stream({}, (error, result) => {
                if (error || !result) {
                    return reject(error || new Error("Upload failed"));
                }

                resolve(result.secure_url);
            })
            .end(file.buffer);
        });
    }

}
