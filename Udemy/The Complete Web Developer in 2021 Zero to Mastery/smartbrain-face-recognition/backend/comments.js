/*
$ npm install bcrypt


 // You can copy and run the code below to play around with bcrypt
 // However this is for demonstration purposes only. Use these concepts
 // to adapt to your own project needs.
 
import bcrypt from'bcrypt'
const saltRounds = 10 // increase this if you want more iterations  
const userPassword = 'supersecretpassword'  
const randomPassword = 'fakepassword'
 
const storeUserPassword = (password, salt) =>  
  bcrypt.hash(password, salt).then(storeHashInDatabase)
 
const storeHashInDatabase = (hash) => {  
   // Store the hash in your password DB
   return hash // For now we are returning the hash for testing at the bottom
}
 
// Returns true if user password is correct, returns false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) =>  
  bcrypt.compare(enteredPassword, storedPasswordHash)
 
 
// This is for demonstration purposes only.
storeUserPassword(userPassword, saltRounds)  
  .then(hash =>
    // change param userPassword to randomPassword to get false
    checkUserPassword(userPassword, hash)
  )
  .then(console.log)
  .catch(console.error)
*/