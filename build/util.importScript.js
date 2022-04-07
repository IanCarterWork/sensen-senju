import { readFileSync } from "fs";
import { runInThisContext } from "vm";
export function includer(filename) {
    var code = readFileSync(filename, 'utf-8');
    return runInThisContext(code, filename);
}
export function importer(filename) {
    filename = './' + filename;
    return includer(filename);
}
