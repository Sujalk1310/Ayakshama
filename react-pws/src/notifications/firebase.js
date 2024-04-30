import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';
import axios from 'axios';

const firebaseConfig = {
    apiKey: "AIzaSyDF2ggxTlHs9jOZng2CTG7ZbdB23OfgchU",
    authDomain: "test-e3771.firebaseapp.com",
    projectId: "test-e3771",
    storageBucket: "test-e3771.appspot.com",
    messagingSenderId: "305329559705",
    appId: "1:305329559705:web:b3e216d28390f1d0098008",
    measurementId: "G-XL32TW8KCP"
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

const sendKey = (key) => {
    const resp = axios.post("http://localhost:8080/", {"key": key})
    console.log(resp);
}

export const generateToken = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
        const token = await getToken(messaging, {
            vapidKey: "BAAfh76gPORESHqfLAOisNJc1bfJT2uxnZG_A0mkGjOmpWgidWZB-t9MbDm-fkUraVnYqmEp0zpqsSHtTxotAD0"
        });
        console.log(token);
    }
}