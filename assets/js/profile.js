//Website functions for State Demography Office Demographic Profile
//A. Bickford 9/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc
// profilesql syntax https://gis.dola.colorado.gov/lookups/profilesql?table=estimates.firm_count&year=2011&geo=1
//String FIPS codes need to be quoted e.g. '001'

//Profile functions
//select_title selection of elements in header array
function select_title(inArr,sel){
 var out_arr = [];
 sel.forEach(arr => {
  var tmp = inArr[arr].title;
  out_arr.push(tmp);
 })
 return(out_arr);
} //select_title

//select_elements selection of elements in array
function select_elements(inArr,sel){
 var out_arr = [];
 sel.forEach(arr => {
  var tmp = inArr[arr];
  out_arr.push(tmp.toString());
 })
 return(out_arr);
} //select_elements

// selValsSing Picks out data values from a list -- Single record for Plotly
function selValsSing(inData, selArr){
 
var inMap = { ...inData }

 var outData = [];

 Object.keys(inMap[0]).forEach((key) => {
  if(selArr.includes(key)) {
   outData.push(inData[0][key]);
  }
    })
return(outData);
} //SelValsSing

// selValsMulti Picks out data values from a list -- Multiple records for Plotly
function selValsMulti(inData, selArr, nRows,nPanel,dir) {
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");

var inMap = { ...inData }
var outData = [];
//Create 2d aray for outData
 // creating two dimensional array
    for (i = 0; i< inData.length; i++) {
        for(j = 0; j< selArr[0].length; j++) {
            outData[i] = [];
        }
    }

for(i = 0; i < inData.length; i++){
  var tmp2 = Object.keys(inMap[i]).
  filter((key) => selArr[0].includes(key)).
  reduce((cur, key) => { return Object.assign(cur, { [key]: inMap[i][key] })}, {});

  for(j = 0; j < selArr[0].length;j++){
   if(selArr[1][j] == "comma"){
   outData[i][j] = fmt_comma(Math.round(tmp2[selArr[0][j]]));
  }
   if(selArr[1][j] == "percent"){
   outData[i][j] = fmt_pct(tmp2[selArr[0][j]]);
  }
   if(selArr[1][j] == "dollar"){
   outData[i][j] = Math.round(tmp2[selArr[0][j]]) == 0 ? "" : fmt_dollar(tmp2[selArr[0][j]]);
  }
   if(selArr[1][j] == ""){
     outData[i][j] = tmp2[selArr[0][j]];
  }
  }
}

//restructuring outData 
if(dir == "horiz"){
var outData2 = []
for(i = 0; i < nRows; i++){
 
 var startCol = (i * 4) + 1;
 var endCol = startCol + nPanel;
 var row_data = [];
for(j = 0;j < outData.length;j++){
   row_data = row_data.concat(outData[j].slice(startCol,endCol))
 }
 outData2.push(row_data);
}
 return(outData2)
} else {
 return(outData);
}

} //SelVarsMulti

//Join function from http://learnjsdata.com/combine_data.html

function join(lookupTable, mainTable, lookupKey, mainKey, select) {
    var l = lookupTable.length,
        m = mainTable.length,
        lookupIndex = [],
        output = [];
    for (var i = 0; i < l; i++) { // loop through l ds
        var row = lookupTable[i];
        lookupIndex[row[lookupKey]] = row; // create an index for lookup table
    }
    for (var j = 0; j < m; j++) { // loop through m ds
        var y = mainTable[j];
        var x = lookupIndex[y[mainKey]]; // get corresponding row from lookupTable
        output.push(select(y, x)); // select only the columns you need
    }
    return output;
};

//MergeArrays from https://reactgo.com/javascript-merge-array-objects-key/
function mergeArrayObjects(arr1,arr2){
  return arr1.map((item,i)=>{
     if(item.label === arr2[i].label){
         //merging two objects
       return Object.assign({},item,arr2[i])
     }
  })
}



//range geneates string array of values between start and stop
function range(start, end, step) {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(Number(i.toFixed(2)));
  }
  return output;
}; //range


//fixNEG fixes formatting ssue for negative numbers in word tables  based on fmt type (pct, num, cur) returns formatted value 
function fixNEG(invalue,fmt){
 const fmt_pct = d3.format(".1%")
 const fmt_comma = d3.format(",");
 const fmt_dollar = d3.format("$,");

    if(fmt == 'pct') {
  tmp_val = invalue/100;
 } else {
     tmp_val = invalue;
 }
 if(tmp_val < 0) {
   tmp_val = tmp_val * -1;
   if(fmt == 'pct') { fin_val = "-" + fmt_pct(tmp_val);};
   if(fmt == 'num') { fin_val = "-" + fmt_comma(tmp_val);};
   if(fmt == 'cur') { fin_val = "-" + fmt_dollar(tmp_val);};
 } else {
   if(fmt == 'pct') { fin_val = fmt_pct(tmp_val);};
   if(fmt == 'num') { fin_val = fmt_comma(tmp_val);};
   if(fmt == 'cur') { fin_val = fmt_dollar(tmp_val);};
    }

   return fin_val;
}; //end of fixNEG

//restructureACS data from wide to long 
function restructureACS(inData,vars) {
 const fmt_pct = d3.format(".2%")
 const fmt_comma = d3.format(",");
 const fmt_dollar = d3.format("$,");

 var inMap = { ...inData}
 var keyList = Object.keys(inMap[0])
 var estList = [];
 var moeList = [];
 var estpctList = [];
 var moepctList = [];
 
 for(i = 0; i < keyList.length; i ++){
  if(keyList[i].includes("_M_PCT")){
   moepctList.push(keyList[i]);
  } 
  if(keyList[i].includes("_E_PCT")){
   estpctList.push(keyList[i]);
  } 
   if(keyList[i].includes("_M") && !keyList[i].includes("_PCT")){
   moeList.push(keyList[i]);
   }
   if(keyList[i].includes("_E") && !keyList[i].includes("_PCT")){
   estList.push(keyList[i]);
    }
 }
 

 var outData = [];
 for(i = 0; i < vars.length; i++){
  vars[i] = vars[i].replaceAll("<br>"," ");
 }
 vars.unshift("Total");
    estpctList.unshift("");
 moepctList.unshift("");
 
    for(i = 0; i < inData.length; i++){
  var fips = inMap[i].FIPS;
  var name = inMap[i].NAME;
  var est = "";
  var moe = "";
  var est_pct = "";
  var moe_pct = "";
  for(j= 0; j < vars.length; j++){
      var est = fmt_comma(inMap[i][estList[j]]);;
      var moe = fmt_comma(inMap[i][moeList[j]]);
      var est_pct = fmt_pct(inMap[i][estpctList[j]]);
      var moe_pct = fmt_pct(inMap[i][moepctList[j]]);
      if(est_pct == 'NaN%') {est_pct = "100.00%"}
      if(moe_pct == 'NaN%'){moe_pct = "*****"}
      
      outData.push({"FIPS" : fips, "NAME" : name, "CATEGORY" : vars[j], "ESTIMATE" : est, "MOE" : moe, "ESTIMATE PCT" : est_pct, "ESTIMATE MOE" : moe_pct})
  } //j
 } //i

return(outData);
} //restructire ACS

//getHeaders exttracts multi line headers from data table
function getHeaders( dt ){

    var thRows = dt.nTHead.rows;
    var numRows = thRows.length;
    var matrix = [];
 
    // Iterate over each row of the header and add information to matrix.
    for ( var rowIdx = 0;  rowIdx < numRows;  rowIdx++ ) {
        var $row = $(thRows[rowIdx]);
 
        // Iterate over actual columns specified in this row.
        var $ths = $row.children("th");
        for ( var colIdx = 0;  colIdx < $ths.length;  colIdx++ )
        {
            var $th = $($ths.get(colIdx));
            var colspan = $th.attr("colspan") || 1;
            var rowspan = $th.attr("rowspan") || 1;
            var colCount = 0;
          
            // ----- add this cell's title to the matrix
            if (matrix[rowIdx] === undefined) {
                matrix[rowIdx] = [];  // create array for this row
            }
            // find 1st empty cell
            for ( var j = 0;  j < (matrix[rowIdx]).length;  j++, colCount++ ) {
                if ( matrix[rowIdx][j] === "PLACEHOLDER" ) {
                    break;
                }
            }
            var myColCount = colCount;
            matrix[rowIdx][colCount++] = $th.text();
         
            // ----- If title cell has colspan, add empty titles for extra cell width.
            for ( var j = 1;  j < colspan;  j++ ) {
                matrix[rowIdx][colCount++] = "";
            }
          
            // ----- If title cell has rowspan, add empty titles for extra cell height.
            for ( var i = 1;  i < rowspan;  i++ ) {
                var thisRow = rowIdx+i;
                if ( matrix[thisRow] === undefined ) {
                    matrix[thisRow] = [];
                }
                // First add placeholder text for any previous columns.                
                for ( var j = (matrix[thisRow]).length;  j < myColCount;  j++ ) {
                    matrix[thisRow][j] = "PLACEHOLDER";
                }
                for ( var j = 0;  j < colspan;  j++ ) {  // and empty for my columns
                    matrix[thisRow][myColCount+j] = "";
                }
            }
        }
    }
   
   return matrix;
};

// growth_tab Calculate 5-year growth rate table 
function growth_tab(level, inData,bkmark, fileName, outDiv){
 const fmt_pct = d3.format(".1%")
 const fmt_comma = d3.format(",");
 const fmt_date = d3.timeFormat("%B %d, %Y");
 const regList = ['Region', 'Regional Comparison'];
 const tabtitle = bkmark.title;


outDiv.innerHTML = "";
var geomap = [...new Set(inData.map(d => d.fips))];
var outDataPop = [];
var outDataGr = [];

for(i = 0; i < geomap.length; i++) {
 var tmp_dat = inData.filter(d => d.fips == geomap[i]);

   outDataPop.push({'fips' : tmp_dat[0].fips, 'name' : tmp_dat[0].name, 'year' : tmp_dat[0].year, 'totalpopulation' : tmp_dat[0].totalpopulation});
   outDataGr.push({'fips' : tmp_dat[0].fips, 'name' : tmp_dat[0].name, 'year' : tmp_dat[0].year, 'growthrate' : '-'});

 for(j = 1; j < tmp_dat.length; j++) {
  if( tmp_dat[j].totalpopulation == 0 || tmp_dat[j-1].totalpopulation == 0) {
   gr_rate = "-";
  } else {
  var pop_ratio = tmp_dat[j].totalpopulation/tmp_dat[j-1].totalpopulation;
  var yr_ratio = 1/(tmp_dat[j].year - tmp_dat[j-1].year);
  var gr_rate = (Math.pow(pop_ratio,yr_ratio)-1);
  }
  var tmp_pop = [];
  var tmp_gr = [];
      tmp_pop.push({'fips' : tmp_dat[j].fips, 'name' : tmp_dat[j].name, 'year' : tmp_dat[j].year, 'totalpopulation' : tmp_dat[j].totalpopulation});
   tmp_gr.push({'fips' : tmp_dat[j].fips, 'name' : tmp_dat[j].name, 'year' : tmp_dat[j].year, 'growthrate' : gr_rate});
 outDataPop = outDataPop.concat(tmp_pop);
 outDataGr = outDataGr.concat(tmp_gr);
     } //j
   } //i 


//Restructure data based on fips code

var places = [...new Set(outDataPop.map(d => d.fips))];
var years = [...new Set(outDataPop.map(d => d.year))];
var tab_data_Pop = [];
var tab_data_Gr = [];

for(x = 0; x < places.length;x++){
 var filtPop = outDataPop.filter(d => d.fips == places[x]);
 var filtGr = outDataGr.filter(d => d.fips == places[x]);


 var arrLen = filtPop.length + 1;
 var outarrPop = new Array(1).fill(new Array(arrLen));
 var outarrGr = new Array(1).fill(new Array(arrLen));
 outarrPop[0][0] = filtPop[0].name;
 outarrGr[0][0] = filtPop[0].name;


 for(z = 0; z < filtPop.length; z++){
   var pos = z  + 1;

   outarrPop[0][pos] = filtPop[z].totalpopulation < 0 ? "-" + fmt_comma(filtPop[z].totalpopulation) : fmt_comma(filtPop[z].totalpopulation) ;
   outarrGr[0][pos] = filtGr[z].growthrate == '-' ? '-' : filtPop[z].growthrate < 0 ? "-" + fmt_pct(filtGr[z].growthrate) : fmt_pct(filtGr[z].growthrate);
 } //z
 tab_data_Pop = tab_data_Pop.concat(outarrPop);
 tab_data_Gr = tab_data_Gr.concat(outarrGr);

} //x
//Add keys to tab_data_Pop and tab_data_Gr

var yrskeys = years;
yrskeys.unshift('location');

var tab_data_Popk = [];
var tab_data_Grk = [];
for(i = 0; i < tab_data_Pop.length; i++){
	tab_data_Popk.push({
	[yrskeys[0].toString()] : tab_data_Pop[i][0],
	[yrskeys[1].toString()] : tab_data_Pop[i][1],
	[yrskeys[2].toString()] : tab_data_Pop[i][2],
	[yrskeys[3].toString()] : tab_data_Pop[i][3],
	[yrskeys[4].toString()] : tab_data_Pop[i][4],
	[yrskeys[5].toString()] : tab_data_Pop[i][5],
	[yrskeys[6].toString()] : tab_data_Pop[i][6],
	[yrskeys[7].toString()] : tab_data_Pop[i][7]
	});
	
	tab_data_Grk.push({
	[yrskeys[0].toString()] : tab_data_Gr[i][0],
	[yrskeys[1].toString()] : tab_data_Gr[i][1],
	[yrskeys[2].toString()] : tab_data_Gr[i][2],
	[yrskeys[3].toString()] : tab_data_Gr[i][3],
	[yrskeys[4].toString()] : tab_data_Gr[i][4],
	[yrskeys[5].toString()] : tab_data_Gr[i][5],
	[yrskeys[6].toString()] : tab_data_Gr[i][6],
	[yrskeys[7].toString()] : tab_data_Gr[i][7]	
	})
}


if(level == "Region"){
	var src_link = 'https://coloradodemography.github.io/population/data/regional-data-lookup/';
}
if(level == "County") {
	var src_link = 'https://coloradodemography.github.io/population/data/county-data-lookup/'
}
if(level == "Municipality") {
	var src_link = 'https://coloradodemography.github.io/population/data/county-muni-timeseries/'
}
var row_labels = []
for(i = 0; i < years.length;i++) {
 row_labels.push({'title' : years[i].toString() , 'URL_link' : src_link});
}

var row_labels_pop = row_labels;
var row_labels_gr = row_labels;


var tab_pop = genSubjTab(level, tab_data_Popk, 2,row_labels_pop,false);
var tab_gr = genSubjTab(level,tab_data_Grk, 2, row_labels,false);

//footer
//Creating Footer
var ftrMsg = "Source: Colorado State Demography Office Print Date : " + fmt_date(new Date);
var ftrString = "<tfoot><tr><td colspan = '3'>"+ ftrMsg + "</td></tr></tfoot>";
var tblfoot = [ "Source: Colorado State Demography Office Print Date : " + fmt_date(new Date)];

//Producing  datatables...

pgSetup(level, "table", outDiv.id, bkmark, false, true, '','', '')

var tabVal = 0;

	//selecting initial dropdown values

   var dd1 = document.getElementById("tabSelect1");
   dd1.value = "0";
   var btndown = document.getElementById("increment11");
   var btnup = document.getElementById("increment21");

DTtab("tabDiv1",tab_gr,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle) 

   
  dd1.addEventListener('change', function() {
	   if(dd1.value == "0") {
		   DTtab("tabDiv1",tab_gr,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle);
	   } else {
		   DTtab("tabDiv1",tab_pop,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle);
	   }
   });

   btndown.addEventListener('click', function() {
     tabVal = tabVal - 1;
	 if(tabVal < 0) {
		tabVal = 5
	 }
	 if(dd1.value == "0") {
		   DTtab("tabDiv1",tab_gr,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle);
	   } else {
		   DTtab("tabDiv1",tab_pop,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle);
	  }
   });
  btnup.addEventListener('click', function() {
     tabVal = tabVal + 1;
	 if(tabVal > 5) {
		tabVal = 0
	 }
	 if(dd1.value == "0") {
		   DTtab("tabDiv1",tab_gr,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle);
	   } else {
		   DTtab("tabDiv1",tab_pop,tabVal,row_labels,ftrString,tblfoot,"popgrowth",fileName,tabtitle);
	  }
    });

 }; //growth_tab
 
 
 //bin_age5 created 5-year age bins and summarizes data by fips code, year and age_cat
function bin_age5(inData){

//Preliminaries

 var age_min = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95];
 var age_max = [4,9,14,19,24,29,34,39,44,49,54,59,64,69,74,79,84,89,94,100];
 var age_labs = [];
 for(i = 0; i < age_min.length;i++) {
  age_labs.push(age_min[i] + ' to ' + age_max[i]);
 }

var fipsList = [...new Set(inData.map(d => d.fips))];
var yearList = [...new Set(inData.map(d => d.year))];

var binraw = []
for(i = 0; i < fipsList.length; i++){
 for(j = 0; j < yearList.length; j++){
  var tmpdat = inData.filter(d => (d.fips == fipsList[i]&& d.year == yearList[j]));
        var binVal = 0;
  for(k = 0; k < tmpdat.length;k++){
   if(tmpdat[k].age != 0) {
    if(tmpdat[k].age % 5 == 0) {binVal = binVal + 1};
   };
   if(binVal == 20){
    binVal = 19;
   } 
   tmpdat[k].bin = binVal;
  }; //k
  binraw = binraw.concat(tmpdat);
 } //j
} //i

binraw.forEach( d => {d.age_cat = age_labs[d.bin]})


//binraw has the binning variable  binsum is the rolled up file; bindata containes the flattened data records
var columnsToSum = ['malepopulation_e', 'femalepopulation_e', 'totalpopulation_e'];

//Rolling up data for table
var binroll =  d3.rollup(binraw, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.fips, d => d.name, d => d.bin, d => d.age_cat)

var bindata = [];
for (let [key1, value] of binroll) {
for (let[key2, value2] of value) {
for (let [key3, value3] of value2) {
for (let [key4, value4] of value3) {
for (let [key5, value5] of value4){
   bindata.push({'fips' : key2, 'name' : key3, 'year' : key1, 'age_cat_no' : key4, 'age_cat' : key5,
     'malepopulation_e' : value5.malepopulation_e, 'femalepopulation_e' : value5.femalepopulation_e, 'totalpopulation_e' : value5.totalpopulation_e});
}
};
};
};
};


//Calculating age base

//Need to calculate percentages...
var pct_base = d3.rollup(bindata, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.fips, d => d.year)
var age_base = [];
for (let [key1, value] of pct_base) {
for (let[key2, value2] of value) {
   age_base.push({'fips' : key1, 'year' : key2, 
     'tot_malepopulation_e' : value2.malepopulation_e, 'tot_femalepopulation_e' : value2.femalepopulation_e, 'tot_totalpopulation_e' : value2.totalpopulation_e});
}
};
  
//Base totals for percentages

var bindatafin = [];
for(i = 0 ; i < fipsList.length; i++){
 for(j = 0; j < yearList.length;j++){
 tmp_base = age_base.filter( d => (d.fips == fipsList[i] && d.year == yearList[j])); 
    tmp_age = bindata.filter( d => (d.fips == fipsList[i] && d.year == yearList[j]));

    for(k = 0; k < tmp_age.length;k++){
        bindatafin.push({'fips' : tmp_age[k].fips, 'name' : tmp_age[k].name, 'year' : tmp_age[k].year, 'age_cat' : tmp_age[k].age_cat,
             'malepopulation_e' : tmp_age[k].malepopulation_e, 'pct_malepopulation_e' :  tmp_age[k].malepopulation_e/tmp_base[0].tot_malepopulation_e, 
             'femalepopulation_e' : tmp_age[k].femalepopulation_e, 'pct_femalepopulation_e' :  tmp_age[k].femalepopulation_e/tmp_base[0].tot_femalepopulation_e,
             'totalpopulation_e' : tmp_age[k].totalpopulation_e, 'pct_totalpopulation_e' :  tmp_age[k].totalpopulation_e/tmp_base[0].tot_totalpopulation_e
  })
 }
 }
}

return (bindatafin);
}; //bin_age5

 
//genSubjTab Generates substantive table with topics in the rows and geographies in the columns. a n rows *5 column array of tables
function genSubjTab(level,inData,section, row_topics,pctTab) {
// section refers to the output section.  For section > 2, need to go through steps and format table.
// for cestion <= 2, the table is alreary formatted and the tables have a different column layout
const fmt_comma = d3.format(",");
const fmt_pct = d3.format(".1%");

//Fix for section 2
if(section == 2) {
	if(row_topics[0].title == 'location'){
	  row_topics.shift()
	}
}

var nRows = row_topics.length + 2;
//The idea is to create a 3D array:  array[panel][row_topic][6 column table string (2 cols for index and rew_topic and 2 * 2 geography))]
	var row_tab = [];
	for(i = 0 ; i < nRows; i++){
		if( i < 2){
			row_tab.push("<th></th>");
		} else {
		 row_tab.push("<td><a href='" + row_topics[i-2].URL_link + "' target='_blank'>" + row_topics[i-2].title + "</a></td>");
		}
	}
	


 //Creating the output objects
 var ntopics = row_tab.length ;
 
if(level == "Municipality") {
   var npanels = 1;
 } else {
   var npanels = Math.round((inData.length)/2); //This is the number of panels
 }
 
  var out_count = new Array(npanels);
  if(pctTab){
  var out_pct = new Array(npanels);
  }
  for(i = 0 ; i < npanels; i++) {
	  out_count[i] = new Array(ntopics);
	if(pctTab){
	  out_pct[i] = new Array(ntopics);
	}
	  for(j = 0 ; j < ntopics;j++){
		  if(section == 2) {
			  if(level == "Municipality"){
				 out_count[i][j] = new Array(4);
			  } else {
			  out_count[i][j] = new Array(3);
			  }
		  } else {
			out_count[i][j] = new Array(5);
		  }
			if(pctTab){
			 if(section == 2) {
				 if(level == "Municipality"){
					 out_pct[i][j] = new Array(4);
				 } else {
					out_pct[i][j] = new Array(3);
				 }
			} else {
				out_pct[i][j] = new Array(5);
			}
				  out_pct[i][j] = new Array(5);
			}
	  }
  }


  //Filling in the row labels
  for(i = 0; i < npanels; i++){
   for(j = 0; j < ntopics;j++){
	  out_count[i][j][0] = row_tab[j];
if(pctTab){
	  out_pct[i][j][0] = row_tab[j];
}
   } //j
  } //i
 
  

  //Generate List of Keys
  var tmp_data_keys = Object.keys(inData[0]);
  var tgtrow = 0

 //Generate Tables by section 
  if(section == 1) { //this is for the summary table

   for(a = 0; a < npanels;a++) {// panels
  var tmp_data = [];

  if(tgtrow == (inData.length - 1)){
	  tmp_data.push(inData[tgtrow]);
  } else {
	  if(level == "Municipality"){
		  tmp_data.push(inData[tgtrow], inData[tgtrow+1], inData[tgtrow+2]);
	  } else {
		tmp_data.push(inData[tgtrow], inData[tgtrow+1]);
	  }
  };
  tgtrow = tgtrow + 2
 //Populate the output tables

 	var col_pos = 1
	  for(i = 0; i < tmp_data.length;i++){  
	        var col_pos2 = col_pos + 1;
			 out_count[a][0][col_pos] = "<th align='center' colspan='2'>" + tmp_data[i][tmp_data_keys[1]] + "</th>";
			 out_count[a][1][col_pos] = "<th align='center'>Estimate</th>";
			 out_count[a][1][col_pos2] = "<th align='center'>Margin of Error</th>";
		 var j_offset = 0;
		 for(j = 0; j < tmp_data_keys.length; j++){
				if(j >= 2 & j <= 5){
					var val_est = tmp_data[i][tmp_data_keys[j]];
					out_count[a][j][col_pos] = "<td align='right'>" + val_est + "</td>";
					out_count[a][j][col_pos2] = "<td align='right'>" + " " + "</td>";
					} 
				if(j >= 6 & j <= 12) {
					if(j % 2 == 0){
						var rowpos = j - j_offset
						var val_est = tmp_data[i][tmp_data_keys[j]];
						var val_moe = tmp_data[i][tmp_data_keys[j+1]]
						out_count[a][rowpos][col_pos] = "<td align='right'>" + val_est + "</td>";
						out_count[a][rowpos][col_pos2] = "<td align='right'>" + val_moe + "</td>";
						j_offset++;
					}
				}
		 } //j
	 col_pos = col_pos + 2;
	  } //i
  } //a
  } //section == 1
  
 if(section == 2) { //this is for the population growth rate tables --want to have a number and a rate panel similar to section > 2
for(a = 0; a < npanels;a++) {// panels
  var tmp_data = [];

  if(tgtrow == (inData.length - 1)){
	  tmp_data.push(inData[tgtrow]);
  } else {
	  	  if(level == "Municipality"){
		  tmp_data.push(inData[tgtrow], inData[tgtrow+1], inData[tgtrow+2]);
	  } else {
		tmp_data.push(inData[tgtrow], inData[tgtrow+1]);
	  }
  };
  tgtrow = tgtrow + 2
 //Populate the output tables

 	var col_pos = 1
	  for(i = 0; i < tmp_data.length;i++){  
		 for(j = 0; j < tmp_data_keys.length; j++){
			  if(tmp_data_keys[j] == 'location'){
				  	out_count[a][0][col_pos] = "<th align='center'>" + tmp_data[i][tmp_data_keys[j]] + "</th>";
			        out_count[a][1][col_pos] = "<th align='center'>Estimate</th>";
				} else {
					var val_est = tmp_data[i][tmp_data_keys[j]]
					out_count[a][j+2][col_pos] = "<td align='right'>" + val_est.toString() + "</td>";
				} //else
		 } //j
	 col_pos = col_pos + 1;
	  } //i
  } //a
 debugger;
 console.log(out_count);
 
  } //section  == 2
 if(section > 2){ //the main table array for sections beyond 2
  for(a = 0; a < npanels;a++) {// panels
  var tmp_data = [];

  if(tgtrow == (inData.length - 1)){
	  tmp_data.push(inData[tgtrow]);
  } else {
	  tmp_data.push(inData[tgtrow], inData[tgtrow+1]);
  };
  tgtrow = tgtrow + 2
 //Populate the output tables

 	var col_pos = 1
	  for(i = 0; i < tmp_data.length;i++){  
	        var col_pos2 = col_pos + 1;
			 out_count[a][0][col_pos] = "<th align='center' colspan='2'>" + tmp_data[i][tmp_data_keys[1]] + "</th>";
			 out_count[a][1][col_pos] = "<th align='center'>Estimate</th>";
			 out_count[a][1][col_pos2] = "<th align='center'>Margin of Error</th>";
			 if(pctTab){
			 out_pct[a][0][col_pos] = "<th align='center' colspan='2'>" + tmp_data[i][tmp_data_keys[1]] + "</th>";
			 out_pct[a][1][col_pos] = "<th align='center'>Estimate</th>";
			 out_pct[a][1][col_pos2] = "<th align='center'>Margin of Error</th>";
			 } //pctTab
			 var tot_est = tmp_data[i][tmp_data_keys[2]];
			 var tot_moe = tmp_data[i][tmp_data_keys[3]];
			 for(j = 0; j < tmp_data_keys.length; j++){
				if(j % 2 == 0 && j > 0) {
					var row_pos = ((j/2) - 1) + 2;
					var val_est = tmp_data[i][tmp_data_keys[j]];
					var val_moe = tmp_data[i][tmp_data_keys[j+1]]
				if(pctTab){
					var pct_est = val_est/tot_est;
					var pct_moe = acsPctMOE(tot_est, tot_moe,pct_est,val_moe);
				}
					out_count[a][row_pos][col_pos] = "<td align='right'>" + fmt_comma(val_est) + "</td>";
					out_count[a][row_pos][col_pos2] = "<td align='right'>" + fmt_comma(Math.round(val_moe)) + "</td>";
				if(pctTab){
					if(j == 2) {
					   out_pct[a][row_pos][col_pos] = "<td align='right'>" + fmt_comma(val_est) + "</td>";
					   out_pct[a][row_pos][col_pos2] = "<td align='right'>" + fmt_comma(Math.round(val_moe)) + "</td>";
					} else {
					  out_pct[a][row_pos][col_pos] = "<td align='right'>" + fmt_pct(pct_est) + "</td>";
					  out_pct[a][row_pos][col_pos2] = "<td align='right'>" + fmt_pct(pct_moe) + "</td>";
					}
				} //pctTab
				} //j % 2
		 } //j
	 col_pos = col_pos + 2;
	  } //i
  } //a
  
 } //section > 2
  
  //convert to html array, one row per panel
  //for each panel, 0 and 1 are the header, 2 to n is the table body
  var count_html = [];
  if(pctTab){
	  var pct_html = [];
  }
   for(a = 0; a < out_count.length; a++){ //panels
	   var strhtml_count = "<thead>"
	   for(b = 0; b < out_count[a].length; b++) {  //geo
		   strhtml_count = strhtml_count + "<tr>"
		   for(c = 0; c < out_count[a][b].length; c++){ //item
			     strhtml_count = strhtml_count + out_count[a][b][c]
		   } //c
		  strhtml_count = strhtml_count + "</tr>";
		if(b == 1) {strhtml_count = strhtml_count + "</thead>"	}
	   } //b
	   
	 count_html.push(strhtml_count.replaceAll('undefined',''));
	 if(pctTab){
		 	   var strhtml_pct = "<thead>"
	   for(b = 0; b < out_pct[a].length; b++) {  //geo
		   strhtml_pct = strhtml_pct + "<tr>"
		   for(c = 0; c < out_pct[a][b].length; c++){ //item
			     strhtml_pct = strhtml_pct + out_pct[a][b][c]
		   } //c
		  strhtml_pct = strhtml_pct + "</tr>";
		if(b == 1) {strhtml_pct = strhtml_pct + "</thead>"	}
	   } //b
	 pct_html.push(strhtml_pct.replaceAll('undefined',''));
	 }
   } //a

if(pctTab) {
  return([count_html, pct_html]);
} else {
  return(count_html);
}
} //genSubjTab

//DTtab produces generic DT tables 
function DTtab(tabdiv,tab_data,panelN,row_labels,footer,footArr,tabName, fileName, tabTitle){

var pgLength = row_labels.length + 2;

var labels = [];
row_labels.forEach(x =>{
	 labels.push(x.title)
});


var tab_data2 = tab_data[panelN] + footer;

var tabDivOut = document.getElementById(tabdiv);
//Clear div
tabDivOut.innerHTML = "";

var tabObj = "#" + tabName;
$(tabDivOut).append("<table id="+ tabName + " class='DTTable' width='90%'></table>");
$(tabObj).append(tab_data2); //this has to be a html table


$(tabObj).DataTable({
       "pageLength" : pgLength,
	   "ordering": false,
		"fixedHeader":   true,
 dom: 'Bfrtip',
       "buttons": [
		{ text :'Word',    action: function ( e, dt, node, config ) { genplexTab(tab_data,labels,footArr,fileName,'word',tabTitle)} },
        { text : 'Excel',  action: function ( e, dt, node, config ) { genplexTab(tab_data,labels,footArr,fileName,'xlsx',tabTitle)} },
        { text : 'CSV',    action: function ( e, dt, node, config ) { genplexTab(tab_data,labels,footArr,fileName,'csv',tabTitle)} },
        { text :'PDF',     action: function ( e, dt, node, config ) { genplexTab(tab_data,labels,footArr,fileName,'pdf',tabTitle)} }
		]  //buttons
 } );

 } //DTtab
 
//stripHTML Removes HTML codes from HTML table array Outputs
function stripHTML(inData){
	var tArrt = []
//Stripping out html tags
    inData.forEach(x => {
     x = x.replace(/(<([^>]+)>)/gi, "|")
	 var x2 = x.split("|")
	 tArrt.push(x2);
	});


//remove empty fields
var tArr = [];
for(i = 0; i < tArrt.length; i++){
	 var tmpar = "";
	 for(j = 0; j < tArrt[i].length; j++) {
		 if(tArrt[i][j].length !== 0){
			 tmpar = tmpar + tArrt[i][j] + "|";
		 }
	 }
    tmpar = tmpar.substr(0,(tmpar.length - 1))
	tArr.push(tmpar.split("|"))
}

return(tArr);
} //stripHTML

//checkHash HTMLtoArray support function 
function checkHash(val,arr){
	var outval = 0;
	for(i = 0; i < arr.length; i++){
		if(val == arr[i].label) {
		var outval = arr[i].outrow;
		}
	}
 return(outval)
} //checkHash

//HTMLtoArray converts HTML strings to an array  From https://stackoverflow.com/questions/9579721/convert-html-table-to-array-in-javascript
function HTMLtoArray(inData,row_labels,type) {

var tblArray = stripHTML(inData);

//Restructuring 
//creating lookup array
var rowHash = [];
for(i = 0 ; i < row_labels.length; i++){
	rowHash.push({ label : row_labels[i], outrow : i +2});
}

//Header rows

var hdrArray = [];
var hdrstr1 = "|";
var hdrstr2 = "|";
for(i = 0; i < tblArray.length;i++){
	for(j = 0 ; j < 2; j++) {
		if(tblArray[i][j] != 'Estimate'){
		hdrstr1 = hdrstr1 + tblArray[i][j] + "||";
		hdrstr2 = hdrstr2 + "Estimate|Margin of Error|"
		};
	}
}


hdrstr1 = hdrstr1.substr(0,(hdrstr1.length - 1));
hdrstr2 = hdrstr2.substr(0,(hdrstr2.length - 1));
hdrArray.push(hdrstr1.split("|"));
hdrArray.push(hdrstr2.split("|"));


  var finData = [];
  for(x = 0; x < tblArray.length; x++){
	 var tmpData = []
  if(tblArray[x][1] != "Estimate"){
	  for(k = 0; k < tblArray[x].length; k++){
		  var rowassn = checkHash(tblArray[x][k], rowHash);
		  if(rowassn != 0){
			  //K values
			  var a = k + 1;
			  var b = k + 2;
			  var c = k + 3;
			  var d = k + 4;
			  tmpData.push({ label : tblArray[x][k],
			                ["e1" + x] : tblArray[x][a],
							["m1" + x] :  tblArray[x][b],
							["e2" + x] :  tblArray[x][c],
							["m2" + x] : tblArray[x][d]
			  });
		  } //rowassn
		  } //k
	  } else {
		  for(k = 0; k < tblArray[x].length; k++){
		  var rowassn = checkHash(tblArray[x][k], rowHash);
		  if(rowassn != 0){
			   //K values
			  var a = k + 1;
			  var b = k + 2;
			  tmpData.push({ label : tblArray[x][k],
			                 ["e1" + x]: tblArray[x][a],
							 ["m1" + x] : tblArray[x][b],
							 ["e2" + x] : "",
							 ["m2" + x] : ""
			  });
		  } //rowassn 
	  } //k
	  }  //estimate
	  if(finData.length == 0) {
		  finData = tmpData;
	  } else {
		  finData = mergeArrayObjects(finData,tmpData);
	  }
  } //i


var outData = [];

for(i = 0; i < finData.length; i++){
	outData.push(Object.values(finData[i]));
};

var tableData = hdrArray.concat(outData);

if(type == "CSV"){
      return(tableData);
} else {

	var tabkeys = Object.keys(finData[0]);
	var arrlen = hdrArray.length;
	var finHdr = [];

	
    for(i = 0; i < hdrArray.length; i++){
		 var tmphdr = {};
		  for(j = 0; j < tabkeys.length;j++){
			  tmphdr[tabkeys[j]] = hdrArray[i][j];
		  }
		  finHdr = finHdr.concat(tmphdr)
	}

	var finTab = finHdr.concat(finData);

	//convert finTab to table structure
	var npanels = (tabkeys.length - 1)/4
	var finouttab = [];
	for(x = 0 ; x < npanels; x++){
		startpos = (x * 4 ) + 1;
		lab0 = tabkeys[0];
		lab1 = tabkeys[startpos];
		lab2 = tabkeys[startpos+1];
		lab3 = tabkeys[startpos+2];
		lab4 = tabkeys[startpos+3];
		var tmppnl = []
		for(z = 0 ; z < finTab.length; z++) {
			
			tmppnl.push({
			[lab0] : typeof finTab[z][lab0] === 'undefined' ? ' ' : finTab[z][lab0],
			[lab1] : typeof finTab[z][lab1] === 'undefined' ? ' ' : finTab[z][lab1],
			[lab2] : typeof finTab[z][lab2] === 'undefined' ? ' ' : finTab[z][lab2],
			[lab3] : typeof finTab[z][lab3] === 'undefined' ? ' ' : finTab[z][lab3],
			[lab4] : typeof finTab[z][lab4] === 'undefined' ? ' ' : finTab[z][lab4]
			})
		} //z
		finouttab.push(tmppnl);
    } //x
			 
	return(finouttab);
}
} //HTMLtoArray

