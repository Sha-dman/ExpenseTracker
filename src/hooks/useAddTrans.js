import {addDoc, collection, serverTimestamp} from 'firebase/firestore'
import { db } from '../config/fireback-config';
import { useGetUserInfo } from './useGetUserInfo';
export const useAddTrans = () => {
    const transCollectionsRef = collection(db , "Transactions");
    const {userID} = useGetUserInfo();
    const addTrans = async ({
        desc, transAmount, transType,
    }) => {
        await addDoc(transCollectionsRef,{
            userID,
            desc,
            transAmount,
            transType,
            createdAt:serverTimestamp()
        }); 
    };
    return {addTrans};
};
