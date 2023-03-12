export async function name(messages : Buffer[], numberOfMessages : number) : Promise<string[]>{

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