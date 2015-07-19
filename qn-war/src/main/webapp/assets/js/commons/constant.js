/**
 * Created by Dendy on 2014/8/6.
 */

/** 系统常量定义 */
var Constant = {
    /** 账户状态 */AccountStatus: {},
    /** 证件类型 */CertificateType: {},
    /** 文化程度 */EducationLevel: {},
    /** 政治面貌 */PoliticStatus: {},
    /** 申报级别 */DeclareLevel: {},
    /** 工作年限 */WorkingYears: {},
    /** 题目类型 */QuestionType: {},
    /** 实名认证状态*/CertificateStatus: {},
    /** 职业树类型*/ProfessionType: {},

    /**组卷模式*/GENERATEMODE: {},
    /**组卷模式*/ANSWERMODE: {},
    /**题目展示方式*/SHOWMODE: {},
    /** 资源状态*/Resource: {},
    /**题型难度*/QtypeLevel: {},
    /**答题头部描述*/AnswerHead:{},
    /**职业数据种类类型*/ProfessionDataType:{},
    /**职业证书等级*/CertficateLevel:{},
    /**职业类别*/ProfessionCategory:{},
    /**复审考试类型*/ExamContentType:{},
    /**复审考试判定*/ReviewResultStatus:{},
    /**试卷生成测试类型*/TestType:{},
    /**用户证书状态*/UserCertificateStatus:{},
    /**复审考试结果*/ExamResultStatus:{}
};
//~ 账户状态=============================================================================================================
/** 删除 */
Constant.AccountStatus.DELETED = "account.status.deleted";
/** 锁定 */
Constant.AccountStatus.LOCKED = "account.status.locked";
/** 激活 */
Constant.AccountStatus.ACTIVE = "account.status.active";
/** 未激活 */
Constant.AccountStatus.NOT_ACTIVE = "account.status.notActive";

//~ 证件类型=============================================================================================================
/** 身份证 */
Constant.CertificateType.IDENTITY_CARD = "certificate.type.identityCard";
/** 军官证 */
Constant.CertificateType.OFFICER_CARD = "certificate.type.officerCard";
/** 士兵证 */
Constant.CertificateType.SOLDIER_CARD = "certificate.type.soldierCard";
/** 警察证 */
Constant.CertificateType.POLICE_CARD = "certificate.type.policeCard";
/** 护照 */
Constant.CertificateType.PASS_PORT = "certificate.type.passport";
/** 其它 */
Constant.CertificateType.OTHER = "certificate.type.other";

Constant.CertificateType.IDENTITY_CARD_NAME = "身份证";
Constant.CertificateType.OFFICER_CARD_NAME = "军官证";
Constant.CertificateType.SOLDIER_CARD_NAME = "士兵证";
Constant.CertificateType.POLICE_CARD_NAME = "警察证";
Constant.CertificateType.PASS_PORT_NAME = "护照";
Constant.CertificateType.OTHER_NAME = "其它";

Constant.CertificateType.decideCertificateTypeName=function(code){
    var ctName="";
    switch (code){
        case Constant.CertificateType.IDENTITY_CARD:
            ctName=Constant.CertificateType.IDENTITY_CARD_NAME;
            break;
        case Constant.CertificateType.OFFICER_CARD:
            ctName=Constant.CertificateType.OFFICER_CARD_NAME;
            break;
        case Constant.CertificateType.SOLDIER_CARD:
            ctName=Constant.CertificateType.SOLDIER_CARD_NAME;
            break;
        case Constant.CertificateType.POLICE_CARD:
            ctName=Constant.CertificateType.POLICE_CARD_NAME;
            break;
        case Constant.CertificateType.PASS_PORT:
            ctName=Constant.CertificateType.PASS_PORT_NAME;
            break;
        case Constant.CertificateType.OTHER:
            ctName=Constant.CertificateType.OTHER_NAME;
            break;
        default :break;
    }
    return ctName;
}



