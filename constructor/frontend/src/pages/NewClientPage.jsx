import React, { useEffect, useState } from "react"
import api from "../api"
import TextField from "../components/CrmPage/Form/textField"
import Divider from "../components/CrmPage/Form/Divider"
import { Link, useParams } from "react-router-dom"
import axios from "axios"
import { validator } from "../components/utils/validator"
import SelectSearchField from "../components/CrmPage/Form/SelectSearchField"

const NewClientPage = () => {
  const params = useParams()
  const [users, setUsers] = useState()
  const [errors, setErrors] = useState({})

  const [clienData, setClientData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Отправка данных на сервер")
    setClientData({})
  }

  const handleCancle = (e) => {
    e.preventDefault()
    setClientData({})
  }

  const handleChange = (target) => {
    console.log(target)
    setClientData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }

  async function getManagers() {
    axios
      .get("http://127.0.0.1:8000/api/crm_managers/")
      .then((res) => {
        // setModels(res.data.data)
        console.log(res.data)
      })
      .catch((e) => {
        console.log(e)
      })
  }

  useEffect(() => {
    getManagers()
  }, [])

  const validatorConfig = {
    test: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
    risk: {
      isRequired: {
        message: "Это поле обязательно для заполнения",
      },
    },
  }

  const isValid = Object.keys(errors).length === 0

  // TEST
  const [testData, setTestData] = useState({
    test: "",
    risk: "",
  })
  const [testApi, setTestApi] = useState()

  const handleChangeTest = (target) => {
    console.log(target)

    setTestData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }))
  }
  const riskList = [
    { label: "Высокий риск", value: "Высокий риск", name: "risk" },
    { label: "Средний риск", value: "Средний риск", name: "risk" },
    { label: "Низкий риск", value: "Низкий риск", name: "risk" },
  ]

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data)
    })
    api.testFiedls.fetchAll().then((data) => {
      setTestApi(data)
    })
  }, [])
  useEffect(() => {
    if (params.id && users) {
      testApi && setTestData(testApi[0])
    }
  }, [testApi])

  useEffect(() => {
    validate()
  }, [testData])

  const validate = () => {
    const errors = validator(testData, validatorConfig)
    setErrors(errors)
    return Object.keys(errors).length === 0
  }

  // TEST

  return (
    <div className="container mt-3">
      <div className="row">
        <SelectSearchField
          options={riskList}
          onChange={handleChangeTest}
          name="risk"
          error={errors.risk}
          label="New label select"
        />

        <TextField
          label="label tex"
          name="test"
          value={testData.test}
          onChange={handleChangeTest}
          error={errors.test}
        />
        <div className="col-md-12 mb-4">
          <div className="card p-2">
            <form>
              <div className="row row-centered  colored">
                <button
                  type="submit"
                  className="btn btn-primary w-25 mx-auto m-2 col-sm-3"
                  onClick={handleSubmit}
                  disabled={!isValid}
                >
                  Сохранить
                </button>

                <button
                  className="btn btn-danger w-25 mx-auto m-2 col-sm-3"
                  onClick={handleCancle}
                >
                  <Link to="/crm" className="nav-link m-2">
                    Отмена
                  </Link>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewClientPage
