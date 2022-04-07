require = require('esm')(module /*, options*/);
const glob = require('glob-fs')({ gitignore: true });
const chokidar = require('chokidar');
import { copyFileSync, statSync, unlinkSync } from 'fs';
import path, { basename, relative } from 'path';
import { cwd } from 'process';
import SensenRawCli from 'sensen.raw.cli';
/**
 *
 * @param { ConfigCombos } config
 * @param { string } input
 * @param { number | null } index
 * @returns
 */
export function Compilate(config, input, index) {
    const name = relative(config.front.paths.app, input);
    const entryBase = basename(config.front.paths.app);
    const pipe = `${config.front.paths.pipe}/${entryBase}/${name}`;
    const isImport = input.match(new RegExp(`(${path.basename(config.front.paths.app)})(.*)\.(html|htm|sense|activity|component|modal|css|s[ac]ss|less)$`, 'g'));
    /**
     * Copy to pipe
     */
    if (isImport) {
        copyFileSync(input, pipe);
        SensenRawCli.$Console.Notice('Compilate', `${name}`);
    }
    return input;
}
/**
 *
 * @param { ConfigCombos } config
 * @param { string } input
 * @param { number | null } index
 * @returns
 */
export function Cleaner(config, input, index) {
    const name = relative(config.front.paths.app, input);
    const entryBase = basename(config.front.paths.app);
    const pipe = `${config.front.paths.pipe}/${entryBase}/${name}`;
    const isImport = input.match(new RegExp(`(${path.basename(config.front.paths.app)})(.*)\.(html|htm|sense|activity|component|modal|css|s[ac]ss|less)$`, 'g'));
    /**
     * Copy to pipe
     */
    if (isImport) {
        try {
            unlinkSync(pipe);
            SensenRawCli.$Console.Error('Delete', `${name}`);
        }
        catch (e) {
            SensenRawCli.$Console.Error('Delete failed', `${name}`, e);
        }
    }
}
/**
 *
 * @param { ConfigCombos } config
 * @param { ?string } dir
 * @returns { chokidar.FSWatcher | null }
 */
export function WatchToCompile(config, dir = null) {
    if (dir) {
        const watcher = chokidar.watch(dir, { persistent: true });
        watcher
            .on('add', async (file) => { Compilate(config, file, null); })
            .on('addDir', async (file) => { Compilate(config, file, null); })
            .on('change', async (file) => { Compilate(config, file, null); })
            .on('unlink', (file) => { Cleaner(config, file, null); });
        return watcher;
    }
    return null;
}
/**
 *
 * @param { ConfigCombos } config
 */
export function Recoltes(config) {
    return (glob.readdirSync(`${path.relative(process.cwd(), config.front.paths.app)}/**/*`) || [])
        .map(f => `${cwd()}/${f}`)
        .filter((f, ind) => !statSync(f).isDirectory())
        .map(file => Compilate(config, file));
}
