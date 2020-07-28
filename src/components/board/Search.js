import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        minWidth: '100%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    }
}));

const Search = ({user, onCreateClick, keyword, onSearchChangeField, onSearchClick, onSearchKeyPress}) => {
    const classes = useStyles();
    return (
        <Paper component="form" className={`${classes.root}`}>
            <InputBase
                className={classes.input}
                placeholder="검색어를 입력하세요."
                inputProps={{ 'aria-label': 'Search' }}
                value={keyword}
                onChange={onSearchChangeField}
                onKeyPress={onSearchKeyPress}
            />
            <IconButton className={classes.iconButton} aria-label="search" onClick={onSearchClick}>
                <SearchIcon />
            </IconButton>
            {user &&
            <>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton color="primary" className={classes.iconButton} aria-label="directions" onClick={onCreateClick}>
                    <CreateIcon />
                </IconButton>
            </>
            }
        </Paper>
    );
};

export default Search;