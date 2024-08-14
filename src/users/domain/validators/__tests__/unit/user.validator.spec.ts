import { UserDataBuilder } from "@/users/domain/testing/helpers/user-data-builder"
import { UserRules, UserValidator, UserValidatorFactory } from "../../user.validator"
import { UserProps } from "@/users/domain/entities/user.entity"

let sut: UserValidator
let props: UserProps

describe('UserValidator unit tests', () => {
	beforeEach(() => {
		sut = UserValidatorFactory.create()
		props = UserDataBuilder({})
	})

	it('valid case for user validator class', () => {
			const isValid = sut.validate(props)
			expect(isValid).toBeTruthy()
			expect(sut.validatedData).toStrictEqual(new UserRules(props))
		})

	describe('Name field', () => {
		it('Name field is Null', () => {
			const isValid = sut.validate(null as any)
			expect(isValid).toBeFalsy()
			//console.log(sut.errors)
			expect(sut.errors['name']).toStrictEqual([
				'name should not be empty',
				'name must be a string',
				'name must be shorter than or equal to 255 characters',
			])
		})
		it('Name field is empty', () => {
			const isValid = sut.validate({
				...props,
				name: '' as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['name']).toStrictEqual([
				'name should not be empty',
			])
		})

		it('Name field is a number', () => {
			const isValid = sut.validate({
				...props,
				name: 10 as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['name']).toStrictEqual([
				'name must be a string',
				'name must be shorter than or equal to 255 characters',
			])
		})

		it('Name field is larger than 255 characters', () => {
			const isValid = sut.validate({
				...props,
				name: 'a'.repeat(256) as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['name']).toStrictEqual([
				'name must be shorter than or equal to 255 characters',
			])
		})

		/*
		it('Name field is valid', () => {
			const props = UserDataBuilder({})
			const isValid = sut.validate(props)
			expect(isValid).toBeTruthy()
			expect(sut.validatedData).toStrictEqual(new UserRules(props))
		})
		*/
	})

	describe('Email field', () => {
		it('Email field is Null', () => {
			const isValid = sut.validate(null as any)
			expect(isValid).toBeFalsy()
			expect(sut.errors['email']).toStrictEqual([
				'email should not be empty',
				'email must be an email',
				'email must be a string',
				'email must be shorter than or equal to 255 characters',
			])
		})
		it('Email field is empty', () => {
			const isValid = sut.validate({
				...props,
				email: '' as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['email']).toStrictEqual([
				'email should not be empty',
				'email must be an email',
			])
		})

		it('Email field is a number', () => {
			const isValid = sut.validate({
				...props,
				email: 10 as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['email']).toStrictEqual([
				'email must be an email',
				'email must be a string',
				'email must be shorter than or equal to 255 characters',
			])
		})

		it('Email field is larger than 255 characters', () => {
			const isValid = sut.validate({
				...props,
				email: 'a'.repeat(256) as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['email']).toStrictEqual([
				'email must be an email',
				'email must be shorter than or equal to 255 characters',
			])
		})
	})

	describe('Password field', () => {
		it('Password field is Null', () => {
			const isValid = sut.validate(null as any)
			expect(isValid).toBeFalsy()
			expect(sut.errors['password']).toStrictEqual([
				'password should not be empty',
				'password must be a string',
				'password must be shorter than or equal to 100 characters'
			])
		})
		it('Password field is empty', () => {
			const isValid = sut.validate({
				...props,
				password: '' as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['password']).toStrictEqual([
				'password should not be empty',
			])
		})

		it('Password field is a number', () => {
			const isValid = sut.validate({
				...props,
				password: 10 as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['password']).toStrictEqual([
				'password must be a string',
				'password must be shorter than or equal to 100 characters'
			])
		})

		it('Password field is larger than 100 characters', () => {
			const isValid = sut.validate({
				...props,
				password: 'a'.repeat(101) as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['password']).toStrictEqual([
				'password must be shorter than or equal to 100 characters'
			])
		})
	})

	describe('CreatedAt field', () => {

		it('CreatedAt field is a number', () => {
			const isValid = sut.validate({
				...props,
				createdAt: 10 as any,
			})
			expect(isValid).toBeFalsy()
			//console.log(sut.errors)
			expect(sut.errors['createdAt']).toStrictEqual([
				'createdAt must be a Date instance',
			])
		})

		it('CreatedAt field is a string', () => {
			const isValid = sut.validate({
				...props,
				createdAt: '2024' as any,
			})
			expect(isValid).toBeFalsy()
			expect(sut.errors['createdAt']).toStrictEqual([
				'createdAt must be a Date instance',
			])
		})
	})
})

/*
name: [
	'name should not be empty',
	'name must be a string',
	'name must be shorter than or equal to 255 characters'
],
email: [
	'email should not be empty',
	'email must be an email',
	'email must be a string',
	'email must be shorter than or equal to 255 characters'
],
password: [
	'password should not be empty',
	'password must be a string',
	'password must be shorter than or equal to 100 characters'
]
createdAt: [
	'createdAt must be a Date instance'
]
*/