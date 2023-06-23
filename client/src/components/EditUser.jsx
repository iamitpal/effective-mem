import React, { useEffect, useState } from "react"
import { Button, Table, Row, Col, Form } from "react-bootstrap"
import axios from "axios"
import { Link } from "react-router-dom"

const EditUser = () => {
  const [products, setProduct] = useState([])
  const [model, setModel] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [gender, setGender] = useState("")
  const [status, setStatus] = useState("")

  const getData = async () => {
    return await axios.get(`https://backendserverr-b6aa.onrender.com/api/user`).then((res) => {
      setProduct(res.data)
      // console.log(res.data)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  // console.log(products)

  const deleteHandler = async (id) => {
    // console.log("delete");
    if (window.confirm("Are you sure want to delete User?")) {
      await axios.delete(`https://backendserverr-b6aa.onrender.com/api/user/delete/${id}`)
    }
    getData()
  }
  const createProductHandler = () => {
    //CREATE PRODUCT
    setModel(true)
  }

  const obj = {
    name,
    email,
    gender,
    status,
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    await axios.post(`https://backendserverr-b6aa.onrender.com/api/user/add/`, obj)
    setModel(false)
    getData()
  }

  const exportData = async () => {
    console.log("Invoked")
    await axios.get(`https://backendserverr-b6aa.onrender.com/api/user/exportcsv`, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": "attachment:filename=usersData.csv",
      },
    })
  }
  return (
    <>
      {model ? (
        <div
          style={{
            position: "relative",
            width: "600px",
            margin: "auto",
          }}
        >
          <Link onClick={() => setModel(false)} className="btn btn-light my-3">
            Close Model
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
              Add User
            </Button>
          </Form>
        </div>
      ) : (
        <div>
          <Row className="align-items-center">
            <Col>
              <h1>Products</h1>
            </Col>
            <Col className="text-right">
              <Button className="my-3" onClick={createProductHandler}>
                <i className="fas fa-plus"></i> Create Product
              </Button>
            </Col>
            <Col className="text-right">
              <Button className="my-3" onClick={exportData}>
                <i className="fas fa-plus"></i> Export CSV
              </Button>
            </Col>
          </Row>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>E-mail</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{product.gender}</td>
                    <td>{product.status}</td>
                    <td>
                      <Link to={`/user/update/${product._id}`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  )
}

export default EditUser
