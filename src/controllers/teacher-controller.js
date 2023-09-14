const teacherServices = require('../services/teacher-service')
const teacherController = {
  addLesson: (req, res) => {
    teacherServices.addLesson(req, (err, data) => {
      if (err) return res.status(400).json({ status: 'error', message: err.message })
      else return res.json({ data })
    })
  },
  showMe: (req, res) => {
    teacherServices.showMe(req, (err, data) => {
      if (err) return res.status(400).json({ status: 'error', message: err.message })
      else return res.json({ data })
    })
  },
  getTeachers: (req, res) => {
    teacherServices.getTeachers(req, (err, data) => {
      if (err) return res.status(400).json({ status: 'error', message: err.message })
      else return res.json({ data })
    })
  },
  getTeacher: (req, res) => {
    teacherServices.getTeacher(req, (err, data) => {
      if (err) return res.status(400).json({ status: 'error', message: err.message })
      else return res.json({ data })
    })
  },
  putTeacher: (req, res) => {
    teacherServices.putTeacher(req, (err, data) => {
      if (err) return res.status(400).json({ status: 'error', message: err.message })
      else return res.json({ data })
    })
  }
}
module.exports = teacherController
