import SensenRawCli from "sensen.raw.cli";
import GetPackage from "./package.get";
const cli = new SensenRawCli.Create({
    iD: 'sensen',
    Title: '',
    Execute: () => { },
    Children: [
        new SensenRawCli.Child({
            iD: 'get:pkg',
            Title: 'Get Package',
            Execute: (args) => {
                GetPackage.Git(args[0]);
            }
        })
    ]
});
const SensenSenju = {
    Boot(argv) {
        cli.Run(SensenRawCli.Create.Args(argv, 2));
    }
};
export default SensenSenju;
