// const validator = require('validator')
const  chalk = require('chalk')
const yargs = require('yargs')
const notesUtil = require('./notes.js')
const fs = require('fs')

// const greenMsg = chalk.red('success')
// console.log(greenMsg);
// console.log(getNotes());
// console.log("Hello world");


// console.log(yargs.argv)


// const book = {
//     title: 'AI',
//     author: 'Anigbogu'
// }
//
// const bookJson = JSON.stringify(book)
// console.log(bookJson)
//
// const bookObject = JSON.parse(bookJson)
// console.log(bookObject.title)

// const booksJson = fs.readFileSync('books.json');
//
// const bookObject = JSON.parse(booksJson.toString());
// bookObject.name = 'Tochukwu'
// bookObject.age = 21
//
// fs.writeFileSync('books.json', JSON.stringify(bookObject));

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        categoryName: {
          describe: 'Category Name',
          demandOption: true,
          type: 'string'
        },
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.addNote(argv.categoryName, argv.title, argv.body)

    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notesUtil.removeNote(argv.title)
        console.log(chalk.green('Note Removed'))
    }
})

yargs.command({
    command: 'getNote',
    describe: 'Get a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notesUtil.getNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        console.log(notesUtil.listNotes())
    }
})

//Create Category
yargs.command({
    command: 'createCategory',
    describe: 'Create a new Note Category',
    builder: {
        categoryName: {
            describe: 'Category Name',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notesUtil.createCategory(argv.categoryName);
    }
})

// Create read command
// yargs.command({
//     command: 'read',
//     describe: 'Read a note',
//     handler() {
//         console.log('Reading a note')
//     }
// })

yargs.command({
    command: 'listCategories',
    describe: 'List your Categories',
    handler() {
        console.log(notesUtil.listCategories())
    }
})

yargs.command({
    command: 'getNotesInCategory',
    describe: 'List your Category notes',
    builder: {
        categoryName: {
            describe: 'Category Name',
            demandOption: true,
            type: 'string'
        },
    },
    handler(argv) {
        notesUtil.listCategoryNotes(argv.categoryName);
    }
})

yargs.command({
    command: 'editNote',
    describe: 'Edit a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'New Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notesUtil.editNote(argv.title, argv.body)
    }
})


yargs.parse()