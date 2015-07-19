package com.zlw.qn.mgr.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.QusetionType;
import com.zlw.qn.mgr.domain.Tag;
import com.zlw.qn.model.MyTag;

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
}
