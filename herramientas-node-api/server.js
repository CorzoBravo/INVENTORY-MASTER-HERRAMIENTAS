const express = require("express");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const { errorHandler } = require("./middleware/error-handler");
const { sequelize } = require("./models");
const swaggerSpec = require("./config/swagger");

const app = express();
app.use(express.json());
const cors = require("cors")

const PORT = process.env.PORT || 3000;

app.get("/api-docs.json", (req, res) => res.json(swaggerSpec));
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Herramientas Node API - Docs",
    swaggerOptions: { persistAuthorization: true },
  }),
);

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});
app.use(cors())
app.use(express.json())
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/categorias", require("./routes/categoria.routes"));
app.use("/api/clientes", require("./routes/cliente.routes"));
app.use("/api/productos", require("./routes/producto.routes"));
app.use("/api/ventas", require("./routes/venta.routes"));

app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexion a BD establecida");

    await sequelize.sync();
    console.log("Base recreada correctamente");

    app.listen(PORT, () => {
      console.log("Servidor disponible en el puerto: " + PORT);
      console.log("Documentacion Swagger en: http://localhost:" + PORT + "/");
    });
  } catch (error) {
    console.error("Error al iniciar servidor:", error);
    process.exit(1);
  }
};

start();
