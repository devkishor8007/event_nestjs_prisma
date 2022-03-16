import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventService } from './event.service';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  create(@Body() data: Prisma.EventCreateInput) {
    return this.eventService.createEvent(data);
  }

  @Get()
  get() {
    return this.eventService.get();
  }

  @Get('filtered-event/:search')
  async getFilteredPosts(@Param('search') search: string) {
    return await this.eventService.filterEvent({
      where: {
        OR: [
          {
            title: { contains: search },
          },
          {
            content: { contains: search },
          },
        ],
      },
    });
  }

  @Patch(':id')
  update(@Param('id') id: number, data: Prisma.EventUpdateInput) {
    return this.eventService.updateEvent(data, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.eventService.deleteEvent({ id: +id });
  }
}
