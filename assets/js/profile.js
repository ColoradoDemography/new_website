//Website functions fror State Demography Office Demographic Profile
//A. Bickford 9/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc

//Profile functions

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


// Calculate 5-year growth rate	table
function growth_tab(level, inData,fileName, outDiv1){
	const fmt_pct = d3.format(".1%")
	const fmt_comma = d3.format(",");
	const fmt_date = d3.timeFormat("%B %d, %Y");
	const regList = ['Region', 'Regional Comparison'];
	

outDiv1.innerHTNL = "";

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
		var gr_rate = (Math.pow(pop_ratio,yr_ratio)-1) * 100;
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
	outarrPop[0][0] = x;
	outarrPop[0][1] = filtPop[0].name;
	outarrGr[0][0] = x;
	outarrGr[0][1] = filtPop[0].name;


	for(z = 0; z < filtPop.length; z++){
		 var pos = z  + 2;

		 outarrPop[0][pos] = filtPop[z].totalpopulation;
		 outarrGr[0][pos] = filtGr[z].growthrate;
	} //z
	tab_data_Pop = tab_data_Pop.concat(outarrPop);
	tab_data_Gr = tab_data_Gr.concat(outarrGr);

} //x


//Producing  datatables...
//Column headings

var headString = "<thead><tr><th>Index</th><th>Geography</th>"
for(i = 0; i < years.length;i++) {
	headString = headString + "<th>"+years[i]+"</th>"
}
headString = headString + "</tr></thead>";

//footer
//Creating Footer
var ftrMsg = "Source: Colorado State Demography Office Print Date : " + fmt_date(new Date);
var ftrString = "<tfoot><tr><td colspan = '" + tab_data_Pop[0].length + "'>"+ ftrMsg + "</td></tr>";

//Processing Table Rows for regions

if(regList.includes(level)) {
	tab_data_Pop[1][1] = "<b>"+tab_data_Pop[1][1]+"</b>";
	tab_data_Gr[1][1] = "<b>"+tab_data_Gr[1][1]+"</b>";
};
//Generating final tables
var	tabpop = "<tr>";
var	tabgr =  "<tr>";

for(i = 0; i < tab_data_Pop.length;i++){
	if(i > 0) {
		tabpop = tabpop + '<tr>';
		tabgr = tabgr + '<tr>';
	}
	for(j = 0; j < tab_data_Pop[i].length;j++){
		tabpop = tabpop + '<td>' + tab_data_Pop[i][j] + '</td>';
		tabgr = tabgr + '<td>' + tab_data_Gr[i][j] + '</td>';
	}
	tabpop = tabpop + "</tr>";
	tabgr = tabgr + "</tr>";
}

var tabpop_fin = headString + tabpop + ftrString;
var tabgr_fin = headString + tabgr + ftrString;

//Appending tables to the DOM and processing them with DataTables
$(outDiv1).html("");
$(outDiv1).append("<h3>Population Growth Rate</h3>");
$(outDiv1).append("<table id='growthtab1' class='DTTable' width='100%'></table>");
$(outDiv1).append("<table id='growthtab2' class='DTTable' width='100%'></table>");

$("#growthtab1").append(tabpop_fin);
$
$("#growthtab2").append(tabgr_fin);

//Population Table

 $('#growthtab1').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3, 4, 5, 6, 7, 8], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0, '','')},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2, 3, 4, 5, 6, 7, 8], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3, 4, 5, 6, 7, 8], 'width' :'10%'
		}  
		],
		dom: 'Bfrtip',
       buttons: [
		{  
                extend: 'word',
				text :'Word',
                titleAttr: fileName,
				footer : true
        },
        {  
                extend: 'excelHtml5',
                title: fileName,
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : false,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			} //customize
		}
     ],  //buttons
		"order": []
	} );

//  Growth table...

 $('#growthtab2').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3, 4, 5, 6, 7, 8], 'type' : 'num',
		render: DataTable.render.number( '', '.', 1, '','%' )},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2, 3, 4, 5, 6, 7, 8], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3, 4, 5, 6, 7, 8], 'width' :'10%'
		}  
		],
		dom: 'Bfrtip',
       buttons: [
		{  
                extend: 'word',
				text :'Word',
                titleAttr: fileName,
				footer : true
        },
        {  
                extend: 'excelHtml5',
                title: fileName,
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
				
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : true,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			}
		}
     ],  //buttons
		"order": []
	} );

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
             'malepopulation_e' : tmp_age[k].malepopulation_e, 'pct_malepopulation_e' : 	tmp_age[k].malepopulation_e/tmp_base[0].tot_malepopulation_e,	
             'femalepopulation_e' : tmp_age[k].femalepopulation_e, 'pct_femalepopulation_e' : 	tmp_age[k].femalepopulation_e/tmp_base[0].tot_femalepopulation_e,
             'totalpopulation_e' : tmp_age[k].totalpopulation_e, 'pct_totalpopulation_e' : 	tmp_age[k].totalpopulation_e/tmp_base[0].tot_totalpopulation_e
		})
	}
	}
}

return (bindatafin);
}; //bin_age5

//pgSetup  adds elements to Plot divs

