package com.zlw.qn.mgr.service.impl;

import com.zlw.qn.framework.page.Pager;
import com.zlw.qn.framework.page.PagerQuery;
import com.zlw.qn.mgr.dao.UserListDao;
import com.zlw.qn.mgr.domain.UserDomain;
import com.zlw.qn.mgr.service.UserListService;
import com.zlw.qn.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

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

    @Autowired
    private UserListDao userListDao;

    @Override
    public Pager<UserDomain> pager(PagerQuery pagerQuery) {
        return null;
    }

    @Override
    public void saveData() {
        String text="的报道表示，巴萨主帅恩里克并不愿意让佩德罗离开，但球员本人寻求更多上场时间的强烈意愿是促成转会的关键因素。佩德罗已经对朋友表示自己想要离开巴萨加盟曼联" +
                "英国媒体的报道也证实了曼联对于“佩刀”的兴趣《太阳报》的报道称，佩德罗是曼联目前转会市场上的第一目标。在接受采访时，曼联主帅范加尔表示球队目前仍然需要提升，" +
                "但只会购买能为球队做出贡献的球员。在范加尔看来，佩德罗出色的无球跑位制造杀机的能力正符合这一要求。“我非常有信心他能够适应英超联赛的节奏。”范加尔说" +
                "尽管在佩德罗的争夺战中目前处于领先地位，但曼联仍要面对来自切尔西和利物浦的竞争。对红魔来说，一大好消息是蓝军主帅穆里尼奥已经表示佩德罗并不是自己心仪的人选。";
        String tags[]=new String[]{
                "理财","体育","财经","消费","家庭","健康","科技","娱乐","彩票","职业","旅游"
        };

        List<MyTag> myTags=new ArrayList<>();
        for(String tag:tags){
            MyTag myTag=new MyTag();
            myTag.setTagName(tag);
            userListDao.save(myTag);
            myTags.add(myTag);
        }

        List<MyQuestion> myQuestions=new ArrayList<>();
        int length=text.length();
//        Random random = new Random();
//
//        int s = random.nextInt(max)%(max-min+1) + min;
        List<MyQuestionType> questionTypes=userListDao.list(MyQuestionType.class);
        for (int i=0;i<1000;i++){
            MyQuestion myQuestion=new MyQuestion();
            int start=new Random().nextInt(length);
            int end=new Random().nextInt(length-start);
            myQuestion.setTitle(text.substring(start,end));
            MyQuestionType type=questionTypes.get(new Random().nextInt(1));
            myQuestion.setQtype(type.getId());
            myQuestion.setMyQuestionTypeByQtype(type);
            MyTag tag=myTags.get(new Random().nextInt(myTags.size()));
            myQuestion.setTagId(tag.getId());
            myQuestion.setMyTagByTagId(tag);
            userListDao.save(myQuestion);
            List<MyQuestionOption> set=new ArrayList<>();
            for(int j=0;j<4;j++){
                MyQuestionOption myQuestionOption=new MyQuestionOption();
                myQuestionOption.setAnswer("选项"+(j+1));
                myQuestionOption.setMyQuestion(myQuestion);
                myQuestionOption.setQuesId(myQuestion.getId());
                userListDao.save(myQuestionOption);
                set.add(myQuestionOption);
            }
            myQuestion.setMyQuestionOptionList(set);
            myQuestions.add(myQuestion);
        }
        List<CustomUser> users=new ArrayList<>();
        String edus[]=new String[]{"本科","专科","小学","中学","高中"};
        String pos[]=new String[]{"内勤工作人员","工厂负责人","行政内勤人员","畜业管理人员","山林管理员","缉私人员","司机","技工"};
        Boolean sexs[]=new Boolean[]{true,false};
        String  stars[]=new String[]{"白羊座","金牛座","双子座","巨蟹座","狮子座","处女座","天秤座","天蝎座","射手座","摩羯座","水瓶座","双鱼座"};
        for(int i=0;i<1000;i++){
            CustomUser user=new CustomUser();
//            random.nextInt(max)%(max-min+1) + min;
            user.setAge(new Random().nextInt(80%(80-16+1)+16));
            user.setEducation(edus[new Random().nextInt(edus.length)]);
            user.setSex(sexs[new Random().nextInt(1)]);
            user.setMarried(sexs[new Random().nextInt(1)]);
            user.setPosition(pos[new Random().nextInt(pos.length)]);
            user.setStar(stars[new Random().nextInt(stars.length)]);
            userListDao.save(user);
            users.add(user);
        }

        for(int i=0;i<2000;i++){
            UserQuestion userQuestion=new UserQuestion();
            userQuestion.setCreateTime(new Date());
            userQuestion.setCustomUser(users.get(new Random().nextInt(users.size())));
            MyQuestion myQuestion=myQuestions.get(new Random().nextInt(myQuestions.size()));
            userQuestion.setMyQuestion(myQuestion);
            userListDao.save(userQuestion);

            if (myQuestion.getMyQuestionTypeByQtype().getCode().equals("SINGLE_SELECT")){
                UserQuesOpt userQuesOpt=new UserQuesOpt();
//                userQuesOpt.setChecked(1);
                List<MyQuestionOption> myQuestionOptions=myQuestion.queryMyQuestionOptionList();
                userQuesOpt.setQuestionOption(myQuestionOptions.get(new Random().nextInt(myQuestionOptions.size())));
                userQuesOpt.setUserQuestion(userQuestion);
                userListDao.save(userQuesOpt);
            }else
            if(myQuestion.getMyQuestionTypeByQtype().getCode().equals("MULTI_SELECT")){
                int r=new Random().nextInt(4%(4-2+1)+2);
                for(int j=0;i<r;j++){
                    UserQuesOpt userQuesOpt=new UserQuesOpt();
                    List<MyQuestionOption> myQuestionOptions=myQuestion.queryMyQuestionOptionList();
                    userQuesOpt.setQuestionOption(myQuestionOptions.get(j));
                    userQuesOpt.setUserQuestion(userQuestion);
                    userListDao.save(userQuesOpt);
                }

            }
        }



    }
}