//~ 文化程度=============================================================================================================
/** 博士及以上 */
Constant.EducationLevel.DOCTOR_OR_HIGHER = "education.level.doctorOrHigher";
/** 研究生 */
Constant.EducationLevel.GRADUATE = "education.level.graduate";
/** 本科 */
Constant.EducationLevel.BACHELOR = "education.level.bachelor";
/** 大专 */
Constant.EducationLevel.COLLEGE_OR_LOWER = "education.level.collegeOrLower";
/** 中专 */
Constant.EducationLevel.TECHNICAL_SECONDARY_SCHOOL = "education.level.technicalSecondarySchool";
/** 高级技校 */
Constant.EducationLevel.SENIOR_TECKNICAL_SCHOOL = "education.level.seniorTechnicalSchool";
/** 技师学院 */
Constant.EducationLevel.TECHNICIAN_COLLEGE = "education.level.technicianCollege";
/** 技校 */
Constant.EducationLevel.TECHNICAL = "education.level.technical";
/** 高中 */
Constant.EducationLevel.SENIOR_MIDDLER = "education.level.seniorMiddler";
/** 职高 */
Constant.EducationLevel.VACATIONAL = "education.level.vacational";
/** 初中 */
Constant.EducationLevel.JUNIOR_MIDDLER = "education.level.juniorMiddler";
/** 小学 */
Constant.EducationLevel.JUNIOR = "education.level.junior";

Constant.EducationLevel.DOCTOR_OR_HIGHER_NAME = "博士及以上";
Constant.EducationLevel.GRADUATE_NAME = "研究生";
Constant.EducationLevel.BACHELOR_NAME = "本科";
Constant.EducationLevel.COLLEGE_OR_LOWER_NAME = "大专";
Constant.EducationLevel.TECHNICAL_SECONDARY_SCHOOL_NAME = "中专";
Constant.EducationLevel.SENIOR_TECKNICAL_SCHOO_NAME = "高级技校";
Constant.EducationLevel.TECHNICIAN_COLLEGE_NAME = "技师学院";
Constant.EducationLevel.TECHNICAL_NAME = "技校";
Constant.EducationLevel.SENIOR_MIDDLER_NAME = "高中";
Constant.EducationLevel.VACATIONAL_NAME = "职高";
Constant.EducationLevel.JUNIOR_MIDDLER_NAME = "初中";
Constant.EducationLevel.JUNIOR_NAME = "小学";
Constant.EducationLevel.decideEducationLevelTypeName=function(code){
    var ctName="";
    switch (code){
        case Constant.EducationLevel.DOCTOR_OR_HIGHER:
            ctName=Constant.EducationLevel.DOCTOR_OR_HIGHER_NAME;
            break;
        case Constant.EducationLevel.GRADUATE:
            ctName=Constant.EducationLevel.GRADUATE_NAME;
            break;
        case Constant.EducationLevel.BACHELOR:
            ctName=Constant.EducationLevel.BACHELOR_NAME;
            break;
        case Constant.EducationLevel.COLLEGE_OR_LOWER:
            ctName=Constant.EducationLevel.COLLEGE_OR_LOWER_NAME;
            break;
        case Constant.EducationLevel.TECHNICAL_SECONDARY_SCHOOL:
            ctName=Constant.EducationLevel.TECHNICAL_SECONDARY_SCHOOL_NAME;
            break;
        case Constant.EducationLevel.SENIOR_TECKNICAL_SCHOOL:
            ctName=Constant.EducationLevel.SENIOR_TECKNICAL_SCHOO_NAME;
            break;
        case Constant.EducationLevel.TECHNICIAN_COLLEGE:
            ctName=Constant.EducationLevel.TECHNICIAN_COLLEGE_NAME;
            break;
        case Constant.EducationLevel.TECHNICAL:
            ctName=Constant.EducationLevel.TECHNICAL_NAME;
            break;
        case Constant.EducationLevel.SENIOR_MIDDLER:
            ctName=Constant.EducationLevel.SENIOR_MIDDLER_NAME;
            break;
        case Constant.EducationLevel.VACATIONAL:
            ctName=Constant.EducationLevel.VACATIONAL_NAME;
            break;
        case Constant.EducationLevel.JUNIOR_MIDDLER:
            ctName=Constant.EducationLevel.JUNIOR_MIDDLER_NAME;
            break;
        case Constant.EducationLevel.JUNIOR:
            ctName=Constant.EducationLevel.JUNIOR_NAME;
            break;
    }
    return ctName;
}

