import { exec } from "child_process";
import { readFileSync } from "fs";
import path from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";
export const Project = {
    Path(filename) {
        return path.resolve(cwd(), `./${filename || ''}`);
    },
    Config() {
        return JSON.parse(`${readFileSync(this.Path('project.json'))}`);
    },
    BackendConfig() {
        const config = this.Config();
        return JSON.parse(`${readFileSync(this.Path(`${config.path.back}/sensen.config.json`))}`);
    },
    async FrontendConfig() {
        const config = this.Config();
        // const front = this.Path(config.path.front)
        // const ts = `sensen.config.ts`
        // // const js = `.config/sensen.config.js`;
        // const cmd = `cd ${ front } && tsc ${ ts } --config ${ resolve(__dirname, '../configurations/tsconfig.sheet.json') }`;
        // SensenRawCli.$Console.Notice('Execution', cmd)
        // execSync( cmd, {stdio: 'inherit'} );
        const mod = await import(this.Path(`${config.path.front}/sensen.config.js`));
        return (mod.default || mod);
    },
    FrontendCommand(label, cmd, config) {
        if (!config.project) {
            throw (`Project config not supported`);
        }
        if (!config.front) {
            throw (`Frontend config not supported`);
        }
        if (!config.front.paths) {
            throw (`Frontend Paths config not supported`);
        }
        const front = Project.Path(config.project.path.front);
        const x = exec(`cd ${front} && ${cmd}`);
        x.on('spawn', () => { SensenRawCli.$Console.Message(`Frontend • ${label || ''}`, 'Spawn'); });
        if (x.stdout) {
            x.stdout.addListener('data', (chunk) => {
                SensenRawCli.$Console.Notice(`Frontend • ${label || ''}`, chunk);
            });
            x.stdout.addListener('error', (chunk) => {
                SensenRawCli.$Console.Error(`Frontend • ${label || ''}`, chunk);
            });
        }
        return this.FrontendCommand;
    }
};
