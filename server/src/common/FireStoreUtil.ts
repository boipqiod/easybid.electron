import {initializeApp} from "firebase/app";
import {collection, getDoc, Firestore, getDocs, getFirestore, doc, setDoc} from "firebase/firestore";

export class FireStoreUtil {
    static instance: FireStoreUtil = new FireStoreUtil();
    private readonly db: Firestore | undefined;

    private constructor() {
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
            this.db = getFirestore(app)
        } catch (e) {
            console.log("error", e)
        }
    }


    async getSingleDocData(collectionName: string, docId: string) {
        const docRef = doc(this.db!, collectionName, docId);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot.exists()) return null;
        return docSnapshot.data();
    }


    setDoc = async (collectionName: string, docsName: string, data: string) => {
        console.log("setDoc", collectionName, docsName, data)

        const docRef = doc(this.db!, collectionName, docsName);
        await setDoc(docRef, {data});
    }

    ensureDocWithDefaults = async (collectionName: string, docsName: string) => {
        const docRef = doc(this.db!, collectionName, docsName);
        const docSnapshot = await getDoc(docRef);

        // 문서가 존재하면 문서 데이터 반환
        if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            console.log("ensureDocWithDefaults", data)
            return data?.data as string;
        }
        // 문서가 존재하지 않으면 기본값으로 문서 생성
        else {
            await setDoc(docRef, {data: "[]"});
            return "[]"
        }
    }

    test = async () => {
        const querySnapshot = await getDocs(collection(this.db!, "test"))
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        })
    }

}

