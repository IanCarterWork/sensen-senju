import del from "del";
import SensenRawCli from "sensen.raw.cli";



export async function removeDirectory(dir : string){

    try {
        
        await del(dir);

        SensenRawCli.$Console.Success(`${dir} is deleted!`);
        
    } catch (err) {
        
        SensenRawCli.$Console.Error(`Error while deleting ${dir}.`);

    }
    
}