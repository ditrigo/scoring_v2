import "../../../index.css"
import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { message, Upload } from "antd"
import axios from "axios"
import React from "react"

const { Dragger } = Upload

const props: UploadProps = {
  name: "filename", // это название колонки в БД
  multiple: true,
  action: "http://127.0.0.1:8000/api/attributes/", // путь куда передавать данные
  onChange(info) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log("vot", info.file, info.fileList)
      axios
        .post("http://127.0.0.1:8000/api/files/", info.file)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files)
  },
}

const OldUploadBlock: React.FC = () => (
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">
      Нажмите или перенесите файл в эту область для загрузки
    </p>
  </Dragger>
)

export default OldUploadBlock
