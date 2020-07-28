import client from "./client";
import {ACCESS_TOKEN} from "../oauth2/info";

export const replySave = ({boardId, content, originId, toUserId}) =>
    client.post('/api/reply', {boardId, content, originId, toUserId}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }).then(response => ({ response }))
        .catch(error => ({ error }));

export const replyList = ({boardId}) => {
    return client.get(`/api/reply/${boardId}`);
};

export const replyUpdate = ({boardId, id, content}) =>
    client.patch(`/api/reply/${id}`, {boardId, content}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }).then(response => ({ response }))
        .catch(error => ({ error }));

export const replyDelete = ({id}) => client.delete(`/api/reply/${id}`, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
}).then(response => ({ response }))
    .catch(error => ({ error }));