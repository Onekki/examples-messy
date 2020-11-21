package com.onekki.ohmysite.core.file;

import ch.qos.logback.core.util.FileUtil;
import com.onekki.ohmysite.core.resp.Resp;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

/**
 * Created by onekki
 * Created on 2019/9/4
 */

@RestController
public class UploadController {

    @Value("${server.address}")
    private String serverAddress;

    @Value("${server.port}")
    private String serverPort;

    @RequestMapping("/upload")
    public Resp upload(@RequestParam("file")MultipartFile file) {
        if (file.isEmpty()) {
            return Resp.error("文件为空");
        }
        String fileName = file.getOriginalFilename();
        int size = (int) file.getSize();
        System.out.println(getClass().getName() + " " + fileName + "-->" + size);
        String basePath = "/Users/onekki/upload/";
        String newFileName = getNewFileName();
        File targetFile = new File(basePath + newFileName);
        if (!targetFile.getParentFile().exists()) {
            targetFile.getParentFile().mkdir();
        }
        try {
            file.transferTo(targetFile);
            return Resp.ok(getRespPath(newFileName));
        } catch (Exception e) {
            return Resp.error(e.getMessage());
        }
    }

    private String getNewFileName() {
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd-HH-mm-ss");
        String dateString = sdf.format(date);
        String randString = UUID.randomUUID().toString().substring(0, 4);
        return dateString + randString + ".png";
    }

    private String getRespPath(String fileName) {
        return "/upload/" + fileName;
//        return "http://"+serverAddress+":"+serverPort + "/upload/" + fileName;
    }
}
