package com.zlw.qn.commons.jstl;

/**
 * @author zlw
 * @version 1.0
 * @date 14-9-16
 */
public class StringFromCharCodeUtil {

    public static String fromCharCode(int i){
        if(i==0){
            return "";
        }
        Character c= new Character((char)i );
        return c.toString();
    }

    public static String fromCharCode(){
       return "";
    }
}
