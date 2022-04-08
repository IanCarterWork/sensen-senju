import path from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";
import { Project } from "./com.project";





export async function ServeBack(){

    /**
     * Load Configurations
     */
    const $Project = Project.Config();

    const $LocalConfig = Project.BackendConfig();

    const configCombos : ConfigCombos = {

        project: $Project,
    
        back: $LocalConfig,
        
    }


    if(configCombos.back){


        const root = Project.Path(`${

            configCombos.project.path.back
            
        }/${

            configCombos.back.paths.public
            
        }`);
        
        const port = configCombos.back.development.port || 19620;

        const host = configCombos.back.development.host || '127.0.0.1';

        const protocol = configCombos.back.development.protocol || 'http';


        Project.BackendCommand(
    
            'Backend Server',
    
            `cd "${ root }" && php -S ${ host }:${ port }`,

            configCombos
            
        )

        
        SensenRawCli.$Console.Notice('Build HTTP', `${ protocol }://${ host }:${ port }`)

        SensenRawCli.$Console.Notice('Build From', `${ path.relative(cwd(), root) }`)



        // SensenRawCli.$Console.Notice('Backend', Project.Path(configCombos.project.path.back), configCombos)
    

    }
    

}