import React, { useEffect, useState } from "react"
import MyInput from "../UI/MyInput/MyInput"
import ReactDatePicker from "react-datepicker"
import MyButton from "../UI/MyButton/MyButton"
import axios from "axios"
import modelService from "../../services/model.service"
import configFile from "../../config.json"

const TestScoringForm = ({ model }) => {
  const [inputINN, setInputINN] = useState("")
  const [startDate, setStartDate] = useState(new Date())
  // const [isSaved, setIsSaved] = useState(false)
  // const [disabledBtn, setDisabledBtn] = useState("")
  const [models, setModels] = useState([])
  const [updatedModel, setUpdatedModel] = useState()
  const [json_response, setJson_response] = useState()
  const [err, setErr] = useState("")

  // const isDisabled = model.model_name && inputINN
  const isDisabledScoring = model.model_name && inputINN //&& isSaved

  const handleChangeINN = (e) => {
    setInputINN(e.target.value)
  }

  async function getModels() {
    try {
      const { data } = await modelService.get()
      setModels([])
      setModels(data)
    } catch (e) {
      console.log(e)
    }
  }

  const doTestScoring = async () => {
    console.log("Scoring test...")
    setErr("")

    let modelFromServer = models.find(
      (el) => el.model_name === model.model_name
    )
    modelFromServer.inns = []

    inputINN
      .split(", ")
      .join(" ")
      .split("/")
      .join(" ")
      .split(" ")
      .forEach((inn) => {
        modelFromServer.inns.push({ inn: inn })
      })

    const json = {
      model: modelFromServer,
    }
    console.log("json", json)
    await axios
      .post(`${configFile.apiEndPoint}/start_test_scoring/`, json)
      .then((resp) => {
        getModels()
        setInputINN("")
        // console.log("doTestScoring RESP", resp.data.response)
        setJson_response(resp.data.response)
      })
      .catch((error) => {
        setErr(error)
      })
      .finally(() => {
        setUpdatedModel(models.find((el) => el.model_name === model.model_name))
      })
  }

  // async function handleSaveData() {
  //   await axios
  //     .post("http://127.0.0.1:8000/api/inn_res/create_relation/", {
  //       inn_ids: inputINN.split(", ").join(" ").split("/").join(" ").split(" "),
  //       active: true,
  //       scoringmodel_id: modelId,
  //       author_id: "Тестовый пользователь",
  //     })
  //     .then(function (response) {
  //       console.log("Сделать связку ", response.data)
  //       setDisabledBtn("btn btn-outline-primary disabled")
  //       setIsSaved(true)
  //       // setModels([])
  //       getModels()
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  useEffect(() => {
    getModels()
  }, [])

  return (
    <div className="container p-0">
      <div className="row">
        <div className="table-responsive-lg">
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
                  <MyInput
                    value={inputINN}
                    onChange={(e) => handleChangeINN(e)}
                    type="text"
                    placeholder="Вставьте список ИНН"
                  ></MyInput>
                </td>
              </tr>
              <tr>
                <td>Модель скоринга</td>
                <td>{model.model_name}</td>
              </tr>
              <tr>
                <td>Отчетная дата</td>
                <td>
                  <ReactDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    isClearable
                    placeholderText="I have been cleared!"
                  />
                </td>
              </tr>
              {/* <tr>
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
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row justify-content-start m-0 p-0">
        <div className="col-md-auto p-0">
          <MyButton disabled={!isDisabledScoring} onClick={doTestScoring}>
            Запустить скоринг
          </MyButton>
        </div>
        {err && (
          <span className="text-danger p-0 mt-2">
            Ошибка. Проверьте правильность формулы или наличие ИНН.
          </span>
        )}
        {/* <div className="col-md-auto">
          <MyButton
            className={disabledBtn}
            disabled={!isDisabled}
            onClick={handleSaveData}
          >
            Сохранить связку параметров
          </MyButton>
        </div> */}
      </div>
      <div className="row">
        <h3 className="mt-4">Тестовый результат:</h3>
        {updatedModel && (
          <table className="text-center table  table-bordered table-responsive">
            <thead>
              <tr>
                <th scope="col">ИНН</th>
                <th scope="col">Итоговый результат</th>
                <th scope="col">Формулы</th>
                <th scope="col">Значения</th>
              </tr>
            </thead>
            <tbody>
              {json_response?.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{info.inn}</td>
                    <td>{info.total_rank}</td>
                    <td>
                      {info.markers_and_values.map((el, index) => {
                        console.log("el", el)
                        return <tr key={index}>{el.formula}</tr>
                      })}
                    </td>
                    <td>
                      {info.markers_and_values.map((el, index) => {
                        // console.log("el", el);
                        return <tr key={index}>{el.value}</tr>
                      })}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
        {/* {updatedModel &&
          updatedModel.map((el) => {
            return (
              el.id === modelId && (
                <table className="text-center table  table-bordered table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">ИНН</th>

                      <th scope="col">Результат</th>
                    </tr>
                  </thead>
                  <tbody>
                    {el.inns.map((inn) => {
                      return (
                        <tr>
                          <td>{inn.inn}</td>
                          <td>{inn.result_score?.total_rank}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )
            )
          })} */}
      </div>
    </div>
  )
}

export default TestScoringForm
