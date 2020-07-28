import React from 'react';
import FadeTemplate from "../../components/common/FadeTemplate";
import HeaderContainer from "../../containers/common/HeaderContainer";
import BoardViewContainer from "../../containers/board/BoardViewContainer";
import ReplyContainer from "../../containers/reply/ReplyContainer";

const BoardViewPage = () => {
    return (
        <FadeTemplate>
            <HeaderContainer/>
            <BoardViewContainer/>
            <ReplyContainer/>
        </FadeTemplate>
    );
};

export default BoardViewPage;