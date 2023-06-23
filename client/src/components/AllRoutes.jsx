import React from "react"
import { Routes, Route } from "react-router-dom"
import EditUser from "./EditUser"
import EditSingleUser from "./EditSingleUser"

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<EditUser />} />
      <Route path="/user/update/:id" element={<EditSingleUser />} />
    </Routes>
  )
}

export default AllRoutes
