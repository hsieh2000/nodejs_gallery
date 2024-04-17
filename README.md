Using the Node.js Express framework to build an online gallery, combined with MongoDB to control system access.

# Usage:
## 1. Download NodeJS  
   click this link to download NodeJS, https://nodejs.org/en/download  
   
   ### For MacOS:  
   After installation, you should be able to run node and npm in terminal.  
   To check if the installation success, run ```node -v``` and ```npm -v``` to see version of node and npm.  
   
   ### For Windows:  
   After installation, open Node.js command prompt to enter script  
   To check if the installation success, run ```node -v``` and ```npm -v``` to see version of node and npm.
   
## 2. Install MongoDB Community Server
   click this link to download MongoDB Community Server, https://www.mongodb.com/try/download/community

   ### For MacOS: 
   * After download and unzip the tgz package, you need to move the package to home directory by running ```mv mongodb-macos-aarch64-7.0.8 /Users/jeremyhsieh/```.
   * Next, cd to home directory and run ```ls -al``` to find **.zshrc**, a configuration file used for setting up and customizing the user environment.  
   * Run ```open .zshrc``` to open **.zshrc** and set environment variable by adding ```export PATH=${PATH}:/Users/jeremyhsieh/mongodb-macos-aarch64-YOUR_DB_VERSION/bin```
   * After save the modified **.zshrc**, run ```source .zshrc``` to update environment variable.
   * Finally, create folder **~/data/db/**, this is the default path of MongoDB for data storage.

     To check if you successfully install MongoDB, run ```mongod --version``` in terminal to see the version of MongoDB.  
     Now, you should able to start MongoDB by running ```mongod``` in terminal.
     If you wish to use mongosh in terminal, click this link to download MongoDB Shell https://www.mongodb.com/try/download/shell and do the same steps as how you install MongoDB.  
   
   ### For Windows:  
   > Here are two types of packages you could download for MongoDB: MSI and ZIP.  
   > Either MSI or ZIP is available, the difference between these two type is that MSI will directly install package under **C:\Program Files\MongoDB\\**.  
   > On the contrary, you will need to manually unzip and move the package to your destinated path if you choose ZIP. 

   
   
4. Download the repo and unzip it.
5. Open your terminal and cd to the repo file
