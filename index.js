// require('dotenv').config()
//Since using modules(used type : module in package.json), that's why used import instead of require
import 'dotenv/config'

import Bard from 'bard-ai'
//insert the token from f12-> application-> cookies-> __Secure-1PSID
await Bard.init(process.env.TOKEN);
// to continue the conversation, not just take only 1 prompt
let myChat = new Bard.Chat();

// import { Client, LegacySessionAuth } from 'whatsapp-web.js'
import pkg from 'whatsapp-web.js';
const { Client, LegacySessionAuth, RemoteAuth } = pkg;

// const { Client } = require('whatsapp-web.js');
import qrcode from 'qrcode-terminal'
// import fs from 'fs'
// const fs = require('fs');

//used remoteAuth instead of legacyAuth, 
// Require database
import {MongoStore} from 'wwebjs-mongo';
// const { MongoStore } = require('wwebjs-mongo');
import mongoose from 'mongoose'
// const mongoose = require('mongoose');

// Load the session data
mongoose.connect(process.env.MONGODB_URI).then(() => {
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    });

    client.on('qr',(qr) => {
        qrcode.generate(qr,{small:true})
    })
    
    client.on('message', async(message) => {
        console.log(`message to `, message.to,`message from `, message.from)
        const final = ` ${message.body}`
        if(message.body === '!ping') {
            message.reply('pong');
        }else{
            //     console.log(await myChat.ask(final))
            message.reply(await myChat.ask(final))
        }
    });
    client.on('ready',() => {
        console.log(`Client is ready`)
    })
    
    client.initialize();
});

// ---
// Access Bard through terminal 
// let result
// const UI = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
//   });
// UI.prompt("Enter the prompt")
// UI.on("line",async(input) => {
//     //If input entered is end, stop the bot
//     if(input === "end"){
//         UI.close()
//     }
//     result = input
//     console.log(await myChat.ask(result))
//     console.log(`Enter "end" to end the conversation`)
// })

