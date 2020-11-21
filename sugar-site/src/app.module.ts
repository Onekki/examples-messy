import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './feature/user/user.module';
import { AuthModule } from './feature/auth/auth.module';
import { SiteModule } from './feature/site/site.module';
import { CourseModule } from './feature/course/course.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UserModule, SiteModule, CourseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// typeorm-model-generator -h 39.107.230.35 -d sugar_site -p 3306 -u root -x 123456 -e mysql -a -o --ce pascal --cp camel --noConfig

// -h dbhost
// -d dbname
// -p port
// -u username
// -x password
// -e dbtype

// -a 生成实体类 extends BaseEntity 可使用基础的CURD
// -o 默认输出项目根目录下 output 文件夹下 可以自定义输出目标目录，例：-o ./src/demo/entities
// --ce pascal 生成实体类名采用人名式格式
// --cp camel 生成实体类属性采用驼峰
// --noConfig 不产生相关配置文件

