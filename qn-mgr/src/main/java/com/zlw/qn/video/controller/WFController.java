//package com.zlw.ke.video.controller;
//
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.fasterxml.jackson.databind.node.ObjectNode;
//import org.activiti.editor.constants.ModelDataJsonConstants;
//import org.activiti.engine.RepositoryService;
//import org.activiti.engine.RuntimeService;
//import org.activiti.engine.TaskService;
//import org.activiti.engine.repository.Model;
//import org.activiti.explorer.Constants;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.ResponseBody;
//import org.springframework.web.servlet.ModelAndView;
//
//import java.io.UnsupportedEncodingException;
//
///**
// * Title: qn<br>
// * Description: <br>
// * Copyright: 中国软件与技术服务股份有限公司 (c) 2015	<br>
// * File name: WFController <br>
// * Create DateTime: 15-2-26 上午10:53 <br>
// * Version: 1.0 <br>
// * Author: zlw
// */
//@RequestMapping("wf")
//@Controller
//public class WFController {
//
//    @Autowired
//    private TaskService taskService ;
//
//    @Autowired
//    private RuntimeService runtimeService ;
//
//    @Autowired
//    private RepositoryService repositoryService ;
//
//    @Autowired
//    private ObjectMapper objectMapper ;
//
//    /**
//     * 通过spring mvc 的rest地址打开bpmn编辑器
//     * @return
//     */
//    @RequestMapping("editor")
//    public ModelAndView getEditor(){
//        ModelAndView modelAndView = new ModelAndView("wfmodeler/editor") ;
//
//        return modelAndView ;
//    }
//    /**
//     * 新建一个模型，返回新建模型的id
//     * @return
//     * @throws UnsupportedEncodingException
//     */
//    @RequestMapping("newmodeler")
//    @ResponseBody
//    public String createNewModeler() throws UnsupportedEncodingException {
//        //删除已有的流程模型
//        //      List<Model> models = repositoryService.createModelQuery().modelNameLike("%new design model%").list() ;
//        //      for (Model oldModel : models) {
//        //          repositoryService.deleteModel(oldModel.getId());
//        //      }
//
//        //新建模型
//        Model model = repositoryService.newModel() ;
//        model.setName("new design model");
//        model.setCategory("namespace");
//        model.setKey("form design key");
//        model.setTenantId("tenant");
//        model.setVersion(1);
//
//        ObjectNode metaNode = objectMapper.createObjectNode();
//        metaNode.put(ModelDataJsonConstants.MODEL_NAME, "new modeler");
//        metaNode.put(ModelDataJsonConstants.MODEL_REVISION, 1);
//        metaNode.put(ModelDataJsonConstants.MODEL_DESCRIPTION, "no formal data");
//        model.setMetaInfo(metaNode.toString());
//
//        //保存模型
//        repositoryService.saveModel(model);
//        //为模型生成一个空的wf模型
//        ObjectNode editorNode = new ObjectMapper().createObjectNode();
//        //id和resource可以没有
//        editorNode.put("id", "canvas");
//        editorNode.put("resourceId", "canvas");
//        ObjectNode stencilSetNode = objectMapper.createObjectNode();
//        //namespace的值和stencilset.json中namespace的值相同,
//        stencilSetNode.put("namespace", "http://b3mn.org/stencilset/bpmn2.0#");
//        editorNode.put("stencilset", stencilSetNode);
//
//        //只添加bpmn的json数据即可
//        repositoryService.addModelEditorSource(model.getId(), editorNode.toString().getBytes("UTF-8"));
//
//        return model.getId() ;
//    }
//}
