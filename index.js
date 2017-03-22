#!/usr/bin/env node

const program = require('commander')

// Subcommands
//
const newcmd = require('./new')  // 'new' is a keyword
const build = require('./build')
const preview = require('./preview')
const epub = require('./epub')
const pdf = require('./pdf')

// Version
//
program
  .version('0.1.0')

// quire new
//
// Create a new Quire project in the current directory
// Should run necessary setup scripts after init
//
program
  .command('new <projectName>')
  .description('Create a new Quire project in the current directory.')
  .action(function(projectName) {
    newcmd(projectName)
  })

// quire preview
//
// run the preview server in the current directory
// Pass options to hugo?
//
program
  .command('preview [options]')
  .description('Run the preview server in the current directory')
  .action(function() {
    preview()
  })


// quire build
//
// run the build command in the current directory
// Pass options to hugo?
//
program
  .command('build [options]')
  .description('Run the build command in the current directory')
  .action(function(options) {
    build()
  })

// quire pdf
//
// run the build command in the current directory
// Pass options to hugo?
//
program
  .command('pdf')
  .description('Generate a PDF version of the current project')
  .action(function() {
    pdf()
  })

// quire epub
//
// run the build command in the current directory
// Pass options to hugo?
//
program
  .command('epub')
  .description('Generate an EPUB version of the current project')
  .action(function() {
    epub()
  })

// Run the program
//
program.parse(process.argv);
