import { exec, execAsync, monitorFile } from 'resource:///com/github/Aylur/ags/utils.js';
import App from 'resource:///com/github/Aylur/ags/app.js';

const srcDir = `${App.configDir}/src`;
const cssDir = `${App.configDir}/styles`;
const mainCssFile = `${cssDir}/main.scss`;
const distDir = `${App.configDir}/dist`;
const distJsDir = `${distDir}/js`;
const distJsEntry = `${distJsDir}/main.js`;
const distCssFile = `${distDir}/main.css`;

const entry = `${srcDir}/main.ts`;

await execAsync(['mkdir', '-p', distDir]);

try {
    await execAsync([
        'bun',
        'build',
        entry,
        '--outdir',
        distJsDir,
        '--external',
        'resource://*',
        '--external',
        'gi://*',
    ]);
} catch (error) {
    console.error(error);
}

let lastCssUpdated = Date.now();
const updateCss = (timeout = 100) => {
    let now = Date.now();

    if (now - lastCssUpdated > timeout) {
        exec(`sassc ${mainCssFile} ${distCssFile}`);
        App.resetCss();
        App.applyCss(distCssFile);
    }

    lastCssUpdated = now;
};

updateCss();

// watch and reload css files
monitorFile(
    // css directory
    cssDir,

    // on change callback
    (file) => {
        print(file);
        updateCss();
    },

    // clarify that it is a directory
    'directory'
);

const main = await import(`file://${distJsEntry}`);

export default { ...main.default, style: distCssFile };
