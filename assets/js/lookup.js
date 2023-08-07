//Support functions for lookup scripts  A. Bickford 7/2022

//Join function from http://learnjsdata.com/combine_data.html

function joinFUNCT(lookupTable, mainTable, lookupKey, mainKey, select) {

    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l items
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m items
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};

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

//genYR Range Generates year range data
function genYR(begYr, endYr){
	outYr = [];
	for(i = begYr; i <= endYr; i++){
		outYr.push({"year" : i, 
		"datatype" :'Estimate'})
	}
return(outYr);
}

//popYrdd populates year dropdown based on year data
function popYrdd(ddid,yeardata){
var sel = document.getElementById(ddid);
sel.innerHTML = "";
		yeardata.forEach(j => {
			var el = document.createElement("option");
			if(j.datatype == "Estimate") {
				el.style.color = "black";
			    el.textContent = j.year;
		    } else {
			el.style.color = "red";
			el.textContent = j.year;
		   }
			el.value = j.year;
			sel.appendChild(el);
		})
}  //popRaceYrdd

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
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&group=opt0";
    } else {
		var sexl = sex_list.toLowerCase()
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&sex="+sexl+"&group=opt0";
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
	var fips_list = [...new Set(data.map(d => d.county_fips))];
	var cty_data = [];
  	
	fips_list.forEach( i => {
	  var filtData = data.filter(b => (b.county_fips == i));
	  var cty_tmp = [];

    //Rollups based on group value
	switch(group) {
		case "opt0":
		filtData.forEach(j =>{
				cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : j.year, 'age' : j.age, 'sex' : j.sex, 'race' : j.race, 'ethnicity' : j.ethnicity, 'count' : Math.round(+j.count)});
		});
		break;
		case "opt1":
			var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count));
			//Flatten Arrays for output
			 cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : "", 'count' : Math.round(cty_sum)});
		break;
		case "opt2":
			var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : key, 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : "", 'count' : Math.round(value)});
				}
		break;
		case "opt3":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.age);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : key, 'sex' : "", 'race' : "", 'ethnicity' : "", 'count' : Math.round(value)});
				}
		break;
		case "opt4":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : "", 'sex' : "", 'race' : key, 'ethnicity' : "", 'count' : Math.round(value)});
				}
		break;
		case "opt5":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : key, 'count' : Math.round(value)});
				}
		break;
		case "opt6":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d=> d.race, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  
			    for(let [key2,value2] of value){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : "", 'sex' : "", 'race' : key, 'ethnicity' : key2, 'count' : Math.round(value2)});
			}}
		break;
		case "opt7":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : key, 'age' : "", 'sex' : "", 'race' : key2, 'ethnicity' : "", 'count' : Math.round(value2)});
			}}
		break;
		case "opt8":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : key, 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : key2, 'count' : Math.round(value2)});
			}}
		break;
		case "opt9":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.race, d => d.ethnicity);
			//Flatten Arrays for output
			var cty_tmp = [];
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : key, 'age' : "", 'sex' : "", 'race' : key2, 'ethnicity' : key3, 'count' : Math.round(value3)});
			}}}
		break;
		case "opt10":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count),  d => d.age, d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : key, 'sex' : "", 'race' : key2, 'ethnicity' : "", 'count' : Math.round(value2)});
			}}
		break;
		case "opt11":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.age, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : key, 'sex' : "", 'race' : "", 'ethnicity' : key2, 'count' : Math.round(value2)});
			}}
		break;
		case "opt12":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.age, d => d.race, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : "", 'age' : key, 'sex' : "", 'race' : key2, 'ethnicity' : key3, 'count' : Math.round(value3)});
			}}}
		break;
		case "opt13":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.age, d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : key, 'age' : key2, 'sex' : "", 'race' : key3, 'ethnicity' : "", 'count' : Math.round(value3)});
			}}}
		break;
		case "opt14":
		var cty_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.age, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of cty_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   cty_tmp.push({ 'name' : countyName(parseInt(i)), 'county_fips' : i, 'year' : key, 'age' : key2, 'sex' : "", 'race' : "", 'ethnicity' : key3, 'count' : Math.round(value3)});
			}}}
		break;
} //Switch

cty_data = cty_data.concat(cty_tmp)
	}) //forEach
	
	
	// Generate Table
	var out_tab = "<thead><tr><th>County Name</th><th>County FIPS</th><th>Year</th><th>Age</th><th>Sex</th><th>Race</th><th>Ethnicity</th><th>Count</th></tr></thead>";
	out_tab = out_tab + "<tbody>"
	for(i = 0; i < cty_data.length; i++){
		var el1 = "<td>" + cty_data[i].name + "</td>"
		var el2 = "<td>" + cty_data[i].county_fips + "</td>"
		var el3 = "<td>" + cty_data[i].year + "</td>"
		var el4 = "<td>" + cty_data[i].age + "</td>"
		if(sex_list == "S") {
			var el5 = "<td> </td>"
		} else {
		   if(cty_data[i].sex == "M"){
			var el5 = "<td>Male</td>";
		   }
		   if(cty_data[i].sex == "F"){
			var el5 =  "<td>Female</td>";
		   }
		}
		var el6 =  "<td>" + cty_data[i].race + "</td>"
		var el7 = "<td>" + cty_data[i].ethnicity + "</td>"
		var el8 = "<td style='text-align: right'>" + fmt_comma(parseInt(cty_data[i].count)) + "</td>"

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
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&group=opt0";
    } else {
		var sexl = sex_list.toLowerCase()
		var urlstr = "https://gis.dola.colorado.gov/lookups/county_sya_race_estimates_current?age="+ age_list + "&county="+ fips_list +"&year="+ year_list +"&race=" + race_list+ "&ethnicity="+eth_list+"&sex="+sexl+"&group=opt0";
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
	region.forEach(i => {
	   var selfips = [];
       var tempReg = regionCOL(parseInt(i));
	   tempReg[0].fips.forEach( a => selfips.push(parseInt(a)) )
	   var filtData = data.filter(b => selfips.includes(b.county_fips));
	   var reg_tmp = [];

	   //Rollups based on group value
	switch(group) {
		case "opt0":
			var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.age, d => d.sex, d => d.race, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
				for(let [key2, value2] of value){ //age
				  for(let [key3,value3] of value2) { //sex
					 for(let [key4, value4] of value3) { //race
					   for (let [key5, value5] of value4){  //ethncitiy
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : key2, 'sex' : key3, 'race' : key4, 'ethnicity' : key5, 'count' : Math.round(value5)});
				}}}}}
		break;
		case "opt1":
			var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count));
			//Flatten Arrays for output
			 reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : "", 'count' : reg_sum});
		break;
		case "opt2":
			var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : "", 'count' : Math.round(value)});
				}
		break;
		case "opt3":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.age);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : key, 'sex' : "", 'race' : "", 'ethnicity' : "", 'count' : Math.round(value)});
				}
		break;
		case "opt4":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : "", 'sex' : "", 'race' : key, 'ethnicity' : "", 'count' : Math.round(value)});
				}
		break;
		case "opt5":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : key, 'count' : Math.round(value)});
				}
		break;
		case "opt6":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d=> d.race, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  
			    for(let [key2,value2] of value){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : "", 'sex' : "", 'race' : key, 'ethnicity' : key2, 'count' : Math.round(value2)});
			}}
		break;
		case "opt7":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : "", 'sex' : "", 'race' : key2, 'ethnicity' : "", 'count' : Math.round(value2)});
			}}
		break;
		case "opt8":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : "", 'sex' : "", 'race' : "", 'ethnicity' : key2, 'count' : Math.round(value2)});
			}}
		break;
		case "opt9":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.race, d => d.ethnicity);
			//Flatten Arrays for output
			var reg_tmp = [];
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : "", 'sex' : "", 'race' : key2, 'ethnicity' : key3, 'count' : Math.round(value3)});
			}}}
		break;
		case "opt10":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count),  d => d.age, d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : key, 'sex' : "", 'race' : key2, 'ethnicity' : "", 'count' : Math.round(value2)});
			}}
		break;
		case "opt11":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.age, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : key, 'sex' : "", 'race' : "", 'ethnicity' : key2, 'count' : Math.round(value2)});
			}}
		break;
		case "opt12":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.age, d => d.race, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : "", 'age' : key, 'sex' : "", 'race' : key2, 'ethnicity' : key3, 'count' : Math.round(value3)});
			}}}
		break;
		case "opt13":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.age, d => d.race);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : key2, 'sex' : "", 'race' : key3, 'ethnicity' : "", 'count' : Math.round(value3)});
			}}}
		break;
		case "opt14":
		var reg_sum = d3.rollup(filtData, v => d3.sum(v, d => +d.count), d => d.year, d => d.age, d => d.ethnicity);
			//Flatten Arrays for output
			for (let [key, value] of reg_sum) {  //Year
			   for( let[key2, value2] of value){
				   for( let [key3, value3] of value2){
					   reg_tmp.push({ 'name' : regionName(parseInt(i)), 'year' : key, 'age' : key2, 'sex' : "", 'race' : "", 'ethnicity' : key3, 'count' : Math.round(value3)});
			}}}
		break;
} //Switch
reg_data = reg_data.concat(reg_tmp)
	}) //forEach


	
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
		var el8 = "<td style='text-align: right'>" + fmt_comma(parseInt(reg_data[i].count)) + "</td>"

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


//genCOCReg creares the state regional COC table 
function genCOCReg(region, loc,year_arr,group,yeardata) {
	const fmt_comma = d3.format(",");

	//build urlstr
   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
   
	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")
	
	var urlstr = "https://gis.dola.colorado.gov/lookups/components?county=" + fips_list + "&year=" + year_list + "&group=" + group +";"
		
d3.json(urlstr).then(function(data){
     
 var raw_data = joinFUNCT(fips_arr,data,"countyfips","countyfips",function(dat,col){
		return{
			regval : col.regval,
			countyfips : col.countyfips,
			year : dat.year,
			estimate: dat.estimate,
			births : dat.births,
			deaths : dat.deaths,
			netmig : dat.netmig,
			change : dat.change
		};
	});

    // sum up values by region and year
	var columnsToSum = ['estimate', 'births','deaths','netmig', 'change']

var reg_data = [];

	   //Rollups based on group value
	switch(group) {
		case "opt0":
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year);
		for (let [key, value] of binroll) {
		for (let[key2, value2] of value) {
		   reg_data.push({ 'region_num' : key,
			            'name' : regionName(key), 
						'year' : key2,
						'population' : value2.estimate, 
						'births' : value2.births, 
						'deaths' : value2.deaths, 
						'netmig' : value2.netmig, 
						'change' : value2.change});
		};
		};
		break;
		case "opt1":
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
		for (let [key, value] of binroll) {
		   reg_data.push({'region_num' : '',
			            'name' : '', 
						'year' : key,
						'population' : value.estimate, 
						'births' : value.births, 
						'deaths' : value.deaths, 
						'netmig' : value.netmig, 
						'change' : value.change});
		};
		break;
		case "opt2":
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval);
		for (let [key, value] of binroll) {
		   reg_data.push({'region_num' : key,
						 'name' : regionName(key), 
						'year' : '',
						'population' : value.estimate, 
						'births' : value.births, 
						'deaths' : value.deaths, 
						'netmig' : value.netmig, 
						'change' : value.change});
		};
		break;
} //Switch

var reg_data2 = reg_data.sort(function(a, b){ return d3.ascending(a['region_num'], b['region_num']); })

	// Generate Table
	var out_tab = "<thead><tr><th>Region Name</th><th>Year</th><th>Population</th><th>Change</th><th>Births</th><th>Deaths</th><th>Net Migration</th><th>Data Type</th></tr></thead>";
	out_tab = out_tab + "<tbody>"

	for(i = 0; i < reg_data2.length; i++){
		var el1 = "<td>" + reg_data2[i].name + "</td>"
		var el2 = "<td>" + reg_data2[i].year + "</td>"
		var el3 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].population,"num") + "</td>"
		var el4 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].change,"num") + "</td>"
		var el5 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].births,"num") + "</td>"
		var el6 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].deaths,"num") + "</td>"
		var el7 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].netmig,"num") + "</td>"
//Selecting value of data type

		var filtData = yeardata.filter(b => reg_data2[i].year == b.year);
		var el8 = "<td>" + filtData[0].datatype + "</td>"

	   var tmp_row = "<tr>" + el1 + el2 + el3 + el4 + el5 + el6 + el7 + el8 + "</tr>";

	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "cocTab";
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
}) //data
} //genCOCReg

