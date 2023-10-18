import React, { useState, useEffect } from "react"
import MyButton from "../components/UI/MyButton/MyButton"
import MyInput from "../components/UI/MyInput/MyInput"
import "bootstrap/dist/css/bootstrap.css"
import DatePicker from "react-datepicker"
import axios from "axios"
import "react-datepicker/dist/react-datepicker.css"
import SelectField from "../components/CrmPage/Form/SelectField"

const PipelinePage = () => {
  const [open, setOpen] = useState(true)
  //   Для отображения в дальнейшем различных элементов
  const [block, setBlock] = useState([
    { name: "Статические данные", open: false },
    { name: "Расчет модели", open: false },
    { name: "Выписка СКУАД", open: false },
    { name: "Результаты скоринга", open: false },
    { name: "Журнал скоринга", open: false },
  ])
  const [startDate, setStartDate] = useState(new Date())
  // const [view, setView] = useState("result")

  const toggle = () => {
    setOpen(!open)
  }

  const [inputINN, setInputINN] = useState("")
  const [scoringModel, setScoringModel] = useState({ scoring_model: "" })

  const handleChangeINN = (e) => {
    setInputINN(e.target.value)
    // console.log(inputINN.split(", "))
  }

  const handleChange = (target) => {
    setScoringModel((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }
  // const [scoringOptions, setScoringOptions] = useState([{ label: "", value: "" }])
  // async function getModels() {
  //   axios
  //     .get("http://127.0.0.1:8000/api/scoring_model/")
  //     .then((res) => {
  //       console.log(res.data.data)
  //       console.log(res.data.data[0].model_name)
  //       console.log(res.data.data[0].id)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }
  // useEffect(() => {
  //   // console.log("useEffect")
  //   getModels()
  // }, [])

  const scoringOptions = [
    { label: "СКУАД1", value: 1 },
    { label: "СКУАД2", value: 2 },
    { label: "СКУАД3", value: 3 },
  ]

  const handleSaveData = () => {
    const json = {
      // INNs: inputINN.split(inputINN[12] === " " ? " " : ", "),
      // INNs: inputINN.split(", "),
      inn_ids: inputINN.split(", ").join(" ").split("/").join(" ").split(" "),
      scoringmodel_id: scoringModel.scoring_model,
    }
    console.log("JSON: ", json)
    alert("JSON в консоли")
    setInputINN("")
    setScoringModel({ scoring_model: "" })
  }

  return (
    <div>
      <div className="w-75 container m-auto">
        <div className="row">
          <div className="col-md-auto">
            <MyButton>Статические данные</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Расчет модели</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Выписка СКУАД</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton className={open ? "btn-primary" : ""} onClick={toggle}>
              Результаты скоринга
            </MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Журнал скоринга</MyButton>
          </div>
        </div>
      </div>

      {open && (
        // <div className="d-flex justify-content-center align-items-center w-100">
        // <div className="m-5">
        <div className=" w-75 m-auto">
          <div className="table-responsive-sm">
            <table className="table text-left table-bordered mt-5">
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
                    <table>
                      <thead>
                        <tr>
                          <td>
                            <MyInput
                              value={inputINN}
                              onChange={(e) => handleChangeINN(e)}
                              type="text"
                              placeholder="Вставьте список ИНН"
                            ></MyInput>
                          </td>
                          {/* <td>
                            <MyInput placeholder="Выражение"></MyInput>
                          </td> */}
                        </tr>
                      </thead>
                    </table>
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
            <div className="container">
              <div className="row">
                <div className="col-md-auto">
                  <MyButton>Запустить скоринг</MyButton>
                </div>
                <div className="col-md-auto">
                  <MyButton>Журнал скоринга</MyButton>
                </div>
                <div className="col-md-auto">
                  <MyButton onClick={handleSaveData}>
                    Сохранить связку параметров
                  </MyButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PipelinePage
