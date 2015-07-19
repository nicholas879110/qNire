package com.zlw.ke.commons.ffmpeg;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.zlw.ke.commons.FileToolkit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import javax.servlet.ServletContext;


/**
 * 视频工具类
 * 
 * @author: zhangliewei@gohighedu.com
 * @date 2013-8-15 下午4:19:19
 * @version V1.0
 */
@Component
public class FfmpegUtil {

    @Autowired
    private ServletContext context;

    private static final Logger log=LoggerFactory.getLogger(FfmpegUtil.class);



    private static String processFLV(String inputPath) {

        String ffPath =FfmpegUtil.class.getResource("/") + "/util/ffmpeg.exe";

        List<String> commend = new java.util.ArrayList<String>();

        // 获取ffmpeg路径

        commend.add(ffPath);
        commend.add("-i");
        commend.add(inputPath);

        try {

            ProcessBuilder builder = new ProcessBuilder();
            builder.command(commend);
            builder.redirectErrorStream(true);
            Process p = builder.start();

            BufferedReader buf = null; // 保存ffmpeg的输出结果流
            String line = null;

            buf = new BufferedReader(new InputStreamReader(p.getInputStream()));

            StringBuffer sb = new StringBuffer();
            while ((line = buf.readLine()) != null) {
                sb.append(line);
                continue;
            }
            int ret = p.waitFor();// 这里线程阻塞，将等待外部转换进程运行成功运行结束后，才往下执行
            return sb.toString();
        } catch (Exception e) {
            return null;
        }
    }

    // 检查文件是否存在
    private static boolean checkfile(String path) {
        File file = new File(path);
        if (!file.isFile()) {
            return false;
        }
        return true;
    }

    private static boolean checkContentType(String inputFile) {
        String type = inputFile.substring(inputFile.lastIndexOf(".") + 1, inputFile.length()).toLowerCase();
        // ffmpeg能解析的格式：（asx，asf，mpg，wmv，3gp，mp4，mov，avi，flv等）
        if (type.equals("avi")) {
            return true;
        } else if (type.equals("mpg")) {
            return true;
        } else if (type.equals("wmv")) {
            return true;
        } else if (type.equals("3gp")) {
            return true;
        } else if (type.equals("mov")) {
            return true;
        } else if (type.equals("mp4")) {
            return true;
        } else if (type.equals("asf")) {
            return true;
        } else if (type.equals("asx")) {
            return true;
        } else if (type.equals("flv")) {
            return true;
        }
        return false;
    }

    /**
     * 获取视频相关信息
     * 
     * @param inputPath
     *            视频绝对路径
     * @return
     */
    public static FfmpegVideo getFfmpegVideoInfo(String inputPath) {

        String regexDuration = "Duration: (.*?), start: (.*?), bitrate: (\\d*) kb\\/s";
        String regexVideo = "Video: (.*?), (.*?), (.*?)[,\\s]";
        String regexAudio = "Audio: (\\w*), (\\d*) Hz";
        FfmpegVideo video = null;
        try {
            if (!checkfile(inputPath)) {
                throw new RuntimeException("视频文件不存在");
            }

            if (!checkContentType(inputPath)) {
                throw new RuntimeException("视频格式不支持");
            }
            video = new FfmpegVideo();
            String result = processFLV(inputPath);

            Pattern pattern = Pattern.compile(regexVideo);
            Matcher matcher = pattern.matcher(result);
            while (matcher.find()) {
                video.setVideoCode(matcher.group(1));
                video.setVideoFmt(matcher.group(2));
                video.setResolution(matcher.group(3));
            }

            pattern = Pattern.compile(regexDuration);
            matcher = pattern.matcher(result);
            while (matcher.find()) {
                video.setPlayTime(matcher.group(1));
                video.setStartTime(matcher.group(2));
                video.setBitrate(matcher.group(3));
            }

            pattern = Pattern.compile(regexAudio);
            matcher = pattern.matcher(result);
            while (matcher.find()) {
                video.setAudioCode(matcher.group(1));
                video.setAudiosamplerate(matcher.group(2));
            }
            return video;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    public static void CatchImg(String fileName, String imgFile) {
        // 获取ffmpeg路径
        String ffPath = FileToolkit.getWebRootPath()+ "util/ffmpeg";
//        String ffPath = "/usr/local/ffmpeg/bin/ffmpeg";
       // SpringBeanUtil.getRealpath()
       //String ffPath = SpringBeanUtil.getRealpath()+ "/util/ffmpeg/ffmpeg.exe";
        //ffmpeg -i test2.asf -y -f image2 -ss 08.010 -t 0.001 -s 352x240 b.jpg
        log.info("ffPath:{}",ffPath);
        log.info("videoPath:{}",fileName);
        log.info("imgFilePath:{}",imgFile);
        
        List<String> commend = new java.util.ArrayList<String>();
        commend.add(ffPath);
        commend.add("-i");//输入文件
        commend.add(fileName);
        commend.add("-y");//覆盖输出文件
//        commend.add("-f");//输出psp专用格式
//        commend.add("image2");
//        commend.add("-ss");//搜索到指定的时间 [-]hh:mm:ss[.xxx]的格式也支持
//        commend.add("8");
//        commend.add("-t");//-t 参数是指目的影片的时长
//        commend.add("0.001");
        commend.add("-s");
        commend.add("150x150");//视频大小,不设置则为原视频大小
        commend.add(imgFile);
       
        
        try {
            ProcessBuilder builder = new ProcessBuilder();
            builder.command(commend);
            builder.redirectErrorStream(true);
            // builder.start();
            Process process = builder.start();
            InputStream in = process.getInputStream();
            byte[] re = new byte[4096];
            while (in.read(re) != -1) {
            System.out.print(".");
            }
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    public static void main(String[] args) {

        String filePath = "F:\\ffmpeg\\avc.mp4";
        FfmpegVideo video = getFfmpegVideoInfo(filePath);
        System.out.println(video.toString());
        System.out.println(video.getResolution());

    }
}