//~ 政治面貌=============================================================================================================
/** 中国党员 */
Constant.PoliticStatus.PARTY_MEMBER = "politic.status.partyMember";
/** 共青团员 */
Constant.PoliticStatus.LEAGUE_MEMBER = "politic.status.leagueMember";
/** 普通群众 */
Constant.PoliticStatus.PEOPLE = "politic.status.people";
/** 民主党派人士 */
Constant.PoliticStatus.DEMOCRATIC_PARTY = "politic.status.democraticParty";
/** 无党派人士 */
Constant.PoliticStatus.NON_PARTY = "politic.status.nonParty";

Constant.PoliticStatus.PARTY_MEMBER_NAME = "中国党员";
Constant.PoliticStatus.LEAGUE_MEMBER_NAME = "共青团员";
Constant.PoliticStatus.PEOPLE_NAME = "普通群众";
Constant.PoliticStatus.DEMOCRATIC_PARTY_NAME = "民主党派";
Constant.PoliticStatus.NON_PARTY_NAME = "无党派";
Constant.PoliticStatus.decidePoliticStatusTypeName=function(code){
    var ctName="";
    switch (code){
        case Constant.PoliticStatus.PARTY_MEMBER:
            ctName=Constant.PoliticStatus.PARTY_MEMBER_NAME;
            break;
        case Constant.PoliticStatus.LEAGUE_MEMBER:
            ctName=Constant.PoliticStatus.LEAGUE_MEMBER_NAME;
            break;
        case Constant.PoliticStatus.PEOPLE:
            ctName=Constant.PoliticStatus.PEOPLE_NAME;
            break;
        case Constant.PoliticStatus.DEMOCRATIC_PARTY:
            ctName=Constant.PoliticStatus.DEMOCRATIC_PARTY_NAME;
            break;
        case Constant.PoliticStatus.NON_PARTY:
            ctName=Constant.PoliticStatus.NON_PARTY_NAME;
            break;
    }
    return ctName;
}


//~ 申报级别=============================================================================================================
/** 职业资格一级 */
Constant.DeclareLevel.ONE = 1;
/** 职业资格二级 */
Constant.DeclareLevel.TWO = 2;
/** 职业资格三级 */
Constant.DeclareLevel.THREE = 3;
/** 职业资格四级 */
Constant.DeclareLevel.FOUR = 4;
/** 职业资格五级 */
Constant.DeclareLevel.FIVE = 5;

Constant.DeclareLevel.ONE_NAME = "职业资格一级";
Constant.DeclareLevel.TWO_NAME = "职业资格二级";
Constant.DeclareLevel.THREE_NAME = "职业资格三级";
Constant.DeclareLevel.FOUR_NAME = "职业资格四级";
Constant.DeclareLevel.FIVE_NAME = "职业资格五级";
Constant.DeclareLevel.decideDeclareLevelName=function(code){
    var ctName="";
    switch (code){
        case Constant.DeclareLevel.ONE:
            ctName=Constant.DeclareLevel.ONE_NAME;
            break;
        case Constant.DeclareLevel.TWO:
            ctName=Constant.DeclareLevel.TWO_NAME;
            break;
        case Constant.DeclareLevel.THREE:
            ctName=Constant.DeclareLevel.THREE_NAME;
            break;
        case Constant.DeclareLevel.FOUR:
            ctName=Constant.DeclareLevel.FOUR_NAME;
            break;
        case Constant.DeclareLevel.FIVE:
            ctName=Constant.DeclareLevel.FIVE_NAME;
            break;
    }
    return ctName;
}

//~ 工作年限=============================================================================================================
/** 在读学生 */
Constant.WorkingYears.ONE = 1;
/** 应届毕业生 */
Constant.WorkingYears.TWO = 2;
/** 1年 */
Constant.WorkingYears.THREE = 3;
/** 2年 */
Constant.WorkingYears.FOUR = 4;
/** 3-4年 */
Constant.WorkingYears.FIVE = 5;
/** 5-7年 */
Constant.WorkingYears.SIX = 6;
/** 8-9年 */
Constant.WorkingYears.SEVEN = 7;
/** 10年以上 */
Constant.WorkingYears.EIGHT = 8;

