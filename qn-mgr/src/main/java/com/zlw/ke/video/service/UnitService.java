package com.zlw.ke.video.service;

import com.zlw.ke.model.Unit;
import com.zlw.ke.video.domain.UnitDomain;

import java.util.List;

/**
 * Title: ke<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UnitService <br>
 * Create DateTime: 14-11-15 下午3:39 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public interface UnitService {

    /**
     *
     * @return
     * @param userId
     */
    List<UnitDomain> list(String userId);


    void save(UnitDomain entity);

    void update(UnitDomain entity);

    void delete(String id);

    void batchDelate(String ids);

    Unit queryUnit(String unitId);

    List<UnitDomain> listUnits(String userId);
}
