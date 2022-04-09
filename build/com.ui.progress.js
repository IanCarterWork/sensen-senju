import cliProgress from 'cli-progress';
import cliSpinners from 'cli-spinners';
export default function UiProgressBar() {
    return new cliProgress.SingleBar({
        format: '{value}/{total} ' + ('{bar}') + ' {percentage}%',
        // barCompleteChar: '\u2588',
        // barIncompleteChar: '\u2591',
        // barsize: 10,
        fps: 10,
        clearOnComplete: true,
        autopadding: true,
        // stream: process.stdout,
    }, cliProgress.Presets.shades_grey);
}
export function UiSpinner(type) {
    console.log((type) ? cliSpinners[type] : cliSpinners.dots2);
}
