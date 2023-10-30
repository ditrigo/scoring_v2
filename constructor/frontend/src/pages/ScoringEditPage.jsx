import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import axios from "axios"
// import MyButton from "../components/UI/MyButton/MyButton";
// import { Link } from "react-router-dom";
import SearchBar from "../components/ScoringEditPage/SearchBar/SearchBar"
import { useLocation } from "react-router-dom"
import markerSrvice from "../services/marker.service"
import modelService from "../services/model.service"

const ScoringEdit = () => {
  const [countedAttributes, setCountedAttributes] = useState([])
  // const [markers, setMarkers] = useState([])

  const { state } = useLocation()
  console.log(state)

  // async function getCountedAttributes() {
  //   axios
  //     .get("http://127.0.0.1:8000/api/marker_attributes/")
  //     .then((res) => {
  //       setCountedAttributes(res.data.data)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     })
  // }

  async function getMarkers() {
    try {
      const { data } = await markerSrvice.get()
      setCountedAttributes(data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // getCountedAttributes()
    getMarkers()
  }, [])

  // async function changeModelStatusById(status) {
  //   axios
  //     .put(`http://127.0.0.1:8000/api/scoring_model/${state.models.id}`, {
  //       status: status,
  //       author_id: "Den", // TODO CHANGE REAL SYSTEM USER. NOT HARD CODE !!
  //     })
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })
  // }
  async function changeModelStatusById(status) {
    try {
      const data = await modelService.put(state.models.id, {
        status: status,
        author_id: "Den", // TODO CHANGE REAL SYSTEM USER. NOT HARD CODE !!
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  // async function postModelAndAttributes(
  //   newLinkModelAndAttributes,
  //   statusButton
  // ) {
  //   console.log(statusButton)
  //   axios
  //     .post("http://127.0.0.1:8000/api/marker_attributes/create_relation/", {
  //       counted_attr_ids: newLinkModelAndAttributes,
  //       scoring_model_id: state.models.id,
  //     })
  //     .then(function (response) {
  //       console.log(response)
  //     })
  //     .catch(function (error) {
  //       console.log(error)
  //     })

  //   changeModelStatusById(statusButton)
  // }

  async function postModelAndAttributes(
    newLinkModelAndAttributes,
    statusButton
  ) {
    try {
      const { data } = await markerSrvice.postCreateRelation(
        `create_relation/`,
        {
          counted_attr_ids: newLinkModelAndAttributes,
          scoring_model_id: state.models.id,
        }
      )
      console.log(data)
    } catch (e) {
      console.log(e)
    }

    changeModelStatusById(statusButton)
  }

  return (
    // <div className="container">
    <SearchBar
      // attributes={markers}
      attributes={countedAttributes}
      postLink={postModelAndAttributes}
      nameModel={state.models.model_name}
      idModel={state.models.id}
      statusModel={state.models.status}
      model={state.models}
    />
    // </div>
  )
}

export default ScoringEdit
