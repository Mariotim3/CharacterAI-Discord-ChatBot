# CharacterAI-Discord-ChatBot
A simple Discord Bot template that uses an unofficial Character.ai API wrapper to chat with users.

This code is open-sourced and created by Mariotim3, it uses https://github.com/realcoloride/node_characterai (unofficial character.ai API wrapper) package for the majority of the script. 
Huge thanks to realcoloride on GitHub for making this possible.
Check him out here! -> https://github.com/realcoloride

# ⏱️PREREQUISITES

1. NODE.JS MUST BE INSTALLED AND ADDED TO PATH. https://nodejs.org

2. THE node_characterai PACKAGE MUST BE INSTALLED. (npm install node_characterai)

3. THE discord.js PACKAGE MUST BE INSTALLED. (THIS VERSION MAY CHANGE IN THE FUTURE, SO JUST A HEADS UP!)

4. GOOGLE CHROME MUST BE INSTALLED. (YES I MEAN GOOGLE CHROME, NOT MICROSOFT EDGE OR ANOTHER BROWSER!) THIS IS BECAUSE ONE OF THE INNER PACKAGES USES A FETCHING FUNCTION THROUGH IT.

5. IF YOU GET ANY ISSUES RUNNING THIS, TRY CHECKING THAT YOU HAVE EVERYTHING INSTALLED PROPERLY. ALSO REFER TO https://github.com/realcoloride/node_characterai.
IF YOU STILL CAN'T SEEM TO GET IT WORKING, REPORT THE ISSUE ON MY GITHUB OR SHOOT ME AN EMAIL: support@enixiss.com
THANKS!


# ⚠️CAUTION WITH TOKENS

NEVER SHARE YOUR TOKENS WITH ANYONE! THIS ALLOWS THEM TO LOGIN AS YOU AND HACK YOUR CONTENT.
IF YOU DO NOT WANT TO USE YOUR CHARACTER.AI TOKEN, YOU CAN MODIFY THE CODE TO WORK USING THE GUEST VERSION.

TO DO THIS, GO TO LINE 76 AND ->

CHANGE: await newCharacter.authenticateWithToken(CHARACTER_AI_TOKEN); 
TO: await newCharacter.authenticateAsGuest();

*(DISCORD TOKEN WILL STILL BE REQUIRED BECAUSE IT IS NEEDED TO RUN THE BOTS!)
