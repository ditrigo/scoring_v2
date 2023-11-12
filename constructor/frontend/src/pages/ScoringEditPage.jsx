import React, { useEffect, useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
// import axios from "axios"
// import MyButton from "../components/UI/MyButton/MyButton";
// import { Link } from "react-router-dom";
import SearchBar from "../components/ScoringEditPage/SearchBar/SearchBar"
import { useLocation } from "react-router-dom"
import markerSrvice from "../services/marker.service"
import modelService from "../services/model.service"
import httpService from "../services/http.service"

const ScoringEdit = () => {
  const [countedAttributes, setCountedAttributes] = useState([])
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState({})
  const [linkedMarkers, setLinkedMarkers] = useState([])

  const { state } = useLocation()

  const getModels = async () => {
    try {
      const { data } = await modelService.get()
      data.find((el) => el.id === state.models.id)
      setCurrentModel(data.find((el) => el.id === state.models.id))

      setModels(data)
    } catch (e) {
      console.log(e)
    }
  }

  async function getMarkers() {
    try {
      const { data } = await markerSrvice.get()
      setCountedAttributes(data)
    } catch (e) {
      console.log(e)
    }
  }

  async function getLinkedMarkers() {
    try {
      const { data } = await modelService.getLinkedMarkers(state.models.id)
      // console.log("from service ", data.marker_id)
      setLinkedMarkers(data.marker_id)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getMarkers()
    getModels()
    getLinkedMarkers()
  }, [])

  async function changeModelStatusById(status) {
    try {
      const data = await modelService.put(state.models.id, {
        status: status,
        author_id: "Тестовый пользователь", // TODO CHANGE REAL SYSTEM USER. NOT HARD CODE !!
      })
      // console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

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
      // console.log(newLinkModelAndAttributes)
      setModels([])
      setCurrentModel({})
      getModels()
      getLinkedMarkers()
    } catch (e) {
      console.log(e)
    }

    changeModelStatusById(statusButton)
  }

  async function deleteMarkerFromModel(markerId) {
    try {
      const { data } = await httpService.get(
        `delete_marker/${state.models.id}/${markerId}`
      )
      // console.log(data)
      getLinkedMarkers()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    console.log("hi from effect")
  }, [linkedMarkers])

  return (
    // <div className="container">
    <SearchBar
      // attributes={markers}
      attributes={countedAttributes}
      postLink={postModelAndAttributes}
      nameModel={state.models.model_name}
      idModel={state.models.id}
      statusModel={state.models.status}
      model={currentModel}
      linkedMarkers={linkedMarkers}
      deleteMarkerFromModel={deleteMarkerFromModel}
    />
    // </div>
  )
}

export default ScoringEdit
