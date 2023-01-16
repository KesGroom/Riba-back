import { Request, Response } from "express";
import db from "../config/connection";
import { AInformation } from "../models/A_Information";
import { DInstructor } from "../models/D_Instructor";
import { PInformation } from "../models/P_Information";
import { Role } from "../models/Rol";
import { User } from "../models/User";
import { encrypt } from "../utils/bcrypt.handle";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const count = await User.count();
        const data = await db
            .createQueryBuilder()
            .select("users.dni", "dni")
            .addSelect("users.firstname", "firstname")
            .addSelect("users.lastname", "lastname")
            .addSelect("users.email", "email")
            .addSelect("users.phone", "phone")
            .addSelect("users.state", "state")
            .addSelect("users.city", "city")
            .addSelect("users.address", "address")
            .addSelect("roles.name", "role")
            .from(User, "users")
            .innerJoin("users.role", "roles")
            .getRawMany();
        res.status(200).json({ count, data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const getUser = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        let newUser: any = {};
        let data: any[] = await db.getRepository(User)
            .createQueryBuilder("users")
            .leftJoin("users.role", "roles")
            .select([
                "users.dni", "users.firstname", "users.lastname", "users.email", "users.phone",
                "users.city", "users.address", "users.state", "roles.name", "roles.id"
            ]).groupBy("users.dni").addGroupBy("roles.id").where(`users.dni=${dni}`).getMany();
        const user = data.shift();
        newUser = { ...user };
        if (user?.role.id === 3) {
            data = await db.getRepository(PInformation)
                .createQueryBuilder("personal")
                .leftJoin("personal.user", "user")
                .select([
                    "personal.gender", "personal.birthday", "personal.disability", "personal.stratum",
                    "personal.personal_description"
                ]).groupBy("personal.id").addGroupBy("user.dni").where(`user.dni=${dni}`).getMany();
            newUser['personal_details'] = { ...data.shift() }
            data = await db.getRepository(AInformation)
                .createQueryBuilder("academic")
                .leftJoin("academic.user", "user")
                .select([
                    "academic.regional", "academic.location", "academic.modality", "academic.group",
                    "academic.teaching_stage", "academic.productive_stage", "academic.training_level",
                    "academic.academic_information", "academic.end_date"
                ]).groupBy("academic.id").addGroupBy("user.dni").where(`user.dni=${dni}`).getMany();
            newUser['academic_details'] = { ...data.shift() }
        }
        if (user?.role.id === 2) {
            data = await db.getRepository(DInstructor)
                .createQueryBuilder("instructor")
                .leftJoin("instructor.user", "user")
                .select([
                    "instructor.specialty", "instructor.company_name", "instructor.position_name", "instructor.position_description",
                    "instructor.start_date", "instructor.working"
                ]).groupBy("instructor.id").addGroupBy("user.dni").where(`user.dni=${dni}`).getMany();
            console.log(data);

            newUser['instructor_details'] = { ...data.shift() }
        }
        res.status(200).json({ ...newUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}

export const postUser = async (req: Request, res: Response) => {
    const { dni, firstname, lastname, email, password, address, city, state, phone, role } = req.body;
    try {
        const passHash = await encrypt(password);
        const user = new User();
        user.firstname = firstname;
        user.email = email;
        user.lastname = lastname;
        user.dni = dni;
        user.password = passHash;
        user.address = address;
        user.city = city;
        user.state = state;
        user.phone = phone;
        const brole = await Role.findOneBy({ id: parseInt(role) });
        if (brole) user.role = brole;
        else res.status(404).json({ msg: 'ROLE_NOT_FOUND' });
        await user.save();
        res.status(200).json({ msg: 'User successfully created', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const putUser = async (req: Request, res: Response) => {
    const { dni } = req.params;
    const { body } = req;
    try {
        const user = await User.findOneBy({ dni });
        if (!user) res.status(404).json({ msg: 'USER_NOT_FOUND' });
        else {
            await user.update(body['basicInfo'], body['role']);
            await user.save();
            if (body.role === 3) {
                const personals = await db.getRepository(PInformation).createQueryBuilder('personal')
                    .where(`personal.user.dni=:dni`, { dni }).getMany();
                const personal = personals.shift();
                await personal?.update(body['details']);
                await personal?.save()
                const academics = await db.getRepository(AInformation).createQueryBuilder('academic')
                    .where(`academic.user.dni=:dni`, { dni }).getMany();
                const academic = academics.shift();
                await academic?.update(body['details']);
                await academic?.save()
                res.status(200).json({ ...user, personal_details: personal, academic_details: academic });
            } else if (body.role === 2) {
                const instructors = await db.getRepository(DInstructor).createQueryBuilder('instructor')
                    .where(`instructor.user.dni=:dni`, { dni }).getMany();
                let instructor = instructors.shift();
                if (!instructor) { instructor = new DInstructor(); instructor.user = user; }
                await instructor?.update(body['details']);
                await instructor?.save();
                res.status(200).json({ ...user, instructor_details: instructor });
            }
            else { res.status(200).json({ ...user }); }

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}
export const deleteUser = async (req: Request, res: Response) => {
    const { dni } = req.params;
    try {
        const user = await User.findOneBy({ dni });
        if (!user) res.status(404).json({ msg: 'USER_NOT_FOUND' });
        user?.remove();
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}