import "../../../index.css"
import { InboxOutlined } from "@ant-design/icons"
import type { UploadProps } from "antd"
import { message, Upload } from "antd"
import React from "react"
import configFile from "../../../config.json"

const { Dragger } = Upload

const props: UploadProps = {
  name: "filename", // это название колонки в БД
  multiple: true,
  action: `${configFile.apiEndPoint}/attributes/`, // путь куда передавать данные
  onChange(info) {
    const { status } = info.file
    if (status !== "uploading") {
      console.log("vot", info.file)
    }
    if (status === "done") {
      message.success(`${info.file.name} файл загружен успешно.`)
    } else if (status === "error") {
      message.error(`${info.file.name} файл не загружен.`)
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
