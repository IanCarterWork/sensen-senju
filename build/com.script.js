import { Project } from "./com.project";
export function ScriptWatcher(config) {
    Project.FrontendCommand('Typescript Watcher', 'tsc -watch', config);
}
export function ScriptBuilder(config) {
    Project.FrontendCommand('Typescript Watcher', 'tsc', config);
}
