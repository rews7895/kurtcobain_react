import React from 'react';
import {Helmet} from "react-helmet-async";
import HeaderContainer from "../../containers/common/HeaderContainer";
import FadeTemplate from "../../components/common/FadeTemplate";
import BoardContainer from "../../containers/board/BoardContainer";

const BoardPage = () => {
    return (
        <FadeTemplate>
            <Helmet>
                <title>자유게시판</title>
            </Helmet>
            <HeaderContainer/>
            <BoardContainer/>
        </FadeTemplate>
    );
};

export default BoardPage;