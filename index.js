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
//using promices //
// createCourse();

//quering to the database
// async function getCourses(){
//   const courses = await Course
//     .find({author: 'mosh', isPublshed: true})
//     .limit(10)
//     .sort({name: 1})
//     .select({ name: 1, tags:1});
//   console.log(courses);
// }
// getCourses();

//applying FILTERS through mongoDB operator
// eq equal
// ne not equal
// gt greater than
// gte greater than or equal to
// lt less than
// lte less than or equal to 
// in 
// nin not in 

// async function getCourses(){
//   const courses = await Course
//     .find({price : {$gte : 10, $lte: 20}})
//     .find({price: { $in:[10,15,20]}})
//   console.log(courses);
// }
// getCourses();


//and & or logical operators
  // .find()
  // .or([{author: 'mosh'},{isPublshed: true}])
  // .and([])


//REGULAR expression
// syntax: /pattern/

async function getCourses(){
  const courses = await Course
    //starts with mosh
    .find({author: /^mosh/})
    //ends with mosh
    .find({author: /hamendani$/i})
    //contains mosh
    .find({author: /.*mosh.*/i})
    .limit(10)
    .sort({name: 1})
    .select({ name: 1, tags:1});
  console.log(courses);
}
getCourses();