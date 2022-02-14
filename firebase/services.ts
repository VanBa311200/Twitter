import { db, storage } from './firebaseClient';
import {
  addDoc,
  setDoc,
  collection,
  serverTimestamp,
  doc,
  query,
  where,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { uid } from 'uid';
import { UserCredential } from 'firebase/auth';

export const addDocument = async (collect: any, data: any) => {
  try {
    const query = await addDoc(collection(db, collect), data);

    return query;
  } catch (error) {
    console.log(error);
  }
};

export const setDocument = async (
  collectionName: string,
  uid: string,
  data: any
) => {
  try {
    const query = await setDoc(doc(db, collectionName, uid), data);
    return query;
  } catch (error) {
    console.log(error);
  }
};

// query with addition
export const queryAddition = async (
  collectionName: string,
  keywords: string,
  operator: any,
  value: any
) => {
  const q = query(
    collection(db, collectionName),
    where(keywords, operator, value)
  );
  const docSnap = await getDocs(q);
  return docSnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// create newUser
export const createNewUser = async (userCredential: UserCredential) => {
  const data = {
    email: userCredential.user.email,
    name: userCredential.user.displayName,
    photoURL: userCredential.user.photoURL,
    tag: `@${userCredential.user.displayName
      ?.split(' ')
      .join('')
      .toLowerCase()}`,
    uid: userCredential.user.uid,
    providerId: userCredential.user.providerId,
    createAt: serverTimestamp(),
  };
  return await setDocument(`users`, userCredential.user.uid, data).catch(
    (error) => console.log(error.code)
  );
};

// get all document
export const getAllDocument = async (nameCollection: string) => {
  const querySnapshot = await getDocs(collection(db, nameCollection));
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
};

// get single Doc
export const getDocument = async (path: string) => {
  const docRef = doc(db, path);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { ...docSnap.data() };
  } else {
    console.log(`Can't get data from [${path}]`);
    return false;
  }
};

// upload single file image storage
export const uploadSingleImage = async (path: string, file: any) => {
  const imageRef = ref(storage, path + `${uid(25)}`);
  await uploadString(imageRef, file, 'data_url');
  const downloadURL = await getDownloadURL(imageRef);
  console.log('Single Upload: ', downloadURL);
  return downloadURL;
};

// upload multil images to storage
export const uploadMultilImages = async (files: any, path: string) => {
  const listImageDownload: Array<String> | null = await Promise.all(
    files.map(async (e: String) => {
      const result = await uploadSingleImage(path, e);
      return result;
    })
  );

  return listImageDownload;
};

// tao keywords cho displayName, su dung cho search
export const generateKeywords = (displayName: string) => {
  // liet ke tat cac hoan vi. vd: name = ["David", "Van", "Teo"]
  // => ["David", "Van", "Teo"], ["David", "Teo", "Van"], ["Teo", "David", "Van"],...
  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray: Array<any> = [];
  let result: Array<any> = [];
  let stringArray: Array<any> = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name: any) => {
    const arrName: Array<any> = [];
    let curName = '';
    name.split('').forEach((letter: string) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k: number) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i] as boolean) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};
