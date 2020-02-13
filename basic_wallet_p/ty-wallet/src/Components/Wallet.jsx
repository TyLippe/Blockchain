import React, { useState, useEffect } from 'react';
import axios from 'axios';

const base_url = 'http://localhost:5000'

const Wallet = () => {
    const [balance, setBalance] = useState(0)
    const [transaction, setTransaction] = useState([])

    useEffect(() => {
        axios
            .get(base_url + '/chain')
            .then(res => {
                setTransaction(res.data.chain);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    function increment() {
        setBalance(balance + 1)
    }

    return(
        <div>
            <h1 onClick={increment}>Balance: {balance}</h1>
            <h1>Transactions:</h1>
            {transaction.map(tran => {
                return(
                    <div>
                    <p>Index: {tran.index}</p>
                    {tran.transactions.map(action => {
                        return(
                            <div>
                             <p>Sender: {action.sender}</p>
                             <p>Recipient: {action.recipient}</p>
                            </div>
                        )
                    })}
                    </div>
                )
            })}
        </div>
    )
}

export default Wallet;