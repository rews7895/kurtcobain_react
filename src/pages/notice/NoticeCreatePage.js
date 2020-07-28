import React from 'react';
import {Helmet} from "react-helmet-async";
import HeaderContainer from "../../containers/common/HeaderContainer";
import FadeTemplate from "../../components/common/FadeTemplate";

const NoticeCreatePage = () => {
    return (
        <FadeTemplate>
            <Helmet>
                <title>공지 생성</title>
            </Helmet>
            <HeaderContainer/>
        </FadeTemplate>
    );
};

export default NoticeCreatePage;