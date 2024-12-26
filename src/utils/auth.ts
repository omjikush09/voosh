import { user } from "@prisma/client";
import crypto from "crypto";
import { DecodeOptions, sign, verify } from "jsonwebtoken";

// verify JWT token
const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const verifyAndGetTokenData = async (token: string): Promise<null | user> => {
	
	return new Promise((resolve, reject) => {
	 verify(token, JWT_SECRET, (err, decoded) => {
		if (err) {
			resolve(null);
		}
		resolve(decoded as user);
	});
	return null;
});
};

export const createToken = (payload: any) => {
	return sign(payload, JWT_SECRET, { expiresIn: "24h" });
};

export const createHash = async (password: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const saltLength = 16;
		const keyLength = 64;
		const digest = "sha512";
		const iterations = 1000;
		const salt = crypto.randomBytes(saltLength).toString("hex"); // Generate a random salt

		crypto.pbkdf2(
			password,
			salt,
			iterations,
			keyLength,
			digest,
			(err, derivedKey) => {
				if (err) reject(err);
				resolve(
					`${salt}:${iterations}:${keyLength}:${digest}:${derivedKey.toString(
						"hex"
					)}`
				);
			}
		);
	});
};


export const verifyPassword = async (
	password: string,
	storedHash: string
): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const [salt, iterations, keyLength, digest, originalHash] =
			storedHash.split(":");
		crypto.pbkdf2(
			password,
			salt,
			parseInt(iterations, 10),
			parseInt(keyLength, 10),
			digest,
			(err, derivedKey) => {
				if (err) reject(err);
				resolve(derivedKey.toString("hex") === originalHash);
			}
		);
	});
};