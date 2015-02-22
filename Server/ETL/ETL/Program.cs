using ETL.Models.JSON;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using System.Web.Script.Serialization;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;





namespace ETL
{
    class Program
    {
       

        static void Main(string[] args)
        {
            ConnectionStringsSection section = ConfigurationManager.GetSection("connectionStrings") as ConnectionStringsSection;
            StringBuilder inspathNodedata = new StringBuilder("");
            List<int> path_ids = new List<int>();
            
            SqlConnection con = new SqlConnection(section.ConnectionStrings["Parcour"].ConnectionString/*_connectionstring*/);

            string query = "select GetDate()";

            SqlCommand cmd = new SqlCommand(query, con);
            cmd.Connection.Open();
            object o = cmd.ExecuteScalar();

            if (o!=null)
            {
                Convert.ToDateTime(o);
            }
            else
            {
                Console.WriteLine("Could not connect to database. Exiting application");
                return;
            }

            string s = File.ReadAllText("testdata.txt");

            //read JSon data
            ETL.Models.JSON.Path[] path_list =  JsonConvert.DeserializeObject<ETL.Models.JSON.Path[]>(s);

            //ETL.Models.JSON.Path path = new JavaScriptSerializer().Deserialize<ETL.Models.JSON.Path>(s);

            foreach (var path in path_list)
            {

                Console.WriteLine("id: {0}, distance: {1}, coordinates: {2}, title: {3}", path.recordId, path.distanceMiles, path.coordinates, path.title);

                string path_coordinates = path.coordinates;

                List<string> nodes = (from a in path_coordinates.Split(';')
                                      select a).ToList();

                string[] from_nodes = new string[nodes.Count];
                string[] to_nodes  = new string[nodes.Count];;

                nodes.CopyTo(from_nodes, 0);
                nodes.CopyTo(to_nodes, 0);

                List<string> l1 =  from_nodes.ToList();
                List<string> l2 = to_nodes.ToList();

                l1.RemoveAt(l1.Count - 1);
                l2.RemoveAt(0);


                string xy1s = (from l in l1
                          select String.Format("{0}", l)).Aggregate(new StringBuilder(), (sb, g) => sb.Append( g + ","),
        sb => sb.ToString());

                string xy2s = (from l in l2
                               select String.Format("{0}", l)).Aggregate(new StringBuilder(), (sb, g) => sb.Append(g + ","),
        sb => sb.ToString());

                

                string[] a1_copy = xy1s.Split(',', '|');
                string[] b1_copy = xy2s.Split(',', '|');

                string[] a1 = new string[a1_copy.Length-1];
                string[] b1 = new string[b1_copy.Length-1];


                Array.Copy(a1_copy,a1, a1.Length);
                Array.Copy(b1_copy, b1, b1.Length);

                List<string> x1 = new List<string>();
                List<string> y1 = new List<string>();
                List<string> x2 = new List<string>();
                List<string> y2 = new List<string>();

                for (int i = 0;  i < a1.Length; i++)
                {
                    if (i%2 == 0)
                        x1.Add(a1[i]);
                    else
                        y1.Add(a1[i]);
                }

                for (int i = 0; i < b1.Length; i++)
                {
                    if (i % 2 == 0)
                        x2.Add(b1[i]);
                    else
                        y2.Add(b1[i]);
                }

                string insertpathStatement = @"INSERT INTO path_list (path_name) VALUES (@param) select scope_identity()";
                string insertNodesStatement = @"INSERT INTO path_nodes (path_id, node, coord1_x, coord1_y,coord2_x,coord2_y) 
                                                VALUES (@path_id, @node, @x1, @y1, @x2, @y2)";

                 
                int path_id = 0;


                using (SqlCommand command = new SqlCommand(insertpathStatement, con))
                {

                    command.Parameters.AddWithValue("@param", path.title);

                    object id = command.ExecuteScalar();

                    //object id = p.Value;

                    if (id != null)
                        path_id = Convert.ToInt32(id);

                    path_ids.Add(path_id);
                }

                StringBuilder b = new StringBuilder();

                for (int i = 0; i < x1.Count; i++)
                { 

                b.Append(String.Format(@"INSERT INTO path_nodes (path_id, node, coord1_x, coord1_y,coord2_x,coord2_y) VALUES ({0}, {1}, {2}, {3}, {4}, {5});" + Environment.NewLine
                    , path_id, i+1, Convert.ToDecimal(x1[i]), Convert.ToDecimal(y1[i]), Convert.ToDecimal(x2[i]), Convert.ToDecimal(y2[i]))
                    );
                }

                insertNodesStatement = b.ToString();
                inspathNodedata.Append(insertNodesStatement);

                if (path_ids.Count > 1 || (Array.FindIndex(path_list, row => row == path) == path_list.Length - 1))
                {
                    //for (int i = 0; i < x1.Count; i++)
                    //{
                    using (SqlCommand command = new SqlCommand(inspathNodedata.ToString(), con))
                    {
                        /*
                        command.Parameters.AddWithValue("@path_id", path_id);
                        command.Parameters.AddWithValue("@node", path_id);
                        command.Parameters.AddWithValue("@x1", Convert.ToDecimal(x1[i]));
                        command.Parameters.AddWithValue("@y1", Convert.ToDecimal(y1[i]));
                        command.Parameters.AddWithValue("@x2", Convert.ToDecimal(x2[i]));
                        command.Parameters.AddWithValue("@y2", Convert.ToDecimal(y2[i]));
                        */

                        command.ExecuteNonQuery();

                        path_ids.Clear();
                        inspathNodedata.Clear();
                    }
                    //}
                }

            }

            //while (true) ;
        }


    }
}
