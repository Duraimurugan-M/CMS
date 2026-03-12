import Student from "../models/Student.js";
import generateRegNumber from "../utils/generateRegNumber.js";

export const createStudent = async (req,res)=>{

 try{

  const existingStudent = await Student.findOne({
   phone:req.body.phone
  });

  if(existingStudent){
   return res.status(400).json({
    message:"Student with this phone already exists"
   });
  }

  const regNumber = await generateRegNumber(Student);

  const student = await Student.create({
   ...req.body,
   regNumber
  });

  res.status(201).json(student);

 }catch(error){

  res.status(500).json({message:error.message});

 }

};

export const getStudents = async (req,res)=>{

 try{

  const students = await Student.find();

  res.json(students);

 }catch(error){

  res.status(500).json({message:error.message});

 }

};

export const getStudentById = async (req,res)=>{

 try{

  const student = await Student.findById(req.params.id);

  res.json(student);

 }catch(error){

  res.status(500).json({message:error.message});

 }

};

export const updateStudent = async (req,res)=>{

 try{

  const student = await Student.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  );

  res.json(student);

 }catch(error){

  res.status(500).json({message:error.message});

 }

};

export const deleteStudent = async (req,res)=>{

 try{

  await Student.findByIdAndDelete(req.params.id);

  res.json({message:"Student removed"});

 }catch(error){

  res.status(500).json({message:error.message});

 }

};