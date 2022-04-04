import { exec } from "child_process";
import { basename } from "path";
import SensenRawCli from "sensen.raw.cli";
import { PackageConfig } from "./config";
export function GetGitPackage(url) {
    const name = basename(url);
    PackageConfig.Path.Temporate(`packages`, ($dir) => {
        const $cmd = `cd ${basename($dir)} && git clone ${url} ${name}`;
        exec($cmd, () => {
            SensenRawCli.$Console.Success('Get Package', `${name} is downloaded`);
        });
        SensenRawCli.$Console.Message('Get Package', `Download Resposite : ${name}`);
    });
    SensenRawCli.$Console.Lite('Get Package', 'Init...');
}
const GetPackage = {
    Git: GetGitPackage
};
export default GetPackage;
