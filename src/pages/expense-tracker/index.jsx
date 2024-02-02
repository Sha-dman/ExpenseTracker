import { useState} from 'react';
import{useAddTrans} from '../../hooks/useAddTrans'
import { useGetTransactions } from '../../hooks/useGetTransactions';
import {name, profphoto, useGetUserInfo} from '../../hooks/useGetUserInfo';
import './styles.css'
import { signOut } from 'firebase/auth';
import { auth } from '../../config/fireback-config';
import { useNavigate } from 'react-router-dom';

export const ExpenseTracker = () => {
    const {addTrans} = useAddTrans();

    const [desc ,setDesc] = useState("");
    const [transAmount, setAmount] = useState(0); 
    const [transType, setType] = useState("expense"); 
    const {transactions,transactionsTotals} = useGetTransactions();
    const {name, profphoto} = useGetUserInfo();
    const navigate = useNavigate();

    const{balance,income, expenses} = transactionsTotals;

    const onSubmit = (e) => {
        e.preventDefault();
        addTrans({
            desc, 
            transAmount,
            transType

        });
        setDesc("");
        setAmount("")
    };
    const signUserOut = async() =>{
       try{ 
        await signOut(auth);
        localStorage.clear();
        navigate("/")
       }
       catch(e){
        console.error(e);
       }
    }
    return (
        <>
            <h1 className='title'>{name}'s Expense Tracker!</h1>

    <div className="expenseTracker">
        <div className='container'>
            <div className="balance">
                <h3>Your Balance
            {balance >= 0 ? (
                <h2>${balance}</h2> ):
                (
                    <h2>-${balance * -1}</h2>

                )
            } 
            </h3>
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                        <p>${income}</p>
                </div>
                <div className='expense'>
                    <h4>Expense</h4>
                    <p>${expenses}</p>
                </div>
            </div>
            <form className="addTrans" onSubmit={onSubmit}>
                <input type="text" placeholder="Description" 
                value={desc}
                required 
                onChange={(e) => setDesc(e.target.value)}/>
                <input type="number" placeholder="Amount" 
                value={transAmount}
                required
                onChange={(e) => setAmount(e.target.value)}/>
                <input type="radio"
                id="expense"
                value="expense"
                checked ={transType === "expense"}
                onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="expense">Spent</label>

                <input type="radio" 
                id="income" 
                value="income" 
                checked ={transType === "income"}

                onChange={(e) => setType(e.target.value)}/>
                <label htmlFor="income">Earned</label>
                <button type="submit" className='submit-btn'>Add Transaction</button>

            </form>

        </div>
        <div className='profile'>
        {profphoto && <img className='photo' src={profphoto}/>}
        <button className='signOut' onClick={signUserOut }>Sign Out</button>
        </div>
        </div>
            <div className='container-transTab'>
        <div className="transTab">
            <h3>Transactions</h3>
            <ul>
                {transactions.map((transaction) =>{
                    const {desc, transAmount, transType} = transaction;
                    return(
                        <li>
                            <h4>{desc}</h4>
                            <p>${transAmount}  :-: <label style={{
                                color: transType === "expense" ? "red" : "green", fontWeight: 'bold'
                                }}> {transType}</label></p>
                        </li>
                    );
                })}
            </ul>
        </div>
        </div>

    </>

    );
};