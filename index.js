const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 3000;
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const blogRouter = require('./routes/blogRoutes');
const prodCategoryRouter = require('./routes/prodCategoryRoutes');
const blogCategoryRouter = require('./routes/blogCategoryRoutes');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');



app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
dbConnect();

app.use("/api/u", authRouter);
app.use("/api/p", productRouter);
app.use("/api/b", blogRouter);
app.use("/api/bc", blogCategoryRouter);
app.use("/api/pc", prodCategoryRouter);


app.use(errorHandler);

app.use(notFound);

app.listen(port, () => {
    console.log(`Server is running at ${port}`);
});




