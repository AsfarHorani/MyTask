import React from 'react';
import { AppBar, CssBaseline, Toolbar, Typography, Container, Card, CardContent } from '@material-ui/core';
import { Menu as MenuIcon } from "@material-ui/icons";
import { AccountCircle } from '@material-ui/icons';
import '../App.css';
const Home = (props) => {

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
     
        </main>
    </>)
}

export default Home;