//setBookmark  function to set book mark statement at top of page
function setBookmark(divout,links) {
	//links is an array of link ids
	//divout is the output div
	
} // setBookmark

//pgSetup  adds download buttons and dropdowns to Plot and Table  divs
function pgSetup(level, type, gridPanel, bkMark, multi, pctTable, ctyFips,ctyName, yrvalue) {
  var idxval = gridPanel.charAt(gridPanel.length - 1);

var src_txt = document.createTextNode('');

  //Page heading
  var pgHead = document.createElement("H3");
     var pgText = document.createTextNode(bkMark.title)
   pgHead.setAttribute('id', bkMark.id)
   pgHead.appendChild(pgText);


  //Create objects
if(type == "chart"){
	if(bkMark.id == 'map'){
 // Download Button
   var dlbtn = document.createElement('button');
    dlbtn.id = 'profiledl' + idxval;
    dlbtn.className = 'dropbtn';
    dlbtn.innerHTML = '<i class="fas fas fa-download fa-2x" style="color: black;">';

    var img_li = document.createElement('li');
    var img_link = document.createElement('a');
     img_link.href = '#';
     img_link.id = 'profileImg' + idxval;
    var img_Text = document.createTextNode("Download Image (PNG)");
     img_link.appendChild(img_Text);
     img_li.appendChild(img_link);
	 
	    //Download List
    var dllist = document.createElement('ul');
        dllist.className = 'dd-list';
        dllist.appendChild(img_li)
     
	 
} else {  //Every other chart

  var dlbtn = document.createElement('button');
    dlbtn.id = 'profiledl' + idxval;
    dlbtn.className = 'dropbtn';
    dlbtn.innerHTML = '<i class="fas fas fa-download fa-2x" style="color: black;">';

//Creating strFips
if(level == "Region") {
 var sFips = ctyFips.map(i => i.toString().padStart(3,'0'));
 var strFips = sFips.map(i => "08" + i) 
if(strFips[0] === "08008"){
   strFips[0] = "08";
}
if(strFips[1] == "08-101"){
 strFips.splice(1,1)
}
}

if(level == "County"){
 var sFips = ctyFips.map(i => i.toString().padStart(3,'0'));
 var strFips = sFips.map(i => "08" + i) 
if(strFips[0] === "08008"){
   strFips[0] = "08";
}
}

if(level == 'Municipality') {
  var sFips = ctyFips.map(i => i.toString().padStart(5,'0'));
 var strFips = sFips.map(i => "08" + i) 
if(strFips[0] === "0800008"){
   strFips[0] = "08";
}
}  

   //Regional dropdown
   var reglist = document.createElement('select');
   reglist.id = 'RegSelect'+ idxval;
   if(multi) {
   reglist.setAttribute('multiple',true);
   }
   reglist.setAttribute('fips','name');
   for(j = 0; j < ctyFips.length; j++){
      var opt = document.createElement('option');
      opt.innerHTML = ctyName[j];
      opt.value = ctyFips[j];
      reglist.appendChild(opt);
   } //i
     // Regional Button
     var regbtn = document.createElement('button');
     regbtn.id = 'RegBtn' + idxval;
     regbtn.className = 'databutton';
     regbtn.innerHTML = 'Generate Plot';
   //Regional text
     var regtxt = document.createElement('p');
         regtxt.id = 'regtext' + idxval;
      regtxt.className = 'entry_text';
      if(multi){
    regtxt.innerHTML = '<b>Select One or More Geographies</b><br>';
      } else {
       regtxt.innerHTML = '<b>Select Geography</b><br>';
      }
      

     //Data ds

    var data_li = document.createElement('li');
    var data_link = document.createElement('a');
     data_link.href = '#';
     data_link.id = 'profileDat' + idxval;
     var data_Text = document.createTextNode("Download Data (CSV)");
     data_link.appendChild(data_Text);
     data_li.appendChild(data_link);

   //Image ds
    var img_li = document.createElement('li');
    var img_link = document.createElement('a');
     img_link.href = '#';
     img_link.id = 'profileImg' + idxval;
    var img_Text = document.createTextNode("Download Image (PNG)");
     img_link.appendChild(img_Text);
     img_li.appendChild(img_link);
		
	//Data Type drop down
	if(bkMark.title == "Household Forecast"){
		var hhtxt = document.createElement('p');
         hhtxt.id = 'hhtext' + idxval;
         hhtxt.className = 'entry_text';
		 hhtxt.innerHTML = '<b>Select Statistic</b><br>';
		 
		var seriesType = ['Number of Households', 'Household Change','Household Change Rate'];
		var hhlist = document.createElement('select');
		hhlist.id = 'HHSelect'+ idxval;
       hhlist.setAttribute('stat','name');
	   for(j = 0; j < seriesType.length; j++){
		  var opt = document.createElement('option');
		  opt.innerHTML = seriesType[j];
		  opt.value = j;
		  hhlist.appendChild(opt);
	   } //i
	
	} //Household Forecast
	
   //Source ds
    var src_li = document.createElement('li');
    var src_link = document.createElement('a');
        
     if(level == "Region") {
      if(bkMark.title === "Regional Population Estimates"){
      var src_txt = document.createTextNode('Regional Population Estimates');
      src_link.href = 'https://coloradodemography.github.io/population/data/regional-data-lookup/';
      }
      if(bkMark.title === "Regional Population Forecasts"){
      var src_txt = document.createTextNode('Regional Population Forecasts');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
      if(bkMark.title === "Regional Components of Change"){
      var src_txt = document.createTextNode('Regional Components of Change');
      src_link.href = 'https://coloradodemography.github.io/births-deaths-migration/data/components-change-regions/';
                     }
      if(bkMark.title === "Regional Age Estimates"){
      var src_txt = document.createTextNode('State and Regional Single Year of Age Lookup');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
      if(bkMark.title === "Regional Age Forecasts"){
      var src_txt = document.createTextNode('State and Regional Single Year of Age Lookup');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
      if(bkMark.title === "Regional Age Pyramid"){
      var src_txt = document.createTextNode('State and Regional Single Year of Age Lookupa');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
      if(bkMark.title === "Household Income Distribution"){
      var src_txt = document.createTextNode('ACS Household Income Estimates');
      src_link.href = genCEDSCIUrl(level,"B19001",yrvalue, strFips);
                     }
      if(bkMark.title === "Educational Attainment, Age 25+"){
      var src_txt = document.createTextNode('ACS Educational Attainment Estimates');
      src_link.href = genCEDSCIUrl(level,"B15003",yrvalue, strFips);
                     }
	  if(bkMark.title === "Household Forecast"){
      var src_txt = document.createTextNode('Household Forecast');
      src_link.href = "https://coloradodemography.github.io/housing-and-households/data/household-projections/";
                     }
     }; //Region 
     
    if(level == "County") {  
      if(bkMark.title === "County Population Estimates"){
      var src_txt = document.createTextNode('County Population Estimates');
      src_link.href = 'https://coloradodemography.github.io/population/data/county-data-lookup/';
      }
      if(bkMark.title === "County Population Forecasts"){
      var src_txt = document.createTextNode('County Population Forecasts');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
      if(bkMark.title === "County Components of Change"){
      var src_txt = document.createTextNode('County Components of Change');
      src_link.href = 'https://coloradodemography.github.io/births-deaths-migration/data/components-change/#components-of-change';
                     };
      if(bkMark.title === "County Age Estimates"){
      var src_txt = document.createTextNode('County Single Year of Age Lookup');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
      if(bkMark.title === "County Age Forecasts"){
      var src_txt = document.createTextNode('County Single Year of Age Lookup');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
      if(bkMark.title === "County Age Pyramid"){
      var src_txt = document.createTextNode('County Single Year of Age Lookup');
      src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
      if(bkMark.title === "Household Income Distribution"){
      var src_txt = document.createTextNode('ACS Household Income Estimates');
      src_link.href = genCEDSCIUrl(level,"B19001",yrvalue, strFips);
                     }
      if(bkMark.title === "Educational Attainment, Age 25+"){
      var src_txt = document.createTextNode('ACS Educational Attainment Estimates');
      src_link.href = genCEDSCIUrl(level,"B15003",yrvalue, strFips);
                     }
	  if(bkMark.title === "Household Forecast"){
      var src_txt = document.createTextNode('Household Forecast');
      src_link.href = "https://coloradodemography.github.io/housing-and-households/data/household-projections/";
                     }
     };  //County
     
     if(level == "Municipality"){
     
       if(bkMark.title === "Municipal Age Estimates"){
      var src_txt = document.createTextNode('ACS Age Eatimates');
      src_link.href = genCEDSCIUrl(level,"B01001",yrvalue, strFips);
                     };
       if(bkMark.title === "Municipal Age Pyramid"){
      var src_txt = document.createTextNode('ACS Age Estimates');
      src_link.href = genCEDSCIUrl(level,"B01001",yrvalue, strFips);
      };
     if(bkMark.title === "Household Income Distribution"){
      var src_txt = document.createTextNode('ACS Household Income Estimates');
      src_link.href = genCEDSCIUrl(level,"B19001",yrvalue, strFips);
                     }
      if(bkMark.title === "Educational Attainment, Age 25+"){
      var src_txt = document.createTextNode('ACS Educational Attainment Estimates');
      src_link.href = genCEDSCIUrl(level,"B15003",yrvalue, strFips);
                     }
     }; //Municipalitiy
     
     src_link.appendChild(src_txt);
     src_link.id = 'profileSrc' + idxval;
     src_link.setAttribute('target', '_blank');
     src_li.appendChild(src_link);

    //Download List
    var dllist = document.createElement('ul');
        dllist.className = 'dd-list';
     
           dllist.appendChild(data_li);
     dllist.appendChild(img_li)
     dllist.appendChild(src_li);

 
     
}  //Everything else
//Creating table wrapper  

    var dlcontent = document.createElement('div');
         dlcontent.className = 'dropdown-content';
      dlcontent.appendChild(dllist);
   //dropdown list wrapper
       var dlwrap = document.createElement('div');
     dlwrap.className = "dropdown AClass";
     dlwrap.appendChild(dlbtn);
     dlwrap.appendChild(dlcontent);
	 
  var tbl = document.createElement("table");
      tbl.style.width = "60%";
   tbl.style.border = "0px solid black";
   
  var tblbody = document.createElement("tbody");
  var tblrow = document.createElement("tr");
   
  var tabcell1 = document.createElement("td");
   tabcell1.style.border = "0px solid black";
   tabcell1.style.verticalAlign = "top";
   tabcell1.style.align = 'left';
   tabcell1.style.width = "20%"
   tabcell1.appendChild(dlwrap);
  
if(bkMark.id != 'map'){
if(level == "Region"){
  var tabcell2 = document.createElement("td");
   tabcell2.style.border = "0px solid black";
   tabcell2.style.verticalAlign = "top";
   tabcell2.style.align = 'left';
   tabcell2.style.width = "25%"
   tabcell2.appendChild(regtxt);
   tabcell2.appendChild(reglist);
     
  var tabcell3 = document.createElement("td");
   tabcell3.style.border = "0px solid black";
   tabcell3.style.verticalAlign = "top";
   tabcell3.style.align = 'left';
   tabcell3.style.width = "25%"
   tabcell3.appendChild(regbtn);
}
  if(bkMark.title == "Household Forecast"){
	var tabcell4 = document.createElement("td");
	tabcell4.style.border = "0px solid black";
	tabcell4.style.verticalAlign = "top";
	tabcell4.style.align = 'left';
	tabcell4.style.width = "25%"
	tabcell4.appendChild(hhtxt);
	tabcell4.appendChild(hhlist); 
  }
  } //map  
   tblrow.appendChild(tabcell1);
  if(bkMark.id != "map"){
   if(!['Regional Age Forecasts', 'Regional Age Pyramid'].includes(bkMark.title)){
   tblrow.appendChild(tabcell2);
   tblrow.appendChild(tabcell3);
   if(bkMark.title == "Household Forecast"){ 
     tblrow.appendChild(tabcell4);
   }
  }
  } //map
  tblbody.appendChild(tblrow);
  tbl.appendChild(tblbody);

   //Plotdiv   
   var plotdiv = document.createElement('div');
       plotdiv.id = 'PlotDiv' + idxval
 
} //type == chart
if(type == "table"){
 if(pctTable){
	//Type selection
	var tabtxt = document.createElement('p');
         tabtxt.id = 'tabtext' + idxval;
         tabtxt.className = 'entry_text';
		 tabtxt.innerHTML = '<b>Select Statistic</b><br>';
		 if(bkMark.title == "Population Growth Table"){
			var seriesType = ['Growth Rate', 'Numeric Growth'];
		}  else {
	 		var seriesType = ['Percentage', 'Number'];
		}
		var tablist = document.createElement('select');
		tablist.id = 'tabSelect'+ idxval;
       tablist.setAttribute('stat','name');
	   for(j = 0; j < seriesType.length; j++){
		  var opt = document.createElement('option');
		  opt.innerHTML = seriesType[j];
		  opt.value = j;
		  tablist.appendChild(opt);
	   }
 }
	//Scroll buttons
if(level == "Region") {
	var scrollbtn1 = document.createElement('button');
    scrollbtn1.id = 'increment1' + idxval;
    scrollbtn1.innerHTML = '<i class="fa-solid fa-square-caret-left fa-2x" style="color: black;">';
	
	var scrollbtn2 = document.createElement('button')
	scrollbtn2.id = 'increment2' + idxval;
    scrollbtn2.innerHTML = '<i class="fa-solid fa-square-caret-right fa-2x" style="color: black;">';
}
	//Output Table
	 var tbl = document.createElement("table");
      tbl.style.width = "40%";
   tbl.style.border = "0px solid black";
   
  var tblbody = document.createElement("tbody");
  var tblrow = document.createElement("tr");
   
  var tabcell1 = document.createElement("td");
   tabcell1.style.border = "0px solid black";
   tabcell1.style.verticalAlign = "top";
   tabcell1.style.align = 'left';
   tabcell1.style.width = "20%"
   if(pctTable) {
	tabcell1.appendChild(tabtxt);
	tabcell1.appendChild(tablist);
   }
  if(level == "Region"){
   tabcell1.appendChild(scrollbtn1);
   tabcell1.appendChild(scrollbtn2);
  }
  tblrow.appendChild(tabcell1);
  tblbody.appendChild(tblrow);
  tbl.appendChild(tblbody);
  
   //Plotdiv   
   var plotdiv = document.createElement('div');
       plotdiv.id = 'tabDiv' + idxval;
    
} //table
 
//writing to DOM
    var outDiv = document.getElementById(gridPanel);
    outDiv.appendChild(pgHead);
    outDiv.appendChild(tbl);
    outDiv.appendChild(plotdiv);
} //pgSetup


// sumhouseholds summs census data SF1 files for househoild projections
function sumhouseholds(year,inData,incVal){
	var outval = 0;
	  if(year == 1990){
		  if(incVal == 0) {
			 var outval = inData["h12001"] + inData["h12002"] + inData["h12003"] + inData["h12004"] + inData["h12005"] + 
							inData["h12006"] + inData["h12007"] + inData["h12008"] + inData["h12009"] + inData["h12010"] + inData["h12011"] + 
							inData["h12012"] + inData["h12013"] + inData["h12014"];
		  }
	   if(incVal == 1) {
		   var outval = inData["h12001"] + inData["h12008"];
	   }
	   if(incVal == 2) {
		   var outval = inData["h12002"] + inData["h12003"] + inData["h12009"] + inData["h12010"];
	   }
	   if(incVal == 3) {
		   var outval = inData["h12004"] + inData["h12005"] + inData["h12011"] + inData["h12012"];
	   }
	   if(incVal == 4) {
		   var outval = inData["h12006"] + inData["h12007"] + inData["h12013"] + inData["h12014"];
	   }
	  } //1990

	  if(year == 2000){
		  if(incVal == 0) {
			 var outval = inData["h16001"];
		  }
	   if(incVal == 1) {
		   var outval = inData["h16003"] + inData["h16012"];
	   }
	   if(incVal == 2) {
		   var outval = inData["h16004"] + inData["h16005"] + inData["h16013"] + inData["h16014"];
	   }
	   if(incVal == 3) {
		   var outval = inData["h16006"] + inData["h16007"] + inData["h16015"] + inData["h16016"];
	   }
	   if(incVal == 4) {
		   var outval = inData["h16008"] + inData["h16009"] + inData["h16010"] + inData["h16017"] + inData["h16018"] + inData["h16019"];
	   }
	  } //2000

	  if(year == 2010){
		  if(incVal == 0) {
			 var outval = inData["h17001"];
		  }
	   if(incVal == 1) {
		   var outval = inData["h17003"] + inData["h17013"];
	   }
	   if(incVal == 2) {
		   var outval = inData["h17004"] + inData["h17005"] + inData["h17014"] + inData["h17015"];
	   }
	   if(incVal == 3) {
		   var outval = inData["h17006"] + inData["h17007"] + inData["h17008"] + inData["h17016"] + inData["h17017"] + inData["h17018"];
	   }
	   if(incVal == 4) {
		   var outval = inData["h17009"] + inData["h17010"] + inData["h17011"] + inData["h17019"] + inData["h17020"] + inData["h17021"];
	   }
	  } //2010
return(outval);
}

//housingSum  processes household project data  The order of the inputs is important. 1990, 2000, 2010, and SDO data
function housingSum(c1990, c2000, c2010, SDOForecast,geotype){


	//Census 1990
	var c1990data = [];
	c1990.data.forEach(el => {
		for(i = 0; i < 5; i++) {
			c1990data.push({
			   'fips' : geotype == 'state' ? parseInt(el.state) : parseInt(el.county),
			   'name' : geotype == 'state' ? 'Colorado' : countyName(parseInt(el.county)),
			    'age_group_id' : i,
			   'household_type_id' : 0,
			   'total_households' : sumhouseholds(1990, el,i),
			   "year" : 1990
			});
		}
	});		

	
	//Census 2000
	var c2000data = [];
	c2000.data.forEach(el => {
		for(i = 0; i < 5; i++) {
			c2000data.push({
			   'fips' : geotype == 'state' ? parseInt(el.state) : parseInt(el.county),
			    'name' : geotype == 'state' ? 'Colorado' : countyName(parseInt(el.county)),
			   'age_group_id' : i,
			   'household_type_id' : 0,
			   'total_households' : sumhouseholds(2000, el,i),
			   "year" : 2000
			});
		}
	});		
	
	//Census 2010
	var c2010data = [];
	c2010.data.forEach(el => {
		for(i = 0; i < 5; i++) {
			c2010data.push({
			   'fips' : geotype == 'state' ? parseInt(el.state) : parseInt(el.county),
			   'name' : geotype == 'state' ? 'Colorado' : countyName(parseInt(el.county)),
			    'age_group_id' : i,
			   'household_type_id' : 0,
			   'total_households' : sumhouseholds(2010, el,i),
			   "year" : 2010
			});
		}
	});		

	
	var SDOdata = [];
	SDOForecast.forEach(el => {
		SDOdata.push({
			   'fips' :  geotype == 'state' ? 8 : el.area_code,
			   'name' : geotype == 'state' ? 'Colorado' : countyName(el.area_code),
			   'age_group_id' : el.age_group_id,
			   'household_type_id' : el.household_type_id,
			   'total_households' : Math.round(parseFloat(el.total_households)),
			   "year" : el.year
		});
	})

	
var outData = c1990data.concat(c2000data, c2010data,SDOdata);

return(outData)
} //housingSum

//genRegEst Generates estimate plot for regions...
function genRegEst(inData,DDsel,estDiv) {
    const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
     
//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
  .sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
 

var pltData = pltSort.filter(d => fipsList.includes(d.fips));

 var est_data = [];
 var ctyNames;
 for(i = 0; i < fipsList.length; i++) {
  var filtPlot = pltData.filter(d => d.fips == fipsList[i]);
  var year_est_arr = filtPlot.map(d => d.year);
  var pop_est_arr = filtPlot.map(d => d.totalpopulation);
  est_data.push({x : year_est_arr,
                 y : pop_est_arr,
     name : filtPlot[0].name,
                 mode : 'lines+markers'});
  if(i == 0) {
   ctyNames = filtPlot[0].name;
  } else {
   if(i%4 == 0){
   ctyNames = ctyNames + ",<br>" + filtPlot[0].name; 
   } else {
   ctyNames = ctyNames + ", " + filtPlot[0].name;
   }
  }

 } //i

 var est_layout = {
  title: "Population Estimates " + year_est_arr[0] + " to " + year_est_arr[(year_est_arr.length - 1)] + ", " + ctyNames,
    autosize: false,
    width: 1000,
    height: 400, 
    xaxis: {
   title : 'Year',
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Total Population',
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat: ','
    },
   annotations : [annot('Data and Visualization by the Colorado State Demography Office.')]
  };
  
Plotly.newPlot(estDiv, est_data, est_layout,config);
//Download Events


var profileDat2 = document.getElementById('profileDat2');
var profileImg2 = document.getElementById('profileImg2');
profileDat2.onclick = function() {exportToCsv(ctyNames, 'estimate', pltData,0)};
profileImg2.onclick = function() {exportToPng(ctyNames, 'estimate', estDiv,0)};
 
}; //genRegEst   

//gerRegEstSetup sets up the regional estimates plot
function genRegEstSetup(level, inData, est_div, fipsList, ctyNameList) {

  pgSetup(level,"chart", est_div,"Regional Population Estimates",'popest',true,false,fipsList, ctyNameList, 0)

   //Initial Plot
    var dd = document.getElementById("RegSelect2");
   var btn = document.getElementById("RegBtn2");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genRegEst(inData,dd, "PlotDiv2");

   btn.addEventListener('click', function() {
    genRegEst(inData,dd, "PlotDiv2")
       });
    
};  //genRegEstSetup


//genRegFore Generates forecast plot for regions...
function genRegFore(inData,DDsel,forecDiv) {
    const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
     

//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
  .sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
 

var pltData = pltSort.filter(d => fipsList.includes(d.fips));

 var forec_data = [];
 var ctyNames;
 for(i = 0; i < fipsList.length; i++) {
  var filtPlot = pltData.filter(d => d.fips == fipsList[i]);
  var year_forec_arr = filtPlot.map(d => d.year);
  var pop_forec_arr = filtPlot.map(d => d.totalpopulation);
  forec_data.push({x : year_forec_arr,
                 y : pop_forec_arr,
     name : filtPlot[0].name,
                 mode : 'lines+markers'});
  if(i == 0) {
   ctyNames = filtPlot[0].name;
  } else {
   if(i%4 == 0){
   ctyNames = ctyNames + ",<br>" + filtPlot[0].name; 
   } else {
   ctyNames = ctyNames + ", " + filtPlot[0].name;
   }
  }

 } //i

 var forec_layout = {
  title: "Population Forecast " + year_forec_arr[0] + " to " + year_forec_arr[(year_forec_arr.length - 1)] + ", " + ctyNames,
    autosize: false,
    width: 1000,
    height: 400, 
    xaxis: {
   title : 'Year',
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Total Population',
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat: ','
    },
   annotations : [annot('Data and Visualization by the Colorado State Demography Office.')]
  };
  
Plotly.newPlot(forecDiv, forec_data, forec_layout,config);
//Download Events

var profileDat3 = document.getElementById('profileDat3');
var profileImg3 = document.getElementById('profileImg3');
profileDat3.onclick = function() {exportToCsv(ctyNames, 'forecast', pltData,0)};
profileImg3.onclick = function() {exportToPng(ctyNames, 'forecast', forecDiv,0)};
  
}; //genRegFore   

//genRegForeSetup sets up the regional forecast plot
function genRegForeSetup(level, inData, fore_div, fipsList, ctyNameList) {

  pgSetup(level,"chart",fore_div,"Regional Population Forecasts",'popfor', true,false,fipsList, ctyNameList, 0)

   //Initial Plot
    var dd = document.getElementById("RegSelect3");
   var btn = document.getElementById("RegBtn3");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genRegFore(inData,dd, "PlotDiv3");

   btn.addEventListener('click', function() {
    genRegFore(inData,dd, "PlotDiv3")
       });
    
};  //genRegForeSetup

//genRegcoc Generates coccast plot for regions...
function genRegcoc(inData,DDsel,cocDiv) {
    const fmt_date = d3.timeFormat("%B %d, %Y");
var config = {responsive: true,
              displayModeBar: false};
     
//Calculating Total Popuolation Change

 
//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }

var pltSort = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
  .sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
 

var pltData = pltSort.filter(d => fipsList.includes(d.fips));

//Components of Change


 var ctyNames;
 for(i = 0; i < fipsList.length; i++) {
  var filtPlot = pltData.filter(d => d.fips == fipsList[i]);
  //Fix for popchng
  for(j = 1; j < filtPlot.length; j++) {
    filtPlot[j].popchng = filtPlot[j].totalpopulation - filtPlot[j-1].totalpopulation;
  }
  var year_coc_arr = filtPlot.map(d => d.year);
  var pop_coc_arr = pltData.map(d => d.popchng);
        var birth_coc_arr = pltData.map(d => d.births);
        var death_coc_arr = pltData.map(d => d.deaths);
        var incr_coc_arr = pltData.map(d => d.naturalincrease);
        var migr_coc_arr = pltData.map(d => d.netmigration);

var coc_trace1 = { 
               x: year_coc_arr,
               y : pop_coc_arr,
      name : 'Total Population Change',
      mode : 'lines+markers',
       marker: {
                  color: 'black',
      symbol: 'circle',
                  size: 6
  },
  line: {
    color: 'black',
    width: 1
  }
   };
   
var coc_trace2 = { 
               x: year_coc_arr,
               y : birth_coc_arr,
      name : 'Births',
      mode : 'lines+markers',
       marker: {
                  color: 'blue',
      symbol: 'square',
                  size: 4
  },
  line: {
    color: 'plue',
 dash: 'dashdot',
    width: 1
  }
 };

var coc_trace3 = { 
               x: year_coc_arr,
               y : death_coc_arr,
      name : 'Deaths',
      mode : 'lines+markers',
       marker: {
                  color: 'purple',
      symbol: 'diamond',
                  size: 4
  },
  line: {
    color: 'purple',
 dash: 'dashdot',
    width: 1
  }
};

var coc_trace4 = { 
               x: year_coc_arr,
               y : migr_coc_arr,
      name : 'Net Migration',
      mode : 'lines+markers',
       marker: {
                  color: 'green',
      symbol: 'diamond',
                  size: 4
  },
  line: {
    color: 'green',
 dash: 'dashdot',
    width: 1
  }
  };
 
var coc_trace = [coc_trace1, coc_trace2, coc_trace3, coc_trace4]
  if(i == 0) {
   ctyNames = filtPlot[0].name;
  } else {
   if(i%4 == 0){
   ctyNames = ctyNames + ",<br>" + filtPlot[0].name; 
   } else {
   ctyNames = ctyNames + ", " + filtPlot[0].name;
   }
  }

 } //i

var yrvalue = year_coc_arr[year_coc_arr.length - 1];

var coc_layout = {
  title: "Births, Deaths and Net Migration 1985 to " + yrvalue + ", " + ctyNames,
    autosize: false,
    width: 1000,
    height: 400,
    xaxis: {
   title : 'Year',
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Population Change',
   automargin : true,
   showgrid: true,
   showline: true,
   zeroline : true,
   zerolinewidth: 4,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat: ','
    },
   annotations : [annot('Data and Visualization by the Colorado State Demography Office.')]
  };
  
Plotly.newPlot(cocDiv, coc_trace, coc_layout,config);
//Download Events

var profileDat4 = document.getElementById('profileDat4');
var profileImg4 = document.getElementById('profileImg4');
profileDat4.onclick = function() {exportToCsv(ctyNames, 'coc', pltData,0)};
profileImg4.onclick = function() {exportToPng(ctyNames, 'coc', cocDiv,0)};
  
}; //genRegcoc   

//genRegcocSetup sets up the regional components of Change plot
function genRegcocSetup(level, inData, coc_div, fipsList, ctyNameList) {

  pgSetup(level,"chart",coc_div,"Regional Components of Change",'popcoc',false,false,fipsList, ctyNameList, 0)

   //Initial Plot
    var dd = document.getElementById("RegSelect4");
   var btn = document.getElementById("RegBtn4");
   dd.selectedIndex = 0;
   var selvalue = [];
   selvalue.push(+dd.value);

   genRegcoc(inData,dd, "PlotDiv4");

   btn.addEventListener('click', function() {
    genRegcoc(inData,dd, "PlotDiv4")
       });
    
};  //genRegcocSetup


///genAgeEst Generates Age plot for regions...
function genAgeEst(inData,level, DDsel,ageDiv,yrvalue) {
 const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
var config = {responsive: true,
              displayModeBar: false};
     
//Generates the list of selected places  

var fipsList = [], opt;
if(level == "Region") {
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }
} else {
 fipsList = DDsel;
}

var year_data = [...new Set(inData.map(d => d.year))]; 
var pltData = inData.filter(d => fipsList.includes(d.fips) && d.year == year_data[0]);
var PlaceNames = [...new Set(pltData.map(d => d.name))];

    var ctyNames = [];
 var age_data = [];
 for(i = 0; i < PlaceNames.length; i++) {
  var filtPlot = pltData.filter(d => d.name == PlaceNames[i]);
  var age_est_arr = filtPlot.map(d => d.age_cat);
  var pct_est_arr = filtPlot.map(d => d.pct_totalpopulation_e);
   
  if(i == 0){
           ctyNames = PlaceNames[i];
  } else {
   ctyNames = ctyNames + ", " + PlaceNames[i];
  }
  // Mouseover description

  var pct_est_0d = filtPlot.map(d => PlaceNames[i] + " " + d.age_cat + '<br>Percent: ' + fmt_pct(d.pct_totalpopulation_e) + '<br>Persons: ' + fmt_comma(d.totalpopulation_e));

  if(level == "Municipality") {
   var pct_est_moe = filtPlot.map(d => d.pct_totalpopulation_m);
   var pct_est_0d = filtPlot.map(d => PlaceNames[i] + ' ' + d.age_cat + '<br>Percent: ' + fmt_pct(d.pct_totalpopulation_e) + ' ±' + fmt_pct(d.pct_totalpopulation_m) + '<br>Persons: ' + fmt_comma(d.totalpopulation_e) + ' ±' + fmt_comma(Math.ceil(d.totalpopulation_m)));
   age_data.push({x : age_est_arr,
                 y : pct_est_arr,
     error_y: {
      type: 'data',
      array: pct_est_moe,
      color: 'black',
      thickness: 0.75,
      visible: true
     },
     customdata : pct_est_0d,
     hovertemplate : '%{customdata}',
     hoverlabel : {namelength :0},
     name : PlaceNames[i],
                 type : 'bar'
     });
  } else {
     age_data.push({x : age_est_arr,
                 y : pct_est_arr,
     customdata : pct_est_0d,
     hovertemplate : '%{customdata}',
     hoverlabel : {namelength :0},
     name : PlaceNames[i],
                 type : 'bar'
     }); 
  }


 } //i
 
//Creating Source citation
if(level == "Municipality"){
 var yrrange = (yrvalue - 4) + "-"+ yrvalue;
 var citation = 'U.S. Census Bureau. ' + yrrange + ' American Community Survey, 5-year data file. Table B01001. Print Date: ' +  fmt_date(new Date); 
} else {
 var citation = 'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date);
}

if(PlaceNames.length == 1){
  var PltTitle = "Age Estimates, " + year_data[0] + ": " + PlaceNames[0];
} else {
  var PltTitle = "Age Estimates: " + year_data[0];
}  
 var age_layout = {
  title: PltTitle,
    width: 1000,
    height: 400, 
    barmode : 'group',
    xaxis: {
   title : 'Age Group',
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Percent',
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat:  '.1%'
    },
   annotations : [ annot(citation)]
  };
 Plotly.newPlot(ageDiv, age_data, age_layout,config);

//Download Events

var profileDat2 = document.getElementById('profileDat2');
var profileImg2 = document.getElementById('profileImg2');
profileDat2.onclick = function() {exportToCsv(ctyNames, 'ageest', pltData,0)};
profileImg2.onclick = function() {exportToPng(ctyNames, 'ageest', ageDiv,0)};
 
}; //genAgeEst   

///genAgeFor Generates Age plot for regions...
function genAgeFor(inData,level, DDsel,ageDiv) {
 const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");

var config = {responsive: true,
              displayModeBar: false};
     
var fipsList = [], opt;
if(level == "Region") {
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }
} else {
 fipsList = DDsel;
}
var year_data = [...new Set(inData.map(d => d.year))]; 
var pltData = inData.filter(d => fipsList.includes(d.fips) && d.year == year_data[1]);
var PlaceNames = [...new Set(pltData.map(d => d.name))];

    var ctyNames = [];
 var age_data = [];

 for(i = 0; i < PlaceNames.length; i++) {
  var filtPlot = pltData.filter(d => d.name == PlaceNames[i]);
  var age_for_arr = filtPlot.map(d => d.age_cat);
  var pct_for_arr = filtPlot.map(d => d.pct_totalpopulation_e);
  var pct_for_0d = filtPlot.map(d => PlaceNames[i] + " " + d.age_cat + '<br>Percent: ' + fmt_pct(d.pct_totalpopulation_e) + '<br>Persons: ' + fmt_comma(d.totalpopulation_e));
  if(i == 0){
           ctyNames = PlaceNames[i];
  } else {
   ctyNames = ctyNames + ", " + PlaceNames[i];
  }

  age_data.push({x : age_for_arr,
                 y : pct_for_arr,
     customdata : pct_for_0d,
     hovertemplate : '%{customdata}',
     hoverlabel : {namelength :0},
     name : PlaceNames[i],
                 type : 'bar'
     });
 } //i

 
if(PlaceNames.length == 1){
  var PltTitle = "Age Forecast, " + year_data[1] + ": " + PlaceNames[0];
} else {
  var PltTitle = "Age Forecast: " + year_data[1];
}  
 var age_layout = {
  title: PltTitle,
    autosize: false,
    width: 1000,
    height: 400, 
    barmode : 'group',
    xaxis: {
   title : 'Age Group',
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Percent',
   range :[0, 0.75],
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat:  '.1%'
    },
   annotations : [annot('Data and Visualization by the Colorado State Demography Office.')]
  };
 Plotly.newPlot(ageDiv, age_data, age_layout,config);

//Download Events

var profileDat3 = document.getElementById('profileDat3');
var profileImg3 = document.getElementById('profileImg3');
profileDat3.onclick = function() {exportToCsv(ctyNames, 'agefor', pltData,0)};
profileImg3.onclick = function() {exportToPng(ctyNames, 'agefor', ageDiv,0)};
 
}; //genAgeFor

//genAgePyr  Generates age Pramid
function genAgePyr(inData,level,DDsel,ageDiv, yrvalue){
const fmt_date = d3.timeFormat("%B %d, %Y");
const fmt_pct = d3.format(".1%");
const fmt_comma = d3.format(",");

var config = {responsive: true,
              displayModeBar: false};
     
var fipsList = [], opt;
if(level == "Region") {
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }
} else {
 fipsList = DDsel;
}

var year_data = [...new Set(inData.map(d => d.year))]; 
var age_arr = [...new Set(inData.map(d => d.age_cat))];
var ctyNames = [...new Set(inData.map(d => d.name))];

//assigning main div

 var outdiv = document.getElementById(ageDiv);
 outdiv.innerHTML = "";      
  var plotdiv = document.createElement('div');
   plotdiv.id = 'pyramid-container';
   plotdiv.className = 'pyramid-continer';
  outdiv.appendChild(plotdiv);
  

 var plot_array = [];  
 for(i= 0; i < fipsList.length; i++){
    //Creating plotdiv
  if(i < 3) {
   var divID = "grid-item .pyramid_1_" + (i + 1);
     } else {
  if(i < 6){
  var divID = "grid-item .pyramid_2_" + (i + 1); 
  } else {
   var divID = "grid-item .pyramid_3_" + (i + 1);
  }
  };
   
     var plot_grid = document.createElement('div');
  plot_grid.id = 'plotGrid'+i;
  plot_grid.className = divID;
  plotdiv.appendChild(plot_grid);
  
 plot_array.push({'loc' : ctyNames[i],
 'fName' : "Age Pyramid " + ctyNames[i] + ".png",
 'plot' : 'plotGrid'+i});
 } //i
 
var outData = [];
 if(level == "Municipality"){
 var yrrange = (yrvalue - 4) + "-"+ yrvalue;
  for(i = 0; i < fipsList.length; i++) {
 var outPlot = plot_array[i].plot;
 var pltData = inData.filter(d => d.fips == fipsList[i]);
 var year0 = pltData.filter(d => d.year == year_data[0]);
 outData = outData.concat(pltData);
//Determine number of ticks

var male_pct = year0.map(d => d.pct_malepopulation_e);
var male_pct_moe = year0.map(d => d.pct_malepopulation_m);
var male_sum = [];
for(j = 0; j < male_pct.length; j++){
    male_sum.push( male_pct[j] + male_pct_moe[j] );
 }

var female_pct = year0.map(d => d.pct_femalepopulation_e);
var female_pct_moe = year0.map(d => d.pct_femalepopulation_m);
var female_sum = [];
for(j = 0; j < female_pct.length; j++){
    female_sum.push( female_pct[j] + female_pct_moe[j] );
 }

var pct = male_sum.concat(female_sum);
var max_pct = Math.max(...pct);
var adj_pct = Math.ceil(max_pct/0.05)*0.05;
var rnd_pct = Number(adj_pct.toFixed(2));

var tick_range = [(rnd_pct * -1), rnd_pct];
if(rnd_pct >0.3) {
 var tick_neg = range((rnd_pct * -1),0,.10)
 var tick_pos = range(0,rnd_pct, .10)
} else {
 var tick_neg = range((rnd_pct * -1),0,.05)
 var tick_pos = range(0,rnd_pct, .05)
}

if(tick_neg.includes(-0)) {tick_neg.pop()};

if(!tick_neg.includes(tick_range[0])) {tick_neg.unshift((rnd_pct * -1))}
if(!tick_pos.includes(tick_range[1])) {tick_pos.push(rnd_pct)}

var tick_val = tick_neg.concat(tick_pos);
var tick_text = [];
for(j = 0; j < tick_val.length; j++){
  if(tick_val[j] < 0) {
   tick_text.push((tick_val[j] * -100) + "%");
  } else {
   tick_text.push((tick_val[j] * 100) + "%");
  }
}

 var pct_male_0 = year0.map(d => d.pct_malepopulation_e * -1);
 var pct_male_moe = year0.map(d => d.pct_malepopulation_m * -1);
 var pct_male_0d = year0.map(d => 'Men' + ' ' + year_data[0] + " " + d.age_cat + '<br>Percent: ' + fmt_pct(d.pct_malepopulation_e) + ' ±' + fmt_pct(d.pct_malepopulation_m) + '<br>Persons: ' + fmt_comma(d.malepopulation_e) + ' ±' + fmt_comma(Math.ceil(d.malepopulation_m)));
 var pct_female_0 = year0.map(d => d.pct_femalepopulation_e);
 var pct_female_moe = year0.map(d => d.pct_femalepopulation_m);
 var pct_female_0d = year0.map(d => 'Women' + ' ' + year_data[0] + " " + d.age_cat + '<br>Percent: ' + fmt_pct(d.pct_femalepopulation_e) + ' ±' + fmt_pct(d.pct_femalepopulation_m) + '<br>Persons: ' + fmt_comma(d.femalepopulation_e) + ' ±' + fmt_comma(Math.ceil(d.femalepopulation_m)));
  
 trace1 = {
   name: year_data[0], 
   showlegend : true,
   type: 'bar', 
   x: pct_male_0,
   y: age_arr, 
   error_x: {
  type: 'data',
  array: pct_male_moe,
  color: 'black',
        thickness: 0.75,
  visible: true
     },
   customdata : pct_male_0d,
   hovertemplate : '%{customdata}',
   hoverlabel : {namelength :0},
   marker: {
  color : 'lightblue',
  opacity : 0.5,
  line: {
    opacity : 1,
    color: 'black',
    width: 2
   } }, 
   orientation: 'h'
 };
 trace2 = {
   name: year_data[0], 
   type: 'bar', 
   showlegend : false, 
   x: pct_female_0,
   y: age_arr,
   error_x: {
   type: 'data',
   array: pct_female_moe,
   color: 'black',
   thickness: 0.75,
   visible: true
  },
   customdata : pct_female_0d,
   hovertemplate : '%{customdata}',
   hoverlabel : {namelength :0},
   marker: {
  color : 'lightblue',
  opacity : 0.5,
  line: {
    opacity : 1,
    color: 'black',
    width: 2
   } }, 
   orientation: 'h'
 };

 
 var pyr_data = [trace1, trace2];
 
 var pyr_layout = {
 title: "Age by Sex, " + year_data[0] + '<br>' + ctyNames[i],
   width: 600,
   height: 400, 
   barmode :'overlay',
   bargap : 0.0,
   xaxis: {
  range : tick_range,
  tickvals : tick_val,
  ticktext : tick_text,
  showgrid: true,
  zeroline: true,
  showline: true,
  mirror: 'ticks',
  gridcolor: '#bdbdbd',
  gridwidth: 2,
  linecolor: 'black',
  linewidth: 2,
  tickformat:  '.1%'
   },
   yaxis: {
  title : 'Age Group',
  automargin : true,
  showgrid: false,
  showline: false,
  tickvals : age_arr,
  mirror: 'ticks',
  gridcolor: '#bdbdbd',
  gridwidth: 2,
  linecolor: 'black',
  linewidth: 2,
   },
  annotations : [
  {text :  'Men          Women' , 
    font: {
    size : 7,
    color: 'black'
      },
     xref : 'paper',  
     x : 0.5, 
     yref : 'paper', 
     y : -0.30, 
     align : 'center', 
     font : { size : 14},
     showarrow : false},
     {text :  'U.S. Census Bureau. ' + yrrange + ' American Community Survey, 5-year data file.<br>Table B01001. Print Date: ' +  fmt_date(new Date),
     xref : 'paper', 
     x : 0, 
     yref : 'paper', 
     y : -0.37, 
     align : 'left', 
     showarrow : false}]
 };
 Plotly.newPlot(outPlot, pyr_data, pyr_layout,config);

  } //i
  
 var profileDat4 = document.getElementById('profileDat4');
 var profileImg4 = document.getElementById('profileImg4');
 profileDat4.onclick = function() {exportToCsv(ctyNames, 'agepyr', outData,0)};
 profileImg4.onclick = function() {exportToPng(ctyNames, 'agepyr', plot_array,0)}; 
 
} else {

 for(i = 0; i < fipsList.length; i ++ ){

 var outPlot = 'plotGrid'+i; 
    
  var pltData = inData.filter(d => d.fips == fipsList[i]);
  
  outData = outData.concat(pltData);

  var ctyNames = [...new Set(pltData.map(d => d.name))]; 
 
 var year0 = pltData.filter(d => d.year == year_data[0]);
 var year1 = pltData.filter(d => d.year == year_data[1]); 

 var pct_male_0 = year0.map(d => d.pct_malepopulation_e * -1);
 var pct_male_0d = year0.map(d => 'Men ' + d.age_cat + ' ' + year_data[0] + '<br>Percent: ' + fmt_pct(d.pct_malepopulation_e) + '<br>Persons: ' + fmt_comma(d.malepopulation_e));
 var pct_female_0 = year0.map(d => d.pct_femalepopulation_e);
 var pct_female_0d = year0.map(d => 'Women ' + d.age_cat + ' ' + year_data[0] + '<br>Percent: ' + fmt_pct(d.pct_femalepopulation_e) + '<br>Persons: ' + fmt_comma(d.femalepopulation_e));
  
 var pct_male_1 = year1.map(d => d.pct_malepopulation_e * -1);
 var pct_male_1d = year1.map(d => 'Men ' + d.age_cat + ' ' + year_data[1] + '<br>Percent: ' + fmt_pct(d.pct_malepopulation_e) + '<br>Persons: ' + fmt_comma(d.malepopulation_e));
 var pct_female_1 = year1.map(d => d.pct_femalepopulation_e);
 var pct_female_1d = year1.map(d => 'Women ' + d.age_cat + ' ' + year_data[1] + '<br>Percent: ' + fmt_pct(d.pct_femalepopulation_e) + '<br>Persons: ' + fmt_comma(d.femalepopulation_e));
    
 trace1 = {
   name: year_data[0], 
   showlegend : true,
   type: 'bar', 
   x: pct_male_0,
   y: age_arr, 
   customdata : pct_male_0d,
   hovertemplate : '%{customdata}',
   hoverlabel : {namelength :0},
   marker: {
  color : 'white',
  line: {
    opacity : 1,
    color: 'black',
    width: 2
   } }, 
   orientation: 'h'
 };
 trace2 = {
   name: year_data[0], 
   type: 'bar', 
   showlegend : false, 
   x: pct_female_0,
   y: age_arr, 
   customdata : pct_female_0d,
   hovertemplate : '%{customdata}',
   hoverlabel : {namelength :0},
   marker: {
  color : 'white',
  line: {
    opacity : 1,
    color: 'black',
    width: 2
   } }, 
   orientation: 'h'
 };
 trace3 = {
   name: year_data[1], 
   showlegend : true,
   type: 'bar', 
   x: pct_male_1, 
   y: age_arr, 
   customdata : pct_male_1d,
   hovertemplate : '%{customdata}',
   hoverlabel : {namelength :0},
    marker: {
     color : 'lightblue',
     opacity : 0.5,
  line: {
    opacity : 1,
    color: 'black',
    width: 2
    } }, 
   orientation: 'h'
 };
 trace4 = {
   name: year_data[1], 
   type: 'bar', 
   showlegend : false,
   x: pct_female_1, 
   y: age_arr, 
   customdata : pct_female_1d,
   hovertemplate : '%{customdata}',
   hoverlabel : {namelength :0},
    marker: {
     color : 'lightblue',
     opacity : 0.5,
  line: {
    opacity : 1,
    color: 'black',
    width: 2
    } }, 
   orientation: 'h'
 };
 
 var pyr_data = [trace1, trace2, trace3, trace4];
 
 var pyr_layout = {
 title: "Age by Sex, " + year_data[0] + ' and ' + year_data[1] + '<br>' + ctyNames[0],
   width: 600,
   height: 400, 
   barmode :'overlay',
   bargap : 0.0,
   xaxis: {
  range :[-0.15, 0.15],
  tickvals : [-.15, -.10, -.05,0, .05,.10,.15],
  ticktext : ['15%','10%', '5%', '0%', '5%','10%','15%'],
  showgrid: true,
  zeroline: true,
  showline: true,
  mirror: 'ticks',
  gridcolor: '#bdbdbd',
  gridwidth: 2,
  linecolor: 'black',
  linewidth: 2,
  tickformat:  '.1%'
   },
   yaxis: {
  title : 'Age Group',
  automargin : true,
  showgrid: false,
  showline: false,
  tickvals : age_arr,
  mirror: 'ticks',
  gridcolor: '#bdbdbd',
  gridwidth: 2,
  linecolor: 'black',
  linewidth: 2,
   },
  annotations : [
  {text :  'Men          Women' , 
   xref : 'paper',  
     x : 0.5, 
     yref : 'paper', 
     y : -0.30, 
     align : 'center', 
     font : { size : 14},
     showarrow : false},
     {text :  'Data and Visualization by the Colorado State Demography Office.Print Date: ' +  fmt_date(new Date) , 
         font: {
    size : 7,
    color: 'black'
      },
   xref : 'paper', 
     x : 0, 
     yref : 'paper', 
     y : -0.37, 
     align : 'left', 
     showarrow : false}]
 };
 Plotly.newPlot(outPlot, pyr_data, pyr_layout,config);
 } //i

 var profileDat4 = document.getElementById('profileDat4');
 var profileImg4 = document.getElementById('profileImg4');
 profileDat4.onclick = function() {exportToCsv(ctyNames, 'agepyr', outData,0)};
 profileImg4.onclick = function() {exportToPng(ctyNames, 'agepyr', plot_array,0)};
} //region and county
} //genAgePyr 

//genAgeSetup sets up the regional estimates plot
function genAgeSetup(level, inData, pyrData, age_div0, age_div1, age_div2, age_div3, fipsList, ctyNameList, yrvalue) {
 document.getElementById(age_div0).innerHTML = "";
 document.getElementById(age_div1).innerHTML = "";
 document.getElementById(age_div2).innerHTML = "";
 document.getElementById(age_div3).innerHTML = "";
 
var bkmarkArr = [{title : 'Population Estimates by Age', id : 'age01'},
	{title: 'Population Forecasts by Age', id : 'age02'},
	{title : 'Population Age Pyramids', id : 'age03'}
 ]

var bkmarkArrMuni = [{title : 'Population Estimates by Age', id : 'age01'},
	{title : 'Population Age Pyramids', id : 'age03'}
 ]

if(level == "Region") { 
insertBkmark(bkmarkArr)
  //Add a second chart div here
  pgSetup(level,"chart",age_div1,bkmarkArr[0],true,false,fipsList, ctyNameList, 0);
  var chartdiv_1 = document.createElement('div')
  chartdiv_1.id = 'AgeChart1'
  var chdiv_a = document.getElementById(age_div1)
  chdiv_a.appendChild(chartdiv_1)
  
  pgSetup(level,"chart",age_div2,bkmarkArr[1],true,false,fipsList, ctyNameList, 0);
  var chartdiv_2 = document.createElement('div')
  chartdiv_2.id = 'AgeChart2'
  var chdiv_b = document.getElementById(age_div2)
  chdiv_b.appendChild(chartdiv_2)
  
  pgSetup(level,"chart",age_div3,bkmarkArr[2],true,false,fipsList, ctyNameList, 0);
  var chartdiv_3 = document.createElement('div')
  chartdiv_3.id = 'AgeChart3'
  var chdiv_c = document.getElementById(age_div3)
  chdiv_c.appendChild(chartdiv_3)
} 

if(level == 'County'){  
insertBkmark(bkmarkArr)
 pgSetup(level,"chart",age_div1,bkmarkArr[0],true,false, fipsList, ctyNameList,0 )
  //Add a second chart div here
  var chartdiv_1 = document.createElement('div')
  chartdiv_1.id = 'AgeChart1'
  var chdiv_a = document.getElementById(age_div1)
  chdiv_a.appendChild(chartdiv_1)
  
  pgSetup(level,"chart",age_div2,bkmarkArr[1],true,false,fipsList, ctyNameList, 0);
  var chartdiv_2 = document.createElement('div')
  chartdiv_2.id = 'AgeChart2'
  var chdiv_b = document.getElementById(age_div2)
  chdiv_b.appendChild(chartdiv_2)
  
  pgSetup(level,"chart",age_div3,bkmarkArr[2],true,false,fipsList, ctyNameList, 0);
  var chartdiv_3 = document.createElement('div')
  chartdiv_3.id = 'AgeChart3'
  var chdiv_c = document.getElementById(age_div3)
  chdiv_c.appendChild(chartdiv_3)
}

if(level == "Municipality"){
	insertBkmark(bkmarkArrMuni)
pgSetup(level,"chart",age_div1,bkmarkArrMuni[0],true,false,fipsList, ctyNameList, yrvalue)
  //Add a second chart div here
  var chartdiv_1 = document.createElement('div')
  chartdiv_1.id = 'AgeChart1'
  var chdiv_a = document.getElementById(age_div1)
  chdiv_a.appendChild(chartdiv_1)
  
  pgSetup(level,"chart",age_div3,bkmarkArr[1],true,false,fipsList, ctyNameList,yrvalue);
  var chartdiv_3 = document.createElement('div')
  chartdiv_3.id = 'AgeChart3'
  var chdiv_c = document.getElementById(age_div3)
  chdiv_c.appendChild(chartdiv_3)
}

   

  if(level == "Region"){
   var dd0 = document.getElementById("RegSelect2");
   var btn0 = document.getElementById("RegBtn2");
   var selopts = "0,-101";
   $.each(selopts.split(","), function(i,e){
          $("#RegSelect2 option[value='" + e + "']").prop("selected", true);
       }); 
    
   genAgeEst(inData,level,dd0, chartdiv_1.id,0);
   genAgeFor(inData,level,dd0, chartdiv_2.id,0);
   genAgePyr(pyrData,level,dd0, chartdiv_3.id,0);
   
   btn0.addEventListener('click', function() {
    genAgeEst(inData,level, dd0, chartdiv_1.id,0)
    genAgeFor(inData,level,dd0, chartdiv_2.id,0);
    genAgePyr(pyrData,level,dd0, chartdiv_3.id,0);
       });
  
  } 
 if(level == "County"){ 
   genAgeEst(inData,level,fipsList, chartdiv_1.id,0);
   genAgeFor(inData,level, fipsList, chartdiv_2.id,0);
   genAgePyr(pyrData,level,fipsList, chartdiv_3.id,0);
  };

if(level == "Municipality"){ 
   genAgeEst(inData,level,fipsList, chartdiv_1.id,yrvalue);
   genAgePyr(pyrData,level,fipsList, chartdiv_3.id,yrvalue);
  };
    
};  //genAgeSetup

//profileContent provides descriptive names for checked profile boxes...
function profileContent(invalue) {
 var outname;
 switch(invalue) {
 case "sel1" :
   outname = "Basic Statistics";
   break;
 case "sel2":
    outname = "Population Trends";
    break;
 case "sel3" :
    outname = "Population Characteristics: Age";
    break;
 case "sel4" :
    outname = "Population Characteristics: Income, Education and Race";
    break;
 case "sel5" :
    outname = "Housing and Households";
    break;
 case "sel6" : 
  outname = "Commuting and Job Growth";
  break;
 case "sel7" :
  outname = "Employment by Industry";
  break;
 case "sel8" :
  outname = "Employment Forecast and Wage Information";
  break;
 }
 return(outname);
}; //end of profileContent

//function insertBkmark  Insert bookmarks on main page
function insertBkmark(inArr){


//Check if sectLink exists
   if(!!document.getElementById("sectLink")) {
	  bkDiv = document.getElementById('sectLink');
	  bkDiv.innerHTML = "";
   } else {
	  var proList = document.getElementById('pro-list');
      var bkDiv = document.createElement("div");
      bkDiv.setAttribute('id', 'sectLink');
	  proList.after(bkDiv)
}
   
inArr.forEach(bklink =>{
	var a = document.createElement('a');
      var linkText = document.createTextNode(" | " + bklink.title);
      a.appendChild(linkText);
      a.title = bklink.title;
      a.href = "#" + bklink.id;
      bkDiv.appendChild(a);
})



} //insertBkmark

//Community Profile Functions


//selGeo selects Municipalities and CDPs formatting in sel1 of profile
function selGeo(fipsArr,ctyData,type){
 
  const regList = ['Region', 'Regional Comparison'];
  const ctyList = ['County', 'County Comparison'] 

  if(ctyList.includes(type) || regList.includes(type)) {
  var chkval =  ctyData.properties.COUNTYFP;
  } else {
     var ckkval = ctyData.placefp; 
  };
 if (regList.includes(type)) {
  var regFips = regionCOL(fipsArr);
  return (regFips[0].fips.includes(chkval));
   } else {
      return (fipsArr.includes(chkval));
   }
}
//end selGeo

//selColor  Sets fill color for counties and regions
function selColor(fipsArr,names,ctyData,type){
 var outColor = '#FFFFFF';
 var chkval =  ctyData.properties.COUNTYFP;
var regList = ['Region', 'Regional Comparison'];

if(regList.includes(type)){
 for(i = 0; i < fipsArr.length; i ++){
   var regionSel = regionCOL(fipsArr[i]);
    var regFips = regionSel[0].fips;
    var regColor = regionSel[0].color;
    if(regFips.includes(chkval)) {outColor = regColor;};
   }
} else {
 if(fipsArr.includes(chkval)){
  outColor = '#008000';
 };
};
return outColor;
};
//end of selColor


//calcpopGR calculates population table entries for profile  dat
function calcpopGR(inData,fipsArr,type, yrVal) {
   var outtab = []; //This array contains all entries for all years
   var geog, name, year1, est1, year2, est2, popch, gr;
   
    var regList = ['Region', 'Regional Comparison']; 
   var ctyList = ['County', 'County Comparison'];
    var muniList = ['Municipality', 'Municipal Comparison'];

    if(type == 'state'){
	   for(i = 0; i < inData.length; i++){
        outtab.push({'fips' : 8, 'name' : 'Colorado', 'year' : inData[i].year,  'estimate' : parseInt(inData[i].estimate)});
       };
   };
   
   if(regList.includes(type)){
   
   for(i = 0; i < fipsArr.length; i++) {
      var tmp_l = regionCOL(parseInt(fipsArr[i]));
   var tmp_list = [];
   for(j = 0; j < tmp_l[0].fips.length; j++) {
    tmp_list.push(parseInt(tmp_l[0].fips[j]));
   }
      var cty_filt = inData.filter(function(d) {return (tmp_list.includes(d.countyfips));});
      var cty_data  = [];
   for(k = 0; k < cty_filt.length; k++){
    cty_data.push({'fips' : cty_filt[k].countyfips, 'name' : countyName(cty_filt[k].countyfips), 'year' : cty_filt[k].year, 'estimate' : parseInt(cty_filt[k].estimate)});
   }
   //Rollup
         var reg_sum = d3.rollup(cty_data, v => d3.sum(v, d => d.estimate), d => d.year);   
   
   //Flatten
   var region_data = [];
  for (let [key, value] of reg_sum) {
    region_data.push({ fips: -100 - parseInt(fipsArr[i]), 'name' : regionName(parseInt(fipsArr[i])), 'year' : key, 'estimate' : value});
   };

   var reg_cty = region_data.concat(cty_data);
   outtab = outtab.concat(reg_cty);
   }
   };
  
    if(ctyList.includes(type)){
      for(i = 0; i < inData.length; i++){
     outtab.push({'fips' : inData[i].countyfips, 'name' : countyName(inData[i].countyfips), 'year' : inData[i].year, 'estimate' : parseInt(inData[i].estimate)});
   };
   };
   if(muniList.includes(type)){
   if(inData.length > 2){
    //extracting Multi County Places
    var tmpData = inData.filter(function(d) {return d.municipalityname.includes('(Total)');});
    if(tmpData.length != 0){
        var remData = inData.filter(function(d) {return d.placefips != tmpData[0].placefips;});
     tmpData = tmpData.concat(remData);
    } else {
     var tmpData = inData;
    };
   } else {    
      var tmpData = inData; 
   };
      for(i = 0; i < tmpData.length; i++){
     outtab.push({'fips' : tmpData[i].placefips, 'name' : muniName(tmpData[i].placefips), 'year' : tmpData[i].year,  'estimate' : parseInt(tmpData[i].totalpopulation)});
   };

   };   
 
 //Selecting out geographies  

//Creating output table  This works for two years need to define a solution for multiple years....

var output = [];
var uniqyr = [...new Set(outtab.map(d => d.year))];
var yr1 = uniqyr[0];
var yr2 = uniqyr[1];
var uniqids = [...new Set(outtab.map(d => d.fips))];
for(i = 0; i < uniqids.length; i++) {
 var id = outtab.filter(d => d.fips == uniqids[i]);
 var est1 = id[0].estimate;
 var est2 = id[1].estimate;
 var numdiff = est2 - est1;
 var pctdiff = numdiff/est1;
    output.push({'fips' : id[0].fips, 'name' : id[0].name, 'yr1' : est1, 'yr2' : est2, 'popch' : numdiff, 'growth' : pctdiff});
}


 return output;
}; //End calcpopGR

//procMedian  Gathers and calculates regional median income or house value from ACS records in genSel1Tab returns regiion and county table
function procMedian(inData,fipsArr,est, moe, names){

var fipsnum;
var medvalue = [];

//prepping data
for(i = 0; i < inData.length; i++) {
 
 if(est == 'B19013_001E'){  //Median income
     medvalue.push({'fips' : inData[i].GEO2, 'name' : inData[i].NAME, 'est' : inData[i].B19013_001E, 'moe' : inData[i].B19013_001M});
 };
 if(est == 'B25077_001E'){  //Median home value
     medvalue.push({'fips' : inData[i].GEO2, 'name' : inData[i].NAME, 'est' : inData[i].B25077_001E, 'moe' : inData[i].B25077_001M});
 };
 };  //i loop

//Calculating regional median and adding to output data set...

 var med_out = [];
 var regionDat = [];
   var estArr = [];
  var moeArr = [];
  for(l = 0; l < medvalue.length; l++){
     estArr.push(medvalue[l].est);
	 moeArr.push(medvalue[l].moe);
   };    
  var estrange = d3.extent(estArr);
  var medestVal = (estrange[1] + estrange[0])/2;
  var moerange = d3.extent(moeArr);
  var medmoeVal = (moerange[1] + moerange[0])/2;
  var regionNumber = -101;
  var regionNam = regionName(fipsArr[0]);
  regionDat.push({'fips' : regionNumber, 'name' : regionNam, 'est' : medestVal, 'moe' : medmoeVal});
    
  var med_out = regionDat.concat(medvalue);
 
  return med_out;
}; //end of procMedian

//procPCT Generates percentages from ACS data
function procPCT(inData,fipsArr, stub,geog,names){

var rawvalue = [];
 const regList = ['Region', 'Regional Comparison'];
 

for(i = 0; i < inData.length; i++) {
 if(stub == 'B17001'){  //Poverty
     rawvalue.push({'fips' : geog == 'state' ? inData[i].GEO1 : inData[i].GEO2, 
	                'name' : inData[i].NAME, 
					'num_est' : inData[i].B17001_002E,
					'num_moe' : Math.pow(inData[i].B17001_002M,2),
					'dem_est' :inData[i].B17001_001E,
					'dem_moe' : Math.pow(inData[i].B17001_001M,2)
	              })
 };
 if(stub == 'B05002'){  //Native Colorado
 
    rawvalue.push({'fips' : geog == 'state' ? inData[i].GEO1 : inData[i].GEO2, 
	                'name' : inData[i].NAME, 
					'num_est' : inData[i].B05002_003E,
					'num_moe' : Math.pow(inData[i].B05002_003M,2),
					'dem_est' :inData[i].B05002_001E,
					'dem_moe' : Math.pow(inData[i].B05002_001M,2)
	              })
 };
}; //i

 
if(regList.includes(geog)){
 var reg_sum = [] 
 var columnsToSum = ['num_est', 'num_moe', 'dem_est','dem_moe']
 var reg_tmp =  d3.rollup(rawvalue, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => d[col])])))
 reg_sum.push({'fips' : -101, 'name' : names[0], 'num_est' : reg_tmp.num_est, 'num_moe' : reg_tmp.num_moe, 'dem_est' : reg_tmp.dem_est, 'dem_moe' : reg_tmp.dem_moe})

  rawvalue = reg_sum.concat(rawvalue)
};

var pct_out = [];
for(i = 0; i < rawvalue.length; i++){
	pct_out.push({
	    'fips' : rawvalue[i].fips, 
		'name' : rawvalue[i].name,
		'num_est' : rawvalue[i].num_est,
		'num_moe' : Math.sqrt(rawvalue[i].num_moe),
		'dem_est' : rawvalue[i].dem_est,
		'dem_moe' :Math.sqrt(rawvalue[i].dem_moe),
		'pct_est' :  rawvalue[i].num_est/rawvalue[i].dem_est,
		'pct_moe' : acsPctMOE(rawvalue[i].dem_est,Math.sqrt(rawvalue[i].dem_moe),(rawvalue[i].num_est/rawvalue[i].dem_est),Math.sqrt(rawvalue[i].num_moe))
	})
} //i

return(pct_out);
    }; //end of procPCT

//regCombine Combines regional comparisons data
function regCombine(regData,ctyData) {

 var outData = [];
 for(i = 0; i < regData.length; i++){
  var seldata = regData[i];
  if(regData[i].name == 'Colorado') {   
   outData.push(seldata);
  } else {
   outData.push(seldata);
   var selRegion = regionCOL(seldata.name);
   var regFips = selRegion[0].fips;
   for(j = 0; j < regFips.length;j++){
     regFips[j] = parseInt(regFips[j]);
   };
   var tmpData = ctyData.filter(function(d) {return regFips.includes(d.geography);});
   for(k = 0; k < tmpData.length; k++){
    outData.push(tmpData[k]);
   };
  }; 
 };
return outData;
};

//dlmap Downloads the  sel 1 Map
function dlMap(){

   var descript = document.getElementById('profile-content1')
   var descriptTxt = descript.childNodes[1].textContent;
   var fnTxt = descriptTxt.replace("Basic", " Basic");
   var outFileName = fnTxt + ".png";

    var count_node = d3.select(descript).select("svg").node();
 count_node.setAttribute("viewBox", "0 0 925 500");
 saveSvgAsPng(count_node, outFileName);
};
//AddProfileBtns  Adds the download buttons and images to the DOM
function AddProfileBtns(divname,btnprefix) {

var btnDiv = divname;
var newDiv = document.createElement('div');
 newDiv.className = 'dropdown AClass';
var dlBtn = document.createElement('button');
 dlBtn.setAttribute('id', btnprefix);
 dlBtn.className = 'dropbtn';
var btnImg = document.createElement('i');
 btnImg.className = 'fas fas fa-download fa-2x'
 btnImg.style.color = 'black';
var btnDiv2 = document.createElement('div');
 btnDiv2.className = 'dropdown-content';

var linkpng = document.createElement('a');
 linkpng.setAttribute('href','#');
 linkpng.setAttribute('id', btnprefix + '_png');
 linkpng.setAttribute('onclick','dlMap();');
 linkpng.innerHTML = 'Download Image (PNG)';
 
var linkpdf = document.createElement('a');
 linkpdf.setAttribute('href','#');
 linkpdf.setAttribute('id', btnprefix + '_pdf');
 linkpdf.innerHTML = 'Download Full Report (pdf)';



dlBtn.appendChild(btnImg);

btnDiv2.appendChild(linkpng);

newDiv.appendChild(dlBtn);
newDiv.appendChild(btnDiv2);

btnDiv.appendChild(newDiv);

};

//Functions to export d3 SVG to PNG for eventual download  http://bl.ocks.org/Rokotyan/0556f8facbaf344507cdc45dc3622177
// Below are the functions that handle actual exporting:
// getSVGString ( svgNode ) and svgString2Image( svgString, width, height, format, callback )
function getSVGString( svgNode ) {

 svgNode.setAttribute('xmlns','http://www.w3.org/2000/svg');
 svgNode.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
 var cssStyleText = getCSSStyles( svgNode );
 appendCSS( cssStyleText, svgNode );

 var serializer = new XMLSerializer();
 var svgString = serializer.serializeToString(svgNode);
 svgString = svgString.replace(/(\w+)?:?xlink=/g, 'xmlns:xlink='); // Fix root xlink without namespace
 svgString = svgString.replace(/NS\d+:href/g, 'xlink:href'); // Safari NS namespace fix

 return svgString;

 function getCSSStyles( parentElement ) {
  var selectorTextArr = [];

  // Add Parent element Id and Classes to the list
  selectorTextArr.push( '#'+parentElement.id );
  for (var c = 0; c < parentElement.classList.length; c++)
    if ( !contains('.'+parentElement.classList[c], selectorTextArr) )
     selectorTextArr.push( '.'+parentElement.classList[c] );

  // Add Children element Ids and Classes to the list
  var nodes = parentElement.getElementsByTagName("*");
  for (var i = 0; i < nodes.length; i++) {
   var id = nodes[i].id;
   if ( !contains('#'+id, selectorTextArr) )
    selectorTextArr.push( '#'+id );

   var classes = nodes[i].classList;
   for (var c = 0; c < classes.length; c++)
    if ( !contains('.'+classes[c], selectorTextArr) )
     selectorTextArr.push( '.'+classes[c] );
  }

  // Extract CSS Rules
  var extractedCSSText = "";
  for (var i = 0; i < document.styleSheets.length; i++) {
   var s = document.styleSheets[i];
   
   try {
       if(!s.cssRules) continue;
   } catch( e ) {
        if(e.name !== 'SecurityError') throw e; // for Firefox
        continue;
       }

   var cssRules = s.cssRules;
   for (var r = 0; r < cssRules.length; r++) {
    if ( contains( cssRules[r].selectorText, selectorTextArr ) )
     extractedCSSText += cssRules[r].cssText;
   }
  }
  

  return extractedCSSText;

  function contains(str,arr) {
   return arr.indexOf( str ) === -1 ? false : true;
  }

 }

 function appendCSS( cssText, element ) {
  var styleElement = document.createElement("style");
  styleElement.setAttribute("type","text/css"); 
  styleElement.innerHTML = cssText;
  var refNode = element.hasChildNodes() ? element.children[0] : null;
  element.insertBefore( styleElement, refNode );
 }
}


function svgString2Image( svgString, width, height, format, callback ) {
 var format = format ? format : 'png';

 var imgsrc = 'data:image/svg+xml;base64,'+ btoa( unescape( encodeURIComponent( svgString ) ) ); // Convert SVG string to data URL

 var canvas = document.createElement("canvas");
 var context = canvas.getContext("2d");

 canvas.width = width;
 canvas.height = height;

 var image = new Image();
 image.onload = function() {
  context.clearRect ( 0, 0, width, height );
  context.drawImage(image, 0, 0, width, height);

  canvas.toBlob( function(blob) {
   var filesize = Math.round( blob.length/1024 ) + ' KB';
   if ( callback ) callback( blob, filesize );
  });

  
 };

 image.src = imgsrc;
}  

//save SVG  Serializes and outputr SVG in current div (i.e., created by genSel1Map)

function saveSVG(svgdiv) {
   //Serialize svg...
   var svgNode = svgdiv.node();
   var outSVG = getSVGString(svgNode);

return outSVG;
};

//Export2Word  from https://www.codexworld.com/export-html-to-word-doc-docx-using-javascript/
function Export2Word(intab, filename = ''){

 filename = filename.replace(".docx","");


    var preHtml = "<html xmlns:office='urn:schemas-microsoft-com:office:office,  xmlns:word='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>" +
                  "<head><style> " +       
                  "@page Section1 {size:841.7pt 595.45pt;mso-page-orientation:landscape;margin:1.0in 1.0in 1.0in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;} " +
                  "div.Section1 {page:Section1;} " +
                  "</style> </head> <body><div class=Section1>";

    var postHtml = "</div></body></html>";
    var html = preHtml+intab+postHtml;

    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });
    
    // Specify link url
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    
    // Specify file name
    filename = filename ? filename+'.doc':'document.doc';
    
    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);
    
    if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{
        // Create a link to the file
        downloadLink.href = url;
        
        // Setting the file name
        downloadLink.download = filename;
        
        //triggering the function
        downloadLink.click();
    }
    
    document.body.removeChild(downloadLink);
 };
