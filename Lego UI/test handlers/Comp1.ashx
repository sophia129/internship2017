<%@ WebHandler Language="C#" Class="Comp1" %>

using System;
using System.Web;
using System.Text;
using ProfitSword.DataObjects;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using ProfitSword.UI;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Web.UI;
using Newtonsoft.Json;

public class Comp1 : BaseHandler {

    StringBuilder response = new StringBuilder();

    public override void ProcessRequest(HttpContext context)
    {
        DataSet modeData = Database.GetControlContents(new object[]{"@RptType", "MODESLIST"});
        DataSet siteData = Database.GetControlContents(new object[]{"@RptType", "SiteList", "@SiteGroup", "ALL"});
        DataSet statData = Database.GetControlContents(new object[]{"@RptType", "StatItems", "@SiteTag", "ALL"});

       /* foreach (DataColumn column in siteData.Tables[0].Columns)
        {
                response.Append(column.ColumnName);
        } */

        var timeJSON = "[{\"label\":\"DD\", \"name\":\"Day\"}, {\"label\":\"MTD\", \"name\":\"MTD\"}, {\"label\":\"PD\", \"name\":\"Period\"}, {\"label\": \"QTD\", \"name\":\"QTD\"}, {\"label\": \"QQ\", \"name\": \"Quarter\"}, {\"label\": \"YTD\", \"name\": \"YTD\"}, {\"label\": \"YY\", \"name\": \"Year\"}, {\"label\": \"TM1\", \"name\": \"First Trimester\"}, {\"label\":\"TM2\", \"name\": \"Second Trimester\"}, {\"label\":\"TM3\", \"name\":\"Third Trimester\"}, {\"label\":\"MMT3\", \"name\":\"Trailing 3m\"}, {\"label\": \"MMT6\", \"name\":\"Trailing 6m\"}, {\"label\":\"YYT1\", \"name\": \"Trailing 3m\"}, {\"label\": \"MMF3\", \"name\": \"Forward 3m\"}, {\"label\": \"MMF6\", \"name\": \"Forward 6m\"}, {\"label\": \"YYF1\", \"name\":\"Forward 12m\"}, {\"label\": \"YY2\", \"name\": \"2 years\"}, {\"label\": \"YY3\", \"name\": \"3 years\"}]";

        List <site> siteNames = new List <site> {};
        List <stat> statNames = new List <stat> {};
        List <mode> modeNames = new List <mode> {};
        List <period> timeNames = new List <period> {};

        dynamic timeObj = JsonConvert.DeserializeObject(timeJSON);
        foreach (var s in timeObj){
            timeNames.Add( new period{ label = s.label, name = s.name});
        }

        foreach (DataRow dr in modeData.Tables[0].Rows){
            modeNames.Add(new mode{label = dr[0].ToString(), name = dr[1].ToString()});
        }

        foreach (DataRow dr in statData.Tables[0].Rows){
            statNames.Add(new stat {label = dr["ID"].ToString(), name = dr["Column1"].ToString(), valType = dr["ValType"].ToString() });
        }

        foreach (DataRow dr in siteData.Tables[0].Rows){
            siteNames.Add(new site{ label = dr[0].ToString(), name = dr[1].ToString() });
        }

        response.Append("<div class=\"PUOut\" nowrap=\"\"><div class=\"PUTitle ui-draggable-handle\" id=\"CorpDialog2title\"><a href=\"\" class=\"dialogButton\" style=\"float:left\" onclick=\"DeleteDashWidget(2);HideDialog(&quot;CorpDialog2&quot;);return false;\"><span class=\"TrashIcon\"></span></a>&nbsp;<a href=\"\" class=\"dialogButton\" onclick=\"GoDialog(&quot;CorpDialog2&quot;, &quot;2&quot;, &quot;NotGlobal&quot;);HideDialog(&quot;CorpDialog2&quot;);return false;\"><span class=\"CheckIcon\"></span></a>&nbsp;<a href=\"\" class=\"dialogButton\" onclick=\"HideDialog(&quot;CorpDialog2&quot;); showWindowObjects(true); return false;\"><span class=\"XIcon\"></span></a></div><div class=\"PUbody\"><table id=\"CorpDialog2tablebody\" class=\"table table-borderless table-responsive datatable\"><tbody><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Property Lists</td><td class=\"F12\" align=\"Left\" nowrap=\"\">");

        response.Append("<span data-role=\"controlgroup\" data-type=\"horizontal\">");
        response.Append("<select class=\"dynamicSelect\" name=\"selS\">");
        foreach (site prop in siteNames){ response.Append("<option value = " + prop.label +">" + prop.name + "</option>");}
        response.Append("</select></span>");

        response.Append("<input type=\"hidden\" id=\"textS\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Account List</td><td class=\"F12\" align=\"Left\" nowrap=\"\">");
        response.Append("<span data-role=\"controlgroup\" data-type=\"horizontal\">");
        response.Append("<select class=\"dynamicSelect\" name=\"selSIL\">");
        foreach (stat item in statNames){ response.Append("<option value = " + item.label +">" + item.name + "</option>");}
        response.Append("</select></span>");

        response.Append("<input type=\"hidden\" id=\"textSIL\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Time Period</td><td class=\"F12\" align=\"Left\" nowrap=\"\">");
        response.Append("<span data-role=\"controlgroup\" data-type=\"horizontal\">");
        response.Append("<select class=\"dynamicSelect\" name=\"selSm\">");
        foreach (period time in timeNames){ response.Append("<option value = " + time.label +">" + time.name + "</option>");}
        response.Append("</select></span>");

        response.Append("<input type=\"hidden\" id=\"textSm\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Data Set</td><td class=\"F12\" align=\"Left\" nowrap=\"\">");
        response.Append("<span data-role=\"controlgroup\" data-type=\"horizontal\">");
        response.Append("<select class=\"dynamicSelect\" name=\"selM0\">");
        foreach (mode item in modeNames){ response.Append("<option value = " + item.label +">" + item.name + "</option>");}
        response.Append("</select></span>");

        response.Append("<input type=\"hidden\" id=\"textM0\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Comparison 1</td><td class=\"F12\" align=\"Left\" nowrap=\"\">");
        response.Append("<span data-role=\"controlgroup\" data-type=\"horizontal\">");
        response.Append("<select class=\"dynamicSelect\" name=\"selM1\">");
        foreach (mode item in modeNames){ response.Append("<option value = " + item.label +">" + item.name + "</option>");}
        response.Append("</select></span>");

        response.Append("<input type=\"hidden\" id=\"textM1\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Percentage 1</td><td class=\"F12\" align=\"Left\" nowrap=\"\"><input id=\"Input1\" type=\"text\" style=\"\" value=\"100\" onclick=\"\" onkeypress=\"\" autofocus=\"true\" required=\"\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Percentage 2</td><td class=\"F12\" align=\"Left\" nowrap=\"\"><input id=\"Input2\" type=\"text\" style=\"\" value=\"97\" onclick=\"\" onkeypress=\"\" autofocus=\"true\" required=\"\"></td></tr><tr id=\"0\" valign=\"top\"><td class=\"PULabel\" align=\"Right\" nowrap=\"\">Custom Label</td><td class=\"F12\" align=\"Left\" nowrap=\"\"><input id=\"ReportName\" type=\"text\" style=\"\" value=\"BigBasic\" maxlength=\"15\"></td></tr></tbody></table><input type=\"hidden\" id=\"CorpDialogUrl\"> <span class=\"PULabel\">File Name: Dashboard/testwidget</span> </div></div>");

        context.Response.Write(response);

    }
}
public class site
{
    public string label { get; set; }
    public string name { get; set; }
}
public class stat
{
    public string label { get; set; }
    public string name { get; set; }
    public string valType { get; set; }
}
public class mode
{
    public string label { get; set; }
    public string name { get; set; }
}
public class period
{
    public string label { get; set; }
    public string name { get; set; }
}