function pgSetup(level, gridPanel,headerTxt, multi, ctyFips,ctyName, yrvalue) {
		var idxval = gridPanel.charAt(gridPanel.length - 1);
		//Create objects

//Page heading
		var pgHead = document.createElement("H3");
	    var pgText = document.createTextNode(headerTxt)
			pgHead.appendChild(pgText);

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
			   


			// Download Button
			var dlbtn = document.createElement('button');
			 dlbtn.id = 'profiledl' + idxval;
			 dlbtn.className = 'dropbtn';
			 dlbtn.innerHTML = '<i class="fas fas fa-download fa-2x" style="color: black;">';

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
			//Source ds
			 var src_li = document.createElement('li');
			 var src_link = document.createElement('a');
			     
				 if(level == "Region") {
					 if(headerTxt === "Regional Population Estimates"){
						var src_txt = document.createTextNode('Regional Population Estimates');
						src_link.href = 'https://coloradodemography.github.io/population/data/regional-data-lookup/';
					 }
					 if(headerTxt === "Regional Population Forecasts"){
						var src_txt = document.createTextNode('Regional Population Forecasts');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
					 if(headerTxt === "Regional Components of Change"){
						var src_txt = document.createTextNode('Regional Components of Change');
						src_link.href = 'https://coloradodemography.github.io/births-deaths-migration/data/components-change-regions/';
                     }
					 if(headerTxt === "Regional Age Estimates"){
						var src_txt = document.createTextNode('State and Regional Single Year of Age Lookup');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
					 if(headerTxt === "Regional Age Forecasts"){
						var src_txt = document.createTextNode('State and Regional Single Year of Age Lookup');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
					 if(headerTxt === "Regional Age Pyramid"){
						var src_txt = document.createTextNode('State and Regional Single Year of Age Lookupa');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-regions/';
                     }
				 }; //Region 
				 
				if(level == "County") {  
					 if(headerTxt === "County Population Estimates"){
						var src_txt = document.createTextNode('County Population Estimates');
						src_link.href = 'https://coloradodemography.github.io/population/data/county-data-lookup/';
					 }
					 if(headerTxt === "County Population Forecasts"){
						var src_txt = document.createTextNode('County Population Forecasts');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
					 if(headerTxt === "County Components of Change"){
						var src_txt = document.createTextNode('County Components of Change');
						src_link.href = 'https://coloradodemography.github.io/births-deaths-migration/data/components-change/#components-of-change';
                     };
					 if(headerTxt === "County Age Estimates"){
						var src_txt = document.createTextNode('County Single Year of Age Lookup');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
					 if(headerTxt === "County Age Forecasts"){
						var src_txt = document.createTextNode('County Single Year of Age Lookup');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
					 if(headerTxt === "County Age Pyramid"){
						var src_txt = document.createTextNode('County Single Year of Age Lookup');
						src_link.href = 'https://coloradodemography.github.io/population/data/sya-county/#county-population-by-single-year-of-age';
                     }
				 };  //County
				 
				 if(level == "Municipality"){
					 var strFips = ctyFips.toString().padStart(5, '0');
					  if(headerTxt === "Municipal Age Estimates"){
						var src_txt = document.createTextNode('ACS Age Eatimates');
						src_link.href = "https://data.census.gov/cedsci/table?q=B01001&g=0500000US08"+ strFips +"_1600000US08" + strFips + "&tid=ACSDT5Y" + yrvalue + ".B01001"
                     };
					  if(headerTxt === "Municipal Age Pyramid"){
						var src_txt = document.createTextNode('ACS Age Estimates');
						src_link.href = "https://data.census.gov/cedsci/table?q=B01001&g=0500000US08"+ strFips +"_1600000US08" + strFips + "&tid=ACSDT5Y" + yrvalue + ".B01001"
						};
				 };
				 
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

		   var dlcontent = document.createElement('div');
		       dlcontent.className = 'dropdown-content';
			   dlcontent.appendChild(dllist);
   //dropdown list wrapper
       var dlwrap = document.createElement('div');
		   dlwrap.className = "dropdown AClass";
		   dlwrap.appendChild(dlbtn);
		   dlwrap.appendChild(dlcontent);
		   

//Creating table wrapper  
		var tbl = document.createElement("table");
		    tbl.style.width = "40%";
			tbl.style.border = "0px solid black";
			
		var tblbody = document.createElement("tbody");
		var tblrow = document.createElement("tr");
			
		var tabcell1 = document.createElement("td");
			tabcell1.style.border = "0px solid black";
			tabcell1.style.verticalAlign = "top";
			tabcell1.style.align = 'left';
			tabcell1.appendChild(dlwrap);
			tblrow.appendChild(tabcell1);
if(level == "Region"){
		var tabcell2 = document.createElement("td");
			tabcell2.style.border = "0px solid black";
			tabcell2.style.verticalAlign = "top";
			tabcell2.style.align = 'left';
			tabcell2.appendChild(regtxt);
			tabcell2.appendChild(reglist);
					
		var tabcell3 = document.createElement("td");
			tabcell3.style.border = "0px solid black";
			tabcell3.style.verticalAlign = "top";
			tabcell3.style.align = 'left';
			tabcell3.appendChild(regbtn);
		if(!['Regional Age Forecasts', 'Regional Age Pyramid'].includes(headerTxt)){
			tblrow.appendChild(tabcell2);
			tblrow.appendChild(tabcell3);
		}
		}
		
		tblbody.appendChild(tblrow);
		tbl.appendChild(tblbody);
		
		//Plotdiv   
			var plotdiv = document.createElement('div');
			    plotdiv.id = 'PlotDiv' + idxval
				
//writing to DOM
       var outDiv = document.getElementById(gridPanel);
	   outDiv.appendChild(pgHead);
	   outDiv.appendChild(tbl);
	   outDiv.appendChild(plotdiv);
} //pgSetup

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
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
Plotly.newPlot(estDiv, est_data, est_layout,config);
//Download Events

var profileDat2 = document.getElementById('profileDat2');
var profileImg2 = document.getElementById('profileImg2');
profileDat2.onclick = function() {exportToCsv(ctyNames[0], 'estimate', pltData,0)};
profileImg2.onclick = function() {exportToPng(ctyNames[0], 'estimate', estDiv,0)};
	
}; //genRegEst			

//gerRegEstSetup sets up the regional estimates plot
function genRegEstSetup(level, inData, est_div, fipsList, ctyNameList) {

  pgSetup(level, est_div,"Regional Population Estimates",true,fipsList, ctyNameList, 0)

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
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
		};
		
Plotly.newPlot(forecDiv, forec_data, forec_layout,config);
//Download Events

var profileDat3 = document.getElementById('profileDat3');
var profileImg3 = document.getElementById('profileImg3');
profileDat3.onclick = function() {exportToCsv(ctyNames[0], 'forecast', pltData,0)};
profileImg3.onclick = function() {exportToPng(ctyNames[0], 'forecast', forecDiv,0)};
 	
}; //genRegFore			

//genRegForeSetup sets up the regional forecast plot
function genRegForeSetup(level, inData, fore_div, fipsList, ctyNameList) {

  pgSetup(level, fore_div,"Regional Population Forecasts",true,fipsList, ctyNameList, 0)

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
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
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

  pgSetup(level, coc_div,"Regional Components of Change",false,fipsList, ctyNameList, 0)

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
			annotations : [{text : citation, 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
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
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.35, 
			   align : 'left', 
			   showarrow : false}]
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
		   xref : 'paper', 
		   x : 0.5, 
		   yref : 'paper', 
		   y : -0.20, 
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
		   y : -0.15, 
		   align : 'center', 
		   font : { size : 14},
		   showarrow : false},
		   {text :  'Data and Visualization by the Colorado State Demography Office.<br>Print Date: ' +  fmt_date(new Date) , 
		   xref : 'paper', 
		   x : 0, 
		   yref : 'paper', 
		   y : -0.35, 
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
	

if(level == "Region") {	
  pgSetup(level, age_div1,"Regional Age Estimates",true,fipsList, ctyNameList, 0)
  //Add a second chart div here
  var chartdiv_1 = document.createElement('div')
  chartdiv_1.id = 'AgeChart1'
  var chdiv_a = document.getElementById(age_div1)
  chdiv_a.appendChild(chartdiv_1)
  
  pgSetup(level, age_div2,"Regional Age Forecasts",true,fipsList, ctyNameList, 0);
  var chartdiv_2 = document.createElement('div')
  chartdiv_2.id = 'AgeChart2'
  var chdiv_b = document.getElementById(age_div2)
  chdiv_b.appendChild(chartdiv_2)
  
  pgSetup(level, age_div3,"Regional Age Pyramid",true,fipsList, ctyNameList, 0);
  var chartdiv_3 = document.createElement('div')
  chartdiv_3.id = 'AgeChart3'
  var chdiv_c = document.getElementById(age_div3)
  chdiv_c.appendChild(chartdiv_3)
} 

if(level == 'County'){  
 pgSetup(level, age_div1,"County Age Estimates",true,fipsList, ctyNameList,0 )
  //Add a second chart div here
  var chartdiv_1 = document.createElement('div')
  chartdiv_1.id = 'AgeChart1'
  var chdiv_a = document.getElementById(age_div1)
  chdiv_a.appendChild(chartdiv_1)
  
  pgSetup(level, age_div2,"County Age Forecasts",true,fipsList, ctyNameList, 0);
  var chartdiv_2 = document.createElement('div')
  chartdiv_2.id = 'AgeChart2'
  var chdiv_b = document.getElementById(age_div2)
  chdiv_b.appendChild(chartdiv_2)
  
  pgSetup(level, age_div3,"County Age Pyramid",true,fipsList, ctyNameList, 0);
  var chartdiv_3 = document.createElement('div')
  chartdiv_3.id = 'AgeChart3'
  var chdiv_c = document.getElementById(age_div3)
  chdiv_c.appendChild(chartdiv_3)
}

if(level == "Municipality"){
pgSetup(level, age_div1,"Municipal Age Estimates",true,fipsList, ctyNameList, yrvalue)
  //Add a second chart div here
  var chartdiv_1 = document.createElement('div')
  chartdiv_1.id = 'AgeChart1'
  var chdiv_a = document.getElementById(age_div1)
  chdiv_a.appendChild(chartdiv_1)
  
  pgSetup(level, age_div3,"Municipal Age Pyramid",true,fipsList, ctyNameList,yrvalue);
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
   var outtab = []; //This array contains all entries for all yeats
   var geog, name, year1, est1, year2, est2, popch, gr;
   
    var regList = ['Region', 'Regional Comparison'];	
  	var ctyList = ['County', 'County Comparison'];
    var muniList = ['Municipality', 'Municipal Comparison'];
	var placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


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
   if(placeList.includes(type)){
       for(i = 0; i < inData.length; i++){
		   outtab.push({'fips' : inData[i].placefips, 'name' : cdpName(inData[i].placefips), 'year' : inData[i].year,  'estimate' : parseInt(inData[i].estimate)});
	  };
   };  
 //Selecting out geographies  

//Creating output table  THis works for two years need to difna solution for multiple years....


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

//procMedian  Gathers and calculates median income  or house value from ACS records
function procMedian(inData,fipsArr,variable, geog, names){

var fipsnum;
var medvalue = [];

	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];


for(i = 0; i < inData.length; i++) {
	 if(inData[i].geonum == 108) {
			 fipsnum = 0;
		} else {
			 fipsnum = inData[i].geonum - 108000;
		};

	if(variable == 'b19013001'){  //Median income
	    medvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'value' : +inData[i].b19013001});
	};
	if(variable == 'b25077001'){  //Median home value
	      medvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'value' : +inData[i].b25077001});
	};
}; 	//i loop

//Calculating regional median and adding to output data set...
if(regList.includes(geog)){
	var med_out = [];
	for(i = 0; i < fipsArr.length;i++){
		var med_tmp = [];
		var regionDat = []
		var fipslist = regionCOL(fipsArr[i]);
		var tmp_list = fipslist[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
		var filtvalue = medvalue.filter(function(d) {return tmp_list.includes(d.fips)});
		var rangeArr = [];
		for(l = 0; l < filtvalue.length; l++){
				 rangeArr.push(filtvalue[l].value);
			};			 
		var range = d3.extent(rangeArr);
		var medVal = (range[1] + range[0])/2;
		var regionNumber = -101;
		var regionNam = regionName(fipsArr[i]);
		regionDat.push({fips : regionNumber, name : regionNam, value : medVal});
	    med_tmp = regionDat.concat(filtvalue);
		var med_out = med_out.concat(med_tmp);
	}; //i loop
};

if(regList.includes(geog)){
  return med_out;
} else {
   return medvalue;
}
}; //end of procMedian

//procPCT Generates percentages from ACS data
function procPCT(inData,fipsArr, stub,geog,names){
var fipsnum;
var pctvalue = [];
	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];

for(i = 0; i < inData.length; i++) {
	 if(inData[i].geonum == 108) {
			 fipsnum = 0;
		} else {
			 fipsnum = inData[i].geonum - 108000;
		};

	if(stub == 'b17001'){  //Poverty
	    pctvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'dem' : +inData[i].b17001001, 'num' : +inData[i].b17001002, 'pct' : +inData[i].b17001002/+inData[i].b17001001});
	};
	if(stub == 'b05002'){  //Native Colorado
	    pctvalue.push({'fips' : fipsnum, 'name' : inData[i].geoname, 'dem' : +inData[i].b05002001, 'num' : +inData[i].b05002003, 'pct' : +inData[i].b05002003/+inData[i].b05002001});
	};
}; //i

