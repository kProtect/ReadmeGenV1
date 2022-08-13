const inquirer = require('inquirer');
const generateMarkdown = require ("./utils/generateMarkdown");
const fs = require('fs');

const questions = [ {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    validate: titleInput => {
        if (titleInput) {
            return true;
        } else {
            console.log('Please enter your title!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'Username',
    message: 'What is your GitHub Username?',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Please enter your GitHub username!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'EMAIL',
    message: 'What is your email address?',
    validate: githubInput => {
        if (githubInput) {
            return true;
        } else {
            console.log('Please enter your email address!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'project',
    message: 'What is your project and what problem will it solve?',
    validate: whatInput => {
        if (whatInput) {
            return true;
        } else {
            console.log('Please enter what your project is!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'Project Name',
    message: 'Why did you create this project?',
    validate: whyInput => {
        if (whyInput) {
            return true;
        } else {
            console.log('Please enter why you created this project!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'info',
    message: 'How will someone use this?',
    validate: howInput => {
        if (howInput) {
            return true;
        } else {
            console.log('Please enter what your project is!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'installation',
    message: 'Please provide step-by-step installation instructions for your project.',
    validate: installInput => {
        if (installInput) {
            return true;
        } else {
            console.log('Please enter your installation instructions!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'usage',
    message: 'Please provide instructions and examples for use.',
    validate: usageInput => {
        if (usageInput) {
            return true;
        } else {
            console.log('Please enter your use instructions!');
            return false;
        }
    }
},
{
    type: 'list',
    name: 'license',
    message: 'Which license will you use for your project?',
    choices: ['agpl', 'apache', 'mit', 'no license']
},
{
    type: 'confirm',
    name: 'confirmContributers',
    message: 'Would you like to allow other developers to contribute?',
    default: true
},
{
    type: 'input',
    name: 'contribute',
    message: 'Please provide guidelines for contributing.',
    when: ({ confirmContributers }) => {
        if (confirmContributers) {
            return true;
        } else {
            return false;
        }
    },
    validate: contributerInput => {
        if (contributerInput) {
            return true;
        } else {
            console.log('Please enter contributer guidelines!');
            return false;
        }
    }
},
{
    type: 'input',
    name: 'test',
    message: 'Please provide instructions on how to test the app.',
    validate: testInput => {
        if (testInput) {
            return true;
        } else {
            console.log('Please enter your use test instructions!');
            return false;
        }
    }
}];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    return new Promise((res,rej) => {
        fs.writeFile('./dist/README.MD', fileName, data => {
            if (data) {
                rej(data);
                return
            }

            res({
                ok:true,
                message: 'success'
            });
        });
    });
};

function init() {
    return inquirer.prompt(questions)
    .then(readmeData => {
        return readmeData;
    })
}

init()
.then(readmeData => {
    console.log(readmeData);
    return generateMarkdown(readmeData);
})
.then(pageMD => {
    return writeToFile(pageMD);
})
.then(writFileResponse => {
    console.log(writFileResponse.message);
})
.catch(error => {
    console.log(error)
})


