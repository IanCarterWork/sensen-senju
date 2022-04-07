import { Project } from "./com.project";
export function AppearanceWatcher(config) {
    if (!config.project) {
        throw (`Project config not supported`);
    }
    if (!config.front) {
        throw (`Frontend config not supported`);
    }
    if (!config.front.paths) {
        throw (`Frontend Paths config not supported`);
    }
    Project.FrontendCommand('Appearance Watcher', `sass --watch ${config.front.paths.appearance}:${config.front.paths.build}/sensen/appearance`, config);
}
export function AppearanceBuilder(config) {
    if (!config.project) {
        throw (`Project config not supported`);
    }
    if (!config.front) {
        throw (`Frontend config not supported`);
    }
    if (!config.front.paths) {
        throw (`Frontend Paths config not supported`);
    }
    Project.FrontendCommand('Appearance Builder', `sass ${config.front.paths.appearance}:${config.front.paths.build}/sensen/appearance`, config);
}
