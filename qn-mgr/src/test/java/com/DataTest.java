package com;

import com.zlw.qn.mgr.service.UserListService;
import com.zlw.qn.model.MyQuestion;
import com.zlw.qn.model.MyTag;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Locale;

/**
 * Title: xjszy<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: UserTest <br>
 * Create DateTime: 14-11-13 下午6:25 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class DataTest extends BaseTest {

    @Autowired
    UserListService userListService;

    @Test
    public void addUser(){

        userListService.saveData();

    }






}
