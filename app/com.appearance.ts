import { exec } from "child_process";
import SensenRawCli from "sensen.raw.cli";
import { Project } from "./com.project";





export function AppearanceWatcher(config : ConfigCombos){


    if(!config.project){ throw (`Project config not supported`); }

    if(!config.front){ throw (`Frontend config not supported`); }

    if(!config.front.paths){ throw (`Frontend Paths config not supported`); }


    Project.FrontendCommand(
        
        'Appearance Watcher',

        `sass --watch ${ 
        
            config.front.paths.appearance 
        
        }:${ config.front.paths.build }/sensen/appearance`,

        config

    )

    
}



export function AppearanceBuilder(config : ConfigCombos){


    if(!config.project){ throw (`Project config not supported`); }

    if(!config.front){ throw (`Frontend config not supported`); }

    if(!config.front.paths){ throw (`Frontend Paths config not supported`); }

    
    Project.FrontendCommand(
        
        'Appearance Builder',

        `sass ${ 
        
            config.front.paths.appearance 
        
        }:${ config.front.paths.build }/sensen/appearance`,

        config

    )


    
}