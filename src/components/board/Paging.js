import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        '& ul': {
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            display: 'block'
        },
        '& li': {
            display: 'inline-block'
        },
    },
}));

const Paging = ({currentPage, totalPage, onPagingChange}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <div className={classes.root}>
            {matches ? (
                <Pagination count={totalPage} shape="rounded" siblingCount={1} page={currentPage} defaultPage={1} onChange={onPagingChange} showFirstButton showLastButton/>
            ) : (
                <Pagination count={totalPage} shape="rounded" siblingCount={1} page={currentPage} defaultPage={1} onChange={onPagingChange}/>
            )}

        </div>
    )
};

export default Paging;