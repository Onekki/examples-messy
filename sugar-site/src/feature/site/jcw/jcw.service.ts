import { Injectable, Get } from '@nestjs/common';
import { isEmail } from 'validator';

import axios from 'axios';

import { CommonService } from '../../../common/common.service';
import { SiteAuthDto } from '../site.dto';
import { JcwDynamic, JcwStatic, JcwExtra } from './jcw.extra';
import { JcwApi } from './jcw.api';
import { JcwUtil } from './jcw.util';

@Injectable()
export class JcwService {
  constructor(
    private readonly commonService: CommonService
  ){}

  /**
   * 激活账号
   * @param authDto (username, password)
   */
  async bind(authDto: SiteAuthDto): Promise<JcwExtra> {
    
    // 第一步 获取登录链接
    var jcwStatic = await JcwApi.firstJcwStatic(authDto);
    if (!jcwStatic) return;

    // 第二步 登录获取基本信息
    jcwStatic = await JcwApi.secondJcwStatic(jcwStatic);

    // 第三步 获取任务信息
    jcwStatic = await JcwApi.thirdJcwStatic(jcwStatic);

    // 第四步 获取课程信息
    const jcwDynamic = await JcwApi.firstJcwDynamic(jcwStatic);
    jcwStatic.initTasks = jcwDynamic.tasks
    return {
      static: jcwStatic,
      dynamic: jcwDynamic
    }
  }

  async test() {
    const headers = {
      'Host': "course.njcedu.com",
      'Origin': "http://sso.njcedu.com",
      'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
      'Content-Type': "application/x-www-form-urlencoded",
      'Accept': "*/*",
      'Referer': "http://course.njcedu.com/newcourse/detail.htm?courseId=70002079",
      'Accept-Encoding': "gzip, deflate",
      'Accept-Language': "zh,zh-CN;q=0.9",
      'Cookie': "luserid=17800008978;token=1a80604ca016c8df53b5e9cf16e3f9bcadc9c7a5add8ed056ae1193164be773fe9122832df069e250202e1b1befca662cbf613d1d439e358388af76065ff33d4;"
    }
    const resp = await axios({
      method: "GET",
      url: "http://course.njcedu.com/newcourse/course.htm",
      params: { courseId: 70002079 },
      headers: headers
    })
    return resp.headers
  }

  async update() {
    
  }
}
