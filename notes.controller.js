const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString(),
  }

  notes.push(note)

  await saveNotes(notes)
  console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
  try {
    const notes = await fs.readFile(notesPath, { encoding: 'utf-8' })
    return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
  } catch (error) {
    return []
  }
}

async function saveNotes(notes) {
  await fs.writeFile(notesPath, JSON.stringify(notes))
}

async function editNote(id, newTitle) {
  const notes = await getNotes()
  const index = notes.findIndex((note) => note.id === id)
  if (index !== -1) {
    notes[index].title = newTitle
    await saveNotes(notes)
    console.log(chalk.yellow(`Note with id="${id}" has been edited.`))
  }
}

async function removeNote(id) {
  const notes = await getNotes()
  const filtered = notes.filter((note) => note.id !== id)
  await saveNotes(filtered)
  console.log(chalk.red(`Note with id="${id}" has been removed.`))
}

module.exports = {
  addNote,
  getNotes,
  editNote,
  removeNote,
}
