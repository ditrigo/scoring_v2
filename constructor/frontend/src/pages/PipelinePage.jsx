import React, { useState, useEffect } from "react"
import MyButton from "../components/UI/MyButton/MyButton"
import MyInput from "../components/UI/MyInput/MyInput"
import "bootstrap/dist/css/bootstrap.css"
import DatePicker, { registerLocale } from "react-datepicker"
import ru from "date-fns/locale/ru"

import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import SelectField from "../components/CrmPage/Form/SelectField"
// import MyModal from "../components/ScoringPage/MyModal/MyModal"
import { Link } from "react-router-dom"
import modelService from "../services/model.service"
// import ResultTable from "../components/PiplinePage/ResultTable"
// import { Link } from "react-router-dom"
import configFile from "../config.json"
import httpService from "../services/http.service"

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
  registerLocale("ru", ru)

  const [models, setModels] = useState([])
  const [inputINN, setInputINN] = useState("")
  const [scoringModel, setScoringModel] = useState({ scoring_model: "" })
  const [scoringOptions, setScoringOptions] = useState([])
  const [disabledBtn, setDisabledBtn] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const isDisabled = scoringModel.scoring_model && inputINN
  const isDisabledScoring = scoringModel.scoring_model && inputINN && isSaved

  const getModels = async () => {
    try {
      const { data } = await modelService.get()
      setModels([])
      setScoringOptions([])
      setModels(data)
      data.forEach((modelpass) => {
        if (modelpass.status === "AP") {
          setScoringOptions((current) => [
            ...current,
            { label: modelpass.model_name, value: modelpass.model_name },
          ])
        }
      })
    } catch (e) {
      console.log(e)
    }
  }

  const doScoring = async () => {
    console.log("Scoring...")
    const model = models.find(
      (el) => el.model_name === scoringModel.scoring_model
    )
    const json = {
      model,
    }

    try {
      const { data } = httpService.post("start_scoring/", json)
      getModels()
      setInputINN("")
      setScoringModel({ scoring_model: "" })
    } catch (error) {
      console.log("ERR relation", error.message)
      alert("Ошибка скоринга: " + error.message)
    }

    // await axios
    //   .post(`${configFile.apiEndPoint}/start_scoring/`, json)
    //   .then((resp) => {
    //     getModels()
    //     setInputINN("")
    //     setScoringModel({ scoring_model: "" })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //     alert("Произошла ошибка: ", err)
    //   })
  }

  async function handleSaveData() {
    // const json = {
    //   inn_ids: inputINN.split(", ").join(" ").split("/").join(" ").split(" "),
    //   active: true,
    //   scoringmodel_id: models.find(
    //     (el) => el.model_name === scoringModel.scoring_model
    //   ).id,
    //   author_id: "Тестовый пользователь",
    // }
    // try {
    //   const { data } = await httpService.post("inn_res/create_relation/", json)
    //   console.log("Relation resp: ", data)
    //   setDisabledBtn("btn btn-outline-primary disabled")
    //   setIsSaved(true)
    //   setModels([])
    //   setScoringOptions([])
    //   getModels()
    // } catch (error) {
    //   console.log("ERR relation", error.message)
    //   alert("Ошибка создания связки: " + error.message)
    // }

    await axios
      .post(`${configFile.apiEndPoint}/inn_res/create_relation/`, {
        inn_ids: inputINN.split(", ").join(" ").split("/").join(" ").split(" "),
        active: true,
        scoringmodel_id: models.find(
          (el) => el.model_name === scoringModel.scoring_model
        ).id,
        author_id: "Тестовый пользователь",
      })
      .then(function (response) {
        console.log("Сделать связку ", response.data)
        setDisabledBtn("btn btn-outline-primary disabled")
        setIsSaved(true)
        setModels([])
        setScoringOptions([])
        getModels()
      })
      .catch(function (error) {
        console.log(error)
        alert("Произошла ошибка в сохранении связки: ", error)
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
    <div className="container mt-3 mb-3">
      {/* <div className="row"> */}
      <div className="row">
        <div className="col-md-auto">
          <MyButton disabled>Статические данные</MyButton>
        </div>

        <div className="col-md-auto">
          <MyButton className={open ? "btn-primary" : ""} onClick={toggle}>
            Расчет скоринга
          </MyButton>
        </div>
        <div className="col-md-auto">
          <MyButton disabled>Результаты модели</MyButton>
        </div>
        <div className="col-md-auto">
          <MyButton disabled>Выписка СКУАД</MyButton>
        </div>
        <div className="col-md-auto">
          <Link to="/results">
            <MyButton>Журнал скоринга</MyButton>
          </Link>
        </div>
      </div>

      {open && (
        <div className="container p-0">
          <div className="row-md-auto m-0">
            <div className="card mt-3">
              <div className="card-header">
                <h4>Расчет скоринга</h4>
              </div>
              <div className="card-body">
                <table className="table  table-striped ">
                  <thead>
                    <tr>
                      <th scope="col">Атрибут</th>
                      <th scope="col">Условие фильтра</th>
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
                      </td>
                    </tr>
                    <tr>
                      <td>Отчетная дата</td>
                      <td>
                        <DatePicker
                          locale="ru"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          isClearable
                          placeholderText="дд.мм.гггг"
                          dateFormat="dd/MM/yyyy"
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
          </div>
          <div className="row m-0 p-0 mt-3">
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
