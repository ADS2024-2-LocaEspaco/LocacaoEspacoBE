import {
	IsDate,
	IsEmail,
	IsNotEmpty,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength
} from 'class-validator';
import { UserProps } from '../entities/user.entity';
import { ClassValidatorFields } from '@/shared/domain/validators/class-validator-fields';

export class UserRules {
	@MaxLength(255)
	@IsString()
	@IsNotEmpty()
	name: string

	@MaxLength(255)
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string

	@MaxLength(100)
	@IsString()
	@IsNotEmpty()

	@IsDate()
	@IsOptional()
	createdAt: Date

	constructor({ email, name, createdAt }: UserProps) {
		Object.assign(this, { email, name, createdAt })
	}
}

export class UserValidator extends ClassValidatorFields<UserRules> {
	validate(data: UserProps): boolean {
		return super.validate(new UserRules(data ?? ({} as UserProps)))
	}
}

export class UserValidatorFactory {
	static create(): UserValidator {
		return new UserValidator()
	}
}