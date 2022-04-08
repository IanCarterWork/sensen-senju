import SensenRawCli from "sensen.raw.cli";
import GetPackage from "./com.package.get";
import { ServeBack } from "./com.serve.back";
import { ServeFront } from "./com.serve.front";
const cli = new SensenRawCli.Create({
    iD: 'sensen',
    Title: '',
    Execute: () => { },
    Children: [
        /**
         * Get resource
         */
        new SensenRawCli.Child({
            iD: 'get',
            Title: 'Get resources',
            Execute: (args) => {
                SensenRawCli.$Console.Notice('npm install', args);
            },
            Children: [
                new SensenRawCli.Child({
                    iD: 'package',
                    Title: 'Get Backend Package',
                    Execute: (args) => {
                        GetPackage.Git(args[0], args[1] || undefined);
                    },
                }),
                new SensenRawCli.Child({
                    iD: 'module',
                    Title: 'Get Frontend Module',
                    Execute: (args) => {
                        SensenRawCli.$Console.Notice('npm install', args);
                    }
                }),
            ]
        }),
        /**
         * Serve Manager
         */
        new SensenRawCli.Child({
            iD: 'serve',
            Title: 'Sensen Serve Frontend/Backend [, -front] or [, -back]',
            Execute: (args) => {
                // SensenRawCli.$Console.Notice('smake/backend command', (args.join(' ')) )
                switch (args[0]) {
                    /**
                     * Serve Frontend
                     */
                    case '-front':
                        (async () => {
                            await ServeFront();
                        })();
                        break;
                    /**
                     * Serve backend
                     */
                    case '-back':
                        (async () => {
                            await ServeBack();
                        })();
                        break;
                    default:
                        var inquirer = require('inquirer');
                        inquirer
                            .prompt([
                            {
                                name: 'serve',
                                message: 'Did you say start a development server ?',
                                type: 'list',
                                choices: [
                                    'All',
                                    'Frontend',
                                    'Backend',
                                ]
                            },
                        ])
                            .then(async (answers) => {
                            SensenRawCli.$Console.Warning('Démarrage', '...');
                            if (answers.serve == 'All') {
                                await ServeBack();
                                await ServeFront();
                            }
                            else if (answers.serve == 'Backend') {
                                await ServeBack();
                            }
                            else if (answers.serve == 'Frontend') {
                                await ServeFront();
                            }
                        })
                            .catch((error) => {
                            if (error.isTtyError) {
                                SensenRawCli.$Console.Error('Error', error.isTtyError);
                            }
                            else {
                                SensenRawCli.$Console.Warning('Warning', error);
                            }
                        });
                        break;
                }
            },
            // Children: [
            // ]
        }),
        // new SensenRawCli.Child({
        //     iD: 'make:back',
        //     Title:'Sensen Make Backend',
        //     Execute: (args: string[])=>{
        //         SensenRawCli.$Console.Notice('smake/backend command', args)
        //     }
        // }),
        // new SensenRawCli.Child({
        //     iD: 'make:front',
        //     Title:'Sensen Make Frontend',
        //     Execute: (args: string[])=>{
        //         SensenRawCli.$Console.Notice('smake/front command', args)
        //     }
        // }),
    ]
});
const SensenSenju = {
    Boot(argv) {
        cli.Run(SensenRawCli.Create.Args(argv, 2));
    }
};
export default SensenSenju;
