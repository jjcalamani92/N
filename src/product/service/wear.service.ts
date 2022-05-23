import { Injectable } from '@nestjs/common';
import { CreateWearInput, GetWearArgs, UpdateWearInput } from '../dto';
import { Wear, WearDocument } from '../entities';
import { WearRepository } from '../repository';

@Injectable()
export class WearService {
  constructor(private readonly wearRepository: WearRepository) {}
  async createWear(input: CreateWearInput) {
    const dataDocument = await this.wearRepository.create(input);
    return this.toModel(dataDocument);
  }

  async getWear(getwearArgs: GetWearArgs) {
    const dataDocument = await this.wearRepository.findOne(getwearArgs);
    return this.toModel(dataDocument);
  }

  async update(id: string, input: UpdateWearInput) {
    const dataDocument = await this.wearRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async remove(id: string) {
    const dataDocument = await this.wearRepository.remove(id);
    return this.toModel(dataDocument);
  }

  findAll() {
    return this.wearRepository.find({});
  }

  private toModel(wearDocument: WearDocument): Wear {
    return {
      _id: wearDocument._id.toHexString(),
      title: wearDocument.title,
      brand: wearDocument.brand,
      description: wearDocument.description,
      image: wearDocument.image,
      inStock: wearDocument.inStock,
      slug: wearDocument.slug,
      category: wearDocument.category,
      subCategory: wearDocument.subCategory,
      price: wearDocument.price,
      tags: wearDocument.tags,
      color: wearDocument.color,
      sizes: wearDocument.sizes,
      status: wearDocument.status
    };
  }
}
