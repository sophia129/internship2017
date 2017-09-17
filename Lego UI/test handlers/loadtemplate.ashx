<%@ WebHandler Language="C#" Class="loadtemplate" %>
using System;
using System.Web;
using System.Text;
using ProfitSword.DataObjects;
using System.Data;
using System.IO;
using ProfitSword.UI;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;


public class loadtemplate : BaseHandler {

    StringBuilder response = new StringBuilder();
    public static SqlTemplate LoadTemplateFromFileInfo(FileInfo file){
        var template = new SqlTemplate{
            Name = file.Name.Substring(0, file.Name.IndexOf('.')),
            FullPath = file.FullName
        };
        var stream = new StreamReader(template.FullPath);

        while (!stream.EndOfStream){
            var line = stream.ReadLine();
            if (line.Contains("[short description]")){
                while (!stream.EndOfStream){
                    line = stream.ReadLine();
                    if (line.Trim().Length > 0)
                        template.Description += line.Trim() + "\n";
                    else
                        break;
                }
            }
            if (line.Contains("[filename]")){
                while (!stream.EndOfStream){
                    line = stream.ReadLine();
                    if (line.Trim().Length > 0)
                        template.FileName += line.Trim();
                    else
                        break;
                }
            }
            if (line.Contains("[parameters]")){
                while (!stream.EndOfStream){
                    line = stream.ReadLine();
                    if (line.Trim().Length > 0)
                        template.Parameters += line.Trim() + "\n";
                    else
                        break;
                }
            }
            if (!line.Contains("[sql template]")) continue;

            while (!stream.EndOfStream){
                line = stream.ReadLine();
                template.Sql += line + "\n";
            }
        }
        stream.Close();
        return template;
    }


    protected virtual List<SqlString> Export(String query, String delim = ","){
        List<SqlString> sqls = new List<SqlString>();
        var template = @"D:\ProfitSword\Development\PS-Dev\Dev_UI\web\UI\SQL\Templates\Comp1Template.txt";
        var queryString = HttpUtility.ParseQueryString(query);

        /* if (!Directory.Exists(Directory.GetParent(Globals.SqlTemplatePath).ToString().Replace("SQLTemplates", "CustomSQLTemplates")))
            Directory.CreateDirectory(Directory.GetParent(Globals.SqlTemplatePath).ToString().Replace("SQLTemplates", "CustomSQLTemplates"));

        if (!File.Exists(Directory.GetFiles(Directory.GetParent(Globals.SqlTemplatePath).ToString().Replace("SQLTemplates", "CustomSQLTemplates")).Where(f => Path.GetFileName(f).StartsWith(strTemplate)).FirstOrDefault()))
            template = Globals.SqlTemplatePath + @"\" + strTemplate + ".txt";
        else
            template = Directory.GetFiles(Directory.GetParent(Globals.SqlTemplatePath).ToString().Replace("SQLTemplates", "CustomSQLTemplates")).Where(f => Path.GetFileName(f).StartsWith(strTemplate)).FirstOrDefault();

        if (!File.Exists(template))
            return;

        if (delim == "tab")
            delim = "\t";

        if (delim == null)
            delim = ",";  */

        var sqlTemplate = LoadTemplateFromFileInfo(new FileInfo(template));

        var strExportFileName = sqlTemplate.FileName;

        if (String.IsNullOrWhiteSpace(strExportFileName))
            return sqls;
        String strSQL = queryString.Keys.Cast<Object>().Aggregate(sqlTemplate.Sql, (current, key) => current.Replace("[" + key + "]", queryString[key.ToString()]));
        var shortQuery = queryString.AllKeys.Where(n => n.StartsWith("M"));
        foreach(String key in shortQuery)
        {
            sqls.Add( new SqlString { Mode = queryString[key], Sql = strSQL.Replace("[MODE]", queryString[key]) });
        }
        return sqls;
    }

    public override void ProcessRequest(HttpContext context){
        var urlQuery = context.Request.QueryString;
        List<SqlString> sqlList = Export(urlQuery.ToString());

        DataSet ds;
        var jsonString = new StringBuilder();
        //new format of json whereby field names are only listed once and row data are in arrays
        //Parms
        jsonString.Append("{\"Parms\": {");
        foreach (String key in urlQuery.AllKeys)
        {
            if (urlQuery.GetKey(urlQuery.Count - 1) == key)
                jsonString.Append("\"" + key + "\" : \"" + urlQuery[key]+"\"");
            else
                jsonString.Append("\"" + key + "\" : \"" + urlQuery[key]+"\", ");
        }
        jsonString.Append("}, ");

        //Datasets 
        jsonString.Append("\"Datasets\": {");
        //have to shorten the url to get modes only
        foreach (SqlString key in sqlList) {
            ds = Database.GetDatasetFromSQL(key.Sql, null);
            jsonString.Append("\"" + key.Mode + "\":{");
            jsonString.Append("\"Columns\": " + ds.Tables[0].Columns.Count + ", \"Rows\":" + ds.Tables[0].Rows.Count);
            jsonString.Append(", \"Fields:{");
            for (int i = 0; i < ds.Tables[0].Columns.Count; i++)
            {
                jsonString.Append("\"" + ds.Tables[0].Columns[i].ColumnName.ToString() + "\":");
                jsonString.Append("[");
                for (int j = 0; j < ds.Tables[0].Rows.Count; j++)
                {
                    jsonString.Append("\"" + ds.Tables[0].Rows[j][i]);
                    if (j < ds.Tables[0].Rows.Count - 1)
                        jsonString.Append("\",");
                    else if (j == ds.Tables[0].Rows.Count - 1)
                        jsonString.Append("\"");
                }
                if (i < ds.Tables[0].Columns.Count - 1)
                    jsonString.Append("],");
                else
                    jsonString.Append("]");
            }
            if (sqlList.ElementAt<SqlString>(sqlList.Count - 1) == key)
                jsonString.Append("}}");
            else
                jsonString.Append("}},");
        }
        jsonString.Append("}}");

        response.Append(jsonString + "</br>");
        /*Assembly assembly = Assembly.LoadFrom(@"D:\ProfitSword\Development\PS-Dev\Dev_UI\web\Bin\PS_Library.dll");
        Version ver = assembly.GetName().Version;
        response.Append(ver);*/
        context.Response.Write(response);
    }
}
public class SqlTemplate{
    public string Name { get; set; }
    public string FullPath { get; set; }
    public string Description { get; set; }
    public string FileName { get; set; }
    public string Parameters { get; set; }
    public string Sql { get; set; }
}
public class SqlString
{
    public String Mode;
    public String Sql;
}


