import TerminalTools from "./tools.terminal.js";
export function TerminalRun(config) {
    return TerminalTools
        .RunServer(config)
        .RunSocket(config);
}
