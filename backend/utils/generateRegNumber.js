const generateRegNumber = async (Student) => {

  const year = new Date().getFullYear();

  const count = await Student.countDocuments();

  const number = (count + 1).toString().padStart(4, "0");

  return `CMS${year}-${number}`;
};

export default generateRegNumber;