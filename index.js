const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
dbConnect();

app.use("/api/user", authRouter);

app.use(errorHandler);

app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});




