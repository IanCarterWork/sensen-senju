import { exec } from "child_process";
import SensenRawCli from "sensen.raw.cli";
import { Project } from "./com.project";





export function ScriptWatcher( config : ConfigCombos ){

    Project.FrontendCommand(
        
        'Typescript Watcher',

        'tsc -watch',

        config

    )
    

}





export function ScriptBuilder( config : ConfigCombos ){

    Project.FrontendCommand(
        
        'Typescript Watcher',

        'tsc',

        config

    )
    

}