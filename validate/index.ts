const InputFile = 'input.txt';
const OutputFile = 'output.txt';
const ErrorFile = 'error.txt';
const OutputList = 'output.list.txt';

const Pattern = /^[0-9a-f]{64}$/;

async function main() {
    const outputLines: string[] = [];
    const errorLines: string[] = [];

    const text = await Bun.file(InputFile).text();
    const lines = text.split('\n').filter(line => line.trim() !== '');
    for (const orig of lines) {
        const line = orig.trim().replaceAll(' ', '');
        const ok = Pattern.test(line);
        if (ok) {
            outputLines.push(line);
        } else {
            errorLines.push(line);
        }
    }

    await Bun.write(OutputFile, outputLines.join('\n'));
    await Bun.write(ErrorFile, errorLines.join('\n'));

    const outputListLines = outputLines.toSorted().map(line => `'${line}',`);
    await Bun.write(OutputList, outputListLines.join('\n'));
}
main();
