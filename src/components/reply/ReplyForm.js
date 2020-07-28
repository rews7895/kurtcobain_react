import React from 'react';
import Container from "@material-ui/core/Container";
import ReplyBoxForm from "./ReplyBoxForm";
import InputBoxForm from "./InputBoxForm";

const ReplyForm = ({board, user, replies, saveClick, replyContent, changeField,
                       updateTargetId, updateContent, createTargetId, createContent,
                       createTargetIdSetting, updateTargetIdSetting, updateAction, deleteAction}) => {
    return (
        <Container  maxWidth="md">
            {board ? (
                <>
                    {replies.map((reply) => (
                        <div key={reply.id}>
                            <ReplyBoxForm
                                reply={reply}
                                user={user}
                                changeField={changeField}
                                updateTargetId={updateTargetId}
                                updateContent={updateContent}
                                createTargetId={createTargetId}
                                createContent={createContent}
                                updateTargetIdSetting={updateTargetIdSetting}
                                createTargetIdSetting={createTargetIdSetting}
                                updateAction={updateAction}
                                deleteAction={deleteAction}
                                saveClick={saveClick}
                            />
                        </div>
                    ))}
                    {user && (
                        <InputBoxForm
                            replyContent={replyContent}
                            saveClick={saveClick}
                            changeField={changeField}
                        />
                    )}
                </>
            ) : (
                <div/>
            )}
        </Container>
    );
};

export default ReplyForm;