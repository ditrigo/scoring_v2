import React from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MyButton from '../components/UI/MyButton/MyButton';

const ScoringPage = () => {
    return (
        <div className="App">
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            {/* Блок хедера таблицы */}
                            <div className="row card-header">
                                <div className='card-header-name col-8'>
                                    <h4 className='card-header-name'>
                                        Скоринговые модели
                                    </h4>
                                </div>
                                <div className='col-4'>
                                    <MyButton>Добавить модель</MyButton>
                                </div>
                            </div>

                            {/* Блок данных в таблице. Сделать переиспользуемым модулем! */}
                            <div className="card-body">
                                <table className='table table-striped'>
                                    <thead>
                                        <tr>
                                            <th scope="col">id модели</th>
                                            <th scope="col">Наименование модели</th>
                                            <th>Автор</th>
                                            <th>Статус</th>
                                            <th>Дата изменения</th>
                                            <th>Редактировать</th>
                                            <th>Удалить</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                    </tbody>
                                </table>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScoringPage;
