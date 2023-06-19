// require('dotenv').config()
//Since using modules(used type : module in package.json), that's why used import instead of require
import 'dotenv/config'
import readline from 'readline'
import Bard from 'bard-ai'
//insert the token from the bard page, press f12-> go to application tab -> in cookies section -> __Secure-1PSID
await Bard.init(process.env.TOKEN);
// to continue the conversation, not just take only 1 prompt
let myChat = new Bard.Chat();
let result
const UI = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
UI.prompt("Enter the prompt")
UI.on("line",async(input) => {
    //If input entered is end, stop the bot
    if(input === "end"){
        UI.close()
    }
    result = input
    console.log(await myChat.ask(result))
    console.log(`Enter "end" to end the conversation`)
})