//genCOCCty creares the county COC Table
function genCOCCty(loc,year_arr,group,yeardata) {

	//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };
   
	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")
	
	var urlstr = "https://gis.dola.colorado.gov/lookups/components?county=" + fips_list + "&year=" + year_list + "&group=" + group +";"
		
d3.json(urlstr).then(function(data){
     
    // sum up values by region and year
	var columnsToSum = ['estimate', 'births','deaths','netmig', 'change']

var cty_data = [];

	   //Rollups based on group value
	switch(group) {
		case "opt0":
		for (i = 0; i < data.length; i++) {
		   cty_data.push({ 'countyfips' : data[i].countyfips,
			            'name' : countyName(data[i].countyfips), 
						'year' : data[i].year,
						'population' : data[i].estimate, 
						'births' : data[i].births, 
						'deaths' : data[i].deaths, 
						'netmig' : data[i].netmig, 
						'change' : data[i].change});
		};
		break;
		case "opt1":
		var binroll =  d3.rollup(data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
		for (let [key, value] of binroll) {
		   cty_data.push({'countyfips' : '',
			            'name' : '', 
						'year' : key,
						'population' : value.estimate, 
						'births' : value.births, 
						'deaths' : value.deaths, 
						'netmig' : value.netmig, 
						'change' : value.change});
		};
		break;
		case "opt2":
		var binroll =  d3.rollup(data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.countyfips);
		for (let [key, value] of binroll) {
		   cty_data.push({'countyfips' : key,
						 'name' : countyName(key), 
						'year' : '',
						'population' : value.estimate, 
						'births' : value.births, 
						'deaths' : value.deaths, 
						'netmig' : value.netmig, 
						'change' : value.change});
		};
		break;
} //Switch

var cty_data2 = cty_data.sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })

	// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Population</th><th>Change</th><th>Births</th><th>Deaths</th><th>Net Migration</th><th>Data Type</th></tr></thead>";
	out_tab = out_tab + "<tbody>"

	for(i = 0; i < cty_data2.length; i++){
		var el0 = "<td>" + cty_data2[i].countyfips + "</td>"
		var el1 = "<td>" + cty_data2[i].name + "</td>"
		var el2 = "<td>" + cty_data2[i].year + "</td>"
		var el3 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].population,"num") + "</td>"
		var el4 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].change,"num") + "</td>"
		var el5 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].births,"num") + "</td>"
		var el6 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].deaths,"num") + "</td>"
		var el7 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].netmig,"num") + "</td>"
//Selecting value of data type

		var filtData = yeardata.filter(b => cty_data2[i].year == b.year);
		var el8 = "<td>" + filtData[0].datatype + "</td>"

	   var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + el7 + el8 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "cocTab";
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
}) //data
} //genCOCcty

//genPOPMuni creares the Municipal Housing and Population Profile Table
function genPOPMuni(loc,muni_arr,year_arr,var_arr,groupval) {
	const fmt_comma = d3.format(",");
	
    //build variable List
	var varnames = ["totalpopulation","householdpopulation","groupquarterspopulation",
					"totalhousingunits","occupiedhousingunits","vacanthousingunits"]
	var headingnames = ["Total Population", "Household Population","Group Quarters Population", 
					"Total Nousing Units", "Occupied Housing Units", "Vacant Housing Units"]
    var varlist = [];
	if(var_arr.length < 13){
	for(i = 0; i < var_arr.length; i++){
		varlist.push(varnames[var_arr[i]]);
	}
	} else {
		varlist = varnames;
	}

if(groupval == "opt0"){
	var compressed = "no";
} else {
	var compressed = "yes"
}

var yeararr = [];
  year_arr.forEach(i => {
	  yeararr.push(parseInt(i));
  })
var yrstr = yeararr.join(",")

var urlstr = "https://gis.dola.colorado.gov/lookups/munipophousing?"
	
var ctyarr = []
var muniarr = []
var unincorparr = [];

var cty_url = "";
var muni_url = "";
var unincorp_url = "";


//County
if(loc.length > 0){
  loc.forEach(i => {
	  ctyarr.push(parseInt(i));
  })
}


//Unincorp and muni
if(muni_arr.length > 0){
   muni_arr.forEach(i => {
	  if(i.length == 8){
		 unincorparr.push({"ctyfips" : parseInt(i.substr(0,3)), "munifips" : parseInt(i.substr(3))});
		 } else {
		muniarr.push(parseInt(i));
	  } 
  })
}  

var prom = [];
if(ctyarr.length > 0){
	var ctystr = ctyarr.join(",");
	cty_url = urlstr + "countyfips="+ ctystr + "&" + "year=" + yrstr + "&stats=" + varlist + "&compressed="+compressed
	prom.push(d3.json(cty_url))
}
if(muniarr.length > 0){
	var munistr = muniarr.join(",");
	muni_url = urlstr + "placefips="+ munistr + "&" + "year=" + yrstr + "&stats=" + varlist + "&compressed="+compressed
	prom.push(d3.json(muni_url))
}

if(unincorparr.length > 0) {
	 var un_cty = [];
	 unincorparr.forEach(i => {
		 un_cty.push(i.ctyfips);
	 })
	
	 var unicorpctystr = un_cty.join(",")
     unincorp_url = urlstr + "countyfips="+ unicorpctystr + "&" +"placefips=99990&"+ "year=" + yrstr + "&stats=" + varlist + "&compressed="+compressed
	 prom.push(d3.json(unincorp_url))
}


Promise.all(prom).then(function(data){
	
	var out_data = [];
	for(i = 0; i < data.length; i++){
		out_data = out_data.concat(data[i]);
	}
	
//Remove Duplicates

    keys = ['countyfips', 'placefips', 'year'],
    uniq_data = out_data.filter(
        (s => o => 
            (k => !s.has(k) && s.add(k))
            (keys.map(k => o[k]).join('|'))
        )
        (new Set)
    );
	

//finalizing uniq_data
   var key_arr = Object.keys(uniq_data[0])
	for(i = 0; i < uniq_data.length; i++){
		uniq_data[i]['countyname'] = countyName(out_data[i]['countyfips']);
		for(j = 0; j < key_arr.length; j++){
		if(!['countyfips', 'placefips', 'year', 'municipalityname','countyname'].includes(key_arr[j])){
			uniq_data[i][key_arr[j]] = parseInt(uniq_data[i][key_arr[j]])
		}
		}
	}

var sort_data = uniq_data.sort(function(a, b){ return d3.ascending(a['placefips'], b['placefips']); })
  .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
  
// Generate Table
	var out_tab = "<thead><tr>";
	if(sort_data[0]["countyfips"] != null){
		out_tab = out_tab + "<th>County FIPS</th><th>County Name</th>"
	}
	if(sort_data[0]["placefips"] != null){
		out_tab = out_tab + "<th>Place FIPS</th><th>Place Name</th>"
	}
	   out_tab = out_tab + "<th>Year</th>"
	   
	for(i = 0; i < varlist.length; i++){
	     out_tab = out_tab + "<th>" + headingnames[i] + "</th>"
	}
	out_tab = out_tab + "</thead>"
	out_tab = out_tab + "<tbody>"

	for(i = 0; i < sort_data.length; i++){
	var tmp_row = "<tr>"
	if(sort_data[0]["countyfips"] != null){
		tmp_row = tmp_row +"<td>" + sort_data[i]["countyfips"] + "</td>";
		tmp_row = tmp_row + "<td>" + sort_data[i]["countyname"] + "</td>";
	}
	if(sort_data[0]["placefips"] != null){
		tmp_row = tmp_row + "<td>" + sort_data[i]["placefips"] + "</td>";
		tmp_row = tmp_row + "<td>" + sort_data[i]["municipalityname"] + "</td>";
	}
	tmp_row = tmp_row + "<td>" + sort_data[i]["year"] + "</td>";
	for(j = 0; j < varlist.length; j++){  
            tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(sort_data[i][varlist[j]],"num") + "</td>";
		}
	   tmp_row = tmp_row + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"


//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "cocTab";
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
}) //data
} //genPOPmuni

//genPOPCty creares the county Population Profile Table
function genPOPCty(loc,var_arr,year_arr,group) {
	const fmt_comma = d3.format(",");
    //build variable List
	var varnames = ["totalpopulation", "births", "deaths", "naturalincrease", "netmigration", 
	                "censusbuildingpermits", "groupquarterspopulation", "householdpopulation",
					"households", "householdsize", "totalhousingunits", "vacancyrate","vacanthousingunits"]
	var headingnames = ["Population", "Births", "Deaths", "Natural Increase", "Net Migration", 
	                "Census Building Permits", "Group Quarters Population", "Household Population",
					"Households", "Household Size", "Total Housing Units", "Vacancy Rate","Vacant Housing Units"]
    var varlist = [];
	if(var_arr.length < 13){
	for(i = 0; i < var_arr.length; i++){
		varlist.push(varnames[var_arr[i]]);
	}
	} else {
		varlist = varnames;
	}
	
	//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };
   
	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")
	var var_list = varlist.join(",")
	
	if(var_arr.length < 13){
				 var urlstr = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + year_list + "&vars=" + var_list
	} else {
	     var urlstr = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + year_list
    }
		
d3.json(urlstr).then(function(data){
     
    // sum up values by region and year
	var columnsToSum = varlist

var cty_data = [];

	   //Rollups based on group value and selected variables
	switch(group) {
		case "opt0":
		for (i = 0; i < data.length; i++) {
		   var nameval = countyName(data[i].countyfips);
		   var tmprow = data[i];
		   tmprow["name"] = nameval;
		   cty_data.push(tmprow);
		};
		break;
		case "opt1":
		var tmp = [];
		var binroll =  d3.rollup(data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
		for (let [key, value] of binroll) {
		   tmp.push({key, value});
		};

		for(i = 0; i < tmp.length; i ++){ 
			var tmprow = [];
			tmprow['countyfips'] = "";
			tmprow['name'] = "";
			tmprow['year'] = tmp[i].key;
			for(j = 0; j < columnsToSum.length; j++){
			  tmprow[columnsToSum[j]] = tmp[i].value[columnsToSum[j]];
			}
			if(columnsToSum.includes('householdsize') && columnsToSum.includes('householdpopulation') && columnsToSum.includes('households')){
				tmprow['householdsize'] = tmprow['householdpopulation']/tmprow['households']
			}
			if(columnsToSum.includes('vacancyrate') && columnsToSum.includes('totalhousingunits') && columnsToSum.includes('vacanthousingunits')){
				tmprow['vacancyrate'] = (tmprow['vacanthousingunits']/tmprow['totalhousingunits']) * 100;
			}
			cty_data.push(tmprow)
		}
		break;
		case "opt2":
		var tmp = [];
		var binroll =  d3.rollup(data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.countyfips);
		for (let [key, value] of binroll) {
		   tmp.push({key, value});
		};
		for(i = 0; i < tmp.length; i ++){
			var tmprow = [];
			tmprow['countyfips'] = tmp[i].key;
			tmprow['name'] = countyName(tmp[i].key);
			tmprow['year'] = "";
			for(j = 0; j < columnsToSum.length; j++){
			  tmprow[columnsToSum[j]] = tmp[i].value[columnsToSum[j]];
			}
			if(columnsToSum.includes('householdsize') && columnsToSum.includes('householdpopulation') && columnsToSum.includes('households')){
				tmprow['householdsize'] = tmprow['householdpopulation']/tmprow['households']
			}
			if(columnsToSum.includes('vacancyrate') && columnsToSum.includes('totalhousingunits') && columnsToSum.includes('vacanthousingunits')){
				tmprow['vacancyrate'] = (tmprow['vacanthousingunits']/tmprow['totalhousingunits']) * 100;
			}
			cty_data.push(tmprow)
		}
		break;
} //Switch

var cty_data2 = cty_data.sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })

	// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th>";
	for(i = 0; i < columnsToSum.length; i++){
	var colpos = 0;
	for(j = 0; j < varnames.length;j++){
		if(columnsToSum[i] == varnames[j]){
			colpos = j;
			break;
		}
	}
	out_tab = out_tab + "<th>" + headingnames[j] + "</th>"
	}
	out_tab = out_tab + "</thead>"
	out_tab = out_tab + "<tbody>"

	for(i = 0; i < cty_data2.length; i++){
    var tmp_row  = "<tr><td>" + cty_data2[i]["countyfips"] + "</td>";
	tmp_row = tmp_row + "<td>" + cty_data2[i]["name"] + "</td>";
	tmp_row = tmp_row + "<td>" + cty_data2[i]["year"] + "</td>";
	for(j = 0; j < columnsToSum.length; j++){  //Fix this
		if((columnsToSum[j] == 'vacancyrate') || (columnsToSum[j] == 'householdsize')){
			tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(cty_data2[i][columnsToSum[j]],"dec") + "</td>";
		} else {
            tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(cty_data2[i][columnsToSum[j]],"num") + "</td>";
		}
	}
	   tmp_row = tmp_row + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"


//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "cocTab";
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
}) //data
} //genPOPcty

//genPOPReg creares the county Population Profile Table
function genPOPReg(region, loc,var_arr,year_arr,group) {
	const fmt_comma = d3.format(",");
    //build variable List
	var varnames = ["totalpopulation", "births", "deaths", "naturalincrease", "netmigration", 
	                "censusbuildingpermits", "groupquarterspopulation", "householdpopulation",
					"households", "householdsize", "totalhousingunits", "vacancyrate","vacanthousingunits"]
	var headingnames = ["Population", "Births", "Deaths", "Natural Increase", "Net Migration", 
	                "Census Building Permits", "Group Quarters Population", "Household Population",
					"Households", "Household Size", "Total Housing Units", "Vacancy Rate","Vacant Housing Units"]
    var varlist = [];
	if(var_arr.length < 13){
	for(i = 0; i < var_arr.length; i++){
		varlist.push(varnames[var_arr[i]]);
	}
	} else {
		varlist = varnames;
	}
	
	//build urlstr
	var fips_arr = [];
	var fips_arr2 = [];
	for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
 
	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")
	var var_list = varlist.join(",")
	
	if(var_arr.length < 13){
				 var urlstr = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + year_list + "&vars=" + var_list
	} else {
	     var urlstr = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + year_list
    }
		
d3.json(urlstr).then(function(data){

	 	var columnsToSum = varlist
    // Adding Region Number to data

var raw_data = [];
var k = 0
for(i = 0; i < year_arr.length; i++) {
for(j = 0; j < fips_arr.length; j++){
  raw_data.push({
   ...fips_arr[j], 
   ...data[k]
  });
 k++
}
}

var reg_data = [];

	   //Rollups based on group value and selected variables
	switch(group) {
		case "opt0":
		var tmp = [];
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year);
		for (let [key, value] of binroll) {
		for (let[key2, value2] of value) {
         tmp.push({key, key2, value2});
		};
		};
		for(i = 0; i < tmp.length; i ++){ 
			var tmprow = [];
			tmprow['regval'] = tmp[i].key;
			tmprow['name'] = regionName(tmp[i].key);
			tmprow['year'] = tmp[i].key2;
			for(j = 0; j < columnsToSum.length; j++){
			  tmprow[columnsToSum[j]] = tmp[i].value2[columnsToSum[j]];
			}
			if(columnsToSum.includes('householdsize') && columnsToSum.includes('householdpopulation') && columnsToSum.includes('households')){
				tmprow['householdsize'] = tmprow['householdpopulation']/tmprow['households']
			}
			if(columnsToSum.includes('vacancyrate') && columnsToSum.includes('totalhousingunits') && columnsToSum.includes('vacanthousingunits')){
				tmprow['vacancyrate'] = (tmprow['vacanthousingunits']/tmprow['totalhousingunits']) * 100;
			}
			reg_data.push(tmprow)
		}
		break;
		case "opt1":
		var tmp = [];
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
		for (let [key, value] of binroll) {
		   tmp.push({key, value});
		};

		for(i = 0; i < tmp.length; i ++){ 
			var tmprow = [];
			tmprow['regval'] = "";
			tmprow['name'] = "";
			tmprow['year'] = tmp[i].key;
			for(j = 0; j < columnsToSum.length; j++){
			  tmprow[columnsToSum[j]] = tmp[i].value[columnsToSum[j]];
			}
			if(columnsToSum.includes('householdsize') && columnsToSum.includes('householdpopulation') && columnsToSum.includes('households')){
				tmprow['householdsize'] = tmprow['householdpopulation']/tmprow['households']
			}
			if(columnsToSum.includes('vacancyrate') && columnsToSum.includes('totalhousingunits') && columnsToSum.includes('vacanthousingunits')){
				tmprow['vacancyrate'] = (tmprow['vacanthousingunits']/tmprow['totalhousingunits']) * 100;
			}
			reg_data.push(tmprow)
		}
		break;
		case "opt2":
		var tmp = [];
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval);
		for (let [key, value] of binroll) {
		   tmp.push({key, value});
		};
		for(i = 0; i < tmp.length; i ++){
			var tmprow = [];
			tmprow['regval'] = tmp[i].key;
			tmprow['name'] = regionName(tmp[i].key);
			tmprow['year'] = "";
			for(j = 0; j < columnsToSum.length; j++){
			  tmprow[columnsToSum[j]] = tmp[i].value[columnsToSum[j]];
			}
			if(columnsToSum.includes('householdsize') && columnsToSum.includes('householdpopulation') && columnsToSum.includes('households')){
				tmprow['householdsize'] = tmprow['householdpopulation']/tmprow['households']
			}
			if(columnsToSum.includes('vacancyrate') && columnsToSum.includes('totalhousingunits') && columnsToSum.includes('vacanthousingunits')){
				tmprow['vacancyrate'] = (tmprow['vacanthousingunits']/tmprow['totalhousingunits']) * 100;
			}
			reg_data.push(tmprow)
		}
		break;
} //Switch

var reg_data2 = reg_data.sort(function(a, b){ return d3.ascending(a['regval'], b['regval']); })

	// Generate Table
	var out_tab = "<thead><tr><th>Region Number</th><th>Region Name</th><th>Year</th>";
	for(i = 0; i < columnsToSum.length; i++){
	var colpos = 0;
	for(j = 0; j < varnames.length;j++){
		if(columnsToSum[i] == varnames[j]){
			colpos = j;
			break;
		}
	}
	out_tab = out_tab + "<th>" + headingnames[j] + "</th>"
	}
	out_tab = out_tab + "</thead>"
	out_tab = out_tab + "<tbody>"

	for(i = 0; i < reg_data2.length; i++){
    var tmp_row  = "<tr><td>" + reg_data2[i]["regval"] + "</td>";
	tmp_row = tmp_row + "<td>" + reg_data2[i]["name"] + "</td>";
	tmp_row = tmp_row + "<td>" + reg_data2[i]["year"] + "</td>";
	for(j = 0; j < columnsToSum.length; j++){  
		if((columnsToSum[j] == 'vacancyrate') || (columnsToSum[j] == 'householdsize')){
			tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(reg_data2[i][columnsToSum[j]],"dec") + "</td>";
		} else {
            tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(reg_data2[i][columnsToSum[j]],"num") + "</td>";
		}
	}
	   tmp_row = tmp_row + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"


//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "cocTab";
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
}) //data
} //genPOPreg

