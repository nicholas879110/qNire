package com.zlw.qn.mgr.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.model.MyTag;

import java.io.IOException;
import java.io.InputStream;

/**
 * Created by YT on 2015/7/19.
 */
public interface TagMgrService {

    public Pager pager(PagerQuery pagerQuery) throws Exception;

    public void deleteTag(String pk);

    public void deleteTags(String pks);

    public MyTag getMyTagById(String id);

    public void updateTag(Tag domain);

    public void saveTag(Tag domain);

    public void deleteTagImg(Integer id) throws Exception;

    public void saveFileFromInputStream(InputStream stream, String path, String time,String filename) throws IOException;
}
