require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")


const PORT=process.env.PORT || 8000;
connectToDB();
module.exports = app;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

