import React, { useEffect, useState } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import '../../styles/App.css';
import Table from "../Table";

const ContentGroup = ({uploadedFiles}) => {
    const [view, setView] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [uploadColumns, setUploadColumns] = useState([
        { name: "Id", isVisible: true },
        { name: "Дата загрузки", isVisible: true },
        { name: "ИНН", isVisible: true },
        { name: "Дата выгрузки отчета", isVisible: true }
    ])
    const [logColumns, setLogColumns] = useState([
        { name: "Название", isVisible: true },
        { name: "Дата загрузки", isVisible: true },
        { name: "Размер", isVisible: true },
        { name: "Удалить", isVisible: true }
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
            <div className='text-center mx-3 btngroup' style={{width: 800, minHeight: 600}}>
                    <div className="btn-group px-5" style={{width: 800}} role="group" aria-label="Basic outlined example">
                        <MyButton onClick={() => setView("view")}>Просмотр данных</MyButton>
                        <MyButton onClick={() => setView("log")}>История загрузки</MyButton>
                        <MyButton onClick={() => setView("faq")}>Информация</MyButton>
                    </div>


            {/* изменить структуру ниже Вынести за пределы. Сделать переиспользуемым модулем! */}
            <div className="table-responsive mx-3">
                {view === "view" &&
                    <>
                        <Table attributes={attributes} columns={uploadColumns} setColumns={setUploadColumns}/>
                    </>}

                {view === "log" && <>
                    <Table attributes={attributes} columns={logColumns} setColumns={setLogColumns}/>
                    {/*<table className="table text-left table-bordered mt-5">*/}
                    {/*    <thead>*/}
                    {/*        <tr>*/}
                    {/*            <th>Название</th>*/}
                    {/*            <th>Размер</th>*/}
                    {/*            <th>Удалить</th>*/}
                    {/*        </tr>*/}
                    {/*    </thead>*/}
                    {/*{uploadedFiles.map( e => (*/}
                    {/*        <tbody>*/}
                    {/*            <tr>*/}
                    {/*                <td>{e.name}</td>*/}
                    {/*                <td>{formatBytes(e.size)}</td>*/}
                    {/*                <td>Delete</td>*/}
                    {/*            </tr>*/}
                    {/*        </tbody>*/}
                    {/*))}*/}
                    {/*</table>*/}
                </>}

                {view === "faq" && (
                    <h1>faq</h1>
                )}
            </div>
        </div>
    );
}

export default ContentGroup;
