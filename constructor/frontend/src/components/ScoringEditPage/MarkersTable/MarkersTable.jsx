import React, { useEffect, useState } from "react"
import MyModal from "../../ScoringPage/MyModal/MyModal"
import MyButton from "../../UI/MyButton/MyButton"
import axios from "axios"
import MyInput from "../../UI/MyInput/MyInput.jsx"
import TestScoringForm from "../../ScoringEditPage/TestScoringForm"
// import moment from "moment"
// import localization from "moment/locale/ru"

const MarkersTable = ({ modelId, model }) => {
  const [markers, setMarkers] = useState([])
  const [linkedMarkers, setLinkedMarkers] = useState([])
  const [modalTestScoring, setModalTestScoring] = useState(false)
  const [modalMarkerView, setModalMarkerView] = useState(false)
  const [markerDetail, setMarkerDetail] = useState([{ name: "", formula: "" }])

  async function getLinkedMarkers() {
    axios
      .get(`http://127.0.0.1:8000/api/scoring_model/${modelId}`)
      .then((res) => {
        // console.log("in getMarker ", res.data.data.marker_id)
        setLinkedMarkers(res.data.data.marker_id)
      })
      .catch((e) => {
        console.log(e)
      })
  }

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

  const doTestScoring = () => {
    // setMarkers([...Markers, newMarker])
    setModalTestScoring(false)
  }

  useEffect(() => {
    getLinkedMarkers()
  }, [])

  const showMarkerDetail = (marker) => {
    setModalMarkerView(true)
    setMarkerDetail({
      name: marker.name_marker_attr,
      formula: marker.attr_formulas,
    })
  }

  return (
    <div className="container mb-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Маркеры
                <button
                  onClick={() => setModalTestScoring(true)}
                  className="btn btn-outline-primary float-end"
                >
                  Тестовый скоринг
                </button>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Наименование маркера</th>
                    <th>Просмотр</th>
                    <th>Удалить</th>
                  </tr>
                </thead>
                <tbody>
                  {linkedMarkers.map((marker) => {
                    return (
                      <tr key={marker.id}>
                        <td>{marker.name_marker_attr}</td>
                        <td>
                          <MyButton
                            className=""
                            onClick={() => showMarkerDetail(marker)}
                            // setModalMarkerView(true)
                          >
                            Просмотр
                          </MyButton>
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
      {/* </div> */}

      <MyModal visible={modalTestScoring} setVisible={setModalTestScoring}>
        <h3>Тестовый скоринг</h3>
        <TestScoringForm
          modelId={modelId}
          setVisible={setModalTestScoring}
          model={model}
        />
      </MyModal>

      {/* измененить элемент a controlled or uncontrolled??? */}
      <MyModal visible={modalMarkerView} setVisible={setModalMarkerView}>
        <h4>Просмотр маркера</h4>
        <hr />
        <br />
        <div>
          <label>Наименование маркера </label>
          <MyInput
            type="text"
            placeholder="Наименование маркера"
            value={markerDetail.name}
          />
        </div>
        <div>
          <label>Формула маркера </label>
          <MyInput
            type="text"
            placeholder="Формула маркера"
            value={markerDetail.formula}
          />
        </div>
      </MyModal>
    </div>
  )
}

export default MarkersTable
