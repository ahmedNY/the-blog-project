import * as bcrypt from 'bcryptjs';

export function passwordHash(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
}