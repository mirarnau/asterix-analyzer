import { Cat10 } from "../cat10/Cat10";
import { Cat21 } from "../cat21/Cat21";
import { Cat10Adapter } from "./adapters/Cat10Adapter";
import { Cat21Adapter } from "./adapters/Cat21Adapter";

export class MessageClassifier {

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

  public async classifyMessage(messages : Buffer[], numberOfMessages : number) : Promise<Buffer[]>{

      let messagesCategory : Buffer[] = [];
  
      if (numberOfMessages != -1) {
          messages = messages.slice(0, numberOfMessages);
      }
  
      messages = messages.filter((v) => v[0] === 10 || v[0] === 21);
  
      messagesCategory = await Promise.all(
          messages.map(async (v) => {
            return v;
            if (v[0] === 10) {
              //return "cat10";
            }
              //return "cat21";
          })
        );
      return messagesCategory;    
  }

  public async classifyMessageCat(messages : Buffer[], numberOfMessages : number) : Promise<(Cat10|Cat21)[]>{

    let cat10Adapter : Cat10Adapter = new Cat10Adapter();
    let cat21Adapter : Cat21Adapter = new Cat21Adapter();
    //let cat10 : Cat10;
    let decodedMessages: (Cat10|Cat21)[] = [];

    if (numberOfMessages != -1) {
        messages = messages.slice(0, numberOfMessages);
    }

    messages = messages.filter((v) => v[0] === 10 || v[0] === 21);

    //const decodedMessages : Buffer[] = [];

    for (let i = 0; i < messages.length; i++) {
      const v = messages[i];
      if (v[0] === 10) {
        decodedMessages[i] = await cat10Adapter.adapt(v, i);
      } else {
        decodedMessages[i] = await cat21Adapter.adapt(v, i);
      }
    }
    return decodedMessages;
}

}