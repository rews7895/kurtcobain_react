import React from 'react';
import {Helmet} from "react-helmet-async";
import HeaderContainer from "../../containers/common/HeaderContainer";
import FadeTemplate from "../../components/common/FadeTemplate";
import NoticeContainer from "../../containers/notice/NoticeContainer";

const NoticePage = () => {
    return (
        <FadeTemplate>
            <Helmet>
                <title>Kurt Cobain</title>
            </Helmet>
            <HeaderContainer/>
            <NoticeContainer/>
        </FadeTemplate>
    );
};

export default NoticePage;