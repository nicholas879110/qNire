package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.domain.UserDomain;
import com.zlw.qn.mgr.service.UserListService;
import org.springframework.stereotype.Service;

/**
 * Title: qNire<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
 * File name: UserListServiceImpl <br>
 * Create DateTime: 15-7-20 下午10:42 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("userListService")
public class UserListServiceImpl  implements UserListService {

    @Override
    public Pager<UserDomain> pager(PagerQuery pagerQuery) {
        return null;
    }
}
