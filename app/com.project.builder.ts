
// require = require('esm')(module /*, options*/);

import { exec, ExecException, execSync, spawn } from "child_process";
import { copyFileSync, existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "fs";
import { basename, resolve } from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";
import { ManagerDownload } from "./com.manager.download";
import Repository from "./com.repositories"
import Distribute from "./com.distribute"
import UiProgressBar from "./com.ui.progress";
import { UnArchivages } from "./tool.archivages";






export async function ProjectBuilderQuestions(type? : ProjectBuilderTemplate){


    return new Promise<ProjectBuilderAnswers>((done : Function, fail : Function) =>{

    
        const inquirer = require('inquirer');

        const questions : any[] =  [

            {
                name: 'name',   
                message: 'What is the name of the project?',
                type: 'input',
            }

        ];
    

        if(!type){

            questions[questions.length] = {
                
                name: 'template',
                message: 'What template do you want?',
                type: 'list',
                choices: [
                    'Frontend + Backend',
                    'Frontend',
                    'Backend',
                ]
            }

        }
        
        
        inquirer
        
            .prompt(questions)
    
            .then(async (answers : ProjectBuilderAnswers) => {

                done(answers)
                
            })
    
            .catch((err : any) => {
    
                if (err.isTtyError) {
                    
                    SensenRawCli.$Console.Error('Error', err.isTtyError)

                    fail(err);
            
                } else {
    
                    SensenRawCli.$Console.Warning('Warning', err )

                    fail(err);
            
                }
    
                
            })
            
        ;


        
    })
    
    
}






export async function ProjectBuilderDownload(name : string, template : ProjectBuilderTemplate){

    
    // SensenRawCli.$Console.Notice('Template Downloader', template, '...')
        

    return new Promise<ProjectBuilderDone>(async (
        
        done : (arg: ProjectBuilderDone) => void, 
        
        fail : (err : string) => void
        
    ) =>{

        const repo = Repository.git[ template ] || undefined; 
        

        if(repo){

            ManagerDownload(

                `${ cwd() }/${ name }`,
                
                `https://github.com/IanCarterWork/${ repo }/archive/refs/heads/master.zip`, 
                
                'binary',

                `template.${ template }.zip`

            )

            .then((filename)=>{

                done({ name, template, source: filename })

            })

            .catch(er=>{ fail(er) })
            
            
        }

        else{

            fail('Template not supported')
            
        }
        
    })

}





export async function ProjectBuilderClean(source : string){

    return new Promise<boolean>(( 
        
        done : (arg: boolean) => void, 
        
        fail :  (arg: string) => void 
        
    )=>{

        exec(`cd ${ source } && rm -rf .git`, (err)=>{

            if(err){

                fail(err.message)
                
                return;
                
            }

            setTimeout(()=>{

                done(true);

            }, 500)

            
        })

    })
    
}





export async function ProjectBuilderDispatch(
    
        source : string, 
        
        destination : string, 
        
        on? : BuilderProcessorOn
        
    ){

    return new Promise<string[]>(( 
        
        done : (arg: string[]) => void, 
        
        fail :  (arg: string) => void 
        
    )=>{

        on = on || {}

        on.progress = typeof on.progress == 'function' ? on.progress : (file : string)=>{};


    
        const content = readdirSync(source)

        let counter = 0



        if(on && on.start){

            on.start(content)

        }
    

        content.map(file=>{

            counter++;
            
            try{

                if(
            
                    basename(file) != '.git' &&
        
                    basename(file) != '.gitignore'
                    
                ){
    
                    const from = `${ source }/${file}`
    
                    const to = `${ destination }/${ file }`
    
    
                    if(on && on.progress){ 
                        
                        on.progress(
                            
                            from, 
                            
                            to, 
                            
                            parseInt(((counter / content.length) * 100).toFixed(2)) 

                        ); 
                    
                    }
                    
                    renameSync(from, to)
    
                    return to;
                    
                }
        
                return null
                
            }

            catch(er){

                return null
                
            }
    
        }).filter(v=>typeof v == 'string')
    


        if(on && on.done){

            on.done(content)

        }
    

        done(content)

    })
    
}





export async function ProjectBuilderConfigurations(source : string){

    return new Promise<boolean>(( 
        
        done : (arg: boolean) => void, 
        
        fail :  (arg: string) => void 
        
    )=>{

        const configFile = `${ source }/project.json`

        if(!existsSync(configFile)){

            try{

                writeFileSync(
                    
                    configFile, 
                    
                    JSON.stringify(Distribute.configuration.project, null, 1)
                    
                )

                done(true);
                
            } catch(e){ done(false) }
            
        }

        else{

            done(true)
            
        }


    })
    
}




export async function ProjectBuilder(type? : ProjectBuilderTemplate){


    return new Promise(async (done : Function, fail : Function) => {


        await ProjectBuilderQuestions(type)
    
            .then(async answers=>{

                answers.template = type || answers.template
                

                const projectPath = `${ cwd() }/${ answers.name }`
                
                const repo = Repository.git[ answers.template ] || undefined; 
        


                SensenRawCli.$Console.Log('Template', answers.template)
                
                

                /**
                 * Template : Download 
                 */

                SensenRawCli.$Console.Log('Template', `Downloading...`)
            
                const downloaded =  await ProjectBuilderDownload(
                    
                    answers.name, 

                    answers.template
                    
                )
                .catch(er=>{
                    
                    SensenRawCli.$Console.Error('Downloading', er)

                    fail(er)

                })

                if(typeof downloaded != 'object'){

                    console.log( downloaded )
                    
                    throw (`Download failed`)
                    
                }




                /**
                 * Template : Extracting 
                 */

                SensenRawCli.$Console.Log('Template', 'Extracting...')

                const unzipProgress = UiProgressBar()

                unzipProgress.start(100, 0);

                let unzipped = await UnArchivages(

                    downloaded.source,

                    `${ projectPath }/.caches/${ encodeURIComponent(answers.template) }`,

                    {

                        ready: ()=>{},

                        start: ()=>{ },

                        progress: (percent)=>{

                            unzipProgress.update(percent)
                            
                        },

                        error: ()=>{},

                        done: ()=>{

                            unzipProgress.update(100)

                            unzipProgress.stop()
                            
                        },
                        
                    }
                    
                )

                .catch(er=>{
                    
                    SensenRawCli.$Console.Error('Extract', er)

                    fail(er)

                })


                if(typeof unzipped != 'string'){

                    console.log( unzipped )
                    
                    throw (`Extracting failed`)
                    
                }

                unzipped += `/${ repo }-master`






                /**
                 * Template : Clean 
                 */

                const cleaning = SensenRawCli.$Console.Log('Template', 'Cleaning...')

                await ProjectBuilderClean(unzipped)

                .catch(er=>{
                    
                    SensenRawCli.$Console.Error('Cleaning', er)

                    fail(er)

                })

                if(!cleaning){

                    console.log( cleaning )
                    
                    throw (`Cleaning failed`)
                    
                }




                /**
                 * Template Dispatching
                 */
                
                SensenRawCli.$Console.Log('Template', 'Dispatching...');

                const dispatchingProgress = UiProgressBar()

                const dispatching = await ProjectBuilderDispatch(unzipped, projectPath,{

                    start: (detected : string[])=>{

                        dispatchingProgress.start(detected.length, 0);

                    },
                    
                    progress: (from, to, percent)=>{
                        
                        dispatchingProgress.update(percent);

                    },

                    done: (detected : string[])=>{

                        dispatchingProgress.update(detected.length);

                        dispatchingProgress.stop();
                        
                    },
                    
                })

                .catch(er=>{
                    
                    SensenRawCli.$Console.Error('Dispatching', er)

                    fail(er)

                })

                if(!dispatching){

                    console.log( dispatching )
                    
                    throw (`Dispatching failed`)
                    
                }






                /**
                 * Template : Generate Configuration
                 */

                SensenRawCli.$Console.Log('Template', 'Configurating...');

                const configuration = await ProjectBuilderConfigurations(projectPath)

                .catch(er=>{
                    
                    SensenRawCli.$Console.Error('Configurating', er)

                    fail(er)

                })

                if(!configuration){

                    console.log( configuration )
                    
                    throw (`Configurating failed`)
                    
                }





                /**
                 * Dependencies : Installing
                 */


                
                if(existsSync(`${ projectPath }/frontend`)){
    
                    SensenRawCli.$Console.Log('Frontend Dependencies', 'Wait until...');

                    execSync(`cd ${ projectPath }/frontend && yarn install`, {
                        stdio: 'inherit'
                    })
                    
                }
                
                
                if(existsSync(`${ projectPath }/backend`)){
    
                    SensenRawCli.$Console.Log('Backend Dependencies', 'Wait until...');

                }
                
                    

                




                /**
                 * Template : Done
                 */
                
                SensenRawCli.$Console.Success(`Let's go`, ``);

                
            })
    
            .catch(err=>{
    
                SensenRawCli.$Console.Error('Project Builder', err)

                fail(err)
                
            })
            
        ;
    
    
        
    })
    
    
}