//genCtyMuni outputs table for County and Municipal Population Timeseries
function genCtyMuni(ctyval,munival,yrval,groupval) {
//Creating url String

if(groupval == "opt0"){
	var compressed = "no";
} else {
	var compressed = "yes"
}

var yrstr = yrval.join(",")

var urlstr = "https://gis.dola.colorado.gov/lookups/munipophousing?"

// A promise for unincorporated areas (county and muni)
// A promise for County call
// A promise for muni call

var ctyarr = []
var muniarr = []
var unincorparr = [];

var cty_url = "";
var muni_url = "";
var unincorp_url = "";


//County
if(ctyval.length > 0){
  ctyval.forEach(i => {
	  ctyarr.push(parseInt(i));
  })
}


//Unincorp and muni
if(munival.length > 0){
   munival.forEach(i => {
	  if(i.length == 8){
		 unincorparr.push({"ctyfips" : parseInt(i.substr(0,3)), "munifips" : parseInt(i.substr(3))});
		 } else {
		muniarr.push(parseInt(i));
	  } 
  })
}  

var prom = [];
if(ctyarr.length > 0){
	var ctystr = ctyarr.join(",");
	cty_url = urlstr + "countyfips="+ ctystr + "&" + "year=" + yrstr + "&compressed="+compressed
	prom.push(d3.json(cty_url))
}
if(muniarr.length > 0){
	var munistr = muniarr.join(",");
	muni_url = urlstr + "placefips="+ munistr + "&" + "year=" + yrstr + "&compressed="+compressed
	prom.push(d3.json(muni_url))
}

if(unincorparr.length > 0) {
	 var un_cty = [];
	 unincorparr.forEach(i => {
		 un_cty.push(i.ctyfips);
	 })
	
	 var unicorpctystr = un_cty.join(",")
     unincorp_url = urlstr + "countyfips="+ unicorpctystr + "&" +"placefips=99990&"+ "year=" + yrstr + "&compressed="+compressed
	 prom.push(d3.json(unincorp_url))
}

Promise.all(prom).then(function(data){
	
	var out_data = [];
	for(i = 0; i < data.length; i++){
		data[i].forEach(j => {
			out_data.push({
				"countyfips" : j.countyfips,
				"placefips" : j.placefips,
				"countyname" : countyName(j.countyfips),
				"municipalityname" : j.municipalityname,
				"year" : j.year,
				"totalpopulation" : parseInt(j.totalpopulation)				
			})
		})
	}
	
//Remove Duplicates

    keys = ['countyfips', 'placefips', 'year'],
    uniq_data = out_data.filter(
        (s => o => 
            (k => !s.has(k) && s.add(k))
            (keys.map(k => o[k]).join('|'))
        )
        (new Set)
    );
	
var sort_data = uniq_data.sort(function(a, b){ return d3.ascending(a['placefips'], b['placefips']); })
  .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
  
// Generate Table
if(compressed == "no"){
	var out_tab = "<thead><tr><th>County FIPS</th><th>Place FIPS</th><th>County Name</th><th>Place Name</th><th>Year</th><th>Total Population</th></tr></thead>><tbody>";
	for(i = 0; i < sort_data.length; i++){
       var tmp_row  = "<tr><td>" + sort_data[i]["countyfips"] + "</td>";
	       tmp_row = tmp_row + "<td>" + sort_data[i]["placefips"] + "</td>";
	       tmp_row = tmp_row + "<td>" + sort_data[i]["countyname"] + "</td>";
		   tmp_row = tmp_row + "<td>" + sort_data[i]["municipalityname"] + "</td>";
		   tmp_row = tmp_row + "<td>" + sort_data[i]["year"] + "</td>";
    	   tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(sort_data[i]["totalpopulation"],"num") + "</td>";
	       tmp_row = tmp_row + "</tr>";
	       out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"
} else {
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Total Population</th></tr></thead>><tbody>";
	for(i = 0; i < sort_data.length; i++){
       var tmp_row  = "<tr><td>" + sort_data[i]["countyfips"] + "</td>";
	       tmp_row = tmp_row + "<td>" + sort_data[i]["countyname"] + "</td>";
		   tmp_row = tmp_row + "<td>" + sort_data[i]["year"] + "</td>";
    	   tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(sort_data[i]["totalpopulation"],"num") + "</td>";
	       tmp_row = tmp_row + "</tr>";
	       out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"
}

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "popTab";
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
	
}) //Data
} //genCtyMuni

//genHHCty  County Household Projections
//  https://gis.dola.colorado.gov/lookups/household?county=1,3&year=2010&age=1,2&household=1,2,3&group=opt8

//support functions
function hholdid(inval){
	 switch(inval){
		 case 0:
		 var outval = "All Households";
		 break;
		 case 1:
		 var outval = "One adult with no children";
		 break;
		 case 2:
		 var outval = "One adult with children";
		 break;
		 case 3: 
		 var outval = "More than one adult with no children";
		 break;
		 case 4:
		 var outval = "More than one adult with children";
		 break;
	 }
	return(outval)
}

function ageid(inval){
	 switch(inval){
		 case 0:
		 var outval = "Total";
		 break;
		 case 1:
		 var outval = "Age 18 to 24";
		 break;
		 case 2:
		 var outval = "Age 25 to 44";
		 break;
		 case 3: 
		 var outval = "Age 45 to 64";
		 break;
		 case 4:
		 var outval = "Age 65+";
		 break;
	 }
	return(outval)
}

function genHHTab(indata,yrdata,level){
		out_data = [];

	var key_arr = Object.keys(indata[0])
	//Build table header
	var out_tab = "<thead><tr>"
		for(j = 0; j < key_arr.length; j++){
			switch(key_arr[j]){
			case "area_code" :
			    if(level == "county"){
				   out_tab = out_tab + "<th>County FIPS</th><th>County Name</th>"
				} else {
				   out_tab = out_tab + "<th>Region number</th><th>Region Name</th>"
				}
			   break;
			case "year" :
				out_tab = out_tab + "<th>Year</th>"
			    break
			case "household_type_id":
				out_tab = out_tab + "<th>Household Type</th>";
				break
			case "age_group_id":
				out_tab = out_tab + "<th>Age Group</th>"
				break
			case "total_households":
				out_tab = out_tab + "<th>Total Households</th>"
				break
			} //Switch
		} //for j
		
		if(key_arr.includes("year")){
			out_tab = out_tab + "<th>Data Type</th>"
		}
		out_tab = out_tab + "</tr></thead><tbody>"

	
	indata.forEach(i => {
		out_tab = out_tab + "<tr>"
		for(j = 0; j < key_arr.length; j++){
			switch(key_arr[j]){
			case "area_code" :
				out_tab = out_tab + "<td>" + i[key_arr[j]] + "</td>"
				if(level == "county"){
				out_tab = out_tab + "<td>" +  countyName(i[key_arr[j]]) + "</td>"
				} else {
				out_tab = out_tab + "<td>" +  regionName(i[key_arr[j]]) + "</td>"
				}
			   break;
			case "year" :
				out_tab = out_tab + "<td>" +  parseInt(i[key_arr[j]]) + "</td>"
			    break
			case "household_type_id":
				out_tab = out_tab + "<td>" +  hholdid(i[key_arr[j]]) + "</td>";
				break
			case "age_group_id":
				out_tab = out_tab + "<td>" +  ageid(i[key_arr[j]]) + "</td>";
				break
			case "total_households":
				out_tab = out_tab + "<td style='text-align: right'>" +  fixNEG(Math.round(Number(i[key_arr[j]])),"num") + "</td>";
				break
			} //Switch
		} //for j

		if(key_arr.includes("year")){
			var yrtmp = yrdata.filter(d => d.year = i.year)
			out_tab = out_tab + "<td>" + yrtmp[0].datatype + "</td>"
		}
			out_tab = out_tab + "</tr>" 
		})
		

		out_tab = out_tab + "</tbody>"

return(out_tab)

} //genHHTab
function genHHCty(loc,yr_arr,age_arr,hh_arr,group_arr,yeardata) {

//determining groups variable

switch (group_arr.length){
	case 1:
	  var group_val = "opt" + group_arr[0];
	  break;
	case 2:
		if(group_arr[0] == '1' && group_arr[1] == '2') { group_val = 'opt5';}
		if(group_arr[0] == '1' && group_arr[1] == '3') { group_val = 'opt6';}
		if(group_arr[0] == '1' && group_arr[1] == '4') { group_val = 'opt7';}
		if(group_arr[0] == '2' && group_arr[1] == '3') { group_val = 'opt8';}
		if(group_arr[0] == '2' && group_arr[1] == '4') { group_val = 'opt9';}
		if(group_arr[0] == '3' && group_arr[1] == '4') { group_val = 'opt10';}
		break;
	case 3:
		 if(group_arr[0] == '1' && group_arr[1] == '2' && group_arr[2] == '3') { group_val = 'opt11';}
		 if(group_arr[0] == '1' && group_arr[1] == '2' && group_arr[2] == '4') { group_val = 'opt12';}
		 if(group_arr[0] == '2' && group_arr[1] == '3' && group_arr[2] == '4') { group_val = 'opt13';}
		 break;
	case 4:
	    group_val = "opt0";
	default:
	    group_val = "opt0";
		break;
}

//year
var yr_arr2 = [];
	for(i = 0; i < yr_arr.length; i++){ yr_arr2.push(parseInt(yr_arr[i]))}
    var year_list = yr_arr2.join(",")
	
//County Var
	var fips_arr = [];
	for(i = 0; i < loc.length; i++){ fips_arr.push(parseInt(loc[i]))}
	var fips_list  = fips_arr.join(",")
	
//Age var
if(age_arr.length > 0){
	var age_arr2 = [];
	for(i = 0; i < age_arr.length; i++){ age_arr2.push(parseInt(age_arr[i]))}
	var age_list  = age_arr2.join(",")
} else {
	var age_list = '0';
}
//households vars
if(hh_arr == 0){
	var hh_arr2 = [];
	for(i = 0; i < hh_arr.length; i++){ hh_arr2.push(parseInt(hh_arr[i]))}
	var hh_list  = hh_arr2.join(",")
} else {
   var hh_list = '0';
}
//Url Str 
var urlstr = "https://gis.dola.colorado.gov/lookups/household?county=" + fips_list + "&year="+year_list + "&age=" + age_list +"&household="+ hh_list+"&group="+group_val


d3.json(urlstr).then(function(data){

var out_data2 = data.sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
			.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
			


//Output table
var out_tab = genHHTab(out_data2,yeardata,"county")

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "hhTab";
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

}) //data

} //genHHCty

function genHHReg(region,loc,yr_arr,age_arr,hh_arr,group_arr,yeardata) {

//determining groups variable

switch (group_arr.length){
	case 1:
	  var group_val = "opt" + group_arr[0];
	  break;
	case 2:
		if(group_arr[0] == '1' && group_arr[1] == '2') { group_val = 'opt5';}
		if(group_arr[0] == '1' && group_arr[1] == '3') { group_val = 'opt6';}
		if(group_arr[0] == '1' && group_arr[1] == '4') { group_val = 'opt7';}
		if(group_arr[0] == '2' && group_arr[1] == '3') { group_val = 'opt8';}
		if(group_arr[0] == '2' && group_arr[1] == '4') { group_val = 'opt9';}
		if(group_arr[0] == '3' && group_arr[1] == '4') { group_val = 'opt10';}
		break;
	case 3:
		 if(group_arr[0] == '1' && group_arr[1] == '2' && group_arr[2] == '3') { group_val = 'opt11';}
		 if(group_arr[0] == '1' && group_arr[1] == '2' && group_arr[2] == '4') { group_val = 'opt12';}
		 if(group_arr[0] == '2' && group_arr[1] == '3' && group_arr[2] == '4') { group_val = 'opt13';}
		 break;
	case 4:
	    group_val = "opt0";
	default:
	    group_val = "opt0";
		break;
}

//year
var yr_arr2 = [];
	for(i = 0; i < yr_arr.length; i++){ yr_arr2.push(parseInt(yr_arr[i]))}
    var year_list = yr_arr2.join(",")
	
//County Var	//build urlstr
   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
   
	var fips_list  = fips_arr2.join(",")

//Age var
if(age_arr.length > 0){
	var age_arr2 = [];
	for(i = 0; i < age_arr.length; i++){ age_arr2.push(parseInt(age_arr[i]))}
	var age_list  = age_arr2.join(",")
} else {
	var age_list = '0';
}
//households vars
if(hh_arr.length > 0){
	var hh_arr2 = [];
	for(i = 0; i < hh_arr.length; i++){ hh_arr2.push(parseInt(hh_arr[i]))}
	var hh_list  = hh_arr2.join(",")
} else {
   var hh_list = '0';
}
//Url Str 
var urlstr = "https://gis.dola.colorado.gov/lookups/household?county=" + fips_list + "&year="+year_list + "&age=" + age_list +"&household="+ hh_list+"&group="+group_val


d3.json(urlstr).then(function(data){
	
	var raw_data = [];
var k = 0
for( i = 0; i < yr_arr.length; i++) {
for(j = 0; j < fips_arr.length; j++){
  raw_data.push({
   ...fips_arr[j], 
   ...data[k]
  });
 k++
}
}

//Rolling up data based on option level
var reg_data = [];
 var columnsToSum = ["total_households"]
 switch(group_val){
	 case "opt0" :     
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year, d => d.household_type_id, d => d.age_group_id);
		for (let [key, value] of binroll) {
		for (let[key2, value2] of value) {
		for (let[key3, value3] of value2) {
		for (let[key4, value4] of value3) {
		   reg_data.push({ 'area_code' : key,
						'year' : key2,
						'household_type_id' : key3, 
						'age_group_id' : key4, 
						'total_households' : value4.total_households});
		};
		};
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt2" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval);
		for (let [key, value] of binroll) {
		   reg_data.push({ 
						'area_code' : key,
						'total_households' : value.total_households});
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt5" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval, d => d.year);
		for (let [key, value] of binroll) {
		for(let [key1,value1] of value) {
		   reg_data.push({ 
						'area_code' : key,
						'year' : key1,
						'total_households' : value1.total_households});
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt8" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval, d => d.age_group_id);
		for (let [key, value] of binroll) {
		for(let [key1,value1] of value) {
		   reg_data.push({ 
						'area_code' : key,
						'age_group_id' : key1,
						'total_households' : value1.total_households});
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt9" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval, d => d.household_type_id);
		for (let [key, value] of binroll) {
		for(let [key1,value1] of value) {
		   reg_data.push({ 
						'area_code' : key,
						'household_type_id' : key1,
						'total_households' : value1.total_households});
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt11" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval, d => d.year, d => d.age_group_id);
		for (let [key, value] of binroll) {
		for(let [key1,value1] of value) {
	    for(let [key2,value2] of value1) {
		   reg_data.push({ 
		                'area_code' : key,
						'year' : key1,
						'age_group_id' : key2,
						'total_households' : value2.total_households});
		};
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt12" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval, d => d.year, d => d.household_type_id);
		for (let [key, value] of binroll) {
		for(let [key1,value1] of value) {
	    for(let [key2,value2] of value1) {
		   reg_data.push({ 
		                'area_code' : key,
						'year' : key1,
						'household_type_id' : key2,
						'total_households' : value2.total_households});
		};
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	case "opt13" :
		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])),  d => d.regval, d => d.age_group_id, d => d.household_type_id);
		for (let [key, value] of binroll) {
		for(let [key1,value1] of value) {
	    for(let [key2,value2] of value1) {
		   reg_data.push({ 
		                'area_code' : key,
						'age_group_id' : key1,
						'household_type_id' : key2,
						'total_households' : value2.total_households});
		};
		};
		};
		reg_data = reg_data.filter(d => d.total_households > 0)
		break;
	default :
	    reg_data = data;
	} //switch
var out_data2 = reg_data.sort(function(a, b){ return d3.ascending(a['regval'], b['regval']); })
			.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
			

//Output table
var out_tab = genHHTab(out_data2,yeardata,"region")

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "hhTab";
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

}) //data

} //genHHReg

//genNAICSCty creares the county Jobs by Sector Table
function genNAICSCty(loc,year_arr) {
	const fmt_comma = d3.format(",");
 
	
	//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };
   
	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")

	 var urlstr = "https://gis.dola.colorado.gov/lookups/jobs?county="+ fips_list + "&year=" + year_list

		
d3.json(urlstr).then(function(data){
     
 var cty_data = [];
data.forEach(i => {
   	cty_data.push({
		  'countyfips' : i.area_code,
		  'countyname' : countyName(i.area_code),
		  'population_year' : i.population_year,
		  'sector_id' : i.sector_id.padStart(5, '0'),
		  'sector_name': i.sector_name,
		  'total_jobs' : parseInt(i.total_jobs)
	})
	})

var cty_data2 = cty_data
        .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
		;


	// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>NAICS Sector Code</th><th>NAICS Sector Name</th><th>Total Jobs</th></tr></thead><tbody>";
	for(i = 0; i < cty_data2.length; i++){
		var el0 = "<td>" + cty_data2[i].countyfips + "</td>"
		var el1 = "<td>" + cty_data2[i].countyname + "</td>"
		var el2 = "<td>" + cty_data2[i].population_year + "</td>"
		var el3 = "<td>"+ cty_data2[i].sector_id + "</td>"
		var el4 = "<td>"+ cty_data2[i].sector_name + "</td>"
		var el5 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].total_jobs,"num") + "</td>"
		
	   var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "naicsTab";
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
 });  //d3.json
} //dataNAICScty

//genNAICSReg creares the county Jobs by Sector Table
function genNAICSReg(region, loc,year_arr) {
	const fmt_comma = d3.format(",");
 
	

	//build urlstr
   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")

	 var urlstr = "https://gis.dola.colorado.gov/lookups/jobs?county="+ fips_list + "&year=" + year_list

		
d3.json(urlstr).then(function(data){
 
 var sector_data = [];
data.forEach(i => {
   	sector_data.push({
		  'sector_id' : i.sector_id.padStart(5, '0'),
		  'sector_name': i.sector_name
	})
	})

//Remove Duplicates sector ids

    keys = ['sector_id'],
    uniq_sector = sector_data.filter(
        (s => o => 
            (k => !s.has(k) && s.add(k))
            (keys.map(k => o[k]).join('|'))
        )
        (new Set)
    );

//Adding region number
var raw_data = joinFUNCT(fips_arr,data,"countyfips","area_code",function(dat,col){
		return{
			'regval' : col.regval,
			'countyfips' : col.countyfips,
			'year' : dat.population_year,
			'sector_id': dat.sector_id.padStart(5, '0'),
			'total_jobs' : parseInt(dat.total_jobs),
		};
	});



    // sum up values by region, year and sector_id
	var columnsToSum = ['total_jobs']

var reg_data = [];

		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year, d => d.sector_id);
		for (let [key, value] of binroll) {
		for (let[key2, value2] of value) {
		for (let[key3, value3] of value2){
		   reg_data.push({ 'regval' : key,
			            'name' : regionName(key), 
						'year' : key2,
						'sector_id' : key3, 
						'total_jobs' : value3.total_jobs});
		};
		};
		};


//Joining Sector Name
var raw_data = joinFUNCT(uniq_sector,reg_data,"sector_id","sector_id",function(dat,col){
		return{
			'regval' : dat.regval,
			'regname' : regionName(dat.regval),
			'year' : dat.year,
			'sector_id': col.sector_id,
			'sector_name' : col.sector_name,
			'total_jobs' : dat.total_jobs
		};
	});


var reg_data2 = raw_data
   		 .sort(function(a, b){ return d3.ascending(a['regval'], b['regval']); })

		;



	// Generate Table
	var out_tab = "<thead><tr><th>Region Name</th><th>Year</th><th>NAICS Sector Code</th><th>NAICS Sector Name</th><th>Total Jobs</th></tr></thead><tbody>";
	for(i = 0; i < reg_data2.length; i++){
		var el1 = "<td>" + reg_data2[i].regname + "</td>"
		var el2 = "<td>" + reg_data2[i].year + "</td>"
		var el3 = "<td>"+ reg_data2[i].sector_id + "</td>"
		var el4 = "<td>"+ reg_data2[i].sector_name + "</td>"
		var el5 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].total_jobs,"num") + "</td>"
		
	   var tmp_row = "<tr>" + el1 + el2 + el3 + el4 + el5 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "naicsTab";
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
 });  //d3.json
} //dataNAICSreg

//Base Industries County dropdown
//popDropdown populaates drop down boxes
function popBaseInd(level,ddid) {

   
   //Counties
var county = [ {'location' : 'Denver-Boulder MSA', 'fips' : '500'}, {'location'  :  'Alamosa County', 'fips' : '003'},
{'location'  :  'Archuleta County', 'fips' : '007'}, {'location'  :  'Baca County', 'fips' : '009'},
{'location'  :  'Bent County', 'fips' : '011'}, {'location'  :  'Chaffee County', 'fips' : '015'},
{'location'  :  'Cheyenne County', 'fips' : '017'}, {'location'  :  'Clear Creek County', 'fips' : '019'},
{'location'  :  'Conejos County', 'fips' : '021'}, {'location'  :  'Costilla County', 'fips' : '023'},
{'location'  :  'Crowley County', 'fips' : '025'}, {'location'  :  'Custer County', 'fips' : '027'},
{'location'  :  'Delta County', 'fips' : '029'}, {'location'  :  'Dolores County', 'fips' : '033'},
{'location'  :  'Eagle County', 'fips' : '037'}, {'location'  :  'Elbert County', 'fips' : '039'},
{'location'  :  'El Paso County', 'fips' : '041'}, {'location'  :  'Fremont County', 'fips' : '043'},
{'location'  :  'Garfield County', 'fips' : '045'}, {'location'  :  'Gilpin County', 'fips' : '047'},
{'location'  :  'Grand County', 'fips' : '049'}, {'location'  :  'Gunnison County', 'fips' : '051'},
{'location'  :  'Hinsdale County', 'fips' : '053'}, {'location'  :  'Huerfano County', 'fips' : '055'},
{'location'  :  'Jackson County', 'fips' : '057'}, {'location'  :  'Kiowa County', 'fips' : '061'},
{'location'  :  'Kit Carson County', 'fips' : '063'}, {'location'  :  'Lake County', 'fips' : '065'},
{'location'  :  'La Plata County', 'fips' : '067'}, {'location'  :  'Larimer County', 'fips' : '069'},
{'location'  :  'Las Animas County', 'fips' : '071'}, {'location'  :  'Lincoln County', 'fips' : '073'},
{'location'  :  'Logan County', 'fips' : '075'}, {'location'  :  'Mesa County', 'fips' : '077'},
{'location'  :  'Mineral County', 'fips' : '079'}, {'location'  :  'Moffat County', 'fips' : '081'},
{'location'  :  'Montezuma County', 'fips' : '083'}, {'location'  :  'Montrose County', 'fips' : '085'},
{'location'  :  'Morgan County', 'fips' : '087'},{'location'  :  'Otero County', 'fips' : '089'},
{'location'  :  'Ouray County', 'fips' : '091'},{'location'  :  'Park County', 'fips' : '093'},
{'location'  :  'Phillips County', 'fips' : '095'}, {'location'  :  'Pitkin County', 'fips' : '097'},
{'location'  :  'Prowers County', 'fips' : '099'}, {'location'  :  'Pueblo County', 'fips' : '101'},
{'location'  :  'Rio Blanco County', 'fips' : '103'}, {'location'  :  'Rio Grande County', 'fips' : '105'},
{'location'  :  'Routt County', 'fips' : '107'}, {'location'  :  'Saguache County', 'fips' : '109'},
{'location'  :  'San Juan County', 'fips' : '111'}, {'location'  :  'San Miguel County', 'fips' : '113'},
{'location'  :  'Sedgwick County', 'fips' : '115'}, {'location'  :  'Summit County', 'fips' : '117'},
{'location'  :  'Teller County', 'fips' : '119'}, {'location'  :  'Washington County', 'fips' : '121'},
{'location'  :  'Weld County', 'fips' : '123'}, {'location'  :  'Yuma County', 'fips' : '125'}];


//regions

var region =  [
				{'optgroup' : 'Geographic Region','location' : 'Central Mountains', 'regnum' : '01'},	
				{'optgroup' : 'Geographic Region','location' : 'Eastern Plains', 'regnum' : '02'},
				{'optgroup' : 'Geographic Region','location' : 'Front Range', 'regnum' : '03'},
				{'optgroup' : 'Geographic Region','location' : 'San Luis Valley', 'regnum' : '04'},
				{'optgroup' : 'Geographic Region','location' : 'Western Slope', 'regnum' : '05'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 1: Northern Eastern Plains', 'regnum' : '06'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 2: Northern Front Range', 'regnum' : '07'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 3: Denver Metropolitan Area', 'regnum' : '08'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 4: Southern Front Range', 'regnum' : '09'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 5: Central Eastern Plains', 'regnum' : '10'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 6: Southern Eastern Plains', 'regnum' : '11'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 7: Pueblo County', 'regnum' : '12'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 8: San Juan Valley', 'regnum' : '13'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 9: Southern Western Slope', 'regnum' : '14'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 10: Central Western Slope', 'regnum' : '15'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 11: Northern Western Slope', 'regnum' : '16'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 12: Northern Mountains', 'regnum' : '17'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 13: Central Mountains', 'regnum' : '18'},
				{'optgroup' : 'Colorado Planning and Management Regions','location' : 'Region 14: Southern Mountains', 'regnum' : '19'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Boulder', 'regnum' : '20'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Colorado Springs', 'regnum' : '21'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Denver-Aurora-Lakewood', 'regnum' : '22'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Fort Collins', 'regnum' : '23'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Grand Junction', 'regnum' : '24'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Greeley', 'regnum' : '25'},
				{'optgroup' : 'Census Metropolitan Statistical Areas', 'location' : 'Pueblo', 'regnum' : '26'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Breckenridge', 'regnum' : '27'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Ca\u00f1on City', 'regnum' : '28'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Craig', 'regnum' : '29'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Durango', 'regnum' : '30'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Edwards', 'regnum' : '31'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Fort Morgan', 'regnum' : '32'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Glenwood Springs', 'regnum' : '33'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Montrose', 'regnum' : '34'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Steamboat Springs', 'regnum' : '35'},
				{'optgroup' : 'Census Micropolitan Statistical Areas', 'location' : 'Sterling', 'regnum' : '36'},
				{'optgroup' : 'Denver Regions','location' : 'Denver PMSA', 'regnum' : '37'},
				{'optgroup' : 'Denver Regions','location' : 'Denver-Boulder Metro Area', 'regnum' : '38'},
				{'optgroup' : 'Denver Regions','location' : 'Denver-Boulder-Greely CMSA', 'regnum' : '39'},
];

//assigning locarr

if(level == 'region') {var locarr = region};
if(level == 'county') {var locarr = county};
i

var sel = document.getElementById(ddid);
sel.innerHTML = "";

if(level == 'region' ) {
	var groups = [... new Set(locarr.map(tag => tag.optgroup))];

	for(i = 0; i < groups.length; i++){
		var groupfilt = locarr.filter(d => (d.optgroup == groups[i]));
	    var grp = document.createElement("optgroup");
		grp.id = "regiongrp";
		grp.label = groups[i];
		for(j = 0; j < groupfilt.length; j++) {
			var optTxt = document.createElement("option");
			optTxt.textContent  = groupfilt[j].location;
			optTxt.value = groupfilt[j].regnum;
			grp.appendChild(optTxt);
		}
		sel.add(grp)
	}
	
    } else {
	 var sel = document.getElementById(ddid);
		for(var i = 0; i < locarr.length; i++) {
			var el = document.createElement("option");
			el.textContent = locarr[i].location;
			el.value = locarr[i].fips;
			sel.appendChild(el);
		}
	}
}; //end of popBaseInd	


//Base industry Labels
function baseIndLabels(incat){
	out_arr = []
	switch(incat){
		 case 'employment' : out_arr.push({'variable' :  'Total Employment', 'row' : 21}); break;
		 case 'agri_emp' : out_arr.push({'variable' :  'Traditional - Agribusiness', 'row' : 2}); break;
		 case 'mining_emp' : out_arr.push({'variable' :  'Traditional - Mining', 'row' : 3}); break;
		 case 'manuf_emp' : out_arr.push({'variable' :  'Traditional - Manufacturing', 'row' : 4}); break;
		 case 'govt_emp' : out_arr.push({'variable' :  'Traditional - Government', 'row' : 5}); break;
		 case 'regl_serv_emp' : out_arr.push({'variable' :  'Regional Center / National Services - All Totals', 'row' : 6}); break;
		 case 'ib_emp' : out_arr.push({'variable' :  'Indirect Basic', 'row' : 20}); break;
		 case 'tourism_emp' : out_arr.push({'variable' :  'Tourism', 'row' : 13}); break;
		 case 'direct_basic_emp' : out_arr.push({'variable' :  'Total Direct Basic', 'row' : 18}); break;
		 case 'commuter_emp' : out_arr.push({'variable' :  'Households - Commuters', 'row' : 14}); break;
		 case 'other_hhd_emp' : out_arr.push({'variable' :  'Households - with Public Assistance Income (excluding retirees)', 'row' : 16}); break;
		 case 'other_inc_emp' : out_arr.push({'variable' :  'Households - with Dividends, Interest, and Rental Income (excluding retirees)', 'row' : 17}); break;
		 case 'retiree_emp' : out_arr.push({'variable' :  'Households - Retirees', 'row' : 15}); break;
		 case 'wrkr_lrs_emp' : out_arr.push({'variable' :  'Local Residential Services (Non Basic)', 'row' : 19}); break;
		 case 'natl_comm_emp' : out_arr.push({'variable' :  'Regional Center / National Services - Communications', 'row' : 8}); break;
		 case 'natl_const_emp' : out_arr.push({'variable' :  'Regional Center / National Services - Construction', 'row' : 7}); break;
		 case 'natl_fire_emp' : out_arr.push({'variable' :  'Regional Center / National Services - Finance, Insurance and Real Estate', 'row' : 11}); break;
		 case 'natl_trade_emp' : out_arr.push({'variable' :  'Regional Center / National Services - Trade and Transportation', 'row' : 9}); break;
		 case 'natl_bus_emp' : out_arr.push({'variable' :  'Regional Center / National Services - Professional and Business Services', 'row' : 10}); break;
		 case 'natl_ed_emp' : out_arr.push({'variable' :  'Regional Center / National Services - Education and Health Services', 'row' : 12}); break;
	}
	return out_arr;
}

//restructure baseind  converts wide dataset  to long
//restructureACS data from wide to long 
function rebaseind(inData, level){

 var newLabel = [];
 var outData = [];
if(level == "county"){
inData.forEach(i => {
	 var agri = +i.agri_emp;
	 var mining = +i.mining_emp;
	 var manuf = +i.manuf_emp;
	 var govt = +i.govt_emp;
	 var basic = +i.direct_basic_emp;
	 var indirect = +i.ib_emp;
	 
	 var total_emp = agri + mining + manuf + govt;
     var basic_emp = basic + indirect;
	 
	outData.push({
		'ctype' : i.ctype,
		'id' : i.id,
		'countyfips' : i.fips,
		'countyname' : i.fips == '500' ? 'Denver-Boulder MSA' : countyName(+i.fips),
		'variable' : "total_all_industries",
		'row'  :  1,
		'category' : "Traditional - All Totals",
		'total_employment' : Math.round(total_emp),
		'total_pct' : (total_emp/basic_emp) * 100
	})
	 
   Object.keys(i).forEach( j => {
		      if(['employment', 'agri_emp', 'mining_emp', 'manuf_emp', 'govt_emp', 'regl_serv_emp', 'ib_emp',
				'tourism_emp', 'direct_basic_emp', 'commuter_emp', 'other_hhd_emp',	'other_inc_emp', 'retiree_emp', 'wrkr_lrs_emp', 'natl_comm_emp',
				'natl_const_emp', 'natl_fire_emp', 'natl_trade_emp', 'natl_bus_emp', 'natl_ed_emp'].includes(j)) { 
				 var jobs_pct  = ['direct_basic_emp', 'ib_emp', 'wrkr_lrs_emp', 'employment'].includes(j) ? 999999999 : (+i[j]/basic_emp) * 100

			newLabel = baseIndLabels(j);
			outData.push({
				'ctype' : i.ctype,
				'id' : i.id,
				'countyfips' : i.fips,
				'countyname' : i.fips == '500' ? 'Denver-Boulder MSA' : countyName(+i.fips),
				'variable' : j,
				'row'  :  newLabel[0].row,
			    'category' : newLabel[0].variable,
				'total_employment' : Math.round(+i[j]),
				'total_pct' : jobs_pct
			})
		}
   }) //J
 
    outData.push({
		'ctype' : i.ctype,
		'id' : i.id,
		'countyfips' : i.fips,
		'countyname' : i.fips == '500' ? 'Denver-Boulder MSA' : countyName(+i.fips),
		'variable' : 'FINAL ROW',
		'row'  :  22,
		'category' : "Ratio : Total/Direct Basic",
		'total_employment' : 999999999,
		'total_pct' : +i.employment/+i.direct_basic_emp
   })
   
 outData.push({
		'ctype' : i.ctype,
		'id' : i.id,
		'countyfips' : i.fips,
		'countyname' : i.fips == '500' ? 'Denver-Boulder MSA' : countyName(+i.fips),
		'variable' : 'VINTAGE',
		'row'  :  23,
		'category' : "Vintage 2021",
		'total_employment' : 999999999,
		'total_pct' : 999999999
	});
	
}) //i
} else {
	inData.forEach(i => {
	 var agri = +i.agri_emp;
	 var mining = +i.mining_emp;
	 var manuf = +i.manuf_emp;
	 var govt = +i.govt_emp;
	 var basic = +i.direct_basic_emp;
	 var indirect = +i.ib_emp;
	 
	 var total_emp = agri + mining + manuf + govt;
     var basic_emp = basic + indirect;
	 
	outData.push({
		'regval' : i.regval,
		'regname' : i.regname,
		'variable' : "total_all_industries",
		'row'  :  1,
		'category' : "Traditional - All Totals",
		'total_employment' : Math.round(total_emp),
		'total_pct' : (total_emp/basic_emp) * 100
	})
	 
   Object.keys(i).forEach( j => {
		      if(['employment', 'agri_emp', 'mining_emp', 'manuf_emp', 'govt_emp', 'regl_serv_emp', 'ib_emp',
				'tourism_emp', 'direct_basic_emp', 'commuter_emp', 'other_hhd_emp',	'other_inc_emp', 'retiree_emp', 'wrkr_lrs_emp', 'natl_comm_emp',
				'natl_const_emp', 'natl_fire_emp', 'natl_trade_emp', 'natl_bus_emp', 'natl_ed_emp'].includes(j)) { 
				 var jobs_pct  = ['direct_basic_emp', 'ib_emp', 'wrkr_lrs_emp', 'employment'].includes(j) ? 999999999 : (+i[j]/basic_emp) * 100

		newLabel = baseIndLabels(j);
		outData.push({
		'regval' : i.regval,
		'regname' : i.regname,
		'variable' : j,
		'row'  :  newLabel[0].row,
		'category' : newLabel[0].variable,
		'total_employment' : Math.round(+i[j]),
		'total_pct' : jobs_pct
			})
		}
   }) //J
 
    outData.push({
		'regval' : i.regval,
		'regname' : i.regname,
		'variable' : 'FINAL ROW',
		'row'  :  22,
		'category' : "Ratio : Total/Direct Basic",
		'total_employment' : 999999999,
		'total_pct' : +i.employment/+i.direct_basic_emp
   })
   
 outData.push({
		'regval' : i.regval,
		'regname' : i.regname,
		'variable' : 'VINTAGE',
		'row'  :  23,
		'category' : "Vintage 2021",
		'total_employment' : 999999999,
		'total_pct' : 999999999
	});
	
}) //i
}

return(outData);
} //rebaseind


//County Base Industries lookup
function genBaseIndCty(loc) {
		//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };
   
	var fips_list  = fips_arr2.join(",")

	 var urlstr = "https://gis.dola.colorado.gov/lookups/base-analysis?county="+ fips_list

		
d3.json(urlstr).then(function(data){

 var cty_data = rebaseind(data)

var cty_data2 = cty_data
        .sort(function(a, b){ return d3.ascending(a['row'], b['row']); })
        .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
		;

	// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Industry Group</th><th>Employment</th><th>Employment % of Basic</th></tr></thead><tbody>";
	for(i = 0; i < cty_data2.length; i++){
		var pctval = cty_data2[i].variable == "FINAL ROW" ? fixNEG(cty_data2[i].total_pct,"dec") : fixNEG(cty_data2[i].total_pct,"pct");
		var sumval = cty_data2[i].variable == "FINAL ROW" ? " " : fixNEG(cty_data2[i].total_employment,"num")
		var el0 = "<td>" + cty_data2[i].countyfips + "</td>"
		var el1 = "<td>" + cty_data2[i].countyname + "</td>"
		var el2 = "<td>" + cty_data2[i].category + "</td>"
		var el3 = "<td style='text-align: right'>" + sumval + "</td>"
		var el4 = "<td style='text-align: right'>" + pctval + "</td>"
	   var tmp_row = "<tr>" + el0 + el1 + el2 + el3 +  el4 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "baseindTab";
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
 });  //d3.json
} //base ind cty

//Regional Base Industries lookup
function genBaseIndReg(region, loc) {
		//build urlstr
   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
   
	var fips_list  = fips_arr2.join(",")
	 var urlstr = "https://gis.dola.colorado.gov/lookups/base-analysis?county="+ fips_list

		
d3.json(urlstr).then(function(data){

	//Adding region number
var raw_data = [];
var k = 0
for(i = 0 ; i < yeararr.length; i++){
for(j = 0; j < fips_arr.length; j++){
  raw_data.push({
   ...fips_arr[j], 
   ...data[k]
  });
 k++
}
}
    // sum up values by region, year and sector_id
	var columnsToSum = ['employment', 'agri_emp', 'mining_emp', 'manuf_emp', 'govt_emp', 'regl_serv_emp',
	                    'ib_emp', 'tourism_emp', 'direct_basic_emp','commuter_emp', 'other_hhd_emp',
						'other_inc_emp', 'retiree_emp', 'wrkr_lrs_emp', 'natl_comm_emp', 'natl_const_emp',
						'natl_fire_emp', 'natl_trade_emp', 'natl_bus_emp', 'natl_ed_emp']

var reg_data = [];

		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval);
		for (let [key, value] of binroll) {
		   reg_data.push({ 'regval' : key,
			'regname' : regionName(key), 
			'employment' : value.employment,
			'agri_emp' : value.agri_emp,
			'mining_emp' : value.mining_emp,
			'manuf_emp' : value.manuf_emp,
			'govt_emp' : value.govt_emp,
			'regl_serv_emp' : value.regl_serv_emp,
			'ib_emp' : value.ib_emp,
			'tourism_emp' : value.tourism_emp,
			'direct_basic_emp' : value.direct_basic_emp,
			'commuter_emp' : value.commuter_emp,
			'other_hhd_emp' : value.other_hhd_emp,
			'other_inc_emp' : value.other_inc_emp,
			'retiree_emp' : value.retiree_emp,
			'wrkr_lrs_emp' : value.wrkr_lrs_emp,
			'natl_comm_emp' : value.natl_comm_emp,
			'natl_const_emp' : value.natl_const_emp,
			'natl_fire_emp' : value.natl_fire_emp,
			'natl_trade_emp' : value.natl_trade_emp,
			'natl_bus_emp' : value.natl_bus_emp,
			'natl_ed_emp' : value.natl_ed_emp})
		};

 var reg_data_long = rebaseind(reg_data, "region")

var reg_data2 = reg_data_long
        .sort(function(a, b){ return d3.ascending(a['row'], b['row']); })
        .sort(function(a, b){ return d3.ascending(a['regval'], b['regval']); })
		;

	// Generate Table
	var out_tab = "<thead><tr><th>Region Number</th><th>Region Name</th><th>Industry Group</th><th>Employment</th><th>Employment % of Basic</th></tr></thead><tbody>";
	for(i = 0; i < reg_data2.length; i++){
		var pctval = reg_data2[i].variable == "FINAL ROW" ? fixNEG(reg_data2[i].total_pct,"dec") : fixNEG(reg_data2[i].total_pct,"pct");
		var sumval = reg_data2[i].variable == "FINAL ROW" ? " " : fixNEG(reg_data2[i].total_employment,"num")
		var el0 = "<td>" + reg_data2[i].regval + "</td>"
		var el1 = "<td>" + reg_data2[i].regname + "</td>"
		var el2 = "<td>" + reg_data2[i].category + "</td>"
		var el3 = "<td style='text-align: right'>" + sumval + "</td>"
		var el4 = "<td style='text-align: right'>" + pctval + "</td>"
	   var tmp_row = "<tr>" + el0 + el1 + el2 + el3 +  el4 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "baseindTab";
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
 });  //d3.json
} //base ind region

//County Jobs Forecast lookup
function genJobsForeCty(loc, yeararr) {
	//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };
   
   var year_arr = [];
   	for(j = 0; j < yeararr.length; j++){
		year_arr.push(yeararr[j]);
     };
	var fips_list  = fips_arr2.join(",")
	var year_list  = year_arr.join(",")
	 var urlstr = "https://gis.dola.colorado.gov/lookups/jobs-forecast?county="+ fips_list + "&year=" + year_list

d3.json(urlstr).then(function(data){

var cty_data2 = data
        .sort(function(a, b){ return d3.ascending(a['population_year'], b['population_year']); })
        .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
		;

	// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Total Jobs</th><th>Data Type</th></tr></thead><tbody>";
	for(i = 0; i < cty_data2.length; i++){
		var el0 = "<td>" + cty_data2[i].countyfips + "</td>"
		var el1 = "<td>" + countyName(cty_data2[i].countyfips) + "</td>"
		var el2 = "<td>" + cty_data2[i].population_year + "</td>"
		var el3 = "<td style='text-align: right'>" + fixNEG(cty_data2[i].totaljobs,"num") + "</td>"
		var el4 = "<td>" + cty_data2[i].datatype + "</td>"
	   var tmp_row = "<tr>" + el0 + el1 + el2 + el3 +  el4 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "jobsforeTab";
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
 });  //d3.json
} //jobs forecast cty

//Regional Jobs Forecast lookup
function genJobsForeReg(region, loc, yeararr) {
	//build urlstr

   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
   var year_arr = [];
   	for(j = 0; j < yeararr.length; j++){
		year_arr.push(yeararr[j]);
     };
	var fips_list  = fips_arr2.join(",")
	var year_list  = year_arr.join(",")
	 var urlstr = "https://gis.dola.colorado.gov/lookups/jobs-forecast?county="+ fips_list + "&year=" + year_list

d3.json(urlstr).then(function(data){

//Adding region number
var raw_data = [];
var k = 0

for(i = 0; i < yeararr.length; i++){
for(j = 0; j < fips_arr.length; j++){
  raw_data.push({
   ...fips_arr[j], 
   ...data[k]
  });
 k++
}
}

    // sum up values by region, year and sector_id
	var columnsToSum = ['totaljobs']

var reg_data = [];

		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.datatype, d => d.population_year);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		for (let [key2, value2] of value1){
		   reg_data.push({ 'regval' : key,
			'regname' : regionName(key), 
			'datatype' : key1,
			'population_year' : key2,
			'totaljobs' : value2.totaljobs})
		};
		};
		};

var reg_data2 = reg_data
        .sort(function(a, b){ return d3.ascending(a['population_year'], b['population_year']); })
        .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
		;

	// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Total Jobs</th><th>Data Type</th></tr></thead><tbody>";
	for(i = 0; i < reg_data2.length; i++){
		var el0 = "<td>" + reg_data2[i].regval + "</td>"
		var el1 = "<td>" + reg_data2[i].regname + "</td>"
		var el2 = "<td>" + reg_data2[i].population_year + "</td>"
		var el3 = "<td style='text-align: right'>" + fixNEG(reg_data2[i].totaljobs,"num") + "</td>"
		var el4 = "<td>" + reg_data2[i].datatype + "</td>"
	   var tmp_row = "<tr>" + el0 + el1 + el2 + el3 +  el4 + "</tr>";
	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "jobsforeTab";
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
 });  //d3.json
} //jobs forecast reg


//County Laborforce Participation lookup
function genLFPCty(loc, yeararr, agearr, group_val, sex_val) {

	//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };
   
   var year_arr = [];
   	for(j = 0; j < yeararr.length; j++){
		year_arr.push(yeararr[j]);
     };
	 
   var age_arr = [];
   	for(j = 0; j < agearr.length; j++){
		age_arr.push(agearr[j]);
     };
	var fips_list  = fips_arr2.join(",")
	var year_list  = year_arr.join(",")
	var age_list = age_arr.join(",")

if(sex_val == "S"){
	 var urlstr = "https://gis.dola.colorado.gov/lookups/labor-force?year="+ year_list + "&county=" + fips_list + "&age=" + age_list + "&group=" + group_val
} else {
	 var urlstr = "https://gis.dola.colorado.gov/lookups/labor-force?year="+ year_list + "&county=" + fips_list + "&age=" + age_list + "&gender=" + sex_val +"&group=" + group_val
}

d3.json(urlstr).then(function(data){
	var data_keys = Object.keys(data[0])
	var cty_data = [];

	data.forEach(i => {
	var tmp_rec = [];

	if(data_keys.includes("area_code")){
		tmp_rec["countyfips"] = i.area_code;
	}

	if(data_keys.includes("population_year")){
		tmp_rec["year"] = i.population_year;
	}
	if(data_keys.includes("age_group")){
		tmp_rec["age_group"] = i.age_group;
	}
	if(data_keys.includes("gender")) {
		tmp_rec["gender"] = i.gender;
	}
	tmp_rec["lfp"] = +i.laborforce;
	tmp_rec["labor_force"] = +i.cni_pop_16pl;
	tmp_rec["participation_rate"] = +i.participationrate * 100;
	cty_data.push(tmp_rec)
	})

//Generate table

var tab_header = Object.keys(cty_data[0]);

var out_tab = "<thead><tr>"
    tab_header.forEach( i => {
		switch(i){
			case 'countyfips' :
			   out_tab = out_tab + "<th>County FIPS</th>"
			   out_tab = out_tab + "<th>County Name</th>"
			   break;
			case 'year' :
			   out_tab = out_tab + "<th>Year</th>"
			   break;
			case 'age_group' :
			   out_tab =  out_tab + "<th>Age Group</th>"
			   break
			case 'gender' :
			   out_tab = out_tab + "<th>Sex</th>"
			   break
			case 'labor_force' :
			   out_tab = out_tab + "<th>Universe</th>"
			   break
			case 'lfp' :
			   out_tab = out_tab + "<th>Labor Force</th>"
			   break
			case 'participation_rate' :
			   out_tab = out_tab + "<th>Participation Rate</th>"
			   break
		}
	}); //tab_header
out_tab = out_tab + "</tr></thead><tbody>"

for(i = 0; i < cty_data.length; i++){
	out_tab = out_tab + "<tr>"
	    tab_header.forEach( j => {
		switch(j){
			case 'countyfips' :
			   out_tab = out_tab + "<td>" + cty_data[i][j] + "</td>"
			   out_tab = out_tab + "<td>" + countyName(cty_data[i][j]) + "</td>"
			   break;
			case 'year' :
			   out_tab = out_tab + "<td>" + cty_data[i][j] + "</td>"
			   break;
			case 'age_group' :
			   out_tab =  out_tab + "<td>" + cty_data[i][j] + "</td>"
			   break
			case 'gender' :
			   out_tab = out_tab + "<td>" + cty_data[i][j] + "</td>"
			   break
			case 'labor_force' :
			   out_tab = out_tab + "<td style='text-align: right'>" + fixNEG(Math.round(cty_data[i][j]),"num") + "</td>"
			   break;
			case 'lfp' :
			   out_tab = out_tab + "<td style='text-align: right'>" + fixNEG(Math.round(cty_data[i][j]),"num") + "</td>"
			   break
			case 'participation_rate' :
			   out_tab = out_tab + "<td style='text-align: right'>" + fixNEG(cty_data[i][j],"dec") + "</td>"
			   break
		}
	}); //tab_header
	out_tab = out_tab + "</tr>"
}
out_tab = out_tab + "</tbody>"


//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "lfpTab";
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
 });  //d3.json
} //LFP cty

//Region Laborforce Participation lookup
function genLFPReg(region,loc, yeararr, agearr, group_val, sex_val) {

	//build urlstr
   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
   var year_arr = [];
   	for(j = 0; j < yeararr.length; j++){
		year_arr.push(yeararr[j]);
     };
	
  
   var age_arr = [];
   	for(j = 0; j < agearr.length; j++){
		age_arr.push(agearr[j]);
     };
	var fips_list  = fips_arr2.join(",")
	var year_list  = year_arr.join(",")
	var age_list = age_arr.join(",")

if(sex_val == "S"){
	 var urlstr = "https://gis.dola.colorado.gov/lookups/labor-force?year="+ year_list + "&county=" + fips_list + "&age=" + age_list + "&group=" + group_val
} else {
	 var urlstr = "https://gis.dola.colorado.gov/lookups/labor-force?year="+ year_list + "&county=" + fips_list + "&age=" + age_list + "&gender=" + sex_val +"&group=" + group_val
}


d3.json(urlstr).then(function(data){

	//Adding region number
if(Object.keys(data[0]).includes("area_code")){
 var raw_data = joinFUNCT(fips_arr,data,"countyfips","area_code",function(dat,col){
		return{
			regval : col.regval,
			countyfips : col.countyfips,
			year : dat.population_year,
			age_group : dat.age_group,
			gender : dat.gender,
			laborforce: dat.laborforce,
			cni_pop_16pl : dat.cni_pop_16pl
		};
	});


// sum up values by region, year 
var columnsToSum = ['laborforce', 'cni_pop_16pl']

var reg_data = [];

		var binroll =  d3.rollup(raw_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.age_group, d => d.year, d => d.gender);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		for (let [key2, value2] of value1){
		for (let [key3, value3] of value2) {
		   reg_data.push({ 'regval' : key,
			'age_group' : key1,
			'year' : key2,
			'gender' : key3,
			'lfp' : value3.laborforce,
			'laborforce' : value3.cni_pop_16pl,
			'participation_rate' : (value3.laborforce/value3.cni_pop_16pl) * 100
		   })
		};
		};
		};
		};
}  else {
	var reg_data = data;
}

//Generate table

var tab_header = Object.keys(reg_data[0]);

var out_tab = "<thead><tr>"
    tab_header.forEach( i => {
		switch(i){
			case 'regval' :
			   out_tab = out_tab + "<th>Region Number</th>"
			   out_tab = out_tab + "<th>Region Name</th>"
			   break;
			case 'year' :
			 if(reg_data[0].year !== undefined){ 
			   out_tab = out_tab + "<th>Year</th>"
			 }
			   break;
			case 'age_group' :
			if(reg_data[0].age_group !== undefined){ 
			   out_tab =  out_tab + "<th>Age Group</th>"
			}
			   break
			case 'gender' :
			   if(reg_data[0].gender !== undefined){ 
			   out_tab = out_tab + "<th>Sex</th>"
			   }
			   break
			case 'laborforce' :
			   out_tab = out_tab + "<th>Universe</th>"
			   break
			case 'lfp' :
			case 'cni_pop_16pl':
			   out_tab = out_tab + "<th>Labor Force</th>"
			   break
			case 'participation_rate' :
			   out_tab = out_tab + "<th>Participation Rate</th>"
			   break
		}
	}); //tab_header
out_tab = out_tab + "</tr></thead><tbody>"

for(i = 0; i < reg_data.length; i++){
	out_tab = out_tab + "<tr>"
	    tab_header.forEach( j => {
		switch(j){
			case 'regval' :
			   out_tab = out_tab + "<td>" + reg_data[i][j] + "</td>"
			   out_tab = out_tab + "<td>" + regionName(reg_data[i][j]) + "</td>"
			   break;
			case 'year' :
			if(reg_data[i][j] !== undefined){
			   out_tab = out_tab + "<td>" + reg_data[i][j] + "</td>"
			}
			   break;
			case 'age_group' :
			if(reg_data[i][j] !== undefined){
			   out_tab =  out_tab + "<td>" + reg_data[i][j] + "</td>"
			}
			   break
			case 'gender' :
			   if(reg_data[i][j] !== undefined){
			   out_tab = out_tab + "<td>" + reg_data[i][j] + "</td>"
			   }
			   break
			case 'laborforce' :
			   out_tab = out_tab + "<td style='text-align: right'>" + fixNEG(Math.round(reg_data[i][j]),"num") + "</td>"
			   break;
			case 'lfp' :
			case 'cni_pop_16pl' :
			   out_tab = out_tab + "<td style='text-align: right'>" + fixNEG(Math.round(reg_data[i][j]),"num") + "</td>"
			   break
			case 'participation_rate' :
			   out_tab = out_tab + "<td style='text-align: right'>" + fixNEG(reg_data[i][j],"dec") + "</td>"
			   break
		}
	}); //tab_header
	out_tab = out_tab + "</tr>"
}
out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "lfpTab";
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
 });  //d3.json
} //LFP region

//Single Year of Age
//genAgeGroup builds list items for SYA functions
function genAgeGroup(group,type){
	var outcell = document.getElementById('ageselect')
	outcell.innerHTML = "";
	var tabdiv = document.createElement('div');
	var tabtxt = document.createElement('p');
	tabtxt.className = 'entry_text';
	if(group == "custom"){
		tabtxt.innerHTML = '<b>Designate up to 5 intervals between 0 and 100:</b><br>';
		var outitem = document.createElement("table");
		for(i = 0; i < 5; i++){
			var tblrow = document.createElement("tr");
			var cella = document.createElement("td")
			var labela = document.createElement("label");
			labela.htmlFor = "agestart" + i;
			labela.innerHTML = "From: ";
			var inputa = document.createElement("input");
			inputa.type = "text";
			inputa.id = "agestart" + i;
			inputa.name = "agestart" + i;
			inputa.setAttribute("size","5");
			cella.appendChild(labela)
			cella.appendChild(inputa);
			
			var cellb = document.createElement("td")
			var labelb = document.createElement("label");
			labelb.htmlFor = "ageend" + i;
			labelb.innerHTML = "To: ";
			var inputb = document.createElement("input");
			inputb.type = "text";
			inputb.id = "ageend" + i;
			inputb.name = "ageend" + i;
			inputb.setAttribute("size","5");
			cellb.appendChild(labelb)
			cellb.appendChild(inputb);
		    
			tblrow.appendChild(cella)
			tblrow.appendChild(cellb)
			outitem.appendChild(tblrow)
		}
	tabdiv.appendChild(tabtxt)
	tabdiv.appendChild(outitem)
	}
	if(group == "single"){
		tabtxt.innerHTML = '<b>Select one or more ages:</b><br>';
		var outdiv = document.createElement("div")
		var br = document.createElement("br");
		var outitem  = document.createElement("select");

		outitem.id = "agesel";
		outitem.setAttribute('size','6')
		outitem.multiple = true;
		for(var i = 0; i <= 100; i++) {
			var el = document.createElement("option");
			el.textContent = i
			el.value = i;
			outitem.appendChild(el);
		}
	if(type == "county"){
		var grparr = [{'id' : 'NoGrp', 'txt' : 'No Grouping', 'optval' : 'opt0'},
		{'id' : 'yrGrp', 'txt' : 'Group by Year', 'optval' : 'opt1'},
		{'id' : 'ctyGrp', 'txt' : 'Group by County and Year', 'optval' : 'opt2'},
		{'id' : 'ageGrp', 'txt' : 'Group by Age and Year', 'optval' : 'opt3'}]
     } else {
		var grparr = [{'id' : 'NoGrp', 'txt' : 'No Grouping', 'optval' : 'opt0'},
		{'id' : 'yrGrp', 'txt' : 'Group by Year', 'optval' : 'opt1'},
		{'id' : 'ctyGrp', 'txt' : 'Group by Region and Year', 'optval' : 'opt2'},
		{'id' : 'ageGrp', 'txt' : 'Group by Age and Year', 'optval' : 'opt3'}]
	 }
	for(i = 0; i < grparr.length; i++){
		var radioInput = document.createElement('input');
		var radioLabel = document.createElement('label')
		radioInput.type = "radio";
		radioInput.id = grparr[i].id;
		radioInput.name = "age_summary";
		radioInput.value = grparr[i].optval;
		radioLabel.htmlFor = grparr[i].id;
		radioLabel.innerHTML = grparr[i].txt + "<br>"

		outdiv.appendChild(radioInput)
		outdiv.appendChild(radioLabel)
	}
	tabdiv.appendChild(tabtxt);
	tabdiv.appendChild(outitem)
	tabdiv.appendChild(outdiv)
	}

if(group == "custom" || group == "single"){
		outcell.appendChild(tabdiv)
		if(group == "single") {
		  nogrp = document.getElementById('NoGrp');
		  nogrp.checked = true;
		}
}  else {
		outcell.innerHTML = "";
}
	} //genAgeGroup

//customSYA codes custom age range value based on age_arr
function customSYA(dataval, dataarr) {
var age_str = "";
   for(i = 0; i < dataarr.length;i++){
	   if(+dataval >= dataarr[i].age_start && +dataval <= dataarr[i].age_end){
		   age_str = dataarr[i].age_str;
		   break;
	   }
   }
	return(age_str)
}

//sumSYA summarizes data based on agespec and group value
function sumSYA(in_data,spec,grp, type){
	var out_data = [];
	var columnsToSum = ["male", "female","total"]
	switch(spec){
	case "custom" :
	if(type == "county"){
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.countyfips, d => d.year, d => d.age);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		for (let [key2, value2] of value1){
		   out_data.push({ 'countyfips' : key,
			'countyname' : countyName(key),
			'year' : key1,
			'age' : key2,
			'male' : value2.male,
			'female' : value2.female,
			'total' : value2.total
		   })
		};
		};
		};
		} else {
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year, d => d.age);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		for (let [key2, value2] of value1){
		   out_data.push({ 'regval' : key,
			'regionname' : regionName(key),
			'year' : key1,
			'age' : key2,
			'male' : value2.male,
			'female' : value2.female,
			'total' : value2.total
		   })
		};
		};
		};
		} //type
		break
	case "single" :
		switch(grp) {
		case "opt0" :
		if(type == "county"){
		  out_data = in_data;
		} else {
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year, d => d.age);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		for (let [key2, value2] of value1){
		   out_data.push({ 'regval' : key,
			'regionname' : regionName(key),
			'year' : key1,
			'age' : key2,
			'male' : value2.male,
			'female' : value2.female,
			'total' : value2.total
		   })
		};
		};
		};
		} //type
		  break;
		case "opt1" :
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
		for (let [key, value] of binroll) {
			out_data.push({ 'year' : key,
			'male' : value.male,
			'female' : value.female,
			'total' : value.total
		   })
		};
		break;
		case "opt2" :
		if(type == "county"){
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.countyfips, d => d.year);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		   out_data.push({ 'countyfips' : key,
			'countyname' : countyName(key),
			'year' : key1,
			'male' : value1.male,
			'female' : value1.female,
			'total' : value1.total
		   })
		};
		};
		} else {
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		   out_data.push({ 'regval' : key,
			'regionname' : regionName(key),
			'year' : key1,
			'male' : value1.male,
			'female' : value1.female,
			'total' : value1.total
		   })
		};
		};
		}
		break;
		case "opt3" :
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.age);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		   out_data.push({ 'year' : key,
		    'age' : key1,
			'male' : value1.male,
			'female' : value1.female,
			'total' : value1.total
		   })
		};
		};
		break;
		}
	break;
	default : //Only for regions
		var binroll =  d3.rollup(in_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.regval, d => d.year, d => d.age);
		for (let [key, value] of binroll) {
		for (let [key1, value1] of value){
		for (let [key2, value2] of value1){
		   out_data.push({ 'regval' : key,
			'regionname' : regionName(key),
			'year' : key1,
			'age' : key2,
			'male' : value2.male,
			'female' : value2.female,
			'total' : value2.total
		   })
		};
		};
		};
	} //spec switch

	return(out_data)
} //sumSYA