//End of Export2Word
//generateTab creates html table and the passes table to the Export2Word function
function generateTab(header, body, footer, tabTitle, fileName) {
 const fmt_date = d3.timeFormat("%B %d, %Y");
    const fmt_yr = d3.format("00");


//Header
var table = "<table border= '1' width= 100%><thead><tr align='center'>";
for(i = 1; i < header[0].length; i++){
 table = table + '<th>' + header[0][i] + '</th>';
}
table = table + "</tr></thead>";

//body

table = table + "<tbody><tr>";
for(i = 0; i < body.length; i++){
 for(j = 1; j < body[i].length;j++){
  if(j == 1){
    table = table + "<td>" + body[i][j] + "</td>"; //This is the place name,...
  } else {
    var fmt_val = ""
    if(tabTitle.includes("Basic Statistics")) {
    if(body[i].length == 10){
     if(j == 2) {fmt_val = fixNEG(body[i][j],'num')};
     if(j == 3) {fmt_val = fixNEG(body[i][j],'num')};
     if(j == 4) {fmt_val = fixNEG(body[i][j],'pct')};
     if(j == 5) {fmt_val = fixNEG(body[i][j],'num')};
     if(j == 6) {fmt_val = fixNEG(body[i][j],'cur')};
     if(j == 7) {fmt_val = fixNEG(body[i][j],'cur')};
     if(j == 8) {fmt_val = fixNEG(body[i][j],'pct')};
     if(j == 9) {fmt_val = fixNEG(body[i][j],'pct')};
     } else {
     if(j == 2) {fmt_val = fixNEG(body[i][j],'num')};
     if(j == 3) {fmt_val = fixNEG(body[i][j],'num')};
     if(j == 4) {fmt_val = fixNEG(body[i][j],'pct')};
     if(j == 5) {fmt_val = fixNEG(body[i][j],'cur')};
     if(j == 6) {fmt_val = fixNEG(body[i][j],'cur')};
     if(j == 7) {fmt_val = fixNEG(body[i][j],'pct')};
     if(j == 8) {fmt_val = fixNEG(body[i][j],'pct')};
    } 
    } //Basc Stats
  if(tabTitle.includes("Population Growth")) {
   if(body[i][2] === '-') {  //This is the pct growth table
     if(j > 2) {
        fmt_val = fixNEG(body[i][j],'pct')
         } else {
            fmt_val = body[i][j];
        }
          } else {
    fmt_val = fixNEG(body[i][j],'num')
   };
  };  //Pop Growth
    table = table + "<td align='right'>" + fmt_val + "</td>";
   };
  } // j loop
 table = table + '</tr>';
 } //i loop
table = table + '</tbody>';

table = table.replaceAll("NaN%","-");
table = table.replaceAll("NaN","-");
//footer

table = table + "<tfoot>";
for(a = 0; a < footer.length; a++){
 table = table + '<tr><td colspan = ' + body[0].length + '>' + footer[a] + '</td></tr>';
}
table = table + "</tfoot></table>";

Export2Word(table, filename = fileName);

 }; //end of generateTab


 //Data Table WordButton creator  Simple Word file
 
