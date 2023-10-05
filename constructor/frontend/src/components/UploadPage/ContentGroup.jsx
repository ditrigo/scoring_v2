import React, { useEffect, useState } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import '../../styles/App.css';
import Table from "../Table";

const ContentGroup = ({uploadedFiles}) => {
    const [view, setView] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [columns, setColumns] = useState([
        { name: "Id", isVisible: true },
        { name: "Дата загрузки", isVisible: true },
        { name: "ИНН", isVisible: true },
        { name: "Дата выгрузки отчета", isVisible: true }
    ])

    async function getfiles() {
        axios.get('http://127.0.0.1:8000/api/attributes/').then(
            res => {
                console.log(res.data.data)
                setAttributes(res.data.data)

            }).catch(e => {
            console.log(e)
        })
    }

    function formatBytes(bytes, decimals = 2) {
        if (!+bytes) return '0 Bytes'

        const k = 1024
        const dm = decimals < 0 ? 0 : decimals
        const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

        const i = Math.floor(Math.log(bytes) / Math.log(k))

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
    }

    useEffect(() => {
        // console.log('useEFFECT')
        getfiles()
    }, [])

    return (
            <div className='text-center mx-3' >
                <div className="btngroup" style={{width: 800, minHeight: 600}}>
                    <div className="btn-group px-5" style={{width: 800}} role="group" aria-label="Basic outlined example">
                        <MyButton onClick={() => setView("view")}>Просмотр данных</MyButton>
                        <MyButton onClick={() => setView("log")}>История загрузки</MyButton>
                        <MyButton onClick={() => setView("faq")}>Информация</MyButton>
                    </div>
                </div>


            {/* изменить структуру ниже Вынести за пределы. Сделать переиспользуемым модулем! */}
            <div className="table-responsive">
                {view === "view" &&
                    <>
                        <Table attributes={attributes} columns={columns} setColumns={setColumns}/>
                    </>}

                {view === "log" && <>
                    <h1>log</h1>
                    <table className="table text-left table-bordered mt-5">
                        <thead>
                            <th>Название</th>
                            <th>Размер</th>
                            <th>Удалить</th>
                        </thead>
                    {uploadedFiles.map( e => (
                            <tbody>
                                <tr>
                                    <td>{e.name}</td>
                                    <td>{formatBytes(e.size)}</td>
                                </tr>
                            </tbody>
                    ))}
                    </table>
                </>}

                {view === "faq" && (
                    <h1>faq</h1>
                )}
            </div>
        </div>
    );
}

export default ContentGroup;
