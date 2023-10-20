import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import ScoringPage from "../pages/ScoringPage"
import Upload from "../pages/UploadPage"
import PipelinePage from "../pages/PipelinePage"
import CrmPage from "../pages/CrmPage"
import Error from "../pages/Error"
import LoginPage from "../pages/LoginPage"
import Logout from "../pages/LogoutPage"
import ScoringEditPage from "../pages/ScoringEditPage"
import NewCrmClientPage from "../pages/NewCrmClientPage"
import ResultTable from "./PiplinePage/ResultTable"

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/upload" replace />} />
      <Route path="/scoring" element={<ScoringPage />} />
      <Route path="/scoring/:id/edit" element={<ScoringEditPage />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/pipeline" element={<PipelinePage />} />
      <Route path="/crm" element={<CrmPage />} />
      <Route path="/results" element={<ResultTable />} />
      <Route path="/error" element={<Error />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
      <Route path="/newclient/:id?" element={<NewCrmClientPage />} />
    </Routes>
  )
}

export default AppRouter
