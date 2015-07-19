package com.zlw.ke.video.service.impl;

import com.zlw.ke.commons.FileToolkit;
import com.zlw.ke.framework.utils.CustomizedPropertyConfig;
import com.zlw.ke.model.Unit;
import com.zlw.ke.model.Video;
import com.zlw.ke.security.util.UserUtil;
import com.zlw.ke.video.dao.UnitDao;
import com.zlw.ke.video.domain.UnitDomain;
import com.zlw.ke.video.service.UnitService;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.criterion.ProjectionList;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UnitServiceImpl <br>
 * Create DateTime: 14-11-17 下午10:43 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@Service("unitService")
public class UnitServiceImpl implements UnitService {

    @Autowired
    private UnitDao unitDao;

    @Override
    public List<UnitDomain> list(String userId) {
        ProjectionList projectionList= Projections.projectionList();
        projectionList.add(Projections.property("id").as("id"));
        projectionList.add(Projections.property("name").as("name"));
        Criteria criteria=unitDao.getCriteria(Unit.class);
        criteria.add(Restrictions.eq("createUser.id",userId));
        return unitDao.listCriteria(criteria,projectionList,UnitDomain.class);
    }

    @Override
    public void save(UnitDomain entity) {
        Unit unit=new Unit();
        unit.setName(entity.getName());
        unit.setCreateUser(UserUtil.getUser().getSysUser());
        unit.setCreateTime(new Date());
        unitDao.save(unit);
    }

    @Override
    public void update(UnitDomain entity) {
        Unit unit=unitDao.get(Unit.class,entity.getId());
        if(unit!=null){
            unit.setName(entity.getName());
            unitDao.update(unit);
        }
    }

    @Override
    public void delete(String id) {
        Unit unit=unitDao.get(Unit.class,id);
        if(unit!=null){
            unitDao.delete(unit);
        }
    }

    @Override
    public void batchDelate(String ids) {

    }

    @Override
    public Unit queryUnit(String unitId) {
        return unitDao.get(Unit.class,unitId);
    }

    @Override
    public List<UnitDomain> listUnits(String userId) {
        Criteria criteria=unitDao.getCriteria(Unit.class);
        criteria.add(Restrictions.eq("createUser.username",userId));
        criteria.createAlias("createUser","createUser");
        criteria.setFetchMode("videos", FetchMode.JOIN);
        criteria.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);
        List<Unit> list=unitDao.list(criteria);
        List<UnitDomain> domains=new ArrayList<>();
        for(Unit unit:list){
            UnitDomain domain=new UnitDomain();
            domain.setName(unit.getName());
            domain.setId(unit.getId());
            int i=0;
            for(Video video:unit.getVideos()){
                if(i<3){
                    domain.getHeadUrls().add((String)CustomizedPropertyConfig.get("server_url")+video.getFirstFrame());
                }
                i++;
            }
            domains.add(domain);
        }
        return domains;
    }
}
