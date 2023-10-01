import React from 'react';
import UploadBlock from '../components/UploadPage/UploadBlock.tsx';
import ButtonGroup from '../components/UploadPage/ButtonGroup.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';



function UploadPage() {

    return (
        <div className="App">
            <div className="container">
                <div className="row">
                    <div className="upload-block col-6 col-md-4">
                        <div >
                            <h4 className='h4-info-area'>Добавить файлы</h4>
                        </div>
                        {/* Поле загрузки данных */}
                        <div>
                            <UploadBlock />
                        </div>
                    </div>
                    <div className="btn-block col-12 col-md-8" >
                        <div>
                            <ButtonGroup />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default UploadPage;
