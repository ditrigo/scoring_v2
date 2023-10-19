import React, { useState } from "react"
import MyButton from "../../UI/MyButton/MyButton"
import MyInput from "../../UI/MyInput/MyInput"
import Select from "react-select"

const ModelForm = ({ create, models }) => {
  const [model, setModel] = useState({ model_name: "", description: "" })
  const [modelSelect, setModelSelect] = useState({})

  const handleChangeSelect = (target) => {
    console.log(target)
    setModelSelect((prevState) => ({
      [target.name]: target.value,
    }))
  }

  // console.log(models)
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

  const createModelBy = (e) => {
    e.preventDefault()
    const findModel = models.filter((el) => el.model_name === modelSelect.model)

    console.log("Find ", findModel[0].model_name)

    const newModel = {
      model_name: findModel[0].model_name + "copy",
      description: findModel[0].description + "copy",
      author_id: "Denis",
      status: "DF",
      version: 1,
      active: true,
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
