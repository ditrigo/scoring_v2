import React, { useState, useEffect } from "react";
import MyButton from "../../UI/MyButton/MyButton";
import MyInput from "../../UI/MyInput/MyInput";
import Select from "react-select"
import axios from "axios";

const AtributForm = ({ create, setVisible }) => {
  const [marker, setMarker] = useState({
    name_marker_attr: "",
    attr_formulas: "",
  });
  const [importedAttributes, setImportedAttributes] = useState([])
  const [countedAttributes, setCountedAttributes] = useState([])

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   console.log(e.target);
  // };

  // const handleChangeSelect = (target) => {
  //   console.log(target)
  //   setUsersData((prevState) => ({
  //     ...prevState,
  //     [target.name]: target.value,
  //   }))
  // }

  const handleCancle = (e) => {
    e.preventDefault();
    setVisible(false);
  };

  const addNewMarker = (e) => {
    e.preventDefault();
    const newMarker = {
      ...marker,
      description: "some description",
      nested_level: 1,
      author_id: "Gr",
    };

    create(newMarker);

    setMarker({ name_marker_attr: "", attr_formulas: "" });
  };

  async function getAttributes() {
    axios
      .get("http://127.0.0.1:8000/api/catalog_fields/")
      .then((res) => {
        // importedAttributes(res.data.data)
        console.log(res.data.data)
        res.data.data.forEach(element => {
          console.log(element.main_catalog_id.description)
          console.log(element)
          if (element.main_catalog_id.origin_name === 'counted_attributes_new') {
            setCountedAttributes((current) => [
              ...current,
              { label: 'counted_attributes.' + element.origin + ' - ' + element.description, 
                value: 'counted_attributes.' + element.origin + ' - ' + element.description,
                name: 'counted_attributes.' + element.origin + ' - ' + element.description}
            ])
          } else {
            setImportedAttributes((current1) => [
              ...current1,
              { label: 'csv_attributes.' + element.origin + ' - ' + element.description, 
                value: 'csv_attributes.' + element.origin + ' - ' + element.description,
                name: 'csv_attributes.' + element.origin + ' - ' + element.description}
            ])
          }
        });
      })
      .catch((e) => {
        console.log(e)
      })
  }
  useEffect(() => {
    getAttributes()
  }, [])

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
      <div className="row">
        <div className="col">
          <div className="row">
            <label>Вычисляемые Атрибуты</label>
          </div>
          <div className="row mb-3">
            <Select
              options={importedAttributes}
              // onChange={handleChangeSelect}
              // name="Тип долга"
              placeholder="Выберите"
            />
          </div>
        </div>
        <div className="col">
          <div className="row">
            <label>Загружаемые Атрибуты</label>
          </div>
          <div className="row md-auto">
            <Select
              options={countedAttributes}
              // onChange={handleChangeSelect}
              // name="Тип долга"
              placeholder="Выберите"
            />
          </div>
        </div>
      </div>
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
      {/* <MyButton className="btn-outline-primary m-2" onClick={handleClick}>
        Применить
      </MyButton> */}
      <MyButton className="btn btn-outline-secondary m-2" onClick={handleCancle}>
        Отменить
      </MyButton>
    </form>
  );
};

export default AtributForm;
