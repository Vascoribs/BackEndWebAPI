const express = require ("express");
const app = express();
const appPort = 8080;

const mongoose = require("mongoose");
const mongooseQueryString = "mongodb://localhost:27017/ProjectoBackEndWebApi";
const employeeSchema = new mongoose.Schema({Name: {type: String}, EmpID: {type: Number}, Age:{type: Number}, Address:{type: String}},{collection:"Employees"});
const employeeModel = mongoose.model("Employees", employeeSchema);

mongoose.connect(mongooseQueryString);

async function queryAllEmployee(){

    try{
        let queryAllEmployeeResults = await employeeModel.find();
        console.log(queryAllEmployeeResults);
        return queryAllEmployeeResults;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

/*app.use((request,response,next) => {
    console.log(`Foi efetuado um pedido de ${request.method} ao url ${request.url}`);
    next();
}) */

app.use(express.json());

app.get("/Employees", async (request,response) => {
    let result = await queryAllEmployee();
        console.log(result);
        response.status(200).json(result);
    }
)


app.listen(appPort, () =>{console.log("Running on 127.0.0.1:"+appPort)});