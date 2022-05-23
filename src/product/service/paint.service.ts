import { Injectable } from '@nestjs/common';
import { CreatePaintInput, GetPaintArgs, UpdatePaintInput } from '../dto';
import { Paint, PaintDocument } from '../entities';
import { PaintRepository } from '../repository';

@Injectable()
export class PaintService {
  constructor(private readonly paintRepository: PaintRepository) {}
  async createPaint(input: CreatePaintInput) {
    const dataDocument = await this.paintRepository.create(input);
    return this.toModel(dataDocument);
  }

  async getPaint(getpaintArgs: GetPaintArgs) {
    const dataDocument = await this.paintRepository.findOne(getpaintArgs);
    return this.toModel(dataDocument);
  }

  async update(id: string, input: UpdatePaintInput) {
    const dataDocument = await this.paintRepository.findOneAndUpdate(id, input);
    return this.toModel(dataDocument);
  }

  async remove(id: string) {
    const dataDocument = await this.paintRepository.remove(id);
    return this.toModel(dataDocument);
  }

  findAll() {
    return this.paintRepository.find({});
  }

  private toModel(paintDocument: PaintDocument): Paint {
    return {
      _id: paintDocument._id.toHexString(),
      title: paintDocument.title,
      brand: paintDocument.brand,
      description: paintDocument.description,
      image: paintDocument.image,
      inStock: paintDocument.inStock,
      slug: paintDocument.slug,
      category: paintDocument.category,
      subCategory: paintDocument.subCategory,
      price: paintDocument.price,
      tags: paintDocument.tags,
      use: paintDocument.use,
      color: paintDocument.color,
      status: paintDocument.status
    };
  }
}
