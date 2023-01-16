import { Request, Response } from "express";
import { Role } from "../models/Rol";


export const getRoles = async (req: Request, res: Response) => {
    try {
        const count = await Role.count();
        const data = await Role.find();
        res.status(200).json({ count, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const getRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = (await Role.findBy({ id: parseInt(id) })).shift();
        if (!role) res.status(404).json({ msg: 'ROLE_NOT_FOUND' });
        res.status(200).json({ msg: 'Found!', role })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const postRole = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
        const role = new Role();
        role.name = name;
        await role.save();

        res.status(200).json({ msg: 'Role successfully created', role });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const putRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const role = await Role.findOneBy({ id: parseInt(id) });
        if (!role) res.status(404).json({ msg: 'ROLE_NOT_FOUND' });
        else {
            role.name = name;
            await role.save();
            res.status(200).json({ msg: 'Role successfully updated', role })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const deleteRole = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await Role.findOneBy({ id: parseInt(id) });
        if (!role) res.status(404).json({ msg: 'ROLE_NOT_FOUND' });
        role?.remove();
        res.sendStatus(204)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}