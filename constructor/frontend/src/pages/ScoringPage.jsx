import React, { useEffect, useState } from "react"
import "../styles/App.css"
import "bootstrap/dist/css/bootstrap.css"
import MyButton from "../components/UI/MyButton/MyButton"
import ModelForm from "../components/ScoringPage/ModelForm/ModelForm"
import MyModal from "../components/ScoringPage/MyModal/MyModal"
import { Link } from "react-router-dom"
import AtributForm from "../components/ScoringPage/AtributForm/AtributForm"
import Moment from "moment"
import localization from "moment/locale/ru"
import modelService from "../services/model.service"
import markerSrvice from "../services/marker.service"
import MyInput from "../components/UI/MyInput/MyInput"

const ScoringPage = () => {
  const [models, setModels] = useState([])
  const [modal, setModal] = useState(false)

  const [markers, setMarkers] = useState([])
  const [modalMarker, setModalMarker] = useState(false)
  const [linkMarkers, setLinkMarkers] = useState([])
  const [searchValue, setSearchValue] = useState("")

  // const [modelIdForLink, setModelIdForLink] = useState(0)

  let filtredMarkers = markers
    ? markers.filter((el) => {
        return el.name_marker_attr
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      })
    : null

  const getModelStatus = (status) => {
    return status === "AP" ? "Утвержден" : "Черновик"
  }

  const getModels = async () => {
    try {
      const { data } = await modelService.get()
      setModels(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getModels()
  }, [])

  const getLinkMarkers = (findMarkers) => {
    findMarkers.forEach((el) => {
      linkMarkers.push(el)
    })
  }

  async function postModel(newModel) {
    try {
      const data = await modelService.post({
        author_id: newModel.author_id,
        description: newModel.description,
        model_name: newModel.model_name,
        status: newModel.status,
        version: newModel.version,
      })
      console.log("new model: ", data)
      setModels([...models, data])
      return data.id
    } catch (err) {
      console.log(err)
    }
  }

  async function postLinkMarkerAndModel(modelIdForLink) {
    try {
      const data = await markerSrvice.postCreateRelation(`create_relation/`, {
        counted_attr_ids: linkMarkers,
        scoring_model_id: modelIdForLink,
      })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  const createModel = (newModel) => {
    setModels([...models, newModel])
    postModel(newModel).then((response) => {
      // console.log("postModel(newModel).then(response)", response)
      postLinkMarkerAndModel(response)
    })
    setModal(false)
  }

  async function deleteModel(id) {
    try {
      const { data } = await modelService.delete(id)
      // console.log(data)
      if (!data) setModels(models.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  async function deleteMarker(id) {
    try {
      const { data } = await markerSrvice.delete(id)
      // console.log(data)
      if (!data) setMarkers(markers.filter((item) => item.id !== id))
    } catch (err) {
      console.log(err)
    }
  }

  async function getMarkers() {
    try {
      const { data } = await markerSrvice.get()
      setMarkers(data)
    } catch (e) {
      console.log(e)
    }
  }

  async function postMarkers(newAtr) {
    try {
      const data = await markerSrvice.post({
        name_marker_attr: newAtr.name_marker_attr,
        attr_formulas: newAtr.attr_formulas,
        description: newAtr.description,
        nested_level: newAtr.nested_level,
        author_id: newAtr.author_id,
      })
      console.log("data", data)
      setMarkers((prevState) => [...prevState, data])
      console.log("markers", markers)
      // setMarkers([...markers, data])
    } catch (e) {
      console.log(e)
    }
  }

  const createMarker = (newMarker) => {
    // setMarkers([...Markers, newMarker])
    postMarkers(newMarker)
    setModalMarker(false)
  }

  useEffect(() => {
    getMarkers()
  }, [])

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
                    <th></th>
                    <th></th>
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
              <div className="w-25">
                {" "}
                <MyInput
                  type="text"
                  placeholder="Введите название маркера"
                  // className="form-group search__input mr-5"
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </div>

              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Наименование маркера</th>
                    <th>Автор</th>
                    <th>Дата создания</th>
                    <th>Формула маркера</th>
                    {/* <th>Просмотр</th> */}
                    <th></th>
                    {/* Удалить */}
                  </tr>
                </thead>
                <tbody>
                  {filtredMarkers.map((marker) => {
                    return (
                      <tr key={marker.id}>
                        <td>{marker.name_marker_attr}</td>
                        <td>{marker.author_id}</td>
                        <td>
                          {Moment(marker.created_date)
                            .locale("rus", localization)
                            .format("LLL")}
                        </td>
                        <td style={{ wordBreak: "break-word" }}>
                          {marker.attr_formulas}
                        </td>
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
                            onClick={() => deleteMarker(marker.id)}
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
        {/* <h3>Новая модель</h3> */}
        <ModelForm
          create={createModel}
          models={models}
          getLinkMarkers={getLinkMarkers}
        />
      </MyModal>

      <MyModal visible={modalMarker} setVisible={setModalMarker}>
        {/* <h3>Новый маркер</h3> */}
        <AtributForm create={createMarker} setVisible={setModalMarker} />
      </MyModal>
    </div>
  )
}

export default ScoringPage
