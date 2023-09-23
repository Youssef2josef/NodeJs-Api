import users from "../data/user.data";

const get = (userId) =>{
    return users.find((user) => {
        if (user.id === userId) {
            return user;
        }
        return null;
    });
}

const getAll = () => users ;

/**
 * UPDATE a user from its ID
 * @param {integer} userId
 * @param {Object} newDetails
 * @returns {*|boolean}
 */
const update = (userId,newDetails) => {
    let existingUser = null;
    let userIndex ;
    users.map((user,index)=>{
        if(user.id === userId){
            existingUser = user;
            userIndex = index;
        }
    });

    if(!existingUser){
        return false;
    }

    const updatedUser = {
        ...existingUser,
        ...newDetails,
    }

    users.splice(userIndex,1,updatedUser);
    return updatedUser;
}

/**
 * INSERT a user
 * @param {Object} details
 * @returns {*&{id: number}}
 */
const insert = (details) =>{
    const newUser = {
        id:users.length+1,
        ...details
    };
    users.push(newUser);
    return newUser;
}

/**
 * DELETE a user from its ID
 * @param {integer} userId
 * @returns {*}
 */
const remove = (userId) =>{
    const deleteUser = (user,index) => {
        if(user.id === userId){
            users.splice(index,1);
            return true;
        }
        return false;
    }
    return users.find(deleteUser);
}

export default {
    get,
    getAll,
    update,
    insert,
    remove
}