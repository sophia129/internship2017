<%@ WebHandler Language="C#" Class="DashboardHandler" %>

using System;
using System.Web;
using System.Text;
using ProfitSword.DataObjects;
using System.Data;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using ProfitSword.UI; 

public class DashboardHandler : BaseHandler {

    StringBuilder response = new StringBuilder();
	public int UserID { get; set; }
	
    public override void ProcessRequest(HttpContext context)
    {
		response.Append("<div id=\"cell1\" class=\"cell\" data-handle=\".handle\" data-width=\"319\" data-height=\"276\" style=\"width: 319px; height: 276px;\">");
		response.Append("<input type=\"hidden\" id=\"CorpDialog1Url\" value=\"../UI/API/Engine.asp?XN=Dashboard/testwidget&amp;SIZE=ALL&amp;ShowMenu=N&amp;ReportName=BigBasic\">");
		response.Append("<input type=\"hidden\" id=\"SiteDialog1Url\" value=\"../UI/API/Engine.asp?XN=Dashboard/testwidget&amp;SIZE=ALL&amp;ShowMenu=N&amp;ReportName=BigBasic\">");
		response.Append("<div id=\"widget1\" class=\"panel panel-default\" style=\"display: block; position: absolute; width: 315px; height: 272px;\">");
		response.Append("<div class=\"placeholder\">");
		response.Append("<table id=\"Rpt\" class=\"table stoff DashWidgetTable table-bordered table-condensed table-responsive table-striped table-hover datatable\" border=\"0\" align=\"center\" cellspacing=\"0\" style=\"\">");
		response.Append("<thead class=\"handle\" style=\"display:table-header-group\"><tr id=\"L0\" valign=\"top\"><td class=\"HD1\" colspan=\"2\" nowrap=\"\">");
		response.Append("<div class=\"btn-group\"><span onclick=\"ShowDialog(&quot;CorpDialog1&quot;);return false;\" class=\"button options\"> </span>");
		response.Append("<span onclick=\"ToggleLock(1);\" class=\"button lock\"> </span></div>&nbsp;  &nbsp;  BigBasic</td></tr>");
		response.Append("<tr id=\"L0\" valign=\"top\"><td class=\"HD1\" align=\"Center\" colspan=\"1\" nowrap=\"\">Day---Development QA Site/Global Site</td></tr>");
		response.Append("<tr id=\"L0\" valign=\"top\"><td class=\"HD1\" align=\"Center\" colspan=\"1\" nowrap=\"\">Forecast - Classic vs. Budget - Classic</td></tr>");
		response.Append("<tr id=\"L0\" valign=\"top\"><td class=\"HD1\" align=\"Center\" colspan=\"1\" nowrap=\"\">OCCUPANCY</td></tr>");
		response.Append("</thead><tbody><tr id=\"L0\" valign=\"top\"><td style=\"width: 305px; height:140px\" nowrap=\"\"><div class=\"widget\"> <h1 id=\"h1\"></h1> </div></td></tr>");
		response.Append("</tbody></table></div><script type=\"text/javascript\">$(document).ready(function () {populateScripts('Javascript/Dashboard/testwidget.js|', function() {  });});</script></div></div>");
        context.Response.Write(response);
    }
}