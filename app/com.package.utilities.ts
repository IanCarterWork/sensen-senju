import { exec, execSync } from "child_process";
import { existsSync, mkdir, mkdirSync, readFileSync, statSync } from "fs";
import path, { basename, dirname } from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";



export const PackageUtilities = {

    ReadConfig(src : string){

        return JSON.parse(`${ readFileSync( src ) }`);

    },


    Path:{

        TemporateDir($dir : string) {

            return path.resolve(cwd(), `.caches.${ $dir }`)
            
        },


        async CleanTemporate($dir : string, callback: (dir : string) => void){
        
            const del = require('del');

            try {

                await del($dir);
        
                SensenRawCli.$Console.Lite('Clean', basename($dir));

            } catch (err) {
                
                SensenRawCli.$Console.Error(`Clean failed`, basename($dir));

            }

            setTimeout(()=>{ callback($dir); }, 1000)
            
            return this;
            
        },

        
        CreateTemporate($dir : string, callback : (dir: string) => void){

            const folder = this.TemporateDir($dir);

            if(!existsSync(folder)){

                mkdir(folder, ()=>{ callback(folder) });
                
                return this;

            }

            callback(folder);
            
            return this;
            
        }
        
    }
    
}