$.fn.dataTable.ext.buttons.word = {
    className: 'buttons-word',
 
   action: function ( e, dt, node, config ) {
                 var colhd = dt.columns().header().toArray().map(x => x.innerText);
    var colft = dt.footer().toArray().map(x => x.innerText);
    var table = dt.rows().data();
    var tabTitle = config.titleAttr;
    var fileName = tabTitle + ".docx";
   
   //flattening the table componets
            var colHead =[];
   colHead[0] = colhd;
    
   
   var colFoot = colft.toString().split("\t");

   generateTab(colHead,table,colFoot,tabTitle,fileName);
   } //action function....
   };//Data Table WordButton creator

//plextabWord processes datatable elements and produces a word doc
function plextabWord(inData,hdrArr,ftrArr,fName,tabType) {


 var tblStart = "<table border= '1' width= 100%>";
 var tblEnd = "</table>"
 
 //Add Table footer
var ftrString = "<tfoot><tr>";
for(i = 0; i < ftrArr.length; i++){
     ftrString = ftrString + "<tr><td colspan='5'>" + ftrArr[i] + "</td></tr>";
 }; 
ftrString = ftrString + "</tr></tfoot>";

var stackTab = "";
var pgbreak = '<br style="page-break-before: always">'

for(i = 0; i < inData.length; i++){
	if(i < inData.length - 1){
		stackTab = stackTab + tblStart + inData[i] + ftrString + tblEnd + pgbreak;
	} else {
		stackTab = stackTab + tblStart + inData[i] + ftrString + tblEnd;
	}
 } 
 
 var stackTab2 = stackTab.replace(/−/g,"  -");
 Export2Word(stackTab2, fName);
} //plextabWord
 
 //pdfMake support functions...
function pdfFmt(elem, numcol, currec, hdrrows){

	var outtxt = (typeof elem === 'undefined') ? ' ' : elem;
	if(currec < hdrrows){
		var outstyle = 'headsty';
	} else {
		if(numcol){
		var outstyle =  'lnright' ;
		} else {
		var outstyle = 'lnleft';
		}
	}
   
	
	return([outtxt, outstyle]);
} 

function genPDFTable(data, hdrRows) {
 var outarr = [];
 data.forEach( dd => {
  var indTab =  {
   table: {
   headerRows: hdrRows,
   dontBreakRows: true, 
            body: dd},
   pageBreak: "after" }
  outarr.push(indTab);
 })

    return (outarr)
}  //genPDFTable

//plextabPDF processes datatable elements and produces a PDF doc
function plextabPDF(inData,hdrArr,ftrArr,fName,tabType) {
 //http://pdfmake.org/#/
 //Header Formatting  https://pdfmake.github.io/docs/0.1/document-definition-object/styling/


 var pdfTab = HTMLtoArray(inData,hdrArr,"PDF")

if(tabType = "Population Growth Table"){
	for(a = 0; a < pdfTab.length; a++){
		var est_b = "e2" + a;
		var moe_a = "m1" + a 
		var moe_b = "m2" + a;
		for(i = 0; i < pdfTab[a].length; i++){
			if(i <= 1){
				pdfTab[a][i][[moe_a]] = "";
				pdfTab[a][i][[moe_b]] = "";
			} else {
				pdfTab[a][i][[est_b]] = pdfTab[a][i][[moe_a]];
				pdfTab[a][i][[moe_a]] = "";
				pdfTab[a][i][[moe_b]] = "";
			}
		} //i
	}  //a
}

 var bodykeys = [];
  
for(a = 0; a < inData.length;a++) {  //for each panel
      var pnlKeys = Object.keys(pdfTab[a][0]);
      bodykeys.push([pnlKeys]);
} //a


var bodyArr = []
for(a = 0; a < pdfTab.length; a++){
	var tmpbody = []
	var rowcnt = 0;
	 pdfTab[a].forEach(function(row) {

        var dataRow = [];
        rowcnt = rowcnt + 1;
        bodykeys[a].forEach(function(column) {
			column.forEach( col => {
				if(rowcnt < 2) {
					if(col != 'label'){
						dataRow.push({text: row[col], style: 'headsty', colSpan:2});
					} else {
						dataRow.push({text: row[col], style: 'headsty'});
					}
				} else {
				    dataRow.push({text: row[col], style: col == 'label' ? 'lnleft' : 'lnright' });
				}
			})
        })

        tmpbody.push(dataRow);
    });
	bodyArr.push(tmpbody);
}

 //Process footer

var footout = []
for(k = 0; k < ftrArr.length; k++){
	 footout.push({text:  "\u200B\t" + ftrArr[k].toString(), fontSize: 9});
}

//Document output
var dd = {
  pageOrientation : 'landscape',
  header : {text: "\u200B\t" + fName,  fontSize: 10},
  footer : footout,
    content: [
   genPDFTable(bodyArr,2)
    ],
//styleSheets
defaultStyle: {
    fontSize: 11
  },
  styles: {
    headsty: {
     alignment : 'center',
     fillColor: '#4f5250',
     color: 'white'
   },
  lnright: { alignment :'right'},
  lnleft : { alignment : 'left'}
   }
   
};
 
 pdfMake.createPdf(dd).download(fName + ".pdf");
} //plextabPDF


//plextabCSV processes datatable elements and produces a CSV File -- used for both Excel and CSV files
function plextabCSV(inData,hdrArr,ftrArr,fName,tabType) {
if(tabType == "Population Growth Table"){
	var tblArray = stripHTML(inData);
	//Creating the header
	var newHdr = [""];
	for(i = 0; i < tblArray.length; i++){
		for(j = 0; j < 2; j++){
			 if(tblArray[i][j] != "Estimate") {
				 newHdr.push(tblArray[i][j]);
			 }
		}
	}

	var nelements = tblArray[0].length
	var outtab = [];
	for(a = 0; a < hdrArr.length; a++){
		var outrow = Array(newHdr.length);
	    outrow[0] = hdrArr[a];
		var rowpos = 1;
	for(i = 0; i < tblArray.length; i++){
		for(j = 0; j < tblArray[i].length; j++){
			if(tblArray[i][j] == hdrArr[a]) {
				if(tblArray[i].length == nelements){
					var val1 = tblArray[i][j+1].replace(/\,/g,"")
					var val2 = tblArray[i][j+2].replace(/\,/g,"")
				    outrow[rowpos] = val1;
					rowpos = rowpos + 1;
					outrow[rowpos] = val2;
					rowpos = rowpos + 1;
				} else {
					var val1 = tblArray[i][j+1].replace(/\,/g,"")
				    outrow[rowpos] = val1;
					rowpos = rowpos + 1;
					outrow[rowpos] = " ";
					rowpos = rowpos + 1;
				}
			}
		} //j
	} //i
	outtab.push(outrow)
	} //a
	
	if(newHdr.length != outtab[0].length){
		newHdr.push("");
	}
	outtab.unshift(newHdr);
	
	var finFtr = [];
	for(i = 0; i < outtab[1].length; i++){
		if(i == 0) {
			finFtr.push(ftrArr[0].replace(/\,/g," "));
		} else {
			finFtr.push("");
		}
	}
	outtab.push(finFtr);

   
	
	//Download code 
	var fileName = fName + ".csv";

	var csvContent = "data:text/csv;charset=utf-8," 
    + outtab.map(e => e.join(",")).join("\n");
	
	var csvContent2 = csvContent.replace(/−/g, ' -')

	console.log(csvContent2)
	
	    if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(csvContent2, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = encodeURI(csvContent2);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
		}
} else {
	var outarr = HTMLtoArray(inData,hdrArr,"CSV")
    exportToCsv(fName, tabType, outarr,0);
}
} //plextabCSV

//genplexTab is a wrapper function that sends datatable elements out to file download functions plextabWord, plextabPDF, plextabXLSX and plextabPDF
function genplexTab(inData,hdrArr,ftrArr,fName,fmt,tabType) {
   switch(fmt) {
    case "word":
       plextabWord(inData,hdrArr,ftrArr,fName,tabType);
    break;
    case "pdf" :
       plextabPDF(inData,hdrArr,ftrArr,fName,tabType);
    break;
   case "xlsx" :
      plextabCSV(inData,hdrArr,ftrArr,fName,tabType);
    break;
   case "csv" :
      plextabCSV(inData,hdrArr,ftrArr,fName,tabType);
    break;
   };
} //genplexTab

