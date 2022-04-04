import { basename } from "path";
import SensenRawCli from "sensen.raw.cli";
import { PackageUtilities } from "./package.utilities";
export async function GetGitPackage(url) {
    const scd = 'packages';
    const tmp = PackageUtilities.Path.TemporateDir(`${scd}`);
    const name = basename(url);
    SensenRawCli.$Console.Log('Get Package', 'Clean caches...');
    await PackageUtilities.Path.CleanTemporate(`${tmp}/${name}`, (dir) => {
        SensenRawCli.$Console.Log('Get Package', 'Init...');
        PackageUtilities.Path.CreateTemporate(scd, ($dir) => {
            SensenRawCli.$Console.Notice('Debugger', dir);
            //         const $cmd = `cd ${ basename($dir) } && git clone ${ url } ${ name }`;
            //         exec($cmd, ()=>{
            //             SensenRawCli.$Console.Log('Get Package', `${ name } is downloaded`);
            //             if(InstallPackage.Git(`${ $dir }/${ name }`)){
            //                 SensenRawCli.$Console.Success('Install Package', `${ name } is done`)
            //             }
            //             else{
            //                 SensenRawCli.$Console.Error('Install Package', `${ name } failed`)
            //             }
            //         })
            //         SensenRawCli.$Console.Message('Get Package', `Download Resposite < ${ name } >...`);
        });
    });
}
const GetPackage = {
    Git: GetGitPackage
};
export default GetPackage;
