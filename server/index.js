const express = require("express")
const cors = require("cors")
require("dotenv").config()
const axios = require("axios")

const app = express()
app.use(cors())
app.use(express.json())

const API_TOKEN =
  "461ee67f16e3adc5464d3368e720a1f6c5ed0e2200a0d9a90289a3618e477005"

// Get user data from the API
app.get("/api/users", async (req, res) => {
  try {
    const response = await axios.get("https://gorest.co.in/public-api/users", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    })

    res.json(response.data.data)
  } catch (error) {
    console.error("Error fetching user data:", error.message)
    res.status(500).json({ error: "An error occurred" })
  }
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
