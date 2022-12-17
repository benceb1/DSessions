const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/venues", require("./routes/venueRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/consumptions", require("./routes/consumptionRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
