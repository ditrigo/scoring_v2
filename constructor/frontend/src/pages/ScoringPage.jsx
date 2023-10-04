import React, { useEffect, useState } from 'react';
import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MyButton from '../components/UI/MyButton/MyButton';
import MyInput from '../components/UI/MyInput/MyInput';
import axios from 'axios';
import ModelForm from '../components/ScoringPage/ModelForm/ModelForm';

const ScoringPage = () => {
    const [attributes, setAttributes] = useState([]);
    const [title, setTitle] = useState('')

    async function getattributes() {
        axios.get('http://127.0.0.1:8000/api/scoring_model/').then(
            res => {
                console.log(res.data.data)
                setAttributes(res.data.data)
            }).catch(e => {
                console.log(e)
            })
    }

    useEffect(() => {
        getattributes()
    }, [])

    const addNewModel = (e) => {
        e.preventDefault()
        console.log(title)
        const newModel = {
            
        }
    }

    return (
        <div>
            <form>
                <MyInput
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    type='text'
                    placeholder='Название модели' />
                <MyInput
                    type='text'
                    placeholder='Описание модели' />
                <MyButton onClick={addNewModel}>Создать пост</MyButton>
            </form>
        </div>


        // TODO Потом после реализации модалки расскомментировать. Вынести в модуль! ScoringList
        // <div className="container mt-5">
        //     <div className="row">
        //         <div className="col-md-12">
        //             <div className="card">
        //                 <div className="card-header">
        //                     <h4>
        //                         Скоринговые модели
        //                         <button
        //                             onClick={addNewModel}
        //                             className='btn btn-outline-primary float-end'>
        //                             Добавить модель
        //                         </button>
        //                     </h4>
        //                 </div>

        //                 {/* Блок данных в таблице. Сделать переиспользуемым модулем! */}
        //                 <div className="card-body">
        //                     <table className='table table-striped'>
        //                         <thead>
        //                             <tr>
        //                                 <th scope="col">id модели</th>
        //                                 <th scope="col">Наименование модели</th>
        //                                 <th>Автор</th>
        //                                 <th>Статус</th>
        //                                 <th>Дата изменения</th>
        //                                 <th>Редактировать</th>
        //                                 <th>Удалить</th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             {attributes.map((attribute, index) => {
        //                                 return (
        //                                     <tr key={index}>
        //                                         <td>{attribute.id}</td>
        //                                         <td>{attribute.model_name}</td>
        //                                         <td>{attribute.author_id}</td>
        //                                         <td>{attribute.status}</td>
        //                                         <td>{attribute.created_date}</td>
        //                                         <td>
        //                                             <MyButton>Редактировать</MyButton>
        //                                         </td>
        //                                         <td>
        //                                             <button className="btn btn-outline-danger">Удалить</button>
        //                                         </td>
        //                                     </tr>
        //                                 )
        //                             })}
        //                         </tbody>
        //                     </table>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>

    );
}

export default ScoringPage;