if(regList.includes(geog)){
	var pct_out = [];
	for(i = 0; i < fipsArr.length;i++){
		var pct_tmp = [];
		var regionDat = []
		var fipslist = regionCOL(fipsArr[i]);
		var tmp_list = fipslist[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
		var filtvalue = pctvalue.filter(function(d) {return tmp_list.includes(d.fips)});
		var columnsToSum = ['dem', 'num'];
		var regSum = d3.rollup(filtvalue,
					  v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])));
		var pctval = regSum.num/regSum.dem;
		var regionNumber = -101;
		var regionNam = regionName(fipsArr[i]);
		regionDat.push({fips : regionNumber, name : regionNam, dem : regSum.dem, num : regSum.num, pct : pctval});
	    pct_tmp = regionDat.concat(filtvalue);
		var pct_out = pct_out.concat(pct_tmp);
	}; //i loop
};

if(regList.includes(geog)){
  return pct_out;
} else {
   return pctvalue;
}
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
                  "@page Section1 {size:841.7pt 595.45pt;mso-page-orientation:landscape;margin:1.25in 1.0in 1.25in 1.0in;mso-header-margin:.5in;mso-footer-margin:.5in;mso-paper-source:0;} " +
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
    filename = filename?filename+'.doc':'document.doc';
    
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


 //Data Table WordButton creator
 
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

