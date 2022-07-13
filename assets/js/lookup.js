//Support functions for lookup scripts  A. Bickford 7/2022


//getSelectValues Works with muluple selection boxes from Stack Overflow https://stackoverflow.com/questions/5866169/how-to-get-all-selected-values-of-a-multiple-select-box
function getSelectValues(select) {
  var result = [];
  var options = select && select.options;
  var opt;

  for (i = 0; i < options.length; i++) {
    opt = options[i];

    if (opt.selected) {
      result.push(opt.value);
    }
  }
  return result;
}

//popRaceYrdd populates year dropdown based on input range
function popRaceYrdd(ddid,minyr,maxyr){
var sel = document.getElementById(ddid);
sel.innerHTML = "";
		for(var i = minyr; i <= maxyr; i++) {
			var el = document.createElement("option");
			el.textContent = i;
			el.value = i;
			sel.appendChild(el);
		}
} //popRaceYrdd

//popAgeYrdd populates age dropdown based on input range
function popAgeYrdd(ddid,minage,maxage){
var sel = document.getElementById(ddid);
sel.innerHTML = "";
		for(var i = minage; i <= maxage; i++) {
			var el = document.createElement("option");
			if(i == 85){
				el.textContent = i + "+";
			} else {
			   el.textContent = i;
		}
			el.value = i;
			sel.appendChild(el);
		}
} //popAgeYrdd

//genRaceTab creares the race data call and produces table
function genRaceTab(loc,year_arr, race_arr,eth_arr,age_arr,sex_list,group) {
	//build urlstr
	var fips_arr = [];
	for(i = 0; i < loc.length; i++){ fips_arr.push(parseInt(loc[i]))}
	var fips_list  = fips_arr.join(",")
	var year_list = year_arr.join(",")
	var race_list = race_arr.join(",")
	var eth_list = eth_arr.join(",")
	var age_list = age_arr.join(",")
	
	if(sex_list == "S") {
		var urlstr = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&group="+group;
	} else {
		var urlstr = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&sex="+sex_list+"&group="+group;
	}

d3.json(urlstr).then(function(data){

	// Generate Table
	var out_tab = "<thead><tr><th>County Name</th><th>County FIPS</th><th>Year</th><th>Age</th><th>Sex</th><th>Race</th><th>Ethnicity</th><th>Count</th></tr></thead>";
	out_tab = out_tab + "<tbody>"
	for(i = 0; i < data.length; i++){
		var tmp_str = "<tr>"
		tmp_str = tmp_str + "<td>"+ countyName(data[i].county_fips) + "</td>"
		tmp_str = tmp_str + "<td>" + data[i].county_fips + "</td>"
		tmp_str = tmp_str + "<td>" + data[i].year + "</td>"
		tmp_str = tmp_str + "<td>" + data[i].age + "</td>"
		if(sex_list == "S") {
			tmp_str = tmp_str + "<td> </td>"
		} else {
		   if(data[i].sex == "M"){
			tmp_str = tmp_str + "<td>Male</td>";
		   }
		   if(data[i].sex == "F"){
			tmp_str = tmp_str + "<td>Female</td>";
		   }
		}
		tmp_str = tmp_str + "<td>" + data[i].race + "</td>"
		tmp_str = tmp_str + "<td>" + data[i].ethnicity + "</td>"
		tmp_str = tmp_str + "<td>" + parseInt(data[i].count) + "</td></tr>"
	   out_tab = out_tab + tmp_str;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "raceTab";
//Clear div
tabDivOut.innerHTML = "";

var tabObj = "#" + tabName;
$(tabDivOut).append("<table id="+ tabName + " class='DTTable' width='90%'></table>");
$(tabObj).append(out_tab); //this has to be a html table


$(tabObj).DataTable({
  dom: 'Bfrtip',
        buttons: [
            'csv'
        ]
 });
})
} //genRaceTab