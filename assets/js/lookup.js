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

//genRaceTabCty creares the county race data call and produces table
function genRaceTabCty(loc,year_arr, race_arr,eth_arr,age_arr,sex_list,group) {
	const fmt_comma = d3.format(",");

	//build urlstr
	var fips_arr = [];
	for(i = 0; i < loc.length; i++){ fips_arr.push(parseInt(loc[i]))}
	var fips_list  = fips_arr.join(",")
	var year_list = year_arr.join(",")
	var race_list = race_arr.join(",")
	var eth_list = eth_arr.join(",")
	var age_list = age_arr.join(",")
	if(sex_list == "S"){
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&group="+group;
    } else {
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&sex="+sex_list+"&group="+group;
	}

d3.json(urlstr).then(function(data){


    // Flesh out records -- for options ne 0
	var fullkeys = ['county_fips', 'year','age','sex','race', 'ethnicity','count']

	for(i = 0; i < data.length; i++){
		for(j = 0; j < fullkeys.length; j ++) {
		if(!(fullkeys[j] in data[i])){
				data[i][fullkeys[j]] = "_";
			}
		}
	}
	
	// Generate Table
	var out_tab = "<thead><tr><th>County Name</th><th>County FIPS</th><th>Year</th><th>Age</th><th>Sex</th><th>Race</th><th>Ethnicity</th><th>Count</th></tr></thead>";
	out_tab = out_tab + "<tbody>"
	for(i = 0; i < data.length; i++){
		var ctyName = data[i].county_fips  == "_" ? " " : countyName(data[i].county_fips)
		var el1 = "<td>" + ctyName + "</td>"
		var el2 = "<td>" + data[i].county_fips + "</td>"
		var el3 = "<td>" + data[i].year + "</td>"
		var el4 = "<td>" + data[i].age + "</td>"
		if(sex_list == "S") {
			var el5 = "<td> </td>"
		} else {
		   if(data[i].sex == "M"){
			var el5 = "<td>Male</td>";
		   }
		   if(data[i].sex == "F"){
			var el5 =  "<td>Female</td>";
		   }
		}
		var el6 =  "<td>" + data[i].race + "</td>"
		var el7 = "<td>" + data[i].ethnicity + "</td>"
		var el8 = "<td>" + fmt_comma(parseInt(data[i].count)) + "</td>"

		var tmp_row = "<tr>" + el1 + el2 + el3 + el4 + el5 + el6 + el7 + el8 + "</tr>";
		var tmp_str = tmp_row.replaceAll("_","")

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
} //genRaceTabCty


//genRaceTabReg creares the county race data call and produces table
function genRaceTabReg(region, loc,year_arr, race_arr,eth_arr,age_arr,sex_list,group) {
	const fmt_comma = d3.format(",");
	//build urlstr
	var fips_arr = [];

		loc.forEach(d => {
			d.forEach(i => {
			  fips_arr.push(parseInt(i));
			})
		})
	var fips_list  = fips_arr.join(",")
	var year_list = year_arr.join(",")
	var race_list = race_arr.join(",")
	var eth_list = eth_arr.join(",")
	var age_list = age_arr.join(",");
	if(sex_list == "S"){
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&group="+group;
    } else {
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&sex="+sex_list+"&group="+group;
	}

d3.json(urlstr).then(function(data){

    // Flesh out records -- for options ne 0
	var fullkeys = ['county_fips', 'year','age','sex','race', 'ethnicity','count']

	for(i = 0; i < data.length; i++){
		for(j = 0; j < fullkeys.length; j ++) {
		if(!(fullkeys[j] in data[i])){
				data[i][fullkeys[j]] = "_";
			}
		}
	}
	
// Rolling up Region

var reg_data = [];
if(group == "opt0"){
	region.forEach(i => {
	   var selfips = [];
       var tempReg = regionCOL(parseInt(i));
	   tempReg[0].fips.forEach( a => selfips.push(parseInt(a)) )
	   var filtData = data.filter(b => selfips.includes(b.county_fips));
	   var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.age, d => d.sex, d => d.race, d => d.ethnicity);

		//Flatten Arrays for output
		var reg_tmp = [];
		for (let [key, value] of reg_sum) {  //Year
			for(let [key2, value2] of value){ //age
			  for(let [key3,value3] of value2) { //sex
				 for(let [key4, value4] of value3) { //race
				   for (let [key5, value5] of value4){  //ethncitiy
				   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : key2, 'sex' : key3, 'race' : key4, 'ethnicity' : key5, 'count' : value5});
			}}}}}
	  reg_data = reg_data.concat(reg_tmp)
	}) //forEach
} else {
		region.forEach(i => {
			data.forEach(j => {
				reg_data.push({ 'name' : regionName(parseInt(i)), 'year' : j.year, 'age' : j.age, 'sex' : j.sex, 'race' : j.race, 'ethnicity' : j.ethnicity, 'count' : +j.count})
			})
		})
}

	
	// Generate Table
	var out_tab = "<thead><tr><th>Region Name</th><th>Year</th><th>Age</th><th>Sex</th><th>Race</th><th>Ethnicity</th><th>Count</th></tr></thead>";
	out_tab = out_tab + "<tbody>"
	for(i = 0; i < reg_data.length; i++){
		var el1 = "<td>" + reg_data[i].name + "</td>"
		var el3 = "<td>" + reg_data[i].year + "</td>"
		var el4 = "<td>" + reg_data[i].age + "</td>"
		if(sex_list == "S") {
			var el5 = "<td> </td>"
		} else {
		   if(reg_data[i].sex == "M"){
			var el5 = "<td>Male</td>";
		   }
		   if(reg_data[i].sex == "F"){
			var el5 =  "<td>Female</td>";
		   }
		}
		var el6 =  "<td>" + reg_data[i].race + "</td>"
		var el7 = "<td>" + reg_data[i].ethnicity + "</td>"
		var el8 = "<td>" + fmt_comma(parseInt(reg_data[i].count)) + "</td>"

		var tmp_row = "<tr>" + el1 + el3 + el4 + el5 + el6 + el7 + el8 + "</tr>";
		var tmp_str = tmp_row.replaceAll("_","")

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
} //genRaceTabReg