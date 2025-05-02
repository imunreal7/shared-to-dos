import admin from "firebase-admin";
import fs from "fs";

const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS!;

if (!serviceAccountPath) {
    throw new Error("❌ GOOGLE_APPLICATION_CREDENTIALS is not defined");
}

export function initFirebase() {
    if (!admin.apps.length) {
        const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf-8"));

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });

        console.log("✅ Firebase Admin initialized");
    }
}

