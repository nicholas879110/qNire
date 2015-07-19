<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%@ include file="tag.jsp"%>
<div class="sidebar <%--sidebar-fixed--%>" id="sidebar">
    <div class="sidebar-shortcuts" id="sidebar-shortcuts">
        <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
            控制台
        </div>
        <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
            <span class="btn"></span>
        </div>
    </div>
    <ul class="nav nav-list">
        <%--<sec:authorize ifAnyGranted="USER_VIDEO_MGR">--%>
            <li>
                <a href="#"  view="/qn/init.do">
                    <i class="icon-edit"></i>
                    <span class="menu-text">问卷管理</span>
                </a>
            </li>
        <%--</sec:authorize>
        <sec:authorize ifAnyGranted="USER_LV_MGR">--%>
            <li>
                <a href="#"  view="/lv/init.do">
                    <i class="icon-edit"></i>
                    <span class="menu-text">题库管理</span>
                </a>
            </li>
       <%-- </sec:authorize>
        <sec:authorize ifAnyGranted="USER_TEA_MGR">--%>
            <li>
                <a href="#" view="/tea/init.do">
                    <i class="icon-edit"></i>
                    <span class="menu-text">标签管理 </span>
                </a>
            </li>
        <%--</sec:authorize>--%>
    </ul>
    <div class="sidebar-collapse" id="sidebar-collapse">
        <i class="icon-double-angle-left" data-icon1="icon-double-angle-left" data-icon2="icon-double-angle-right"></i>
    </div>
    <script type="text/javascript">
        try{ace.settings.check('sidebar' , 'collapsed')}catch(e){}
    </script>
</div>
