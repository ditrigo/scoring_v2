import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import MyButton from "../components/UI/MyButton/MyButton";
import { Link } from "react-router-dom";

const ScoringEdit = () => {
  const [countedAttributes, setCountedAttributes] = useState([]);

  async function getCountedAttributes() {
    axios
      .get("http://127.0.0.1:8000/api/scoring_model/")
      .then((res) => {
        console.log(res.data.data);
        setCountedAttributes(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    console.log("useEffect");
    getCountedAttributes();
  }, []);

  return (
    <div>
      <div className="row">
        <select
          className="form-select form-select-sm"
          aria-label=".form-select-sm example"
        >
          <option value="">--Please choose an option--</option>
          {countedAttributes.map((attribute, index) => {
            return (
              <option value={attribute.id} key={attribute.id}>
                {attribute.model_name}
              </option>
            );
          })}
        </select>
        <div className="row">
          <MyButton type="submit">Сохранить</MyButton>
          <MyButton type="submit">Утвердить</MyButton>
          <Link to={`/scoring`} className="btn btn-outline-secondary" type="submit">Отменить</Link>
        </div>
      </div>
    </div>
  );
};

export default ScoringEdit;