//Triggering the first button  Expand these for each button...
var firstbtn = valSec[0];
if(firstbtn == 'sel1') {
 var finDescript  = descript + "<br>Basic Statistics";
  var tabDescript = descript + ": Basic Statistics";

   PROFILE_1.innerHTML = "";
   PROFILE_2.innerHTML = "";
   PROFILE_3.innerHTML = "";
   PROFILE_4.innerHTML = "";
   
     //Add Download buttons...
   AddProfileBtns(PROFILE_1,'sel1');

   //Add heading to DOM
    var sel1heading = document.createElement("H2");
   sel1heading.innerHTML = finDescript;
   PROFILE_1.appendChild(sel1heading);

  var outSVG =  genSel1map(lvl, fipsArr, names, PROFILE_1);

    genSel1tab(lvl, fipsArr, names, tabDescript, PROFILE_2,curyear);
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

//Setting Event Listeners  For a click on a section button...
document.getElementById("sel1btn").addEventListener("click", function() {
  PROFILE_1.innerHTML = "";
  PROFILE_2.innerHTML = "";
  PROFILE_3.innerHTML = "";
  PROFILE_4.innerHTML = "";
   
     //Add Download buttons...
   AddProfileBtns(PROFILE_1,'sel1');

   //Add heading to DOM
   var sel1heading = document.createElement("H2");
   sel1heading.innerHTML = descript + "<br>Basic Statistics";
   PROFILE_1.appendChild(sel1heading);
   
   var outSVG =  genSel1map(lvl, fipsArr, names, PROFILE_1);
   genSel1tab(lvl, fipsArr, names, tabDescript, PROFILE_2,curyear);
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

}); //End of Promise 
}; //end of genProfile
	
	
//genSel1map The first tab, map
function genSel1map(level, fipsArr,nameArr,outputProfile){

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
var div = d3.select(outputProfile).append("div").attr("class","tooltip").style("opacity",0);
var coMap = d3.select(outputProfile).append('svg').attr('width', width).attr('height', height);
    	

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

var savedSVG = saveSVG(coMap);
return savedSVG;
}); //end of Promise
 
}; //end of genSel1map


