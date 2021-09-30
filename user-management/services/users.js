const fs = require("fs");


const DATA_STORE = "./data/users.json";

// Service returns json message and status code in an array
const registerUser = async (userData) => {

    try {
        data = fs.readFileSync(DATA_STORE, 'utf8');   
    } catch (error) {
        return [{error: [{ message: "There was an error connecting to the data store"}]}, 500]
    }

    dummy = JSON.parse(data);
    
    if(getUserByEmail(userData.email, dummy.users)){
        return [{error: [{ message: "This email address is already in use"}]}, 400]
    }

    //Write new user to the file
    dummy.users.push(userData);
    
    if(writeToDataStore(JSON.stringify(dummy))){
        return [{
            message:  `User registered with ID ${userData.id}`
        }, 200]
    } 
    else{
        return [{
            error: [{ msg: "There was an error connecting to the data store"}]
        }, 500]
    }
}

const getAllUsers = () => {
    try {
        data = fs.readFileSync(DATA_STORE, 'utf8');   
    } catch (error) {
        return [{error: [{ message: "There was an error connecting to the data store"}]}, 500]
    }
    dummy = JSON.parse(data);
    result = dummy.users.map(user => ({
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "profile_picture": user.profile_picture,
        "id": user.id
    }));
    return result;
}

const getUserByEmail = (userEmail, allUsers = []) => {
    if(allUsers.length<1){
        data = fs.readFileSync(DATA_STORE, 'utf8');  
        dummy = JSON.parse(data);
        allUsers = dummy.users;
    }
    userFound = allUsers.filter(user => user.email == userEmail);
    if(userFound.length>0) {
        return userFound[0];
    }
    else {
        return null;
    }
}

const getUserById = (userId, allUsers=[]) => {
    if(allUsers.length<1){
        data = fs.readFileSync(DATA_STORE, 'utf8');
        dummy = JSON.parse(data);
        allUsers = dummy.users;
    }
    userFound = allUsers.filter(user => user.id == userId);
    if(userFound.length>0) {
        return userFound[0];
    }
    else {
        return null;
    }
}

const updateUser = (user) => {
    let users = getAllUsers();
    users = users.filter(user => user.id !== user.id);
    users.push(user);
    const result = writeToDataStore(JSON.stringify({"users": users}))
    return result;
}

const writeToDataStore = (data) => {
    try{
        fs.writeFile(DATA_STORE, data, 'utf8', ()=>{});  
    }
    catch{
        return false;
    }
    return true;
}

module.exports = {
    registerUser,
    updateUser,
    getAllUsers,
    getUserByEmail,
    getUserById,
}