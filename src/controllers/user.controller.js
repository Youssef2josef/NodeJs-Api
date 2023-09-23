import { StatusCodes } from "http-status-codes";

import userService from "../services/user.service";

const STATUS = {
    success: 'OK',
    failure: 'NO'
}

/**
 * retrieve all users
 * @param req
 * @param res
 * @returns {*}
 */
const getAllUsers =  (req,res)=>{
    const users = userService.getAll();
    if(users.length > 0) {
        return res.status(StatusCodes.OK).send(users);
    }
    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: `Users NOT Found.`
    })
}

/**
 * retrieve a user
 * @param req
 * @param res
 * @returns {*}
 */
const getUser = (req,res)=>{

    const id = parseInt(req.params.id, 10);

    const user = userService.getUser(id);

    if(user) {
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            user,
        });
    }
    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: `User ${id} is not found and value is invalid`
    })
}

/**
 * add a user
 * @param req
 * @param res
 * @returns {*}
 */
const addUser = (req,res)=> {
    const {body: user} = req;

    const addedUser = userService.addUser(user);

    return res.status(StatusCodes.CREATED).send({
        status: STATUS.success,
        user: addedUser,
    });
};

/**
 * update a user
 * @param req
 * @param res
 * @returns {*}
 */
const updateUser = (req,res)=>{
        const { body:user } = req;

        const id = parseInt(req.params.id, 10);

        const updatedUser = userService.updateUser(id,user);

        if(updatedUser) {
            return res.status(StatusCodes.OK).send({
                status: STATUS.success,
                user: updatedUser,
            });
        }
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: `User ${id} is not found`
        })
};

/**
 * delete a user
 * @param req
 * @param res
 * @returns {*}
 */
const deleteUser = (req,res)=> {

    const id = parseInt(req.params.id, 10);

    const status = userService.removeUser(id);

    if (status) {
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message: `User ${id} has been deleted`,
        });
    }
    return res.status(StatusCodes.NOT_FOUND).send({
        status: STATUS.failure,
        message: `User ${id} is not found`
    })
};

export default {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,

}