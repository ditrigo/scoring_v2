import React, { useState } from "react"
import MyButton from "../components/UI/MyButton/MyButton"
import MyInput from "../components/UI/MyInput/MyInput"
import "bootstrap/dist/css/bootstrap.css"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import SelectField from "../components/CrmPage/Form/SelectField"

const PipelinePage = () => {
  const [open, setOpen] = useState(false)
  //   Для отображения в дальнейшем различных элементов
  const [block, setBlock] = useState([
    { name: "Статические данные", open: false },
    { name: "Расчет модели", open: false },
    { name: "Выписка СКУАД", open: false },
    { name: "Журнал скоринга", open: false },
  ])
  const [startDate, setStartDate] = useState(new Date())

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

  const scoringOptions = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
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
      <div className="container">
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
            <MyButton onClick={toggle}>Результаты скоринга</MyButton>
          </div>
          <div className="col-md-auto">
            <MyButton>Журнал скоринга</MyButton>
          </div>
        </div>
      </div>

      {open && (
        <div>
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
