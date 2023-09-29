import React, { useEffect, useState } from 'react';
import MyButton from '../UI/MyButton/MyButton';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import '../../styles/App.css';

const ButtonGroup = () => {

    const [open, setOPen] = useState(false);
    const [attributes, setAttributes] = useState([]);

    const toggle = () => {
        setOPen(!open);
    };

    async function getfiles() {
        axios.get('http://127.0.0.1:8000/api/attributes/').then(
            res => {
                console.log(res.data)
                setAttributes(res.data)

            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        console.log('useEFFECT')
        getfiles()
    }, [])

    return (
        <div className='container-bttns'>
            <div className='btns_group container text-center'>
                <div className="row">
                    {/* <p className="d-inline-flex gap-5"> */}
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <MyButton onClick={toggle}>Просмотр данных</MyButton>
                        <MyButton>История загрузки</MyButton>
                        <MyButton>Информация</MyButton>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                {
                    open && (
                        <table className="table text-left table-bordered mt-5">
                    {/* <thead> */}
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Дата загрузки</th>
                            <th scope="col">ИНН</th>
                            <th scope="col">Дата выгрузки отчета</th>
                        </tr>
                    {/* </thead> */}
                    <tbody>
                        {attributes.map((file) => {
                            return (
                                <tr key={Date.now()}>
                                    <td>{file.id}</td>
                                    <td>{file.created_date}</td>
                                    <td>{file.inn}</td>
                                    <td>{file.report_date}</td>
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
