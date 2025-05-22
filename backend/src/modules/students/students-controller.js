const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    res.status(200).json(students);

});

const handleAddStudent = asyncHandler(async (req, res) => {
    const newStudent = await addNewStudent(req.body);
    res.status(201).json({ message:'Student added', data: newStudent });

});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const updated = await updateStudent(id, req.body);
    res.status(200).josn({ message: 'Student Updated', data: updated });

});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const student = await getStudentDetail(id);
    if (!student) {
        res.status(404);
        throw new Error('Student not found');
  }
  res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await setStudentStatus(id, status);
  res.status(200).json({ message: 'Status updated', data: updated });
    
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
