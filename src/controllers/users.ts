import { Request, Response } from "express";
import User from "../models/User";

export const getUsers = async (req: Request, res: Response) => {
    try {
        const data = await User.findAll();
        res.status(200).json({data});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const getUser = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const postUser = async (req: Request, res: Response) => {
    const { dni, firstName, lastName, email, password } = req.body;
    try {

        res.status(200).json({ msg: 'USER CREATED', data: {} })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const putUser = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    try {

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}