function genSel1tab(level, fipsArr, nameArr, fileName, outputPro, curYr) {
//NEED to ADD COLORADO TO REGIONAL TABLE
 	const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_dec = d3.format(".3");
	const fmt_pct = d3.format(".1%");
	const fmt_comma = d3.format(",");
    const fmt_dollar = d3.format("$,.0f");
    const fmt_yr = d3.format("00");


	var curACS = "acs1519";  //UPDATE THIS 
	var prevACS = "acs0610";
    const yrlist = "2010,"+curYr;
	const yrlistARR = yrlist.split(",");
	
	const regList = ['Region', 'Regional Comparison'];
	const ctyList = ['County', 'County Comparison'];
    const muniList = ['Municipality', 'Municipal Comparison'];
	const placeList = ['Census Designated Place', 'Census Designated Place Comparison'];

if(regList.includes(level)) {

		for(i = 0; i < fipsArr.length; i++) {
		  var regNum = parseInt(fipsArr[i]);
		  var tmplist = regionCOL(regNum);
		  var fips_list =  tmplist[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
		}
}
if(ctyList.includes(level)) {
    var fips_list = [];
	var fipsACS = [];
		for(i = 0; i < fipsArr.length; i++) {
		  fips_list.push(parseInt(fipsArr[i]));
		  fipsACS.push('08' + fipsArr[i]);
	}
}
	if(muniList.includes(level)) {
		var fips_list =[];
		var muni_cty = [];
		var fipsACS = [];
		for(i = 0; i < fipsArr.length; i++){
			fips_list.push(parseInt(fipsArr[i]));
			muni_cty.push(parseInt(muni_county(fipsArr[i])));
			fipsACS.push("08" + fipsArr[i]);
		};
	    var muni_cty_acs = ['08'];
		for(i = 0; i < fipsArr.length; i++){
			   muni_cty_acs.push('08' + muni_county(fipsArr[i]));
	    };
	}
	
	if(placeList.includes(level)) {
		var cdp_cty = [];
		var fipsACS = [];
		for(i = 0; i < fipsArr.length; i++){
			cdp_cty.push(parseInt(cdp_county(fipsArr[i])));
			fipsACS.push("08" + fipsArr[i]);

		};
		var cdp_cty_acs = ['08'];
		for(i = 0; i < fipsArr.length; i++){
			   cdp_cty_acs.push('08' + cdp_county(fipsArr[i]));
	    };

	}
	
  //Generate urls
if(regList.includes(level))  { 
	var jobs_list = [];
	var fipsACS = ["08"];

	for(i = 0; i < fips_list.length; i++){
	  jobs_list.push(fips_list[i]);
	  fipsACS.push("08" + tmplist[0].fips[i]);
    };

	 fipsACS.unshift('08');
   	 var popREG = 'https://gis.dola.colorado.gov/lookups/components?county=' + jobs_list + '&year=' + yrlist;
	 var jobsREG = 'https://gis.dola.colorado.gov/lookups/jobs?county='+jobs_list+'&year='+ curYr +'&sector=0';
	 

	 //median Income ACS  b19013001
	 var incREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natREG = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

//State Results
   	 var popCO = 'https://gis.dola.colorado.gov/lookups/components_region?reg_num=0&year=' + yrlist;
	 var jobsCO = 'https://gis.dola.colorado.gov/lookups/jobs?county=0&year='+ curYr +'&sector=0';


	 var prom = [d3.json(popREG), d3.json(jobsREG), d3.json(incREG),
	             d3.json(hvalREG), d3.json(povREG), d3.json(natREG),
				 d3.json(popCO), d3.json(jobsCO)];
  };

if(ctyList.includes(level)){
	fips_list.unshift(0);
	fipsACS.unshift('08');
   	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + fips_list + '&year=' + yrlist;
	 var jobsCTY = 'https://gis.dola.colorado.gov/lookups/jobs?county='+fips_list+'&year='+ curYr +'&sector=0';
	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;


	 var prom = [d3.json(popCTY),d3.json(jobsCTY),d3.json(incCTY),
	             d3.json(hvalCTY), d3.json(povCTY), d3.json(natCTY)];
  };


if(muniList.includes(level)){
	 muni_cty.unshift(0);
	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + muni_cty + '&year=' + yrlist;
	 var popMUNI = 'https://gis.dola.colorado.gov/lookups/munipophousing?year=' + yrlist + '&placefips=' + fips_list + '&compressed=yes';
   	
	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + muni_cty_acs;
	 var incMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + muni_cty_acs;
	 var hvalMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + muni_cty_acs; 
	 var povMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + muni_cty_acs;
	 var natMUNI = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popCTY),d3.json(popMUNI),d3.json(incCTY),d3.json(incMUNI),
	             d3.json(hvalCTY),d3.json(hvalMUNI), d3.json(povCTY), d3.json(povMUNI), 
				 d3.json(natCTY),d3.json(natMUNI)];
  }
  
 if(placeList.includes(level)){
	 cdp_cty.unshift(0);

	 var popCTY = 'https://gis.dola.colorado.gov/lookups/components?county=' + cdp_cty + '&year=' + yrlist;
	 var popCDPprev = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + prevACS + '&schema=data&type=json&field=b01001001&geoid=' + fipsACS;
   	 var popCDPcur = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b01001001&geoid=' + fipsACS;
	 //median Income ACS  b19013001
	 var incCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + cdp_cty_acs;
	 var incCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b19013001&geoid=' + fipsACS;
	 //median house value ACS b25077001
	 var hvalCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + cdp_cty_acs;
	 var hvalCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b25077001&geoid=' + fipsACS;
	 //pct poverty ACS b17001001, b17001002
	 var povCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + cdp_cty_acs; 
	 var povCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b17001001,b17001002&geoid=' + fipsACS; 
	 //pct native CO ACS b05002001, b05002003
	 var natCTY = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + cdp_cty_acs;
	 var natCDP = 'https://gis.dola.colorado.gov/capi/demog?limit=99999&db=' + curACS + '&schema=data&type=json&field=b05002001,b05002003&geoid=' + fipsACS;

	 var prom = [d3.json(popCTY),d3.json(popCDPcur),d3.json(popCDPprev),
	             d3.json(incCTY),d3.json(incCDP),
	             d3.json(hvalCTY),d3.json(hvalCDP), d3.json(povCTY), d3.json(povCDP), 
				 d3.json(natCTY),d3.json(natCDP)];
  }

  Promise.all(prom).then(data =>{
  
	  
	  if(regList.includes(level)){
		  //Extracting State data records
		  var popCOdata = data[6];
		  var jobsCOdata = data[7];
		  var incCOdata = data[2].data.filter(d => d.geoname == "Colorado");
		  var incREGdata = data[2].data.filter(d => d.geoname != "Colorado");
		  var hvalCOdata = data[3].data.filter(d => d.geoname == "Colorado");
		  var hvalREGdata = data[3].data.filter(d => d.geoname != "Colorado");
  		  var povCOdata = data[4].data.filter(d => d.geoname == "Colorado");
		  var povREGdata = data[4].data.filter(d => d.geoname != "Colorado");
		  var natCOdata = data[5].data.filter(d => d.geoname == "Colorado");
		  var natREGdata = data[5].data.filter(d => d.geoname != "Colorado");
				 
		 //Population Growth
		 var tabgr1 = calcpopGR(data[0],fipsArr,level,yrlistARR);
		//Chnaging key names
		 const popCOdata2 = popCOdata.map(d => {
             return {countyfips: d.reg_num, year : d.year, estimate : d.estimate, births : d.births, 
			        deaths : d.deaths, netmig : d.netmig, change : d.change, datatype : d.datatype};
           });
		 var tabCO = calcpopGR(popCOdata2,0,'County',yrlistARR);
         var tabgr = tabCO.concat(tabgr1)
		 
		 //Jobs
		 
		 var state_jobs = [];
			 state_jobs.push({'area_code' : jobsCOdata[0].area_code, 'population_year' : jobsCOdata[0].population_year, 'total_jobs' : +jobsCOdata[0].total_jobs});

		 var cty_jobs = [];

		 for(i = 0; i < fipsArr.length; i++) {
			 var reg_cty = regionCOL(+fipsArr[i]);
			 var fips_num =  reg_cty[0].fips.map(function (x) { 
					return parseInt(x, 10); 
			});
			 var reg_data = data[1].filter( d => fips_num.includes(d.area_code));
			 var cty_list = [... new Set(reg_data.map(tag => tag.area_code))]; 
		 
			 for(j = 0; j < reg_data.length; j++){
				 cty_jobs.push({'area_code' : reg_data[j].area_code, 'population_year' : reg_data[j].population_year, 'total_jobs' : +reg_data[j].total_jobs});
			 }; //J loop
	//Building Regional Values

	         var reg_jobs = [];
			 var pop_year = cty_jobs[0].population_year;
			 var reg_val = -100 - parseInt(fipsArr[i])
			 var jobs_reg = d3.rollup(cty_jobs, v => d3.sum(v, d => d.total_jobs));
			 reg_jobs.push({area_code : reg_val, population_year : pop_year, total_jobs : jobs_reg});
			 var tmp_jobs = state_jobs.concat(reg_jobs).concat(cty_jobs);
			 cty_jobs = tmp_jobs;
		 } //i loop
         var state_income = [];
		     state_income.push({'fips' : 0, 'name' : incCOdata[0].geoname, 'value' : +incCOdata[0].b19013001});
		 var median_income1 = procMedian(incREGdata,fipsArr,'b19013001',level,nameArr);
		 var median_income = state_income.concat(median_income1);
		 
		 //Median House Value
         var state_home = [];
		     state_home.push({'fips' : 0, 'name' : hvalCOdata[0].geoname, 'value' : +hvalCOdata[0].b25077001});
		 var median_home1 = procMedian(hvalREGdata,fipsArr,'b25077001',level,nameArr);
		 var median_home = state_home.concat(median_home1);
		 
		 //pct poverty
		 var povCO = procPCT(povCOdata,0,'b17001','County',nameArr);
		 var povREG = procPCT(povREGdata,fipsArr,'b17001',level,nameArr);
         var poverty = povCO.concat(povREG);
		 
		 //pct native
		 var coNatCO = procPCT(natCOdata,0,'b05002','County',nameArr);
		 var coNatREG = procPCT(natREGdata,fipsArr,'b05002',level,nameArr);
		 var coNative = coNatCO.concat(coNatREG);

}; //level = region

if(ctyList.includes(level)){
	
		 //Population Growth
		 var tabgr = calcpopGR(data[0],fips_list,level,yrlistARR);

		 //Jobs
		 var jobscty = data[1];
		 var cty_list = [... new Set(jobscty.map(tag => tag.area_code))]; 
		 
		 var cty_jobs = [];
		 for(i = 0; i < data[1].length; i++){
			 cty_jobs.push({'area_code' : data[1][i].area_code, 'population_year' : data[1][i].population_year, 'total_jobs' : +data[1][i].total_jobs});
		 };

		 //Median Income
		 var median_income = procMedian(data[2].data,fipsArr,'b19013001','county',nameArr);
		 //Median House Value
		 var median_home = procMedian(data[3].data,fipsArr,'b25077001','county',nameArr);
		 
		 //pct poverty
		 var poverty = procPCT(data[4].data,fipsArr,'b17001','county',nameArr);

		 //pct native
		 var coNative = procPCT(data[5].data,fipsArr,'b05002','county',nameArr);
}; //level = county	  

if(muniList.includes(level)){
		 //Population Growth
		 var ctygr  = calcpopGR(data[0],fips_list,"County",yrlistARR);
		 var munigr = calcpopGR(data[1],fips_list,level,yrlistARR);
		 if(level == 'Municipality'){
             var tabgr = ctygr.concat(munigr);
		 } else {
			 var tabgr = munigr;
		 };
 
		 //Median Income
		 var median_income_CTY = procMedian(data[2].data,fipsArr,'b19013001','county',nameArr);
		 var median_income_MUNI = procMedian(data[3].data,fipsArr,'b19013001','muni',nameArr);
		 if(level == 'Municipality'){
			var median_income = median_income_CTY.concat(median_income_MUNI);
		 } else {
			 var median_income = median_income_MUNI;
		 };
		 
		 //Median House Value
		 var median_home_CTY = procMedian(data[4].data,fipsArr,'b25077001','county',nameArr);
		 var median_home_MUNI = procMedian(data[5].data,fipsArr,'b25077001','muni',nameArr);
		 if(level == 'Municipality'){
			 var median_home = median_home_CTY.concat(median_home_MUNI);
		 } else {
			var median_home = median_home_MUNI;
		 };
		 //pct poverty
		 var poverty_CTY = procPCT(data[6].data,fipsArr,'b17001','county',nameArr);
		 var poverty_MUNI = procPCT(data[7].data,fipsArr,'b17001','muni',nameArr);
		 if(level == 'Municipality'){ 
			var poverty = poverty_CTY.concat(poverty_MUNI);
		 } else {
			var poverty = poverty_MUNI;
		 };
		 
		 //pct native
		 var coNative_CTY = procPCT(data[8].data,fipsArr,'b05002','county',nameArr);
		 var coNative_MUNI = procPCT(data[9].data,fipsArr,'b05002','muni',nameArr);
         if(level == 'Municipality'){
			 var coNative = coNative_CTY.concat(coNative_MUNI);
		 } else {
			 var coNative = coNative_MUNI;
		 };


}; //level = municipality	  

if(placeList.includes(level)){
//Building population data set
var prevPop = [];
var prevYr = 2000 + parseInt(data[2].source.substr(5,2));
 prevPop.push({'placefips' : data[2].data[0].place, 'year' : prevYr,  'estimate' : parseInt(data[2].data[0].b01001001)});

var curPop = [];
var curYr = 2000 + parseInt(data[1].source.substr(5,2));
 curPop.push({'placefips' : data[1].data[0].place, 'year' : curYr,  'estimate' : parseInt(data[1].data[0].b01001001)});
var placePop = prevPop.concat(curPop);


		 //Population Growth
		 var ctygr = calcpopGR(data[0],fips_list,"County",yrlistARR);
		 var cdpgr = calcpopGR(placePop,fips_list,level,yrlistARR);
		 if(level == 'Census Designated Place') {
			 var tabgr = ctygr.concat(cdpgr);
		 } else {
		     var tabgr = cdpgr;
		 };
		 
		 //Median Income
		 var median_income_CTY = procMedian(data[3].data,fipsArr,'b19013001','county',nameArr);
		 var median_income_CDP = procMedian(data[4].data,fipsArr,'b19013001','cdp',nameArr);
		 if(level == 'Census Designated Place') {  
		    var median_income = median_income_CTY.concat(median_income_CDP);
		 } else {
			var median_income = median_income_CDP;
         };
		 
		 //Median House Value
		 var median_home_CTY = procMedian(data[5].data,fipsArr,'b25077001','county',nameArr);
		 var median_home_CDP = procMedian(data[6].data,fipsArr,'b25077001','cdp',nameArr);
		 if(level == 'Census Designated Place') {
			var median_home = median_home_CTY.concat(median_home_CDP);
		 } else {
			 var median_home = median_home_CDP;
		 }; 
			
		 //pct poverty
		 var poverty_CTY = procPCT(data[7].data,fipsArr,'b17001','county',nameArr);
		 var poverty_CDP = procPCT(data[8].data,fipsArr,'b17001','cdp',nameArr);
         if(level == 'Census Designated Place') {
			var poverty = poverty_CTY.concat(poverty_CDP);
		 } else {
			var poverty = poverty_CDP;
		 };
		 
		 //pct native
		 var coNative_CTY = procPCT(data[9].data,fipsArr,'b05002','county',nameArr);
		 var coNative_CDP = procPCT(data[10].data,fipsArr,'b05002','cdp',nameArr);
         if(level == 'Census Designated Place') {
			var coNative = coNative_CTY.concat(coNative_CDP);
		 } else {
			var coNative = coNative_CDP;
		 };


}; //level = Census Designated Places	 

//data table format changing font width

var curyr = yrlistARR[1];
var prevyr = yrlistARR[0];


var fipsACSns = fipsACS;
if(fipsACSns[0] == '08' && fipsACSns.length > 1){
     fipsACSns.shift();
}
fipsACSList = fipsACSns.join(',')

var ACSend = parseInt(curACS.substr(5,2)) + 2000;

var censstub = "https://data.census.gov/cedsci/table?q=";
var tabno = ["B19013","B25077","B17001","B05002"];


if(muniList.includes(level) || placeList.includes(level)){
	var censgeo = "&g=1600000US"+ fipsACSList +"&tid=ACSDT5Y" + ACSend + ".";

		var labels = [
		       {'title' : 'Index'},
			   {'title' : 'Geography'},
			   {'title': 'Population ('+curyr+')*',link : 'https://coloradodemography.github.io/population/data/muni-pop-housing/'},
			   {'title': 'Population Change (' + prevyr + ' to ' + curyr + ')*',link : 'https://coloradodemography.github.io/population/data/muni-pop-housing/'},
			   {'title': 'Percentage Change (' + prevyr + ' to ' + curyr + ')*',link : 'https://coloradodemography.github.io/population/data/muni-pop-housing/'},
			   {'title': 'Median Household Income^', link : censstub + tabno[0] + censgeo + tabno[0] },
			   {'title': 'Median Home Value^', link : censstub + tabno[1] + censgeo + tabno[1] },
			   {'title': 'Percentage of Population with incomes below poverty line.^', link : censstub + tabno[2] + censgeo + tabno[2] },
			   {'title': 'Percentage of Population born in Colorado^', link : censstub + tabno[2] + censgeo + tabno[2] }
				  ];
  } else {
	  var censgeo = "&g=0500000US"+ fipsACSList +"&tid=ACSDT5Y" + ACSend + ".";

	  var labels = [
	   {'title' : 'Index'},
       {'title' : 'Geography'},
       {'title': 'Population ('+curyr+')*', link : 'https://coloradodemography.github.io/population/data/county-data-lookup/'},
       {'title': 'Population Change (' + prevyr + ' to ' + curyr + ')*', link : 'https://coloradodemography.github.io/population/data/county-data-lookup/'},
       {'title': 'Percentage Change (' + prevyr + ' to ' + curyr + ')*', link : 'https://coloradodemography.github.io/population/data/county-data-lookup/'},
       {'title': 'Total Employment (' + curyr + ')*', link : 'https://coloradodemography.github.io/economy-labor-force/data/jobs-by-sector/#jobs-by-sector-naics'},
       {'title': 'Median Household Income^', link : censstub + tabno[0] + censgeo + tabno[0]},
       {'title': 'Median Home Value^', link : censstub + tabno[1] + censgeo + tabno[1]},
       {'title': 'Percentage of Population with incomes below poverty line.^', link : censstub + tabno[2] + censgeo + tabno[2]},
       {'title': 'Percentage of Population born in Colorado^', link : censstub + tabno[3] + censgeo + tabno[3]}
		  ];
  };

var outtab = [];

if(muniList.includes(level) || placeList.includes(level)){
	for(k = 0; k < tabgr.length; k++){ 
	   outtab.push([ k,
	                 tabgr[k].name,
					 tabgr[k].yr2,
					 tabgr[k].popch,
					 tabgr[k].growth *100,
					 median_income[k].value,
					 median_home[k].value,
					 poverty[k].pct *100,
					 coNative[k].pct * 100
	   ]);
	};
} else { 

	for(var k = 0; k < tabgr.length; k++){ 
	
        outtab.push([ k,
		         tabgr[k].name,
                 tabgr[k].yr2,
                 tabgr[k].popch ,
				 tabgr[k].growth * 100,
                 cty_jobs[k].total_jobs,
                 median_income[k].value,
                 median_home[k].value,
                 poverty[k].pct * 100,
                 coNative[k].pct * 100
		]);

	};
}; 

//Building Table Components
//Processing Table Rows for regions

if(regList.includes(level)) {
	outtab[1][1] = "<b>"+outtab[1][1]+"</b>";
	 };

//Creating Footer

var acsyr1 = parseInt(curACS.substr(3,2)) + 2000;
var acsyr2 = parseInt(curACS.substr(5,2)) + 2000;
var tblfoot = [
               ["Sources: * Colorado State Demography Office"],
               ['^U.S. Census Bureau, '+fmt_yr(acsyr1) + '-' + fmt_yr(acsyr2) +' American Community Survey'],
               ['Print Date : ' + fmt_date(new Date)]
			   ];

var ftrString = "<tfoot><tr>";
for(i = 0; i < tblfoot.length; i++){
	if(muniList.includes(level)){
	    ftrString = ftrString + "<tr><td colspan='9'>" + tblfoot[i] + "</td></tr>";
	} else {
	    ftrString = ftrString + "<tr><td colspan='10'>" + tblfoot[i] + "</td></tr>";
	}
	};	
ftrString = ftrString + "</tr></tfoot>";

var ftrMsg = "Sources: * Colorado State Demography Office " + "^U.S. Census Bureau, "+fmt_yr(acsyr1) + "-" + fmt_yr(acsyr2) +" American Community Survey" +
   "Print Date : " + fmt_date(new Date);
   
var headString = "<thead><tr>"
for(i = 0; i < labels.length;i++) {
	if(i > 1){
	    headString = headString + "<th>"+"<a href='"+labels[i].link +"' target='_blank'>"+labels[i].title+"</a></th>";
	} else {
		headString = headString + "<th>"+labels[i].title+"</th>";
	}
}
headString = headString + "</tr></thead>";

$(outputPro).append("<table id='summtab' class='DTTable' width='90%'></table>");


//footer
//Creating Footer
var ftrString = "<tfoot>";
for(i = 0; i < tblfoot.length; i++) {
	ftrString = ftrString + "<tr><td colspan = '" + outtab[0].length + "'>"+ tblfoot[i] + "</td></tr>"
}
ftrString = ftrString + "</tfoot>"

//Generating final tables
var	tabpop = "";


for(i = 0; i < outtab.length;i++){
	tabpop = tabpop + '<tr>';

	for(j = 0; j < outtab[i].length;j++){
		tabpop = tabpop + '<td>' + outtab[i][j] + '</td>';
	}
	tabpop = tabpop + "</tr>";
}

var tabpop_fin = headString + tabpop + ftrString;
//Writing final table to DOM
$("#summtab").append(tabpop_fin);

if(muniList.includes(level) || placeList.includes(level)){
	$('#summtab').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0, '' )},
		{'targets' : [5,6], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0,  '$' )},
		{'targets' : [4,7,8], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 1, '','%' )},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2,3,4,5,6,7,8], 'className': 'dt-body-right'
		},
		{ 'targets': 1, 'width': '20%' ,
		  'targets' : [2, 3,4,5,6,7,8], 'width' :'10%'
		}  
		],
		dom: 'Bfrtip',
       buttons: [
		{  
                extend: 'word',
				text :'Word',
                titleAttr: fileName,
				footer : true
        },
        {  
                extend: 'excelHtml5',
                title: fileName,
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : false,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			}
		}
     ],  //buttons
	} );
} else {
	$('#summtab').DataTable( {
		"columnDefs" : [
		{'targets' : [2, 3,5], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0, '' )},
		{'targets' : [6,7], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 0,  '$' )},
		{'targets' : [4,8,9], 'type' : 'num',
		render: DataTable.render.number( ',', '.', 1, '','%' )},
		{   
			'targets': [0,1], 'className': 'dt-body-left',
			'targets' : [2,3,4,5,6,7,8,9], 'className': 'dt-body-right'
		},
		
        { 'targets': 0, 'width' :'5%',
		  'targets': 1, 'width': '10%' ,
		  'targets' : [2, 3,4,5,6,7,8,9], 'width' :'7%'
		} 
		
		],
		dom: 'Bfrtip',
       buttons: [
		{  
                extend: 'word',
				text :'Word',
                titleAttr: fileName,
				footer : true
        },
        {  
                extend: 'excelHtml5',
                title: fileName,
				footer : false,
				messageBottom : ftrMsg,
				customize : function (xlsx) {
					var sheet = xlsx.xl.worksheets['sheet1.xml'];
					var col = $('col', sheet);
					col.each(function () { $(this).attr('width', 20); })
				}
        },
		{
                extend: 'csvHtml5',
                title: fileName
        },
        {
                extend: 'pdfHtml5',
                title: fileName,
				orientation : 'landscape',
				footer : false,
				messageBottom : ftrMsg,
				exportOptions: { columns: ':visible'},
				customize: function (doc) {
					var rowCount = doc.content[1].table.body.length;
					var colCount = doc.content[1].table.body[1].length;
                      for (i = 1; i < rowCount; i++) {
						for(j = 0; j < colCount; j++){
                          if(j < 2) {
						      doc.content[1].table.body[i][j].alignment = 'left';
						  } else {
                              doc.content[1].table.body[i][j].alignment = 'right';
						  }
						}
						}
					 doc.content[1].table.widths = Array(doc.content[1].table.body[0].length + 1).join('*').split('');
			}
		}
     ],  //buttons
	} );
};

  }); //End of Promise
};  //End of genSel1Tab

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

