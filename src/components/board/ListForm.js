import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Moment from "react-moment";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 350
    },
    th: {
        fontWeight: "bold"
    },
    highlight: {
        '&:hover': { backgroundColor: "rgba(224, 224, 224, 1)" }
    },
    displayNone: {
        display: "none"
    },
    id: {
        minWidth: "2rem",
        width: '10%'
    },
    title: {
        width: '55%'
    },
    writer: {
        minWidth: "3rem",
        width: '10%'
    },
    hit: {
        minWidth: "3rem",
        width: '10%'
    },
    date: {
        minWidth: "5rem",
        width: '15%'
    }
}));

const ListForm = ({boards, error}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={`${classes.th} ${classes.id}`}>번호</TableCell>
                            <TableCell className={`${classes.th} ${classes.title}`}>제목</TableCell>
                            <TableCell className={`${classes.th} ${!matches && classes.displayNone} ${classes.writer}`} align="right">작성자</TableCell>
                            <TableCell className={`${classes.th} ${classes.hit}`} align="right">조회수</TableCell>
                            <TableCell className={`${classes.th} ${!matches && classes.displayNone} ${classes.date}`} align="right">작성일</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boards ? (
                            <>
                                {boards.length > 0 ? (
                                    <>
                                        {boards.map((board) => (
                                            <TableRow key={board.id} className={classes.highlight}>
                                                <TableCell component="th" scope="row" className={`${classes.id}`}>
                                                    {typeof board.id === 'number' ? board.id.toLocaleString('en-US') : board.id}
                                                </TableCell>
                                                <TableCell className={`${classes.title}`}>
                                                    <Link to={`/board/${board.id}`}>{board.title}</Link>
                                                </TableCell>
                                                <TableCell align="right" className={`${!matches && classes.displayNone} ${classes.writer}`}>{board.userName}</TableCell>
                                                <TableCell align="right" className={`${classes.hit}`}>
                                                    {typeof board.hit === 'number' ? board.hit.toLocaleString('en-US') : board.hit}
                                                </TableCell>
                                                <TableCell align="right" className={`${!matches && classes.displayNone} ${classes.date}`}>
                                                    <Moment format="YYYY-MM-DD HH:mm:ss">{board.createdDate}</Moment>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </>
                                ) : (
                                    <>
                                        <TableRow key="">
                                            <TableCell align="center" colSpan="5">
                                                게시글이 존재하지 않습니다.
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </>
                        ) : (<>{error}</>)}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListForm;