import { Controller, Get } from '@nestjs/common';
import { get } from 'http';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return { success: true, message: "lama" };
  }
  
  @Get('my-todo-list')
  getTodoList(){
    return [
      {"id": 1, text: "lama2"},
      {"id": 1, text: "lama2"}
    ]
  }
  
}
