import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/fireback-config";
import { useGetUserInfo } from "./useGetUserInfo";

export const useGetTransactions =  () =>{

    const [transactions, setTransactions] = useState([]);
    const [transactionsTotals, setTransactionTotals] = useState({balance: 0.0, income : 0.0, expenses : 0.0});

    const ref = collection(db, "Transactions")
    const {userID} = useGetUserInfo();

    const getTransaction = async() => {
        let unsub;
        try {
            const q = query(ref,
                where("userID" , "==" , userID), orderBy("createdAt"));


                unsub = onSnapshot(q, (snapshot) =>{
                    let docs = [];
                    let totalIncome = 0;
                    let totalExpense = 0;

                    snapshot.forEach((doc) => {
                        const data = doc.data();
                        const id = doc.id;
                            docs.push({...data, id});
                        console.log(data.transactionType)
                        if(data.transType === "expense"){
                            totalExpense += Number(data.transAmount);
                        }
                        else{
                            totalIncome += Number(data.transAmount);
                        }
                    });
                    setTransactions(docs);
                    let balance = totalIncome - totalExpense;
                    setTransactionTotals({
                        balance,
                        expenses : totalExpense,
                        income : totalIncome
                    });
                });


        } catch (erro) {
            console.error(erro);
        }
        return () => unsub();
    };

    useEffect(() => {
        getTransaction();
    }, [] )

    return{transactions,transactionsTotals}
}
    