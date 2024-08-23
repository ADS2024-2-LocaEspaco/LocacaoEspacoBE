import { Entity } from '../entities/entity';
import { NotFoundError } from '../errors/not-found-error';
import { RepositoryInterface } from './repository-contracts';

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
	items: E[] = []

	async insert(entity: E): Promise<void> {
		this.items.push(entity)
	}

	async findById(id: string): Promise<E> {
		return this._getEntity(id)
	}

	async findAll(): Promise<E[]> {
		return this.items
	}

	async update(entity: E): Promise<void> {
		await this._getEntity(entity.id)
		const index = await this._getIndex(entity.id)
		this.items[index] = entity
	}

	async delete(id: string): Promise<void> {
		await this._getEntity(id)
		const index = await this._getIndex(id)
		this.items.splice(index, 1)
	}

	protected async _getEntity(id: string): Promise<E> {
		const _id = `${id}`
		const entity = this.items.find(item => item.id === _id)
		if (!entity) {
			throw new NotFoundError('Entity not found')
		}

		return entity
	}

	protected async _getIndex(id: string): Promise<number> {
		const _id = `${id}`
		const index = this.items.findIndex(item => item.id === _id)
		if (index === -1) {
			throw new NotFoundError('Entity not found')
		}

		return index
	}
}
