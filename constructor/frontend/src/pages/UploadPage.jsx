import React, { useState } from 'react';
import axios from 'axios';
import UploadPage_UploadBlock from '../components/UploadPage/UploadBlock.tsx';
import UploadPage_ButtonGroup from '../components/UploadPage/ButtonGroup.jsx';

function UploadPage() {
    const [filename, setFilename] = useState('')
    const [files, setFiles] = useState([])

    // async function postData() {
    //     console.log('Button clicked')
    //     let formData = new FormData();
    //     formData.append("filename", filename) // тут поле  "filename" - это название колонки , filename - берется из свойств файла

    //     await axios.post('http://127.0.0.1:8000/api/files/', formData, {
    //         headers: {
    //             "Content-Type": "multipart/form-data",
    //         }
    //     });
    // }

    async function getfiles() {
        axios.get('http://127.0.0.1:8000/api/files/').then(
            res => {
                console.log(res.data)
                setFiles(res.data)
            }).catch(e => {
                console.log(e)
            })
    }

    return (
        <div className="App">
            {/* Поле загрузки данных */}
            <div style={{display: "flex", height: "350px", justifyContent: "center"}}>
                <UploadPage_UploadBlock />
            </div>
            <UploadPage_ButtonGroup />

            {/* второй блок  */}
            {/* <div>
                <button className="btn btn-primary float-left" onClick={getfiles}>
                    Просмотр загруженных данных
                </button>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col">File id</th>
                            <th scope="col">Download</th>
                        </tr>
                    </thead>
                    <tbody>
                        {files.map((file) => {
                            return (
                                <tr key={Date.now()}>
                                    <td>{file.id}</td>
                                    <td>{file.filename}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div> */}
            {/* конец второго блока */}

        </div>
    );
}


export default UploadPage;
