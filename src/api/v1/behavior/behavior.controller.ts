import { Controller, Get, Req, Post, Put, Delete } from '@nestjs/common';
import { BehaviorService } from './behavior.service';
import { Request } from 'express';

@Controller('behavior')
export class BehaviorController {
  constructor(private readonly appService: BehaviorService) {}

  @Get()
  list(@Req() request: Request): any {
    return this.appService.list(request);
  }

  @Post()
  create(@Req() request: Request): any {
    return this.appService.create(request);
  }

  @Put()
  update(@Req() request: Request): any {
    return this.appService.update(request);
  }

  @Delete()
  delete(@Req() request: Request): any {
    return this.appService.delete(request);
  }
}
