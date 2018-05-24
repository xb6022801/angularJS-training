const path = require('path'),
      fs = require('fs'),
      argvs = process.argv.slice(2),
      filename = 'index.js'

let projectname,
    templateMap = {
      'default': 
        `
          const fs = require('fs')
        `
      ,
      'command-cli':
        `
          console.log('command-cli')
        `
    }

if (argvs.length) {
  projectname = argvs[0] || 'command-default-project'
  const basename = path.basename(process.cwd())

  fs.readdir(process.cwd(), (err, items) => {
   if (err) {
     console.log(err)
     return
   }
   if (items.length) { // if not empty
      // try {
        const existingItem = path.resolve(process.cwd(), projectname)
        fs.stat(existingItem, (err, stat) => {
          if (err || !stat.isDirectory()) { // if no same name directory
            const projectDir = path.resolve(process.cwd(), projectname)
            fs.mkdir(projectDir, (err) => {
              if (err) {
                console.log(`error occurs while mk dir : ${err}`)
                return
              }
              go()
            }) 
          }
          else { // if same name directory exists, then stop and reject
            console.log('same directory exist')
            return
          }
        })
   } else {
     if (basename === projectname) { // if current directory has the same name as given project name
      console.log('case 3')
       go ()
     } else {
      console.log('case 4')
      const projectDir = path.resolve(process.cwd(), projectname)
       fs.mkdir(projectDir, (err) => {
         if (err) {
           console.log(`error occurs while mk dir : ${err}`)
           return
         }
         go()
       })
     }
   }
  })
}

function go() {
  
}