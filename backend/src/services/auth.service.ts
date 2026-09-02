import bcrypt from "bcryptjs";
import { AppError } from "../errors/AppError.js";
import { prisma } from "../lib/prisma.js";
import { signToken } from "../lib/jwt.js";
import { DEFAULT_NOTES, EMAIL_REGEX } from "../constants/common.constant.js";
import { Prisma, type Note } from "../generated/prisma/client.js";

export const login = async (
  email: string,
  password: string,
  shallRemember: boolean,
) => {
  const isEmailValid = EMAIL_REGEX.test(email);

  if (!isEmailValid) throw new AppError(400, "Invalid email");

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new AppError(401, "Invalid credentials");

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) throw new AppError(401, "Invalid credentials");

  const token = signToken({ userId: user.id });

  let refreshToken;

  if (shallRemember) {
    refreshToken = signToken({ userId: user.id }, true);
  }

  const { password: _, ...userWithoutPassword } = user;

  return {
    ...userWithoutPassword,
    token,
    refreshToken: refreshToken || null,
  };
};

export const registerUser = async (
  name: string,
  email: string,
  password: string,
) => {
  if (!name) throw new AppError(400, "name is required");

  if (!email) throw new AppError(400, "email is required");

  if (!password) throw new AppError(400, "password is required");

  const isEmailValid = EMAIL_REGEX.test(email);

  if (!isEmailValid) throw new AppError(400, "Invalid email");

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    const notes = DEFAULT_NOTES.map((note) => ({
      ...note,
      userId: user.id,
    })) as Note[];

    await prisma.note.createMany({
      data: notes,
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002 is Prisma's code for Unique Constraint Violation
      if (error.code === "P2002") {
        throw new AppError(409, "Email already exists");
      }
    }
    throw error;
  }
};