Constant.WorkingYears.ONE_NAME = "在读学生";
Constant.WorkingYears.TWO_NAME = "应届毕业生";
Constant.WorkingYears.THREE_NAME = "1年";
Constant.WorkingYears.FOUR_NAME = "2年";
Constant.WorkingYears.FIVE_NAME = "3-4年";
Constant.WorkingYears.SIX_NAME = "5-7年";
Constant.WorkingYears.SEVEN_NAME = "8-9年";
Constant.WorkingYears.EIGHT_NAME = "10年以上";
Constant.WorkingYears.decideWorkingYearsName=function(code){
    var ctName="";
    switch (code){
        case Constant.WorkingYears.ONE:
            ctName=Constant.WorkingYears.ONE_NAME;
            break;
        case Constant.WorkingYears.TWO:
            ctName=Constant.WorkingYears.TWO_NAME;
            break;
        case Constant.WorkingYears.THREE:
            ctName=Constant.WorkingYears.THREE_NAME;
            break;
        case Constant.WorkingYears.FOUR:
            ctName=Constant.WorkingYears.FOUR_NAME;
            break;
        case Constant.WorkingYears.FIVE:
            ctName=Constant.WorkingYears.FIVE_NAME;
            break;
        case Constant.WorkingYears.SIX_NAME:
            ctName=Constant.WorkingYears.SIX_NAME;
            break;
        case Constant.WorkingYears.SEVEN_NAME:
            ctName=Constant.WorkingYears.SEVEN_NAME;
            break;
        case Constant.WorkingYears.EIGHT_NAME:
            ctName=Constant.WorkingYears.EIGHT_NAME;
            break;
    }
    return ctName;
}


//~ 实名认证状态=========================================================================================================
/** 未审核 */
Constant.CertificateStatus.NOT_AUDIT = "cert.status.notAudit";
/** 通过 */
Constant.CertificateStatus.PASS = "cert.status.pass";
/** 不通过 */
Constant.CertificateStatus.NOT_PASS = "cert.status.notPass";


//~ 组卷模式=============================================================================================================
Constant.GENERATEMODE.FIXED = 1;//固定
Constant.GENERATEMODE.RANDOM = 0;//随机
Constant.GENERATEMODE.FIXED_NAME = "固定试卷";//固定
Constant.GENERATEMODE.RANDOM_NAME = "随机试卷";//随机


//~ 答题模式=============================================================================================================
Constant.ANSWERMODE.SINGLE_QUESTION = 0;//单题
Constant.ANSWERMODE.WHOLE_TEST = 1;//整卷
Constant.ANSWERMODE.SINGLE_QUESTION_NAME = "单题模式";//单提
Constant.ANSWERMODE.WHOLE_TEST_NAME = "整卷模式";//整卷

//~ 题目展示方式=============================================================================================================
Constant.SHOWMODE.SHOW_TIME = 1;//是否显示计时
Constant.SHOWMODE.NOT_SHOW_TIME = 0;//
Constant.SHOWMODE.SHOW_ANALYSIS = 1;//是否显示解析
Constant.SHOWMODE.NOT_SHOW_ANALYSIS = 0;//整卷


Constant.Resource.STATUS = {NOT_AUDIT: "resource.audit.status.notAudit", AUDIT_PASS: "resource.audit.status.auditPass",
    AUDIT_NOT_PASS: "resource.audit.status.auditNotPass"};
Constant.Resource.FILE_TYPE = {VIDEO: "resource.media.type.video", AUDIO: "resource.media.type.audio",
    DOC: "resource.media.type.doc"};
Constant.Resource.FILE_REAL_TYPE = {WORD: "resource.type.word", EXCEL: "resource.type.excel",
    PPT: "resource.type.ppt", TEXT: "resource.type.text", SWF: "resource.type.swf", MP3: "resource.type.mp3",
    MP4: "resource.type.mp4", FLV: "resource.type.flv", PDF: "resource.type.pdf", NOT_SUPPORTED: "resource.type.notSupported" };

//~ 职业树类型===========================================================================================================
Constant.ProfessionType = {PROFESSION: "pro.type.pro", CERTIFICATE: "pro.type.cert", COURSE: "pro.type.course",
    SECTION: "pro.type.section", KNOWLEDGE_POINT: "pro.type.kp"};

