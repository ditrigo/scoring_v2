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
        // console.log(res.data.data);
        setCountedAttributes(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    // console.log("useEffect ScoringEdit");
    getCountedAttributes();
    // console.log("state.models.id = ", state.models.id)
  }, []);

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
  }

  return (
    <div>
      <SearchBar attributes={countedAttributes} postlink={postModelAndAttributes}/>
    </div>
  );
};

export default ScoringEdit;
