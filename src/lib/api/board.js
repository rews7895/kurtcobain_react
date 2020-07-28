import client from "./client";
// qs : 쿼리 파싱에 쓰임 ex) ?aaa=eee&bbb=www
import qs from 'qs';
import {ACCESS_TOKEN} from "../oauth2/info";

// 게시글 작성
export const boardCreate = ({title, content, tags}) =>
    client.post('/api/board', {title, content, tags}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }).then(response => ({ response }))
        .catch(error => ({ error }));

// 게시글 상세
export const boardView = id => client.get(`/api/board/${id}`);

// wysiwyg 이미지 업로드(multipart/form-data이므로 수동처리)

// 게시글 리스트
export const listBoards = ({page, keyword}) => {
    const query = qs.stringify({
       page,
       keyword
    });
    return client.get(`/api/board?${query}`)
};

// 게시글 업데이트
export const boardUpdate = ({updateId, title, content}) =>
    client.patch(`/api/board/${updateId}`, {title, content}, {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
        }
    }).then(response => ({ response }))
        .catch(error => ({ error }));

// 게시글 삭제
export const boardDelete = id => client.delete(`/api/board/${id}`, {
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
    }
});

