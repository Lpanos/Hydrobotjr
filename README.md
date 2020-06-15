# Hydro Bot Jr.

Hydro Bot Jr. is a discord bot specializing in server economics with other added features.

## Installation

- Install node latest stable release, this was built with node v6.11.0

- For windows: 
  ```bash
  npm install --global --production windows-build-tools
  
  npm install
  ```
## Configuration
- Get a token string for your bot from by registering your bot here: [https://discordapp.com/developers](https://discordapp.com/developers)
  
  - You should be able to find options to invite your bot to a channel here as well
- Open `config.json` and replace the content between the quotes ```"<TOKEN-HERE>"``` with your bot token.

# Commands
- Meme 
    - Use this command and specify a subreddit to generate a trending post

- Set
    - This command is for server config options (Prefix, Admin Roles)

- Syntax \<command> 
    - Use this command to get the correct syntax for another command

- Clear \<number>
    - Clears the channel of a set amount of messages

- Reactionrole \<argument> <role/emoji>
    - Create a role reaction message

- Stats 
    - See Hydrobot's stats

- Swagtest \<user>
    - See what % swag someone is

- Quote and/or <add/remove> 
    - Get a random quote from your server

## Economy Commands
- Inventory
    - Shows you the current items in your inventory.

- Work 
    - The main way of getting money.
    
- Daily | Weekly | Monthly 
    - Claim these to get more coal

- Rob 
    - Steal someones money, if you have a weapon in your inventory)

- Pay
    - Give someone else some of your money

- Store
    - Lists items you can buy

- Blackmarket 
    - Items you can buy on the black market

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Running the Application
```python
node index.js
```
