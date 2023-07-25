const express = require("express");

const app = express();
const genresRouter=require('./routers/genresRouter')
app.use(express.json());


app.use('/api/genres',genresRouter);


module.exports=app;