function genProfile(lvl,fipsArr,valSec, names) {
var descript = "Colorado Demographic Profile "+ lvl + ": ";
 descript = descript + names[0];

for(i = 1; i < names.length; i++){
   descript = descript + ", " + names[i];
};

const regList = ['Region', 'Regional Comparison'];
const ctyList = ['County', 'County Comparison'];
const muniList = ['Municipality', 'Municipal Comparison'];
const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


//Defining the output p[anels
var PROFILE_1 = document.getElementById('profile-content1');
var PROFILE_2 = document.getElementById('profile-content2');
var PROFILE_3 = document.getElementById('profile-content3');
var PROFILE_4 = document.getElementById('profile-content4');
  
  
 //Create an array that holds the contenrnts 

//Selecting Maximum Year and acsyr
var yrstr = "https://gis.dola.colorado.gov/lookups/componentYRS";
d3.json(yrstr).then(function(yeardata){
    var maxest = yeardata.filter(function(d){return d.datatype == 'Estimate'});
 var yrsList = maxest.map(function(d){return d.year;});
    var curyear = d3.max(yrsList);
 var acsyr = 2020;  ///CHANGE THIS WHEN 2020 ACS is available
//Create ouput array?

//Triggering the first button  Expand these for each button...
var firstbtn = valSec[0];
if(firstbtn == 'sel1') {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel1display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
};

 //Need to export final description, svg and datatable here
  
//Population Trends Button
if(firstbtn == 'sel2') { 
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel2display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}

//Age Panel button
if(firstbtn == 'sel3') { 
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   if(muniList.includes(lvl)) {
         genSel3display(lvl, fipsArr, names, acsyr, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
   } else {
      genSel3display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
   }
}

//Income, Educ, Race Panel button
if(firstbtn == 'sel4') { 
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel4display(lvl, fipsArr, names, acsyr, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}

//Housing and Households button
if(firstbtn == 'sel5') { 
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel5display(lvl, fipsArr, names, acsyr, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}

//Setting Event Listeners  For a click on a section button...
document.getElementById("sel1btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel1display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
     }); //end of sel1btn listener
  
document.getElementById("sel2btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel2display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}); //end of sel2btn listener

document.getElementById("sel3btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   if(muniList.includes(lvl)) {
         genSel3display(lvl, fipsArr, names, acsyr, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
   } else {
      genSel3display(lvl, fipsArr, names, curyear, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
   }
}); //end of sel3btn listener

//Income, Educ, Race Panel button
document.getElementById("sel4btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel4display(lvl, fipsArr, names, acsyr, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}); //end of sel4btn listener

//Housing and Households Panel button
document.getElementById("sel5btn").addEventListener("click", function() {
   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   genSel5display(lvl, fipsArr, names, acsyr, PROFILE_1, PROFILE_2, PROFILE_3, PROFILE_4);
}); //end of sel4btn listener

}); //End of Promise 
}; //end of genProfile
 
 
 //gen_occ_tab Combines Variables for  ACS Housing Occupancy Table
 function gen_occ_tab(occ_tab, vac_tab, vacelse_tab, geotype){
	 
     var out_tab = []
	 for(i = 0; i< occ_tab.length;i++){
		 out_tab.push({
			"FIPS" : geotype == 'state' ? occ_tab[i].GEO1 : occ_tab[i].GEO2,
			"NAME" : occ_tab[i].NAME,
			"TOTALHU_E" : 	occ_tab[i].B25002_001E,
			"TOTALHU_M" : 	geotype == 'Region' ? Math.pow(occ_tab[i].B25002_001M,2) : occ_tab[i].B25002_001M,
			"OCCHU_E" : 	occ_tab[i].B25002_002E,
			"OCCHU_M" : 	geotype == 'Region' ? Math.pow(occ_tab[i].B25002_002M,2) : occ_tab[i].B25002_002M,
			"VACHU_E" : 	occ_tab[i].B25002_003E,
			"VACHU_M" : 	geotype == 'Region' ? Math.pow(occ_tab[i].B25002_003M,2) : occ_tab[i].B25002_003M,
			"VAC_SALERENT_E" : 	vac_tab[i].B25004_002E + vac_tab[i].B25004_004E,
			"VAC_SALERENT_M" : 	geotype == 'Region' ? Math.pow(vac_tab[i].B25004_002M,2) + Math.pow(vac_tab[i].B25004_004M,2) : Math.sqrt(Math.pow(vac_tab[i].B25004_002M,2) + Math.pow(vac_tab[i].B25004_004M,2)),
			"VAC_SOLDRENTED_E" : 	vac_tab[i].B25004_003E + vac_tab[i].B25004_005E,
			"VAC_SOLDRENTED_M" : geotype == 'Region' ? Math.pow(vac_tab[i].B25004_003M,2) + Math.pow(vac_tab[i].B25004_005M,2) : Math.sqrt(Math.pow(vac_tab[i].B25004_003M,2) + Math.pow(vac_tab[i].B25004_005M,2)),
			"VAC_SEASONAL_E" : 	vac_tab[i]. B25004_006E,
			"VAC_SEASONAL_M" : 	geotype == 'Region' ? Math.pow(vac_tab[i]. B25004_006M,2) : vac_tab[i]. B25004_006M,	
			"VAC_ELSEWHERE_E" : 	vacelse_tab[i].B25005_002E	,
			"VAC_ELSEWHERE_M" : geotype == 'Region' ? Math.pow(vacelse_tab[i].B25005_002M,2) : vacelse_tab[i].B25005_002M,
			"VAC_MIGRANT_E" : 	vac_tab[i].B25004_007E,
			"VAC_MIGRANT_M" : 	geotype == 'Region' ? Math.pow(vac_tab[i].B25004_007M,2) : vac_tab[i].B25004_007M,
			"VAC_OTHER_E" : 	vac_tab[i].B25004_008E,
			"VAC_OTHER_M" : 	geotype == 'Region' ? Math.pow(vac_tab[i].B25004_008M,2) : vac_tab[i].B25004_008M
		 })
	 }

return(out_tab)
 } //gen_occ_tab
 
 //gen_str_unit Combines Housing Unit Variables for  ACS Units and Population by Tenure tab
 function gen_str_unit(str_tab,geotype){
	 var out_tab = []
	 for(i = 0; i< str_tab.length;i++){
		OOHU_E = str_tab[i].B25032_002E;
		OOHU_M =  Math.pow(str_tab[i].B25032_002M,2);
		OOSFU_E = str_tab[i].B25032_003E + str_tab[i].B25032_004E;
		OOSFU_M = Math.pow(str_tab[i].B25032_003M,2) + Math.pow(str_tab[i].B25032_004M,2);
		OO24_E = str_tab[i].B25032_005E + str_tab[i].B25032_006E;
		OO24_M = Math.pow(str_tab[i].B25032_005M,2) + Math.pow(str_tab[i].B25032_006M,2);
		OO550_E = str_tab[i].B25032_007E + str_tab[i].B25032_008E + str_tab[i].B25032_009E + str_tab[i].B25032_010E;
		OO550_M = Math.pow(str_tab[i].B25032_007M,2) + Math.pow(str_tab[i].B25032_008M,2) + Math.pow(str_tab[i].B25032_009M,2) + Math.pow(str_tab[i].B25032_010M,2);
		OOMOB_E = str_tab[i].B25032_011E;
		OOMOB_M = Math.pow(str_tab[i].B25032_011M,2);
		OOOTH_E = str_tab[i].B25032_012E;
		OOOTH_M = Math.pow(str_tab[i].B25032_012M,2);

		RTHU_E = str_tab[i].B25032_013E;
		RTHU_M = Math.pow(str_tab[i].B25032_013M,2);
		RTSFU_E = str_tab[i].B25032_014E + str_tab[i].B25032_015E;
		RTSFU_M = Math.pow(str_tab[i].B25032_014M,2) + Math.pow(str_tab[i].B25032_015M,2);
		RT24_E = str_tab[i].B25032_016E + str_tab[i].B25032_017E;
		RT24_M = Math.pow(str_tab[i].B25032_016M,2) + Math.pow(str_tab[i].B25032_017M,2);
		RT550_E = str_tab[i].B25032_018E + str_tab[i].B25032_019E + str_tab[i].B25032_020E + str_tab[i].B25032_021E;
		RT550_M = Math.pow(str_tab[i].B25032_018M,2) + Math.pow(str_tab[i].B25032_019M,2) + Math.pow(str_tab[i].B25032_020M,2) + Math.pow(str_tab[i].B25032_021M,2);
		RTMOB_E = str_tab[i].B25032_022E;
		RTMOB_M = Math.pow(str_tab[i].B25032_022M,2);
		RTOTH_E = str_tab[i].B25032_023E;
		RTOTH_M = Math.pow(str_tab[i].B25032_023M,2);

		ALLHU_E = OOHU_E + RTHU_E;
		ALLHU_M = Math.pow(str_tab[i].B25032_001M,2);
		ALLSFU_E = OOSFU_E + RTSFU_E;
		ALLSFU_M = OOSFU_M + RTSFU_M;
		ALL24_E = OO24_E + RT24_E;
		ALL24_M = OO24_M + RT24_M;
		ALL550_E = OO550_E + RT550_E;
		ALL550_M = OO550_M + RT550_M;
		ALLMOB_E = OOMOB_E + RTMOB_E;
		ALLMOB_M = OOMOB_M + RTMOB_M;
		ALLOTH_E = OOOTH_E + RTOTH_E;
		ALLOTH_M = OOOTH_M + RTOTH_M;
		
		if(geotype == "Region"){
			out_tab.push({
				"FIPS" : str_tab[i].GEO2,
			    "NAME" : str_tab[i].NAME,
				"ALLHU_E" : ALLHU_E ,
				"ALLHU_M" : ALLHU_M ,
				"ALLSFU_E" : ALLSFU_E ,
				"ALLSFU_M" : ALLSFU_M ,
				"ALL24_E" : ALL24_E ,
				"ALL24_M" : ALL24_M ,
				"ALL550_E" : ALL550_E ,
				"ALL550_M" : ALL550_M ,
				"ALLMOB_E" : ALLMOB_E ,
				"ALLMOB_M" : ALLMOB_M ,
				"ALLOTH_E" : ALLOTH_E ,
				"ALLOTH_M" : ALLOTH_M ,
				"OOHU_E" : OOHU_E ,
				"OOHU_M" : OOHU_M ,
				"OOSFU_E" : OOSFU_E ,
				"OOSFU_M" : OOSFU_M ,
				"OO24_E" : OO24_E ,
				"OO24_M" : OO24_M ,
				"OO550_E" : OO550_E ,
				"OO550_M" : OO550_M ,
				"OOMOB_E" : OOMOB_E ,
				"OOMOB_M" : OOMOB_M ,
				"OOOTH_E" : OOOTH_E ,
				"OOOTH_M" : OOOTH_M ,
				"RTHU_E" : RTHU_E ,
				"RTHU_M" : RTHU_M ,
				"RTSFU_E" : RTSFU_E ,
				"RTSFU_M" : RTSFU_M ,
				"RT24_E" : RT24_E ,
				"RT24_M" : RT24_M ,
				"RT550_E" : RT550_E ,
				"RT550_M" : RT550_M ,
				"RTMOB_E" : RTMOB_E ,
				"RTMOB_M" : RTMOB_M ,
				"RTOTH_E" : RTOTH_E ,
				"RTOTH_M" : RTOTH_M });
		} else {
			out_tab.push({
				"FIPS" : geotype == "state" ? str_tab[i].GEO1 : str_tab[i].GEO2,
			    "NAME" : str_tab[i].NAME,
				"ALLHU_E" : ALLHU_E ,
				"ALLHU_M" :  ALLHU_M,
				"ALLSFU_E" : ALLSFU_E ,
				"ALLSFU_M" : ALLSFU_M,
				"ALL24_E" : ALL24_E ,
				"ALL24_M" :  ALL24_M,
				"ALL550_E" : ALL550_E ,
				"ALL550_M" :  ALL550_M,
				"ALLMOB_E" : ALLMOB_E ,
				"ALLMOB_M" :  ALLMOB_M,
				"ALLOTH_E" : ALLOTH_E ,
				"ALLOTH_M" :  ALLOTH_M,
				"OOHU_E" : OOHU_E ,
				"OOHU_M" :  OOHU_M,
				"OOSFU_E" : OOSFU_E ,
				"OOSFU_M" :  OOSFU_M,
				"OO24_E" : OO24_E ,
				"OO24_M" :  OO24_M,
				"OO550_E" : OO550_E ,
				"OO550_M" :  OO550_M,
				"OOMOB_E" : OOMOB_E ,
				"OOMOB_M" : OOMOB_M,
				"OOOTH_E" : OOOTH_E ,
				"OOOTH_M" :  OOOTH_M,
				"RTHU_E" : RTHU_E ,
				"RTHU_M" :  RTHU_M,
				"RTSFU_E" : RTSFU_E ,
				"RTSFU_M" : RTSFU_M,
				"RT24_E" : RT24_E ,
				"RT24_M" :  RT24_M,
				"RT550_E" : RT550_E ,
				"RT550_M" :  RT550_M,
				"RTMOB_E" : RTMOB_E ,
				"RTMOB_M" : RTMOB_M,
				"RTOTH_E" : RTOTH_E ,
				"RTOTH_M" :  RTOTH_M
				})
		}
	 } //I
return(out_tab)
 } //gen_str_unit
 
  //gen_str_pop Combines population Variables for  ACS Units and Population by Tenure tab
 function gen_str_pop(str_tab,geotype){
	 var out_tab = []
	 for(i = 0; i< str_tab.length;i++){
		OOHU_E = str_tab[i].B25033_002E;
		OOHU_M =  Math.pow(str_tab[i].B25033_002M,2);
		OOSFU_E = str_tab[i].B25033_003E 
		OOSFU_M = Math.pow(str_tab[i].B25033_003M,2);
		OO24_E = str_tab[i].B25033_004E;
		OO24_M = Math.pow(str_tab[i].B25033_004M,2);
		OO550_E = str_tab[i].B25033_005E 
		OO550_M = Math.pow(str_tab[i].B25033_005M,2);
		OOMOB_E = str_tab[i].B25033_006E;
		OOMOB_M = Math.pow(str_tab[i].B25033_006M,2);
		OOOTH_E = str_tab[i].B25033_007E;
		OOOTH_M = Math.pow(str_tab[i].B25033_007M,2);

		RTHU_E = str_tab[i].B25033_008E;
		RTHU_M = Math.pow(str_tab[i].B25033_008M,2);
		RTSFU_E = str_tab[i].B25033_009E;
		RTSFU_M = Math.pow(str_tab[i].B25033_009M,2);
		RT24_E = str_tab[i].B25033_010E;
		RT24_M = Math.pow(str_tab[i].B25033_010M,2);
		RT550_E = str_tab[i].B25033_011E;
		RT550_M = Math.pow(str_tab[i].B25033_011M,2);
		RTMOB_E = str_tab[i].B25033_012E;
		RTMOB_M = Math.pow(str_tab[i].B25033_012M,2);
		RTOTH_E = str_tab[i].B25033_013E;
		RTOTH_M = Math.pow(str_tab[i].B25033_013M,2);

		ALLHU_E = OOHU_E + RTHU_E;
		ALLHU_M = Math.pow(str_tab[i].B25033_001M,2);
		ALLSFU_E = OOSFU_E + RTSFU_E;
		ALLSFU_M = OOSFU_M + RTSFU_M;
		ALL24_E = OO24_E + RT24_E;
		ALL24_M = OO24_M + RT24_M;
		ALL550_E = OO550_E + RT550_E;
		ALL550_M = OO550_M + RT550_M;
		ALLMOB_E = OOMOB_E + RTMOB_E;
		ALLMOB_M = OOMOB_M + RTMOB_M;
		ALLOTH_E = OOOTH_E + RTOTH_E;
		ALLOTH_M = OOOTH_M + RTOTH_M;
		
		if(geotype == "Region"){
			out_tab.push({
				"FIPS" : str_tab[i].GEO2,
			    "NAME" : str_tab[i].NAME,
				"ALLHU_E" : ALLHU_E ,
				"ALLHU_M" : ALLHU_M ,
				"ALLSFU_E" : ALLSFU_E ,
				"ALLSFU_M" : ALLSFU_M ,
				"ALL24_E" : ALL24_E ,
				"ALL24_M" : ALL24_M ,
				"ALL550_E" : ALL550_E ,
				"ALL550_M" : ALL550_M ,
				"ALLMOB_E" : ALLMOB_E ,
				"ALLMOB_M" : ALLMOB_M ,
				"ALLOTH_E" : ALLOTH_E ,
				"ALLOTH_M" : ALLOTH_M ,
				"OOHU_E" : OOHU_E ,
				"OOHU_M" : OOHU_M ,
				"OOSFU_E" : OOSFU_E ,
				"OOSFU_M" : OOSFU_M ,
				"OO24_E" : OO24_E ,
				"OO24_M" : OO24_M ,
				"OO550_E" : OO550_E ,
				"OO550_M" : OO550_M ,
				"OOMOB_E" : OOMOB_E ,
				"OOMOB_M" : OOMOB_M ,
				"OOOTH_E" : OOOTH_E ,
				"OOOTH_M" : OOOTH_M ,
				"RTHU_E" : RTHU_E ,
				"RTHU_M" : RTHU_M ,
				"RTSFU_E" : RTSFU_E ,
				"RTSFU_M" : RTSFU_M ,
				"RT24_E" : RT24_E ,
				"RT24_M" : RT24_M ,
				"RT550_E" : RT550_E ,
				"RT550_M" : RT550_M ,
				"RTMOB_E" : RTMOB_E ,
				"RTMOB_M" : RTMOB_M ,
				"RTOTH_E" : RTOTH_E ,
				"RTOTH_M" : RTOTH_M });
		} else {
			out_tab.push({
				"FIPS" : geotype == "state" ? str_tab[i].GEO1 : str_tab[i].GEO2,
			    "NAME" : str_tab[i].NAME,
				"ALLHU_E" : ALLHU_E ,
				"ALLHU_M" :  ALLHU_M,
				"ALLSFU_E" : ALLSFU_E ,
				"ALLSFU_M" :  ALLSFU_M,
				"ALL24_E" : ALL24_E ,
				"ALL24_M" :  ALL24_M,
				"ALL550_E" : ALL550_E ,
				"ALL550_M" :  ALL550_M,
				"ALLMOB_E" : ALLMOB_E ,
				"ALLMOB_M" :  ALLMOB_M,
				"ALLOTH_E" : ALLOTH_E ,
				"ALLOTH_M" :  ALLOTH_M,
				"OOHU_E" : OOHU_E ,
				"OOHU_M" :  OOHU_M,
				"OOSFU_E" : OOSFU_E ,
				"OOSFU_M" :  OOSFU_M,
				"OO24_E" : OO24_E ,
				"OO24_M" :  OO24_M,
				"OO550_E" : OO550_E ,
				"OO550_M" :  OO550_M,
				"OOMOB_E" : OOMOB_E ,
				"OOMOB_M" :  OOMOB_M,
				"OOOTH_E" : OOOTH_E ,
				"OOOTH_M" :  OOOTH_M,
				"RTHU_E" : RTHU_E ,
				"RTHU_M" :  RTHU_M,
				"RTSFU_E" : RTSFU_E ,
				"RTSFU_M" :  RTSFU_M,
				"RT24_E" : RT24_E ,
				"RT24_M" :  RT24_M,
				"RT550_E" : RT550_E ,
				"RT550_M" :  RT550_M,
				"RTMOB_E" : RTMOB_E ,
				"RTMOB_M" :  RTMOB_M,
				"RTOTH_E" : RTOTH_E ,
				"RTOTH_M" :  RTOTH_M
			})
		}
	 } //I
return(out_tab)
 } //gen_str_pop
 
 //genTenureTab  Generates the final Tenure tab data 
 function genTenureTab(unitTab,yrCty,yrSt,popTab,pphCty,pphSt){
 var varname = Object.keys(unitTab[0]);
 varname.splice(0,2);

 var outData = [];

 for(i = 0; i < unitTab.length; i++){
	  var unitdata  = unitTab[i];
	  var popdata = popTab[i];
	  //Values for median year of construction and pph
		var  ALL_MEDYR_E =  "";
		var  ALL_MEDYR_M =  "";
		var  OO_MEDYR_E =  "";
		var  OO_MEDYR_M =  "";
		var  RT_MEDYR_E =  "";
		var  RT_MEDYR_M =  "";
		  
		var  ALL_PPH_E =  "";
		var  ALL_PPH_M =  "";
		var  OO_PPH_E =  "";
		var  OO_PPH_M =  "";
		var  RT_PPH_E =  "";
		var  RT_PPH_M =  "";
	  if(unitdata.FIPS != -101){
		  if(unitdata.FIPS == 8){
			  ALL_MEDYR_E =  yrSt[0].B25037_001E;
			  ALL_MEDYR_M =  yrSt[0].B25037_001M;
			  OO_MEDYR_E =  yrSt[0].B25037_002E;
			  OO_MEDYR_M =  yrSt[0].B25037_002M;
			  RT_MEDYR_E =  yrSt[0].B25037_003E;
			  RT_MEDYR_M =  yrSt[0].B25037_003M;
			  
			  ALL_PPH_E =  pphSt[0].B25010_001E;
			  ALL_PPH_M =  pphSt[0].B25010_001M;
			  OO_PPH_E =  pphSt[0].B25010_002E;
			  OO_PPH_M =  pphSt[0].B25010_002M;
			  RT_PPH_E =  pphSt[0].B25010_003E;
			  RT_PPH_M =  pphSt[0].B25010_003M;
		  } else {
			  var medyrfilt = yrCty.filter(d => d.GEO2 == unitdata.FIPS);
			  var pphfilt = pphCty.filter(d => d.GEO2 == unitdata.FIPS);
			  ALL_MEDYR_E =  medyrfilt[0].B25037_001E;
			  ALL_MEDYR_M =  medyrfilt[0].B25037_001M;
			  OO_MEDYR_E =  medyrfilt[0].B25037_002E;
			  OO_MEDYR_M =  medyrfilt[0].B25037_002M;
			  RT_MEDYR_E =  medyrfilt[0].B25037_003E;
			  RT_MEDYR_M =  medyrfilt[0].B25037_003M;
			  
			  ALL_PPH_E =  pphfilt[0].B25010_001E;
			  ALL_PPH_M =  pphfilt[0].B25010_001M;
			  OO_PPH_E =  pphfilt[0].B25010_002E;
			  OO_PPH_M =  pphfilt[0].B25010_002M;
			  RT_PPH_E =  pphfilt[0].B25010_003E;
			  RT_PPH_M =  pphfilt[0].B25010_003M;
		  }
	  }
	  
	  var ALL_UNIT_E = unitdata.ALLHU_E;
	  var ALL_UNIT_M = unitdata.ALLHU_M;
	  var ALL_POP_E = popdata.ALLHU_E;
	  var ALL_POP_M = popdata.ALLHU_M;
	  	  
	  var OO_UNIT_E = unitdata.OOHU_E;
	  var OO_UNIT_M = unitdata.OOHU_M;
	  var OO_POP_E = popdata.OOHU_E;
	  var OO_POP_M = popdata.OOHU_M;
	  	  
	  var RT_UNIT_E = unitdata.RTHU_E;
	  var RT_UNIT_M = unitdata.RTHU_M;
	  var RT_POP_E = popdata.RTHU_E;
	  var RT_POP_M = popdata.RTHU_M;
	  
	  for (j = 0; j < varname.length;j += 2){
		  if(j <= 10){
		  	   var UNIT_EST = unitdata[varname[j]]
			   var UNIT_MOE = unitdata[varname[j+1]];
			   var UNIT_PCT_EST = unitdata[varname[j]]/ALL_UNIT_E;
			   var UNIT_PCT_MOE = acsPctMOE(ALL_UNIT_E,ALL_UNIT_M,UNIT_PCT_EST,UNIT_MOE);
 			   var POP_EST = popdata[varname[j]];
			   var POP_MOE = popdata[varname[j+1]];
			   var POP_PCT_EST = popdata[varname[j]]/ALL_POP_E;
			   var POP_PCT_MOE = acsPctMOE(ALL_POP_E,ALL_POP_M,POP_PCT_EST,POP_MOE);
		  } 
		  if(j > 10 && j <= 22){
		  	   var UNIT_EST = unitdata[varname[j]]
			   var UNIT_MOE = unitdata[varname[j+1]];
			   var UNIT_PCT_EST = unitdata[varname[j]]/OO_UNIT_E;
			   var UNIT_PCT_MOE = acsPctMOE(OO_UNIT_E,OO_UNIT_M,UNIT_PCT_EST,UNIT_MOE);
 			   var POP_EST = popdata[varname[j]];
			   var POP_MOE = popdata[varname[j+1]];
			   var POP_PCT_EST = popdata[varname[j]]/OO_POP_E;
			   var POP_PCT_MOE = acsPctMOE(OO_POP_E,OO_POP_M,POP_PCT_EST,POP_MOE);
		  } 
		  if(j > 22){
		  	   var UNIT_EST = unitdata[varname[j]]
			   var UNIT_MOE = unitdata[varname[j+1]];
			   var UNIT_PCT_EST = unitdata[varname[j]]/RT_UNIT_E;
			   var UNIT_PCT_MOE = acsPctMOE(RT_UNIT_E,RT_UNIT_M,UNIT_PCT_EST,UNIT_MOE);
 			   var POP_EST = popdata[varname[j]];
			   var POP_MOE = popdata[varname[j+1]];
			   var POP_PCT_EST = popdata[varname[j]]/RT_POP_E;
			   var POP_PCT_MOE = acsPctMOE(RT_POP_E,RT_POP_M,POP_PCT_EST,POP_MOE);
		  } 
		  //Creating output
          switch(j) {
			case 10: {
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : varname[j],
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
			 //Output Median year of construction
			   var UNIT_EST = ALL_MEDYR_E;
			   var UNIT_MOE = ALL_MEDYR_M; 
			   var UNIT_PCT_EST = ""
			   var UNIT_PCT_MOE = "";
 			   var POP_EST = ""
			   var POP_MOE = "";
			   var POP_PCT_EST = "";
			   var POP_PCT_MOE = "";
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : "ALLMEDYR_E",
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
			 //Output persons per household
			   var UNIT_EST = ""
			   var UNIT_MOE = ""; 
			   var UNIT_PCT_EST = ""
			   var UNIT_PCT_MOE = "";
 			   var POP_EST = ALL_PPH_E
			   var POP_MOE = ALL_PPH_M;
			   var POP_PCT_EST = "";
			   var POP_PCT_MOE = "";
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : "ALLPPH_E",
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
		  } // Case 10
		  break;
		  case 22: {
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : varname[j],
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
			 //Output Median year of construction
			   var UNIT_EST = OO_MEDYR_E;
			   var UNIT_MOE = OO_MEDYR_M; 
			   var UNIT_PCT_EST = ""
			   var UNIT_PCT_MOE = "";
 			   var POP_EST = ""
			   var POP_MOE = "";
			   var POP_PCT_EST = "";
			   var POP_PCT_MOE = "";
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : "OOMEDYR_E",
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
			 //Output persons per household
			   var UNIT_EST = ""
			   var UNIT_MOE = ""; 
			   var UNIT_PCT_EST = ""
			   var UNIT_PCT_MOE = "";
 			   var POP_EST = OO_PPH_E
			   var POP_MOE = OO_PPH_M;
			   var POP_PCT_EST = "";
			   var POP_PCT_MOE = "";
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : "OOPPH_E",
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
		  } // Case 22
		  break;
		  case 34: {
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : varname[j],
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
			 //Output Median year of construction
			   var UNIT_EST = RT_MEDYR_E;
			   var UNIT_MOE = RT_MEDYR_M; 
			   var UNIT_PCT_EST = ""
			   var UNIT_PCT_MOE = "";
 			   var POP_EST = ""
			   var POP_MOE = "";
			   var POP_PCT_EST = "";
			   var POP_PCT_MOE = "";
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : "RTMEDYR_E",
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
			 //Output persons per household
			   var UNIT_EST = ""
			   var UNIT_MOE = ""; 
			   var UNIT_PCT_EST = ""
			   var UNIT_PCT_MOE = "";
 			   var POP_EST = RT_PPH_E
			   var POP_MOE = RT_PPH_M;
			   var POP_PCT_EST = "";
			   var POP_PCT_MOE = "";
             outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : "RTPPH_E",
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
		  } // Case 34
		  break;
		 default : {
			outData.push({
				 'FIPS' : unitdata.FIPS,
				 'NAME' : unitdata.NAME,
				 "VAR" : varname[j],
				 'UNIT_EST' : UNIT_EST,
				 'UNIT_MOE' : UNIT_MOE,
				 'UNIT_PCT_EST' : UNIT_PCT_EST,
				 'UNIT_PCT_MOE' : UNIT_PCT_MOE,
				 'POP_EST' : POP_EST,
				 'POP_MOE' : POP_MOE,
				 'POP_PCT_EST' : POP_PCT_EST,
				 'POP_PCT_MOE' : POP_PCT_MOE
			 });
		 }
		 } //switch
	  } //j
 } //i
 
  return(outData);
 } //genTenureTab 
 
 //genhousIncome Geneates Percentage Income spent on housing tab
 function genhousIncome(OO,RT,geotype) {

	 var OO_dat = [];
	 OO.forEach(d => {
		 OO_dat.push({
			"FIPS" : geotype == 'state' ? 8 : d.GEO2,
			"NAME" : d.NAME,
			"TOTAL_OO_E" : d.B25095_001E,
			"TOTAL_OO_M" : d.B25095_001M, 
			"PCT3539_OO_E" : d.B25095_007E + d.B25095_016E + d.B25095_025E + d.B25095_034E +d.B25095_043E + d.B25095_052E + d.B25095_061E + d.B25095_070E, 
			"PCT3539_OO_M" : Math.pow(d.B25095_007M,2) + Math.pow(d.B25095_016M,2) + Math.pow(d.B25095_025M,2)+ Math.pow(d.B25095_034M,2)+ Math.pow(d.B25095_043M,2) 
							+ Math.pow(d.B25095_052M,2) + Math.pow(d.B25095_061M,2) + Math.pow(d.B25095_070M,2), 
			"PCT4045_OO_E" : d.B25095_008E + d.B25095_017E + d.B25095_026E + d.B25095_035E +d.B25095_044E + d.B25095_053E + d.B25095_062E + d.B25095_071E, 
			"PCT4045_OO_M" : Math.pow(d.B25095_008M,2) + Math.pow(d.B25095_017M,2) + Math.pow(d.B25095_026M,2) + Math.pow(d.B25095_035M,2)+ Math.pow(d.B25095_044M,2)
							+ Math.pow(d.B25095_053M,2) + Math.pow(d.B25095_062M,2) + Math.pow(d.B25095_071M,2), 
			"PCTGE50_OO_E" : d.B25095_009E + d.B25095_018E + d.B25095_027E + d.B25095_036E +d.B25095_045E + d.B25095_054E + d.B25095_063E + d.B25095_072E, 
			"PCTGE50_OO_M" : Math.pow(d.B25095_009M,2) + Math.pow(d.B25095_018M,2) + Math.pow(d.B25095_027M,2) + Math.pow(d.B25095_036M,2)+ Math.pow(d.B25095_045M,2)
							+ Math.pow(d.B25095_054M,2) + Math.pow(d.B25095_063M,2) + Math.pow(d.B25095_072M,2), 
			"PCTGE35_OO_E" : d.B25095_007E + d.B25095_016E + d.B25095_025E + d.B25095_034E +d.B25095_043E + d.B25095_052E + d.B25095_061E + d.B25095_070E +
							 d.B25095_008E + d.B25095_017E + d.B25095_026E + d.B25095_035E +d.B25095_044E + d.B25095_053E + d.B25095_062E + d.B25095_071E +
							 d.B25095_009E + d.B25095_018E + d.B25095_027E + d.B25095_036E +d.B25095_045E + d.B25095_054E + d.B25095_063E + d.B25095_072E,
			"PCTGE35_OO_M" : Math.pow(d.B25095_007M,2) + Math.pow(d.B25095_016M,2) + Math.pow(d.B25095_025M,2)+ Math.pow(d.B25095_034M,2)+ Math.pow(d.B25095_043M,2) 
							+ Math.pow(d.B25095_052M,2) + Math.pow(d.B25095_061M,2) + Math.pow(d.B25095_070M,2) +
							Math.pow(d.B25095_008M,2) + Math.pow(d.B25095_017M,2) + Math.pow(d.B25095_026M,2) + Math.pow(d.B25095_035M,2)+ Math.pow(d.B25095_044M,2)
							+ Math.pow(d.B25095_053M,2) + Math.pow(d.B25095_062M,2) + Math.pow(d.B25095_071M,2) + 
							Math.pow(d.B25095_009M,2) + Math.pow(d.B25095_018M,2) + Math.pow(d.B25095_027M,2) + Math.pow(d.B25095_036M,2)+ Math.pow(d.B25095_045M,2)
							+ Math.pow(d.B25095_054M,2) + Math.pow(d.B25095_063M,2) + Math.pow(d.B25095_072M,2)
		 });			
	 });
	 
	 var RT_dat = [];
	 RT.forEach(d => {
		 RT_dat.push({
			"FIPS" : geotype == 'state' ? 8 : d.GEO2,
			"NAME" : d.NAME,
			"TOTAL_RT_E" : d.B25074_001E,
			"TOTAL_RT_M" : d.B25074_001M, 
			"PCT3539_RT_E" : d.B25074_007E + d.B25074_016E + d.B25074_025E + d.B25074_034E +d.B25074_043E + d.B25074_052E + d.B25074_061E, 
			"PCT3539_RT_M" : Math.pow(d.B25074_007M,2) + Math.pow(d.B25074_016M,2) + Math.pow(d.B25074_025M,2)+ Math.pow(d.B25074_034M,2)+ Math.pow(d.B25074_043M,2)
							+ Math.pow(d.B25074_052M,2) + Math.pow(d.B25074_061M,2), 
			"PCT4045_RT_E" : d.B25074_008E + d.B25074_017E + d.B25074_026E + d.B25074_035E +d.B25074_044E + d.B25074_053E + d.B25074_062E, 
			"PCT4045_RT_M" : Math.pow(d.B25074_008M,2) + Math.pow(d.B25074_017M,2) + Math.pow(d.B25074_026M,2) + Math.pow(d.B25074_035M,2)+ Math.pow(d.B25074_044M,2)
							+ Math.pow(d.B25074_053M,2) + Math.pow(d.B25074_062M,2), 
			"PCTGE50_RT_E" : d.B25074_009E + d.B25074_018E + d.B25074_027E + d.B25074_036E +d.B25074_045E + d.B25074_054E + d.B25074_063E, 
			"PCTGE50_RT_M" : Math.pow(d.B25074_009M,2) + Math.pow(d.B25074_018M,2) + Math.pow(d.B25074_027M,2) + Math.pow(d.B25074_036M,2)+ Math.pow(d.B25074_045M,2)
							+ Math.pow(d.B25074_054M,2) + Math.pow(d.B25074_063M,2), 
			"PCTGE35_RT_E" : d.B25074_007E + d.B25074_016E + d.B25074_025E + d.B25074_034E +d.B25074_043E + d.B25074_052E + d.B25074_061E +
							 d.B25074_008E + d.B25074_017E + d.B25074_026E + d.B25074_035E +d.B25074_044E + d.B25074_053E + d.B25074_062E +
							 d.B25074_009E + d.B25074_018E + d.B25074_027E + d.B25074_036E +d.B25074_045E + d.B25074_054E + d.B25074_063E,
			"PCTGE35_RT_M" : Math.pow(d.B25074_007M,2) + Math.pow(d.B25074_016M,2) + Math.pow(d.B25074_025M,2)+ Math.pow(d.B25074_034M,2)+ Math.pow(d.B25074_043M,2) 
							+ Math.pow(d.B25074_052M,2) + Math.pow(d.B25074_061M,2) +
							Math.pow(d.B25074_008M,2) + Math.pow(d.B25074_017M,2) + Math.pow(d.B25074_026M,2) + Math.pow(d.B25074_035M,2)+ Math.pow(d.B25074_044M,2)
							+ Math.pow(d.B25074_053M,2) + Math.pow(d.B25074_062M,2) +
							Math.pow(d.B25074_009M,2) + Math.pow(d.B25074_018M,2) + Math.pow(d.B25074_027M,2) + Math.pow(d.B25074_036M,2)+ Math.pow(d.B25074_045M,2)
							+ Math.pow(d.B25074_054M,2) + Math.pow(d.B25074_063M,2)

		 });	
	 });

	var fin_data = [];
	for(i = 0; i < OO_dat.length; i++){
		fin_data.push({
			'FIPS' : OO_dat[i].FIPS,
			'NAME' : OO_dat[i].NAME,
			'TOTAL_HH_E' :  OO_dat[i].TOTAL_OO_E  + RT_dat[i].TOTAL_RT_E,
			'TOTAL_HH_M' :  OO_dat[i].TOTAL_OO_M  + RT_dat[i].TOTAL_RT_M,
			'PCTGE35_HH_E' :  OO_dat[i].PCTGE35_OO_E  + RT_dat[i].PCTGE35_RT_E,
			'PCTGE35_HH_M' :  OO_dat[i].PCTGE35_OO_M  + RT_dat[i].PCTGE35_RT_M,
			'PCT3539_HH_E' :  OO_dat[i].PCT3539_OO_E  + RT_dat[i].PCT3539_RT_E,
			'PCT3539_HH_M' :  OO_dat[i].PCT3539_OO_M  + RT_dat[i].PCT3539_RT_M,
			'PCT4045_HH_E' :  OO_dat[i].PCT4045_OO_E  + RT_dat[i].PCT4045_RT_E,
			'PCT4045_HH_M' :  OO_dat[i].PCT4045_OO_M  + RT_dat[i].PCT4045_RT_M,
			'PCTGE50_HH_E' :  OO_dat[i].PCTGE50_OO_E  + RT_dat[i].PCTGE50_RT_E,
			'PCTGE50_HH_M' :  OO_dat[i].PCTGE50_OO_M  + RT_dat[i].PCTGE50_RT_M,
			'TOTAL_OO_E' :  OO_dat[i].TOTAL_OO_E,
			'TOTAL_OO_M' :  OO_dat[i].TOTAL_OO_M,
			'PCTGE35_OO_E' :  OO_dat[i].PCTGE35_OO_E,
			'PCTGE35_OO_M' :  OO_dat[i].PCTGE35_OO_M,
			'PCT3539_OO_E' :  OO_dat[i].PCT3539_OO_E,
			'PCT3539_OO_M' :  OO_dat[i].PCT3539_OO_M,
			'PCT4045_OO_E' :  OO_dat[i].PCT4045_OO_E,
			'PCT4045_OO_M' :  OO_dat[i].PCT4045_OO_M,
			'PCTGE50_OO_E' :  OO_dat[i].PCTGE50_OO_E,
			'PCTGE50_OO_M' :  OO_dat[i].PCTGE50_OO_M,
			'TOTAL_RT_E' :  RT_dat[i].TOTAL_RT_E,
			'TOTAL_RT_M' :  RT_dat[i].TOTAL_RT_M,
			'PCTGE35_RT_E' :  RT_dat[i].PCTGE35_RT_E,
			'PCTGE35_RT_M' :  RT_dat[i].PCTGE35_RT_M,
			'PCT3539_RT_E' :  RT_dat[i].PCT3539_RT_E,
			'PCT3539_RT_M' :  RT_dat[i].PCT3539_RT_M,
			'PCT4045_RT_E' :  RT_dat[i].PCT4045_RT_E,
			'PCT4045_RT_M' :  RT_dat[i].PCT4045_RT_M,
			'PCTGE50_RT_E' :  RT_dat[i].PCTGE50_RT_E,
			'PCTGE50_RT_M' :  RT_dat[i].PCTGE50_RT_M,
		});
	}; //i
return(fin_data);
 } //genhousIncome
 
 
 //genHHForecast generating Household Forecast Chart
function genHHForecast(level, inData,DDsel,Statsel, outDiv) {
const fmt_date = d3.timeFormat("%B %d, %Y");
const fmt_pct = d3.format(".1%");
  
var config = {responsive: true,
   displayModeBar: false};

if(level == "Region") {
//Generates the list of selected places
var fipsList = [];
var  opt,statopt, statVal;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }
}  else {
 var fipsList = [...new Set(inData.map(d => d.fips))];
}
//Setting stat value 
 var stlen = Statsel.options.length;
  for (var i = 0; i < stlen; i++) {
    statopt = Statsel.options[i];
    if (statopt.selected) {
      statVal = +statopt.value;
    }
  }


var selData = inData.filter(d => fipsList.includes(d.fips));
var selNames = [...new Set(selData.map(d => d.name))];

//Building Divs

 // Modifying outDiv to plot multiple selections

 var outdiv = document.getElementById(outDiv);
 outdiv.innerHTML = "";      
  var plotdiv = document.createElement('div');
   plotdiv.id = 'multi-container';
 //  plotdiv.className = 'multi-container';
  outdiv.appendChild(plotdiv);
  

 var plot_array = [];  
  for(i = 0; i < fipsList.length; i++) {
  var plot_grid = document.createElement('div');
  plot_grid.id = 'multiPlot'+i;
 // plot_grid.className = "multi_plot";
  plotdiv.appendChild(plot_grid);
  
  
 plot_array.push({'loc' : selNames[i],
 'fName' : "Household Forecast " + selNames[i] + ".png",
 'plot' : 'multiPlot'+i});

  } //i



var age_cats = [...new Set(inData.map(d => d.age_group_id))];
age_cats.shift();


var ctyNames;

for(i = 0; i < fipsList.length; i++) {

var outPlot = plot_array[i].plot; //destination plot
 var hh_data = [];
  for(j = 0; j < age_cats.length;j++){
	    var filtPlot = inData.filter(d => (d.fips == fipsList[i]) && (d.age_group_id == age_cats[j])); 
		var PlaceNames = [...new Set(filtPlot.map(d => d.name))];
		if(statVal == 0) {
		var x_labs = [...new Set(inData.map(d => d.year))];
	    var y_est = [...new Set(filtPlot.map(d => d.total_households))];
		var y_lab = "Number of Households"
		hh_data.push({x : x_labs,
                y : y_est,
				name : age_cats[j],
                type : 'bar'});
		}
		if(statVal == 1) {
		var x_labs = [...new Set(inData.map(d => d.grlabel))];
	    var y_est = [...new Set(filtPlot.map(d => d.growth))];
		x_labs.shift();
		y_est.shift();
		var y_lab = "Household Change";
		hh_data.push({x : x_labs,
                y : y_est,
				name : age_cats[j],
                type : 'bar'});
		}
		if(statVal == 2) {
		var x_labs = [...new Set(inData.map(d => d.grlabel))];
	    var y_est = [...new Set(filtPlot.map(d => d.cagr))];
		x_labs.shift();
		y_est.shift();
		var y_lab = "Household Change Rate (CAGR)";
		hh_data.push({x : x_labs,
                y : y_est,
				name : age_cats[j],
                mode : 'lines+markers'});
		}	
  } //j
  
 
var ftrStr = 'Data Sources: U.S. Census Bureau (1990-2010) and Colorado State Demography Office (2020-2050).  Print Date: ' +  fmt_date(new Date)

 var hh_layout = {
	showlegend : true,
  title: "Household Forecast by Year: " + PlaceNames[0],
    autosize: false,
    width: 1000,
    height : 400,
    xaxis: {
   title : 'Year',
   font: {
    size: 8,
    color: 'black'
   },
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : y_lab,
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat: statVal == 2 ? '%' : ','
    },
  annotations : [{text :  ftrStr , 
                font: {
    size : 9,
    color: 'black'
      },
      xref : 'paper', 
      x : 0, 
      yref : 'paper', 
      y : -0.37,
      align : 'left', 
      showarrow : false}]
  };
 

Plotly.newPlot(outPlot, hh_data, hh_layout,config);

 } //i
 
//Download Events
var dat_labs = x_labs;
var profileDat1 = document.getElementById('profileDat1');
var profileImg1 = document.getElementById('profileImg1');
profileDat1.onclick = function() {exportToCsv(selNames, 'hhforecast', selData,0)};
profileImg1.onclick = function() {exportToPng(selNames, 'hhforecast', plot_array,0)};
	 
 } //genHHForecast
 
 //genHHForecastChart  Wrapper for  Household Forecast Chart
function genHHForecastChart(inData,outDiv, bkmark, geotype) {
	var fipsList =  [... new Set(inData.map(tag => tag.fips))]; 
	var ctyNameList =  [... new Set(inData.map(tag => tag.name))]; 	

	pgSetup(geotype, "chart", outDiv, bkmark, true,false,fipsList, ctyNameList,0);
	
	//selecting initial dropdown values
   var selopts = "8,-101";
   $.each(selopts.split(","), function(i,e){
          $("#RegSelect1 option[value='" + e + "']").prop("selected", true);
       }); 
  
    $("#HHSelect1 option[value='0']").prop("selected", true);
 
   var dd0 = document.getElementById("RegSelect1");
   var dd1 = document.getElementById("HHSelect1")
   var btn0 = document.getElementById("RegBtn1");

  genHHForecast(geotype, inData,dd0, dd1,"PlotDiv1")

   btn0.addEventListener('click', function() {
    genHHForecast(geotype, inData,dd0, dd1,"PlotDiv1")
       });
} //genHHForecastChart
 


//genOccupancyTab Wrapper for Occupancy Table
function genOccupancyTab(inData,outDiv,bkmark,level,curYr,fipsArr) {

	const fmt_date = d3.timeFormat("%B %d, %Y");
    const fmt_yr = d3.format("0000");	
	const tabtitle = bkmark.title;
   
 if(level == "Region") {
	 var tmpFips = regionCOL(fipsArr);
     var strFips = tmpFips[0].fips.map(i => i);
	 var fileName = regionName(parseInt(fipsArr)) + " " + bkmark.title
}  else {
	var strFips =  fipsArr;
}
	

  	var row_labels = [
     {'title' : 'Total Housing Units', 'URL_link' : genCEDSCIUrl(level,'B25002',curYr,strFips)},
   {'title' : 'Occupied Housing Units', 'URL_link' : genCEDSCIUrl(level,'B25002',curYr,strFips)},
   {'title' : 'Vacant Housing Units', 'URL_link' : genCEDSCIUrl(level,'B25002',curYr,strFips)},
   {'title' : 'Vacant Housing Units for Sale or Rent', 'URL_link' : genCEDSCIUrl(level,'B25004',curYr,strFips)},
   {'title' : 'Vacant Housing Units Sold or Rented but not Occupied', 'URL_link' : genCEDSCIUrl(level,'B25004',curYr,strFips)},
   {'title' : 'Seasonal, Recreational, or Occasional Vacancy', 'URL_link' : genCEDSCIUrl(level,'B25004',curYr,strFips)},
   {'title' : 'Vacant - current residence elsewhere', 'URL_link' : genCEDSCIUrl(level,'B25005',curYr,strFips)},
   {'title' : 'Housing for Migrant Workers', 'URL_link' : genCEDSCIUrl(level,'B25004',curYr,strFips)},
   {'title' : 'Other Vacancy', 'URL_link' : genCEDSCIUrl(level,'B25004',curYr,strFips)}
	];
	

var tab_obj = genSubjTab(level,inData, 5,row_labels,true);

var count_obj = tab_obj[0];
var pct_obj = tab_obj[1];

pgSetup(level,"table",outDiv,bkmark,false,true,"", "", 0)
//footer
var tblfoot = [
               ['Source: U.S. Census Bureau  ('+fmt_yr(curYr) + ') ' + fmt_yr(curYr - 4) + '-' + fmt_yr(curYr) +' American Community Survey, Tables B25002, B25004, and B25005'],
			   ["Compiled by the Colorado State Demography Office"],
               ['Print Date : ' + fmt_date(new Date)]
      ];

var ftrString = "<tfoot>"
for(i = 0 ;i < tblfoot.length; i++){
	ftrString = ftrString + "<tr><td colspan='5'>" + tblfoot[i] + "</td></tr>";
}
ftrString = ftrString + "</tfoot>"

//Initial Table
var tabVal = 0;


	//selecting initial dropdown values
  $("#tabSelect2 option[value='0']").prop("selected", true);

   var dd0 = document.getElementById("tabSelect2");
   var btndown = document.getElementById("increment12");
   var btnup = document.getElementById("increment22");

DTtab("tabDiv2",pct_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle) 

   
  dd0.addEventListener('change', (event) => {
	   if(event.target.value == "0") {
		   DTtab("tabDiv2",pct_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle);
	   } else {
		   DTtab("tabDiv2",count_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle);
	   }
   });

   btndown.addEventListener('click', function() {
     tabVal = tabVal - 1;
	 if(tabVal < 0) {
		tabVal = 5
	 }
	 if(dd0.value == "0") {
		   DTtab("tabDiv2",pct_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle);
	   } else {
		   DTtab("tabDiv2",count_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle);
	  }
   });
  btnup.addEventListener('click', function() {
     tabVal = tabVal + 1;
	 if(tabVal > 5) {
		tabVal = 0
	 }
	 if(dd0.value == "0") {
		   DTtab("tabDiv2",pct_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle);
	   } else {
		   DTtab("tabDiv2",count_obj,tabVal,row_labels,ftrString,tblfoot,"occupancy",fileName,tabtitle);
	  }
    });
} // genOccupancyTab

//genSel1map The first tab, map
function genSel1map(level, fipsArr,nameArr,outDiv,bkMarkArr){

 const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_pct = d3.format(".2%")
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,");
    const fmt_yr = d3.format("00");

  
 const ctyList = ['Region', 'County', 'Regional Comparison', 'County Comparison'] 
    const muniList = ['Municipality', 'Municipal Comparison'];
 const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];
 const ctyPath = '../data/County_GEN_2014.geojson';
 const placecentroid = '../data/place_centroids.csv';
 
 //Set up projections and other mappy stuff
 var width = 600;
    var height = 300;
//Prep dom

 pgSetup(level,"chart",outDiv,bkMarkArr,true,false,fipsArr, nameArr, 0)

 //Generating output div
 var outDiv2 = document.getElementById("PlotDiv1");
 
//Create a list of counties from the region lists

var prom = [d3.json(ctyPath),d3.csv(placecentroid)]

Promise.all(prom).then(data =>{

 let projection = d3.geoMercator();
    projection.fitSize([width, height], data[0]);
    let geoGenerator = d3.geoPath().projection(projection);
 

var centData = []
for(i = 0; i < data[1].length; i++){
if(fipsArr.includes(data[1][i].placefp)){
 centData.push({'placefp' : data[1][i].placefp, 'name' : data[1][i].namelsad, 'long' : +data[1][i].x, 'lat' :+data[1][i].y});
 };
}

//Appending the svg
var div = d3.select(outDiv2).append("div").attr("class","tooltip").style("opacity",0);
var coMap = d3.select(outDiv2).append('svg').attr('width', width).attr('height', height);
     

if(ctyList.includes(level)) {

  //Plotting County Map
 coMap.append("g")
      .selectAll("path")
   .data(data[0].features)
   .enter()
      .append("path")
   .attr('class','cty')
   .attr('d', geoGenerator) 
   .attr('stroke', '#000')
   .attr('fill',function(d){ return selColor(fipsArr,nameArr,d,level);})
      .on("mouseover", function(event,d,i) {  
            div.transition()        
                .duration(200)      
                .style("opacity", function() {return selGeo(fipsArr,d,level) ? 1 : 0;}); 
            div.text(function() {return selGeo(fipsArr,d,level) ? d.properties.NAMELSAD : "";}) 
                .style("left", (event.pageX) + "px")     
                .style("top", (event.pageY - 28) + "px");    
            })                  
        .on("mouseout", function() {       
            div.transition()        
                .duration(500)      
                .style("opacity", 0);   
        });
} else { //Muni and CDP map
   coMap.append("g")
     .selectAll("path")
     .data(data[0].features)
     .enter()
     .append("path")
     .attr('class','cty')
     .attr('d', geoGenerator) 
     .attr('stroke', '#000')
     .attr('fill','#FFFFFF');
     
 coMap.selectAll("myCircles")
    .data(centData)
    .enter()
    .append("circle")
   .attr("cx", function(d){ return projection([d.long, d.lat])[0];})
   .attr("cy", function(d){ return projection([d.long, d.lat])[1];})
   .attr("r", 5)
   .style("fill", '#008000')
   .attr("stroke",  '#000000')
   .attr('stroke-width', 2)
   .style("opacity", 1 ) 
   .on("mouseover", function(event,d,i) {
     div.transition()        
      .duration(200)      
      .style("opacity", 1 ); 
     div.text(d.name) 
      .style("left", (event.pageX) + "px")     
      .style("top", (event.pageY - 28) + "px");    
   })                  
           .on("mouseout", function(d) {       
     div.transition(d)        
      .duration(500)      
      .style("opacity", 0);     
            }); 
};


}); //end of Promise
 
//Buttons and image download  Check the elements and modify export to png...

var profileImg1 = document.getElementById('profileImg1');
profileImg1.onclick = function() {exportToPng(nameArr, 'map', outDiv2,0)};
}; //end of genSel1map


function genSel1tab(level, fipsArr, nameArr, bkMark, outputPro, curYr) {
  const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("0000");


/*
Table Contents and Sources
 Current Year Population, SDO
 10 year Population Change, SDO
 10 year Percentage Change, SDO 
Current Year Total Employment, SDO 
Current ACS Median Household Income
Current ACS Median Home Value
Current ACS Percentage of Population with incomes below poverty line.
Current ACS Percentage of Population born in Colorado
*/

 const yrlist = [curYr - 10, curYr];
 
 const regList = ['Region', 'Regional Comparison'];
 const ctyList = ['County', 'County Comparison'];
 const muniList = ['Municipality', 'Municipal Comparison'];
 

if(regList.includes(level)) {
//Building fips Lists
  for(i = 0; i < fipsArr.length; i++) {
    var regNum = parseInt(fipsArr[i]);
    var tmplist = regionCOL(regNum);
    var fips_list =  tmplist[0].fips.map(function (x) { 
     return parseInt(x, 10); 
   });
  }
  
//Generating Urls 
 var fipsACS = [];

 for(i = 0; i < fips_list.length; i++){
   fipsACS.push(fips_list[i].toString().padStart(3,'0'));
    };
  //Population
  var popST =  'https://gis.dola.colorado.gov/lookups/components_region?reg_num=0&year=' + yrlist;
  var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + fips_list + '&year=' + yrlist;
  //Jobs
  var jobsST = 'https://gis.dola.colorado.gov/lookups/jobs?county=0&year='+ curYr +'&sector=0';
  var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+fips_list+'&year='+ curYr +'&sector=0';
  

  //median Income ACS  B19013  
  var incST = genACSUrl("profile",curYr,'B19013',1,1,'state',fipsACS)
  var incCTY = genACSUrl("profile",curYr,'B19013',1,1,level,fipsACS)
    
  //median house value ACS B25077
  var hvalST = genACSUrl("profile",curYr,'B25077',1,1,'state',fipsACS)
  var hvalCTY = genACSUrl("profile",curYr,'B25077',1,1,level,fipsACS)
  
  //pct poverty ACS B17001
  var povST = genACSUrl("profile",curYr,'B17001',1,59,'state',fipsACS);
  var povCTY = genACSUrl("profile",curYr,'B17001',1,59,level,fipsACS);
  
  //pct native CO ACS B05002
  var natST = genACSUrl("profile",curYr,'B05002',1,27,'state',fipsACS);
  var natCTY = genACSUrl("profile",curYr,'B05002',1,27,level,fipsACS);

  var prom = [d3.json(popST), d3.json(jobsST), d3.json(incST), d3.json(hvalST), d3.json(povST), d3.json(natST),
			  d3.json(popCTY), d3.json(jobsCTY), d3.json(incCTY), d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY)
     ];
 } //Region
 
if(ctyList.includes(level)) {
    var fips_list = [];
 var fipsACS = [];
  for(i = 0; i < fipsArr.length; i++) {
    fips_list.push(parseInt(fipsArr[i]));
    fipsACS.push(fipsArr[i]);
 }
 
  //Population
  var popST =  'https://gis.dola.colorado.gov/lookups/components_region?reg_num=0&year=' + yrlist;
  var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + fips_list + '&year=' + yrlist;
  //Jobs
  var jobsST = 'https://gis.dola.colorado.gov/lookups/jobs?county=0&year='+ curYr +'&sector=0';
  var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+fips_list+'&year='+ curYr +'&sector=0';
  

  //median Income ACS  B19013  
  var incST = genACSUrl("profile",curYr,'B19013',1,1,'state',fipsACS)
  var incCTY = genACSUrl("profile",curYr,'B19013',1,1,level,fipsACS)
  
  //median house value ACS B25077
  var hvalST = genACSUrl("profile",curYr,'B25077',1,1,'state',fipsACS)
  var hvalCTY = genACSUrl("profile",curYr,'B25077',1,1,level,fipsACS)
  
  //pct poverty ACS B17001
  var povST = genACSUrl("profile",curYr,'B17001',1,59,'state',fipsACS);
  var povCTY = genACSUrl("profile",curYr,'B17001',1,59,level,fipsACS);
  
  //pct native CO ACS B05002
  var natST = genACSUrl("profile",curYr,'B05002',1,27,'state',fipsACS);
  var natCTY = genACSUrl("profile",curYr,'B05002',1,27,level,fipsACS);


   var prom = [d3.json(popST), d3.json(jobsST), d3.json(incST), d3.json(hvalST), d3.json(povST), d3.json(natST),
			  d3.json(popCTY), d3.json(jobsCTY), d3.json(incCTY), d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY)
     ];
} //County

 if(muniList.includes(level)) {

  var fips_list =[];
  var muni_cty = [];
   var muni_cty_acs = [];
  var fipsACS = [];
  for(i = 0; i < fipsArr.length; i++){
   fips_list.push(parseInt(fipsArr[i]));
   var ctyVal = muni_county(fipsArr[i]);
   muni_cty.push(parseInt(ctyVal));
   muni_cty_acs.push(ctyVal);
   fipsACS.push(fipsArr[i]);
  };
  
  var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + muni_cty + '&year=' + yrlist;
  var popMUNI = 'https://gis.dola.colorado.gov/lookups/munipophousing?year=' + yrlist + '&placefips=' + fips_list + '&compressed=no';
   
  // Jobs
  var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+ muni_cty+'&year='+ curYr +'&sector=0';
  var jobsMUNI = 'https://gis.dola.colorado.gov/lookups/profilesql?table=estimates.muni_jobs_long&year='+ curYr + '&geo='+ fips_list;
 
 //median Income ACS  b19013001
  var incCTY = genACSUrl("profile",curYr,'B19013',1,1,'county',muni_cty_acs);
  var incMUNI = genACSUrl("profile",curYr,'B19013',1,1,level,fipsACS);
    
 //median house value ACS B25077
  var hvalCTY = genACSUrl("profile",curYr,'B25077',1,1,'county',muni_cty_acs)
  var hvalMUNI = genACSUrl("profile",curYr,'B25077',1,1,level,fipsACS)
  
 //pct poverty ACS B17001
  var povCTY = genACSUrl("profile",curYr,'B17001',1,59,'county',muni_cty_acs);
  var povMUNI = genACSUrl("profile",curYr,'B17001',1,59,level,fipsACS);
  
  //pct native CO ACS B05002
  var natCTY = genACSUrl("profile",curYr,'B05002',1,27,'county',muni_cty_acs);
  var natMUNI = genACSUrl("profile",curYr,'B05002',1,27,level,fipsACS);

   var prom = [d3.json(popCTY), d3.json(jobsCTY), d3.json(incCTY), d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY),
			  d3.json(popMUNI), d3.json(jobsMUNI), d3.json(incMUNI), d3.json(hvalMUNI), d3.json(povMUNI), d3.json(natMUNI)
     ];
  }  //Muni
  

  Promise.all(prom).then(data =>{
   if(regList.includes(level)){
    //Extracting State data records
    var popSTdata = data[0];
    var jobsSTdata = data[1];
    var incSTdata = acsPrep(data[2]);
    var hvalSTdata = acsPrep(data[3]);
    var povSTdata = acsPrep(data[4]);
    var natSTdata = acsPrep(data[5]);
 	
	var popCTYdata = data[6].sort(function(a, b){ return d3.ascending(a['year'], b['year']); }).sort(function(a, b){ return d3.ascending(a['countyfips'], b['countyfips']); });;
    var jobsCTYdata = data[7].sort(function(a, b){ return d3.ascending(a['area_code'], b['area_code']); });
    var incCTYdata = acsPrep(data[8]).sort(function(a, b){ return d3.ascending(a['GEO2'], b['GEO2']); });
    var hvalCTYdata = acsPrep(data[9]).sort(function(a, b){ return d3.ascending(a['GEO2'], b['GEO2']); });
    var povCTYdata = acsPrep(data[10]).sort(function(a, b){ return d3.ascending(a['GEO2'], b['GEO2']); });
    var natCTYdata = acsPrep(data[11]).sort(function(a, b){ return d3.ascending(a['GEO2'], b['GEO2']); });
     
	//Generating data sets 
   //Population Growth
   var tabgrST = calcpopGR(popSTdata,fipsArr,'state',yrlist);
   var tabgrREG = calcpopGR(popCTYdata,fipsArr,level,yrlist);
   var tabgrFIN =  tabgrST.concat(tabgrREG);
	

   //Jobs
   
   var state_jobs = [];
    state_jobs.push({'area_code' : jobsSTdata[0].area_code, 'name' : 'Colorado', 'population_year' : jobsSTdata[0].population_year, 'total_jobs' : +jobsSTdata[0].total_jobs});

   var cty_jobs = [];

    for(j = 0; j < jobsCTYdata.length; j++){
     cty_jobs.push({'area_code' : jobsCTYdata[j].area_code, 'name' : countyName(jobsCTYdata[j].area_code), 'population_year' : jobsCTYdata[j].population_year, 'total_jobs' : +jobsCTYdata[j].total_jobs});
    }; //J loop
 
    var reg_jobs = [];
    var pop_year = cty_jobs[0].population_year;
    var reg_val = -100 - parseInt(fipsArr[0])
    var jobs_reg = d3.rollup(cty_jobs, v => d3.sum(v, d => d.total_jobs));
    reg_jobs.push({'area_code' : reg_val, 'name' : nameArr[0], 'population_year' : pop_year, 'total_jobs' : jobs_reg});
    
	var jobsFIN = state_jobs.concat(reg_jobs, cty_jobs);
	
	//Median Income ACS
   var state_income = [];
   state_income.push({'fips' : incSTdata[0].GEO1, 'name' : incSTdata[0].NAME, 'est' : incSTdata[0].B19013_001E, 'moe' : incSTdata[0].B19013_001M});
   var median_income1 = procMedian(incCTYdata,fipsArr,'B19013_001E','B19013_001M',nameArr);
   var median_income = state_income.concat(median_income1);
   

   //Median House Value
   var state_home = [];
   state_home.push({'fips' : hvalSTdata[0].GEO1, 'name' : hvalSTdata[0].NAME, 'est' : hvalSTdata[0].B25077_001E, 'moe' : hvalSTdata[0].B25077_001M});
   var median_home1 = procMedian(hvalCTYdata,fipsArr,'B25077_001E','B25077_001M',nameArr);
   var median_home = state_home.concat(median_home1);


   //pct poverty
   var pov_state = procPCT(povSTdata,0,'B17001','state',nameArr);
   var pov_reg = procPCT(povCTYdata,fipsArr,'B17001',level,nameArr);
   var poverty = pov_state.concat(pov_reg);
   
   //pct native
   var coNat_state = procPCT(natSTdata,0,'B05002','state',nameArr);
   var coNat_reg = procPCT(natCTYdata,fipsArr,'B05002',level,nameArr);
   var coNative = coNat_state.concat(coNat_reg);
   }; //level = region

if(ctyList.includes(level)){
    var popSTdata = data[0];
    var jobsSTdata = data[1];
    var incSTdata = acsPrep(data[2]);
    var hvalSTdata = acsPrep(data[3]);
    var povSTdata = acsPrep(data[4]);
    var natSTdata = acsPrep(data[5]);
    
	var popCTYdata = data[6];
    var jobsCTYdata = data[7];
    var incCTYdata = acsPrep(data[8]);
    var hvalCTYdata = acsPrep(data[9]);
    var povCTYdata = acsPrep(data[10]);
    var natCTYdata = acsPrep(data[11]);
	 

   //Population Growth 
   var tabgrST = calcpopGR(popSTdata,fips_list,'state',yrlist);
   var tabgrCTY = calcpopGR(popCTYdata,fips_list,level,yrlist);
   var tabgrFIN =  tabgrST.concat(tabgrCTY);
   
   //Jobs
  var state_jobs = [];
    state_jobs.push({'area_code' : jobsSTdata[0].area_code, 'name' : 'Colorado', 'population_year' : jobsSTdata[0].population_year, 'total_jobs' : +jobsSTdata[0].total_jobs});

   var cty_jobs = [];
     cty_jobs.push({'area_code' : jobsCTYdata[0].area_code, 'name' : countyName(jobsCTYdata[0].area_code), 'population_year' : jobsCTYdata[0].population_year, 'total_jobs' : +jobsCTYdata[0].total_jobs});

	var jobsFIN = state_jobs.concat(cty_jobs);

   //Median Income -- 
    var state_income = [];
   state_income.push({'fips' : incSTdata[0].GEO1, 'name' : incSTdata[0].NAME, 'estimate' : incSTdata[0].B19013_001E, 'moe' : incSTdata[0].B19013_001M});

   var county_income = [];
   county_income.push({'fips' : incCTYdata[0].GEO2, 'name' : incCTYdata[0].NAME, 'estimate' : incCTYdata[0].B19013_001E, 'moe' : incCTYdata[0].B19013_001M});
   var median_income = state_income.concat(county_income); 
   
   //Median House Value
   var state_home = [];
   state_home.push({'fips' : hvalSTdata[0].GEO1, 'name' : hvalSTdata[0].NAME, 'estimate' : hvalSTdata[0].B25077_001E, 'moe' : hvalSTdata[0].B25077_001M});

   var county_home = [];
   county_home.push({'fips' : hvalCTYdata[0].GEO2, 'name' : hvalCTYdata[0].NAME, 'estimate' : hvalCTYdata[0].B25077_001E, 'moe' : hvalCTYdata[0].B25077_001M});
   var median_home = state_home.concat(county_home);
 
   //pct poverty
   var povertyST = procPCT(povSTdata,fipsArr,'B17001','state',nameArr);
   var povertyCTY = procPCT(povCTYdata,fipsArr,'B17001',level,nameArr);
   var poverty  = povertyST.concat(povertyCTY);
   
   //pct native
   var coNativeST = procPCT(natSTdata,fipsArr,'B05002','county',nameArr);
   var coNativeCTY = procPCT(natCTYdata,fipsArr,'B05002',level,nameArr);
   var coNative = coNativeST.concat(coNativeCTY);
}; //level = county   

if(muniList.includes(level)){

    var popCTYdata = data[0];
    var jobsCTYdata = data[1];
    var incCTYdata = acsPrep(data[2]);
    var hvalCTYdata = acsPrep(data[3]);
    var povCTYdata = acsPrep(data[4]);
    var natCTYdata = acsPrep(data[5]);
    
	var popMUNIdata = data[6];
    var jobsMUNIdata = data[7];
    var incMUNIdata = acsPrep(data[8]);
    var hvalMUNIdata = acsPrep(data[9]);
    var povMUNIdata = acsPrep(data[10]);
    var natMUNIdata = acsPrep(data[11]);
     

//removing multi-county 
if(popMUNIdata.length > 2){
	var tmppop = popMUNIdata.filter(function(d) {return d.countyfips == 999});
	var popMUNIdata = tmppop;
	};

    //Population Growth 
   var tabgrCTY = calcpopGR(popCTYdata,fips_list,'County',yrlist);
   var tabgrMUNI = calcpopGR(popMUNIdata,fips_list,level,yrlist);
   var tabgrFIN =  tabgrCTY.concat(tabgrMUNI);

   //Jobs
  var cty_jobs = [];
    cty_jobs.push({'area_code' : jobsCTYdata[0].area_code, 'name' : countyName(jobsCTYdata.area_code), 'population_year' : jobsCTYdata[0].population_year, 'total_jobs' : +jobsCTYdata[0].total_jobs});

   var muni_jobs = [];
     muni_jobs.push({'area_code' : +jobsMUNIdata[0].placefips, 'name' : muniName(jobsMUNIdata[0].placefips), 'population_year' : +jobsMUNIdata[0].year, 'total_jobs' : +jobsMUNIdata[0].jobs});

	var jobsFIN = cty_jobs.concat(muni_jobs);
    
   //Median Income
   var county_income = [];
   county_income.push({'fips' : incCTYdata[0].GEO2, 'name' : incCTYdata[0].NAME, 'eCTYimate' : incCTYdata[0].B19013_001E, 'moe' : incCTYdata[0].B19013_001M});

   var muni_income = [];
   muni_income.push({'fips' : incMUNIdata[0].GEO2, 'name' : incMUNIdata[0].NAME, 'eCTYimate' : incMUNIdata[0].B19013_001E, 'moe' : incMUNIdata[0].B19013_001M});
   var median_income = county_income.concat(muni_income);
   
   //Median House Value
   var county_home = [];
   county_home.push({'fips' : hvalCTYdata[0].GEO2, 'name' : hvalCTYdata[0].NAME, 'eCTYimate' : hvalCTYdata[0].B25077_001E, 'moe' : hvalCTYdata[0].B25077_001M});

   var muni_home = [];
   muni_home.push({'fips' : hvalMUNIdata[0].GEO2, 'name' : hvalMUNIdata[0].NAME, 'eCTYimate' : hvalMUNIdata[0].B25077_001E, 'moe' : hvalMUNIdata[0].B25077_001M});
   var median_home = county_home.concat(muni_home);
   
   //pct poverty
   var povertyCTY = procPCT(povCTYdata,fipsArr,'B17001','state',nameArr);
   var povertyMUNI = procPCT(povMUNIdata,fipsArr,'B17001','county',nameArr);
   var poverty  = povertyCTY.concat(povertyMUNI);
   
   //pct native
   var coNativeCTY = procPCT(natCTYdata,fipsArr,'B05002','county',nameArr);
   var coNativeMUNI = procPCT(natMUNIdata,fipsArr,'B05002',level,nameArr);
   var coNative = coNativeCTY.concat(coNativeMUNI);


}; //level = municipality   


//Prepping output table
//Building table data	

var outData = [];
for(i = 0; i < tabgrFIN.length; i++){
		outData.push({
			fips : tabgrFIN[i].fips,
			name : tabgrFIN[i].name,
			pop: fmt_comma(tabgrFIN[i].yr2),
			pop_change : fmt_comma(tabgrFIN[i].popch),
			pop_growth : fmt_pct(tabgrFIN[i].growth),
			total_jobs : fmt_comma(jobsFIN[i].total_jobs),
			income_est : fmt_dollar(median_income[i].est),
			income_moe : fmt_dollar(median_income[i].moe),
			home_est : fmt_dollar(median_home[i].est),
			home_moe : fmt_dollar(median_home[i].moe),
			pov_est : fmt_pct(poverty[i].pct_est),
			pov_moe : fmt_pct(poverty[i].pct_moe),
			co_est : fmt_pct(coNative[i].pct_est),
			co_moe : fmt_pct(coNative[i].pct_moe)
})
};

var curyr = yrlist[1];
var prevyr = yrlist[0];


var row_labels = [
       {'title': 'Population ('+curyr+')*', 'URL_link' : muniList.includes(level) ? 'https://coloradodemography.github.io/population/data/muni-pop-housing/' : 'https://coloradodemography.github.io/population/data/county-data-lookup/'},
       {'title': 'Population Change (' + prevyr + ' to ' + curyr + ')*', 'URL_link' : muniList.includes(level) ? 'https://coloradodemography.github.io/population/data/muni-pop-housing/' : 'https://coloradodemography.github.io/population/data/county-data-lookup/'},
       {'title': 'Percentage Change (' + prevyr + ' to ' + curyr + ')*', 'URL_link' : muniList.includes(level) ? 'https://coloradodemography.github.io/population/data/muni-pop-housing/' : 'https://coloradodemography.github.io/population/data/county-data-lookup/'},
       {'title': 'Total Employment (' + curyr + ')*', 'URL_link': 'https://coloradodemography.github.io/economy-labor-force/data/jobs-by-sector/#jobs-by-sector-naics'},
       {'title': 'Median Household Income^', 'URL_link' :  genCEDSCIUrl(level,'B19013',curyr,fipsACS)},
       {'title': 'Median Home Value^', 'URL_link' : genCEDSCIUrl(level,'B25077',curyr,fipsACS)},
       {'title': 'Percentage of Population with incomes below poverty line.^', 'URL_link' : genCEDSCIUrl(level,'B17001',curyr,fipsACS)},
       {'title': 'Percentage of Population born in Colorado^', 'URL_link' : genCEDSCIUrl(level,'B05002',curyr,fipsACS)}
    ];

var tab_obj = genSubjTab(level, outData, 1,row_labels,false);


var fileName = "Basic Statistics " + nameArr[0];
pgSetup(level,"table",outputPro,bkMark,false,false,"", "", 0)
//Table Footer

var acsyr1 = curyr - 4;

var tblfoot = [
               ["Sources: * Colorado State Demography Office"],
               ['^U.S. Census Bureau (' + fmt_yr(curyr) + '). '+fmt_yr(acsyr1) + '-' + fmt_yr(curyr) +' American Community Survey 5-year data set.'],
               ['Print Date : ' + fmt_date(new Date)]
      ];
	  

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
     ftrString = ftrString + "<tr><td colspan='5'>" + tblfoot[i] + "</td></tr>";
 }; 
ftrString = ftrString + "</tr></tfoot>";

var ftrMsg = "Sources: * Colorado State Demography Office " + '^U.S. Census Bureau (' + fmt_yr(curyr) + '). '+fmt_yr(acsyr1) + '-' + fmt_yr(curyr) +' American Community Survey 5-year data set.' +
   "Print Date : " + fmt_date(new Date);
   
//Initial Table
var tabVal = 0;


	//selecting initial dropdown values

   var btndown = document.getElementById("increment12");
   var btnup = document.getElementById("increment22");

DTtab("tabDiv2",tab_obj,tabVal,row_labels,ftrString,tblfoot,"summtab",fileName,bkMark.title) 


   btndown.addEventListener('click', function() {
     tabVal = tabVal - 1;
	 if(tabVal < 0) {
		tabVal = 5
	 }
		   DTtab("tabDiv2",tab_obj,tabVal,row_labels,ftrString,tblfoot,"summtab",fileName,bkMark.title);
   });
  btnup.addEventListener('click', function() {
     tabVal = tabVal + 1;
	 if(tabVal > 5) {
		tabVal = 0
	 }
		   DTtab("tabDiv2",tab_obj,tabVal,row_labels,ftrString,tblfoot,"summtab",fileName,bkMark.title);
    });

  }); //End of Promise
};  //End of genSel1Tab

