export class MessageClassifier {

    public async classifyMessage(messages : Buffer[], numberOfMessages : number) : Promise<string[]>{

        let messagesCategory : string[] = [];
    
        if (numberOfMessages != -1) {
            messages = messages.slice(0, numberOfMessages);
        }
    
        messages = messages.filter((v) => v[0] === 10 || v[0] === 21);
    
        messagesCategory = await Promise.all(
            messages.map(async (v) => {
              if (v[0] === 10) {
                return "cat10";
              }
                return "cat21";
            })
          );
        return messagesCategory;    
    }

    public async sliceMessageBuffer(item : Buffer) {

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

}