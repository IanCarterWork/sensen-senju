import { exec } from "child_process";
import { existsSync, mkdir, mkdirSync, statSync } from "fs";
import path from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";


export const PackageUtilities = {

    Path:{


        TemporateDir(dirname : string) {

            return path.resolve(cwd(), `~sensen.caches.${ dirname }`)
            
        },


        async CleanTemporate(dirname : string, callback: (dir : string) => void){
        
            const del = require('del');

            try {

                await del(dirname);
        
                SensenRawCli.$Console.Log('Clean', dirname);

            } catch (err) {
                
                SensenRawCli.$Console.Error(`Clean failed`, dirname);

            }

            setTimeout(()=>{ callback(dirname); }, 1000)
            
            return this;
            
        },

        
        CreateTemporate(dirname : string, callback : (dir: string) => void){

            const folder = this.TemporateDir(dirname);

            if(existsSync(folder)){

                if(!statSync(folder).isDirectory()){

                    mkdir(folder, ()=>{ callback(folder) });

                    return this;

                }
                
            }

            callback(folder);
            
            return this;
            
        }
        
    }
    
}