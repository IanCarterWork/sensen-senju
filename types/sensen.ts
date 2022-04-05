import { exec } from "child_process";
import SensenRawCli from "sensen.raw.cli";
import GetPackage from "./package.get";





const cli = new SensenRawCli.Create({
    
    iD: 'sensen',
    
    Title:'',
    
    Execute: ()=>{ },
    
    Children: [



        new SensenRawCli.Child({
    
            iD: 'get',
    
            Title:'Get resources',
    
            Execute: (args: string[])=>{

                SensenRawCli.$Console.Notice('npm install', args)

            },

            Children: [




                new SensenRawCli.Child({
    
                    iD: 'package',
            
                    Title:'Get Backend Package',
            
                    Execute: (args: string[])=>{
        
                        GetPackage.Git(
                            
                            args[0],
        
                            args[1] || undefined
                            
                        );
        
                    },
        
        
                }),
        



        
                new SensenRawCli.Child({
            
                    iD: 'module',
            
                    Title:'Get Frontend Module',
            
                    Execute: (args: string[])=>{
        
                        SensenRawCli.$Console.Notice('npm install', args)
        
                    }
        
                }),
        
                
                
            ]

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