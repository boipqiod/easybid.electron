import {FirebaseApp, initializeApp} from "firebase/app";
import {
    collection,
    getDoc,
    Firestore,
    getDocs,
    getFirestore,
    doc,
    setDoc,
    updateDoc,
    deleteField
} from "firebase/firestore";
import {BidItem} from "./tpye";

const firebaseConfig = {
    apiKey: "AIzaSyAu67MO1xqx8lEbIzCm-Fztm4lujFIj_Kw",
    authDomain: "easybid-2997c.firebaseapp.com",
    projectId: "easybid-2997c",
    storageBucket: "easybid-2997c.appspot.com",
    messagingSenderId: "539506945024",
    appId: "1:539506945024:web:9d0d5daa940b986d137ce5",
    measurementId: "G-Y68CC3HRGY"
};

export class FireStoreUtil {
    static instance: FireStoreUtil = new FireStoreUtil();
    private app?: FirebaseApp
    private db?: Firestore

    private constructor() {
        try {
            this.app = initializeApp(firebaseConfig);
            this.db = getFirestore(this.app)
        } catch (e) {
            console.log("error", e)
        }
    }


    //문서 데이터 저장
    setDoc = async (collectionName: string, docsName: string, data: object) => {
        this.checkApp()
        const docRef = doc(this.db!, collectionName, docsName);
        await setDoc(docRef, data);
    }

    //문서 데이터 가져오기
    getDocData = async (collectionName: string, docsName: string) => {
        this.checkApp()
        const docRef = doc(this.db!, collectionName, docsName);
        const docSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) return null;
        return docSnapshot.data();
    }

    //특정 필드 업데이트
    updateFields = async (collectionName: string, docsName: string, data: { [key: string]: any }) => {
        this.checkApp();
        const docRef = doc(this.db!, collectionName, docsName);

        await updateDoc(docRef, data);
    }

    //특정 필드 삭제
    deleteFields = async (collectionName: string, docsName: string, key: string) => {
        this.checkApp();
        const docRef = doc(this.db!, collectionName, docsName);
        const data: { [key: string]: any } = {};
        data[key] = deleteField();

        await updateDoc(docRef, data);
    }


    //문서 데이터 가져오기 (없으면 생성)
    ensureDocWithDefaults = async (collectionName: string, docsName: string) => {
        try {
            this.checkApp()
            const docRef = doc(this.db!, collectionName, docsName);
            const docSnapshot = await getDoc(docRef);

            // 문서가 존재하면 문서 데이터 반환
            if (docSnapshot.exists()) {
                const data = docSnapshot.data();
                console.log(data)
                return data?.data as BidItem[] ?? []
            }
            // 문서가 존재하지 않으면 기본값으로 문서 생성
            else {
                await setDoc(docRef, {data: []});
                return []
            }
        } catch (e) {
            return []
        }
    }

    private checkApp = () => {
        if (!this.app) {
            this.app = initializeApp(firebaseConfig);
            this.db = getFirestore(this.app)
        }
        if (!this.db) {
            this.db = getFirestore(this.app)
        }
    }

}

