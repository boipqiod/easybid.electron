import { initializeApp } from "firebase/app";
import {collection, getDocs, getFirestore, Firestore } from "firebase/firestore";

export class FirebaseService{
    static instance: FirebaseService = new FirebaseService();
    private readonly db: Firestore | undefined;

    private constructor(){
        const firebaseConfig = {
            apiKey: "AIzaSyAu67MO1xqx8lEbIzCm-Fztm4lujFIj_Kw",
            authDomain: "easybid-2997c.firebaseapp.com",
            projectId: "easybid-2997c",
            storageBucket: "easybid-2997c.appspot.com",
            messagingSenderId: "539506945024",
            appId: "1:539506945024:web:9d0d5daa940b986d137ce5",
            measurementId: "G-Y68CC3HRGY"
        };
        try {
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            this.db = db

        }
        catch (e) {
            console.log("error", e)
        }
    }

    test = async () => {
        const querySnapshot = await getDocs(collection(this.db!, "test"))
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        })
    }

}