import bcrypt from 'bcrypt';

// Encrypt password using bcrypt salt rounds
const encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
};

// Compare the password with the encrypted password
const comparePassword = async (
    password: string,
    encryptedPassword: string,
): Promise<boolean> => {
    return await bcrypt.compare(password, encryptedPassword);
};

export { encryptPassword, comparePassword };
