import { existsSync, mkdirSync, readdirSync, renameSync, statSync, writeFile } from "fs";
import { basename } from "path";
import SensenRawCli from "sensen.raw.cli";
import { PackageUtilities, Project } from "./package.utilities";
export function RecordPackage(prop) {
    const config = Project.Config();
    const $Backend = Project.BackendConfig();
    const file = Project.Path(`${config.sensen.path.back}/sensen.config.json`);
    $Backend.packages = $Backend.packages || {};
    $Backend.packages[prop.id] = prop;
    SensenRawCli.$Console.Lite('Configuration', `Updating...`);
    writeFile(file, JSON.stringify($Backend, null, 1), 'utf8', () => {
        SensenRawCli.$Console.Notice('Configuration', `is Updated `);
    });
}
export function DetectPackageFiles(src) {
    const content = readdirSync(src);
    const detected = [];
    content.forEach(file => {
        if (basename(file) != 'sensen.package.json' &&
            basename(file) != '.git' &&
            basename(file) != '.gitignore') {
            detected.push(file);
        }
    });
    return detected;
}
export function InstallGitPackage(src, type, respository) {
    type = type || '-chakra';
    if (existsSync(src)) {
        if (statSync(src).isDirectory()) {
            const files = DetectPackageFiles(src);
            const pkg = PackageUtilities.ReadConfig(`${src}/sensen.package.json`);
            const $project = Project.Config();
            const $Backend = Project.BackendConfig();
            const packageDir = Project.Path(`${$project.sensen.path.back}/${$Backend.alias.Package}`);
            const pkgNS = pkg.name;
            mkdirSync(`${packageDir}/${pkgNS}`, { recursive: true });
            files.forEach((f) => {
                renameSync(`${src}/${f}`, `${packageDir}/${pkgNS}/${f}`);
                SensenRawCli.$Console.Lite('Installing', f);
            });
            RecordPackage({
                id: pkg.id,
                name: pkg.name,
                version: pkg.version || '',
                versionNumber: pkg.versionNumber || undefined,
                respository,
                type
            });
            return true;
        }
    }
    return false;
}
const InstallPackage = {
    Git: InstallGitPackage
};
export default InstallPackage;
