import React, {useEffect, useState} from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import {STORAGE_BASE_URL} from "../../lib/oauth2/info";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        backgroundColor: "white"
    },
}));

const Rendering = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
        }, 800);
        return () => {
            clearTimeout(timer);
        };
    });
    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <img src={`${STORAGE_BASE_URL}/public/images/logo/loading.png`} width="80px" alt=""/>
            </Backdrop>
        </div>
    );
};

export default Rendering;