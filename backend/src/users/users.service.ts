import { Injectable } from '@nestjs/common'
import { User } from './entities/user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/CreateUserDto'
import { UpdateUserDto } from './dto/UpdateUserDto'
import { randomBytes } from 'crypto'
import * as shajs from 'sha.js'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly users: Repository<User>
  ) {}

  public async createUser (createUserDto: CreateUserDto): Promise<void> {
    const salt = randomBytes(4).toString('hex')
    const password = await this.hashPassword(createUserDto.password, salt)

    await this.users.insert({
      login: createUserDto.login,
      bio: createUserDto.bio,
      follower: 0,
      following: 0,
      avatar: 'default',
      password,
      salt
    })
  }

  public async checkLoginClaim (login: string): Promise<boolean> {
    return await this.findUserByLogin(login) !== undefined
  }

  public async findUserByLogin (login: string, secret = false): Promise<User | undefined> {
    return await this.users.findOne({
      where: { login },
      select: {
        id: true,
        login: true,
        bio: true,
        createdAt: true,
        follower: true,
        following: true,
        avatar: true,
        password: secret,
        salt: secret
      }
    }) ?? undefined
  }

  public async findAllUser (): Promise<User[]> {
    return await this.users.find()
  }

  public async findUser (id: number): Promise<User | undefined> {
    return await this.users.findOne({
      where: { id }
    }) ?? undefined
  }

  public async updateUser (id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.users.update(
      { id },
      updateUserDto
    )
  }

  public async hashPassword (password: string, salt: string): Promise<string> {
    return shajs('SHA512').update(salt + password).digest('hex')
  } 
}