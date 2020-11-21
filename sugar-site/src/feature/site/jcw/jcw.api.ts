import * as crypto from 'crypto';
import * as cheerio from 'cheerio';
import axios from 'axios';

import { SiteAuthDto } from "../site.dto";
import { JcwUtil } from "./jcw.util";
import { isEmail } from "validator";
import { CDO } from "./lib/cdo.lib";
import { JcwStatic, JcwExtra, JcwTask, JcwDynamic, JcwCourse } from "./jcw.extra";
import { type } from 'os';

export class JcwApi {

    static async firstJcwStatic(authDto: SiteAuthDto) {
        // 生成CDO请求参数
        let strTransName = "SSOLogin";
        if (isEmail(authDto.username)) {
          strTransName = "SSOEmailLogin";
        }
        const md5Password = crypto.createHash('md5').update(authDto.password).digest('hex');
        const cdoReq = new CDO();
        cdoReq.setStringValue('strServiceName', 'UserService');
        cdoReq.setStringValue('strLoginId', authDto.username);
        cdoReq.setStringValue('strTransName', strTransName);
        cdoReq.setStringValue('strPassword', md5Password);
        cdoReq.setStringValue('strVerifyCode', '');
        cdoReq.setStringValue('bIsCookieLogin', "change");
        cdoReq.setStringValue('Sessioncheck', "sessionErr");
        cdoReq.setLongValue('lSchoolId', 204);
        cdoReq.setLongValue('lEduId', 0);
        // 发送请求
        const resp = await axios({
          method: "POST",
          url: "http://sso.njcedu.com/handleTrans.cdo",
          params: { strServiceName: "UserService", strTransName: strTransName },
          data: encodeURIComponent("$$CDORequest$$") + "=" + encodeURIComponent(cdoReq.toXML()),
          headers: JcwUtil.getHeaders("sso.njcedu.com", null)
        });
        // 解析结果
        const cdoResp = new CDO();
        cdoResp.fromXMLText(resp.data);
        const cdoReturn = cdoResp.getCDOValue('cdoReturn');
        const nCode = cdoReturn.getIntegerValue('nCode');
        console.log(resp)
        if(nCode != 0) {
            return
        } else {
            const cdoResponse = cdoResp.getCDOValue('cdoResponse');
            const cdoUser = cdoResponse.getCDOValue('cdoUser');
            const lId = cdoUser.getLongValue('lId');
            const strName = cdoUser.getStringValue('strName');
            const arrLoginUrl = cdoResponse.getStringArrayValue('arrLoginUrl');
    
            const cookies = resp.headers['set-cookie']
            const cookie = cookies[1].split(';')[0] + ";" + cookies[2].split(';')[0]
    
            const jcwStatic = new JcwStatic()
            jcwStatic.lUserId = lId
            jcwStatic.realname = strName
            jcwStatic.arrLoginUrl = arrLoginUrl
            jcwStatic.cookie = cookie
            return jcwStatic
        }
    }

    static async secondJcwStatic(jcwStatic: JcwStatic) {
        const resp = await axios({
          method: "GET",
          url: jcwStatic.arrLoginUrl[0],
          headers: JcwUtil.getHeaders("yzu.njcedu.com", jcwStatic.cookie)
        });
        const cookies = resp.headers['set-cookie']
        jcwStatic.cookie += ";" + cookies[1].split(';')[0]
        return jcwStatic
    }

    static async thirdJcwStatic(jcwStatic: JcwStatic) {
        const resp = await axios({
          method: "GET",
          url: "http://yzu.njcedu.com/student/my/welcome/welcome.htm",
          headers: JcwUtil.getHeaders("yzu.njcedu.com", jcwStatic.cookie) 
        });
        const dom = resp.data
        const $ = cheerio.load(dom)
        jcwStatic.lGradeId = dom.match(/"lGradeId"]=(\S*);/)[1]
        jcwStatic.lClassId = dom.match(/"lClassId"]=(\S*);/)[1]
        let initTasks = [];
        $(".con_l_list li").each((idx, item) => {
            const task: JcwTask = new JcwTask();
            task.id = parseInt($(item).find('a').attr('onclick').replace(/[^\d]/g, ''))
            task.title = $(item).find('a').attr('title')
            $(item).find('span').each((idx, item) => {
            switch(idx) {
                case 0:
                task.classHour = parseInt($(item).text().replace('学时', ''))
                break;
                case 1:
                task.credit = parseFloat($(item).text().replace('学分', ''))
                break;
                case 2:
                task.courseCount = parseInt($(item).text().replace('个课程', ''))
                break;
            }
            })
            initTasks.push(task)
        })
        jcwStatic.initTasks = initTasks
        return jcwStatic
    }

    static async firstJcwDynamic(jcwStatic: JcwStatic) {
      let tasks = []
      // 更新任务信息
      for (let task of jcwStatic.initTasks) {
        const resp = await axios({
          method: "GET",
          url: "http://yzu.njcedu.com/student/prese/teachplan/listdetail.htm",
          params: { 'id': task.id }, 
          headers: JcwUtil.getHeaders("yzu.njcedu.com", jcwStatic.cookie)
        });
        // 解析html页面
        const $ = cheerio.load(resp.data)
        let courses = []
        // 更新每个任务的课程信息
        $("#courseTable tbody tr").each((idx, item) => {
          if(idx > 0) {
            const course = new JcwCourse()
            $(item).find("td").each((idx, item) => {
              switch(idx) {
                case 0:
                  course.title = $(item).text()
                  break;
                case 1:
                  let video = $(item).text().match(/\d+/g)
                  course.videoDone = parseInt(video[0])
                  course.videoTotal = parseInt(video[1])
                  break;
                case 2:
                  course.correctRate = $(item).text().trim();
                  break;
                case 3:
                    // 有的课程已经无法做了
                    const href = $(item).find("a").attr("href");
                    if (!href) break;
                    course.id = href.match(/\d+/g)[0];
                  break
              }
            })
            courses.push(course)
          }
        });
        
        // 根据课程id获取用于刷视频的vid和Courseware(这个也可以自己合成)
        courses.forEach((val, idx) => {
          if (!val.id) return;
          // const 
        })

        task.courses = courses
        tasks.push(task)
      }
      var jcwDynamic = new JcwDynamic()
      jcwDynamic.tasks = tasks
      return jcwDynamic
    }
    
}