//genSel1display outputs objects for the first panel of the profile display
function genSel1display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {

   PRO_1.innerHTML = "";
   PRO_2.innerHTML = "";
   PRO_3.innerHTML = "";
   PRO_4.innerHTML = "";

//Generate Bookmark array
var bkmarkArr = [{title : names[0] + " Basic Statistics", id : "map"},
	{title: "Summary Statistics Table", id : "summtab"}
	]

insertBkmark(bkmarkArr);

  genSel1map(geotype, fipsArr, names, PRO_1.id, bkmarkArr[0]);
  genSel1tab(geotype, fipsArr, names, bkmarkArr[1], PRO_2.id,curyear);
};

//genSel2display  Outputs objects for the Population Trends panel of the profile... 
function genSel2display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
  const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

 const regList = ['Region', 'Regional Comparison'];
 const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
 const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];
    const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

//Generate Bookmark array
var bkmarkArr = [{title : 'Population Growth Table', id : 'popgr'},
		{title : 'Population Estimate Chart', id : 'popest'},
		{title : 'Population Forecast Chart', id : 'popfor'},
		{title : 'Components of Change Chart',	id : 'popcoc'}
	]

insertBkmark(bkmarkArr);

//prepping general values 
 var yr_list = range(1985,curyear); 
 var forc_yrs = range(2020,2050); 
 var state_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
 var stateurl = "https://gis.dola.colorado.gov/lookups/profile?county=" + state_list + "&year=" + yr_list + "&vars=totalpopulation,births,deaths,netmigration";
//Clear out Divs

  PRO_1.innerHTML = "";
  PRO_2.innerHTML = "";
  PRO_3.innerHTML = "";
  PRO_4.innerHTML = "";

//Regions
if(regList.includes(geotype)){
  var fips_tmp = regionCOL(parseInt(fipsArr));
     var fips_list =  fips_tmp[0].fips.map(x => parseInt(x, 10));
  var ctyurl = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalpopulation,births,deaths,netmigration";
        var forcurl = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3"
  
  var prom = [d3.json(ctyurl),d3.json(forcurl),d3.json(stateurl)];
  };


//Counties
if(ctyList.includes(geotype)) {
 if(fipsArr == "000") {
      fips_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
    } else {
  fips_list = [parseInt(fipsArr)];
 }; 

 var ctyurl = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalpopulation,births,deaths,netmigration";
    var forcurl = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3" 
 var prom = [d3.json(ctyurl),d3.json(forcurl),d3.json(stateurl)];
}; 

//Municipalities -- Only for the growth table
if(muniList.includes(geotype)){

    var munifips = parseInt(fipsArr);   
    var ctyfips = parseInt(muni_county(fipsArr));
    var muniurl = 'https://gis.dola.colorado.gov/lookups/countymuni?placefips='+ munifips + '&year=' + yr_list +'&compressed=no';
 var ctyurl = "https://gis.dola.colorado.gov/lookups/profile?county=" + ctyfips + "&year=" + yr_list + "&vars=totalpopulation,births,deaths,netmigration";
    var forcurl = "https://gis.dola.colorado.gov/lookups/sya?county=" + ctyfips + "&year=" + forc_yrs + "&choice=single&group=3" 
 var prom = [d3.json(ctyurl),d3.json(forcurl),d3.json(stateurl),d3.json(muniurl)];
};


Promise.all(prom).then(data =>{
// Processing State Table
var columnsToSum = ['births', 'deaths', 'totalpopulation'];

//Rolling up data for table
var state_sum =  d3.rollup(data[2], v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year)

//Flatten Arrays for output
var state_data = [];
var state_gr_data = [];
for (let [key, value] of state_sum) {
  state_data.push({'fips' : 0, 'name' : 'Colorado', 'year' : key, 'totalpopulation' : value.totalpopulation});
     };
 


//Growth Table
// Generate data set for output Table
var sel_yr = range(1990,curyear);
var sel_yr5 = [];
for(i = 0; i < sel_yr.length;i++){
 if(sel_yr[i] % 5 == 0) {
  sel_yr5.push(sel_yr[i]);
 }
};
if(sel_yr5[sel_yr5.length] != curyear) {
 sel_yr5.push(curyear);
};

var cty_gr_data = data[0].filter(function(d) {return sel_yr5.includes(d.year)});
var state_gr_data = state_data.filter(function(d) {return sel_yr5.includes(d.year)});

var tab_cty_data = []
for(i = 0; i< cty_gr_data.length; i++){
  tab_cty_data.push({ 'fips' : cty_gr_data[i].countyfips, 'name' : countyName(cty_gr_data[i].countyfips), 'year' : cty_gr_data[i].year, 'totalpopulation' : +cty_gr_data[i].totalpopulation})
}


var fipsList = cty_gr_data[0].countyfips
var ctyNameList = countyName(cty_gr_data[0].countyfips)
//Regional Table
if(regList.includes(geotype)) {
var fileName = "Population Growth Table " + regionName(fipsArr);
var regionNum = -101;

//Rolling up data for table
var tab_reg_sum = d3.rollup(tab_cty_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);

//Flatten Arrays for output
var tab_reg_data = [];
for (let [key, value] of tab_reg_sum) {
  tab_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };

var tab_gr = state_gr_data.concat(tab_reg_data).concat(tab_cty_data) //This is 5 year data

//Estimates data
//Creating Single year data for the places and counties
var est_cty_data = []
for(i = 0; i< data[0].length; i++){
  est_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 'totalpopulation' : +data[0][i].totalpopulation})
}

//Rolling up data for table
var est_reg_sum = d3.rollup(est_cty_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);

//Flatten Arrays for output
var est_reg_data = [];
for (let [key, value] of est_reg_sum) {
  est_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };

var est_data = est_reg_data.concat(est_cty_data) //This is single year data
var fipsList = [...new Set(est_data.map(d => d.fips))];
var ctyNameList = [...new Set(est_data.map(d => d.name))];

//Generating Forecast data   
//This is Forecast by SYA
var forec_data = [];
for(i = 0; i< data[1].length; i++){
  forec_data.push({ 'fips' : data[1][i].countyfips, 'name' : countyName(data[1][i].countyfips), 'year' : data[1][i].year, 'age' : +data[1][i].age, 'totalpopulation' : +data[1][i].totalpopulation})
}

//rolling up for counties and region
var forec_reg_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);
var forec_cty_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.fips);
//Flatten Arrays for output
var forec_reg_data = [];
for (let [key, value] of forec_reg_sum) {
  forec_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };
 

var forec_cty_data = [];
for (let [key1, value] of forec_cty_sum) {
for (let[key2, value2] of value) {
   forec_cty_data.push({'fips' : key2, 'name' : countyName(key2), 'year' : key1, 'totalpopulation' : value2});
}
};

var forec_data = forec_reg_data.concat(forec_cty_data);

//Components of Change
var columnsToSum = ['births', 'deaths', 'netmigration', 'totalpopulation'];
var coc_cty_data = []
for(i = 0; i< data[0].length; i++){
  coc_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 
  'births' : +data[0][i].births, 'deaths' : +data[0][i].deaths, 'netmigration' : +data[0][i].netmigration, 'totalpopulation' : +data[0][i].totalpopulation})
}

//Rolling up data for table
var coc_reg_sum =  d3.rollup(data[0], v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year)

//Flatten Arrays for output
var coc_reg_data = [];
for (let [key, value] of coc_reg_sum) {
  coc_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'births' : value.births, 'deaths' : value.deaths, 
               'netmigration' : value.netmigration, 'totalpopulation' : value.totalpopulation});
    };

var coc_data = coc_reg_data.concat(coc_cty_data) //This is single year data

//Output

growth_tab(geotype, tab_gr,bkmarkArr[0],fileName, PRO_1);  
//Plots
genRegEstSetup(geotype,est_data,PRO_2.id,bkmarkArr[1], fipsList, ctyNameList);
genRegForeSetup(geotype,forec_data,PRO_3.id, bkmarkArr[2],fipsList, ctyNameList);
genRegcocSetup(geotype,coc_data,PRO_4.id, bkmarkArr[3],fipsList, ctyNameList);
} //Regional

//County -- Need Growth Tab, Estimates, Forecasts, COC
if(ctyList.includes(geotype)) {
 var fileName = "Population Growth Table " + countyName(parseInt(fipsArr));

var tab_gr = state_gr_data.concat(tab_cty_data) //This is 5 year data

//Estimates data
//Creating Single year data for the places and counties
var est_cty_data = []
for(i = 0; i< data[0].length; i++){
  est_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 'totalpopulation' : +data[0][i].totalpopulation})
}


var est_data = est_cty_data; //This is single year data
var fipsList = [...new Set(est_data.map(d => d.fips))];
var ctyNameList = [...new Set(est_data.map(d => d.name))];

//Generating Forecast data   
//This is Forecast by SYA
var forec_data = [];
for(i = 0; i< data[1].length; i++){
  forec_data.push({ 'fips' : data[1][i].countyfips, 'name' : countyName(data[1][i].countyfips), 'year' : data[1][i].year, 'age' : +data[1][i].age, 'totalpopulation' : +data[1][i].totalpopulation})
}

//rolling up for counties 
var forec_cty_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.fips);
//Flatten Arrays for output
var forec_cty_data = [];
for (let [key, value] of forec_cty_sum) {
  forec_cty_data.push({'fips' : fipsArr, 'name' : countyName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };

var forec_data = forec_cty_data;

//Components of Change
var columnsToSum = ['births', 'deaths', 'netmigration'];
var coc_cty_data = []
for(i = 0; i< data[0].length; i++){
  coc_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 
  'births' : +data[0][i].births, 'deaths' : +data[0][i].deaths, 'netmigration' : +data[0][i].netmigration})
}


var coc_data = coc_cty_data; //This is single year data

 growth_tab(geotype, tab_gr,bkmarkArr[0],fileName, PRO_1);  
 estPlot(est_data, "profile", geotype, PRO_2.id, bkmarkArr[1], curyear, fipsList, ctyNameList);
 var fore_Data = forecastPlot(data[1], "profile", PRO_3.id, bkmarkArr[2], curyear, fipsList, ctyNameList);
 cocPlot(data[0],"profile", PRO_4.id, bkmarkArr[3], curyear, fipsList, ctyNameList);
}; //County


//Municipalities
if(muniList.includes(geotype)) {


//Checking for multi places
var muni_data = data[3].filter(d => d.countyfips != 999);
 
var muni_sum = d3.rollup(muni_data, v => d3.sum(v, d => d.totalpopulation), d => d.year);
var muni_raw_data = [];
for (let [key, value] of muni_sum) {
  muni_raw_data.push({'fips' : fipsArr, 'name' : muniName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };
 

var tab_muni_data = muni_raw_data.filter(function(d) {return sel_yr5.includes(d.year)});
var fileName = "Population Growth Table " + muniName(parseInt(fipsArr));


var tab_gr = state_gr_data.concat(tab_cty_data).concat(tab_muni_data) //This is 5 year data

//Estimates data
//Creating Single year data for the places and counties
var est_cty_data = []
for(i = 0; i< data[0].length; i++){
  est_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 'totalpopulation' : +data[0][i].totalpopulation})
}


var est_data = est_cty_data; //This is single year data
var fipsList = [...new Set(est_data.map(d => d.fips))];
var ctyNameList = [...new Set(est_data.map(d => d.name))];

//Generating Forecast data   
//This is Forecast by SYA
var forec_data = [];
for(i = 0; i< data[1].length; i++){
  forec_data.push({ 'fips' : data[1][i].countyfips, 'name' : countyName(data[1][i].countyfips), 'year' : data[1][i].year, 'age' : +data[1][i].age, 'totalpopulation' : +data[1][i].totalpopulation})
}

//rolling up for counties 
var forec_cty_sum = d3.rollup(forec_data, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.fips);
//Flatten Arrays for output
var forec_cty_data = [];
for (let [key, value] of forec_cty_sum) {
  forec_cty_data.push({'fips' : fipsArr, 'name' : countyName(fipsArr), 'year' : key, 'totalpopulation' : value});
    };

var forec_data = forec_cty_data;

//Components of Change
var columnsToSum = ['births', 'deaths', 'netmigration'];
var coc_cty_data = []
for(i = 0; i< data[0].length; i++){
  coc_cty_data.push({ 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips), 'year' : data[0][i].year, 
  'births' : +data[0][i].births, 'deaths' : +data[0][i].deaths, 'netmigration' : +data[0][i].netmigration})
}


var coc_data = coc_cty_data; //This is single year data
 
 growth_tab(geotype, tab_gr,bkmarkArr[0],fileName, PRO_1);  
 estPlot(est_data, "profile", geotype, PRO_2.id, bkmarkArr[1],curyear, fipsList, ctyNameList);
 var fore_Data = forecastPlot(data[1], "profile", PRO_3.id, bkmarkArr[2],curyear, fipsList, ctyNameList);
 cocPlot(data[0],"profile", PRO_4.id,bkmarkArr[3], curyear, fipsList, ctyNameList);
}; //Municipality
}); //End of Promise

}; //end genSel2display


//genSel3display  Produces age panel charts, Age estimates and forecasts facet chart, and Age Pyramid
function genSel3display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
  const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

 const regList = ['Region', 'Regional Comparison'];
 const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
 const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];
    const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

//Clear out Divs

  PRO_1.innerHTML = "";
  PRO_2.innerHTML = "";
  PRO_3.innerHTML = "";
  PRO_4.innerHTML = "";

//This code Generates data for regions and counties...
if(regList.includes(geotype)){
  var fips_tmp = regionCOL(parseInt(fipsArr));
     var fips_list =  fips_tmp[0].fips.map(function (x) { 
     return parseInt(x, 10); 
   });
 } else {
  fips_list = [parseInt(fipsArr)];
 };  



 
//Estimages and Forecasts --For Regions and Counties
var acsyr = 0;  //The dummy year value
   var forc_yrs = curyear + "," + (curyear+ 10); 
 var forcurlCO = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=0&year=" + forc_yrs + "&choice=single"
 var forcurlCty = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3"

var prom = [d3.json(forcurlCO), d3.json(forcurlCty)];

//Estimages and Forecasts --For muniipalities, take  from the ACS No forecast
if(muniList.includes(geotype)){
 var ctynum = muni_county(fipsArr);
 var forcurlCty = "https://api.census.gov/data/"+ curyear + "/acs/acs5?get=group(B01001)&for=county:" + ctynum +"&in=state:08&key=08fe07c2a7bf781b7771d7cccb264fe7ff8965ce";
  var forcurlMuni = "https://api.census.gov/data/"+ curyear + "/acs/acs5?get=group(B01001)&for=place:" + fipsArr +"&in=state:08&key=08fe07c2a7bf781b7771d7cccb264fe7ff8965ce";
    var prom = [d3.json(forcurlCty), d3.json(forcurlMuni)];
}

Promise.all(prom).then(data =>{
//Selecting year range
if(muniList.includes(geotype)){
     var cty_age_pct = acsAgePct(data[0],ctynum, curyear, 'county');
  var cty_age_pyr = acsAgePyr(data[0],ctynum,curyear,'county');
  var muni_age_pct = acsAgePct(data[1],fipsArr[0], curyear, 'muni');
  var muni_age_pyr = acsAgePyr(data[1],fipsArr[0], curyear,'muni');
     var fin_age_pct = cty_age_pct.concat(muni_age_pct);
  var fin_age_pyr = cty_age_pyr.concat(muni_age_pyr);
} else { //County and Region data files
//State data

 var CO_age_raw = [];
 var CO_age_data = [];
 for(i = 0; i < data[0].length; i++){
    CO_age_raw.push({ fips : data[0][i].reg_num,
       geo_name : data[0][i].region,
       year : data[0][i].year,
       age : data[0][i].age,
       malepopulation_e : +data[0][i].malepopulation,
       femalepopulation_e : +data[0][i].femalepopulation, 
       totalpopulation_e : +data[0][i].totalpopulation });
 };
 
//Assigning age categories
  CO_age_raw.forEach(function(obj) {
     if(obj.age >=  0 && obj.age <= 4) {obj.age_cat = "0 to 4"; obj.agecatno = 1;}
    if(obj.age >= 5 && obj.age <= 17) {obj.age_cat = "5 to 17"; obj.agecatno = 2;}
    if(obj.age >= 18 && obj.age <= 24) {obj.age_cat = "18 to 24"; obj.agecatno = 3;}
    if(obj.age >= 25 && obj.age <= 54) {obj.age_cat = "25 to 54"; obj.agecatno = 4;}
 if(obj.age >= 55 && obj.age <= 64) {obj.age_cat = "55 to 64"; obj.agecatno = 5;}
 if(obj.age >= 65 && obj.age <= 74) {obj.age_cat = "65 to 74"; obj.agecatno = 6;}
 if(obj.age >= 75 && obj.age <= 84) {obj.age_cat = "75 to 84"; obj.agecatno = 7;}
    if(obj.age >= 85) {obj.age_cat = "85 +"; obj.agecatno = 8;}
    CO_age_data.push({'fips' : obj.fips, 'year' : obj.year, 'age' : obj.age, 'age_cat_no' : obj.agecatno, 'age_cat' : obj.age_cat, 
        'malepopulation_e' : obj.malepopulation_e, 'femalepopulation_e' : obj.femalepopulation_e, 'totalpopulation_e' : obj.totalpopulation_e});
 });

//County data

 var cty_age_raw = [];
 var cty_age_data = [];
 for(i = 0; i < data[1].length; i++){
    cty_age_raw.push({ fips : data[1][i].countyfips,
       name : data[1][i].county,
       year : data[1][i].year,
       age : data[1][i].age,
       malepopulation_e : +data[1][i].malepopulation,
       femalepopulation_e : +data[1][i].femalepopulation, 
       totalpopulation_e : +data[1][i].totalpopulation });
 };

//Assigning age categories
  cty_age_raw.forEach(function(obj) {
    if(obj.age >=  0 && obj.age <= 4) {obj.age_cat = "0 to 4"; obj.agecatno = 1;}
    if(obj.age >= 5 && obj.age <= 17) {obj.age_cat = "5 to 17"; obj.agecatno = 2;}
    if(obj.age >= 18 && obj.age <= 24) {obj.age_cat = "18 to 24"; obj.agecatno = 3;}
    if(obj.age >= 25 && obj.age <= 54) {obj.age_cat = "25 to 54"; obj.agecatno = 4;}
 if(obj.age >= 55 && obj.age <= 64) {obj.age_cat = "55 to 64"; obj.agecatno = 5;}
 if(obj.age >= 65 && obj.age <= 74) {obj.age_cat = "65 to 74"; obj.agecatno = 6;}
 if(obj.age >= 75 && obj.age <= 84) {obj.age_cat = "75 to 84"; obj.agecatno = 7;}
    if(obj.age >= 85) {obj.age_cat = "85 +"; obj.agecatno = 8;}
    cty_age_data.push({'fips' : obj.fips, 'year' : obj.year, 'age' : obj.age, 'age_cat_no' : obj.agecatno, 'age_cat' : obj.age_cat, 
        'malepopulation_e' : obj.malepopulation_e, 'femalepopulation_e' : obj.femalepopulation_e, 'totalpopulation_e' : obj.totalpopulation_e});
 });
 
 
 //Rolling up State and County data

 
 var columnsToSum = ['malepopulation_e', 'femalepopulation_e', 'totalpopulation_e'];
 var age_CO_data = [];
 var CO_age_sum =  d3.rollup(CO_age_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year,  d => d.age_cat_no, d => d.age_cat)
 //Flatten 
for (let [key1, value] of CO_age_sum) {
for (let[key2, value2] of value) {
for (let [key3, value3] of value2) {
   age_CO_data.push({'fips' : 0, 'name' : 'Colorado', 'year' : key1, 'age_cat_no' : key2, 'age_cat' : key3,
     'malepopulation_e' : value3.malepopulation_e, 'femalepopulation_e' : value3.femalepopulation_e, 'totalpopulation_e' : value3.totalpopulation_e});
}
};
};


 var age_cty_data = [];
 var cty_age_sum =  d3.rollup(cty_age_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.fips, d => d.year, d => d.age_cat_no, d => d.age_cat);
 
  //Flatten 
for (let [key1, value1] of cty_age_sum) {
for (let [key2, value2] of value1) {
for (let [key3, value3] of value2) {
for (let [key4, value4] of value3) {
   age_cty_data.push({'fips' : key1, 'name' : countyName(key1), 'year' : key2, 'age_cat_no' : key3, 'age_cat' : key4,
     'malepopulation_e' : value4.malepopulation_e, 'femalepopulation_e' : value4.femalepopulation_e, 'totalpopulation_e' : value4.totalpopulation_e});
}
}
};
};
var age_cty_data_s = age_cty_data.sort(function(a, b){ return d3.ascending(a['age_cat_no'], b['age_cat_no']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); })
  .sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });

var age_cty_data = age_cty_data_s;

 //Generating regional total
if(regList.includes(geotype)) {

//Rolling up regional data for table
var age_reg_sum =  d3.rollup(cty_age_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.age_cat_no, d => d.age_cat)

//Flatten Arrays for output
var age_reg_data = [];
var regionNum = -101;

for (let [key1, value] of age_reg_sum) {
for (let[key2, value2] of value) {
for (let[key3, value3] of value2) {
   age_reg_data.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key1, 'age_cat_no' : key2, 'age_cat' : key3,
     'malepopulation_e' : value3.malepopulation_e, 'femalepopulation_e' : value3.femalepopulation_e, 'totalpopulation_e' : value3.totalpopulation_e});
}
};
};

