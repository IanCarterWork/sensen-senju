import { exec } from "child_process";
import { argv } from "process";
import SensenRawCli from "sensen.raw.cli";
import { BuildFront } from "./com.build.front";
import GetPackage from "./com.package.get";
import { ProjectBuilder } from "./com.project.builder";
import { ServeBack } from "./com.serve.back";
import { ServeFront } from "./com.serve.front";





const cli = new SensenRawCli.Create({
    
    iD: 'sensen',
    
    Title:'',
    
    Execute: ()=>{ },
    
    Children: [





        /**
         * Create new project
         */

        new SensenRawCli.Child({

            iD:'create',

            Title: 'Create new project',

            Execute: (argv: string[]) => {

                // SensenRawCli.$Console.Notice('', '')

                /**
                 * Switch Case
                 */
                switch((argv[0]||'').toLowerCase()){


                    case '-full':

                        (async ()=>{

                            await ProjectBuilder('Frontend + Backend')

                        })();


                    break;
        


                    case '-front':

                        (async ()=>{

                            await ProjectBuilder('Frontend')

                        })();

                    break;
        


                    case '-back':

                        (async ()=>{

                            await ProjectBuilder('Backend')

                        })();

                    break;



                    default:

                        (async ()=>{

                            await ProjectBuilder()

                        })();

                    break;

        

                }

            },

        }),
        
        
        
        

        /**
         * Get resource
         */
        
        new SensenRawCli.Child({
    
            iD: 'get',
    
            Title:'Get resources',
    
            Execute: (args: string[])=>{ },

            Children: [


                /**
                 * Get backend package
                 */
                new SensenRawCli.Child({
            
                    iD: 'back:package',
            
                    Title:'Get package',
            
                    Execute: (args: string[])=>{ },
        
                    Children: [
                
                        /**
                         * Get Package from Git
                         */
                         new SensenRawCli.Child({
            
                            iD: '-git',
                    
                            Title:'Get Git Package',
                    
                            Execute: (args: string[])=>{
                
                                GetPackage.Git(
                                    
                                    args[0],
                
                                    args[1] || undefined
                                    
                                );
                
                            },
                
                
                        }),
                        
                    ]
        
                }),
        

                
                
            ]

        }),




        /**
         * Serve Manager
         */
        new SensenRawCli.Child({
    
            iD: 'serve',
    
            Title:'Sensen Serve Frontend/Backend [, -front] or [, -back] or [, all',
    
            Execute: (argv: string[])=>{



                /**
                 * Switch Case
                 */
                switch((argv[0]||'').toLowerCase()){




                    /**
                     * Serve Frontend
                     */

                    case '-front':

                        (async ()=>{
        
                            await ServeFront();
        
                        })()
                    
                    break;




                    /**
                     * Serve backend
                     */

                     case '-back':

                        (async ()=>{
        
                            await ServeBack();

        
                        })()
                    
                    break;




                    /**
                     * Serve backend
                     */

                     case '-all':

                        (async ()=>{
        
                            await ServeBack();
                                    
                            await ServeFront();
        
                        })()
                    
                    break;




                    /**
                     * All Server
                     */
                    default:

                        var inquirer = require('inquirer');

                        inquirer

                            .prompt([
    
                                {
                                    
                                    name: 'serve',
                                    
                                    message: 'Did you say start a development server ?',
                                    
                                    type: 'list',
                                    
                                    choices: [
                                    
                                        'Frontend + Backend',
                                    
                                        'Frontend',
                                    
                                        'Backend',
                                    
                                    ]

                                },
                            
                            ])

                            .then(async (answers : {

                                serve: 'Frontend + Backend' | 'Frontend' | 'Backend'
                                
                            }) => {
    
                                SensenRawCli.$Console.Warning('Starting', '...')

                                if(answers.serve == 'Frontend + Backend'){

                                    await ServeBack();
                                    
                                    await ServeFront();

                                }

                                else if(answers.serve == 'Backend'){

                                    await ServeBack();
                                    
                                }

                                else if(answers.serve == 'Frontend'){

                                    await ServeFront();
                                    
                                }
                            
                            })

                            .catch((error : any) => {
        
                                if (error.isTtyError) {
                                    
                                    SensenRawCli.$Console.Error('Error', error.isTtyError)
                            
                                } else {

                                    SensenRawCli.$Console.Warning('Warning', error )
                            
                                }

                            });

                    
                    break;
                    
                    
                    
                }



            },

            // Children: [

            // ]

        }),




        /**
         * Build Manager
         */
        new SensenRawCli.Child({
    
            iD: 'build',
    
            Title:'Sensen Build Frontend/Backend [, -front] or [, -back] or [, all',
    
            Execute: (argv: string[])=>{



                /**
                 * Switch Case
                 */
                switch((argv[0]||'').toLowerCase()){




                    /**
                     * Serve Frontend
                     */

                    case '-front':

                        (async ()=>{
        
                            await BuildFront();
        
                        })()
                    
                    break;




                    /**
                     * Serve backend
                     */

                     case '-back':

                        (async ()=>{
        
                            // await ServeBack();

                            SensenRawCli.$Console.Warning('Not available')

        
                        })()
                    
                    break;




                    /**
                     * Serve backend
                     */

                     case '-all':

                        (async ()=>{
        
                            // await ServeBack();
                                    
                            await ServeFront();
        
                        })()
                    
                    break;




                    /**
                     * All Server
                     */
                    default:

                        // var inquirer = require('inquirer');

                        // inquirer

                        //     .prompt([
    
                        //         {
                                    
                        //             name: 'serve',
                                    
                        //             message: 'Did you say start a development server ?',
                                    
                        //             type: 'list',
                                    
                        //             choices: [
                                    
                        //                 'Frontend + Backend',
                                    
                        //                 'Frontend',
                                    
                        //                 'Backend',
                                    
                        //             ]

                        //         },
                            
                        //     ])

                        //     .then(async (answers : {

                        //         serve: 'Frontend + Backend' | 'Frontend' | 'Backend'
                                
                        //     }) => {
    
                        //         SensenRawCli.$Console.Warning('Starting', '...')

                        //         if(answers.serve == 'Frontend + Backend'){

                        //             await ServeBack();
                                    
                        //             await ServeFront();

                        //         }

                        //         else if(answers.serve == 'Backend'){

                        //             await ServeBack();
                                    
                        //         }

                        //         else if(answers.serve == 'Frontend'){

                        //             await ServeFront();
                                    
                        //         }
                            
                        //     })

                        //     .catch((error : any) => {
        
                        //         if (error.isTtyError) {
                                    
                        //             SensenRawCli.$Console.Error('Error', error.isTtyError)
                            
                        //         } else {

                        //             SensenRawCli.$Console.Warning('Warning', error )
                            
                        //         }

                        //     });

                    
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

    Boot(argv : string[]){

        cli.Run(

            SensenRawCli.Create.Args(argv, 2)
            
        );

    }
    
};


export default SensenSenju;