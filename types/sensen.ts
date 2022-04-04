import { exec } from "child_process";
import SensenRawCli from "sensen.raw.cli";
import GetPackage from "./package.get";





const cli = new SensenRawCli.Create({
    
    iD: 'sensen',
    
    Title:'',
    
    Execute: ()=>{ },
    
    Children: [

        new SensenRawCli.Child({
    
            iD: 'get:pkg',
    
            Title:'Get Package',
    
            Execute: (args: string[])=>{

                GetPackage.Git(args[0]);

            }

        })

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