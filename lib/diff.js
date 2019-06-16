import { diffJson } from 'diff';

// eslint-disable-next-line
export function getDiff(currentLog, previousLog, short = false) {
    if (previousLog) {
        const diff = diffJson(previousLog.state, currentLog.state);

        const fragment = document.createDocumentFragment();

        diff.forEach((part, i) => {
            // green for additions, red for deletions
            // grey for common parts
            if (short) {
                const lineCount = 2;
                if (i === 0) {
                    part.value = part.value.split('\n').slice(-lineCount - 1).join('\n');
                } else if (i === diff.length - 1) {
                    part.value = part.value.split('\n').slice(0, lineCount).join('\n');
                }
            }
            const color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
            const span = document.createElement('span');
            span.style.color = color;
            span.appendChild(document.createTextNode(part.value));
            fragment.appendChild(span);
        });

        const div = document.createElement('div');
        div.appendChild(fragment.cloneNode(true));

        // your document fragment to a string (w/ html)! (yay!)
        return div.innerHTML;
    }
    return JSON.stringify(currentLog.state, null, 4);
}