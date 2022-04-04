import { existsSync, mkdir, statSync } from "fs";
import path from "path";
import { cwd } from "process";
import SensenRawCli from "sensen.raw.cli";
export const PackageConfig = {
    Path: {
        TemporateDir(dirname) {
            return path.resolve(cwd(), `~sensen.caches/${dirname}`);
        },
        async CleanTemporate(dirname, callback) {
            const del = require('del');
            const folder = this.TemporateDir(dirname);
            try {
                await del(dirname);
                SensenRawCli.$Console.Log('Temporate', `${name} is downloaded`);
            }
            catch (err) {
                SensenRawCli.$Console.Error(`Error while deleting ${dirname}.`);
            }
            return this;
        },
        CreateTemporate(dirname, callback) {
            const folder = this.TemporateDir(dirname);
            if (existsSync(folder)) {
                if (!statSync(folder).isDirectory()) {
                    mkdir(folder, () => { callback(folder); });
                }
            }
            else {
                mkdir(folder, () => { callback(folder); });
            }
            return this;
        }
    }
};
