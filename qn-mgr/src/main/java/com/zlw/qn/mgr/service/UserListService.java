package com.zlw.qn.mgr.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.UserDomain;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserListService <br>
 * Create DateTime: 15-7-20 下午10:42 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public interface UserListService {
    Pager<UserDomain> pager(PagerQuery pagerQuery);

    void saveData();


}
