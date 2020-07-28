import React, {useRef, useEffect} from 'react';
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module'
import {makeStyles} from "@material-ui/core/styles";
import {ACCESS_TOKEN, API_BASE_URL, STORAGE_BASE_URL} from "../../lib/oauth2/info";

const useStyles = makeStyles((theme) => ({
        editorHeight: {
            '& .ql-editor': {
                minHeight: '20rem'
            },
            '& img': {
                maxWidth: '100%'
            },
        }
    }
));
Quill.register('modules/imageResize', ImageResize);
const Editor = ({content, boardChangeField, errorFieldInitialize, contentError}) => {
    const classes = useStyles();
    const quillElement = useRef(null);
    const quillInstance = useRef(null);

    useEffect(() => {
        quillInstance.current = new Quill(quillElement.current, {
            theme: 'snow',
            placeholder: '내용을 작성하세요...',
            modules: {
                toolbar: {
                    container: [
                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                        [{ 'font': [] }],
                        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['image','video', 'link']
                    ],
                    handlers: {
                        'image': function() {
                            const input = document.createElement('input');
                            input.setAttribute('type', 'file');
                            input.setAttribute('accept', 'image/*');
                            input.click();
                            input.onchange = async function () {
                                const file = input.files[0];
                                const formData = new FormData();

                                formData.append('image', file);
                                await axios.post(`${API_BASE_URL}/api/file`, formData, {
                                    headers: {
                                        'Content-Type': 'multipart/form-data',
                                        Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
                                    }
                                }).then(response => {
                                    const range = this.quill.getSelection();
                                    const link = `${STORAGE_BASE_URL}${response.data.path}`;
                                    this.quill.insertEmbed(range.index, 'image', link);
                                    boardChangeField({key: 'content', value: quill.root.innerHTML});
                                });
                            }.bind(this);
                        }
                    }
                },
                imageResize: {
                    displaySize: true,
                    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
                }
            },
        });
        const quill = quillInstance.current;
        quill.on('text-change', (delta, oldDelta, source) => {
            if(source === 'user') {
                boardChangeField({key: 'content', value: quill.root.innerHTML});
            }
        });
    }, [boardChangeField]);

    useEffect(() => {
        quillInstance.current.on('text-change', (delta, oldDelta, source) => {
            if(source === 'user') {
                if(contentError) {
                    errorFieldInitialize({status: false, key: 'content', text: ''});
                }
            }
        });
    }, [contentError, errorFieldInitialize]);
    
    const mounted = useRef(false);
    useEffect(() => {
        // if(contentError) {
        //     errorFieldInitialize({status: false, key: 'content', text: ''});
        // }
        if(mounted.current) return;
        mounted.current = true;
        quillInstance.current.root.innerHTML = content;
    }, [content]);
    return (
        <div
            ref={quillElement}
            className={`${classes.marginTop} ${classes.editorHeight}`}
        />
    );
};

export default Editor;