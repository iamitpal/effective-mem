import React, { useState, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import { Link, useParams, useNavigate } from "react-router-dom"

const EditSingleUser = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [status, setStatus] = useState("")

  const navigate = useNavigate()
  const params = useParams()

  const productId = params.id

  // console.log(productId)

  const getData = async () => {
    return await axios
      .get(`https://backendserverr-b6aa.onrender.com/api/user/${productId}`)
      .then((res) => {
        console.log(res.data)
      })
  }

  const obj = {
    name,
    email,
    gender,
    status,
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.patch(`https://backendserverr-b6aa.onrender.com/api/user/update/${productId}`, obj)
    alert("User Updated Successfully")
    navigate("/")
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div
      style={{
        width: "600px",
        margin: "auto",
      }}
    >
      <Link to={`/`} className="btn btn-light my-3">
        Go Back
      </Link>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            required
            type="gender"
            placeholder="Enter Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            required
            type="status"
            placeholder="Enter Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Update
        </Button>
      </Form>
    </div>
  )
}

export default EditSingleUser
