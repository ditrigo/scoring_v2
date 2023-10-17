import React, { useEffect, useState } from "react";
// import UploadBlock from "../components/UploadPage/UploadBlock/UploadBlock.jsx";
import UploadBlock from "../components/UploadPage/UploadBlock/UploadBlock.tsx";
// import ButtonGroup from "../components/UploadPage/ButtonGroup/ButtonGroup.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/App.css";
import ContentGroup from "../components/UploadPage/ContentGroup/ContentGroup.jsx";

function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState([{ name: 123 }])

  const uploadHandler = (item) => {
    setUploadedFiles([...uploadedFiles, item])
  }
  return (
    <div className="UploadPage">
      <div className="container">
        <div className="d-flex justify-content-between">
          <div className="upload-block col-6 col-md-4">
            <div>
              <h4 className="text-center m-3">Добавить файлы</h4>
            </div>

            {/* Поле загрузки данных */}
            <UploadBlock
              uploadedFiles={uploadedFiles}
              setUploadedFiles={uploadHandler}
            />
          </div>
          <ContentGroup
            uploadedFiles={uploadedFiles}
            setUploadedFiles={setUploadedFiles}
          />
        </div>
      </div>
    </div>
  )
}

export default UploadPage

{
  /*// ROMA VERSTKA*/
}
{
  /*// import React, { useEffect, useState } from "react";*/
}
{
  /*// import ContentGroup from "../components/UploadPage/ContentGroup/ContentGroup.jsx";*/
}
{
  /*// import "bootstrap/dist/css/bootstrap.css";*/
}
{
  /*// import "../styles/App.css";*/
}
{
  /*// import UploadBlock from "../components/UploadPage/UploadBlock/UploadBlock.jsx";*/
}

{
  /*// function UploadPage() {*/
}
{
  /*  const [uploadedFiles, setUploadedFiles] = useState([{ name: 123 }]);*/
}

{
  /*  const uploadHandler = (item) => {*/
}
{
  /*    setUploadedFiles([...uploadedFiles, item]);*/
}
{
  /*  };*/
}

{
  /*  return (*/
}
{
  /*    <div className="UploadPage">*/
}
{
  /*      <div className="d-flex justify-content-center flex-row">*/
}
{
  /*        <div className="upload-block mx-3 p-4">*/
}
{
  /*          <h4 className="text-center p-2">Добавить файлы</h4>*/
}
{
  /*          /!* Поле загрузки данных *!/*/
}
{
  /*          <div>*/
}
{
  /*            <UploadBlock*/
}
{
  /*              uploadedFiles={uploadedFiles}*/
}
{
  /*              setUploadedFiles={uploadHandler}*/
}
{
  /*            />*/
}
{
  /*          </div>*/
}
{
  /*        </div>*/
}
{
  /*        <ContentGroup*/
}
{
  /*          uploadedFiles={uploadedFiles}*/
}
{
  /*          setUploadedFiles={setUploadedFiles}*/
}
{
  /*        />*/
}
{
  /*      </div>*/
}
{
  /*    </div>*/
}
{
  /*  );*/
}
{
  /*}*/
}

{
  /*export default UploadPage;*/
}
{
  /*ROMA VERSTKA*/
}
