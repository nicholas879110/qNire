package com.zlw.ke.video.service;

import com.zlw.ke.framework.page.Pager;
import com.zlw.ke.framework.page.PagerQuery;
import com.zlw.ke.model.Video;
import com.zlw.ke.video.domain.VideoDomain;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: VideoService <br>
 * Create DateTime: 14-11-15 下午4:02 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public interface VideoService {


    List<VideoDomain> list(String userId,String unitId,Byte aLong);

    void saveVideo(String unitId, String ch, String en, MultipartFile file, Byte aLong);

    void updateVideo(String videoId, String ch, String en, MultipartFile file);

    void deleteVideo(String videoId);

    Pager<VideoDomain> pager(PagerQuery pagerQuery, Byte aLong);

    Video queryVideo(String id);
}
