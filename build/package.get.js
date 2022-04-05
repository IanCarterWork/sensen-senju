import { exec } from "child_process";
import { basename } from "path";
import SensenRawCli from "sensen.raw.cli";
import { PackageUtilities } from "./package.utilities";
import InstallPackage from "./package.install";
export async function GetGitPackage(url, type) {
    type = type || '-chakra';
    const SiD = 'packages';
    const tmp = PackageUtilities.Path.TemporateDir(`${SiD}`);
    const name = basename(url);
    SensenRawCli.$Console.Log('Get Package', 'Clean caches...');
    await PackageUtilities.Path.CleanTemporate(`${tmp}/${name}`, ($clean) => {
        SensenRawCli.$Console.Log('Get Package', 'Init...');
        PackageUtilities.Path.CreateTemporate(SiD, ($dir) => {
            const $cmd = `cd ${basename($dir)} && git clone ${url} ${name}`;
            exec($cmd, () => {
                SensenRawCli.$Console.Log('Get Package', `${name} is downloaded`);
                if (InstallPackage.Git(`${$dir}/${name}`, type, url)) {
                    setTimeout(() => {
                        PackageUtilities.Path.CleanTemporate(`${tmp}/${name}`, () => {
                            SensenRawCli.$Console.Success('Install Package', `${name} is done`);
                        });
                    }, 1962);
                }
                else {
                    SensenRawCli.$Console.Error('Install Package', `${name} failed`);
                }
            });
            SensenRawCli.$Console.Message('Get Package', `Download Resposite < ${name} >...`);
        });
    });
}
const GetPackage = {
    Git: GetGitPackage
};
export default GetPackage;
