import React from 'react';
import {Helmet} from "react-helmet-async";
import HeaderContainer from "../../containers/common/HeaderContainer";
import FadeTemplate from "../../components/common/FadeTemplate";
import BoardCreateContainer from "../../containers/board/BoardCreateContainer";

const BoardCreatePage = () => {
    return (
        <FadeTemplate>
            <Helmet>
                <title>게시글 생성</title>
            </Helmet>
            <HeaderContainer/>
            <BoardCreateContainer/>
        </FadeTemplate>
    );
};

export default BoardCreatePage;