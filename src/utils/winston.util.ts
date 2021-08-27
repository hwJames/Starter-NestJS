import { join } from 'path';
import { transports, format } from 'winston';
import {
  WinstonModule,
  utilities as nestWinstonModuleUtilities,
} from 'nest-winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { rootPath } from '@constants';

const logDir = join(rootPath, 'logs');

const consoleTransport = new transports.Console({
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

const infoTransport = new winstonDaily({
  filename: 'info-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: join(logDir, 'info'),
  level: 'info',
  maxSize: '5m',
  maxFiles: '10d',
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

const errorTransport = new winstonDaily({
  filename: 'error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  dirname: join(logDir, 'error'),
  level: 'error',
  maxSize: '5m',
  maxFiles: '10d',
  format: format.combine(
    format.timestamp(),
    nestWinstonModuleUtilities.format.nestLike(),
  ),
});

const stream = {
  write: (message: string) => {
    logger.log(message);
  },
};

const logger = WinstonModule.createLogger({
  transports: [consoleTransport, infoTransport, errorTransport],
});

export { logger, stream };
