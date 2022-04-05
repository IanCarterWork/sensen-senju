import { existsSync, mkdir, readFileSync } from "fs";
import path, { basename } from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";
export const PackageUtilities = {
    ReadConfig(src) {
        return JSON.parse(`${readFileSync(src)}`);
    },
    Path: {
        TemporateDir($dir) {
            return path.resolve(cwd(), `.caches.${$dir}`);
        },
        async CleanTemporate($dir, callback) {
            const del = require('del');
            try {
                await del($dir);
                SensenRawCli.$Console.Lite('Clean', basename($dir));
            }
            catch (err) {
                SensenRawCli.$Console.Error(`Clean failed`, basename($dir));
            }
            setTimeout(() => { callback($dir); }, 1000);
            return this;
        },
        CreateTemporate($dir, callback) {
            const folder = this.TemporateDir($dir);
            if (!existsSync(folder)) {
                mkdir(folder, () => { callback(folder); });
                // SensenRawCli.$Console.Lite('CreateTemporate', 'done')
                return this;
            }
            callback(folder);
            return this;
        }
    }
};
export const Project = {
    Path(filename) {
        return path.resolve(cwd(), `./${filename || ''}`);
    },
    Config() {
        return JSON.parse(`${readFileSync(this.Path('package.json'))}`);
    },
    BackendConfig() {
        const config = this.Config().sensen;
        return JSON.parse(`${readFileSync(this.Path(`${config.path.back}/sensen.config.json`))}`);
    },
    FrontendConfig() {
        const config = this.Config().sensen;
        return JSON.parse(`${readFileSync(this.Path(`${config.path.front}/sensen.config.json`))}`);
    },
};
