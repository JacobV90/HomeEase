# Home Ease Dev Team
I recommend using the Atom IDE or Sublime (mac) because you are able to add language
packages on themes. Install the "angularjs" and "atom-typescript" packages. It will
make your life easier.

# Environment Setup
Install the latest version of Node.js
Run: "npm run env-setup"

# Development Setup
Run: "npm run dev-setup"

# Workflow
Run: "gulp"

Navigate to URL where files are being served (address is in terminal output from gulp)

#For Devices
Run: ionic run (android/ios)
 - Device must be connected or emulator setup


#HTML
Files are located in www/templates
 - after adding a new html file, update the state provider with the location in app.ts

#Angular/Javascript
Write angular code in the src folder outside the www folder
 - typescript will be compiled into www/js on save

#CSS
Write css code in the scss folder
  - sass will be compiled into www/css on save
