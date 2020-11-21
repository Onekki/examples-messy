import { join } from 'path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as hbs from 'hbs';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Cookie
  app.use(cookieParser())

  // 模版引擎
  app.setViewEngine('hbs');
  console.log(__dirname)
  app.useStaticAssets(join(__dirname, '..', 'static'));
  app.setBaseViewsDir(join(__dirname, '..', 'template'));
  hbs.registerPartials(join(__dirname, '..', 'template/include'));
  var blocks = {};
  hbs.registerHelper('extend', function (name, context) {
    var block = blocks[name];
    if (!block) {
      block = blocks[name] = [];
    }
    block.push(context.fn(this));
  });
  hbs.registerHelper('block', function (name) {
    var val = (blocks[name] || []).join('\n');
    blocks[name] = [];
    return val;
  });
  hbs.registerHelper('equal', function (args1, args2, context) {
    if (args1 === args2) {
      return context.fn(this);
    } else {
      if (typeof (args1) === 'number' && args1.toString() === args2.toString()) {
        return context.fn(this);
      }
      return context.inverse(this);
    }
  });

  await app.listen(3000);
}
bootstrap();
