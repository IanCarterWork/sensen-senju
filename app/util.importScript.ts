import { readFileSync } from "fs";
import { runInThisContext } from "vm";



export function includer(filename : string){
	var code = readFileSync(filename, 'utf-8');
    return runInThisContext(code, filename);
}

export function importer(filename : string){
	filename='./'+filename;
	return includer(filename);
}
