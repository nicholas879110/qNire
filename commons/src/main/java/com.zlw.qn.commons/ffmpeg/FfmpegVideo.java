package com.zlw.qn.commons.ffmpeg;


/**
 * 视频信息
 * 
 * @author: zhangliewei@gohighedu.com
 * @date 2013-8-15 下午4:19:07
 * @version V1.0
 */
public class FfmpegVideo {
    private String playTime;//播放时间
    private String startTime;//开始时间
    private   String  bitrate;//码率 单位 kb
    
    private  String videoCode;//视频编码
    private  String videoFmt;//视频格式
    private String resolution;//分辨率
    
    private String audioCode;//音频编码
    private  String audiosamplerate;//音频采样比率
    
    public String getPlayTime() {
        return playTime;
    }
    
    public void setPlayTime(String playTime) {
        this.playTime = playTime;
    }
    
    public String getStartTime() {
        return startTime;
    }
    
    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }
    
    public String getBitrate() {
        return bitrate;
    }
    
    public void setBitrate(String bitrate) {
        this.bitrate = bitrate;
    }
    
    public String getVideoCode() {
        return videoCode;
    }
    
    public void setVideoCode(String videoCode) {
        this.videoCode = videoCode;
    }
    
    public String getVideoFmt() {
        return videoFmt;
    }
    
    public void setVideoFmt(String videoFmt) {
        this.videoFmt = videoFmt;
    }
    
    public String getResolution() {
        return resolution;
    }
    
    public void setResolution(String resolution) {
        this.resolution = resolution;
    }
    
    public String getAudioCode() {
        return audioCode;
    }
    
    public void setAudioCode(String audioCode) {
        this.audioCode = audioCode;
    }
    
    public String getAudiosamplerate() {
        return audiosamplerate;
    }
    
    public void setAudiosamplerate(String audiosamplerate) {
        this.audiosamplerate = audiosamplerate;
    }
    
    

}
