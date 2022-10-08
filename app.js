const express = require("express")

const serverConfig = require("./configs/server.config")

const app = express()
app.use(express.json())

app.listen(serverConfig.PORT, () => {
  console.log("Server started on the port no:", serverConfig.PORT);
})
