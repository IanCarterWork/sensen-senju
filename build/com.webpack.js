import { Project } from "./com.project";
export function Serve(config) {
    if (!config.project) {
        throw (`Project config not supported`);
    }
    if (!config.front) {
        throw (`Frontend config not supported`);
    }
    if (!config.front.paths) {
        throw (`Frontend Paths config not supported`);
    }
    if (!config.front.tools) {
        throw (`Frontend Tools config not supported`);
    }
    if (!('webpack' in config.front.tools)) {
        throw (`Frontend Webpack not found`);
    }
    Project.FrontendCommand('Webpack Serve', `npx webpack serve --hot --config ${config.front.tools.webpack}`, config);
}
export function Build(config) {
    if (!config.project) {
        throw (`Project config not supported`);
    }
    if (!config.front) {
        throw (`Frontend config not supported`);
    }
    if (!config.front.paths) {
        throw (`Frontend Paths config not supported`);
    }
    if (!config.front.tools) {
        throw (`Frontend Tools config not supported`);
    }
    if (!('webpack' in config.front.tools)) {
        throw (`Frontend Webpack not found`);
    }
    Project.FrontendCommand('Webpack Serve', `npx webpack build --config ${config.front.tools.webpack}`, config);
}
