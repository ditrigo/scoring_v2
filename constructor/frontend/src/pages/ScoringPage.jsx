import React, { useEffect, useState } from "react"
import "../styles/App.css"
import "bootstrap/dist/css/bootstrap.css"
import MyButton from "../components/UI/MyButton/MyButton"
import axios from "axios"
import ModelForm from "../components/ScoringPage/ModelForm/ModelForm"
import MyModal from "../components/ScoringPage/MyModal/MyModal"
import { Link } from "react-router-dom"
import AtributForm from "../components/ScoringPage/AtributForm/AtributForm"

const ScoringPage = () => {
  const [models, setModels] = useState([])
  const [modal, setModal] = useState(false)

  const [atributs, setAtributs] = useState([])
  const [modalAtribut, setModalAtribut] = useState(false)

  async function getModels() {
    axios
      .get("http://127.0.0.1:8000/api/scoring_model/")
      .then((res) => {
        console.log(res.data.data)
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
  async function getAtributs() {
    axios
      .get("http://127.0.0.1:8000/api/counted_attributes/")
      .then((res) => {
        console.log("in getAtr ", res.data.data)
        setAtributs(res.data.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  async function postAtributs(newAtr) {
    axios
      .post("http://127.0.0.1:8000/api/counted_attributes/", {
        name_counted_attr: newAtr.author_id,
        attr_formulas: newAtr.description,
        description: newAtr.description,
        nested_level: (newAtr.nested_level = 1),
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const createAtribut = (newAtr) => {
    setAtributs([...models, newAtr])
    postAtributs(newAtr)
    setModalAtribut(false)
  }

  useEffect(() => {
    // console.log("useEffect in getAtr")
    getAtributs()
  }, [])

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
                  Атрибуты
                  <button
                    onClick={() => setModalAtribut(true)}
                    className="btn btn-outline-primary float-end"
                  >
                    Создать атрибут
                  </button>
                </h4>
              </div>
              <div className="card-body">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      {/* <th scope="col">id модели</th> */}
                      <th scope="col">Наименование атрибута</th>
                      <th>Автор</th>
                      <th>UUID</th>
                      <th>Дата изменения</th>
                      <th>Активен</th>
                      <th>Scoring name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atributs.map((atr) => {
                      return (
                        <tr key={atr.id}>
                          <td>{atr.name_counted_attr}</td>
                          <td>{atr.author_id}</td>
                          <td>{atr.uuid}</td>
                          <td>{atr.created_date}</td>
                          <td>{String(atr.active)}</td>
                          <td>{atr.scoring_name}</td>
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

      <MyModal visible={modal} setVisible={setModal}>
        <ModelForm create={createModel} />
      </MyModal>

      <MyModal visible={modalAtribut} setVisible={setModalAtribut}>
        <h3>Новый атрибут</h3>
        <AtributForm create={createAtribut} setVisible={setModalAtribut} />
      </MyModal>
    </div>
  )
}

export default ScoringPage
