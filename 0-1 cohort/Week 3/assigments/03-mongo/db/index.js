const mongoose = require('mongoose');
const { string, number } = require('zod');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:1UP8hTkZ11Pfs853@cluster0.7hxnq9e.mongodb.net/app');

// Define schemas
const AdminSchema = new mongoose.Schema({
    userName: String,
    password: String
});

const UserSchema = new mongoose.Schema({

});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    imgaeUrl: String,
    price: Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}