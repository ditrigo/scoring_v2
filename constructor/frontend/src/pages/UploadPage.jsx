import React, {useEffect, useState} from 'react';
import ContentGroup from '../components/UploadPage/ContentGroup.jsx';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/App.css';
import UploadBlock from "../components/UploadPage/UploadBlock";

function UploadPage() {
    const [uploadedFiles, setUploadedFiles] = useState([{name: 123}])

    const uploadHandler = (item) => {
        setUploadedFiles([...uploadedFiles, item])
    }

    return (
        <div className="UploadPage">
                <div className="d-flex justify-content-center flex-row">
                    <div className="upload-block mx-3 p-4">
                        <h4 className='text-center m-2'>Добавить файлы</h4>
                        {/* Поле загрузки данных */}
                        <div>
                            <UploadBlock uploadedFiles={uploadedFiles} setUploadedFiles={uploadHandler} />
                        </div>
                    </div>
                    <ContentGroup uploadedFiles={uploadedFiles} setUploadedFiles={setUploadedFiles} />
                </div>
        </div>
    );
}


export default UploadPage;
