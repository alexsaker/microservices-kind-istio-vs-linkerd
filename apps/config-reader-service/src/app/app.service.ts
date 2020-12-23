import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Welcome to config-reader-service!' };
  }
  getConfig(): { data: object } {
    let config = {};
    try {
      config = JSON.parse(
        readFileSync(resolve('/tmp/config.json'), { encoding: 'utf-8' })
      );
    } catch (error) {
      console.error(error.message | error);
    }
    return { data: config };
  }
}
