const { response } = require('express')
const db = require('../database/database')

const getBooks = (req, res = response) => {
  db.query('SELECT * FROM books', (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        msg: 'Query error'
      })
    }

    if (result.length === 0) {
      return res.status(204).json({
        error: false,
        msg: 'There is no content in the database'
      })
    }

    res.json({
      error: false,
      result
    })
  })
}

const getBookByID = (req, res = response) => {
  const { id } = req.params

  db.query('SELECT * FROM books WHERE id = ?', id, (err, result) => {
    if (err) {
      res.status(500).json({
        error: true,
        msg: 'Query error'
      })
    }

    if (result.length === 0) {
      res.status(204).json({
        error: false,
        msg: 'There is no book with this id'
      })
    }

    res.json({
      error: false,
      result
    })
  })
}

const createBook = (req, res = response) => {
  const book = req.body

  db.query('INSERT INTO books SET ?', book, (err) => {
    console.log(err)

    if (err) {
      return res.status(409).json({
        error: true,
        msg: err.sqlMessage
      })
    }

    res.status(201).json({
      error: false,
      msg: 'Book created'
    })
  })
}

const editBook = (req, res = response) => {
  const { id } = req.params
  const updateBook = req.body

  db.query('UPDATE books SET ? WHERE id = ?', [updateBook, id], (err) => {
    if (err) {
      return res.status(409).json({
        error: true,
        msg: err.sqlMessage
      })
    }
  })

  res.json({
    error: false,
    msg: 'Book updated'
  })
}

const deleteBook = (req, res = response) => {
  const { id } = req.params

  db.query('DELETE FROM books WHERE id = ?', id, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: true,
        msg: 'There was an error deleting the book'
      })
    }

    if (result.affectedRows === 0) {
      return res.status(204).json({
        error: true,
        msg: 'There is not a book with this id'
      })
    }

    res.json({
      error: false,
      msg: 'The book has been deleted'
    })
  })
}

module.exports = { getBooks, getBookByID, createBook, editBook, deleteBook }