//genSYACty  County SYA function
function genSYACty(loc,year_arr,group,agespec, age_arr,yeardata) {

	//build urlstr
   var fips_arr2 = [];
	for(j = 0; j < loc.length; j++){
		fips_arr2.push(parseInt(loc[j]));
     };

	//List of ages
    var age_arr2 = [];
    switch(agespec){
	case "custom" :
		var minage = Math.min(...age_arr)
		var maxage = Math.max(...age_arr)
	    for(i = minage; i <= maxage; i++){
			age_arr2.push(i)
		}
		age_range = []
		for (var i = 0; i < age_arr.length; i += 2) {
			age_range.push({'age_start' : age_arr[i], 'age_end' : age_arr[i+1], "age_str" : age_arr[i] + " to " +age_arr[i+1]})
		}
		break;
	case "single" :
	   age_arr2 = age_arr;
	   break;
	}

	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")
	var age_list = age_arr2.join(",")
	
	if(agespec == "custom" || agespec == "single") {
	     var urlstr = "https://gis.dola.colorado.gov/lookups/sya?age=" + age_list + "&county=" + fips_list + "&year=" + year_list + "&choice=single"
	} else {
	    var urlstr = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + year_list + "&choice="+agespec
	}

d3.json(urlstr).then(function(data){

     var raw_data = []
	 data.forEach(i => {
		 raw_data.push({"countyfips" : i.countyfips,
						"countyname" : countyName(i.countyfips),
						"year" : i.year,
						"age" : agespec == "custom" ? customSYA(i.age,age_range) : i.age,
						"male" : +i.malepopulation,
						"female" : +i.femalepopulation,
						"total" : +i.totalpopulation,
						"datatype" : i.datatype
		 })
	 })
	
	 if(agespec == "custom") {
		 raw_data = raw_data.filter(d => d.age != "")
	 }
	
	if(agespec == "custom" || agespec == "single") {
		var tab_data = sumSYA(raw_data,agespec,group,"county")
	} else {
		var tab_data = raw_data;
	}

	// Generate Table
	if(agespec == "single"){
	  switch(group){
		case "opt0" :
			var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Age</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
			break;
		case "opt1":
			 var out_tab = "<thead><tr><th>Year</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
             break;
		case "opt2" :
			var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
			break;
		case "opt3" :
			var out_tab = "<thead><tr>><th>Year</th><th>Age</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
			break;
	  }
	} else {
	 var out_tab = "<thead><tr><th>County FIPS</th><th>County Name</th><th>Year</th><th>Age</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
	}

	out_tab = out_tab + "<tbody>"

	for(i = 0; i < tab_data.length; i++){
		//Selecting value of data type

		var filtData = yeardata.filter(b => tab_data[i].year == b.year);
		
	if(agespec == "single"){
	  switch(group){
		case "opt0" :
			var el0 = "<td>" + tab_data[i].countyfips + "</td>"
			var el1 = "<td>" + tab_data[i].countyname + "</td>"
			var el2 = "<td>" + tab_data[i].year + "</td>"
			var el3 = "<td>" + tab_data[i].age + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el5 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el6 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el7 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + el7  + "</tr>";
			break;
		case "opt1":
			var el0 = "<td>" + tab_data[i].year + "</td>"
			var el1 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el2 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el3 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el4 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + "</tr>";
			break;
		case "opt2" :
			var el0 = "<td>" + tab_data[i].countyfips + "</td>"
			var el1 = "<td>" + tab_data[i].countyname + "</td>"
			var el2 = "<td>" + tab_data[i].year + "</td>"
			var el3 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el5 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el6 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + "</tr>";
			break;
		case "opt3" :
			var el0 = "<td>" + tab_data[i].year + "</td>"
			var el1 = "<td>" + tab_data[i].age + "</td>"
			var el2 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el3 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el5 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + "</tr>";
			break;
	  }
	} else {
			var el0 = "<td>" + tab_data[i].countyfips + "</td>"
			var el1 = "<td>" + tab_data[i].countyname + "</td>"
			var el2 = "<td>" + tab_data[i].year + "</td>"
			var el3 = "<td>" + tab_data[i].age + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el5 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el6 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el7 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + el7  + "</tr>";
	}

	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "syaTab";
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

}) //data

} //genSYACty

//genSYAReg Region SYA function
function genSYAReg(region,loc,year_arr,group,agespec, age_arr,yeardata) {

	//build urlstr
   var fips_arr = [];
   var fips_arr2 = [];
   for(i = 0; i < loc.length; i++){
	for(j = 0; j < loc[i].length; j++){
		var regval = parseInt(region[i]);
		var countyfips = parseInt(loc[i][j])
		fips_arr.push({ countyfips, regval });
		fips_arr2.push(countyfips);
     };
   };
   
	//List of ages
    var age_arr2 = [];
    switch(agespec){
	case "custom" :
		var minage = Math.min(...age_arr)
		var maxage = Math.max(...age_arr)
	    for(i = minage; i <= maxage; i++){
			age_arr2.push(i)
		}
		age_range = []
		for (var i = 0; i < age_arr.length; i += 2) {
			age_range.push({'age_start' : age_arr[i], 'age_end' : age_arr[i+1], "age_str" : age_arr[i] + " to " +age_arr[i+1]})
		}
		break;
	case "single" :
	   age_arr2 = age_arr;
	   break;
	}

	var fips_list  = fips_arr2.join(",")
	var year_list = year_arr.join(",")
	var age_list = age_arr2.join(",")
	
	if(agespec == "custom" || agespec == "single") {
	     var urlstr = "https://gis.dola.colorado.gov/lookups/sya?age=" + age_list + "&county=" + fips_list + "&year=" + year_list + "&choice=single"
	} else {
	    var urlstr = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + year_list + "&choice="+agespec
	}

d3.json(urlstr).then(function(data){
	

     var raw_data = []
	  var raw_data = joinFUNCT(fips_arr,data,"countyfips","countyfips",function(dat,col){
		return{
			"regval" : col.regval,
			"countyfips" : col.countyfips,
			"year" : dat.year,
			"age" : agespec == "custom" ? customSYA(dat.age,age_range) : dat.age,
			"male" : +dat.malepopulation,
			"female" : +dat.femalepopulation,
			"total" : +dat.totalpopulation,
			"datatype" : dat.datatype
		};
	});

	 if(agespec == "custom") {
		 raw_data = raw_data.filter(d => d.age != "")
	 }
	
		var tab_data = sumSYA(raw_data,agespec,group,"region")
	

	// Generate Table
	if(agespec == "single"){
	  switch(group){
		case "opt0" :
			var out_tab = "<thead><tr><th>Region Number</th><th>Region Name</th><th>Year</th><th>Age</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
			break;
		case "opt1":
			 var out_tab = "<thead><tr><th>Year</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
             break;
		case "opt2" :
			var out_tab = "<thead><tr><th>Region Number</th><th>Region Name</th><th>Year</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
			break;
		case "opt3" :
			var out_tab = "<thead><tr>><th>Year</th><th>Age</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
			break;
	  }
	} else {
	 var out_tab = "<thead><tr><th>Region Number</th><th>Region Name</th><th>Year</th><th>Age</th><th>Male Population</th><th>Female Population</th><th>Total Population</th><th>Data Type</th></tr></thead>";
	}

	out_tab = out_tab + "<tbody>"

	for(i = 0; i < tab_data.length; i++){
		//Selecting value of data type

		var filtData = yeardata.filter(b => tab_data[i].year == b.year);
		
	if(agespec == "single"){
	  switch(group){
		case "opt0" :
			var el0 = "<td>" + tab_data[i].regval + "</td>"
			var el1 = "<td>" + tab_data[i].regionname + "</td>"
			var el2 = "<td>" + tab_data[i].year + "</td>"
			var el3 = "<td>" + tab_data[i].age + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el5 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el6 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el7 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + el7  + "</tr>";
			break;
		case "opt1":
			var el0 = "<td>" + tab_data[i].year + "</td>"
			var el1 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el2 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el3 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el4 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + "</tr>";
			break;
		case "opt2" :
			var el0 = "<td>" + tab_data[i].regval + "</td>"
			var el1 = "<td>" + tab_data[i].regionname + "</td>"
			var el2 = "<td>" + tab_data[i].year + "</td>"
			var el3 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el5 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el6 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + "</tr>";
			break;
		case "opt3" :
			var el0 = "<td>" + tab_data[i].year + "</td>"
			var el1 = "<td>" + tab_data[i].age + "</td>"
			var el2 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el3 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el5 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + "</tr>";
			break;
	  }
	} else {
			var el0 = "<td>" + tab_data[i].regval + "</td>"
			var el1 = "<td>" + tab_data[i].regionname + "</td>"
			var el2 = "<td>" + tab_data[i].year + "</td>"
			var el3 = "<td>" + tab_data[i].age + "</td>"
			var el4 = "<td style='text-align: right'>" + fixNEG(tab_data[i].male,"num") + "</td>"
			var el5 = "<td style='text-align: right'>" + fixNEG(tab_data[i].female,"num") + "</td>"
			var el6 = "<td style='text-align: right'>" + fixNEG(tab_data[i].total,"num") + "</td>"
			var el7 = "<td>" + filtData[0].datatype + "</td>"
			var tmp_row = "<tr>" + el0 + el1 + el2 + el3 + el4 + el5 + el6 + el7  + "</tr>";
	}

	   out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "syaTab";
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

}) //data

} //genSYAReg

//genHistoricalCensus outputs table for County and Municipal Population Timeseries
function genHistoricalCensus(ctyval,munival,yrval) {
//Creating url String

var yrstr = yrval.join(",")

var urlstr = "https://gis.dola.colorado.gov/lookups/historicalcensus?"

// A promise for County call
// A promise for muni call

var ctyarr = []
var muniarr = []


var cty_url = "";
var muni_url = "";

//County
if(ctyval.length > 0){
  ctyval.forEach(i => {
	  var ctyNM = countyName(parseInt(i))
	  ctyNM = ctyNM.replace(" County","")
	  ctyarr.push(ctyNM + "_C");
  })
}


//muni
if(munival.length > 0){
   munival.forEach(i => {
	   var muniNM = muniName(parseInt(i)) + "_M"
		muniarr.push(muniNM);
  })
}  
debugger;
var geostr = "geo="
if(ctyarr.length > 0){
	var ctystr = ctyarr.join(",");
	geostr = geostr + ctystr
}
if(muniarr.length > 0){
	var munistr = muniarr.join(",");
	geostr = geostr + ctystr + "," + munistr
}

var censStr = urlstr + geostr + "&year=" + yrstr

debugger
console.log(censStr)

d3.json(censStr).then(function(data){

	var out_data = [];
	for(i = 0; i < data.length; i++){
			out_data.push({
				"countyfips" : data[i].area_type == "C" ? ctyNum(data[i].area_name + " County") : "",
				"placefips" : data[i].area_type == "M" ? muniNum(data[i].area_name) : "",
				"geoname" : data[i].area_type == "C" ? data[i].area_name + " County" : data[i].area_name,
				"year" : data[i].population_year,
				"totalpopulation" :  parseInt(data[i].total_population)
		})
	}

var sort_data = out_data.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
  .sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); })
  .sort(function(a, b){ return d3.ascending(a['placefips'], b['placefips']); });
  
// Generate Table
	var out_tab = "<thead><tr><th>County FIPS</th><th>Place FIPS</th><th>Name</th><th>Year</th><th>Total Population</th></tr></thead>><tbody>";
	for(i = 0; i < sort_data.length; i++){
       var tmp_row  = "<tr><td>" + sort_data[i]["countyfips"] + "</td>";
	       tmp_row = tmp_row + "<td>" + sort_data[i]["placefips"] + "</td>";
	       tmp_row = tmp_row + "<td>" + sort_data[i]["geoname"] + "</td>";
		   tmp_row = tmp_row + "<td>" + sort_data[i]["year"] + "</td>";
    	   tmp_row = tmp_row + "<td style='text-align: right'>" + fixNEG(sort_data[i]["totalpopulation"],"num") + "</td>";
	       tmp_row = tmp_row + "</tr>";
	       out_tab = out_tab + tmp_row;
	}
	out_tab = out_tab + "</tbody>"

//Output table
	var tabDivOut = document.getElementById("tbl_output");
	var tabName = "censTab";
//Clear div
tabDivOut.innerHTML = "";

var tabObj = "#" + tabName;
$(tabDivOut).append("<table id="+ tabName + " class='DTTable' width='90%'></table>");
$(tabObj).append(out_tab); //this has to be a html table


$(tabObj).DataTable({
	"ordering": false,
  dom: 'Bfrtip',
        buttons: [
            'csv'
        ]
 });	
	
}) //Data
} //genHistoricalCensus