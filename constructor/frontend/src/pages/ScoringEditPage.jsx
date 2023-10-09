import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
// import MyButton from "../components/UI/MyButton/MyButton";
// import { Link } from "react-router-dom";
import SearchBar from "../components/ScoringEditPage/SearchBar/SearchBar";
import { useLocation } from 'react-router-dom';


const ScoringEdit = () => {

  const [countedAttributes, setCountedAttributes] = useState([]);
  const { state } = useLocation();

  async function getCountedAttributes() {
    axios
      .get("http://127.0.0.1:8000/api/counted_attributes/")
      .then((res) => {
        setCountedAttributes(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getCountedAttributes();
  }, []);

  async function changeModelStatusById() {
    axios.put(`http://127.0.0.1:8000/api/scoring_model/${state.models.id}`, {
        status: "AP",
        author_id: "Den" // TODO CHANGE REAL SYSTEM USER. NOT HARD CODE !!
    }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async function postModelAndAttributes(newLinkModelAndAttributes) {
    axios
      .post("http://127.0.0.1:8000/api/counted_attributes/create_relation/", {
        counted_attr_ids: newLinkModelAndAttributes,
        scoring_model_id: state.models.id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

      changeModelStatusById();
  }

  return (
    <div>
      <SearchBar attributes={countedAttributes} postLink={postModelAndAttributes}/>
    </div>
  );
};

export default ScoringEdit;
