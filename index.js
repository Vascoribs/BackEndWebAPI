const express = require ("express");
const app = express();
const appPort = 8080;

const mongoose = require("mongoose");
const mongooseQueryString = "mongodb://localhost:27017/ProjectoBackEndWebApi";
const employeeSchema = new mongoose.Schema({Name: {type: String}, EmpID: {type: Number}, Age:{type: Number}, Address:{type: String}},{collection:"Employees"});
const employeeModel = mongoose.model("Employees", employeeSchema);

mongoose.connect(mongooseQueryString);

//função obter todos Employees
async function queryAllEmployee(){

    try{
        let queryAllEmployeeResults = await employeeModel.find();
        return queryAllEmployeeResults;
    }
    catch(error){
        console.log(error);
        return [];
    }
}

app.use(express.json());

app.get("/Employees", async (request,response) => {
    let result = await queryAllEmployee();
        response.status(200).json(result);
    }
)

//função obter apenas um Employee
async function queryOneEmployee(params){

    try{
        let queryOneEmployeeResults = await employeeModel.findById(params);
        return queryOneEmployeeResults;
    }
    catch(error){
        console.log(error);
        return [];
    }
} 

app.get("/Employees/:id", async (request,response) => {
    let resultOne = await queryOneEmployee(request.params.id);
    response.send(resultOne)
})

//função adicionar Employee
async function addEmployee(body){
    let Employee = new employeeModel({
        Name: body.Name,
        EmpID: body.EmpID,
        Age: body.Age,
        Address: body.Address,
    });
    try{
        await Employee.save();
    }
    catch(error){
        return "error";
    }
}

app.post("/Employees", async function (request,response) {
    let result = await addEmployee(request.body);
    response.json(result)
})

//função update Employee
app.put("/Employees/:id", async function (request,response){
    try{
        const{id} = request.params;

        const Employee = await employeeModel.findByIdAndUpdate(id, request.body);

        if(!Employee) {
            return response.status(404).json({message: "Employee Not Found"});
        }

        const updatedEmployee = await employeeModel.findById(id);
        response.status(200).json(updatedEmployee)
    }
    catch(error){
        response.status(500).json({message: error.message});
    }
});

app.listen(appPort, () =>{console.log("Running on 127.0.0.1:"+appPort)});