const validator = require('validator')
const fs = require('fs')
const chalk = require('chalk')

const loadNotes =  () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch (e) {
        return [];
    }
}

const getNote =  (title) => {
    const notes  = loadNotes()

    const note = notes.find((note)=> note.title === title)

    if (!note){
        console.log(chalk.inverse.red('No note found with title ' + title))
    }else{
        console.log("Reading Note .......")
        console.log(note.body)
    }

}

const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse.green('Your notes'))
    notes.forEach((note) => console.log(note.title))
}

const addNote =  (category, title, body) => {
    const notes = loadNotes();
    const categories = loadCategories();

    const chosenCategory = categories.filter((cat) => cat.categoryName === category)
    const otherCategories = categories.filter((cat) => cat.categoryName !== category)

    const duplicateNote = notes.find((note) => note.title === title)

    if (!chosenCategory){
        console.log("Category not found")
        return;
    }

    if (!duplicateNote){ //!undefined checks if a variable is undefined
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes);
        chosenCategory[0].notes.push({
            title: title,
            body: body
        });

        otherCategories.push(chosenCategory);
        saveCategory(categories);

        console.log(chalk.green('Added New Note'))
    }else {
        console.log(chalk.red('Note with title already exists'))
    }

}

const  deleteNote = (title) => {
    const notes = loadNotes();
    const categories = loadCategories();



    let category = categories.filter((cat) => {
        const note = cat.notes.filter((note) => note.title === title)
        if (note) {
            return cat;
        }
    })

    const index = category[0].notes.findIndex(value => value.title === title);

    category[0].notes.splice(index);

    if (category[0].notes.length === 0){
        categories.splice(categories.findIndex(cat => cat.categoryName === category[0].categoryName))
    }


    const newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes)
    saveCategory(categories)
}

const createCategory = (categoryName) => {
    const categories = loadCategories();

    const duplicateCategory = categories.find((category) => category.categoryName === categoryName)

    if (!duplicateCategory){
        categories.push({
            categoryName,
            notes:[]
        })

        saveCategory(categories);
        console.log(chalk.green('Added New Category'))
    }else {
        console.log(chalk.red('Category with Name already exists'))
    }
}

const listCategories = () => {
    const categories = loadCategories()

    console.log(chalk.inverse.green('Your Categories'))
    categories.forEach((category) => console.log(category.categoryName))
}

const loadCategories = () => {
    try {
        const dataBuffer = fs.readFileSync('categories.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    }catch (e) {
        return [];
    }
}
const listCategoryNotes = (categoryName) => {
    const categories = loadCategories()
    const chosenCategory = categories.filter((cat) => cat.categoryName === categoryName)

    if (!chosenCategory){
        console.log("Category not found")
    }else {
        console.log(chosenCategory[0].notes)
    }

}

const saveCategory = (categories) => fs.writeFileSync('categories.json', JSON.stringify(categories));

const saveNotes =  (notes) => fs.writeFileSync('notes.json', JSON.stringify(notes));

const editNote = (title, noteBody) => {
    const notes  = loadNotes()

    const note = notes.find((note)=> note.title === title)
    const noteIndex = note.index;

    if (!note){
        console.log(chalk.inverse.red('No note found with title ' + title))
    }

    note.body = noteBody;

    notes[noteIndex] = note;

    saveNotes(notes);

    console.log(chalk.green("Note Updated"));
}

module.exports = {
    getNote: getNote,
    addNote: addNote,
    removeNote: deleteNote,
    listNotes: listNotes,
    createCategory: createCategory,
    listCategories,
    listCategoryNotes,
    editNote
}