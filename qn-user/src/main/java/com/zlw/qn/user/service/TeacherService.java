package com.zlw.qn.user.service;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.user.domain.PriviledgeDomain;
import com.zlw.qn.user.domain.TeacherDomain;

import java.util.List;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: TeacherService <br>
 * Create DateTime: 14-12-8 下午9:06 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public interface TeacherService {

    List<TeacherDomain> list(TeacherDomain domain, PagerQuery query);

    void saveTeacher(TeacherDomain domain);

    void updateTeacher(TeacherDomain domain);

    void deleteTeacher(String id) throws Exception;

    Pager<TeacherDomain> pager(TeacherDomain domain, PagerQuery query);

    void setPriviledge(String id, String priIds);

    List<PriviledgeDomain> showPris(String id);

    List<TeacherDomain> list();

}
