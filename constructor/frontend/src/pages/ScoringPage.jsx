import React, { useEffect, useState } from "react"
import "../styles/App.css"
import "bootstrap/dist/css/bootstrap.css"
import MyButton from "../components/UI/MyButton/MyButton"
import axios from "axios"
import ModelForm from "../components/ScoringPage/ModelForm/ModelForm"
import MyModal from "../components/ScoringPage/MyModal/MyModal"
import { Link } from "react-router-dom"
import AtributForm from "../components/ScoringPage/AtributForm/AtributForm"
import MyInput from "../components/UI/MyInput/MyInput"
import Moment from "moment"
import localization from "moment/locale/ru"

const ScoringPage = () => {
  const [models, setModels] = useState([])
  const [modal, setModal] = useState(false)

  const [markers, setMarkers] = useState([])
  const [modalMarker, setModalMarker] = useState(false)
  const [linkMarkers, setLinkMarkers] = useState([])
  // const [modelIdForLink, setModelIdForLink] = useState(0)

  const getModelStatus = (status) => {
    return status === "AP" ? "Утвержден" : "Черновик"
  }

  async function getModels() {
    axios
      .get("http://127.0.0.1:8000/api/scoring_model/")
      .then((res) => {
        setModels(res.data.data)
        // console.log(res.data.data.id)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    // console.log("useEffect")
    getModels()
  }, [])

  const getLinkMarkers = (findMarkers) => {
    findMarkers.forEach((el) => {
      linkMarkers.push(el)
    })
    // console.log(" getLinkMarkers linkMarkers", linkMarkers)
  }

  async function postModel(newModel) {
    return axios
      .post("http://127.0.0.1:8000/api/scoring_model/", {
        author_id: newModel.author_id,
        description: newModel.description,
        model_name: newModel.model_name,
        status: newModel.status,
        version: newModel.version,
      })
      .then(function (response) {
        // console.log("postModel response", response)
        // console.log("postModel response.data.id", response.data.id)
        setModels([...models, response.data])
        return response.data.id
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  async function postLinkMarkerAndModel(modelIdForLink) {
    // console.log("postLinkMarkerAndModel")
    // console.log("linkMarkers", linkMarkers)
    // console.log("modelIdForLink", modelIdForLink)
    axios
      .post("http://127.0.0.1:8000/api/marker_attributes/create_relation/", {
        counted_attr_ids: linkMarkers,
        scoring_model_id: modelIdForLink,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const createModel = (newModel) => {
    setModels([...models, newModel])
    postModel(newModel).then((response) => {
      // console.log("postModel(newModel).then(response)", response)
      postLinkMarkerAndModel(response)
    })
    setModal(false)
  }

  const deleteModel = (id) => {
    axios
      .delete(`http://127.0.0.1:8000/api/scoring_model/${id}`)
      .then((res) => {
        console.log(res.data)
        console.log(res)
      })
      .catch((e) => {
        console.log(e)
      })
    setModels(models.filter((item) => item.id !== id))
  }

  // get/post path/api/counted_attributes
  async function getMarkers() {
    axios
      .get("http://127.0.0.1:8000/api/marker_attributes/")
      .then((res) => {
        // console.log("in getMarker ", res.data.data)
        // console.log("in getMarker ", res.data.data.id)
        setMarkers(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    // console.log("useEffect in getAtr")
    getMarkers()
  }, [])

  async function postMarkers(newAtr) {
    axios
      .post("http://127.0.0.1:8000/api/marker_attributes/", {
        name_marker_attr: newAtr.name_marker_attr,
        attr_formulas: newAtr.attr_formulas,
        description: newAtr.description,
        nested_level: newAtr.nested_level,
        author_id: newAtr.author_id,
      })
      .then(function (response) {
        console.log(response)
        setMarkers([...markers, response.data])
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const createMarker = (newMarker) => {
    // setMarkers([...Markers, newMarker])
    postMarkers(newMarker)
    setModalMarker(false)
  }

  return (
    <div className="container mt-3 mb-4">
      {/* <div className="container mt-2"> */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Скоринговые модели
                <button
                  onClick={() => setModal(true)}
                  className="btn btn-outline-primary float-end"
                >
                  Добавить модель
                </button>
              </h4>
            </div>
            {/* Блок данных в таблице. Сделать переиспользуемым модулем! */}
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    {/* <th scope="col">id модели</th> */}
                    <th scope="col">Наименование модели</th>
                    <th>Автор</th>
                    <th>Статус</th>
                    <th>Дата изменения</th>
                    <th>Редактировать</th>
                    <th>Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  {models.map((model, index) => {
                    return (
                      <tr key={index}>
                        {/* <td>{attribute.id}</td> */}
                        <td>{model.model_name}</td>
                        <td>{model.author_id}</td>
                        <td>{getModelStatus(model.status)}</td>
                        <td>
                          {Moment(model.created_date)
                            .locale("rus", localization)
                            .format("LLL")}
                        </td>
                        <td>
                          <Link
                            to={`/scoring/${model.id}/edit`}
                            state={{ models: model }}
                          >
                            <MyButton>
                              {model.status === "AP"
                                ? "Просмотр"
                                : "Редактировать"}
                            </MyButton>
                          </Link>
                        </td>
                        <td>
                          <button
                            onClick={() => deleteModel(model.id)}
                            className={
                              model.status === "AP"
                                ? "btn btn-outline-danger disabled"
                                : "btn btn-outline-danger"
                            }
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className="container mt-5"> */}
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Маркеры
                <button
                  onClick={() => setModalMarker(true)}
                  className="btn btn-outline-primary float-end"
                >
                  Добавить маркер
                </button>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Наименование маркера</th>
                    <th>Автор</th>
                    <th>Дата изменения</th>
                    <th>Формула маркера</th>
                    {/* <th>Просмотр</th> */}
                    <th>Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  {markers.map((marker) => {
                    return (
                      <tr key={marker.id}>
                        <td>{marker.name_marker_attr}</td>
                        <td>{marker.author_id}</td>
                        <td>
                          {Moment(marker.created_date)
                            .locale("rus", localization)
                            .format("LLL")}
                        </td>
                        <td>{marker.attr_formulas}</td>
                        {/* <td>
                          <Link
                          // to={`/scoring/${marker.id}/edit`}
                          // state={{ models: marker }}
                          >
                            <MyButton>Просмотр</MyButton>
                          </Link>
                        </td> */}
                        <td>
                          <button
                            // onClick={() => deleteModel(model.id)}
                            className="btn btn-outline-danger"
                          >
                            Удалить
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      <MyModal visible={modal} setVisible={setModal}>
        <h3>Новая модель</h3>
        <ModelForm
          create={createModel}
          models={models}
          getLinkMarkers={getLinkMarkers}
        />
      </MyModal>

      <MyModal visible={modalMarker} setVisible={setModalMarker}>
        <h3>Новый маркер</h3>
        <AtributForm create={createMarker} setVisible={setModalMarker} />
      </MyModal>
    </div>
  )
}

export default ScoringPage
