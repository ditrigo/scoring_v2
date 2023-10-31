import React, { useState } from "react"
import axios from "axios"
import MyButton from "../components/UI/MyButton/MyButton"
import "bootstrap/dist/css/bootstrap.css"
import "../styles/App.css"
import configFile from "../config.json"

const LoginPage = ({ setIsAuth }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [err, settErr] = useState("")
  // console.log(configFile.apiEndPoint)

  // Create the submit method.
  const submit = async (e) => {
    try {
      e.preventDefault()
      const user = {
        username: username,
        password: password,
      }
      // Create the POST requuest
      const { data } = await axios.post(
        `${configFile.apiEndPoint}/token/`,
        user,
        {
          headers: { "Content-Type": "application/json" },
        },
        { withCredentials: true }
      )
      // Initialize the access & refresh token in localstorage.
      localStorage.clear()
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data["access"]}`
      window.location.href = "/upload"
    } catch (err) {
      console.log(err)
      settErr(err)
    }
  }

  return (
    <div className="Auth-form-container text-center w-25 h-75 m-auto">
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Войти</h3>
          <div className="form-group mt-3">
            <label>Пользователь</label>
            <input
              className="form-control mt-1"
              placeholder="Введите логин"
              name="username"
              type="text"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group mt-3 mb-3">
            <label>Пароль</label>
            <input
              name="password"
              type="password"
              className="form-control mt-1"
              placeholder="Введите пароль"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {err && (
            <span className="text-danger">
              Ошибка авторизации. Проверьте правильность набранных данных.
            </span>
          )}
          <div className="d-grid gap-2 mt-3">
            <MyButton type="submit" className="btn btn-primary">
              Подтвердить
            </MyButton>
          </div>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