var age_reg_data_s = age_reg_data.sort(function(a, b){ return d3.ascending(a['age_cat_no'], b['age_cat_no']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });

var age_regdata = age_reg_data_s;

var fin_age_data = age_CO_data.concat(age_reg_data).concat(age_cty_data) //This is grouped age data

//Need to calculate percentages...
var pct_base = d3.rollup(fin_age_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.fips, d => d.year)
var age_base = [];
for (let [key1, value] of pct_base) {
for (let[key2, value2] of value) {
   age_base.push({'fips' : key1, 'year' : key2, 
     'tot_malepopulation_e' : value2.malepopulation_e, 'tot_femalepopulation_e' : value2.femalepopulation_e, 'tot_totalpopulation_e' : value2.totalpopulation_e});
}
};

var fin_age_pct = [];
for(i = 0; i < age_base.length;i++){
 var selfips = age_base[i].fips;
 var selyear = age_base[i].year;
 var selmale = age_base[i].tot_malepopulation_e;
 var selfemale = age_base[i].tot_femalepopulation_e;
 var seltotal = age_base[i].tot_totalpopulation_e;
 var age_tmp = fin_age_data.filter(d => (d.fips == selfips && d.year == selyear));

 for(j = 0; j < age_tmp.length; j++){
    fin_age_pct.push({'fips' : age_tmp[j].fips, 'name' : age_tmp[j].name, 'year' : age_tmp[j].year, 'age_cat_no' : age_tmp[j].age_cat_no, 'age_cat' : age_tmp[j].age_cat,
              'malepopulation_e' : age_tmp[j].malepopulation_e, 'femalepopulation_e' : age_tmp[j].femalepopulation_e, 
     'totalpopulation_e' : age_tmp[j].totalpopulation_e,
     'pct_malepopulation_e' : age_tmp[j].malepopulation_e/selmale, 'pct_femalepopulation_e' : age_tmp[j].femalepopulation_e/selfemale,
     'pct_totalpopulation_e' : age_tmp[j].totalpopulation_e/seltotal});
 }; //j

}; //i

//Creating dataset for age Pyramids 
//Colorado

// Convert data to numbers
var CO_age_tmp = []
data[0].forEach( item => {
 CO_age_tmp.push({'fips' : item.reg_num,
                 'name' : item.region,
     'year' : item.year,
     'age' : item.age,
     'malepopulation_e' : parseInt(item.malepopulation),
     'femalepopulation_e' : parseInt(item.femalepopulation),
     'totalpopulation_e' : parseInt(item.totalpopulation)
 })})
      
var CO_age_SYA = CO_age_tmp.sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
     
var cty_age_tmp = []
data[1].forEach( item => {
 cty_age_tmp.push({'fips' : item.countyfips,
                 'name' : countyName(item.countyfips),
     'year' : item.year,
     'age' : item.age,
     'malepopulation_e' : parseInt(item.malepopulation),
     'femalepopulation_e' : parseInt(item.femalepopulation),
     'totalpopulation_e' : parseInt(item.totalpopulation)
 })})
 
 
var cty_age_SYA = cty_age_tmp.sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
        .sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); }) 
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });     

//Region 
//Rolling up regional data for table
var reg_age_tmp =  d3.rollup(cty_age_SYA, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.age)

//Flatten Arrays for output
var reg_age_temp_s = [];
var regionNum = -101;

for (let [key, value] of reg_age_tmp) {
for (let[key2, value2] of value) {
   reg_age_temp_s.push({'fips' : regionNum, 'name' : regionName(fipsArr), 'year' : key, 'age' : key2, 
     'malepopulation_e' : value2.malepopulation_e, 'femalepopulation_e' : value2.femalepopulation_e, 'totalpopulation_e' : value2.totalpopulation_e});
}
};

var reg_age_SYA = reg_age_temp_s.sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });

var fin_age_pyr = bin_age5(CO_age_SYA.concat(reg_age_SYA).concat(cty_age_SYA));

};  //Region

//County charts and pyramids -- State and County data are already rolled up.  age_cty_data 
if(ctyList.includes(geotype)) {
//Calclating Percentage Data
var fin_age_data = age_CO_data.concat(age_cty_data); //This is grouped age data

//Need to calculate percentages...
var pct_base = d3.rollup(fin_age_data, v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.fips, d => d.year)
var age_base = [];
for (let [key1, value] of pct_base) {
for (let[key2, value2] of value) {
   age_base.push({'fips' : key1, 'year' : key2, 
     'tot_malepopulation_e' : value2.malepopulation_e, 'tot_femalepopulation_e' : value2.femalepopulation_e, 'tot_totalpopulation_e' : value2.totalpopulation_e});
}
};

var fin_age_pct = [];
for(i = 0; i < age_base.length;i++){
 var selfips = age_base[i].fips;
 var selyear = age_base[i].year;
 var selmale = age_base[i].tot_malepopulation_e;
 var selfemale = age_base[i].tot_femalepopulation_e;
 var seltotal = age_base[i].tot_totalpopulation_e;
 var age_tmp = fin_age_data.filter(d => (d.fips == selfips && d.year == selyear));

 for(j = 0; j < age_tmp.length; j++){
    fin_age_pct.push({'fips' : age_tmp[j].fips, 'name' : age_tmp[j].name, 'year' : age_tmp[j].year, 'age_cat_no' : age_tmp[j].age_cat_no, 'age_cat' : age_tmp[j].age_cat,
              'malepopulation_e' : age_tmp[j].malepopulation_e, 'femalepopulation_e' : age_tmp[j].femalepopulation_e, 
     'totalpopulation_e' : age_tmp[j].totalpopulation_e,
     'pct_malepopulation_e' : age_tmp[j].malepopulation_e/selmale, 'pct_femalepopulation_e' : age_tmp[j].femalepopulation_e/selfemale,
     'pct_totalpopulation_e' : age_tmp[j].totalpopulation_e/seltotal});
 }; //j
}; //i


//Build data for Pyramid
//Colorado

// Convert data to numbers
var CO_age_tmp = []
data[0].forEach( item => {
 CO_age_tmp.push({'fips' : item.reg_num,
                 'name' : item.region,
     'year' : item.year,
     'age' : item.age,
     'malepopulation_e' : parseInt(item.malepopulation),
     'femalepopulation_e' : parseInt(item.femalepopulation),
     'totalpopulation_e' : parseInt(item.totalpopulation)
 })})
      
var CO_age_SYA = CO_age_tmp.sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
  
var cty_age_tmp = []
data[1].forEach( item => {
 cty_age_tmp.push({'fips' : item.countyfips,
                 'name' : countyName(item.countyfips),
     'year' : item.year,
     'age' : item.age,
     'malepopulation_e' : parseInt(item.malepopulation),
     'femalepopulation_e' : parseInt(item.femalepopulation),
     'totalpopulation_e' : parseInt(item.totalpopulation)
 })
 })
 
var cty_age_SYA = cty_age_tmp.sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
        .sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); }) 
  .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });     

var fin_age_pyr = bin_age5(CO_age_SYA.concat(cty_age_SYA));


}; //County
}; //! Muni..

var fipsList = [...new Set(fin_age_pct.map(d => d.fips))];
var ctyNameList = [...new Set(fin_age_pct.map(d => d.name))];

genAgeSetup(geotype,fin_age_pct,fin_age_pyr,PRO_1.id, PRO_2.id, PRO_3.id, PRO_4.id, fipsList, ctyNameList,acsyr);
}); //End of Promise
}; // End of selGen3display

//Plotting and Tabulation Functions
//genIncomePlot  Generates ACS Income Plot
function genIncomePlot(level, inData,DDsel,outDiv, acsYear, acsTab) {
const fmt_date = d3.timeFormat("%B %d, %Y");
const fmt_pct = d3.format(".1%");
  
var config = {responsive: true,
   displayModeBar: false};

if(level == "Region") {
//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }
}  else {
 var fipsList = [...new Set(inData.map(d => d.FIPS))];
}

var x_labs = ["Less<br>than<br>$10,000", "$10,000<br>to<br>$19,999", "$20,000<br>to<br>$29,999", "$30,000<br>to<br>$39,999", "$40,000<br>to<br>$49,999", "$50,000<br>to<br>$59,999",     "$60,000<br>to<br>$75,999", "$75,000<br>to<br>$99,999", "$100,000<br>to<br>$124,000", "$125,000<br>to<br>$149,999", "$150,000<br>to<br>$199,999", "Greater<br>than<br>$200,000"];
var y_estvars = ["LT10K_E_PCT", "K10K19_E_PCT", "K20K29_E_PCT", "K30K39_E_PCT", "K40K49_E_PCT", "K50K59_E_PCT", 
    "K60K74_E_PCT", "K75K99_E_PCT", "K100K124_E_PCT", "K125K149_E_PCT", "K150K199_E_PCT", "GE200K_E_PCT"]
var y_moevars = ["LT10K_M_PCT", "K10K19_M_PCT", "K20K29_M_PCT", "K30K39_M_PCT", "K40K49_M_PCT", "K50K59_M_PCT", 
    "K60K74_M_PCT", "K75K99_M_PCT", "K100K124_M_PCT", "K125K149_M_PCT", "K150K199_M_PCT", "GE200K_M_PCT"]


var income_data = [];
var ctyNames;

var pltData = inData.filter(d => fipsList.includes(d.FIPS));

var PlaceNames = [...new Set(pltData.map(d => d.NAME))];

 for(i = 0; i < fipsList.length; i++) {
  var filtPlot = pltData.filter(d => d.FIPS == fipsList[i]);
  var y_est = selValsSing(filtPlot,y_estvars);
  var y_moe = selValsSing(filtPlot,y_moevars);

  income_data.push({x : x_labs,
                 y : y_est,
     error_y: {
      type: 'data',
      array: y_moe,
      thickness: 0.75,
      visible: true
     },
   //  customdata : pct_est_0d,
   //  hovertemplate : '%{customdata}',

     name : filtPlot[0].NAME,
                 type : 'bar'});
  
if(i == 0){
    ctyNames = PlaceNames[i];
  } else {
 ctyNames = ctyNames + ", " + PlaceNames[i];
  }
 } //i
 

var ftrStr = 'U.S. Census Bureau ('+ acsYear + '). ' + (acsYear - 4) + '-' + acsYear + ' American Community Survey Table: ' + acsTab +' Print Date: ' +  fmt_date(new Date)

 var income_layout = {
  title: "Household Income, " + acsYear,
    autosize: false,
    width: 1000,
    height : 400,
    xaxis: {
   title : 'Household Income',
   font: {
    size: 8,
    color: 'black'
   },
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Percent',
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat: '%'
    },
  annotations : [{text :  ftrStr , 
                font: {
    size : 9,
    color: 'black'
      },
      xref : 'paper', 
      x : 0, 
      yref : 'paper', 
      y : -0.37,
      align : 'left', 
      showarrow : false}]
  };
  
Plotly.newPlot(outDiv, income_data, income_layout,config);
//Download Events
var dat_labs = x_labs;
var profileDat1 = document.getElementById('profileDat1');
var profileImg1 = document.getElementById('profileImg1');
profileDat1.onclick = function() {exportToCsv(ctyNames, 'income', restructureACS(pltData,dat_labs),0)};
profileImg1.onclick = function() {exportToPng(ctyNames, 'income', outDiv,0)};
} //End of genIncomePlot

//genIncomeTab  Creates Income Source Tab
function genIncomeTab(level, inData, tabDiv, curYr, fipsArr) {

  const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

var prevYr = curYr - 4;

//varOrder contains both the range of names and the formatting   
var varOrder = [["NAME", "HH_TOTAL_E", "HH_TOTAL_M", "AVG_INCOME_E", "AVG_INCOME_M",
    "RAT_EARNINGS_E", "RAT_EARNINGS_M", "AVG_EARNINGS_E", "AVG_EARNINGS_M",
    "RAT_SALARY_E", "RAT_SALARY_M", "AVG_SALARY_E", "AVG_SALARY_M",
    "RAT_SELF_E", "RAT_SELF_M", "AVG_SELF_E", "AVG_SELF_M",
    "RAT_INTEREST_E", "RAT_INTEREST_M", "AVG_INTEREST_E", "AVG_INTEREST_M",
    "RAT_SOCSEC_E", "RAT_SOCSEC_M", "AVG_SOCSEC_E", "AVG_SOCSEC_M",
    "RAT_SSI_E", "RAT_SSI_M", "AVG_SSI_E", "AVG_SSI_M",
    "RAT_PUBASST_E", "RAT_PUBASST_M", "AVG_PUBASST_E", "AVG_PUBASST_M",
    "RAT_SNAP_E", "RAT_SNAP_M", "AVG_SNAP_E", "AVG_SNAP_M",
    "RAT_RETIRE_E", "RAT_RETIRE_M", "AVG_RETIRE_E", "AVG_RETIRE_M",
    "RAT_OTHER_E", "RAT_OTHER_M", "AVG_OTHER_E", "AVG_OTHER_M"],
  ["", "comma","comma", "dollar", "dollar",
     "percent", "percent", "dollar", "dollar",
     "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar",
  "percent", "percent", "dollar", "dollar"]];


var plWidth = 4;
var tab_data = selValsMulti(inData,varOrder,11,plWidth,"vert");
for(i = 0; i < tab_data.length;i++){
   tab_data[i].unshift(i + 1);
 }


//Labels and urls for output
  var labels = [
     {'title' : 'Total Households', 'URL_link' : genCEDSCIUrl(level,'B19051',curYr,fipsArr)},
   {'title' : 'Households with earnings', 'URL_link' : genCEDSCIUrl(level,'B19051',curYr,fipsArr)},
   {'title' : 'Households with wage or salary income', 'URL_link' : genCEDSCIUrl(level,'B19052',curYr,fipsArr)},
   {'title' : 'Households with self-employment income ', 'URL_link' : genCEDSCIUrl(level,'B19053',curYr,fipsArr)},
   {'title' : 'Households with interest, dividends, or net rental income', 'URL_link' : genCEDSCIUrl(level,'B19054',curYr,fipsArr)},
   {'title' : 'Households with retirement income', 'URL_link' : genCEDSCIUrl(level,'B19059',curYr,fipsArr)},
   {'title' : 'Households with Social Security income', 'URL_link' : genCEDSCIUrl(level,'B19055',curYr,fipsArr)},
   {'title' : 'Households with Supplemental Security Income (SSI)', 'URL_link' : genCEDSCIUrl(level,'B19056',curYr,fipsArr)},
   {'title' : 'Households with public assistance income', 'URL_link' : genCEDSCIUrl(level,'B19057',curYr,fipsArr)},
   {'title' : 'Households with cash public assistance or Food Stamps/SNAP', 'URL_link' : genCEDSCIUrl(level,'B19058',curYr,fipsArr)},
   {'title' : 'Households with other types of income', 'URL_link' : genCEDSCIUrl(level,'B19060',curYr,fipsArr)}
      ];
//Table Footer
var tblfoot = [
               ["Source: U.S. Census Bureau ("+ fmt_yr(curYr) +"), "+ fmt_yr(prevYr) + '-' + fmt_yr(curYr) +' American Community Survey Tables B19051 to B20003'],
      ["Compiled by the Colorado State Demography Office"],
               ['Print Date : ' + fmt_date(new Date)]
      ];
      

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
     ftrString = ftrString + "<tr><td colspan='45'>" + tblfoot[i] + "</td></tr>";
 }; 
ftrString = ftrString + "</tr></tfoot>";

var ftrMsg = "\u200B\tSources: U.S. Census Bureau ("+ curYr +") "+fmt_yr(prevYr) + "-" + fmt_yr(curYr) +" American Community Survey Tables B19051 to B20003" +
   "\n\u200B\tCompiled by the Colorado State Demography Office " +
   "Print Date: " + fmt_date(new Date);
 
//Table Header 
var headString = "<thead><tr>"
for(i = 0; i < labels.length;i++) {  
 if(i == 0){
  headString = headString + "<th> </th><th> </th>";
     headString = headString + "<th align='center' colspan='" + plWidth + "'>"+ "<a href='" + labels[i].URL_link + "' target='_blank'>" + labels[i].title + "</a></th>";
 } else {
  headString = headString + "<th align='center' colspan='" + plWidth + "'>"+ "<a href='" + labels[i].URL_link + "' target='_blank'>" + labels[i].title + "</a></th>";
 }
}
headString = headString + "</tr><tr>";

for(i = 0; i < labels.length;i++) {  
  if(i ==0){
     headString = headString + "<th>Index</th><th>Geography</th>";
  headString = headString + "<th>Number of Households</th><th>Margin of Error</th><th>Average Earnings</th><th>Margin of Error</th>";
 } else {
  headString = headString + "<th>Percent of Households</th><th>Margin of Error</th><th>Average Earnings</th><th>Margin of Error</th>";
 }
}
headString = headString + "</tr></thead>";


//Generating final tables  tabpop_fin is the table rows in html...
var tabpop = "";

for(i = 0; i < tab_data.length;i++){
 tabpop = tabpop + '<tr>';

 for(j = 0; j < tab_data[i].length;j++){
   tabpop = tabpop + '<td>' + tab_data[i][j] + '</td>';
 }
 tabpop = tabpop + "</tr>";
}

var tabpop_fin = headString + tabpop + ftrString;

//Datatable Writing final table to DOM
var fileName = inData[1].NAME + " Income Sources";

var tabSel = document.getElementById(tabDiv);

$(tabSel).append("<table id='summtabinc' class='DTTable' width='90%'></table>");
$("#summtabinc").append(tabpop_fin);

$('#summtabinc').DataTable({
	"pageLength": 5,
  "scrollY" : true,
     "scrollX" : true,
  "columnDefs" : [
  {   
   'targets' : '_all', 'className': 'dt-body-right',
  }
  ],
  dom: 'Bfrtip',
       buttons: [
  {  
                text :'Word',
    action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,tblfoot,fileName,'word',"incomesrc")
                }
        },
        {  
    text : 'Excel',
      action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,tblfoot,fileName,'xlsx',"incomesrc")
    }
        },
        {  
    text : 'CSV',
      action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,tblfoot,fileName,'csv',"incomesrc")
    }
  },
        {
          text :'PDF',
    action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,ftrMsg,fileName,'pdf',"incomesrc")
           }
  }
     ],  //buttons
 } );

};  //genIncomeTab

//genEducPlot  Generates ACS Educational attainment Plot
function genEducPlot(level, inData,DDsel,outDiv, acsYear, acsTab) {
const fmt_date = d3.timeFormat("%B %d, %Y");
const fmt_pct = d3.format(".1%");
  
var config = {responsive: true,
   displayModeBar: false};
   

if(level == "Region") {
//Generates the list of selected places
  var fipsList = [], opt;
  var len = DDsel.options.length;
  for (var i = 0; i < len; i++) {
    opt = DDsel.options[i];
    if (opt.selected) {
      fipsList.push(+opt.value);
    }
  }
}  else {
 var fipsList = [...new Set(inData.map(d => d.FIPS))];
}

var x_labs = ["Less than<br>High School", "High School<br>Graduate (or GED)", "Some College","Associate's Degree", "Bachelor's Degree", "Graduate or<br>Professional Degree"];

var y_estvars = [ "LTHS_E_PCT",  "HSGED_E_PCT",  "SOMECOLL_E_PCT",  "AADEG_E_PCT",  "BADEG_E_PCT",  "GRADDEG_E_PCT"]
var y_moevars = [ "LTHS_M_PCT",  "HSGED_M_PCT",  "SOMECOLL_M_PCT",  "AADEG_M_PCT",  "BADEG_M_PCT",  "GRADDEG_M_PCT"]


var educ_data = [];
var ctyNames;

var pltData = inData.filter(d => fipsList.includes(d.FIPS));

var PlaceNames = [...new Set(pltData.map(d => d.NAME))];

 for(i = 0; i < fipsList.length; i++) {
  var filtPlot = pltData.filter(d => d.FIPS == fipsList[i]);
  var y_est = selValsSing(filtPlot,y_estvars);
  var y_moe = selValsSing(filtPlot,y_moevars);


  educ_data.push({x : x_labs,
                 y : y_est,
     error_y: {
      type: 'data',
      array: y_moe,
      thickness: 0.75,
      visible: true
     },
   //  customdata : pct_est_0d,
   //  hovertemplate : '%{customdata}',

     name : filtPlot[0].NAME,
                 type : 'bar'});
  
if(i == 0){
    ctyNames = PlaceNames[i];
  } else {
 ctyNames = ctyNames + ", " + PlaceNames[i];
  }
 } //i
 
 
var ftrStr = 'U.S. Census Bureau ('+ acsYear + '). ' + (acsYear - 4) + '-' + acsYear + ' American Community Survey Table: ' + acsTab +' Print Date: ' +  fmt_date(new Date)

 var educ_layout = {
  title: "Educational Attainment, Persons Age 25+, " + acsYear,
    autosize: false,
    width: 1000,
    height : 400,
    xaxis: {
   title : 'Educational Attainment',
   font: {
    size: 8,
    color: 'black'
   },
   showgrid: true,
   zeroline: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2
    },
    yaxis: {
   title : 'Percent',
   automargin : true,
   showgrid: true,
   showline: true,
   mirror: 'ticks',
   gridcolor: '#bdbdbd',
   gridwidth: 2,
   linecolor: 'black',
   linewidth: 2,
    tickformat: '%'
    },
  annotations : [{text :  ftrStr , 
                font: {
    size : 9,
    color: 'black'
      },
      xref : 'paper', 
      x : 0, 
      yref : 'paper', 
      y : -0.37,
      align : 'left', 
      showarrow : false}]
  };
  
Plotly.newPlot(outDiv, educ_data, educ_layout,config);
//Download Events
var dat_labs = x_labs;
var profileDat3 = document.getElementById('profileDat3');
var profileImg3 = document.getElementById('profileImg3');
profileDat3.onclick = function() {exportToCsv(ctyNames, 'educatt', restructureACS(pltData,dat_labs),0)};
profileImg3.onclick = function() {exportToPng(ctyNames, 'educatt', outDiv,0)};
} //End of genEducPlot


//genRaceTab Geneerates race tab
function genRaceTab(level, inData, tabDiv, curYr, fipsArr) {


 const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
 const fmt_dollar = d3.format("$,.0f");
 const fmt_yr = d3.format("00");

var prevYr = curYr - 4;


//varOrder contains both the range of names and the formatting   
var varOrder = [["NAME", "WHITENH_E_PCT", "WHITENH_M_PCT", "BLACKNH_E_PCT", "BLACKNH_M_PCT", 
				"AIANNH_E_PCT", "AIANNH_M_PCT", "ASIANNH_E_PCT", "ASIANNH_M_PCT",
				"NHPACNH_E_PCT", "NHPACNH_M_PCT", "OTHERNH_E_PCT", "OTHERNH_M_PCT", 
				"TWONH_E_PCT", "TWONH_M_PCT", "HISP_E_PCT", "HISP_M_PCT"],
  ["", "percent","percent", "percent", "percent", "percent",
     "percent", "percent", "percent", "percent",
     "percent", "percent", "percent", "percent",
     "percent", "percent", "percent"]];


var plWidth = 2;

var tab_data = selValsMulti(inData,varOrder,8,plWidth,"vert");
for(i = 0; i < tab_data.length;i++){
   tab_data[i].unshift(i + 1);
 }


//Labels and urls for output
  var labels = [
     {'title' : 'White, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Black/ African American, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Native American/ Alaska Native, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Asian, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Native Hawaiian/ Pacific Islander, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Other, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Two of More Races, NH', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)},
   {'title' : 'Hispanic', 'URL_link' : genCEDSCIUrl(level,'B03002',curYr,fipsArr)}
      ];
//Table Footer
var tblfoot = [
               ["Source: U.S. Census Bureau ("+ fmt_yr(curYr) +"), "+ fmt_yr(prevYr) + '-' + fmt_yr(curYr) +' American Community Survey Table B03002'],
      ["Compiled by the Colorado State Demography Office"],
               ['Print Date : ' + fmt_date(new Date)]
      ];
      

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
     ftrString = ftrString + "<tr><td colspan='17'>" + tblfoot[i] + "</td></tr>";
 }; 
ftrString = ftrString + "</tr></tfoot>";

var ftrMsg = "\u200B\tSources: U.S. Census Bureau ("+ curYr +") "+fmt_yr(prevYr) + "-" + fmt_yr(curYr) +" American Community Survey Table B03002 "+
   "\n\u200B\tCompiled by the Colorado State Demography Office " +
   "Print Date: " + fmt_date(new Date);
 
//Table Header 
var headString = "<thead><tr>"
for(i = 0; i < labels.length;i++) {  
 if(i == 0){
  headString = headString + "<th colspan='2'> </th><th colspan = '14'>Non-Hispanic</th><th colspan='2'>Hispanic</th></tr>";
     headString = headString + "<th colspan='2'> </th><th align='center' colspan='" + plWidth + "'>"+ "<a href='" + labels[i].URL_link + "' target='_blank'>" + labels[i].title + "</a></th>";
 } else {
  headString = headString + "<th align='center' colspan='" + plWidth + "'>"+ "<a href='" + labels[i].URL_link + "' target='_blank'>" + labels[i].title + "</a></th>";
 }
}
headString = headString + "</tr><tr>";

for(i = 0; i < labels.length;i++) {  
  if(i ==0){
     headString = headString + "<th>Index</th><th>Geography</th>";
     headString = headString + "<th>Percentage</th><th>Margin of Error</th>";
 } else {
  headString = headString + "<th>Percentage</th><th>Margin of Error</th>";
 }
}
headString = headString + "</tr></thead>";


//Generating final tables  tabpop_fin is the table rows in html...
var tabpop = "";

for(i = 0; i < tab_data.length;i++){
 tabpop = tabpop + '<tr>';

 for(j = 0; j < tab_data[i].length;j++){
   tabpop = tabpop + '<td>' + tab_data[i][j] + '</td>';
 }
 tabpop = tabpop + "</tr>";
}

var tabpop_fin = headString + tabpop + ftrString;

//Datatable Writing final table to DOM
var fileName = inData[1].NAME + " Race and Ethnicity";

var tabSel = document.getElementById(tabDiv);
$(tabSel).append("<h3>Race and Ethnicity</h3>");
$(tabSel).append("<table id='summtabeth' class='DTTable' width='90%'></table>");
$("#summtabeth").append(tabpop_fin);

$('#summtabeth').DataTable({
	"pageLength": 5,
  "scrollY" : true,
     "scrollX" : true,
  "columnDefs" : [
  {   
   'targets' : '_all', 'className': 'dt-body-right',
  }
  ],
  dom: 'Bfrtip',
       buttons: [
  {  
                text :'Word',
    action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,tblfoot,fileName,'word',"raceeth")
                }
        },
        {  
    text : 'Excel',
      action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,tblfoot,fileName,'xlsx',"raceeth")
    }
        },
        {  
    text : 'CSV',
      action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,tblfoot,fileName,'csv',"raceeth")
    }
  },
        {
          text :'PDF',
    action: function ( e, dt, node, config ) {
                    genplexTab(tab_data,labels,ftrMsg,fileName,'pdf',"raceeth")
           }
  }
     ],  //buttons
 } );
} //genRaceTab

//income_plot  ACS Income Plot Wrapper
function income_plot(level,inData,outDiv, acsYear, acsTab) {
const fmt_date = d3.timeFormat("%B %d, %Y");

var fipsArr = inData.map(d => d.FIPS);
var nameArr = inData.map(d => d.NAME);

if(level == "Region") {
 pgSetup(level,"chart",outDiv,"Household Income Distribution",'inc01',true,false,fipsArr, nameArr, acsYear)

   var selopts = "8,-101";
   $.each(selopts.split(","), function(i,e){
          $("#RegSelect1 option[value='" + e + "']").prop("selected", true);
       }); 
  
   var dd0 = document.getElementById("RegSelect1");
   var btn0 = document.getElementById("RegBtn1");

  genIncomePlot(level, inData,dd0, "PlotDiv1",acsYear,acsTab);

   btn0.addEventListener('click', function() {
    genIncomePlot(level, inData,dd0, "PlotDiv1",acsYear, acsTab)
       });
    
} else {
 pgSetup(level,"chart",outDiv,"Household Income Distribution",'inc01',false,false,fipsArr, nameArr, acsYear);
 genIncomePlot(level, inData,dd0, "PlotDiv1",acsYear, acsTab)

}
} // income_plot

//educ_plot  Educational Attainment Plot wrapper
function educ_plot(level,inData,outDiv, acsYear, acsTab) {
const fmt_date = d3.timeFormat("%B %d, %Y");

var fipsArr = inData.map(d => d.FIPS);
var nameArr = inData.map(d => d.NAME);

if(level == "Region") {
 pgSetup(level,"chart",outDiv,"Educational Attainment, Age 25+",'educ',true,false,fipsArr, nameArr, acsYear)

   var selopts = "8,-101";
   $.each(selopts.split(","), function(i,e){
          $("#RegSelect3 option[value='" + e + "']").prop("selected", true);
       }); 
  
   var dd0 = document.getElementById("RegSelect3");
   var btn0 = document.getElementById("RegBtn3");

  genEducPlot(level, inData,dd0, "PlotDiv3",acsYear,acsTab);

   btn0.addEventListener('click', function() {
    genEducPlot(level, inData,dd0, "PlotDiv3",acsYear, acsTab)
       });
    
} else {
 pgSetup(level,"chart",outDiv,"Educational Attainment, Age 25+",'educ',false,false,fipsArr, nameArr, acsYear);
 genEducPlot(level, inData,dd0, "PlotDiv3",acsYear, acsTab)

} 
} // educ_plot

//genSel4 Display  Produces Income, Educ and Race panel charts


function genSel4display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
 const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

 const regList = ['Region', 'Regional Comparison'];
 const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
 const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];
    const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

