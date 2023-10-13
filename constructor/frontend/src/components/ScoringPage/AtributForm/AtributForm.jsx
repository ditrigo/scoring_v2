import React, { useState } from "react"
import MyButton from "../../UI/MyButton/MyButton"
import MyInput from "../../UI/MyInput/MyInput"

const AtributForm = ({ create, setVisible }) => {
  //   const [model, setModel] = useState({ name_counted_attr: "", formula: "" })
  const [atribut, setAtribut] = useState({ name: "", formula: "" })

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  const handleCancle = (e) => {
    e.preventDefault()
    setVisible(false)
  }

  //   const addNewModel = (e) => {
  //     e.preventDefault()
  //     const newModel = {
  //       ...model,
  //       author_id: "Denis",
  //       status: "DF",
  //       version: 1,
  //       active: true,
  //     }

  //     create(newModel)

  //     setModel({ model_name: "", description: "" })
  //   }

  return (
    <form>
      <MyInput
        value={atribut.name}
        onChange={(e) => setAtribut({ ...atribut, name: e.target.value })}
        type="text"
        placeholder="Наименование атрибута"
      />
      <MyInput
        value={atribut.formula}
        onChange={(e) => setAtribut({ ...atribut, formula: e.target.value })}
        type="text"
        placeholder="Формула"
      />
      <MyButton className="btn-outline-primary m-2" onClick={handleClick}>
        Сохранить
      </MyButton>
      <MyButton className="btn-outline-primary m-2" onClick={handleClick}>
        Применить
      </MyButton>
      <MyButton className="btn-outline-primary m-2" onClick={handleCancle}>
        Отменить
      </MyButton>
    </form>
  )
}

export default AtributForm
