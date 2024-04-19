import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(message: string) {
    this.log('hello' + message)
  }

  error(message: string, trace: string) {
    this.log(message);
    this.log(trace);
  }

  warn(message: string) {
    this.log(message);
  }

  debug(message: string) {
    this.log(message);
  }
}