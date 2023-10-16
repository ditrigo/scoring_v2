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

const ScoringPage = () => {
  const [models, setModels] = useState([])
  const [modal, setModal] = useState(false)

  const [markers, setMarkers] = useState([])
  const [modalMarker, setModalMarker] = useState(false)

  async function getModels() {
    axios
      .get("http://127.0.0.1:8000/api/scoring_model/")
      .then((res) => {
        // console.log(res.data.data)
        setModels(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function postModel(newModel) {
    axios
      .post("http://127.0.0.1:8000/api/scoring_model/", {
        author_id: newModel.author_id,
        description: newModel.description,
        model_name: newModel.model_name,
        status: newModel.status,
        version: newModel.version,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
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

  const createModel = (newModel) => {
    setModels([...models, newModel])
    postModel(newModel)
    setModal(false)
  }

  useEffect(() => {
    // console.log("useEffect")
    getModels()
  }, [])

  // get/post path/api/counted_attributes
  async function getMarkers() {
    axios
      .get("http://127.0.0.1:8000/api/counted_attributes/")
      .then((res) => {
        console.log("in getMarker ", res.data.data)
        setMarkers(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function postMarkers(newAtr) {
    axios
      .post("http://127.0.0.1:8000/api/counted_attributes/", {
        name_counted_attr: newAtr.name_counted_attr,
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

  useEffect(() => {
    // console.log("useEffect in getAtr")
    getMarkers()
  }, [])

  // работа с выводом данных из инпут

  const [inputINN, setInputINN] = useState("")

  const handleChangeINN = (e) => {
    setInputINN(e.target.value)
    console.log(inputINN.split(","))
  }

  return (
    <div className="ScoringPage">
      <div className="container mt-5">
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
                          <td>{model.status}</td>
                          <td>{model.created_date}</td>
                          <td>
                            <Link
                              to={`/scoring/${model.id}/edit`}
                              state={{ models: model }}
                            >
                              <MyButton>Редактировать</MyButton>
                            </Link>
                          </td>
                          <td>
                            <button
                              onClick={() => deleteModel(model.id)}
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
      </div>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  {/* Атрибуты */}
                  Маркеры
                  <button
                    onClick={() => setModalMarker(true)}
                    className="btn btn-outline-primary float-end"
                  >
                    {/* Создать атрибут */}
                    Создать маркер
                  </button>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {/* <th scope="col">id модели</th> */}
                      <th scope="col">Наименование маркера</th>
                      <th>Автор</th>
                      <th>UUID</th>
                      <th>Дата изменения</th>
                      <th>Активен</th>
                      <th>Scoring name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markers.map((marker) => {
                      return (
                        <tr key={marker.id}>
                          <td>{marker.name_counted_attr}</td>
                          <td>{marker.author_id}</td>
                          <td>{marker.uuid}</td>
                          <td>{marker.created_date}</td>
                          <td>{String(marker.active)}</td>
                          <td>{marker.scoring_name}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <MyInput
          value={inputINN}
          onChange={(e) => handleChangeINN(e)}
          type="text"
          placeholder="Вставьте необходимые ИНН"
        />
        {inputINN && inputINN.split(",").map((el) => <p>{el}</p>)}
      </div>

      <MyModal visible={modal} setVisible={setModal}>
        <ModelForm create={createModel} />
      </MyModal>

      <MyModal visible={modalMarker} setVisible={setModalMarker}>
        <h3>Новый маркер</h3>
        <AtributForm create={createMarker} setVisible={setModalMarker} />
      </MyModal>
    </div>
  )
}

export default ScoringPage
