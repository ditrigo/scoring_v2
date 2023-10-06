import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MyButton from '../components/UI/MyButton/MyButton';
import axios from 'axios';

const ScoringPage = () => {
    const [attributes, setAttributes] = useState([]);

    async function getattributes() {
        axios.get('http://127.0.0.1:8000/api/attributes/').then(
            res => {
                console.log(res.data.data)
                setAttributes(res.data.data)
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        // console.log('useEFFECT')
        getattributes()
    }, [])

    function handleAddModel() {
        
    }

    return (
        <div className="App">
            <div className="container mt-5">
                    <div className="col-md-12">
                        <div className="card">
                            {/* Блок хедера таблицы */}
                            <div className="d-flex justify-content-between align-items-center px-5 py-3">
                                <h3>Скоринговые модели</h3>
                                <div>
                                    <MyButton onClick={() => handleAddModel()}>Добавить модель</MyButton>
                                </div>
                            </div>

                            {/* Блок данных в таблице. Сделать переиспользуемым модулем! */}
                            <div className="card-body">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th>id модели</th>
                                            <th>Наименование модели</th>
                                            <th>Автор</th>
                                            <th>Статус</th>
                                            <th>Дата изменения</th>
                                            <th>Редактировать</th>
                                            <th>Удалить</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {attributes.map((attribute, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{attribute.id}</td>
                                                    <td>{attribute.created_date}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default ScoringPage;
