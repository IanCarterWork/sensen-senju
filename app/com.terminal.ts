import { exec } from "child_process";
import { relative, resolve } from "path";
import express from "express"
import SensenRawCli from "sensen.raw.cli";
import TerminalTools from "./tools.terminal.js"


export function TerminalRun(config : ConfigCombos) : TTerminalTools{

    return TerminalTools
    
        .RunServer(config)
        
        .RunSocket(config)

    ;

}