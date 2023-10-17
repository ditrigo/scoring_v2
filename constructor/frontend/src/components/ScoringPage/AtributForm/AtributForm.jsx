import React, { useState } from "react"
import MyButton from "../../UI/MyButton/MyButton"
import MyInput from "../../UI/MyInput/MyInput"

const AtributForm = ({ create, setVisible }) => {
  const [marker, setMarker] = useState({
    name_marker_attr: "",
    attr_formulas: "",
  })

  const handleClick = (e) => {
    e.preventDefault()
    console.log(e.target)
  }

  const handleCancle = (e) => {
    e.preventDefault()
    setVisible(false)
  }

  const addNewMarker = (e) => {
    e.preventDefault()
    const newMarker = {
      ...marker,
      description: "some description",
      nested_level: 1,
      author_id: "Gr",
    }

    create(newMarker)

    setMarker({ name_marker_attr: "", attr_formulas: "" })
  }

  return (
    <form>
      <MyInput
        value={marker.name_marker_attr}
        onChange={(e) =>
          setMarker({ ...marker, name_marker_attr: e.target.value })
        }
        type="text"
        placeholder="Наименование маркера"
      />
      <MyInput
        value={marker.attr_formulas}
        onChange={(e) =>
          setMarker({ ...marker, attr_formulas: e.target.value })
        }
        type="text"
        placeholder="Формула"
      />
      <MyButton className="btn-outline-primary m-2" onClick={addNewMarker}>
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
