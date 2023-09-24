import { StatusCodes } from "http-status-codes";
import pino from 'pino';

import userService from "../services/user.service";

const { format } = require('date-fns');

const logger = pino();
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
        logger.info(`Fetching all users`);

        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            users,
        });
    }
    else {
        const errorMessage = `Users NOT Found.`;
        logger.error(errorMessage);

        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: errorMessage
        })
    }
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
        logger.info(`Fetching ${id} user`);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            user,
        });
    }
    else {
        const errorMessage = `User ${id} is not found and value is invalid`;
        logger.error(errorMessage);
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: errorMessage
        })
    }
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

    logger.info('Creating a user');

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
            logger.info(`Updating ${id} user`);

            return res.status(StatusCodes.OK).send({
                status: STATUS.success,
                user: updatedUser,
            });
        }

        else {
            const errorMessage = `User ${id} is not found`;
            logger.error(errorMessage);
            return res.status(StatusCodes.NOT_FOUND).send({
                status: STATUS.failure,
                message: errorMessage
            })
        }
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
        logger.info(`Removing ${id} user`);
        return res.status(StatusCodes.OK).send({
            status: STATUS.success,
            message: `User ${id} has been deleted`,
        });
    }
    else {
        const errorMessage = `User ${id} is not found`;
        logger.error(errorMessage);
        return res.status(StatusCodes.NOT_FOUND).send({
            status: STATUS.failure,
            message: errorMessage
        })
    }
};

export default {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,

}