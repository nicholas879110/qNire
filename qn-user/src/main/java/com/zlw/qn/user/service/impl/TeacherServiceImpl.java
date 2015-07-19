package com.zlw.qn.user.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.model.Priviledge;
import com.zlw.qn.model.SysUser;
import com.zlw.qn.user.dao.TeacherDao;
import com.zlw.qn.user.domain.PriviledgeDomain;
import com.zlw.qn.user.domain.TeacherDomain;
import com.zlw.qn.user.service.TeacherService;
import org.apache.commons.lang.StringUtils;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.hibernate.sql.JoinType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: TeacherServiceImpl <br>
 * Create DateTime: 14-12-8 下午9:07 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("teacherService")
public class TeacherServiceImpl  implements TeacherService{

    private static final Byte USER_TYPE_ADMIN=1;
    private static final Byte USER_TYPE_TEACHER=2;

    @Autowired
    private TeacherDao teacherDao;

    @Autowired
    private Md5PasswordEncoder passwordEncoder;

    @Override
    public List<TeacherDomain> list(TeacherDomain domain, PagerQuery query) {
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("username").as("username"));
        projectionList.add(Projections.property("telNum").as("telNum"));
        projectionList.add(Projections.property("email").as("email"));
        Criteria criteria = teacherDao.getCriteria(SysUser.class);
        return teacherDao.listCriteria(criteria, projectionList, TeacherDomain.class);
    }

    @Override
    public Pager<TeacherDomain> pager(TeacherDomain domain, PagerQuery query) {
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("username").as("username"));
        projectionList.add(Projections.property("telNum").as("telNum"));
        projectionList.add(Projections.property("email").as("email"));
        Criteria criteria = teacherDao.getCriteria(SysUser.class);
        criteria.add(Restrictions.eq("type",USER_TYPE_TEACHER));
        return teacherDao.pagerData(projectionList, TeacherDomain.class, criteria, query);
    }

    @Override
    public void saveTeacher(TeacherDomain domain) {
        SysUser user=new SysUser();
        user.setUsername(domain.getUsername());
        user.setName(domain.getName());
        user.setTelNum(domain.getTelNum());
        user.setEmail(domain.getEmail());
        user.setType(USER_TYPE_TEACHER);
        user.setPassword(passwordEncoder.encodePassword("123456",domain.getUsername()));
        teacherDao.save(user);
    }

    @Override
    public void updateTeacher(TeacherDomain domain) {
        SysUser sysUser=teacherDao.get(SysUser.class,domain.getId());
        if(sysUser!=null){
            sysUser.setUsername(domain.getUsername());
            sysUser.setName(domain.getName());
            sysUser.setTelNum(domain.getTelNum());
            sysUser.setEmail( domain.getEmail());
            teacherDao.update(sysUser);
        }

    }

    @Override
    public void deleteTeacher(String id) throws Exception {
        SysUser sysUser=teacherDao.get(SysUser.class,id);
        if(sysUser.getUsername().equals("admin")){
            throw new Exception("admin can not be delete");
        }
        if(StringUtils.isNotBlank(id)){
            sysUser.getPriviledges().clear();
            teacherDao.update(sysUser);
            teacherDao.delete(SysUser.class,id);
        }
    }

    @Override
    @Transactional
    public void setPriviledge(String id, String priIds) {
        Criteria criteria=teacherDao.getCriteria(SysUser.class);
        criteria.add(Restrictions.eq("id",id));
        criteria.setFetchMode("priviledges", FetchMode.JOIN);
        SysUser sysUser=teacherDao.getUniqueResult(criteria);
        if(sysUser!=null){
            sysUser.getPriviledges().clear();
            for (String priId:StringUtils.split(priIds,",")){
                Priviledge priviledge=teacherDao.get(Priviledge.class,priId);
                sysUser.getPriviledges().add(priviledge);
            }
            teacherDao.update(sysUser);
        }
    }

    @Override
    public List<PriviledgeDomain> showPris(String id) {
        Criteria criteria = teacherDao.getCriteria(Priviledge.class)
                .createAlias("users", "users", JoinType.LEFT_OUTER_JOIN)
//                .add(Restrictions.or(Restrictions.eq("userAccounts.id", accountId), Restrictions.isNull("userAccounts.id")))
                .setFetchMode("parent", FetchMode.JOIN)
                .setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        SysUser sysUser=teacherDao.get(SysUser.class, id);

        List<Priviledge> priviledges = teacherDao.list(criteria);
        List<PriviledgeDomain> list = new ArrayList<PriviledgeDomain>();
        for (Priviledge priviledge : priviledges) {
            Priviledge parent = priviledge.getParent();
            if (priviledge.getUsers().contains(sysUser)) {
                list.add(new PriviledgeDomain(priviledge.getId(), priviledge.getName(), parent==null?null:parent.getId(), true));
            } else {
                list.add(new PriviledgeDomain(priviledge.getId(), priviledge.getName(),parent==null?null:parent.getId(), false));
            }
        }
        return list;

    }

    @Override
    public List<TeacherDomain> list() {
        ProjectionList projectionList = Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        projectionList.add(Projections.property("username").as("username"));
        projectionList.add(Projections.property("telNum").as("telNum"));
        projectionList.add(Projections.property("email").as("email"));
        Criteria criteria = teacherDao.getCriteria(SysUser.class);
        criteria.add(Restrictions.eq("type",USER_TYPE_TEACHER));
        return teacherDao.listCriteria(criteria,projectionList,TeacherDomain.class);
    }
}
