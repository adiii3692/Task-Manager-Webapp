# AD's To Do MERN App !

## Sneak Peek:
![tasks](https://github.com/user-attachments/assets/408a1765-c919-4996-83b5-5b6780710a42)
![login](https://github.com/user-attachments/assets/402680f6-47db-4046-b87d-bf7bfa74bc8e)
![signup](https://github.com/user-attachments/assets/8c213124-f2ba-46ea-bd7f-f37e132073e0)
![create](https://github.com/user-attachments/assets/fb59dad0-d367-40f3-83d7-de03c58f4fb0)
![update](https://github.com/user-attachments/assets/47fb4705-41fe-4958-b0d0-912980012c8f)
![delete](https://github.com/user-attachments/assets/7a373d22-760d-4117-bc97-27fe89077b73)

## Tech Used:
1. HTML
2. Tailwind CSS
3. MongoDB
4. Express.js
5. React.js
6. Node.js

## Description:
This project is a simple to do list app made using the MERN stack

### Features:
* Users can signup for an account and login to access the dashboard
* Upon logging in, the user can view their tasks if any, or create new tasks
* Users can also edit an existing task and choose to delete it
* Users can logout upon logging all of their tasks

## How to run the webapp?
* It is recommended to open all the files in a code editor such as VS Code (Preferably)
* If not already downloaded, you need to ensure that you have downloaded the latest version of [Node.js](https://nodejs.org/en/download/package-manager).
* After downloading Node.js and the necessary code editor, you need to use the code editor to open the 'ToDo' folder on your device
* The code editor **MUST** be opened into the directory in which all the files are located
* After opening the code editor into the 'ToDo' folder, create a new terminal session on VS Code and run the following command:
  
```
cd server
npm run build
npm run dev
```
* Upon entering the following commands nodemon should execute the index.js file and make a connection to the MongoDB databse
* Additionally, the app should be listening to **port: 5555**
* Next, make another terminal session, making sure not to terminate the session on which the server is running
* Run the following commands on the new terminal session:

```
cd client
npm i
npm run dev
```
* After running the commands, the vite react app should run on a localhost web server link mentioned on the command line
* Click on the link to open the webapp and enjoy !!