growth_tab(geotype, tab_gr,fileName, PRO_1);  
//Plots
genRegEstSetup(geotype,est_data,PRO_2.id, fipsList, ctyNameList);
genRegForeSetup(geotype,forec_data,PRO_3.id, fipsList, ctyNameList);
genRegcocSetup(geotype,coc_data,PRO_4.id, fipsList, ctyNameList);
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

	growth_tab(geotype, tab_gr,fileName, PRO_1);  
	estPlot(est_data, "profile", geotype, PRO_2.id, curyear, fipsList, ctyNameList);
	var	fore_Data = forecastPlot(data[1], "profile", PRO_3.id, curyear, fipsList, ctyNameList);
	cocPlot(data[0],"profile", PRO_4.id, curyear, fipsList, ctyNameList);
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
	
	growth_tab(geotype, tab_gr,fileName, PRO_1);  
	estPlot(est_data, "profile", geotype, PRO_2.id, curyear, fipsList, ctyNameList);
	var	fore_Data = forecastPlot(data[1], "profile", PRO_3.id, curyear, fipsList, ctyNameList);
	cocPlot(data[0],"profile", PRO_4.id, curyear, fipsList, ctyNameList);
}; //Municiplaity
}); //End of Promise

}; //end genSel2display


//genSel3 Display  Produces age panel charts
//Age estimates and forecasts facet chart
//Age Pyramid

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

