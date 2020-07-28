import React from 'react';
import {Helmet} from "react-helmet-async";
import HeaderContainer from "../../containers/common/HeaderContainer";
import FadeTemplate from "../../components/common/FadeTemplate";
import BoardUpdateContainer from "../../containers/board/BoardUpdateContainer";


const BoardUpdatePage = () => {
    return (
        <FadeTemplate>
            <Helmet>
                <title>게시글 수정</title>
            </Helmet>
            <HeaderContainer/>
            <BoardUpdateContainer/>
        </FadeTemplate>
    );
};

export default BoardUpdatePage;