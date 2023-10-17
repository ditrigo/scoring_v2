import React, { useEffect, useState } from "react"
import MyModal from "./ScoringPage/MyModal/MyModal"
import AtributForm from "./ScoringPage/AtributForm/AtributForm"
import MyButton from "./UI/MyButton/MyButton"
import { Link } from "react-router-dom"
import axios from "axios"
import moment from "moment"
import localization from "moment/locale/ru"

const MarkersTable = () => {
  const [markers, setMarkers] = useState([])
  const [modalMarker, setModalMarker] = useState(false)

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

  return (
    <>
      <div className="container mb-4">
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
                    Добавить маркер
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
                      {/* <th>UUID</th> */}
                      <th>Дата изменения</th>
                      <th>Просмотр</th>
                      <th>Удалить</th>
                    </tr>
                  </thead>
                  <tbody>
                    {markers.map((marker) => {
                      return (
                        <tr key={marker.id}>
                          <td>{marker.name_counted_attr}</td>
                          <td>{marker.author_id}</td>
                          {/* <td>{marker.uuid}</td> */}
                          <td>
                            {moment(marker.created_date)
                              .locale("rus", localization)
                              .format("LLL")}
                          </td>
                          <td>
                            <Link
                            // to={`/scoring/${model.id}/edit`}
                            // state={{ models: model }}
                            >
                              <MyButton>Просмотр</MyButton>
                            </Link>
                          </td>
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
      </div>

      <MyModal visible={modalMarker} setVisible={setModalMarker}>
        <h3>Новый маркер</h3>
        <AtributForm create={createMarker} setVisible={setModalMarker} />
      </MyModal>
    </>
  )
}

export default MarkersTable