//County charts and pytamids -- State and County data are already rolled up.  age_cty_data 
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



//genSel4 Display  Produces Income, Educ and Race panel charts
//Age estimates and forecasts facet chart
//Age Pyramid

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
						Estimate 	MOE
	Total Households	B19051_001E	B19051_001M
	Total Households With earnings	B19051_002E	B19051_002M
	Total Households With wage or salary income	B19052_002E	B19052_002M
	Total Households With self-employment income	B19053_002E	B19053_002M
	Total Households With interest, dividends, or net rental income	B19054_002E	B19054_002M
	Total Households With Social Security income	B19055_002E	B19055_002M
	Total Households With Supplemental Security Income (SSI)	B19056_002E	B19056_002M
	Total Households With public assistance income	B19057_002E	B19057_002M
	Total Households With cash public assistance or Food Stamps/SNAP	B19058_002E	B19058_002M
	Total Households With retirement income	B19059_002E	B19059_002M
	Total Households With other types of income	B19060_002E	B19060_002M
	Total Income	B19061_001E	B19061_001M
	Total Wage and Salary Income	B19062_001E	B19062_001M
	Total Self Employment Income	B19063_001E	B19063_001M
	Total Interest Income	B19064_001E	B19064_001M
	Total  Social Security Income	B19065_001E	B19065_001M
	Total SSI Income	B19066_001E	B19066_001M
	Total Public Assistance Income	B19067_001E	B19067_001M
	Total Retirement Income	B19069_001E	B19069_001M
	Total Other Income	B19070_001E	B19070_001M
