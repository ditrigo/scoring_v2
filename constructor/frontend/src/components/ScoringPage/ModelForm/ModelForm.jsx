import React, { useState } from "react"
import MyButton from "../../UI/MyButton/MyButton"
import MyInput from "../../UI/MyInput/MyInput"
import Select from "react-select"
import axios from "axios"

const ModelForm = ({ create, models, getLinkMarkers }) => {
  const [model, setModel] = useState({ model_name: "", description: "" })
  const [modelSelect, setModelSelect] = useState({})
  // const [linkMarkers, setLinkMarkers] = useState([])

  const handleChangeSelect = (target) => {
    console.log("target", target)
    setModelSelect((prevState) => ({
      [target.name]: target.value,
    }))
  }

  // console.log("models", models)
  const modelsForSelect = []

  models &&
    models.forEach((el) => {
      modelsForSelect.push({
        label: el.model_name,
        value: el.model_name,
        name: "model",
      })
    })

  const addNewModel = (e) => {
    e.preventDefault()
    const newModel = {
      ...model,
      author_id: "Denis",
      status: "DF",
      version: 1,
      active: true,
    }
    create(newModel)

    setModel({ model_name: "", description: "" })
  }

  // async function postLinkMarkerAndModel(newModel) {
  //   // TODO получить все id маркеров
  //   const marker_ids = []
  //   newModel.marker_id.forEach((marker) => {
  //     marker_ids.push(marker.id)
  //   })
  //   linkMarkers(marker_ids)
  //   console.log("marker_ids", marker_ids)
  //   console.log("newModel.id", newModel.id)
  //   axios
  //     .post("http://127.0.0.1:8000/api/marker_attributes/create_relation/", {
  //       counted_attr_ids: marker_ids,
  //       scoring_model_id: newModel.id,
  //     })
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }

  const createModelBy = (e) => {
    e.preventDefault()
    const findModel = models.filter((el) => el.model_name === modelSelect.model)
    // const findMarkers = model.filter((el) => el )

    // console.log("Find ", findModel[0].model_name)
    // console.log("findModel", findModel)
    // console.log("findModel[0].marker_id", findModel[0].marker_id)
    // postLinkMarkerAndModel(findModel[0])

    let marker_ids = []
    findModel[0].marker_id.forEach((marker) => {
      marker_ids.push(marker.id)
    })
    // console.log("marker_ids modelFormJSX", marker_ids)
    getLinkMarkers(marker_ids)

    const newModel = {
      model_name: model.model_name,
      description: model.description,
      author_id: "Denis",
      status: "DF",
      version: 1,
      active: true,
      // marker_id: [findModel[0].marker_id],
    }

    create(newModel)
  }

  return (
    <form>
      <MyInput
        value={model.name_model}
        onChange={(e) => setModel({ ...model, model_name: e.target.value })}
        type="text"
        placeholder="Название модели"
      />
      <MyInput
        value={model.description}
        onChange={(e) => setModel({ ...model, description: e.target.value })}
        type="text"
        placeholder="Описание модели"
      />
      <MyButton className="btn-outline-primary mt-2" onClick={addNewModel}>
        Создать модель
      </MyButton>
      <Select
        options={modelsForSelect}
        onChange={handleChangeSelect}
        name="model"
        placeholder="Выберите модель"
        className="mt-2"
      />

      <MyButton className="btn-outline-primary mt-2" onClick={createModelBy}>
        Создать на основании модели
      </MyButton>
    </form>
  )
}

export default ModelForm
