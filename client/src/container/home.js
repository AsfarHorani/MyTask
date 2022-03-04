import React, { useEffect, useState } from 'react';
import { AppBar, CssBaseline, Typography } from '@material-ui/core';
import { AccessibilityNewSharp, Menu as MenuIcon } from "@material-ui/icons";
import { AccountCircle } from '@material-ui/icons';
import '../App.css';
import { useNavigate } from 'react-router-dom'
import Table from "../components/Tables/Transactiontable"
import axios from "axios"
import Input from '../components/UI/input';
import Button from "../components/UI/Buttons/Buttons"
const Home = (props) => {
    const navigate = useNavigate();
    const [trans, setTrans] = useState(null);
    const [amount, setAmount] = useState();
    const [accountType, setAccountType] = useState()
    const [type, setType] = useState();
    const [transType, setTransType] = useState();
    const token = localStorage.getItem('token');
    const accountId = localStorage.getItem('accId');    console.log(accountId)
    const headers = {
        'Authorization': 'Bearer' + token,

    };
    useEffect(() => {
        if (props.accId) {
            axios.get(`https://expensecalculator123.herokuapp.com/${accountId}`, { headers })
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        }
    }, [accountId, token])
    // const accId = req.params.accId;
    // const amount = req.body.amount;
    // const incomeType = req.body.incomeType;
    // const accountType = req.body.accountType
    const clickHandler = () => {
        const data = { amount, expenseType:type , incomeType: type, accountType: accountType }
        
    }

    return (<>

        <CssBaseline />
        <AppBar position='relative'>

            <div className="Header">
                <div >
                    <MenuIcon size="medium" />

                    <Typography varient="h4">
                        Expense Tracker App
                    </Typography>
                </div>
                <AccountCircle />
            </div>
        </AppBar>

        <main>
            <div className="Balance">
                <div className="cur-bal-con">
                    <h4>Current Balance</h4>
                    <div className='cur-bal'>
                        <h2>PKR: 10,0000</h2>
                    </div>
                </div>
            </div>
            <div className='input-data'>
                <Input
                    value={amount}
                    type="text"
                    placeholder="Amount"
                    onChange={(e) => setAmount(e.target.value)} />
                <select id="cars" name="cars" onChange={(e) => setTransType(e.target.value)}>
                    <option value="Empty" >Select type</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>

                </select>
                <select id="cars" name="cars" onChange={(e) => setAccountType(e.target.value)}>
                    <option value="Empty" >Select type</option>
                    <option value="bank">bank</option>
                    <option value="cash">cash</option>

                </select>
                <Input
                    value={type}
                    type="text"
                    placeholder="Expense/Income Form"
                    onChange={(e) => setType(e.target.value)} />

                <Button onClick={clickHandler} label="Add" />
            </div>
            <Table />
        </main>
    </>)
}

export default Home;