//~ 题型================================================================================================================
Constant.QuestionType.SingleSelect = "SINGLE_SELECT";//单选
Constant.QuestionType.MultiSelect = "MULTI_SELECT";//多选
Constant.QuestionType.Jduge = "JDUGE";//判断
Constant.QuestionType.FillBlank = "FILL_BLANK";//填空
Constant.QuestionType.QuestionAnswer = "QUESTION_ANSWER";//问答

Constant.QuestionType.SingleSelectName = "单选题";//单选
Constant.QuestionType.MultiSelectName = "多选题";//多选
Constant.QuestionType.JdugeName = "判断题";//判断
Constant.QuestionType.FillBlankName = "填空题";//填空
Constant.QuestionType.QuestionAnswerName = "问答题";//问答
Constant.QuestionType.decideQuestionTypeName=function(code){
    var qtName="";
    switch (code){
        case Constant.QuestionType.SingleSelect:
            qtName=Constant.QuestionType.SingleSelectName;
            break;
        case Constant.QuestionType.MultiSelect:
            qtName=Constant.QuestionType.MultiSelectName;
            break;
        case Constant.QuestionType.Jduge:
            qtName=Constant.QuestionType.JdugeName;
            break;
        case Constant.QuestionType.FillBlank:
            qtName=Constant.QuestionType.FillBlankName;
            break;
        case Constant.QuestionType.QuestionAnswer:
            qtName=Constant.QuestionType.QuestionAnswerName;
            break;
        default :break;
    }
    return qtName;
}



Constant.QtypeLevel.Simple = 0;
Constant.QtypeLevel.Normal = 1;
Constant.QtypeLevel.Hard = 2;

Constant.QtypeLevel.SimpleName = "简单";
Constant.QtypeLevel.NormalName = "普通";
Constant.QtypeLevel.HardName = "困难";

Constant.AnswerHead.FillAnswer="填写答案";
Constant.AnswerHead.SelectAnswer="选择答案";

Constant.ProfessionDataType.Industry="industry";
Constant.ProfessionDataType.BigCategory="industry.big.category";
Constant.ProfessionDataType.MidCategory="industry.mid.category";
Constant.ProfessionDataType.SmallCategory="industry.small.category";
Constant.ProfessionDataType.Profession="profession";
Constant.ProfessionDataType.ProfessionJob="profession.job";
Constant.ProfessionDataType.Certificate="certficate";


Constant.CertficateLevel.Lower=1;
Constant.CertficateLevel.Middler=2;
Constant.CertficateLevel.Higher=3;
Constant.CertficateLevel.Bester=4;
Constant.CertficateLevel.Super=5;

Constant.CertficateLevel.LowerName="初级";
Constant.CertficateLevel.MiddlerName="中级";
Constant.CertficateLevel.HigherName="高级";
Constant.CertficateLevel.BesterName="技师";
Constant.CertficateLevel.SuperHTMLName="<em>高级<br>技师</em>";
Constant.CertficateLevel.SuperName="高级技师";

Constant.ExamContentType.PracticeExam={
    name:"实践考试",
    code:"review.practice.exam"
}

Constant.ExamContentType.TheoryExam={
    name:"理论考试",
    code:"review.theory.exam"
}


Constant.ReviewResultStatus.StudyTimeLeft={msg:"证书(职称)学时未满",code:"study.time.not.over"}

Constant.ReviewResultStatus.ExamNotPublised={msg:"证书(职称)考试还未发布",code:"exam.not.publisned"}


Constant.TestType.SectionPractice=2;
Constant.TestType.CoursePractice=1;
Constant.TestType.CertficatePractice=0;
Constant.TestType.CustomExam=3;

Constant.UserCertificateStatus.CANCEL={code:"cert.status.cancel",name:"已取消"};//已取消
Constant.UserCertificateStatus.SIGN_UP={code:"cert.status.sign_up",name:"已报名"}//已报名
Constant.UserCertificateStatus.GET={code:"cert.status.get",name:"已获得"}//已获得

Constant.ExamResultStatus.ExamResultNoPassed="exam.result.not.passed";
Constant.ExamResultStatus.ExamResultPassed="exam.result.passed";
Constant.ProfessionCategory.cert={code:"dataType.cert",name:"证书"}//  证书
Constant.ProfessionCategory.jobTitle={code:"dataType.jobTitle",name:"职称"}// 职称