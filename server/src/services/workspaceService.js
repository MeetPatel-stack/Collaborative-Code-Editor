import bcrypt from "bcrypt";
import Workspace from "../models/Workspace.js";

export const createWorkspaceService =
async ({
    name,
    type,
    ownerId,
    password,
}) => {

    const passwordHash =
        await bcrypt.hash(password,10);

    const workspace =
        await Workspace.create({

            name,

            type,

            owner:ownerId,

            passwordHash,

        });

    return workspace;
};