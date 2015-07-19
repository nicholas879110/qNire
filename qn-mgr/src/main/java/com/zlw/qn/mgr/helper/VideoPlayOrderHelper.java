package com.zlw.qn.mgr.helper;

import com.zlw.qn.mgr.domain.VideoDomain;
import org.apache.commons.lang.StringUtils;

import java.util.*;

/**
 * Title: qn<br>
 * Description: <br>
 * Copyright: 中国软件与技术服务股份有限公司 (c) 2014	<br>
 * File name: VideoPlayOrderHelper <br>
 * Create DateTime: 14-12-18 下午10:46 <br>
 * Version: 1.0 <br>
 * Author: zlw
 */
public class VideoPlayOrderHelper {

    public static int sortAscVideos(List<VideoDomain> list){
        //先字典排序
        Collections.sort(list,new Comparator<VideoDomain>() {
            @Override
            public int compare(VideoDomain o1, VideoDomain o2) {
                //String tt[] = s.split("\\s{1,}");
                String[] temp1=o1.getName().split("\\s{1,}");
                String[] temp2=o2.getName().split("\\s{1,}");
                int index10=0;
                int index11=0;
                int index12=0;

                int index20=0;
                int index21=0;
                int index22=0;

                if(temp1.length>=1){
                    String[] temp11=StringUtils.split(temp1[0],"-");
                    if(temp11.length==1){
                        index10=Integer.parseInt(temp11[0]);
                    }else if( temp11.length==2){
                        index10=Integer.parseInt(temp11[0]);
                        index11=Integer.parseInt(temp11[1]);
                    }else if( temp11.length==3){
                        index10=Integer.parseInt(temp11[0]);
                        index11=Integer.parseInt(temp11[1]);
                        index12=Integer.parseInt(temp11[2]);
                    }
                }
                if(temp2.length>=1){
                    String[] temp22=StringUtils.split(temp2[0],"-");
                    if(temp22.length==1){
                        index20=Integer.parseInt(temp22[0]);
                    }else if( temp22.length==2){
                        index20=Integer.parseInt(temp22[0]);
                        index21=Integer.parseInt(temp22[1]);
                    }else if( temp22.length==3){
                        index20=Integer.parseInt(temp22[0]);
                        index21=Integer.parseInt(temp22[1]);
                        index22=Integer.parseInt(temp22[2]);
                    }
                }
                int temp=0;
                if(index10==index20&&index11==index21&&index12==index22){
                    temp=0;
                }else if(index10>index20){
                    temp=1;
                }else if (index10>=index20&&index11>index21){
                    temp=1;
                }else if(index10>=index20&&index11>=index21&&index12>index22){
                    temp=1;
                }else {
                    temp=-1;
                }
                return temp;
            }
        });
        //一个视频时两个单词
      /*  int order=1;
        if(list.size()>0){
            String first=list.get(0).getEn();
            list.get(0).setPlayOrder(order);
//            Pattern pattern=Pattern.compile("\\w+",Pattern.CASE_INSENSITIVE);
//            Matcher mat = pattern.matcher(list.get(0).getEn());
            String firstWord="";
            String secondWord="";*/
//            while (mat.find()){
//                if(mat.groupCount()>1){
//                    firstWord= mat.group(0);
//                    secondWord=mat.group(1);
//                }else if(mat.groupCount()>0){
//                    secondWord= mat.group(0);
//                }
//            }
           /* for(VideoDomain domain:list){
                Pattern pattern=Pattern.compile("\\w+",Pattern.CASE_INSENSITIVE);
                Matcher mat = pattern.matcher(list.get(0).getEn());
                while (mat.find()){
                    if(mat.groupCount()>1){
                        firstWord= mat.group(0);
                        secondWord=mat.group(1);
                    }else if(mat.groupCount()>0){
                        secondWord= mat.group(0);
                    }
                }
            }
        }
*/
        int count=0;
        String last="";
        for(int index=0;index<list.size();index++){
            if (/*index!=list.size()-1&&*/charNum(list.get(index).getName(),"-")>2){
                String temp1=StringUtils.substringBeforeLast(list.get(index).getName(),"-");
                //String temp2=StringUtils.substringBeforeLast(list.get(index+1).getName(),"-");
                if(temp1.equals(last)){
                    list.get(index).setPlayOrder(count);
                }else{
                    count++;
                    list.get(index).setPlayOrder(count);
                    last=temp1;
                    //list.get(index).setNext(-1);
                    //count++;
                }
            }else{
                //count++;
                //list.get(index).setNext(-1);
                count++;
                list.get(index).setPlayOrder(count);

            }
        }
       /* Map<Integer,LinkedList<VideoDomain>> map=new HashMap<>();
        Integer count=1;
        LinkedList<VideoDomain> temp=null;
        String last="";
        boolean isFirst=true;
        for(int index=0;index<list.size();index++){
            if (index!=list.size()-1&&charNum(list.get(index).getName(),"-")>2){
                String temp1=StringUtils.substringBeforeLast(list.get(index).getName(),"-");
                if (temp1.equals(last)){
                    temp.add(list.get(index));
                    last=temp1;
                }else{
                    if (isFirst){
                        temp=new LinkedList<>();
                        temp.add(list.get(index));
                        isFirst=false;
                    }else{

                    }

                }
                map.put(count,temp);
            }else{
                temp=new LinkedList<>();
                temp.add(list.get(index));
                map.put(count,temp);
                count++;
            }
        }*/
        return count;
    }



    private static int charNum(String src,String sep){
//        Pattern pattern=Pattern.compile(sep);
//        Matcher mth=pattern.matcher(src);
//        if(mth.find()){
//            return mth.groupCount();
//        }
//        return 0;
       String tmp[] =src.split(sep);
       return tmp.length;
    }





    public static void main(String[] args) {
        List<VideoDomain> list  =new ArrayList<>();
        list.add(new VideoDomain("1-1 s"));

        list.add(new VideoDomain("2-1 s"));
        list.add(new VideoDomain("2-3-1 s"));
        list.add(new VideoDomain("2-2 s"));
        list.add(new VideoDomain("1-4-1 s"));

        list.add(new VideoDomain("1-4-3 s"));
        list.add(new VideoDomain("1-5 s"));
        list.add(new VideoDomain("2-3-2 s"));
        list.add(new VideoDomain("1-2 s"));
        list.add(new VideoDomain("1-4-2 s"));
        list.add(new VideoDomain("1-3 s"));
        list.add(new VideoDomain("2-3-3 s"));
        list.add(new VideoDomain("2-4 s"));
        int count=sortAscVideos(list);
        System.out.println(count);
        for(VideoDomain video:list){
            System.out.println(video.getName()+"|"+video.getPlayOrder()+"|"+video.getNext());
        }
    }
}
