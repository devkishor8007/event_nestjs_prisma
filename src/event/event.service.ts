import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  createEvent(data: Prisma.EventCreateInput) {
    return this.prismaService.event.create({ data });
  }

  get() {
    return this.prismaService.event.findMany({});
  }

  filterEvent(params: {
    skip?: number;
    take?: number;
    where: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;

    return this.prismaService.event.findMany({
      skip,
      take,
      where,
      orderBy,
    });
  }

  updateEvent(data: Prisma.EventUpdateInput, id: any) {
    return this.prismaService.event.update({ where: { id: +id }, data });
  }

  async deleteEvent(id: Prisma.EventWhereUniqueInput) {
    return await this.prismaService.event.delete({ where: id });
  }
}