*/
  
  var hh_tab = ["B19051_001E",	"B19051_001M",	"B19051_002E",	"B19051_002M",	"B19052_002E",	"B19052_002M",
                 "B19053_002E",	"B19053_002M",	"B19054_002E",	"B19054_002M",	"B19055_002E",	"B19055_002M",	
				 "B19056_002E",	"B19056_002M",	"B19057_002E",	"B19057_002M",	"B19058_002E",	"B19058_002M",	
				 "B19059_002E",	"B19059_002M",	"B19060_002E",	"B19060_002M",
				 "B19061_001E",	"B19061_001M",	"B19062_001E",	"B19062_001M",	"B19063_001E",	"B19063_001M",	
				 "B19064_001E",	"B19064_001M",	"B19065_001E",	"B19065_001M",	"B19066_001E",	"B19066_001M",	
				 "B19067_001E",	"B19067_001M",	"B19069_001E",	"B19069_001M",	"B19070_001E",	"B19070_001M"]
		

  // Generateing list of fips codes by geotype

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

var inc_reg_2 = acsMOE(inc_reg_sum,geotype,fipsArr);
var inc_cty_2 = acsMOE(inc_cty_data,'county',fips_list);
var inc_st_2 = acsMOE(inc_st_data,'state','8');
var inc_reg_data = acsConcat(inc_st_2,inc_reg_2,inc_cty_2);

var hhinc_reg_2 = acsMOE(hhinc_reg_sum,geotype,fipsArr);
var hhinc_cty_2 = acsMOE(hhinc_cty_data,'county',fips_list);
var hhinc_st_2 = acsMOE(hhinc_st_data,'state','8');
var hhinc_reg_data = acsConcat(hhinc_st_2,hhinc_reg_2,hhinc_cty_2);

var educ_reg_2 = acsMOE(educ_reg_sum,geotype,fipsArr);
var educ_cty_2 = acsMOE(educ_cty_data,'county',fips_list);
var educ_st_2 = acsMOE(educ_st_data,'state','8');
var educ_reg_data = acsConcat(educ_st_2,educ_reg_2,educ_cty_2);

var race_reg_2 = acsMOE(race_reg_sum,geotype,fipsArr);
var race_cty_2 = acsMOE(race_cty_data,'county',fips_list);
var race_st_2 = acsMOE(race_st_data,'state','8');
var race_reg_data = acsConcat(race_st_2,race_reg_2,race_cty_2);


} //Region
//Other geos and calculte percentages
}); //end of Promise
}; //end of genSel4Display