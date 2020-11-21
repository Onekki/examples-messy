import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as cheerio from 'cheerio';
import axios from 'axios';
import { TQuestion } from '../../feature/question/question.entity';
import { CDO } from './lib/cdo.lib';
import { TCourse } from '../../../output/t_course';
import { TRecord } from '../../../output/t_record';

@Injectable()
export class NjceduService {
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
                Host: 'sso.njcedu.com',
                Origin: 'http://sso.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
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

    async getSchoolToken(loginUrl, lUserId, token) {
        const resp = await axios({
            method: 'GET',
            url: loginUrl,
            headers: {
                Host: 'yzu.njcedu.com',
                Origin: 'http://sso.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                Cookie: 'luserid=' + lUserId + ';token=' + token,
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
                Host: 'yzu.njcedu.com',
                Origin: 'http://sso.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                Cookie: 'luserid=' + lUserId + ';token=' + token + ';schoolToken=' + schoolToken,
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

    async getCourseList(taskId, lUserId, token, schoolToken) {
        const resp = await axios({
            method: 'GET',
            url: 'http://yzu.njcedu.com/student/prese/teachplan/listdetail.htm',
            params: { id: taskId },
            headers: {
                Host: 'yzu.njcedu.com',
                Origin: 'http://sso.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                Cookie: 'luserid=' + lUserId + ';token=' + token + ';schoolToken=' + schoolToken,
            },
        });
        // 解析html页面
        const $ = cheerio.load(resp.data);
        const courseList = [];
        // 没有观看按钮，说明该课程结束了
        if (
            !$('#courseTable tbody tr')
                .last()
                .find('td')
                .last()
                .find('a')
                .attr('href')
        ) {
            return courseList;
        }
        // 更新每个任务的课程信息
        $('#courseTable tbody tr').each((idx, item) => {
            if (idx > 0) {
                const course = new TCourse();
                course.taskCode = taskId;
                $(item)
                    .find('td')
                    .each((idx1, item1) => {
                        switch (idx1) {
                            case 0:
                                course.name = $(item1).text();
                                break;
                            case 3:
                                course.code = $(item1)
                                    .find('a')
                                    .attr('href')
                                    .match(/\d+/g)[0];
                                break;
                        }
                    });
                courseList.push(course);
            }
        });
        return courseList;
    }

    async getRecordList(taskId, lUserId, token, schoolToken) {
        const resp = await axios({
            method: 'GET',
            url: 'http://yzu.njcedu.com/student/prese/teachplan/listdetail.htm',
            params: { id: taskId },
            headers: {
                Host: 'yzu.njcedu.com',
                Origin: 'http://sso.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                Cookie: 'luserid=' + lUserId + ';token=' + token + ';schoolToken=' + schoolToken,
            },
        });
        // 解析html页面
        const $ = cheerio.load(resp.data);
        const recordList = [];
        // 没有观看按钮，说明该课程结束了
        if (
            !$('#courseTable tbody tr')
                .last()
                .find('td')
                .last()
                .find('a')
                .attr('href')
        ) {
            return recordList;
        }
        // 更新每个任务的课程信息
        $('#courseTable tbody tr').each((idx, item) => {
            if (idx > 0) {
                const record = new TRecord();
                $(item)
                    .find('td')
                    .each((idx1, item1) => {
                        switch (idx1) {
                            case 1:
                                const video = $(item1)
                                    .text()
                                    .match(/\d+/g);
                                record.video = video[1] - video[0];
                                break;
                            case 2:
                                record.after = $(item1)
                                    .text()
                                    .trim();
                                break;
                            case 3:
                                record.courseCode = $(item1)
                                    .find('a')
                                    .attr('href')
                                    .match(/\d+/g)[0];
                                break;
                        }
                    });
                recordList.push(record);
            }
        });
        return recordList;
    }

    async getAfterQuestionList(courseId, lUserId, token) {
        const resp = await axios({
            method: 'GET',
            url: 'http://course.njcedu.com/questionbefore.htm',
            params: { courseId: courseId },
            headers: {
                Host: 'course.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                Cookie: 'luserid=' + lUserId + ';token=' + token,
            },
        });
        // 解析html页面
        const $ = cheerio.load(resp.data);
        const afterQuestionList = [];
        $('#record table').each((idx, item) => {
            const question = new TQuestion();
            question.courseCode = courseId;
            question.index = $(item).attr('index');
            question.answer = $(item).attr('stranswer');
            afterQuestionList.push(question);
        });
        return afterQuestionList;
    }

    async getCourseware(courseId, lUserId, token) {
        const preResp = await axios({
            method: 'GET',
            url: 'http://course.njcedu.com/newcourse/course.htm',
            params: { courseId: courseId },
            headers: {
                Host: 'course.njcedu.com',
                Origin: 'http://sso.njcedu.com',
                'User-Agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: '*/*',
                Referer: 'http://sso.njcedu.com/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh,zh-CN;q=0.9',
                Cookie: 'luserid=' + lUserId + ';token=' + token
            }
        });
        const courseware = preResp.headers['set-cookie'][1].split(';')[0];
        return { courseware }
    }

    async updateVideo(courseId, courseware, token) {

        const resp = await axios({
            method: 'POST',
            url: 'http://course.njcedu.com/Servlet/recordStudy.svl',
            params: {"lCourseId":courseId, "lSchoolId": 204, "strStartTime":0},
            headers: {
                'Host': "course.njcedu.com",
                'Content-Length': "0",
                'Accept': "text/html, */*; q=0.01",
                'Origin': "http://course.njcedu.com",
                'X-Requested-With': "XMLHttpRequest",
                'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36",
                'Referer': "http://course.njcedu.com/newcourse/coursecc.htm?courseId=" + courseId,
                'Accept-Encoding': "gzip, deflate",
                'Accept-Language': "zh,zh-CN;q=0.9,en;q=0.8",
                'Cookie': courseware + ";token=" + token,
                'Connection': "keep-alive",
                'Cache-Control': "no-cache"
            }
        });
        return resp.data
    }
}
