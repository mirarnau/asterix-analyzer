export async function SliceMessageBuffer(item : Buffer) {

    let first = 0;
    let last = 0;

    let messages = [];
    while (last < item.length) {
        const len = item.subarray(first + 1, first + 3).readInt16BE();
        last = first + len;
        messages.push(item.subarray(first, last));
        first = last;
    }
    return messages;
    
}
