import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Avatar from '@material-ui/core/Avatar';
import {STORAGE_BASE_URL} from "../../lib/oauth2/info";

import {Link, NavLink} from 'react-router-dom';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EmailIcon from '@material-ui/icons/Email';

const Header = ({user, onLogout, goRegister, goLogin}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');

    const anchor = "left";
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {user ? (
                    <>
                        <ListItem button>
                            <ListItemText primary={user.email}/>
                        </ListItem>
                        <ListItem button>
                            <ListItemIcon><Avatar alt="avatar" src={user.imageUrl} className={classes.floatLeft}/></ListItemIcon>
                            <ListItemText primary={user.name} />
                        </ListItem>
                        <ListItem button onClick={onLogout}>
                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                            <ListItemText primary={"로그아웃"} />
                        </ListItem>
                    </>
                ) : (
                    <>
                        <ListItem button onClick={goLogin}>
                            <ListItemIcon><PersonIcon/></ListItemIcon>
                            <ListItemText primary={"로그인"} />
                        </ListItem>
                        <ListItem button onClick={goRegister}>
                            <ListItemIcon><PersonAddIcon/></ListItemIcon>
                            <ListItemText primary={"회원가입"} />
                        </ListItem>
                    </>
                )}
            </List>
        </div>
    );

    return (
        <div className={classes.root}>
            <AppBar position="sticky" className={classes.backgroundWhite}>
                <Toolbar variant="dense" className={classes.toolbar}>
                    <div className={`${classes.main} ${!matches && classes.alignCenter}`}>
                        <Link to="/">
                            <img src={`${STORAGE_BASE_URL}/public/images/logo/main-logo.png`} width="126px" alt="logo"/>
                        </Link>
                    </div>
                    {user ? (
                        <div className={`${!matches ? classes.displayNone : classes.alignItem}`}>
                            <Avatar alt="avatar" src={user.imageUrl} className={classes.floatLeft}/>
                            <span className={`${classes.colorBlack} ${classes.marginRight}`}>{user.name}</span>
                            <span className={classes.link} onClick={onLogout}>로그아웃</span>
                        </div>
                    ) : (
                        <div className={`${!matches && classes.displayNone}`}>
                            <Link to="/register" className={`${classes.colorBlack} ${classes.marginRight}`}>회원가입</Link>
                            <Link to="/login" className={classes.colorBlack}>로그인</Link>
                        </div>
                    )}
                    {!matches && (
                        <>
                            <IconButton edge="start" className={`${classes.menuButton}`} color="inherit" aria-label="menu" onClick={toggleDrawer(anchor, true)}>
                                <MenuIcon/>
                            </IconButton>
                            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                                {list(anchor)}
                            </Drawer>
                        </>
                    )}
                </Toolbar>
                <Toolbar variant="dense" className={classes.backgroundBlack}>
                    <NavLink
                        className={classes.nav}
                        to="/board"
                        activeClassName={classes.active}
                    >
                        자유게시판
                    </NavLink>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    main: {
        flexGrow: 1
    },
    menuButton: {
        color: "black"
    },
    toolbar: {
        paddingTop: "1.2rem",
        paddingBottom: "0.3rem"
    },
    backgroundWhite: {
        backgroundColor: "white"
    },
    backgroundBlack: {
        backgroundColor: "#475569"
    },
    displayNone: {
        display: "none"
    },
    colorBlack: {
        color: "black"
    },
    nav: {
        fontSize: "0.9rem",
        width: "9rem",
        textAlign: "center"
    },
    link: {
        color: "black",
        cursor: "pointer"
    },
    floatLeft: {
        float: "left",
        marginRight: "8px"
    },
    alignItem: {
        alignItems: "center",
        display: "flex",
    },
    marginRight: {
        marginRight: "1rem"
    },
    alignCenter: {
        textAlign: "center"
    },
    active: {
        fontWeight: "bold"
    }
}));

export default Header;