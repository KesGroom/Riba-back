import { Request, Response } from "express";
import db from "../config/connection";
import { Auth } from "../models/Auth";
import { AInformation } from "../models/A_Information";
import { DInstructor } from "../models/D_Instructor";
import { PInformation } from "../models/P_Information";
import { Recovery } from "../models/Recovery";
import { Role } from "../models/Rol";
import { User } from "../models/User";
import { encrypt, verify } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";
import { generate } from "../utils/sendgrid.handle";

export const login = async (req: Request, res: Response) => {
    const { dni, password } = req.body;
    try {
        const user = await User.findOneBy({ dni });
        if (!user) res.status(404).json({ msg: 'USER_NOT_FOUND' });
        else {
            const check = await verify(password, user.password);
            if (!check) res.status(403).json({ msg: 'INVALID_CREDENTIALS', access: false });
            const availableToken = await Auth.findOneBy({ user: { dni } });
            if (!availableToken) await newToken(user, res);
            else {
                if (parseInt(availableToken.expired) < new Date().getTime()) {
                    await availableToken.remove();
                    await newToken(user, res)
                } else {
                    res.status(200).json({
                        msg: 'SUCCESSFUL_LOGIN', data: {
                            token: availableToken.key,
                            ...await getFullUser(dni)
                        }
                    })
                };
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}

export const signOut = async (req: Request, res: Response) => {
    const token = req.headers['authorization'] || '';
    try {
        const key = token.split(' ').pop();
        console.log(token, key);

        const auth = await Auth.findOneBy({ key });
        if (!auth) res.status(403).send('Invalid session');
        else {
            await auth.remove();
            res.status(200).json({ msg: 'SESSION_CLOSED' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}

export const register = async (req: Request, res: Response) => {
    const { basicInfo, details, role } = req.body;
    try {
        const user = new User();
        user.address = basicInfo['address'];
        user.state = basicInfo['state'];
        user.city = basicInfo['city'];
        user.dni = basicInfo['dni'];
        user.email = basicInfo['email'];
        user.phone = basicInfo['phone'];
        user.lastname = basicInfo['lastname'];
        user.firstname = basicInfo['firstname'];
        const passHash = await encrypt(basicInfo['password']);
        user.password = passHash;
        const roleObj = await Role.findOneBy({ id: role });
        if (roleObj) user.role = roleObj;
        await user.save();
        if (role === 2) {
            if (roleObj) {
                const detailsTeach = new DInstructor();
                detailsTeach.company_name = details['company_name'];
                detailsTeach.position_description = details['position_description'];
                detailsTeach.position_name = details['position_name'];
                detailsTeach.specialty = details['specialty'];
                detailsTeach.start_date = details['start_date'];
                detailsTeach.working = details['working'];
                detailsTeach.user = user;
                await detailsTeach.save();
            }
        }
        if (role === 3) {
            if (roleObj) {
                const detailsPer = new PInformation();
                detailsPer.birthday = details['birthday'];
                detailsPer.disability = details['disability'];
                detailsPer.gender = details['gender'];
                detailsPer.personal_description = details['personal_description'];
                detailsPer.stratum = details['stratum'];
                detailsPer.user = user;
                await detailsPer.save();

                const detailsAca = new AInformation();
                detailsAca.academic_information = details['academic_information'];
                detailsAca.regional = details['regional'];
                detailsAca.location = details['location'];
                detailsAca.modality = details['modality'];
                detailsAca.group = details['group'];
                detailsAca.teaching_stage = details['teaching_stage'];
                detailsAca.productive_stage = details['productive_stage'];
                detailsAca.training_level = details['training_level'];
                detailsAca.end_date = details['end_date'];
                detailsAca.user = user;
                await detailsAca.save();
            }
        }
        res.status(200).json({ msg: "USER_SAVED" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}

export const generateCode = async (req: Request, res: Response) => {
    const { email } = req.body;
    try {
        const code: string = getcode();
        const checkRecovery = await Recovery.findOneBy({ email });
        if (checkRecovery) {
            await generate(email, code);
            if (code) checkRecovery.code = code;
            await checkRecovery.save()
        } else {
            const recovery = new Recovery();
            recovery.email = email;
            await generate(email, code);
            recovery.code = code;
            await recovery.save();
        }
        res.status(200).json({ msg: "CODE_SEND" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'An error occurred while making the request, please contact the area in charge.' })
    }
}

const getcode = () => {
    let code: string = '';
    for (let i = 0; i < 6; i++) code += String(Math.floor(Math.random() * 10));
    return code;
}

const newToken = async (user: User, res: Response) => {
    const token: string = generateToken(user.dni)
    const authToken = new Auth();
    authToken.expired = `${new Date().getTime() + (5 * 60 * 1000)}`;
    const sliceToken: any = token.split('.').pop()
    authToken.key = sliceToken.slice(1, -3);
    authToken.jwt = token;
    authToken.user = user;
    await authToken.save();
    res.status(200).json({
        msg: 'SUCCESSFUL_LOGIN', data: {
            token: authToken.key,
            ...await getFullUser(user.dni)
        }
    });
}

const getFullUser = async (dni: string) => {
    const user = await db
        .createQueryBuilder()
        .select([
            "users.dni", "users.firstname", "users.lastname",
            "users.email", "users.phone", "users.state",
            "users.city", "users.address",
            "roles.name", "roles.id"
        ])
        .from(User, "users")
        .leftJoin("users.role", "roles")
        .where('users.dni = :dni', { dni })
        .getMany();
    return user.shift();
}
