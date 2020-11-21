import * as crypto from 'crypto';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { CDO } from './lib/cdo.lib';
import { JcwCourse } from './entity/jcw_course.entity';

export class JcwUtil {
  static async getLoginUrl(username, password) {
    // 生成CDO请求参数
    const strTransName = 'SSOLogin';
    const md5Password = crypto.createHash('md5').update(password).digest('hex');
    const cdoReq = new CDO();
    cdoReq.setStringValue('strServiceName', 'UserService');
    cdoReq.setStringValue('strLoginId', username);
    cdoReq.setStringValue('strTransName', strTransName);
    cdoReq.setStringValue('strPassword', md5Password);
    cdoReq.setStringValue('strVerifyCode', '');
    cdoReq.setStringValue('bIsCookieLogin', 'change');
    cdoReq.setStringValue('Sessioncheck', 'sessionErr');
    cdoReq.setLongValue('lSchoolId', 204);
    cdoReq.setLongValue('lEduId', 0);
    // 发送请求
    const resp = await axios({
      method: 'POST',
      url: 'http://sso.njcedu.com/handleTrans.cdo',
      params: { strServiceName: 'UserService', strTransName },
      data: encodeURIComponent('$$CDORequest$$') + '=' + encodeURIComponent(cdoReq.toXML()),
      headers: {
        'Host': 'sso.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
      },
    });
    // 解析结果
    const cdoResp = new CDO();
    cdoResp.fromXMLText(resp.data);
    const cdoReturn = cdoResp.getCDOValue('cdoReturn');
    const nCode = cdoReturn.getIntegerValue('nCode');

    if (nCode === 0) {
      const cdoResponse = cdoResp.getCDOValue('cdoResponse');
      const cdoUser = cdoResponse.getCDOValue('cdoUser');
      const lUserId = cdoUser.getLongValue('lId');
      const realname = cdoUser.getStringValue('strName');
      const loginUrl = cdoResponse.getStringArrayValue('arrLoginUrl')[0];

      const token = resp.headers['set-cookie'][2].split(';')[0].split('=')[1];
      return { lUserId, realname, loginUrl, token };
    }
  }

  static async getSchoolToken(loginUrl, lUserId, token) {
    const resp = await axios({
      method: 'GET',
      url: loginUrl,
      headers: {
        'Host': 'yzu.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token,
      },
    });
    const schoolToken = resp.headers['set-cookie'][1].split(';')[0].split('=')[1];
    return { schoolToken };
  }

  static async getTask(lUserId, token, schoolToken) {
    const resp = await axios({
      method: 'GET',
      url: 'http://yzu.njcedu.com/student/my/welcome/welcome.htm',
      headers: {
        'Host': 'yzu.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token + ';schoolToken' + schoolToken,
      },
    });
    const dom = resp.data;
    const $ = cheerio.load(dom);
    const lGradeId = dom.match(/"lGradeId"]=(\S*);/)[1];
    const lClassId = dom.match(/"lClassId"]=(\S*);/)[1];
    const task = $('.con_l_list li')[0].find('a').attr('onclick').replace(/[^\d]/g, '');
    return { lGradeId, lClassId, task };
  }

  static async getCourses(lUserId, token, schoolToken, task) {
    const resp = await axios({
      method: 'GET',
      url: 'http://yzu.njcedu.com/student/prese/teachplan/listdetail.htm',
      params: { id: task },
      headers: {
        'Host': 'yzu.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token + ';schoolToken' + schoolToken,
      },
    });
    // 解析html页面
    const $ = cheerio.load(resp.data);
    const courses = [];
    // 更新每个任务的课程信息
    $('#courseTable tbody tr').each((idx, item) => {
      if (idx > 0) {
        const course = new JcwCourse();
        $(item).find('td').each((idx1, item1) => {
          switch (idx1) {
            case 0:
              course.name = $(item1).text();
              break;
            case 1:
              const video = $(item1).text().match(/\d+/g);
              course.video = parseInt(video[1], 10) - parseInt(video[0], 10);
              break;
            case 2:
              course.after = $(item1).text().trim();
              break;
            case 3:
              // 有的课程已经无法做了
              const href = $(item1).find('a').attr('href');
              if (!href) {
                break;
              }
              course.code = href.match(/\d+/g)[0];
              break;
          }
        });
        courses.push(course);
      }
    });
    return { courses };
  }
}
