// Firebase initialization — shared by the public portfolio site (read-only)
// and the admin panel (admin.html, read/write). Loaded as an ES module.
//
// This config is not a secret: it only identifies which Firebase project to
// talk to. Actual access control lives in Firestore's security rules
// (console → Firestore Database → Rules), which restrict writes to the
// admin's Google account email only.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCm0OomqQ8-vkKrBfF-lI29OhNbaL-R3VQ",
  authDomain: "ductm-portfolio.firebaseapp.com",
  projectId: "ductm-portfolio",
  storageBucket: "ductm-portfolio.firebasestorage.app",
  messagingSenderId: "543607130887",
  appId: "1:543607130887:web:6ee2cfc5388bac2c1d93a2"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Only this Google account is allowed to write to Firestore (also enforced
// server-side by the security rules — this constant just lets the admin UI
// show a friendly "not authorized" message instead of a raw permission error).
export const ADMIN_EMAIL = "ducdesign.tm@gmail.com";

// Cloudinary — free image hosting for project photos uploaded via the admin
// panel. Unsigned upload preset: safe to expose in client-side code, it can
// only be used to upload (not to delete or manage the account).
export const CLOUDINARY_CLOUD_NAME = "uu9xrudr";
export const CLOUDINARY_UPLOAD_PRESET = "xtffumqj";

export async function uploadToCloudinary(file){
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
  const form = new FormData();
  form.append('file', file);
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  const res = await fetch(url, { method: 'POST', body: form });
  if(!res.ok) throw new Error('Cloudinary upload failed: ' + res.status);
  const data = await res.json();
  return data.secure_url;
}
