/*

This code is open-sourced and created by Mariotim3, it uses https://github.com/realcoloride/node_characterai (unofficial character.ai API wrapper) package for the majority of the script. 
Huge thanks to realcoloride on GitHub for making this possible.
Check him out here! -> https://github.com/realcoloride

- PREREQUISITES -

1. NODE.JS MUST BE INSTALLED AND ADDED TO PATH. https://nodejs.org
2. THE node_characterai PACKAGE MUST BE INSTALLED. (npm install node_characterai)
3. THE discord.js PACKAGE MUST BE INSTALLED. (THIS VERSION MAY CHANGE IN THE FUTURE, SO JUST A HEADS UP!)
4. GOOGLE CHROME MUST BE INSTALLED. (YES I MEAN GOOGLE CHROME, NOT MICROSOFT EDGE OR ANOTHER BROWSER!) THIS IS BECAUSE ONE OF THE INNER PACKAGES USES A FETCHING FUNCTION THROUGH IT.

5. IF YOU GET ANY ISSUES RUNNING THIS, TRY CHECKING THAT YOU HAVE EVERYTHING INSTALLED PROPERLY. ALSO REFER TO https://github.com/realcoloride/node_characterai.
IF YOU STILL CAN'T SEEM TO GET IT WORKING, REPORT THE ISSUE ON MY GITHUB OR SHOOT ME AN EMAIL: support@enixiss.com
THANKS!


- CAUTION WITH TOKENS -

NEVER SHARE YOUR TOKENS WITH ANYONE! THIS ALLOWS THEM TO LOGIN AS YOU AND HACK YOUR CONTENT.
IF YOU DO NOT WANT TO USE YOUR CHARACTER.AI TOKEN, YOU CAN MODIFY THE CODE TO WORK USING THE GUEST VERSION.

TO DO THIS, GO TO LINE 76 AND ->

CHANGE: await newCharacter.authenticateWithToken(CHARACTER_AI_TOKEN); 
TO: await newCharacter.authenticateAsGuest();

(DISCORD TOKEN WILL STILL BE REQUIRED BECAUSE IT IS NEEDED TO RUN THE BOTS!)

*/


const CharacterAI = require("node_characterai");

const CHARACTER_ID = ""; // THIS CAN BE FOUND IN THE URL OF YOUR CHARACTER ON CHARACTER.AI
const CHARACTER_AI_TOKEN = ""; // THIS IS YOUR CHARACTER AI TOKEN. THIS CAN BE FOUND ONCE YOU'RE LOGGED IN. FIRST, OPEN UP DEVELOPER TOOLS USING F12, GO TO THE "APPLICATION" TAB, THEN GO TO THE LOCAL STORAGE, AND CLICK ON "https://beta.character.ai/" AND ONCE YOU OPEN THIS, A SIDE PANEL SHOULD OPEN. IN THIS PANEL, FIND THE @@auth0, TO THE RIGHT OF THIS, THERE SHOULD BE SOMETHING THAT SAYS "ACCESS TOKEN", YOU'LL WANT TO COPY THE TOKEN AND PASTE IT IN HERE.

const DISCORD_BOT_TOKEN = ""; // SET THIS AS YOUR DISCORD BOT TOKEN

const ALLOWED_CHANNELS = ["1234567890"]; // To allow the bot to chat in a specific channel(s), put the channel IDs in here with "" around the start and end of the number.


// Send the message
function sendChatToAI(message, character) {
  (async () => {
    console.log("Preparing to create/continue conversation...");

    const chat = await character.createOrContinueChat(CHARACTER_ID);
    const response = await chat.sendAndAwaitResponse(
      message.author.username + ": " + message.content,
      true
    );

    if (!message.channel.messages.fetch(message.id)) {
      return;
    }

    if (!response) {
      return message.reply("I'm sorry but it seems that there was a problem. :(");

    }

    if (!response.text) {
      return message.reply("I'm sorry but it seems that there was a problem. :(");
    }

    return message.reply(response.text);
  })();
}

async function createNewCharacterToRespond(message) {
  console.log("Authenticating new character to respond...");

  const newCharacter = new CharacterAI();
  await newCharacter.authenticateWithToken(CHARACTER_AI_TOKEN);

  console.log("message received and sending!");
  message.channel.sendTyping();
  return sendChatToAI(message, newCharacter);
}

// Create a new Discord client
const { Client } = require("discord.js");

// Create a new Discord client with specified intents

const client = new Client({
  intents: [
    "MessageContent",
    "DirectMessages",
    "Guilds",
    "GuildMessages",
    "DirectMessageTyping",
  ],
});

// Create an event handler for when the bot is ready
client.once("ready", () => {
  console.log(`${client.user.tag} is ready!`);
});

// Create an event handler for when a message is received
client.on("messageCreate", (message) => {
  
  if (message.author.bot) return; // Ignore messages from bots

  console.log("message received!");

  let channel_is_allowed = false;

  for(let v in ALLOWED_CHANNELS){
    if (message.channelId === ALLOWED_CHANNELS[v]){ // Checks if the channel the message was sent in is found in the "ALLOWED_CHANNELS" array.
      channel_is_allowed = true;
    }
  }

  if (channel_is_allowed === true){
    return createNewCharacterToRespond(message);
  }

});

client.login(DISCORD_BOT_TOKEN);
