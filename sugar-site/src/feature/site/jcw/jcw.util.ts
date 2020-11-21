import * as crypto from 'crypto';
import * as cheerio from 'cheerio';

import { CDO } from './lib/cdo.lib';

import { SiteAuthDto } from '../site.dto';
import { JcwStatic, JcwDynamic, JcwTask, JcwCourse } from './jcw.extra';

export class JcwUtil {

  static getHeaders(host: string, cookie?: string) {
    let headers = {
      'Host': host,
      'Origin': "http://sso.njcedu.com",
      'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
      'Content-Type': "application/x-www-form-urlencoded",
      'Accept': "*/*",
      'Referer': "http://sso.njcedu.com/",
      'Accept-Encoding': "gzip, deflate",
      'Accept-Language': "zh,zh-CN;q=0.9"
    }
    if(cookie) {
      headers['Cookie'] = cookie
    }
    return headers
  }
}
