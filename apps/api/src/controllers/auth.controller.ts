import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ApiError, cookieOptions } from '@firewall/utils';
import { User } from '@firewall/db';


const generateAccessAndRefreshToken = async (role: string, id: mongoose.Types.ObjectId) =>  {
      const accessToken = sign(
      {
            id,
            role,
      },
      'SOME_SECRET',
      { expiresIn: '15m' }
      );
      
      const refreshToken = sign(
      {
            id,
            role,
      },
      'SOME_SECRET',
      { expiresIn: '7d' }
      );
      
      return { accessToken, refreshToken };
}

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return next(new ApiError('Username, email, and password are required', 400));
    }

    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return next(new ApiError('User already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashedPassword });

    const token = sign(
      {
        id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        role: newUser.role,
      },
      'SOME_SECRET'
    );

    res.cookie('token', token, cookieOptions);
    return res.status(201).json({
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    return next(new ApiError('An error occurred', 500));
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError('Email and password are required', 400));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(new ApiError('Invalid credentials', 400));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ApiError('Invalid credentials', 400));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user.role,
      user.id
    );

    res.cookie('accessToken', accessToken, cookieOptions);
    res.cookie('refreshToken', refreshToken, cookieOptions);

    return res.status(200).json({
      message: 'Login successful',
      data: user,
    });
  } catch (error) {
    return next(new ApiError('An error occurred', 500));
  }
};


export { registerUser, loginUser };