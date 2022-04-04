import { exec } from "child_process";
import { existsSync, statSync } from "fs";
import SensenRawCli from "sensen.raw.cli"




export function InstallGitPackage(src : string){

    
    if(existsSync(src)){
        
        if(statSync(src).isDirectory()){
            
            SensenRawCli.$Console.Log('Install Package', src );
            
            
            return true;
            
        }
        
    }

    return false;

}



const InstallPackage = {

    Git: InstallGitPackage
    
}

export default InstallPackage