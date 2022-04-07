const express = require('express')
const process = require('process')


module.exports = {


    output: {

        port: 0
        
    },
    

    /**
     * 
     * @param { ConfigCombos } config 
     */
    RunServer(config){

        if(!config.front){ throw (`Frontend config not supported`); }


        const mode = config.front.mode || 'development';

        const app = express()

        const port = (config.front[ mode ].port || 9000) + 1

        app.get('/', (req, res) => {

            res.send('Sensen Terminal UI')

        })

        app.listen(port)

        console.log(`Sensen Terminal mounted on ${ config.front[ mode ].protocol || 'http' }://localhost:${ port }`)


        this.output.port = port;
        
        return this;
        
    },



    /**
     * 
     * @param { ConfigCombos } config 
     */
    RunSocket(config){


        return this;

    }

    

}