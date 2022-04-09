import SensenRawCli from "sensen.raw.cli";
export async function ProjectBuilderQuestions() {
    return new Promise((done, fail) => {
        var inquirer = require('inquirer');
        inquirer
            .prompt([
            {
                name: 'name',
                message: 'What is the name of the project?',
                type: 'input',
            },
            {
                name: 'template',
                message: 'What template do you want?',
                type: 'list',
                choices: [
                    'Frontend + Backend',
                    'Frontend',
                    'Backend',
                ]
            },
        ])
            .then(async (answers) => {
            done(answers);
        })
            .catch((err) => {
            if (err.isTtyError) {
                SensenRawCli.$Console.Error('Error', err.isTtyError);
                fail(err);
            }
            else {
                SensenRawCli.$Console.Warning('Warning', err);
                fail(err);
            }
        });
    });
}
export async function ProjectBuilderDownload(name, template) {
    SensenRawCli.$Console.Notice('Template Downloader', template, '...');
    return new Promise((done, fail) => {
        const tpl = '';
        if (template == 'Frontend + Backend') {
        }
        else if (template == 'Backend') {
        }
        else if (template == 'Frontend') {
        }
        // return execSync(`git clone `)
    });
}
export async function ProjectBuilder(type) {
    return new Promise(async (done, fail) => {
        await ProjectBuilderQuestions()
            .then(answers => {
            ProjectBuilderDownload(answers.name, answers.template)
                .then(() => {
            })
                .catch(er => {
                SensenRawCli.$Console.Error('Project Downloader', er);
                fail(er);
            });
        })
            .catch(err => {
            SensenRawCli.$Console.Error('Project Builder', err);
            fail(err);
        });
    });
}
