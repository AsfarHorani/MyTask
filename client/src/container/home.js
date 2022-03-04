import React, { useEffect ,useState} from 'react';
import { AppBar, CssBaseline, Toolbar, Typography, Container, Card, CardContent } from '@material-ui/core';
import { Menu as MenuIcon } from "@material-ui/icons";
import { AccountCircle } from '@material-ui/icons';
import '../App.css';
import { useNavigate } from 'react-router-dom'
import Table from "../components/Tables/Transactiontable"
import axios from "axios"
const Home = (props) => {
    const navigate = useNavigate();
    const [trans,setTrans] = useState(null);
    
    useEffect(()=>{
    if(!props.isAuth){
        navigate("/login")
    }
    },[])
    console.log(props.accId)
    useEffect(() => {
        axios.get(`http://localhost:5000/get-transactions/${props.accId}`)
            .then(res => {
                console.log(res)
            })
    },[trans])



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
            <Table />
        </main>
    </>)
}

export default Home;