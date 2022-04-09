const onezip = require('onezip');
/**
 *
 * @param { string } form
 * @param { string } to
 * @param {{
 *      ready?: (name : string) => void,
 *      start?: (percent : number) => void,
 *      progress?: (percent : number) => void,
 *      error?: (error : any) => void,
 *      done?: (to : string) => void,
 * }} on
 * @returns { Promise<string> }
 */
export function UnArchivage(from, to, on = null) {
    return new Promise((done, fail) => {
        on = on || {};
        const extract = onezip.extract(from, to);
        extract.on('file', (name) => {
            on.ready(name);
        });
        extract.on('start', (percent) => {
            on.start(percent);
        });
        extract.on('progress', (percent) => {
            on.progress(percent);
        });
        extract.on('error', (err) => {
            fail(err);
            on.error(err);
        });
        extract.on('end', () => {
            on.done(to);
            done(to);
        });
    });
}
