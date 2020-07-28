import React from 'react';
import ListForm from "./ListForm";
import Container from '@material-ui/core/Container';
import Paging from "./Paging";
import Search from "./Search";
import {makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';

const useStyles = makeStyles({
    marginTop: {
        marginTop: '1.3rem'
    },
    marginBottom: {
        marginBottom: '5rem'
    },
    alignCenter: {
        display: 'table',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const BoardForm = ({user, onCreateClick, boards, currentPage, totalPage, error, onPagingChange, keyword, onSearchClick, onSearchChange, onSearchKeyPress}) => {
    const classes = useStyles();
    const onSearchChangeField = e => {
        onSearchChange({key: 'keyword', value: e.target.value});
    };
    return (
        <Container maxWidth="lg">
            <div className={classes.marginTop}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Typography color="textPrimary">자유게시판</Typography>
                </Breadcrumbs>
            </div>
            <div className={classes.marginTop}>
                <ListForm boards={boards} error={error}/>
            </div>
            <div className={classes.marginTop}>
                <Paging
                    currentPage={currentPage}
                    totalPage={totalPage}
                    onPagingChange={onPagingChange}
                />
            </div>
            <div className={`${classes.marginTop} ${classes.marginBottom} ${classes.alignCenter}`}>
                <Search
                    user={user}
                    keyword={keyword}
                    onCreateClick={onCreateClick}
                    onSearchClick={onSearchClick}
                    onSearchChangeField={onSearchChangeField}
                    onSearchKeyPress={onSearchKeyPress}
                />
            </div>
        </Container>
    );
};

export default BoardForm;