//Clear out Divs

  PRO_1.innerHTML = "";
  PRO_2.innerHTML = "";
  PRO_3.innerHTML = "";
  PRO_4.innerHTML = "";
  /*
  What hh_tab contains: 
      Estimate  MOE
 Total Households B19051_001E B19051_001M
 Total Households With earnings B19051_002E B19051_002M
 Total Households With wage or salary income B19052_002E B19052_002M
 Total Households With self-employment income B19053_002E B19053_002M
 Total Households With interest, dividends, or net rental income B19054_002E B19054_002M
 Total Households With retirement income B19059_002E B19059_002M
 Total Households With Social Security income B19055_002E B19055_002M
 Total Households With Supplemental Security Income (SSI) B19056_002E B19056_002M
 Total Households With public assistance income B19057_002E B19057_002M
 Total Households With cash public assistance or Food Stamps/SNAP B19058_002E B19058_002M
  Total Households With other types of income B19060_002E B19060_002M
 Total Household Income B20003_001E B20003_001M
 Total Earnings B19061_001E B19061_001M
 Total Wage and Salary Income B19062_001E B19062_001M
 Total Self Employment Income B19063_001E B19063_001M
 Total Interest Income B19064_001E B19064_001M
 Total Retirement Income B19069_001E B19069_001M
 Total  Social Security Income B19065_001E B19065_001M
 Total SSI Income B19066_001E B19066_001M
 Total Public Assistance Income B19067_001E B19067_001M
 Total Other Income B19070_001E B19070_001M
*/
  
  var hh_tab = ["B19051_001E", "B19051_001M", "B19051_002E", "B19051_002M", "B19052_002E", "B19052_002M",
		"B19053_002E", "B19053_002M", "B19054_002E", "B19054_002M", "B19059_002E", "B19059_002M", "B19055_002E", "B19055_002M", 
     "B19056_002E", "B19056_002M", "B19057_002E", "B19057_002M", "B19058_002E", "B19058_002M",  "B19060_002E", "B19060_002M",
     "B20003_001E", "B20003_001M","B19061_001E", "B19061_001M", "B19062_001E", "B19062_001M", "B19063_001E", "B19063_001M", 
     "B19064_001E", "B19064_001M", "B19069_001E", "B19069_001M", "B19065_001E", "B19065_001M", "B19066_001E", "B19066_001M", 
     "B19067_001E", "B19067_001M",  "B19070_001E", "B19070_001M"]
  

  // Generating list of fips codes by geotype

 if(regList.includes(geotype)){
  var fips_tmp = regionCOL(parseInt(fipsArr));
     var fips_str =  fips_tmp[0].fips.map(function (x) { 
     return x; 
   });
        var fips_list = fips_str.toString();
     
  var inc_cty_url = genACSUrl("profile",curyear,'B19001',1,17,geotype,fips_list);
  var hhinc_cty_url = genACSUrl("profile",curyear,hh_tab,1,1,geotype,fips_list);
  var educ_cty_url = genACSUrl("profile",curyear,'B15003',1,25,geotype,fips_list);
  var race_cty_url = genACSUrl("profile",curyear,'B03002',1,12,geotype,fips_list);
  var inc_st_url = genACSUrl("profile",curyear,'B19001',1,17,'state',fips_list);
  var hhinc_st_url = genACSUrl("profile",curyear,hh_tab,1,1,'state',fips_list);
  var educ_st_url = genACSUrl("profile",curyear,'B15003',1,25,'state',fips_list);
  var race_st_url = genACSUrl("profile",curyear,'B03002',1,12,'state',fips_list);
     var prom = [d3.json(inc_cty_url),d3.json(hhinc_cty_url), d3.json(educ_cty_url), d3.json(race_cty_url),
              d3.json(inc_st_url),d3.json(hhinc_st_url), d3.json(educ_st_url), d3.json(race_st_url)]
  
 };
 
 
 if(ctyList.includes(geotype)){
  var fips_str =  fipsArr.map(function (x) { 
     return x; 
   });
       
  
  var inc_cty_url = genACSUrl("profile",curyear,'B19001',1,17,geotype,fipsArr);
  var hhinc_cty_url = genACSUrl("profile",curyear,hh_tab,1,1,geotype,fipsArr);
  var educ_cty_url = genACSUrl("profile",curyear,'B15003',1,25,geotype,fipsArr);
  var race_cty_url = genACSUrl("profile",curyear,'B03002',1,12,geotype,fipsArr);
  var inc_st_url = genACSUrl("profile",curyear,'B19001',1,17,'state',fipsArr);
  var hhinc_st_url = genACSUrl("profile",curyear,hh_tab,1,1,'state',fipsArr);
  var educ_st_url = genACSUrl("profile",curyear,'B15003',1,25,'state',fipsArr);
  var race_st_url = genACSUrl("profile",curyear,'B03002',1,12,'state',fipsArr);
     var prom = [d3.json(inc_cty_url),d3.json(hhinc_cty_url), d3.json(educ_cty_url), d3.json(race_cty_url),
              d3.json(inc_st_url),d3.json(hhinc_st_url), d3.json(educ_st_url), d3.json(race_st_url)]
 }
 
 if(muniList.includes(geotype)){ 
 var ctynum = muni_county(fipsArr);

  var fips_str =  fipsArr.map(function (x) { 
     return x; 
   });
  

  var inc_muni_url = genACSUrl("profile",curyear,'B19001',1,17,geotype,fipsArr);
  var hhinc_muni_url = genACSUrl("profile",curyear,hh_tab,1,1,geotype,fipsArr);
  var educ_muni_url = genACSUrl("profile",curyear,'B15003',1,25,geotype,fipsArr);
  var race_muni_url = genACSUrl("profile",curyear,'B03002',1,12,geotype,fipsArr);
  var inc_cty_url = genACSUrl("profile",curyear,'B19001',1,17,'county',ctynum);
  var hhinc_cty_url = genACSUrl("profile",curyear,hh_tab,1,1,'county',ctynum);
  var educ_cty_url = genACSUrl("profile",curyear,'B15003',1,25,'county',ctynum);
  var race_cty_url = genACSUrl("profile",curyear,'B03002',1,12,'county',ctynum);
     var prom = [d3.json(inc_muni_url),d3.json(hhinc_muni_url), d3.json(educ_muni_url), d3.json(race_muni_url),
              d3.json(inc_cty_url),d3.json(hhinc_cty_url), d3.json(educ_cty_url), d3.json(race_cty_url)];

 }

Promise.all(prom).then(data =>{
 //Creating associative arrays from raw data  acsPrep creates the associative array, genACS... creates the combined data
 
   if(muniList.includes(geotype)){
	var inc_muni_data = genACSIncome(acsPrep(data[0]),'muni');
	var hhinc_muni_data = genACSHHIncome(acsPrep(data[1]),'muni');
    var educ_muni_data = genACSEducation(acsPrep(data[2]),'muni');
	var race_muni_data = genACSRace(acsPrep(data[3]),'muni');
	var inc_cty_data = genACSIncome(acsPrep(data[4]),'cty');
	var hhinc_cty_data = genACSHHIncome(acsPrep(data[5]),'cty');
    var educ_cty_data = genACSEducation(acsPrep(data[6]),'cty');
	var race_cty_data = genACSRace(acsPrep(data[7]),'cty');
   } else {
	var inc_cty_data = genACSIncome(acsPrep(data[0]),'cty');
	var hhinc_cty_data = genACSHHIncome(acsPrep(data[1]),'cty');
    var educ_cty_data = genACSEducation(acsPrep(data[2]),'cty');
	var race_cty_data = genACSRace(acsPrep(data[3]),'cty');
	var inc_st_data = genACSIncome(acsPrep(data[4]),'st');
	var hhinc_st_data = genACSHHIncome(acsPrep(data[5]),'st');
    var educ_st_data = genACSEducation(acsPrep(data[6]),'st');
	var race_st_data = genACSRace(acsPrep(data[7]),'st');
   } 
  
//Regional data -- combine and rollup records
if(regList.includes(geotype)){
//Creating Columns to Sum Array

var inc_cty_keys = Object.keys(inc_cty_data[0])
var hhinc_cty_keys = Object.keys(hhinc_cty_data[0]);
var educ_cty_keys = Object.keys(educ_cty_data[0]);
var race_cty_keys = Object.keys(race_cty_data[0]);

inc_cty_keys.splice(0,2);
hhinc_cty_keys.splice(0,2);
educ_cty_keys.splice(0,2);
race_cty_keys.splice(0,2);

var inc_reg_sum =  d3.rollup(inc_cty_data, v => Object.fromEntries(inc_cty_keys.map(col => [col, d3.sum(v, d => +d[col])])));
var hhinc_reg_sum =  d3.rollup(hhinc_cty_data, v => Object.fromEntries(hhinc_cty_keys.map(col => [col, d3.sum(v, d => +d[col])])));
var educ_reg_sum =  d3.rollup(educ_cty_data, v => Object.fromEntries(educ_cty_keys.map(col => [col, d3.sum(v, d => +d[col])])));
var race_reg_sum =  d3.rollup(race_cty_data, v => Object.fromEntries(race_cty_keys.map(col => [col, d3.sum(v, d => +d[col])])));


//Adding Region id and Name
var regid = {};
regid.FIPS = -101
regid.NAME = names[0];

var inc_reg_sum_full = [{...regid,  ...inc_reg_sum}];
var hhinc_reg_sum_full = [{...regid, ...hhinc_reg_sum}];
var educ_reg_sum_full = [{...regid, ...educ_reg_sum}];
var race_reg_sum_full = [{...regid, ...race_reg_sum}];

var inc_reg_2 = acsMOE(inc_reg_sum_full);
var inc_cty_2 = acsMOE(inc_cty_data).sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 
var inc_st_2 = acsMOE(inc_st_data);
var inc_data = inc_st_2.concat(inc_reg_2,inc_cty_2);


//Calculating the average income level
var hhinc_reg_2 = hhincAVG(hhinc_reg_sum_full);
var hhinc_cty_2 = hhincAVG(hhinc_cty_data).sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); });
var hhinc_st_2 = hhincAVG(hhinc_st_data);
var hhinc_data = hhinc_st_2.concat(hhinc_reg_2,hhinc_cty_2);

var educ_reg_2 = acsMOE(educ_reg_sum_full);
var educ_cty_2 = acsMOE(educ_cty_data).sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 
var educ_st_2 = acsMOE(educ_st_data);
var educ_data = educ_st_2.concat(educ_reg_2,educ_cty_2);

var race_reg_2 = acsMOE(race_reg_sum_full);
var race_cty_2 = acsMOE(race_cty_data).sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 
var race_st_2 = acsMOE(race_st_data);
var race_data = race_st_2.concat(race_reg_2,race_cty_2);
} //Region

if(ctyList.includes(geotype)) {
var inc_cty_2 = acsMOE(inc_cty_data);
var inc_st_2 = acsMOE(inc_st_data);
var inc_data = inc_st_2.concat(inc_cty_2);

var hhinc_cty_2 = hhincAVG(hhinc_cty_data);
var hhinc_st_2 = hhincAVG(hhinc_st_data);
var hhinc_data = hhinc_st_2.concat(hhinc_cty_2);

var educ_cty_2 = acsMOE(educ_cty_data);
var educ_st_2 = acsMOE(educ_st_data);
var educ_data = educ_st_2.concat(educ_cty_2);

var race_cty_2 = acsMOE(race_cty_data);
var race_st_2 = acsMOE(race_st_data);
var race_data = race_st_2.concat(race_cty_2);
}
if(muniList.includes(geotype)) {
var inc_muni_2 = acsMOE(inc_muni_data);
var inc_cty_2 = acsMOE(inc_cty_data);
var inc_data = inc_cty_2.concat(inc_muni_2);

var hhinc_muni_2 = hhincAVG(hhinc_muni_data);
var hhinc_cty_2 = hhincAVG(hhinc_cty_data);
var hhinc_data = hhinc_cty_2.concat(hhinc_muni_2);

var educ_muni_2 = acsMOE(educ_muni_data);
var educ_cty_2 = acsMOE(educ_cty_data);
var educ_data = educ_cty_2.concat(educ_muni_2);

var race_muni_2 = acsMOE(race_muni_data);
var race_cty_2 = acsMOE(race_cty_data);
var race_data = race_cty_2.concat(race_muni_2);
} 
//Calculating percentages

var inc_data_pct = genACSPct(inc_data)
var educ_data_pct = genACSPct(educ_data)
var race_data_pct = genACSPct(race_data)

//Table and Output production
var bkmarkArr = [{title : 'Household Income Chart', id :'inc01'},
	{title : 'Income Sources Table', id : 'inc02'},
	{title : 'Educational Attainment Chart', id : 'educ'},
	{title : 'Race and Ethnicity Table', id : 'raceeth'}]

insertBkmark(bkmarkArr)
income_plot(geotype,inc_data_pct, PRO_1.id,bkmarkArr[0], curyear,'B19001');
genIncomeTab(geotype, hhinc_data, PRO_2.id, bkmarkArr[1], curyear,fips_str)
educ_plot(geotype, educ_data_pct,PRO_3.id,bkmarkArr[2], curyear,'B15003');
genRaceTab(geotype, race_data_pct,PRO_4.id,bkmarkArr[3],curyear,fips_str)

}); //end of Promise
}; //end of genSel4Display

//genSel5Display  Produces Housing and Household displays
function genSel5display(geotype, fipsArr, names, curyear, PRO_1, PRO_2, PRO_3, PRO_4) {
 const fmt_date = d3.timeFormat("%B %d, %Y");
 const fmt_dec = d3.format(".3");
 const fmt_pct = d3.format(".1%");
 const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");

 const regList = ['Region', 'Regional Comparison'];
 const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
 const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];
    const range = (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i);

var maxYR = 2050;

//Clear out Divs

  PRO_1.innerHTML = "";
  PRO_2.innerHTML = "";
  PRO_3.innerHTML = "";
  PRO_4.innerHTML = "";
 
//The displays are limited by geography
//Households by Age chart is only counties and regions
//Housing Occupancy, Housing unit type. and Housing econ is available for all geographies

 
 if(muniList.includes(geotype)){
    var fips_num = parseInt(muni_county(fipsArr));
    } 
	
 if(regList.includes(geotype)){
	 var fips_tmp1 = regionCOL(parseInt(fipsArr));
     var fips_tmp =  fips_tmp1[0].fips.map(function (x) { 
     return parseInt(x); 
   });
   var fips_num = fips_tmp.toString();
   var fips_str = fips_tmp1[0].fips;
  };

if(ctyList.includes(geotype)) {
	var fips_num = parseInt(fipsArr);;
}	

 	var yr_list = 2020;
	for(i = 2021; i <= maxYR; i++){
		if(i % 10 == 0){
		yr_list = yr_list + "," + i;
		}
	};


//Household by Age urls
var hhage_90_cty = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=c1990&schema=sf1&table=h12&sumlev=50&type=json&state=8&county=" + fips_num;
var hhage_00_cty = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=c2000&schema=sf1&table=h16&sumlev=50&type=json&state=8&county=" + fips_num;
var hhage_10_cty = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=c2010&schema=data&table=h17&sumlev=50&type=json&state=8&county=" + fips_num;
var hhage_for_cty = "https://gis.dola.colorado.gov/lookups/household?county="+ fips_num + "&year=" + yr_list + "&age=0,1,2,3,4&household=0&group=opt08";

var hhage_90_st = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=c1990&schema=sf1&table=h12&sumlev=40&type=json&state=8";
var hhage_00_st = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=c2000&schema=sf1&table=h16&sumlev=40&type=json&state=8";
var hhage_10_st = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=c2010&schema=data&table=h17&sumlev=40&type=json&state=8";
var hhage_for_st = "https://gis.dola.colorado.gov/lookups/household?county=0&year=" + yr_list + "&age=0,1,2,3,4&household=0&group=opt08";


if(muniList.includes(geotype)) {
//Occupancy Table URLs B25002, B25004, B25005
var occ_muni_url = genACSUrl("profile",curyear,'B25002',1,3,geotype,fipsArr);
var vac_muni_url = genACSUrl("profile",curyear,'B25004',1,8,geotype,fipsArr);
var vacelse_muni_url = genACSUrl("profile",curyear,'B25005',1,3,geotype,fipsArr);

var occ_cty_url = genACSUrl("profile",curyear,'B25002',1,3,'county',muni_county(fipsArr));
var vac_cty_url = genACSUrl("profile",curyear,'B25004',1,8,'county',muni_county(fipsArr));
var vacelse_cty_url = genACSUrl("profile",curyear,'B25005',1,3,'county',muni_county(fipsArr));

//Tenure by units in structure B25032, B25033, B25010, B25037
var tenure_units_muni_url = genACSUrl("profile",curyear,'B25032',1,23,geotype,fipsArr);
var tenure_pop_muni_url = genACSUrl("profile",curyear,'B25033',1,13,geotype,fipsArr);
var pph_muni_url = genACSUrl("profile",curyear,'B25010',1,3,geotype,fipsArr);
var medyr_muni_url =  genACSUrl("profile",curyear,'B25037',1,3,geotype,fipsArr);
var tenure_units_cty_url = genACSUrl("profile",curyear,'B25032',1,23,'county',muni_county(fipsArr));
var tenure_pop_cty_url = genACSUrl("profile",curyear,'B25033',1,13,'county',muni_county(fipsArr));
var pph_cty_url = genACSUrl("profile",curyear,'B25010',1,3,'county',muni_county(fipsArr));
var medyr_cty_url =  genACSUrl("profile",curyear,'B25037',1,3,'county',muni_county(fipsArr));

//Housing Economics
//B25077  Median HH value
//B25095 hh income as a pct of costs, Owner Occupied
//B25064  Median Gross Rent
//B25074 hh income as a pct of costs, renters

var ooval_muni_url =  genACSUrl("profile",curyear,'B25077',1,1,geotype,fipsArr);
var ooecon_muni_url =  genACSUrl("profile",curyear,'B25095',1,73,geotype,fipsArr);
var rtval_muni_url =  genACSUrl("profile",curyear,'B25064',1,1,geotype,fipsArr);
var rtecon_muni_url =  genACSUrl("profile",curyear,'B25074',1,64,geotype,fipsArr);

var ooval_cty_url =  genACSUrl("profile",curyear,'B25077',1,1,'county',muni_county(fipsArr));
var ooecon_cty_url =  genACSUrl("profile",curyear,'B25095',1,73,'county',muni_county(fipsArr));
var rtval_cty_url =  genACSUrl("profile",curyear,'B25064',1,1,'county',muni_county(fipsArr));
var rtecon_cty_url =  genACSUrl("profile",curyear,'B25074',1,64,'county',muni_county(fipsArr));

var prom = [d3.json(hhage_90_cty), d3.json(hhage_00_cty), d3.json(hhage_10_cty), d3.json(hhage_for_cty),
			d3.json(hhage_90_st), d3.json(hhage_00_st), d3.json(hhage_10_st), d3.json(hhage_for_st),
			d3.json(occ_muni_url), d3.json(vac_muni_url), d3.json(vacelse_muni_url), d3.json(occ_cty_url),
			d3.json(vac_cty_url), d3.json(vacelse_cty_url), d3.json(tenure_units_muni_url), d3.json(tenure_pop_muni_url),
			d3.json(pph_muni_url), d3.json(medyr_muni_url), d3.json(tenure_units_cty_url), d3.json(tenure_pop_cty_url),
			d3.json(pph_cty_url), d3.json(medyr_cty_url), d3.json(ooval_muni_url), d3.json(ooecon_muni_url),
			d3.json(rtval_muni_url), d3.json(rtecon_muni_url), d3.json(ooval_cty_url), d3.json(ooecon_cty_url),
			d3.json(rtval_cty_url), d3.json(rtecon_cty_url)];
} 

if(regList.includes(geotype)){
//Occupancy Table URLs B25002, B25004, B25005

var occ_cty_url = genACSUrl("profile",curyear,'B25002',1,3,geotype,fips_str);
var vac_cty_url = genACSUrl("profile",curyear,'B25004',1,8,geotype,fips_str);
var vacelse_cty_url = genACSUrl("profile",curyear,'B25005',1,3,geotype,fips_str);

var occ_st_url = genACSUrl("profile",curyear,'B25002',1,3,'state',fipsArr);
var vac_st_url = genACSUrl("profile",curyear,'B25004',1,8,'state',fipsArr);
var vacelse_st_url = genACSUrl("profile",curyear,'B25005',1,3,'state',fipsArr);

//Tenure by units in structure B25032, B25033, B25010, B25037
var tenure_units_cty_url = genACSUrl("profile",curyear,'B25032',1,23,geotype,fips_str);
var tenure_pop_cty_url = genACSUrl("profile",curyear,'B25033',1,13,geotype,fips_str);
var pph_cty_url = genACSUrl("profile",curyear,'B25010',1,3,geotype,fips_str);
var medyr_cty_url =  genACSUrl("profile",curyear,'B25037',1,3,geotype,fips_str);
var tenure_units_st_url = genACSUrl("profile",curyear,'B25032',1,23,'state',fipsArr);
var tenure_pop_st_url = genACSUrl("profile",curyear,'B25033',1,13,'state',fipsArr);
var pph_st_url = genACSUrl("profile",curyear,'B25010',1,3,'state',fipsArr);
var medyr_st_url =  genACSUrl("profile",curyear,'B25037',1,3,'state',fipsArr);


//Housing Economics
//B25077  Median HH value
//B25095 hh income as a pct of costs, Owner Occupied
//B25064  Median Gross Rent
//B25074 hh income as a pct of costs, renters

var ooval_cty_url =  genACSUrl("profile",curyear,'B25077',1,1,geotype,fips_str);
var ooecon_cty_url =  genACSUrl("profile",curyear,'B25095',1,73,geotype,fips_str);
var rtval_cty_url =  genACSUrl("profile",curyear,'B25064',1,1,geotype,fips_str);
var rtecon_cty_url =  genACSUrl("profile",curyear,'B25074',1,64,geotype,fips_str);

var ooval_st_url =  genACSUrl("profile",curyear,'B25077',1,1,'state',fipsArr);
var ooecon_st_url =  genACSUrl("profile",curyear,'B25095',1,73,'state',fipsArr);
var rtval_st_url =  genACSUrl("profile",curyear,'B25064',1,1,'state',fipsArr);
var rtecon_st_url =  genACSUrl("profile",curyear,'B25074',1,64,'state',fipsArr);

var prom = [d3.json(hhage_90_cty), d3.json(hhage_00_cty), d3.json(hhage_10_cty), d3.json(hhage_for_cty),
			d3.json(hhage_90_st), d3.json(hhage_00_st), d3.json(hhage_10_st), d3.json(hhage_for_st),
			d3.json(occ_cty_url), d3.json(vac_cty_url), d3.json(vacelse_cty_url), d3.json(occ_st_url),
			d3.json(vac_st_url), d3.json(vacelse_st_url), d3.json(tenure_units_cty_url), d3.json(tenure_pop_cty_url),
			d3.json(pph_cty_url), d3.json(medyr_cty_url), d3.json(tenure_units_st_url), d3.json(tenure_pop_st_url),
			d3.json(pph_st_url), d3.json(medyr_st_url), d3.json(ooval_cty_url), d3.json(ooecon_cty_url),
			d3.json(rtval_cty_url), d3.json(rtecon_cty_url), d3.json(ooval_st_url), d3.json(ooecon_st_url),
			d3.json(rtval_st_url), d3.json(rtecon_st_url)];
}

if(ctyList.includes(geotype)){
//Occupancy Table URLs B25002, B25004, B25005
var occ_cty_url = genACSUrl("profile",curyear,'B25002',1,3,geotype,fipsArr);
var vac_cty_url = genACSUrl("profile",curyear,'B25004',1,8,geotype,fipsArr);
var vacelse_cty_url = genACSUrl("profile",curyear,'B25005',1,3,geotype,fipsArr);

var occ_st_url = genACSUrl("profile",curyear,'B25002',1,3,'state',fipsArr);
var vac_st_url = genACSUrl("profile",curyear,'B25004',1,8,'state',fipsArr);
var vacelse_st_url = genACSUrl("profile",curyear,'B25005',1,3,'state',fipsArr);

//Tenure by units in structure B25032, B25033, B25010, B25037
var tenure_units_cty_url = genACSUrl("profile",curyear,'B25032',1,23,geotype,fipsArr);
var tenure_pop_cty_url = genACSUrl("profile",curyear,'B25033',1,13,geotype,fipsArr);
var pph_cty_url = genACSUrl("profile",curyear,'B25010',1,3,geotype,fipsArr);
var medyr_cty_url =  genACSUrl("profile",curyear,'B25037',1,3,geotype,fipsArr);
var tenure_units_st_url = genACSUrl("profile",curyear,'B25032',1,23,'state',fipsArr);
var tenure_pop_st_url = genACSUrl("profile",curyear,'B25033',1,13,'state',fipsArr);
var pph_st_url = genACSUrl("profile",curyear,'B25010',1,3,'state',fipsArr);
var medyr_st_url =  genACSUrl("profile",curyear,'B25037',1,3,'state',fipsArr);

//Housing Economics
//B25077  Median HH value
//B25095 hh income as a pct of costs, Owner Occupied
//B25064  Median Gross Rent
//B25074 hh income as a pct of costs, renters

var ooval_cty_url =  genACSUrl("profile",curyear,'B25077',1,1,geotype,fipsArr);
var ooecon_cty_url =  genACSUrl("profile",curyear,'B25095',1,73,geotype,fipsArr);
var rtval_cty_url =  genACSUrl("profile",curyear,'B25064',1,1,geotype,fipsArr);
var rtecon_cty_url =  genACSUrl("profile",curyear,'B25074',1,64,geotype,fipsArr);

var ooval_st_url =  genACSUrl("profile",curyear,'B25077',1,1,'state',fipsArr);
var ooecon_st_url =  genACSUrl("profile",curyear,'B25095',1,73,'state',fipsArr);
var rtval_st_url =  genACSUrl("profile",curyear,'B25064',1,1,'state',fipsArr);
var rtecon_st_url =  genACSUrl("profile",curyear,'B25074',1,64,'state',fipsArr);

var prom = [d3.json(hhage_90_cty), d3.json(hhage_00_cty), d3.json(hhage_10_cty), d3.json(hhage_for_cty),
			d3.json(hhage_90_st), d3.json(hhage_00_st), d3.json(hhage_10_st), d3.json(hhage_for_st),
			d3.json(occ_cty_url), d3.json(vac_cty_url), d3.json(vacelse_cty_url), d3.json(occ_st_url),
			d3.json(vac_st_url), d3.json(vacelse_st_url), d3.json(tenure_units_cty_url), d3.json(tenure_pop_cty_url),
			d3.json(pph_cty_url), d3.json(medyr_cty_url), d3.json(tenure_units_st_url), d3.json(tenure_pop_st_url),
			d3.json(pph_st_url), d3.json(medyr_st_url), d3.json(ooval_cty_url), d3.json(ooecon_cty_url),
			d3.json(rtval_cty_url), d3.json(rtecon_cty_url), d3.json(ooval_st_url), d3.json(ooecon_st_url),
			d3.json(rtval_st_url), d3.json(rtecon_st_url)];
}

Promise.all(prom).then(data =>{
var cty_forecast = housingSum(data[0], data[1], data[2],data[3],'county');
var st_forecast = housingSum(data[4],data[5],data[6],data[7],'state');

if(regList.includes(geotype)){
	var reg_forecast = [];
	 var reg_sum = d3.rollup(cty_forecast, v => d3.sum(v, d => d.total_households), d => d.year, d => d.age_group_id);   
	 for (let [key, value] of reg_sum) {
		 for(let [key2, value2] of value) {
	         reg_forecast.push({ 
			 	'fips' : -101,
			   'name' : names.toString(),
			   'year' : key,
			   'age_group_id' : key2,
			   'household_type_id' : 0,
			   'total_households' : value2
			 })
		 }
	 }
  var hh_forecast = st_forecast.concat(reg_forecast, cty_forecast);
   } else {
	var hh_forecast = st_forecast.concat(cty_forecast);
   };


var hhforecast_fin = [];
var grFips = [...new Set(hh_forecast.map(d => d.fips))]
var age_arr = ["Total", "18 to 24", "25 to 44", "45 to 64", "65 and Older"]
grFips.forEach(fp =>{
	for(i = 0; i < 5; i++){ //age_group_id
	    var tmpFore = hh_forecast.filter(d => d.fips == fp).filter(d2 => d2.age_group_id == i)
		for(j = 0; j < tmpFore.length; j++){
			hhforecast_fin.push({
				'fips' : tmpFore[j].fips,
			   'name' : tmpFore[j].name,
			   'year' : tmpFore[j].year,
			   'age_group_id' : age_arr[tmpFore[j].age_group_id],
			   'household_type_id' : 0,
			   'total_households' : tmpFore[j].total_households,
			   'grlabel' : j == 0 ? "" :tmpFore[j-1].year + "-" + tmpFore[j].year,
			   'growth'  : j == 0 ? 0 : tmpFore[j].total_households - tmpFore[j-1].total_households,
			   'cagr' : j == 0 ? '-' : (Math.pow((tmpFore[j].total_households/tmpFore[j-1].total_households),(1/(tmpFore[j].year - tmpFore[j-1].year)))-1)
		})
	} //j
	} //i
});


//processing the ACS Housing Tables
if(regList.includes(geotype)){
	//Region Data
	var regid = {};
   regid.FIPS = -101
   regid.NAME = names[0];

//processing Occupancy Table
	var occ_tab_reg1 = gen_occ_tab(acsPrep(data[8]),acsPrep(data[9]),acsPrep(data[10]),geotype);
	//Rolling up regional total
	var occ_tab_keys = Object.keys(occ_tab_reg1[0])
	occ_tab_keys.splice(0,2);
		
    var occ_reg_sum =  d3.rollup(occ_tab_reg1, v => Object.fromEntries(occ_tab_keys.map(col => [col, d3.sum(v, d => +d[col])])));
	var occ_reg_tmp = [{...regid, ...occ_reg_sum}];
    var occ_tab_reg = acsMOE(occ_reg_tmp);
   
    //County Data
	var occ_tab_cty = gen_occ_tab(acsPrep(data[8]),acsPrep(data[9]),acsPrep(data[10]),'county') 
	               .sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 
	//State Data
	var occ_tab_st = gen_occ_tab(acsPrep(data[11]),acsPrep(data[12]),acsPrep(data[13]),'state');
	
	
	//Final data
	var occ_tab_fin = occ_tab_st.concat(occ_tab_reg, occ_tab_cty);
	
	//processing the Housing Type table
	//Regional Data
	
	var tenure_unit_reg1 = gen_str_unit(acsPrep(data[14]),geotype);
	var tenure_unit_keys = Object.keys(tenure_unit_reg1[0])
	tenure_unit_keys.splice(0,2);
	var tenure_unit_sum =  d3.rollup(tenure_unit_reg1, v => Object.fromEntries(tenure_unit_keys.map(col => [col, d3.sum(v, d => +d[col])])));
	var tenure_unit_tmp = [{...regid, ...tenure_unit_sum}];
    var tenure_unit_reg = acsMOE(tenure_unit_tmp);
	
	
	var tenure_pop_reg1 = gen_str_pop(acsPrep(data[15]),geotype);
	var tenure_pop_keys = Object.keys(tenure_pop_reg1[0])
	tenure_pop_keys.splice(0,2);
	var tenure_pop_sum =  d3.rollup(tenure_pop_reg1, v => Object.fromEntries(tenure_pop_keys.map(col => [col, d3.sum(v, d => +d[col])])));
	var tenure_pop_tmp = [{...regid, ...tenure_pop_sum}];
    var tenure_pop_reg = acsMOE(tenure_pop_tmp);

   //County Data
   	var pph_cty = acsPrep(data[16]);
	var medyr_cty = acsPrep(data[17]);
	var tenure_unit_cty = acsMOE(gen_str_unit(acsPrep(data[14]),'county')) 
	               .sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 

	var tenure_pop_cty = acsMOE(gen_str_pop(acsPrep(data[15]),'county')) 
	               .sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 


	//State Data
  	var pph_st = acsPrep(data[20]);
	var medyr_st = acsPrep(data[21]);
	var tenure_unit_st = acsMOE(gen_str_unit(acsPrep(data[18]),'state')); 
	var tenure_pop_st = acsMOE(gen_str_pop(acsPrep(data[19]),'state'));
	
	
	//Final data
	var tenure_unit_fin = tenure_unit_st.concat(tenure_unit_reg, tenure_unit_cty);
	var tenure_pop_fin = tenure_pop_st.concat(tenure_pop_reg, tenure_pop_cty);
	
    var fin_tenure_tab = genTenureTab(tenure_unit_fin,medyr_cty, medyr_st,tenure_pop_fin,pph_cty,pph_st);


//Housing Economics Table  
//Calculating the housing cost value for region

var reg_Med = []
var OOMed_cty = acsPrep(data[22])
var OOMed_st = acsPrep(data[26])

var OOMed_EST = [];
var OOMed_MOE = [];
for(i = 0; i < OOMed_cty.length; i++){
	  OOMed_EST.push(OOMed_cty[i].B25077_001E);
	  OOMed_MOE.push(OOMed_cty[i].B25077_001M);
	  };


var OOMed_EST_range = d3.extent(OOMed_EST);
var OOMed_MOE_range = d3.extent(OOMed_MOE);
var OOMed_EST_Value = (OOMed_EST_range[1] + OOMed_EST_range[0])/2;
var OOMed_MOE_Value = (OOMed_MOE_range[1] + OOMed_MOE_range[0])/2;
  
var RTMed_cty = acsPrep(data[24]);
var RTMed_st = acsPrep(data[28]);

var RTMed_EST = [];
var RTMed_MOE = [];
for(i = 0; i < RTMed_cty.length; i++){
	  RTMed_EST.push(RTMed_cty[i].B25064_001E);
	  RTMed_MOE.push(RTMed_cty[i].B25064_001M);
	  };
	  

var RTMed_EST_range = d3.extent(RTMed_EST);
var RTMed_MOE_range = d3.extent(RTMed_MOE);
var RTMed_EST_Value = (RTMed_EST_range[1] + RTMed_EST_range[0])/2;
var RTMed_MOE_Value = (RTMed_MOE_range[1] + RTMed_MOE_range[0])/2;

//Assembling final tabs
var reg_Med = [];
reg_Med.push({'FIPS' : -101, 'NAME' : regionName(+fipsArr), 'VAR' : 'Median Cost', 
				'OO_EST' : OOMed_EST_Value, 'OO_MOE' : OOMed_MOE_Value, 
				'RT_EST' : RTMed_EST_Value, 'RT_MOE' : RTMed_MOE_Value});
				
var st_Med = [];
st_Med.push({'FIPS' : OOMed_st[0].GEO1, 'NAME' : OOMed_st[0].NAME, 'VAR' : 'Median Cost', 
				'OO_EST' : OOMed_st[0].B25077_001E, 'OO_MOE' : OOMed_st[0].B25077_001M, 
				'RT_EST' : RTMed_st[0].B25064_001E, 'RT_MOE' : RTMed_st[0].B25064_001M});
				
var cty_Med = [];
for(i = 0; i < OOMed_cty.length; i++){
	  cty_Med.push({'FIPS' : OOMed_cty[i].GEO2, 'NAME' : OOMed_cty[i].NAME, 'VAR' : 'Median Cost', 
	                'OO_EST' : OOMed_cty[i].B25077_001E, 'OO_MOE' : OOMed_cty[i].B25077_001M, 
					'RT_EST' : RTMed_cty[i].B25064_001E, 'RT_MOE' : RTMed_cty[i].B25064_001M})
}

var med_Fin = st_Med.concat(reg_Med,cty_Med);

// Percent of home owners at 35% or more, 31-49% or more, 50% or more on housing

var housingIncome = genhousIncome(acsPrep(data[23]),acsPrep(data[25]),geotype);

var housingIncome_keys = Object.keys(housingIncome[0])
housingIncome_keys .splice(0,2);
	var housingIncome_sum =  d3.rollup(housingIncome, v => Object.fromEntries(housingIncome_keys.map(col => [col, d3.sum(v, d => +d[col])])));
	var housingIncome_tmp = [{...regid, ...housingIncome_sum}];
    var housingIncome_reg = acsMOE(housingIncome_tmp);

//County data
	var housingIncome_cty = acsMOE(housingIncome,'county') 
	               .sort(function(a, b){ return d3.ascending(a['FIPS'], b['FIPS']); }); 
//State Data
var housingIncome_st = acsMOE(genhousIncome(acsPrep(data[27]),acsPrep(data[29]),'state'),'state');

//Final data
 var housingIncome_fin = housingIncome_st.concat(housingIncome_reg, housingIncome_cty);
 
} //Region

if(ctyList.includes(geotype)){
	   //County Data
	var occ_tab_cty = gen_occ_tab(acsPrep(data[8]),acsPrep(data[9]),acsPrep(data[10]),geotype); 
	//State Data
	var occ_tab_st = gen_occ_tab(acsPrep(data[11]),acsPrep(data[12]),acsPrep(data[13]),'state');

	var occ_tab_fin = occ_tab_st.concat(occ_tab_cty);
} // county

if(muniList.includes(geotype)){
	   //Muni Data
	var occ_tab_muni = gen_occ_tab(acsPrep(data[8]),acsPrep(data[9]),acsPrep(data[10]),geotype); 

	//County Data
	var occ_tab_cty
	var occ_tab_fin = occ_tab_cty.concat(occ_tab_muni);
} // muni

var bkmarkArr = [{title : 'Household Forecast', id :'house01'},
	{title : 'Housing Occupancy and Vacancy Table', id : 'house02'},
	{title : 'Housing Type Table', id : 'house03'},
	{title : 'Housing Cost and Affordability Table', id : 'house04'}]
//Outputs
insertBkmark(bkmarkArr)

genHHForecastChart(hhforecast_fin,PRO_1.id,bkmarkArr[0], geotype);
genOccupancyTab(occ_tab_fin,PRO_2.id,bkmarkArr[1],geotype,curyear,fipsArr);

/*

genHousingTypeTab(bkmarkArr[2]);
genHHIncomeTab(bkmarkArr[3]);
*/
	}); //end of Promise
}; //end of genSel5Display