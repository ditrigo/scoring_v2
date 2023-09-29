import React, { useEffect, useState } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

const ButtonGroup = () => {

    const [open, setOPen] = useState(false);
    const [files, setFiles] = useState([])

    const toggle = () => {
        setOPen(!open);
    };

    async function getfiles() {
        axios.get('http://127.0.0.1:8000/api/files/').then(
            res => {
                // console.log(res.data)
                setFiles(res.data)
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        console.log('useEFFECT')
        getfiles()
    }, [])

    return (
        <div>
            <div className='btns__group container text-center'>
                <div className="row">
                    {/* <p className="d-inline-flex gap-5"> */}
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <MyButton onClick={toggle}>Просмотр данных</MyButton>
                        <MyButton>Логирование</MyButton>
                        <MyButton>FAQ</MyButton>
                    </div>
                </div>

            </div>
            <div className="table-responsive">
                {
                    open && (
                        <table className="table text-left table-bordered mt-5">
                    {/* <thead> */}
                        <tr>
                            <th scope="col">File id</th>
                            <th scope="col">Download</th>
                        </tr>
                    {/* </thead> */}
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
                    )
                }
            </div>
        </div>

    );
}

export default ButtonGroup;
