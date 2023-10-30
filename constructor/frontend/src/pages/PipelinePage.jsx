import React, { useState, useEffect } from "react"
import MyButton from "../components/UI/MyButton/MyButton"
import MyInput from "../components/UI/MyInput/MyInput"
import "bootstrap/dist/css/bootstrap.css"
import DatePicker from "react-datepicker"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import SelectField from "../components/CrmPage/Form/SelectField"
// import MyModal from "../components/ScoringPage/MyModal/MyModal"
import { Link } from "react-router-dom"
// import ResultTable from "../components/PiplinePage/ResultTable"
// import { Link } from "react-router-dom"

const PipelinePage = () => {
  const [open, setOpen] = useState(true)

  //   Для отображения в дальнейшем различных элементов
  // const [block, setBlock] = useState([
  //   { name: "Статические данные", open: false },
  //   { name: "Расчет модели", open: false },
  //   { name: "Выписка СКУАД", open: false },
  //   { name: "Результаты скоринга", open: false },
  //   { name: "Журнал скоринга", open: false },
  // ])
  const [startDate, setStartDate] = useState(new Date())
  const [models, setModels] = useState([])
  const [inputINN, setInputINN] = useState("")
  const [scoringModel, setScoringModel] = useState({ scoring_model: "" })
  const [scoringOptions, setScoringOptions] = useState([])
  const [disabledBtn, setDisabledBtn] = useState("")
  // const [modalScoringResults, setModalScoringResults] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const isDisabled = scoringModel.scoring_model && inputINN
  const isDisabledScoring = scoringModel.scoring_model && inputINN && isSaved

  async function getModels() {
    await axios
      .get("http://127.0.0.1:8000/api/scoring_model/")
      .then((res) => {
        setModels([])
        setScoringOptions([])
        console.log("getModels", res.data.data)
        setModels(res.data.data)
        res.data.data.forEach((modelpass) => {
          if (modelpass.status === "AP") {
            setScoringOptions((current) => [
              ...current,
              { label: modelpass.model_name, value: modelpass.model_name },
            ])
          }
        })
      })
      .catch((e) => {
        console.log(e)
      })
  }

  const doScoring = async () => {
    console.log("Scoring...")

    const model = models.find(
      (el) => el.model_name === scoringModel.scoring_model
    )

    console.log("find ", model)

    const json = {
      model,
    }

    await axios
      .post("http://127.0.0.1:8000/api/start_scoring/", json)
      .then((resp) => {
        getModels()

        console.log("resp do scoring: ", resp.data.message)
        setInputINN("")
        setScoringModel({ scoring_model: "" })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  async function handleSaveData() {
    await axios
      .post("http://127.0.0.1:8000/api/inn_res/create_relation/", {
        inn_ids: inputINN.split(", ").join(" ").split("/").join(" ").split(" "),
        active: true,
        scoringmodel_id: models.find(
          (el) => el.model_name === scoringModel.scoring_model
        ).id,
        author_id: "Denis",
      })
      .then(function (response) {
        console.log("Сделать связку ", response.data)
        setDisabledBtn("btn btn-outline-primary disabled")
        setIsSaved(true)
        setModels([])
        setScoringOptions([])
        // console.log("models in handleSaveData", models)
        getModels()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const toggle = () => {
    setOpen(!open)
  }

  const handleChangeINN = (e) => {
    setInputINN(e.target.value)
  }

  const handleChange = (target) => {
    setScoringModel((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  useEffect(() => {
    getModels()
  }, [])

  return (
    <div className="container mt-3 mb-4">
      {/* <div className="row"> */}
      <div className="row">
        <div className="col-md-auto">
          <MyButton>Статические данные</MyButton>
        </div>

        <div className="col-md-auto">
          <MyButton className={open ? "btn-primary" : ""} onClick={toggle}>
            Расчет скоринга
          </MyButton>
        </div>
        <div className="col-md-auto">
          <MyButton>Результаты модели</MyButton>
        </div>
        <div className="col-md-auto">
          <MyButton>Выписка СКУАД</MyButton>
        </div>
        <div className="col-md-auto">
          <Link to="/results">
            <MyButton>Журнал скоринга</MyButton>
          </Link>
        </div>
        {/* <div className="col-md-auto">
          <Link to="/results">
            <MyButton>Журнал скоринга</MyButton>
          </Link>
        </div> */}
      </div>
      {/* </div> */}

      {open && (
        <div className="container p-0">
          <div className="row">
            <div className="card-body table-responsive-lg">
              <table className="table text-left table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">Атрибут</th>
                    <th>Условие фильтра</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ИНН</td>
                    <td>
                      {/* <table> */}
                      {/* <thead> */}
                      {/* <tr> */}
                      {/* <td> */}
                      <MyInput
                        value={inputINN}
                        onChange={(e) => handleChangeINN(e)}
                        type="text"
                        placeholder="Вставьте список ИНН"
                      ></MyInput>
                      {/* </td> */}
                      {/* <td>
                            <MyInput placeholder="Выражение"></MyInput>
                          </td> */}
                      {/* </tr> */}
                      {/* </thead> */}
                      {/* </table> */}
                    </td>
                  </tr>
                  <tr>
                    <td>Модель скоринга</td>
                    <td>
                      <SelectField
                        label=""
                        defaultOption="Выбрать модель для скоринга"
                        name="scoring_model"
                        options={scoringOptions}
                        onChange={handleChange}
                        value={scoringModel.scoring_model}
                      />
                      {/* <select
                      className="form-select"
                      aria-label="Default select example"
                      defaultValue="0"
                    >
                      <option value="0" disabled>
                        Выбрать модель для скоринга
                      </option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select> */}
                    </td>
                  </tr>
                  <tr>
                    <td>Отчетная дата</td>
                    <td>
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        isClearable
                        placeholderText="I have been cleared!"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Вид отчетности</td>
                    <td>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        defaultValue="0"
                      >
                        <option value="0" disabled>
                          Выбрать вид отчетности
                        </option>
                        <option value="1">Первичная</option>
                        <option value="2">Обновленная</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="row p-0">
            <div className="col-md-auto p-0 ">
              {/* <MyButton onClick={() => setModalScoringResults(true)}>
                Запустить скоринг
              </MyButton> */}

              <MyButton
                disabled={!isDisabledScoring}
                // onClick={() => setModalScoringResults(true)}
                onClick={doScoring}
              >
                Запустить скоринг
              </MyButton>
            </div>
            {/* <div className="col-md-auto">
              <Link to="/results">
                <MyButton>Журнал скоринга</MyButton>
              </Link>
            </div> */}
            <div className="col-md-auto">
              <MyButton
                className={disabledBtn}
                disabled={!isDisabled}
                onClick={handleSaveData}
              >
                Сохранить связку параметров
              </MyButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PipelinePage
