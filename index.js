require("dotenv").config();
const mongoose = require("mongoose");
 
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true })
    .then(() => console.log('You are now connected to Mongo!'))
    .catch(err => console.error('Something went wrong', err))

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now},
  ispublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
  const course = new Course({
    name: 'React Course',
    author: 'mosh',
    tags: ['React','FrontEnd'],
    ispublished: true
  });
  const result = await course.save();
  console.log(result);
}
//using promices
createCourse();
