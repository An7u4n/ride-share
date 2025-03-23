import { Storage } from "@google-cloud/storage";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const storage = new Storage();
const BUCKET_NAME = process.env.GCP_BUCKET!;

export const gcpService = {
    async uploadFileAsync(file: File): Promise<string>{
        const fileName = `${uuidv4()}${path.extname(file.name)}`;
        const bucket = storage.bucket(BUCKET_NAME);
        const fileSaved = bucket.file(fileName);
        const buffer = await file.arrayBuffer();
        try{
            await fileSaved.save(Buffer.from(buffer), {
              metadata: { contentType: file.type },
              public: true,
            });
        } catch (error) {
            console.error("Error during file upload:", error);
            throw error;
        }
        console.log("No");
        
        const fileUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${fileName}`;

        return fileUrl;
    }
}