import { basename, dirname } from "path";
import http from 'https'; // or 'https' for https:// URLs
import { existsSync, mkdirSync, statSync, writeFile } from 'fs';
import UiProgressBar from "./com.ui.progress";
export async function ManagerDownload(local, url, encoding, name) {
    return new Promise((done, fail) => {
        const filename = `${local}/.caches/${name || basename(url)}`;
        const dir = dirname(filename);
        if (!existsSync(dir)) {
            mkdirSync(dir, { recursive: true });
        }
        if (!statSync(dir).isDirectory()) {
            mkdirSync(dir, { recursive: true });
        }
        http.get(url, (r) => {
            if (r.headers.location && r.statusCode == 302) {
                const request = http.get(r.headers.location, (response) => {
                    if (encoding) {
                        response.setEncoding(encoding);
                    }
                    const progress = UiProgressBar();
                    let len = parseInt(response.headers['content-length'] || '');
                    let body = "";
                    let cur = 0;
                    progress.start(len, 0);
                    response.on("data", function (chunk) {
                        body += chunk;
                        cur += chunk.length;
                        progress.update(cur * 1);
                    });
                    response.on("end", function () {
                        progress.update(100);
                        progress.stop();
                        writeFile(filename, body, 'binary', (er) => {
                            if (er) {
                                fail('File not created');
                                return;
                            }
                            setTimeout(() => { done(filename); }, 500);
                        });
                    });
                    request.on("error", function (e) {
                        fail(e.message);
                    });
                });
            }
            else {
                fail(r.statusCode);
            }
        });
    });
}
