package com;

import junit.framework.TestCase;
import org.aspectj.weaver.ast.Test;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

/**
 * Title: xjszy<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: BaseTest <br>
 * Create DateTime: 14-11-13 下午6:09 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations ={
                "classpath:spring*.xml"
        })
public class BaseTest  extends TestCase {


}
