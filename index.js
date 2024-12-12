const express = require ("express");
const app = express();
const appPort = 8080;

const mongoose = require("mongoose");
const mongooseQueryString = "mongodb://localhost:27017/ProjectoBackEndWebApi";
const employeeSchema = new mongoose.Schema({Name: {type: String}, EmpID: {type: Number}, Age:{type: Number}, Address:{type: String}})
const employeeModel = mongoose.model("Employees", employeeSchema);

async function queryAllEmployee(){
    try{
        mongoose.connect(mongooseQueryString);
        let queryAllEmployeeResults = await employeeModel.find();
        return queryAllEmployeeResults;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

app.use((request,response,next) => {
    console.log(`Foi efetuado um pedido de ${request.method} ao url ${request.url}`);
    next();
})

app.use(express.json());

app.get('/', (request,response) => {
    response.send(queryAllEmployeeResults)
})

queryAllEmployee()

app.listen(appPort, () =>{console.log("Running on 127.0.0.1:"+appPort)});