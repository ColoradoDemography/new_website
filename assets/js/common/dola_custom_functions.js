

/* save table as csv */
function dlcsv(tableid, outputfilename) {

    var csvstring = "";

    var oTable = document.getElementById(tableid);
    var rowLength = oTable.rows.length;
    for (i = 0; i < rowLength; i++) {
        var oCells = oTable.rows.item(i).cells;
        var cellLength = oCells.length;
        for (var j = 0; j < cellLength; j++) {
            /* get your cell info here */
            if (j === 0 && i > 0) {
                csvstring = csvstring + "\n";
            }
            var cellval=oCells.item(j).innerHTML;
            var addCell="\"" + cellval.replace(/\&nbsp;/g," ") + "\"";
            csvstring = csvstring + addCell;
            if (j < cellLength) {
                csvstring = csvstring + ",";
            }
        }
    }


    var blob = new Blob([csvstring], {
        type: "text/csv;charset=utf-8"
    });
    saveAs(blob, outputfilename);
}


/* description is in the name */
function fetchJSONFile(path, callback) {

    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                if (callback) callback(data);
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();

}


/* Return an array of the selected option values*/
function getSelectValues(select) {
    var result = [];
    var options = select && select.options;
    var opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        opt = options[i];

        if (opt.selected) {
            result.push(opt.value || opt.text);
        }
    }
    return result;
}


/* standard county lookup, number or string */
function clookup(county) {

    if (county === 1 || county === "001") {
        return "Adams County";
    }
    if (county === 3 || county === "003") {
        return "Alamosa County";
    }
    if (county === 5 || county === "005") {
        return "Arapahoe County";
    }
    if (county === 7 || county === "007") {
        return "Archuleta County";
    }
    if (county === 9 || county === "009") {
        return "Baca County";
    }
    if (county === 11 || county === "011") {
        return "Bent County";
    }
    if (county === 13 || county === "013") {
        return "Boulder County";
    }
    if (county === 14 || county === "014") {
        return "Broomfield County";
    }
    if (county === 15 || county === "015") {
        return "Chaffee County";
    }
    if (county === 17 || county === "017") {
        return "Cheyenne County";
    }
    if (county === 19 || county === "019") {
        return "Clear Creek County";
    }
    if (county === 21 || county === "021") {
        return "Conejos County";
    }
    if (county === 23 || county === "023") {
        return "Costilla County";
    }
    if (county === 25 || county === "025") {
        return "Crowley County";
    }
    if (county === 27 || county === "027") {
        return "Custer County";
    }
    if (county === 29 || county === "029") {
        return "Delta County";
    }
    if (county === 31 || county === "031") {
        return "Denver County";
    }
    if (county === 33 || county === "033") {
        return "Dolores County";
    }
    if (county === 35 || county === "035") {
        return "Douglas County";
    }
    if (county === 37 || county === "037") {
        return "Eagle County";
    }
    if (county === 39 || county === "039") {
        return "Elbert County";
    }
    if (county === 41 || county === "041") {
        return "El Paso County";
    }
    if (county === 43 || county === "043") {
        return "Fremont County";
    }
    if (county === 45 || county === "045") {
        return "Garfield County";
    }
    if (county === 47 || county === "047") {
        return "Gilpin County";
    }
    if (county === 49 || county === "049") {
        return "Grand County";
    }
    if (county === 51 || county === "051") {
        return "Gunnison County";
    }
    if (county === 53 || county === "053") {
        return "Hinsdale County";
    }
    if (county === 55 || county === "055") {
        return "Huerfano County";
    }
    if (county === 57 || county === "057") {
        return "Jackson County";
    }
    if (county === 59 || county === "059") {
        return "Jefferson County";
    }
    if (county === 61 || county === "061") {
        return "Kiowa County";
    }
    if (county === 63 || county === "063") {
        return "Kit Carson County";
    }
    if (county === 65 || county === "065") {
        return "Lake County";
    }
    if (county === 67 || county === "067") {
        return "La Plata County";
    }
    if (county === 69 || county === "069") {
        return "Larimer County";
    }
    if (county === 71 || county === "071") {
        return "Las Animas County";
    }
    if (county === 73 || county === "073") {
        return "Lincoln County";
    }
    if (county === 75 || county === "075") {
        return "Logan County";
    }
    if (county === 77 || county === "077") {
        return "Mesa County";
    }
    if (county === 79 || county === "079") {
        return "Mineral County";
    }
    if (county === 81 || county === "081") {
        return "Moffat County";
    }
    if (county === 83 || county === "083") {
        return "Montezuma County";
    }
    if (county === 85 || county === "085") {
        return "Montrose County";
    }
    if (county === 87 || county === "087") {
        return "Morgan County";
    }
    if (county === 89 || county === "089") {
        return "Otero County";
    }
    if (county === 91 || county === "091") {
        return "Ouray County";
    }
    if (county === 93 || county === "093") {
        return "Park County";
    }
    if (county === 95 || county === "095") {
        return "Phillips County";
    }
    if (county === 97 || county === "097") {
        return "Pitkin County";
    }
    if (county === 99 || county === "099") {
        return "Prowers County";
    }
    if (county === 101 || county === "101") {
        return "Pueblo County";
    }
    if (county === 103 || county === "103") {
        return "Rio Blanco County";
    }
    if (county === 105 || county === "105") {
        return "Rio Grande County";
    }
    if (county === 107 || county === "107") {
        return "Routt County";
    }
    if (county === 109 || county === "109") {
        return "Saguache County";
    }
    if (county === 111 || county === "111") {
        return "San Juan County";
    }
    if (county === 113 || county === "113") {
        return "San Miguel County";
    }
    if (county === 115 || county === "115") {
        return "Sedgwick County";
    }
    if (county === 117 || county === "117") {
        return "Summit County";
    }
    if (county === 119 || county === "119") {
        return "Teller County";
    }
    if (county === 121 || county === "121") {
        return "Washington County";
    }
    if (county === 123 || county === "123") {
        return "Weld County";
    }
    if (county === 125 || county === "125") {
        return "Yuma County";
    }
    if (county === 0 || county === "000") {
        return "Colorado";
    }

    return undefined;
}

    function rlookup(reg_num){
        if(reg_num===0){return "Colorado";}
        if(reg_num===1){return "Planning Region 1";}
        if(reg_num===2){return "Planning Region 2";}
        if(reg_num===3){return "Planning Region 3";}
        if(reg_num===4){return "Planning Region 4";}
        if(reg_num===5){return "Planning Region 5";}
        if(reg_num===6){return "Planning Region 6";}
        if(reg_num===7){return "Planning Region 7";}
        if(reg_num===8){return "Planning Region 8";}
        if(reg_num===9){return "Planning Region 9";}
        if(reg_num===10){return "Planning Region 10";}
        if(reg_num===11){return "Planning Region 11";}
        if(reg_num===12){return "Planning Region 12";}
        if(reg_num===13){return "Planning Region 13";}
        if(reg_num===14){return "Planning Region 14";}
        if(reg_num===15){return "Central Mountains";}
        if(reg_num===16){return "Eastern Plains";}
        if(reg_num===17){return "Front Range";}
        if(reg_num===18){return "San Luis Valley";}
        if(reg_num===19){return "Western Slope";}
        if(reg_num===20){return "Denver PMSA";}
        if(reg_num===21){return "Denver-Boulder Metro Area";}
        if(reg_num===22){return "Denver-Boulder-Greeley CMSA";}
        if(reg_num===23){return "10 County Denver Metro";}
            
        return undefined; /*fallback (replaces otherwise undefined)*/
      }
      
