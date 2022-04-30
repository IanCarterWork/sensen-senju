import SensenRawCli from "sensen.raw.cli";
import { Project } from "./com.project";
import { AppearanceBuilder } from "./com.appearance";
import { Recoltes } from "./tools.factory";
import { Build } from "./com.webpack";
import { execSync } from "child_process";
export async function BuildFront() {
    /**
     * Load Configurations
     */
    const $Project = Project.Config();
    const $LocalConfig = await Project.FrontendConfig();
    const configCombos = {
        project: $Project,
        front: $LocalConfig,
    };
    // let terminalTools : TTerminalTools;
    /**
     * Build Typescript
     */
    SensenRawCli.$Console.Notice('Build Script', 'in progress...');
    execSync(`cd ${Project.Path($Project.path.front)} && tsc`);
    /**
     * LST : Launch Sensen Terminal (only development mode)
     */
    // if($LocalConfig.mode == 'development'){
    // terminalTools = TerminalRun(configCombos);
    // console.log('')
    // SensenRawCli.$Console.Notice('Configuration', ($LocalConfig.paths ? true : false) )
    // console.log('')
    // }
    /**
     * Build Appearance
     */
    if ($LocalConfig.mode == 'production') {
        AppearanceBuilder(configCombos);
    }
    /**
     * Build Factory
     */
    Recoltes(configCombos);
    /**
     * Webpack Build
     */
    Build(configCombos);
}
