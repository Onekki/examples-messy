import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { CDO } from './lib/cdo.lib';
import { TNjcAnswer } from './entity/t_njc_answer';
import { TNjcStudy } from './entity/t_njc_study';

@Injectable()
export class NjcApi {
  async getLoginUrl(username, password) {
    // 生成CDO请求参数
    const strTransName = 'SSOLogin';
    const md5Password = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
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
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
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

    if (nCode !== 0) {
      throw new HttpException('新锦城账号或密码错误', HttpStatus.FORBIDDEN);
    }
    const cdoResponse = cdoResp.getCDOValue('cdoResponse');
    const cdoUser = cdoResponse.getCDOValue('cdoUser');
    const lUserId = cdoUser.getLongValue('lId');
    const realname = cdoUser.getStringValue('strName');
    const loginUrl = cdoResponse.getStringArrayValue('arrLoginUrl')[0];

    const token = resp.headers['set-cookie'][2].split(';')[0].split('=')[1];
    return { lUserId, realname, loginUrl, token };
  }

  async getSchoolToken(loginUrl, lUserId, token) {
    const resp = await axios({
      method: 'GET',
      url: loginUrl,
      headers: {
        'Host': 'yzu.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
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

  async getTask(lUserId, token, schoolToken) {
    const resp = await axios({
      method: 'GET',
      url: 'http://yzu.njcedu.com/student/my/welcome/welcome.htm',
      headers: {
        'Host': 'yzu.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token + ';schoolToken=' + schoolToken,
      },
    });
    const dom = resp.data;
    const $ = cheerio.load(dom);
    const lGradeId = dom.match(/"lGradeId"]=(\S*);/)[1];
    const lClassId = dom.match(/"lClassId"]=(\S*);/)[1];
    const taskId = $('.con_l_list li')
      .first()
      .find('a')
      .attr('onclick')
      .replace(/[^\d]/g, '');
    return { lGradeId, lClassId, taskId };
  }

  async getStudyList(taskId, lUserId, token, schoolToken) {
    const resp = await axios({
      method: 'GET',
      url: 'http://yzu.njcedu.com/student/prese/teachplan/listdetail.htm',
      params: { id: taskId },
      headers: {
        'Host': 'yzu.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token + ';schoolToken=' + schoolToken,
      },
    });
    // 解析html页面
    const $ = cheerio.load(resp.data);
    const studyList = [];
    // 没有观看按钮，说明该课程结束了
    if (
      !$('#courseTable tbody tr')
        .last()
        .find('td')
        .last()
        .find('a')
        .attr('href')
    ) {
      return studyList;
    }
    // 更新每个任务的课程信息
    $('#courseTable tbody tr').each((idx, item) => {
      if (idx > 0) {
        const study = new TNjcStudy();
        $(item)
          .find('td')
          .each((idx1, item1) => {
            switch (idx1) {
              case 1:
                const video = $(item1)
                  .text()
                  .match(/\d+/g);
                study.video = video[1] - video[0];
                break;
              case 2:
                study.after = $(item1)
                  .text()
                  .trim();
                break;
              case 3:
                study.courseCode = $(item1)
                  .find('a')
                  .attr('href')
                  .match(/\d+/g)[0];
                break;
            }
          });
        study.finished = study.video === 0 && study.after !== '0.0%';
        studyList.push(study);
      }
    });
    return studyList;
  }

  async getAfterAnswerList(courseId, lUserId, token) {
    const resp = await axios({
      method: 'GET',
      url: 'http://course.njcedu.com/questionbefore.htm',
      params: { courseId },
      headers: {
        'Host': 'course.njcedu.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token,
      },
    });
    // 解析html页面
    const $ = cheerio.load(resp.data);
    const afterAnswerList = [];
    $('#record table').each((idx, item) => {
      const answer = new TNjcAnswer();
      answer.courseCode = courseId;
      answer.index = $(item).attr('index');
      answer.answer = $(item).attr('stranswer');
      afterAnswerList.push(answer);
    });
    return afterAnswerList;
  }

  async getCourseware(courseId, lUserId, token) {
    const preResp = await axios({
      method: 'GET',
      url: 'http://course.njcedu.com/newcourse/course.htm',
      params: { courseId },
      headers: {
        'Host': 'course.njcedu.com',
        'Origin': 'http://sso.njcedu.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://sso.njcedu.com/',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token,
      },
    });
    const courseware = preResp.headers['set-cookie'][1].split(';')[0];
    return { courseware };
  }

  async studyVideo(courseId, courseware, token) {
    const resp = await axios({
      method: 'POST',
      url: 'http://course.njcedu.com/Servlet/recordStudy.svl',
      params: {lCourseId: courseId, lSchoolId: 204, strStartTime: 0},
      headers: {
        'Host': 'course.njcedu.com',
        'Content-Length': '0',
        'Accept': 'text/html, */*; q=0.01',
        'Origin': 'http://course.njcedu.com',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'Referer': 'http://course.njcedu.com/newcourse/coursecc.htm?courseId=' + courseId,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9,en;q=0.8',
        'Cookie': courseware + ';token=' + token,
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
      },
    });
    return resp.data;
  }

  async studyAfter(lUserId, courseId, token, answers: TNjcAnswer[]) {
    const cdoReq = new CDO();
    const strServiceName = 'StudentCourseExerciseService';
    const strTransName = 'addExerciseAfterAnswer';
    cdoReq.setStringValue('strServiceName', strServiceName);
    cdoReq.setStringValue('strTransName', strTransName);
    cdoReq.setLongValue('lUserId', lUserId);
    cdoReq.setLongValue('lSchoolId', 204);
    cdoReq.setLongValue('lCoursewareId', courseId);
    cdoReq.setIntegerValue('bInOrAfter', 1);
    cdoReq.setIntegerValue('nExerciseAfterCount', answers.length);
    const cdoAnswer = new CDO();
    const answerArray = [];
    for (const answer of answers) {
      cdoAnswer.setLongValue('lQuestionId', answer.index);
      cdoAnswer.setStringValue('strAnswer', answer.answer);
      cdoAnswer.setStringValue('strStudentAnswer', answer.answer);
      cdoAnswer.setIntegerValue('bTrue', 0);
      answerArray.push(cdoAnswer);
    }
    cdoReq.setCDOArrayValue('answerArrayList', answerArray);
    const resp = await axios({
      method: 'POST',
      url: 'http://sso.njcedu.com/handleTrans.cdo',
      params: { strServiceName: 'UserService', strTransName },
      data: encodeURIComponent('$$CDORequest$$') + '=' + encodeURIComponent(cdoReq.toXML()),
      headers: {
        'Host': 'course.njcedu.com',
        'Origin': 'http://course.njcedu.com',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Referer': 'http://course.njcedu.com/questionbefore.htm?courseId=' + courseId,
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh,zh-CN;q=0.9',
        'Cookie': 'luserid=' + lUserId + ';token=' + token,
      },
    });
    // 解析结果
    const cdoResp = new CDO();
    cdoResp.fromXMLText(resp.data);
    const cdoReturn = cdoResp.getCDOValue('cdoReturn');
    const nCode = cdoReturn.getIntegerValue('nCode');
    if (nCode !== 0) {
      throw new HttpException('新锦城账号或密码错误', HttpStatus.UNAUTHORIZED);
    } else {
      console.log(cdoResp.toJSON());
      return cdoResp.toJSON();
    }
  }
}
