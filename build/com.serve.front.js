import SensenRawCli from "sensen.raw.cli";
import { TerminalRun } from "./com.terminal";
import { Project } from "./com.project";
import { AppearanceBuilder, AppearanceWatcher } from "./com.appearance";
import { ScriptBuilder, ScriptWatcher } from "./com.script";
import { Recoltes, WatchToCompile } from "./tools.factory";
import { Serve } from "./com.webpack";
import { execSync } from "child_process";
export async function ServeFront() {
    /**
     * Load Configurations
     */
    const $Project = Project.Config();
    const $LocalConfig = await Project.FrontendConfig();
    const configCombos = {
        project: $Project,
        front: $LocalConfig,
    };
    let terminalTools;
    /**
     * Watch Typescript
     * Build Typescript
     */
    SensenRawCli.$Console.Notice('Build Script', 'in progress...');
    execSync(`cd ${Project.Path($Project.path.front)} && tsc`);
    if ($LocalConfig.mode == 'development') {
        ScriptWatcher(configCombos);
    }
    if ($LocalConfig.mode == 'production') {
        ScriptBuilder(configCombos);
    }
    /**
     * LST : Launch Sensen Terminal (only development mode)
     */
    if ($LocalConfig.mode == 'development') {
        terminalTools = TerminalRun(configCombos);
        console.log('');
        SensenRawCli.$Console.Notice('Configuration', ($LocalConfig.paths ? true : false));
        console.log('');
    }
    /**
     * Watch Appearance
     * Build Appearance
     */
    if ($LocalConfig.mode == 'development') {
        AppearanceWatcher(configCombos);
    }
    if ($LocalConfig.mode == 'production') {
        AppearanceBuilder(configCombos);
    }
    /**
     * Build Factory
     */
    Recoltes(configCombos);
    if ($LocalConfig.mode == 'development') {
        WatchToCompile(configCombos, $LocalConfig.paths ? $LocalConfig.paths.app || null : null);
    }
    /**
     * WHMR : Launch Webpack HMR
     */
    Serve(configCombos);
}
