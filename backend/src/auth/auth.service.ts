import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterAdminDto } from './dto/register-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {

    console.log(dto.email,dto.password, dto.fullName);

    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new BadRequestException('Email already exists');
    }

    const hash = await bcrypt.hash(dto.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
      },
    });

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };
  }

  async registerAdmin(dto: RegisterAdminDto) {
    if (dto.adminSecret !== process.env.ADMIN_REGISTER_SECRET) {
      throw new BadRequestException('Invalid admin secret');
    }

    const hash = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash,
        fullName: dto.fullName,
        role: 'ADMIN',
      },
    });
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
    });

    if (!user || !user.password) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const ok = await bcrypt.compare(dto.password, user.password);

    if (!ok) {
        throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: '7d',
    });

    await this.prisma.user.update({
        where: { id: user.id },
        data: {
          refreshToken: await bcrypt.hash(refreshToken, 10),
        },
      });

    return {
        access_token: accessToken,
        refresh_token: refreshToken,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        }
    };
  }

  // async socialLogin(userData: any) {
  //   let user = await this.prisma.user.findFirst({
  //     where: {
  //       provider: userData.provider,
  //       providerId: userData.providerId,
  //     },
  //   });

  //   if (!user) {
  //     user = await this.prisma.user.create({
  //       data: {
  //         email: userData.email,
  //         fullName: userData.fullName,
  //         avatar: userData.avatar,
  //         provider: userData.provider,
  //         providerId: userData.providerId,
  //       },
  //     });
  //   }

  //   const payload = { sub: user.id, email: user.email, role: user.role };

  //   const accessToken = await this.jwt.signAsync(payload, { expiresIn: '15m' });
  //   const refreshToken = await this.jwt.signAsync(payload, { expiresIn: '7d' });

  //   await this.prisma.user.update({
  //     where: { id: user.id },
  //     data: { refreshToken },
  //   });

  //   return { access_token: accessToken, refresh_token: refreshToken };
  // }


  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    const payload = await this.jwt.verifyAsync(refreshToken);

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.refreshToken) throw new UnauthorizedException();

    
    const match = await bcrypt.compare(refreshToken, user.refreshToken);

    if (!match) {
      throw new UnauthorizedException();
    }

    const newAccessToken = await this.jwt.signAsync(
      {
        sub: user.id, 
        email: user.email, 
        role: user.role 
      },
      { expiresIn: '15m' },
    );

    return { access_token: newAccessToken };
  }

  async logout(userId: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshToken: null },
    });

    return { message: 'Logged out' };
  }
}