const express = require("express"); 
const cors = require("cors");

const {
    getProducts,
    getProductsById
} = require("./controllers/products.controllers")

const app = express();

//MIDDELWARES
app.use(cors({origin: "http://localhost:4200"}));  
 
app.get("/api/items", getProducts);

app.get("/api/items/:id", getProductsById);

app.listen(8000, () => {
    console.log("Server started!")
});
