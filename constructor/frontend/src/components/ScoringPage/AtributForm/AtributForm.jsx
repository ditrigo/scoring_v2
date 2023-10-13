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

  const addNewAttr = (e) => {
    e.preventDefault()
    const newAttr = {
      ...atribut,
    }

    create(newAttr)

    setAtribut({ name: "", formula: "" })
  }

  return (
    <form>
      <MyInput
        value={atribut.name}
        onChange={(e) => setAtribut({ ...atribut, name: e.target.value })}
        type="text"
        placeholder="Наименование маркера"
      />
      <MyInput
        value={atribut.formula}
        onChange={(e) => setAtribut({ ...atribut, formula: e.target.value })}
        type="text"
        placeholder="Формула"
      />
      <MyButton className="btn-outline-primary m-2" onClick={addNewAttr}>
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
