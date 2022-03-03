//Website functions fror State Demography Office
//A. Bickford 5/2021

//list of lookup statements  https://github.com/ColoradoDemography/MS_Demog_Lookups/tree/master/doc

//Utility Functions

//hideButtons  selects and hides all "dropbtn" class buttons
function hideButtons() {
	btn = document.getElementsByClassName("dropbtn"); 
	for(i = 0; i < btn.length; i++){
		btn[i].style.display = "none";
	};
}; //end of hideButtons

//changeKeyObjects 
function changeKeyObjects(arr, replaceKeys) {
  return arr.map(item => {
    const newItem = {};
    Object.keys(item).forEach(key => {
      newItem[replaceKeys[key]] = item[[key]];
    });
    return newItem;
  });
};
//end of changeKeyObjects

//showButtons  selects and shows all "dropbtn" class buttons
function showButtons() {
	btn = document.getElementsByClassName("dropbtn"); 
	for(i = 0; i < btn.length; i++){
		if(btn[i].style.display = "none") {
		btn[i].style.display = "block";
		}
	};
}; //end of showButtons

//muni_county provides county designation for municiplaities (based oased on largest population for multi-county munis
function muni_county(muni){
var cty_n;
if(muni == '00760'){cty_n = '071'};
if(muni == '00925'){cty_n = '121'};
if(muni == '01090'){cty_n = '003'};
if(muni == '01530'){cty_n = '093'};
if(muni == '02355'){cty_n = '021'};
if(muni == '03235'){cty_n = '073'};
if(muni == '03455'){cty_n = '059'};
if(muni == '03620'){cty_n = '097'};
if(muni == '03950'){cty_n = '123'};
if(muni == '04000'){cty_n = '005'};
if(muni == '04110'){cty_n = '037'};
if(muni == '04935'){cty_n = '037'};
if(muni == '05265'){cty_n = '067'};
if(muni == '06090'){cty_n = '001'};
if(muni == '06255'){cty_n = '069'};
if(muni == '06530'){cty_n = '063'};
if(muni == '07025'){cty_n = '047'};
if(muni == '07190'){cty_n = '023'};
if(muni == '07410'){cty_n = '117'};
if(muni == '07571'){cty_n = '109'};
if(muni == '07795'){cty_n = '101'};
if(muni == '07850'){cty_n = '013'};
if(muni == '08070'){cty_n = '005'};
if(muni == '08345'){cty_n = '071'};
if(muni == '08400'){cty_n = '117'};
if(muni == '08675'){cty_n = '001'};
if(muni == '09115'){cty_n = '043'};
if(muni == '09280'){cty_n = '014'};
if(muni == '09555'){cty_n = '087'};
if(muni == '10105'){cty_n = '015'};
if(muni == '10600'){cty_n = '063'};
if(muni == '11260'){cty_n = '041'};
if(muni == '11645'){cty_n = '009'};
if(muni == '11810'){cty_n = '043'};
if(muni == '12045'){cty_n = '045'};
if(muni == '12080'){cty_n = '045'};
if(muni == '12387'){cty_n = '035'};
if(muni == '12415'){cty_n = '035'};
if(muni == '12635'){cty_n = '029'};
if(muni == '12815'){cty_n = '005'};
if(muni == '12855'){cty_n = '109'};
if(muni == '12910'){cty_n = '999'};
if(muni == '13460'){cty_n = '089'};
if(muni == '13845'){cty_n = '005'};
if(muni == '14175'){cty_n = '017'};
if(muni == '14765'){cty_n = '079'};
if(muni == '15330'){cty_n = '043'};
if(muni == '15550'){cty_n = '071'};
if(muni == '15605'){cty_n = '077'};
if(muni == '16000'){cty_n = '041'};
if(muni == '16385'){cty_n = '005'};
if(muni == '16495'){cty_n = '001'};
if(muni == '17375'){cty_n = '083'};
if(muni == '17760'){cty_n = '081'};
if(muni == '17925'){cty_n = '029'};
if(muni == '18310'){cty_n = '051'};
if(muni == '18420'){cty_n = '109'};
if(muni == '18530'){cty_n = '119'};
if(muni == '18640'){cty_n = '075'};
if(muni == '18750'){cty_n = '025'};
if(muni == '19080'){cty_n = '123'};
if(muni == '19355'){cty_n = '077'};
if(muni == '19630'){cty_n = '005'};
if(muni == '19795'){cty_n = '105'};
if(muni == '19850'){cty_n = '029'};
if(muni == '20000'){cty_n = '031'};
if(muni == '20440'){cty_n = '117'};
if(muni == '20495'){cty_n = '081'};
if(muni == '20770'){cty_n = '083'};
if(muni == '21265'){cty_n = '033'};
if(muni == '22035'){cty_n = '067'};
if(muni == '22145'){cty_n = '061'};
if(muni == '22200'){cty_n = '037'};
if(muni == '22860'){cty_n = '123'};
if(muni == '23025'){cty_n = '125'};
if(muni == '23135'){cty_n = '059'};
if(muni == '23740'){cty_n = '039'};
if(muni == '24620'){cty_n = '019'};
if(muni == '24785'){cty_n = '005'};
if(muni == '24950'){cty_n = '123'};
if(muni == '25115'){cty_n = '069'};
if(muni == '25280'){cty_n = '123'};
if(muni == '25610'){cty_n = '093'};
if(muni == '26270'){cty_n = '001'};
if(muni == '26600'){cty_n = '123'};
if(muni == '26765'){cty_n = '063'};
if(muni == '26875'){cty_n = '075'};
if(muni == '27040'){cty_n = '043'};
if(muni == '27425'){cty_n = '069'};
if(muni == '27700'){cty_n = '123'};
if(muni == '27810'){cty_n = '087'};
if(muni == '27865'){cty_n = '041'};
if(muni == '27975'){cty_n = '089'};
if(muni == '28105'){cty_n = '005'};
if(muni == '28305'){cty_n = '049'};
if(muni == '28360'){cty_n = '123'};
if(muni == '28690'){cty_n = '117'};
if(muni == '28745'){cty_n = '077'};
if(muni == '29185'){cty_n = '123'};
if(muni == '29680'){cty_n = '073'};
if(muni == '29735'){cty_n = '019'};
if(muni == '29955'){cty_n = '123'};
if(muni == '30340'){cty_n = '005'};
if(muni == '30780'){cty_n = '045'};
if(muni == '30835'){cty_n = '059'};
if(muni == '31550'){cty_n = '099'};
if(muni == '31605'){cty_n = '049'};
if(muni == '31660'){cty_n = '077'};
if(muni == '31715'){cty_n = '049'};
if(muni == '32155'){cty_n = '123'};
if(muni == '32650'){cty_n = '041'};
if(muni == '33035'){cty_n = '005'};
if(muni == '33310'){cty_n = '123'};
if(muni == '33640'){cty_n = '051'};
if(muni == '33695'){cty_n = '037'};
if(muni == '34520'){cty_n = '099'};
if(muni == '34740'){cty_n = '061'};
if(muni == '34960'){cty_n = '095'};
if(muni == '35070'){cty_n = '107'};
if(muni == '36610'){cty_n = '087'};
if(muni == '37215'){cty_n = '099'};
if(muni == '37270'){cty_n = '095'};
if(muni == '37380'){cty_n = '003'};
if(muni == '37545'){cty_n = '029'};
if(muni == '37600'){cty_n = '049'};
if(muni == '37820'){cty_n = '123'};
if(muni == '37875'){cty_n = '073'};
if(muni == '38370'){cty_n = '019'};
if(muni == '38535'){cty_n = '067'};
if(muni == '38590'){cty_n = '075'};
if(muni == '39195'){cty_n = '013'};
if(muni == '39855'){cty_n = '123'};
if(muni == '39965'){cty_n = '115'};
if(muni == '40185'){cty_n = '123'};
if(muni == '40515'){cty_n = '123'};
if(muni == '40570'){cty_n = '071'};
if(muni == '40790'){cty_n = '039'};
if(muni == '41010'){cty_n = '017'};
if(muni == '41560'){cty_n = '049'};
if(muni == '41835'){cty_n = '013'};
if(muni == '42055'){cty_n = '021'};
if(muni == '42110'){cty_n = '089'};
if(muni == '42330'){cty_n = '053'};
if(muni == '42495'){cty_n = '059'};
if(muni == '43000'){cty_n = '059'};
if(muni == '43110'){cty_n = '099'};
if(muni == '43550'){cty_n = '035'};
if(muni == '43605'){cty_n = '123'};
if(muni == '43660'){cty_n = '011'};
if(muni == '44100'){cty_n = '055'};
if(muni == '44320'){cty_n = '065'};
if(muni == '44980'){cty_n = '073'};
if(muni == '45255'){cty_n = '005'};
if(muni == '45530'){cty_n = '123'};
if(muni == '45695'){cty_n = '087'};
if(muni == '45955'){cty_n = '035'};
if(muni == '45970'){cty_n = '013'};
if(muni == '46355'){cty_n = '013'};
if(muni == '46465'){cty_n = '069'};
if(muni == '47070'){cty_n = '013'};
if(muni == '48060'){cty_n = '021'};
if(muni == '48115'){cty_n = '083'};
if(muni == '48445'){cty_n = '041'};
if(muni == '48500'){cty_n = '089'};
if(muni == '48555'){cty_n = '051'};
if(muni == '49600'){cty_n = '123'};
if(muni == '49875'){cty_n = '103'};
if(muni == '50040'){cty_n = '075'};
if(muni == '50480'){cty_n = '123'};
if(muni == '50920'){cty_n = '037'};
if(muni == '51250'){cty_n = '109'};
if(muni == '51635'){cty_n = '105'};
if(muni == '51690'){cty_n = '117'};
if(muni == '51745'){cty_n = '085'};
if(muni == '51800'){cty_n = '041'};
if(muni == '52075'){cty_n = '059'};
if(muni == '52350'){cty_n = '059'};
if(muni == '52550'){cty_n = '113'};
if(muni == '52570'){cty_n = '051'};
if(muni == '53120'){cty_n = '085'};
if(muni == '53175'){cty_n = '013'};
if(muni == '53395'){cty_n = '045'};
if(muni == '54330'){cty_n = '001'};
if(muni == '54880'){cty_n = '113'};
if(muni == '54935'){cty_n = '085'};
if(muni == '55045'){cty_n = '123'};
if(muni == '55155'){cty_n = '107'};
if(muni == '55540'){cty_n = '085'};
if(muni == '55705'){cty_n = '025'};
if(muni == '55870'){cty_n = '113'};
if(muni == '55980'){cty_n = '029'};
if(muni == '56145'){cty_n = '025'};
if(muni == '56365'){cty_n = '121'};
if(muni == '56420'){cty_n = '091'};
if(muni == '56475'){cty_n = '115'};
if(muni == '56860'){cty_n = '007'};
if(muni == '56970'){cty_n = '077'};
if(muni == '57025'){cty_n = '041'};
if(muni == '57245'){cty_n = '095'};
if(muni == '57300'){cty_n = '029'};
if(muni == '57400'){cty_n = '045'};
if(muni == '57630'){cty_n = '035'};
if(muni == '58235'){cty_n = '075'};
if(muni == '59005'){cty_n = '123'};
if(muni == '59830'){cty_n = '051'};
if(muni == '60160'){cty_n = '123'};
if(muni == '60600'){cty_n = '015'};
if(muni == '61315'){cty_n = '009'};
if(muni == '62000'){cty_n = '101'};
if(muni == '62660'){cty_n = '041'};
if(muni == '62880'){cty_n = '103'};
if(muni == '63045'){cty_n = '123'};
if(muni == '63265'){cty_n = '037'};
if(muni == '64090'){cty_n = '033'};
if(muni == '64200'){cty_n = '091'};
if(muni == '64255'){cty_n = '045'};
if(muni == '64970'){cty_n = '043'};
if(muni == '65190'){cty_n = '089'};
if(muni == '65740'){cty_n = '021'};
if(muni == '66895'){cty_n = '101'};
if(muni == '67005'){cty_n = '109'};
if(muni == '67280'){cty_n = '015'};
if(muni == '67830'){cty_n = '021'};
if(muni == '68105'){cty_n = '023'};
if(muni == '68655'){cty_n = '113'};
if(muni == '68930'){cty_n = '115'};
if(muni == '69040'){cty_n = '063'};
if(muni == '69150'){cty_n = '123'};
if(muni == '69645'){cty_n = '005'};
if(muni == '69700'){cty_n = '061'};
if(muni == '70195'){cty_n = '045'};
if(muni == '70250'){cty_n = '027'};
if(muni == '70360'){cty_n = '019'};
if(muni == '70525'){cty_n = '117'};
if(muni == '70580'){cty_n = '111'};
if(muni == '70635'){cty_n = '039'};
if(muni == '71755'){cty_n = '097'};
if(muni == '72395'){cty_n = '105'};
if(muni == '73330'){cty_n = '009'};
if(muni == '73715'){cty_n = '071'};
if(muni == '73825'){cty_n = '107'};
if(muni == '73935'){cty_n = '075'};
if(muni == '74485'){cty_n = '063'};
if(muni == '74815'){cty_n = '025'};
if(muni == '75640'){cty_n = '013'};
if(muni == '75970'){cty_n = '089'};
if(muni == '76795'){cty_n = '113'};
if(muni == '77290'){cty_n = '001'};
if(muni == '77510'){cty_n = '069'};
if(muni == '78610'){cty_n = '071'};
if(muni == '79270'){cty_n = '009'};
if(muni == '80040'){cty_n = '037'};
if(muni == '80865'){cty_n = '119'};
if(muni == '81030'){cty_n = '009'};
if(muni == '81690'){cty_n = '063'};
if(muni == '82130'){cty_n = '057'};
if(muni == '82350'){cty_n = '055'};
if(muni == '82460'){cty_n = '009'};
if(muni == '82735'){cty_n = '013'};
if(muni == '83230'){cty_n = '069'};
if(muni == '83450'){cty_n = '027'};
if(muni == '83835'){cty_n = '001'};
if(muni == '84440'){cty_n = '059'};
if(muni == '84770'){cty_n = '087'};
if(muni == '85045'){cty_n = '099'};
if(muni == '85155'){cty_n = '043'};
if(muni == '85485'){cty_n = '123'};
if(muni == '85705'){cty_n = '049'};
if(muni == '86090'){cty_n = '119'};
if(muni == '86310'){cty_n = '125'};
if(muni == '86475'){cty_n = '107'};
if(muni == '86750'){cty_n = '125'};
return cty_n;
} //end of muni_county
   
//cdp_county returns county code for cdp
function cdp_county(cdp) {
	if(cdp == '06172'){cty = '001'};
if(cdp == '20275'){cty = '001'};
if(cdp == '54750'){cty = '001'};
if(cdp == '69480'){cty = '001'};
if(cdp == '69810'){cty = '001'};
if(cdp == '77757'){cty = '001'};
if(cdp == '79100'){cty = '001'};
if(cdp == '83120'){cty = '001'};
if(cdp == '74375'){cty = '001'};
if(cdp == '82905'){cty = '001'};
if(cdp == '01145'){cty = '003'};
if(cdp == '00620'){cty = '005'};
if(cdp == '08530'){cty = '005'};
if(cdp == '10985'){cty = '005'};
if(cdp == '13590'){cty = '005'};
if(cdp == '16465'){cty = '005'};
if(cdp == '21330'){cty = '005'};
if(cdp == '37220'){cty = '005'};
if(cdp == '38910'){cty = '005'};
if(cdp == '58510'){cty = '005'};
if(cdp == '16110'){cty = '005'};
if(cdp == '02905'){cty = '007'};
if(cdp == '34685'){cty = '011'};
if(cdp == '01420'){cty = '013'};
if(cdp == '01740'){cty = '013'};
if(cdp == '04620'){cty = '013'};
if(cdp == '07580'){cty = '013'};
if(cdp == '18585'){cty = '013'};
if(cdp == '23575'){cty = '013'};
if(cdp == '23630'){cty = '013'};
if(cdp == '30350'){cty = '013'};
if(cdp == '30945'){cty = '013'};
if(cdp == '33502'){cty = '013'};
if(cdp == '35860'){cty = '013'};
if(cdp == '44270'){cty = '013'};
if(cdp == '44695'){cty = '013'};
if(cdp == '52210'){cty = '013'};
if(cdp == '53780'){cty = '013'};
if(cdp == '57445'){cty = '013'};
if(cdp == '59240'){cty = '013'};
if(cdp == '67040'){cty = '013'};
if(cdp == '69110'){cty = '013'};
if(cdp == '74980'){cty = '013'};
if(cdp == '75585'){cty = '013'};
if(cdp == '76325'){cty = '013'};
if(cdp == '80370'){cty = '013'};
if(cdp == '15302'){cty = '013'};
if(cdp == '29295'){cty = '015'};
if(cdp == '39800'){cty = '015'};
if(cdp == '49490'){cty = '015'};
if(cdp == '71625'){cty = '015'};
if(cdp == '21390'){cty = '019'};
if(cdp == '27175'){cty = '019'};
if(cdp == '67142'){cty = '019'};
if(cdp == '79785'){cty = '019'};
if(cdp == '11975'){cty = '021'};
if(cdp == '16715'){cty = '021'};
if(cdp == '27535'){cty = '023'};
if(cdp == '67500'){cty = '023'};
if(cdp == '00320'){cty = '035'};
if(cdp == '12387'){cty = '035'};
if(cdp == '28250'){cty = '035'};
if(cdp == '31935'){cty = '035'};
if(cdp == '36410'){cty = '035'};
if(cdp == '46410'){cty = '035'};
if(cdp == '50012'){cty = '035'};
if(cdp == '58592'){cty = '035'};
if(cdp == '66197'){cty = '035'};
if(cdp == '68875'){cty = '035'};
if(cdp == '74080'){cty = '035'};
if(cdp == '77235'){cty = '035'};
if(cdp == '83500'){cty = '035'};
if(cdp == '21155'){cty = '037'};
if(cdp == '23300'){cty = '037'};
if(cdp == '23795'){cty = '037'};
if(cdp == '28830'){cty = '037'};
if(cdp == '47345'){cty = '037'};
if(cdp == '85760'){cty = '037'};
if(cdp == '00870'){cty = '041'};
if(cdp == '06970'){cty = '041'};
if(cdp == '12325'){cty = '041'};
if(cdp == '14587'){cty = '041'};
if(cdp == '24235'){cty = '041'};
if(cdp == '27370'){cty = '041'};
if(cdp == '30420'){cty = '041'};
if(cdp == '58675'){cty = '041'};
if(cdp == '64870'){cty = '041'};
if(cdp == '68847'){cty = '041'};
if(cdp == '74430'){cty = '041'};
if(cdp == '86117'){cty = '041'};
if(cdp == '23520'){cty = '039'};
if(cdp == '60655'){cty = '039'};
if(cdp == '15440'){cty = '043'};
if(cdp == '17485'){cty = '043'};
if(cdp == '37655'){cty = '043'};
if(cdp == '45145'){cty = '043'};
if(cdp == '58400'){cty = '043'};
if(cdp == '05120'){cty = '045'};
if(cdp == '12460'){cty = '045'};
if(cdp == '12470'){cty = '045'};
if(cdp == '12945'){cty = '045'};
if(cdp == '52820'){cty = '045'};
if(cdp == '53875'){cty = '045'};
if(cdp == '65685'){cty = '047'};
if(cdp == '57850'){cty = '049'};
if(cdp == '76190'){cty = '049'};
if(cdp == '12450'){cty = '053'};
if(cdp == '58960'){cty = '053'};
if(cdp == '02575'){cty = '059'};
if(cdp == '03730'){cty = '059'};
if(cdp == '19150'){cty = '059'};
if(cdp == '22575'){cty = '059'};
if(cdp == '25390'){cty = '059'};
if(cdp == '25550'){cty = '059'};
if(cdp == '29625'){cty = '059'};
if(cdp == '38480'){cty = '059'};
if(cdp == '38810'){cty = '059'};
if(cdp == '40377'){cty = '059'};
if(cdp == '41065'){cty = '059'};
if(cdp == '84042'){cty = '059'};
if(cdp == '08290'){cty = '061'};
if(cdp == '78335'){cty = '061'};
if(cdp == '72320'){cty = '067'};
if(cdp == '44375'){cty = '065'};
if(cdp == '79105'){cty = '065'};
if(cdp == '43220'){cty = '069'};
if(cdp == '63320'){cty = '069'};
if(cdp == '24290'){cty = '071'};
if(cdp == '36940'){cty = '071'};
if(cdp == '39250'){cty = '071'};
if(cdp == '47015'){cty = '071'};
if(cdp == '68985'){cty = '071'};
if(cdp == '74275'){cty = '071'};
if(cdp == '80095'){cty = '071'};
if(cdp == '84000'){cty = '071'};
if(cdp == '03840'){cty = '075'};
if(cdp == '56695'){cty = '075'};
if(cdp == '15165'){cty = '077'};
if(cdp == '28800'){cty = '077'};
if(cdp == '45750'){cty = '077'};
if(cdp == '56035'){cty = '077'};
if(cdp == '63375'){cty = '077'};
if(cdp == '49325'){cty = '081'};
if(cdp == '44595'){cty = '083'};
if(cdp == '78280'){cty = '083'};
if(cdp == '63705'){cty = '085'};
if(cdp == '07420'){cty = '087'};
if(cdp == '39160'){cty = '087'};
if(cdp == '51975'){cty = '087'};
if(cdp == '55925'){cty = '087'};
if(cdp == '66995'){cty = '087'};
if(cdp == '71790'){cty = '087'};
if(cdp == '78345'){cty = '087'};
if(cdp == '83175'){cty = '087'};
if(cdp == '42165'){cty = '089'};
if(cdp == '54495'){cty = '089'};
if(cdp == '15825'){cty = '091'};
if(cdp == '45680'){cty = '091'};
if(cdp == '60765'){cty = '091'};
if(cdp == '33420'){cty = '093'};
if(cdp == '01915'){cty = '095'};
if(cdp == '53945'){cty = '097'};
if(cdp == '63650'){cty = '097'};
if(cdp == '86200'){cty = '097'};
if(cdp == '04165'){cty = '101'};
if(cdp == '06602'){cty = '101'};
if(cdp == '07245'){cty = '101'};
if(cdp == '15935'){cty = '101'};
if(cdp == '62220'){cty = '101'};
if(cdp == '67445'){cty = '101'};
if(cdp == '81305'){cty = '101'};
if(cdp == '01640'){cty = '105'};
if(cdp == '29845'){cty = '105'};
if(cdp == '58758'){cty = '107'};
if(cdp == '17150'){cty = '117'};
if(cdp == '35400'){cty = '117'};
if(cdp == '40550'){cty = '117'};
if(cdp == '20605'){cty = '119'};
if(cdp == '27095'){cty = '119'};
if(cdp == '30890'){cty = '119'};
if(cdp == '50380'){cty = '119'};
if(cdp == '03015'){cty = '123'};
if(cdp == '38425'){cty = '125'};
if(cdp == '39745'){cty = '125'};
if(cdp == '40900'){cty = '125'};
if(cdp == '42000'){cty = '125'};
if(cdp == '80755'){cty = '125'};
return cty;
} //end of cdp_county				  


//RegionNum takes the names of selected regions and returns a list of region numbers
function RegionNum(nam) {
var regionNum = 0;
if(nam == 'Central Mountains') {regionNum = 1};
if(nam == 'Eastern Plains') {regionNum = 2};
if(nam == 'Front Range') {regionNum = 3};
if(nam == 'San Luis Valley') {regionNum = 4};
if(nam == 'Western Slope') {regionNum = 5};
if(nam == 'Region 1: Northern Eastern Plains') {regionNum = 6};
if(nam == 'Region 2: Northern Front Range') {regionNum = 7};
if(nam == 'Region 3: Denver Metropolitan Area') {regionNum = 8};
if(nam == 'Region 4: Southern Front Range') {regionNum = 9};
if(nam == 'Region 5: Central Eastern Plains') {regionNum = 10};
if(nam == 'Region 6: Southern Eastern Plains') {regionNum = 11};
if(nam == 'Region 7: Pueblo County') {regionNum = 12};
if(nam == 'Region 8: San Juan Valley') {regionNum = 13};
if(nam == 'Region 9: Southern Western Slope') {regionNum = 14};
if(nam == 'Region 10: Central Western Slope') {regionNum = 15};
if(nam == 'Region 11: Northern Western Slope') {regionNum = 16};
if(nam == 'Region 12: Northern Mountains') {regionNum = 17};
if(nam == 'Region 13: Central Mountains') {regionNum = 18};
if(nam == 'Region 14: Southern Mountains') {regionNum = 19};
if(nam == 'Boulder') {regionNum = 20};
if(nam == 'Colorado Springs') {regionNum = 21};
if(nam == 'Denver-Aurora-Lakewood') {regionNum = 22};
if(nam == 'Fort Collins') {regionNum = 23};
if(nam == 'Grand Junction') {regionNum = 24};
if(nam == 'Greeley') {regionNum = 25};
if(nam == 'Pueblo') {regionNum = 26};
if(nam == 'Breckenridge') {regionNum = 27};
if(nam == 'Ca\u00f1on City') {regionNum = 28};
if(nam == 'Craig') {regionNum = 29};
if(nam == 'Durango') {regionNum = 30};
if(nam == 'Edwards') {regionNum = 31};
if(nam == 'Fort Morgan') {regionNum = 32};
if(nam == 'Glenwood Springs') {regionNum = 33};
if(nam == 'Montrose') {regionNum = 34};
if(nam == 'Steamboat Springs') {regionNum = 35};
if(nam == 'Sterling') {regionNum = 36};
if(nam == 'Denver PMSA') {regionNum = 37};
if(nam == 'Denver-Boulder Metro Area') {regionNum = 38};
if(nam == 'Denver-Boulder-Greely CMSA') {regionNum = 39};

return(regionNum);
}; //End of RegionNum

//RegionName takes the region number and returns the name
function regionName(reg) {
if(reg == 1) {name =  'Central Mountains'};
if(reg == 2) {name =  'Eastern Plains'};
if(reg == 3) {name =  'Front Range'};
if(reg == 4) {name =  'San Luis Valley'};
if(reg == 5) {name =  'Western Slope'};
if(reg == 6) {name = 'Region 1: Northern Eastern Plains'};
if(reg == 7) {name = 'Region 2: Northern Front Range'};
if(reg == 8) {name = 'Region 3: Denver Metropolitan Area'};
if(reg == 9) {name = 'Region 4: Southern Front Range'};
if(reg == 10) {name = 'Region 5: Central Eastern Plains'};
if(reg == 11) {name = 'Region 6: Southern Eastern Plains'};
if(reg == 12) {name = 'Region 7: Pueblo County'};
if(reg == 13) {name = 'Region 8: San Juan Valley'};
if(reg == 14) {name = 'Region 9: Southern Western Slope'};
if(reg == 15) {name = 'Region 10: Central Western Slope'};
if(reg == 16) {name = 'Region 11: Northern Western Slope'};
if(reg == 17) {name = 'Region 12: Northern Mountains'};
if(reg == 18) {name = 'Region 13: Central Mountains'};
if(reg == 19) {name = 'Region 14: Southern Mountains'};
if(reg == 20) {name =  'Boulder'};
if(reg == 21) {name =  'Colorado Springs'};
if(reg == 22) {name =  'Denver-Aurora-Lakewood'};
if(reg == 23) {name =  'Fort Collins'};
if(reg == 24) {name =  'Grand Junction'};
if(reg == 25) {name =  'Greeley'};
if(reg == 26) {name =  'Pueblo'};
if(reg == 27) {name =  'Breckenridge'};
if(reg == 28) {name =  'Ca\u00f1on City'};
if(reg == 29) {name =  'Craig'};
if(reg == 30) {name =  'Durango'};
if(reg == 31) {name =  'Edwards'};
if(reg == 32) {name =  'Fort Morgan'};
if(reg == 33) {name =  'Glenwood Springs'};
if(reg == 34) {name = 'Montrose'};
if(reg == 35) {name =  'Steamboat Springs'};
if(reg == 36) {name =  'Sterling'};
if(reg == 37) {name =  'Denver PMSA'};
if(reg == 38) {name =  'Denver-Boulder Metro Area'};
if(reg == 39) {name =  'Denver-Boulder-Greely CMSA'};
return name;
}; //End of Regionname


//countyName  Returns a county name from the fips code
function countyName(cty){
	if(cty == 0) {name = "Colorado"};
	if(cty == 1){name = 'Adams County'};
	if(cty == 3){name = 'Alamosa County'};
	if(cty == 5){name = 'Arapahoe County'};
	if(cty == 7){name = 'Archuleta County'};
	if(cty == 9){name = 'Baca County'};
	if(cty == 11){name = 'Bent County'};
	if(cty == 13){name = 'Boulder County'};
	if(cty == 14){name = 'Broomfield County'};
	if(cty == 15){name = 'Chaffee County'};
	if(cty == 17){name = 'Cheyenne County'};
	if(cty == 19){name = 'Clear Creek County'};
	if(cty == 21){name = 'Conejos County'};
	if(cty == 23){name = 'Costilla County'};
	if(cty == 25){name = 'Crowley County'};
	if(cty == 27){name = 'Custer County'};
	if(cty == 29){name = 'Delta County'};
	if(cty == 31){name = 'Denver County'};
	if(cty == 33){name = 'Dolores County'};
	if(cty == 35){name = 'Douglas County'};
	if(cty == 37){name = 'Eagle County'};
	if(cty == 39){name = 'Elbert County'};
	if(cty == 41){name = 'El Paso County'};
	if(cty == 43){name = 'Fremont County'};
	if(cty == 45){name = 'Garfield County'};
	if(cty == 47){name = 'Gilpin County'};
	if(cty == 49){name = 'Grand County'};
	if(cty == 51){name = 'Gunnison County'};
	if(cty == 53){name = 'Hinsdale County'};
	if(cty == 55){name = 'Huerfano County'};
	if(cty == 57){name = 'Jackson County'};
	if(cty == 59){name = 'Jefferson County'};
	if(cty == 61){name = 'Kiowa County'};
	if(cty == 63){name = 'Kit Carson County'};
	if(cty == 65){name = 'Lake County'};
	if(cty == 67){name = 'La Plata County'};
	if(cty == 69){name = 'Larimer County'};
	if(cty == 71){name = 'Las Animas County'};
	if(cty == 73){name = 'Lincoln County'};
	if(cty == 75){name = 'Logan County'};
	if(cty == 77){name = 'Mesa County'};
	if(cty == 79){name = 'Mineral County'};
	if(cty == 81){name = 'Moffat County'};
	if(cty == 83){name = 'Montezuma County'};
	if(cty == 85){name = 'Montrose County'};
	if(cty == 87){name = 'Morgan County'};
	if(cty == 89){name = 'Otero County'};
	if(cty == 91){name = 'Ouray County'};
	if(cty == 93){name = 'Park County'};
	if(cty == 95){name = 'Phillips County'};
	if(cty == 97){name = 'Pitkin County'};
	if(cty == 99){name = 'Prowers County'};
	if(cty == 101){name = 'Pueblo County'};
	if(cty == 103){name = 'Rio Blanco County'};
	if(cty == 105){name = 'Rio Grande County'};
	if(cty == 107){name = 'Routt County'};
	if(cty == 109){name = 'Saguache County'};
	if(cty == 111){name = 'San Juan County'};
	if(cty == 113){name = 'San Miguel County'};
	if(cty == 115){name = 'Sedgwick County'};
	if(cty == 117){name = 'Summit County'};
	if(cty == 119){name = 'Teller County'};
	if(cty == 121){name = 'Washington County'};
	if(cty == 123){name = 'Weld County'};
	if(cty == 125){name = 'Yuma County'};
return name;
}; //end of countyName

//muniName Returns Municipality name from FIPS code
function muniName(muni){
	var name;
	if(muni == 0) {name = 'Colorado'};
	if(muni == 760){name = 'Aguilar'};
	if(muni == 925){name = 'Akron'};
	if(muni == 1090){name = 'Alamosa'};
	if(muni == 1530){name = 'Alma'};
	if(muni == 2355){name = 'Antonito'};
	if(muni == 3235){name = 'Arriba'};
	if(muni == 3455){name = 'Arvada'};
	if(muni == 3620){name = 'Aspen'};
	if(muni == 3950){name = 'Ault'};
	if(muni == 4000){name = 'Aurora'};
	if(muni == 4110){name = 'Avon'};
	if(muni == 4935){name = 'Basalt'};
	if(muni == 5265){name = 'Bayfield'};
	if(muni == 6090){name = 'Bennett'};
	if(muni == 6255){name = 'Berthoud'};
	if(muni == 6530){name = 'Bethune'};
	if(muni == 7025){name = 'Black Hawk'};
	if(muni == 7190){name = 'Blanca'};
	if(muni == 7410){name = 'Blue River'};
	if(muni == 7571){name = 'Bonanza'};
	if(muni == 7795){name = 'Boone'};
	if(muni == 7850){name = 'Boulder'};
	if(muni == 8070){name = 'Bow Mar'};
	if(muni == 8345){name = 'Branson'};
	if(muni == 8400){name = 'Breckenridge'};
	if(muni == 8675){name = 'Brighton'};
	if(muni == 9115){name = 'Brookside'};
	if(muni == 9280){name = 'Broomfield'};
	if(muni == 9555){name = 'Brush'};
	if(muni == 10105){name = 'Buena Vista'};
	if(muni == 10600){name = 'Burlington'};
	if(muni == 11260){name = 'Calhan'};
	if(muni == 11645){name = 'Campo'};
	if(muni == 11810){name = 'Cañon City'};
	if(muni == 12045){name = 'Carbondale'};
	if(muni == 12390){name = 'Castle Pines North'};
	if(muni == 12415){name = 'Castle Rock'};
	if(muni == 12635){name = 'Cedaredge'};
	if(muni == 12815){name = 'Centennial'};
	if(muni == 12855){name = 'Center'};
	if(muni == 12910){name = 'Central City'};
	if(muni == 13460){name = 'Cheraw'};
	if(muni == 13845){name = 'Cherry Hills Village'};
	if(muni == 14175){name = 'Cheyenne Wells'};
	if(muni == 14765){name = 'City of Creede'};
	if(muni == 15330){name = 'Coal Creek'};
	if(muni == 15550){name = 'Cokedale'};
	if(muni == 15605){name = 'Collbran'};
	if(muni == 16000){name = 'Colorado Springs'};
	if(muni == 16385){name = 'Columbine Valley'};
	if(muni == 16495){name = 'Commerce City'};
	if(muni == 17375){name = 'Cortez'};
	if(muni == 17760){name = 'Craig'};
	if(muni == 17925){name = 'Crawford'};
	if(muni == 18310){name = 'Crested Butte'};
	if(muni == 18420){name = 'Crestone'};
	if(muni == 18530){name = 'Cripple Creek'};
	if(muni == 18640){name = 'Crook'};
	if(muni == 18750){name = 'Crowley'};
	if(muni == 19080){name = 'Dacono'};
	if(muni == 19355){name = 'De Beque'};
	if(muni == 19630){name = 'Deer Trail'};
	if(muni == 19795){name = 'Del Norte'};
	if(muni == 19850){name = 'Delta'};
	if(muni == 20000){name = 'Denver'};
	if(muni == 20440){name = 'Dillon'};
	if(muni == 20495){name = 'Dinosaur'};
	if(muni == 20770){name = 'Dolores'};
	if(muni == 21265){name = 'Dove Creek'};
	if(muni == 22035){name = 'Durango'};
	if(muni == 22145){name = 'Eads'};
	if(muni == 22200){name = 'Eagle'};
	if(muni == 22860){name = 'Eaton'};
	if(muni == 23025){name = 'Eckley'};
	if(muni == 23135){name = 'Edgewater'};
	if(muni == 23740){name = 'Elizabeth'};
	if(muni == 24620){name = 'Empire'};
	if(muni == 24785){name = 'Englewood'};
	if(muni == 24950){name = 'Erie'};
	if(muni == 25115){name = 'Estes Park'};
	if(muni == 25280){name = 'Evans'};
	if(muni == 25610){name = 'Fairplay'};
	if(muni == 26270){name = 'Federal Heights'};
	if(muni == 26600){name = 'Firestone'};
	if(muni == 26765){name = 'Flagler'};
	if(muni == 26875){name = 'Fleming'};
	if(muni == 27040){name = 'Florence'};
	if(muni == 27425){name = 'Fort Collins'};
	if(muni == 27700){name = 'Fort Lupton'};
	if(muni == 27810){name = 'Fort Morgan'};
	if(muni == 27865){name = 'Fountain'};
	if(muni == 27975){name = 'Fowler'};
	if(muni == 28105){name = 'Foxfield'};
	if(muni == 28305){name = 'Fraser'};
	if(muni == 28360){name = 'Frederick'};
	if(muni == 28690){name = 'Frisco'};
	if(muni == 28745){name = 'Fruita'};
	if(muni == 29185){name = 'Garden City'};
	if(muni == 29680){name = 'Genoa'};
	if(muni == 29735){name = 'Georgetown'};
	if(muni == 29955){name = 'Gilcrest'};
	if(muni == 30340){name = 'Glendale'};
	if(muni == 30780){name = 'Glenwood Springs'};
	if(muni == 30835){name = 'Golden'};
	if(muni == 31550){name = 'Granada'};
	if(muni == 31605){name = 'Granby'};
	if(muni == 31660){name = 'Grand Junction'};
	if(muni == 31715){name = 'Grand Lake'};
	if(muni == 32155){name = 'Greeley'};
	if(muni == 32650){name = 'Green Mountain Falls'};
	if(muni == 33035){name = 'Greenwood Village'};
	if(muni == 33310){name = 'Grover'};
	if(muni == 33640){name = 'Gunnison'};
	if(muni == 33695){name = 'Gypsum'};
	if(muni == 34520){name = 'Hartman'};
	if(muni == 34740){name = 'Haswell'};
	if(muni == 34960){name = 'Haxtun'};
	if(muni == 35070){name = 'Hayden'};
	if(muni == 36610){name = 'Hillrose'};
	if(muni == 37215){name = 'Holly'};
	if(muni == 37270){name = 'Holyoke'};
	if(muni == 37380){name = 'Hooper'};
	if(muni == 37545){name = 'Hotchkiss'};
	if(muni == 37600){name = 'Hot Sulphur Springs'};
	if(muni == 37820){name = 'Hudson'};
	if(muni == 37875){name = 'Hugo'};
	if(muni == 38370){name = 'Idaho Springs'};
	if(muni == 38535){name = 'Ignacio'};
	if(muni == 38590){name = 'Iliff'};
	if(muni == 39195){name = 'Jamestown'};
	if(muni == 39855){name = 'Johnstown'};
	if(muni == 39965){name = 'Julesburg'};
	if(muni == 40185){name = 'Keenesburg'};
	if(muni == 40515){name = 'Kersey'};
	if(muni == 40570){name = 'Kim'};
	if(muni == 40790){name = 'Kiowa'};
	if(muni == 41010){name = 'Kit Carson'};
	if(muni == 41560){name = 'Kremmling'};
	if(muni == 41835){name = 'Lafayette'};
	if(muni == 42055){name = 'La Jara'};
	if(muni == 42110){name = 'La Junta'};
	if(muni == 42330){name = 'Lake City'};
	if(muni == 42495){name = 'Lakeside'};
	if(muni == 43000){name = 'Lakewood'};
	if(muni == 43110){name = 'Lamar'};
	if(muni == 43550){name = 'Larkspur'};
	if(muni == 43605){name = 'La Salle'};
	if(muni == 43660){name = 'Las Animas'};
	if(muni == 44100){name = 'La Veta'};
	if(muni == 44320){name = 'Leadville'};
	if(muni == 44980){name = 'Limon'};
	if(muni == 45255){name = 'Littleton'};
	if(muni == 45530){name = 'Lochbuie'};
	if(muni == 45695){name = 'Log Lane Village'};
	if(muni == 45955){name = 'Lone Tree'};
	if(muni == 45970){name = 'Longmont'};
	if(muni == 46355){name = 'Louisville'};
	if(muni == 46465){name = 'Loveland'};
	if(muni == 47070){name = 'Lyons'};
	if(muni == 48060){name = 'Manassa'};
	if(muni == 48115){name = 'Mancos'};
	if(muni == 48445){name = 'Manitou Springs'};
	if(muni == 48500){name = 'Manzanola'};
	if(muni == 48555){name = 'Marble'};
	if(muni == 49600){name = 'Mead'};
	if(muni == 49875){name = 'Meeker'};
	if(muni == 50040){name = 'Merino'};
	if(muni == 50480){name = 'Milliken'};
	if(muni == 50920){name = 'Minturn'};
	if(muni == 51250){name = 'Moffat'};
	if(muni == 51635){name = 'Monte Vista'};
	if(muni == 51690){name = 'Montezuma'};
	if(muni == 51745){name = 'Montrose'};
	if(muni == 51800){name = 'Monument'};
	if(muni == 52075){name = 'Morrison'};
	if(muni == 52350){name = 'Mountain View'};
	if(muni == 52550){name = 'Mountain Village'};
	if(muni == 52570){name = 'Mount Crested Butte'};
	if(muni == 53120){name = 'Naturita'};
	if(muni == 53175){name = 'Nederland'};
	if(muni == 53395){name = 'New Castle'};
	if(muni == 54330){name = 'Northglenn'};
	if(muni == 54880){name = 'Norwood'};
	if(muni == 54935){name = 'Nucla'};
	if(muni == 55045){name = 'Nunn'};
	if(muni == 55155){name = 'Oak Creek'};
	if(muni == 55540){name = 'Olathe'};
	if(muni == 55705){name = 'Olney Springs'};
	if(muni == 55870){name = 'Ophir'};
	if(muni == 55980){name = 'Orchard City'};
	if(muni == 56145){name = 'Ordway'};
	if(muni == 56365){name = 'Otis'};
	if(muni == 56420){name = 'Ouray'};
	if(muni == 56475){name = 'Ovid'};
	if(muni == 56860){name = 'Pagosa Springs'};
	if(muni == 56970){name = 'Palisade'};
	if(muni == 57025){name = 'Palmer Lake'};
	if(muni == 57245){name = 'Paoli'};
	if(muni == 57300){name = 'Paonia'};
	if(muni == 57400){name = 'Parachute'};
	if(muni == 57630){name = 'Parker'};
	if(muni == 58235){name = 'Peetz'};
	if(muni == 59005){name = 'Pierce'};
	if(muni == 59830){name = 'Pitkin'};
	if(muni == 60160){name = 'Platteville'};
	if(muni == 60600){name = 'Poncha Springs'};
	if(muni == 61315){name = 'Pritchett'};
	if(muni == 62000){name = 'Pueblo'};
	if(muni == 62660){name = 'Ramah'};
	if(muni == 62880){name = 'Rangely'};
	if(muni == 63045){name = 'Raymer (New Raymer)'};
	if(muni == 63265){name = 'Red Cliff'};
	if(muni == 64090){name = 'Rico'};
	if(muni == 64200){name = 'Ridgway'};
	if(muni == 64255){name = 'Rifle'};
	if(muni == 64970){name = 'Rockvale'};
	if(muni == 65190){name = 'Rocky Ford'};
	if(muni == 65740){name = 'Romeo'};
	if(muni == 66895){name = 'Rye'};
	if(muni == 67005){name = 'Saguache'};
	if(muni == 67280){name = 'Salida'};
	if(muni == 67830){name = 'Sanford'};
	if(muni == 68105){name = 'San Luis'};
	if(muni == 68655){name = 'Sawpit'};
	if(muni == 68930){name = 'Sedgwick'};
	if(muni == 69040){name = 'Seibert'};
	if(muni == 69150){name = 'Severance'};
	if(muni == 69645){name = 'Sheridan'};
	if(muni == 69700){name = 'Sheridan Lake'};
	if(muni == 70195){name = 'Silt'};
	if(muni == 70250){name = 'Silver Cliff'};
	if(muni == 70360){name = 'Silver Plume'};
	if(muni == 70525){name = 'Silverthorne'};
	if(muni == 70580){name = 'Silverton'};
	if(muni == 70635){name = 'Simla'};
	if(muni == 71755){name = 'Snowmass Village'};
	if(muni == 72395){name = 'South Fork'};
	if(muni == 73330){name = 'Springfield'};
	if(muni == 73715){name = 'Starkville'};
	if(muni == 73825){name = 'Steamboat Springs'};
	if(muni == 73935){name = 'Sterling'};
	if(muni == 74485){name = 'Stratton'};
	if(muni == 74815){name = 'Sugar City'};
	if(muni == 75640){name = 'Superior'};
	if(muni == 75970){name = 'Swink'};
	if(muni == 76795){name = 'Telluride'};
	if(muni == 77290){name = 'Thornton'};
	if(muni == 77510){name = 'Timnath'};
	if(muni == 78610){name = 'Trinidad'};
	if(muni == 79270){name = 'Two Buttes'};
	if(muni == 80040){name = 'Vail'};
	if(muni == 80865){name = 'Victor'};
	if(muni == 81030){name = 'Vilas'};
	if(muni == 81690){name = 'Vona'};
	if(muni == 82130){name = 'Walden'};
	if(muni == 82350){name = 'Walsenburg'};
	if(muni == 82460){name = 'Walsh'};
	if(muni == 82735){name = 'Ward'};
	if(muni == 83230){name = 'Wellington'};
	if(muni == 83450){name = 'Westcliffe'};
	if(muni == 83835){name = 'Westminster'};
	if(muni == 84440){name = 'Wheat Ridge'};
	if(muni == 84770){name = 'Wiggins'};
	if(muni == 85045){name = 'Wiley'};
	if(muni == 85155){name = 'Williamsburg'};
	if(muni == 85485){name = 'Windsor'};
	if(muni == 85705){name = 'Winter Park'};
	if(muni == 86090){name = 'Woodland Park'};
	if(muni == 86310){name = 'Wray'};
	if(muni == 86475){name = 'Yampa'};
	if(muni == 86750){name = 'Yuma'};
return name;
};  //end of muniName

//cdpName returns CDP Name from fips code
function cdpName(cdp){
	var name;
	if(cdp == 0) {name = 'Colorado'};
	if(cdp == 320){name = 'Acres Green CDP'};
	if(cdp == 620){name = 'Aetna Estates CDP'};
	if(cdp == 870){name = 'Air Force Academy CDP'};
	if(cdp == 1145){name = 'Alamosa East CDP'};
	if(cdp == 1420){name = 'Allenspark CDP'};
	if(cdp == 1640){name = 'Alpine CDP'};
	if(cdp == 1740){name = 'Altona CDP'};
	if(cdp == 1915){name = 'Amherst CDP'};
	if(cdp == 2575){name = 'Applewood CDP'};
	if(cdp == 2905){name = 'Arboles CDP'};
	if(cdp == 3015){name = 'Aristocrat Ranchettes CDP'};
	if(cdp == 3730){name = 'Aspen Park CDP'};
	if(cdp == 3840){name = 'Atwood CDP'};
	if(cdp == 4165){name = 'Avondale CDP'};
	if(cdp == 4620){name = 'Bark Ranch CDP'};
	if(cdp == 5120){name = 'Battlement Mesa CDP'};
	if(cdp == 6172){name = 'Berkley CDP'};
	if(cdp == 6602){name = 'Beulah Valley CDP'};
	if(cdp == 6970){name = 'Black Forest CDP'};
	if(cdp == 7245){name = 'Blende CDP'};
	if(cdp == 7420){name = 'Blue Sky CDP'};
	if(cdp == 7580){name = 'Bonanza Mountain Estates CDP'};
	if(cdp == 8290){name = 'Brandon CDP'};
	if(cdp == 8530){name = 'Brick Center CDP'};
	if(cdp == 10985){name = 'Byers CDP'};
	if(cdp == 11975){name = 'Capulin CDP'};
	if(cdp == 12325){name = 'Cascade-Chipita Park CDP'};
	if(cdp == 12387){name = 'Castle Pines CDP'};
	if(cdp == 12450){name = 'Cathedral CDP'};
	if(cdp == 12460){name = 'Catherine CDP'};
	if(cdp == 12470){name = 'Cattle Creek CDP'};
	if(cdp == 12945){name = 'Chacra CDP'};
	if(cdp == 13590){name = 'Cherry Creek CDP'};
	if(cdp == 14587){name = 'Cimarron Hills CDP'};
	if(cdp == 15165){name = 'Clifton CDP'};
	if(cdp == 15302){name = 'Coal Creek CDP'};
	if(cdp == 15440){name = 'Coaldale CDP'};
	if(cdp == 15825){name = 'Colona CDP'};
	if(cdp == 15935){name = 'Colorado City CDP'};
	if(cdp == 16110){name = 'Columbine CDP'};
	if(cdp == 16465){name = 'Comanche Creek CDP'};
	if(cdp == 16715){name = 'Conejos CDP'};
	if(cdp == 17150){name = 'Copper Mountain CDP'};
	if(cdp == 17485){name = 'Cotopaxi CDP'};
	if(cdp == 18585){name = 'Crisman CDP'};
	if(cdp == 19150){name = 'Dakota Ridge CDP'};
	if(cdp == 20275){name = 'Derby CDP'};
	if(cdp == 20605){name = 'Divide CDP'};
	if(cdp == 21155){name = 'Dotsero CDP'};
	if(cdp == 21330){name = 'Dove Valley CDP'};
	if(cdp == 21390){name = 'Downieville-Lawson-Dumont CDP'};
	if(cdp == 22575){name = 'East Pleasant View CDP'};
	if(cdp == 23300){name = 'Edwards CDP'};
	if(cdp == 23520){name = 'Elbert CDP'};
	if(cdp == 23575){name = 'Eldora CDP'};
	if(cdp == 23630){name = 'Eldorado Springs CDP'};
	if(cdp == 23795){name = 'El Jebel CDP'};
	if(cdp == 24235){name = 'Ellicott CDP'};
	if(cdp == 24290){name = 'El Moro CDP'};
	if(cdp == 25390){name = 'Evergreen CDP'};
	if(cdp == 25550){name = 'Fairmount CDP'};
	if(cdp == 27095){name = 'Florissant CDP'};
	if(cdp == 27175){name = 'Floyd Hill CDP'};
	if(cdp == 27370){name = 'Fort Carson CDP'};
	if(cdp == 27535){name = 'Fort Garland CDP'};
	if(cdp == 28250){name = 'Franktown CDP'};
	if(cdp == 28800){name = 'Fruitvale CDP'};
	if(cdp == 28830){name = 'Fulford CDP'};
	if(cdp == 29295){name = 'Garfield CDP'};
	if(cdp == 29625){name = 'Genesee CDP'};
	if(cdp == 29845){name = 'Gerrard CDP'};
	if(cdp == 30350){name = 'Glendale CDP'};
	if(cdp == 30420){name = 'Gleneagle CDP'};
	if(cdp == 30890){name = 'Goldfield CDP'};
	if(cdp == 30945){name = 'Gold Hill CDP'};
	if(cdp == 31935){name = 'Grand View Estates CDP'};
	if(cdp == 33420){name = 'Guffey CDP'};
	if(cdp == 33502){name = 'Gunbarrel CDP'};
	if(cdp == 34685){name = 'Hasty CDP'};
	if(cdp == 35400){name = 'Heeney CDP'};
	if(cdp == 35860){name = 'Hidden Lake CDP'};
	if(cdp == 36410){name = 'Highlands Ranch CDP'};
	if(cdp == 36940){name = 'Hoehne CDP'};
	if(cdp == 37220){name = 'Holly Hills CDP'};
	if(cdp == 37655){name = 'Howard CDP'};
	if(cdp == 38425){name = 'Idalia CDP'};
	if(cdp == 38480){name = 'Idledale CDP'};
	if(cdp == 38810){name = 'Indian Hills CDP'};
	if(cdp == 38910){name = 'Inverness CDP'};
	if(cdp == 39160){name = 'Jackson Lake CDP'};
	if(cdp == 39250){name = 'Jansen CDP'};
	if(cdp == 39745){name = 'Joes CDP'};
	if(cdp == 39800){name = 'Johnson Village CDP'};
	if(cdp == 40377){name = 'Ken Caryl CDP'};
	if(cdp == 40550){name = 'Keystone CDP'};
	if(cdp == 40900){name = 'Kirk CDP'};
	if(cdp == 41065){name = 'Kittredge CDP'};
	if(cdp == 42000){name = 'Laird CDP'};
	if(cdp == 42165){name = 'La Junta Gardens CDP'};
	if(cdp == 43220){name = 'Laporte CDP'};
	if(cdp == 44270){name = 'Lazy Acres CDP'};
	if(cdp == 44375){name = 'Leadville North CDP'};
	if(cdp == 44595){name = 'Lewis CDP'};
	if(cdp == 44695){name = 'Leyner CDP'};
	if(cdp == 45145){name = 'Lincoln Park CDP'};
	if(cdp == 45680){name = 'Loghill Village CDP'};
	if(cdp == 45750){name = 'Loma CDP'};
	if(cdp == 46410){name = 'Louviers CDP'};
	if(cdp == 47015){name = 'Lynn CDP'};
	if(cdp == 47345){name = 'McCoy CDP'};
	if(cdp == 49325){name = 'Maybell CDP'};
	if(cdp == 49490){name = 'Maysville CDP'};
	if(cdp == 50012){name = 'Meridian CDP'};
	if(cdp == 50380){name = 'Midland CDP'};
	if(cdp == 51975){name = 'Morgan Heights CDP'};
	if(cdp == 52210){name = 'Mountain Meadows CDP'};
	if(cdp == 52820){name = 'Mulford CDP'};
	if(cdp == 53780){name = 'Niwot CDP'};
	if(cdp == 53875){name = 'No Name CDP'};
	if(cdp == 53945){name = 'Norrie CDP'};
	if(cdp == 54495){name = 'North La Junta CDP'};
	if(cdp == 54750){name = 'North Washington CDP'};
	if(cdp == 55925){name = 'Orchard CDP'};
	if(cdp == 56035){name = 'Orchard Mesa CDP'};
	if(cdp == 56695){name = 'Padroni CDP'};
	if(cdp == 57445){name = 'Paragon Estates CDP'};
	if(cdp == 57850){name = 'Parshall CDP'};
	if(cdp == 58400){name = 'Penrose CDP'};
	if(cdp == 58510){name = 'Peoria CDP'};
	if(cdp == 58592){name = 'Perry Park CDP'};
	if(cdp == 58675){name = 'Peyton CDP'};
	if(cdp == 58758){name = 'Phippsburg CDP'};
	if(cdp == 58960){name = 'Piedra CDP'};
	if(cdp == 59240){name = 'Pine Brook Hill CDP'};
	if(cdp == 60655){name = 'Ponderosa Park CDP'};
	if(cdp == 60765){name = 'Portland CDP'};
	if(cdp == 62220){name = 'Pueblo West CDP'};
	if(cdp == 63320){name = 'Red Feather Lakes CDP'};
	if(cdp == 63375){name = 'Redlands CDP'};
	if(cdp == 63650){name = 'Redstone CDP'};
	if(cdp == 63705){name = 'Redvale CDP'};
	if(cdp == 64870){name = 'Rock Creek Park CDP'};
	if(cdp == 65685){name = 'Rollinsville CDP'};
	if(cdp == 66197){name = 'Roxborough Park CDP'};
	if(cdp == 66995){name = 'Saddle Ridge CDP'};
	if(cdp == 67040){name = 'St. Ann Highlands CDP'};
	if(cdp == 67142){name = "St. Mary's CDP"};
	if(cdp == 67445){name = 'Salt Creek CDP'};
	if(cdp == 67500){name = 'San Acacio CDP'};
	if(cdp == 68847){name = 'Security-Widefield CDP'};
	if(cdp == 68875){name = 'Sedalia CDP'};
	if(cdp == 68985){name = 'Segundo CDP'};
	if(cdp == 69110){name = 'Seven Hills CDP'};
	if(cdp == 69480){name = 'Shaw Heights CDP'};
	if(cdp == 69810){name = 'Sherrelwood CDP'};
	if(cdp == 71625){name = 'Smeltertown CDP'};
	if(cdp == 71790){name = 'Snyder CDP'};
	if(cdp == 72320){name = 'Southern Ute CDP'};
	if(cdp == 74080){name = 'Stonegate CDP'};
	if(cdp == 74275){name = 'Stonewall Gap CDP'};
	if(cdp == 74375){name = 'Strasburg CDP'};
	if(cdp == 74430){name = 'Stratmoor CDP'};
	if(cdp == 74980){name = 'Sugarloaf CDP'};
	if(cdp == 75585){name = 'Sunshine CDP'};
	if(cdp == 76190){name = 'Tabernash CDP'};
	if(cdp == 76325){name = 'Tall Timber CDP'};
	if(cdp == 77235){name = 'The Pinery CDP'};
	if(cdp == 77757){name = 'Todd Creek CDP'};
	if(cdp == 78280){name = 'Towaoc CDP'};
	if(cdp == 78335){name = 'Towner CDP'};
	if(cdp == 78345){name = 'Trail Side CDP'};
	if(cdp == 79100){name = 'Twin Lakes CDP'};
	if(cdp == 79105){name = 'Twin Lakes CDP'};
	if(cdp == 79785){name = 'Upper Bear Creek CDP'};
	if(cdp == 80095){name = 'Valdez CDP'};
	if(cdp == 80370){name = 'Valmont CDP'};
	if(cdp == 80755){name = 'Vernon CDP'};
	if(cdp == 81305){name = 'Vineland CDP'};
	if(cdp == 82905){name = 'Watkins CDP'};
	if(cdp == 83120){name = 'Welby CDP'};
	if(cdp == 83175){name = 'Weldona CDP'};
	if(cdp == 83500){name = 'Westcreek CDP'};
	if(cdp == 84000){name = 'Weston CDP'};
	if(cdp == 84042){name = 'West Pleasant View CDP'};
	if(cdp == 85760){name = 'Wolcott CDP'};
	if(cdp == 86117){name = 'Woodmoor CDP'};
	if(cdp == 86200){name = 'Woody Creek CDP'};
return name;
}; //end of cdpName

//popDropdown populaates drop down boxes
function popDropdown(level,ddid,callpg) {

   
   //Counties
var county = [  {'location':'Colorado', 'fips': '000'}, {'location':'Adams County', 'fips': '001'},
                {'location':'Alamosa County', 'fips': '003'},{'location':'Arapahoe County', 'fips': '005'},
				{'location':'Archuleta County', 'fips': '007'},{'location':'Baca County', 'fips': '009'},
				{'location':'Bent County', 'fips': '011'},{'location':'Boulder County', 'fips': '013'},
				{'location':'Broomfield County', 'fips': '014'},{'location':'Chaffee County', 'fips': '015'},
				{'location':'Cheyenne County', 'fips': '017'},{'location':'Clear Creek County', 'fips': '019'},
				{'location':'Conejos County', 'fips': '021'},{'location':'Costilla County', 'fips': '023'},
				{'location':'Crowley County', 'fips': '025'},{'location':'Custer County', 'fips': '027'},
				{'location':'Delta County', 'fips': '029'},{'location':'Denver County', 'fips': '031'},
				{'location':'Dolores County', 'fips': '033'},{'location':'Douglas County', 'fips': '035'},
				{'location':'Eagle County', 'fips': '037'},{'location':'Elbert County', 'fips': '039'},
				{'location':'El Paso County', 'fips': '041'},{'location':'Fremont County', 'fips': '043'},
				{'location':'Garfield County', 'fips': '045'},{'location':'Gilpin County', 'fips': '047'},
				{'location':'Grand County', 'fips': '049'},{'location':'Gunnison County', 'fips': '051'},
				{'location':'Hinsdale County', 'fips': '053'},{'location':'Huerfano County', 'fips': '055'},
				{'location':'Jackson County', 'fips': '057'},{'location':'Jefferson County', 'fips': '059'},
				{'location':'Kiowa County', 'fips': '061'},{'location':'Kit Carson County', 'fips': '063'},
				{'location':'Lake County', 'fips': '065'},{'location':'La Plata County', 'fips': '067'},
				{'location':'Larimer County', 'fips': '069'},{'location':'Las Animas County', 'fips': '071'},
				{'location':'Lincoln County', 'fips': '073'},{'location':'Logan County', 'fips': '075'},
				{'location':'Mesa County', 'fips': '077'},{'location':'Mineral County', 'fips': '079'},
				{'location':'Moffat County', 'fips': '081'},{'location':'Montezuma County', 'fips': '083'},
				{'location':'Montrose County', 'fips': '085'},{'location':'Morgan County', 'fips': '087'},
				{'location':'Otero County', 'fips': '089'},{'location':'Ouray County', 'fips': '091'},
				{'location':'Park County', 'fips': '093'},{'location':'Phillips County', 'fips': '095'},
				{'location':'Pitkin County', 'fips': '097'},{'location':'Prowers County', 'fips': '099'},
				{'location':'Pueblo County', 'fips': '101'},{'location':'Rio Blanco County', 'fips': '103'},
				{'location':'Rio Grande County', 'fips': '105'},{'location':'Routt County', 'fips': '107'},
				{'location':'Saguache County', 'fips': '109'},{'location':'San Juan County', 'fips': '111'},
				{'location':'San Miguel County', 'fips': '113'},{'location':'Sedgwick County', 'fips': '115'},
				{'location':'Summit County', 'fips': '117'},{'location':'Teller County', 'fips': '119'},
				{'location':'Washington County', 'fips': '121'},{'location':'Weld County', 'fips': '123'},
				{'location':'Yuma County', 'fips': '125'}];


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
//Municipalities and places

var municipality = [{'location' :  'Aguilar' , 'fips' : '00760'}, {'location' :  'Akron' , 'fips' : '00925'},
		{'location' :  'Alamosa' , 'fips' : '01090'}, {'location' :  'Alma' , 'fips' : '01530'},
		{'location' :  'Antonito' , 'fips' : '02355'}, {'location' :  'Arriba' , 'fips' : '03235'},
		{'location' :  'Arvada' , 'fips' : '03455'}, {'location' :  'Aspen' , 'fips' : '03620'},
		{'location' :  'Ault' , 'fips' : '03950'}, {'location' :  'Aurora' , 'fips' : '04000'},
		{'location' :  'Avon' , 'fips' : '04110'}, {'location' :  'Basalt' , 'fips' : '04935'},
		{'location' :  'Bayfield' , 'fips' : '05265'}, {'location' :  'Bennett' , 'fips' : '06090'},
		{'location' :  'Berthoud' , 'fips' : '06255'}, {'location' :  'Bethune' , 'fips' : '06530'},
		{'location' :  'Black Hawk' , 'fips' : '07025'}, {'location' :  'Blanca' , 'fips' : '07190'},
		{'location' :  'Blue River' , 'fips' : '07410'}, {'location' :  'Bonanza' , 'fips' : '07571'},
		{'location' :  'Boone' , 'fips' : '07795'}, {'location' :  'Boulder' , 'fips' : '07850'},
		{'location' :  'Bow Mar' , 'fips' : '08070'}, {'location' :  'Branson' , 'fips' : '08345'},
		{'location' :  'Breckenridge' , 'fips' : '08400'}, {'location' :  'Brighton' , 'fips' : '08675'},
		{'location' :  'Brookside' , 'fips' : '09115'}, {'location' :  'Broomfield' , 'fips' : '09280'},
		{'location' :  'Brush' , 'fips' : '09555'}, {'location' :  'Buena Vista' , 'fips' : '10105'},
		{'location' :  'Burlington' , 'fips' : '10600'}, {'location' :  'Calhan' , 'fips' : '11260'},
		{'location' :  'Campo' , 'fips' : '11645'}, {'location' :  'Ca\u00f1on City' , 'fips' : '11810'},
		{'location' :  'Carbondale' , 'fips' : '12045'}, {'location' :  'Castle Pines North' , 'fips' : '12390'},
		{'location' :  'Castle Rock' , 'fips' : '12415'}, {'location' :  'Cedaredge' , 'fips' : '12635'},
		{'location' :  'Centennial' , 'fips' : '12815'}, {'location' :  'Center' , 'fips' : '12855'},
		{'location' :  'Central City' , 'fips' : '12910'}, {'location' :  'Cheraw' , 'fips' : '13460'},
		{'location' :  'Cherry Hills Village' , 'fips' : '13845'}, {'location' :  'Cheyenne Wells' , 'fips' : '14175'},
		{'location' :  'City of Creede' , 'fips' : '14765'}, {'location' :  'Coal Creek' , 'fips' : '15330'},
		{'location' :  'Cokedale' , 'fips' : '15550'}, {'location' :  'Collbran' , 'fips' : '15605'},
		{'location' :  'Colorado Springs' , 'fips' : '16000'}, {'location' :  'Columbine Valley' , 'fips' : '16385'},
		{'location' :  'Commerce City' , 'fips' : '16495'}, {'location' :  'Cortez' , 'fips' : '17375'},
		{'location' :  'Craig' , 'fips' : '17760'}, {'location' :  'Crawford' , 'fips' : '17925'},
		{'location' :  'Crested Butte' , 'fips' : '18310'}, {'location' :  'Crestone' , 'fips' : '18420'},
		{'location' :  'Cripple Creek' , 'fips' : '18530'}, {'location' :  'Crook' , 'fips' : '18640'},
		{'location' :  'Crowley' , 'fips' : '18750'}, {'location' :  'Dacono' , 'fips' : '19080'},
		{'location' :  'De Beque' , 'fips' : '19355'}, {'location' :  'Deer Trail' , 'fips' : '19630'},
		{'location' :  'Del Norte' , 'fips' : '19795'}, {'location' :  'Delta' , 'fips' : '19850'},
		{'location' :  'Denver' , 'fips' : '20000'}, {'location' :  'Dillon' , 'fips' : '20440'},
		{'location' :  'Dinosaur' , 'fips' : '20495'}, {'location' :  'Dolores' , 'fips' : '20770'},
		{'location' :  'Dove Creek' , 'fips' : '21265'}, {'location' :  'Durango' , 'fips' : '22035'},
		{'location' :  'Eads' , 'fips' : '22145'}, {'location' :  'Eagle' , 'fips' : '22200'},
		{'location' :  'Eaton' , 'fips' : '22860'}, {'location' :  'Eckley' , 'fips' : '23025'},
		{'location' :  'Edgewater' , 'fips' : '23135'}, {'location' :  'Elizabeth' , 'fips' : '23740'},
		{'location' :  'Empire' , 'fips' : '24620'}, {'location' :  'Englewood' , 'fips' : '24785'},
		{'location' :  'Erie' , 'fips' : '24950'}, {'location' :  'Estes Park' , 'fips' : '25115'},
		{'location' :  'Evans' , 'fips' : '25280'}, {'location' :  'Fairplay' , 'fips' : '25610'},
		{'location' :  'Federal Heights' , 'fips' : '26270'}, {'location' :  'Firestone' , 'fips' : '26600'},
		{'location' :  'Flagler' , 'fips' : '26765'}, {'location' :  'Fleming' , 'fips' : '26875'},
		{'location' :  'Florence' , 'fips' : '27040'}, {'location' :  'Fort Collins' , 'fips' : '27425'},
		{'location' :  'Fort Lupton' , 'fips' : '27700'}, {'location' :  'Fort Morgan' , 'fips' : '27810'},
		{'location' :  'Fountain' , 'fips' : '27865'}, {'location' :  'Fowler' , 'fips' : '27975'},
		{'location' :  'Foxfield' , 'fips' : '28105'}, {'location' :  'Fraser' , 'fips' : '28305'},
		{'location' :  'Frederick' , 'fips' : '28360'}, {'location' :  'Frisco' , 'fips' : '28690'},
		{'location' :  'Fruita' , 'fips' : '28745'}, {'location' :  'Garden City' , 'fips' : '29185'},
		{'location' :  'Genoa' , 'fips' : '29680'}, {'location' :  'Georgetown' , 'fips' : '29735'},
		{'location' :  'Gilcrest' , 'fips' : '29955'}, {'location' :  'Glendale' , 'fips' : '30340'},
		{'location' :  'Glenwood Springs' , 'fips' : '30780'}, {'location' :  'Golden' , 'fips' : '30835'},
		{'location' :  'Granada' , 'fips' : '31550'}, {'location' :  'Granby' , 'fips' : '31605'},
		{'location' :  'Grand Junction' , 'fips' : '31660'}, {'location' :  'Grand Lake' , 'fips' : '31715'},
		{'location' :  'Greeley' , 'fips' : '32155'}, {'location' :  'Green Mountain Falls' , 'fips' : '32650'},
		{'location' :  'Greenwood Village' , 'fips' : '33035'}, {'location' :  'Grover' , 'fips' : '33310'},
		{'location' :  'Gunnison' , 'fips' : '33640'}, {'location' :  'Gypsum' , 'fips' : '33695'},
		{'location' :  'Hartman' , 'fips' : '34520'}, {'location' :  'Haswell' , 'fips' : '34740'},
		{'location' :  'Haxtun' , 'fips' : '34960'}, {'location' :  'Hayden' , 'fips' : '35070'},
		{'location' :  'Hillrose' , 'fips' : '36610'}, {'location' :  'Holly' , 'fips' : '37215'},
		{'location' :  'Holyoke' , 'fips' : '37270'}, {'location' :  'Hooper' , 'fips' : '37380'},
		{'location' :  'Hot Sulphur Springs' , 'fips' : '37600'}, {'location' :  'Hotchkiss' , 'fips' : '37545'},
		{'location' :  'Hudson' , 'fips' : '37820'}, {'location' :  'Hugo' , 'fips' : '37875'},
		{'location' :  'Idaho Springs' , 'fips' : '38370'}, {'location' :  'Ignacio' , 'fips' : '38535'},
		{'location' :  'Iliff' , 'fips' : '38590'}, {'location' :  'Jamestown' , 'fips' : '39195'},
		{'location' :  'Johnstown' , 'fips' : '39855'}, {'location' :  'Julesburg' , 'fips' : '39965'},
		{'location' :  'Keenesburg' , 'fips' : '40185'}, {'location' :  'Kersey' , 'fips' : '40515'},
		{'location' :  'Kim' , 'fips' : '40570'}, {'location' :  'Kiowa' , 'fips' : '40790'},
		{'location' :  'Kit Carson' , 'fips' : '41010'}, {'location' :  'Kremmling' , 'fips' : '41560'},
		{'location' :  'La Jara' , 'fips' : '42055'}, {'location' :  'La Junta' , 'fips' : '42110'},
		{'location' :  'La Salle' , 'fips' : '43605'}, {'location' :  'La Veta' , 'fips' : '44100'},
		{'location' :  'Lafayette' , 'fips' : '41835'}, {'location' :  'Lake City' , 'fips' : '42330'},
		{'location' :  'Lakeside' , 'fips' : '42495'}, {'location' :  'Lakewood' , 'fips' : '43000'},
		{'location' :  'Lamar' , 'fips' : '43110'}, {'location' :  'Larkspur' , 'fips' : '43550'},
		{'location' :  'Las Animas' , 'fips' : '43660'}, {'location' :  'Leadville' , 'fips' : '44320'},
		{'location' :  'Limon' , 'fips' : '44980'}, {'location' :  'Littleton' , 'fips' : '45255'},
		{'location' :  'Lochbuie' , 'fips' : '45530'}, {'location' :  'Log Lane Village' , 'fips' : '45695'},
		{'location' :  'Lone Tree' , 'fips' : '45955'}, {'location' :  'Longmont' , 'fips' : '45970'},
		{'location' :  'Louisville' , 'fips' : '46355'}, {'location' :  'Loveland' , 'fips' : '46465'},
		{'location' :  'Lyons' , 'fips' : '47070'}, {'location' :  'Manassa' , 'fips' : '48060'},
		{'location' :  'Mancos' , 'fips' : '48115'}, {'location' :  'Manitou Springs' , 'fips' : '48445'},
		{'location' :  'Manzanola' , 'fips' : '48500'}, {'location' :  'Marble' , 'fips' : '48555'},
		{'location' :  'Mead' , 'fips' : '49600'}, {'location' :  'Meeker' , 'fips' : '49875'},
		{'location' :  'Merino' , 'fips' : '50040'}, {'location' :  'Milliken' , 'fips' : '50480'},
		{'location' :  'Minturn' , 'fips' : '50920'}, {'location' :  'Moffat' , 'fips' : '51250'},
		{'location' :  'Monte Vista' , 'fips' : '51635'}, {'location' :  'Montezuma' , 'fips' : '51690'},
		{'location' :  'Montrose' , 'fips' : '51745'}, {'location' :  'Monument' , 'fips' : '51800'},
		{'location' :  'Morrison' , 'fips' : '52075'}, {'location' :  'Mount Crested Butte' , 'fips' : '52570'},
		{'location' :  'Mountain View' , 'fips' : '52350'}, {'location' :  'Mountain Village' , 'fips' : '52550'},
		{'location' :  'Naturita' , 'fips' : '53120'}, {'location' :  'Nederland' , 'fips' : '53175'},
		{'location' :  'New Castle' , 'fips' : '53395'}, {'location' :  'Northglenn' , 'fips' : '54330'},
		{'location' :  'Norwood' , 'fips' : '54880'}, {'location' :  'Nucla' , 'fips' : '54935'},
		{'location' :  'Nunn' , 'fips' : '55045'}, {'location' :  'Oak Creek' , 'fips' : '55155'},
		{'location' :  'Olathe' , 'fips' : '55540'}, {'location' :  'Olney Springs' , 'fips' : '55705'},
		{'location' :  'Ophir' , 'fips' : '55870'}, {'location' :  'Orchard City' , 'fips' : '55980'},
		{'location' :  'Ordway' , 'fips' : '56145'}, {'location' :  'Otis' , 'fips' : '56365'},
		{'location' :  'Ouray' , 'fips' : '56420'}, {'location' :  'Ovid' , 'fips' : '56475'},
		{'location' :  'Pagosa Springs' , 'fips' : '56860'}, {'location' :  'Palisade' , 'fips' : '56970'},
		{'location' :  'Palmer Lake' , 'fips' : '57025'}, {'location' :  'Paoli' , 'fips' : '57245'},
		{'location' :  'Paonia' , 'fips' : '57300'}, {'location' :  'Parachute' , 'fips' : '57400'},
		{'location' :  'Parker' , 'fips' : '57630'}, {'location' :  'Peetz' , 'fips' : '58235'},
		{'location' :  'Pierce' , 'fips' : '59005'}, {'location' :  'Pitkin' , 'fips' : '59830'},
		{'location' :  'Platteville' , 'fips' : '60160'}, {'location' :  'Poncha Springs' , 'fips' : '60600'},
		{'location' :  'Pritchett' , 'fips' : '61315'}, {'location' :  'Pueblo' , 'fips' : '62000'},
		{'location' :  'Ramah' , 'fips' : '62660'}, {'location' :  'Rangely' , 'fips' : '62880'},
		{'location' :  'Raymer (New Raymer)' , 'fips' : '63045'}, {'location' :  'Red Cliff' , 'fips' : '63265'},
		{'location' :  'Rico' , 'fips' : '64090'}, {'location' :  'Ridgway' , 'fips' : '64200'},
		{'location' :  'Rifle' , 'fips' : '64255'}, {'location' :  'Rockvale' , 'fips' : '64970'},
		{'location' :  'Rocky Ford' , 'fips' : '65190'}, {'location' :  'Romeo' , 'fips' : '65740'},
		{'location' :  'Rye' , 'fips' : '66895'}, {'location' :  'Saguache' , 'fips' : '67005'},
		{'location' :  'Salida' , 'fips' : '67280'}, {'location' :  'San Luis' , 'fips' : '68105'},
		{'location' :  'Sanford' , 'fips' : '67830'}, {'location' :  'Sawpit' , 'fips' : '68655'},
		{'location' :  'Sedgwick' , 'fips' : '68930'}, {'location' :  'Seibert' , 'fips' : '69040'},
		{'location' :  'Severance' , 'fips' : '69150'}, {'location' :  'Sheridan' , 'fips' : '69645'},
		{'location' :  'Sheridan Lake' , 'fips' : '69700'}, {'location' :  'Silt' , 'fips' : '70195'},
		{'location' :  'Silver Cliff' , 'fips' : '70250'}, {'location' :  'Silver Plume' , 'fips' : '70360'},
		{'location' :  'Silverthorne' , 'fips' : '70525'}, {'location' :  'Silverton' , 'fips' : '70580'},
		{'location' :  'Simla' , 'fips' : '70635'}, {'location' :  'Snowmass Village' , 'fips' : '71755'},
		{'location' :  'South Fork' , 'fips' : '72395'}, {'location' :  'Springfield' , 'fips' : '73330'},
		{'location' :  'Starkville' , 'fips' : '73715'}, {'location' :  'Steamboat Springs' , 'fips' : '73825'},
		{'location' :  'Sterling' , 'fips' : '73935'}, {'location' :  'Stratton' , 'fips' : '74485'},
		{'location' :  'Sugar City' , 'fips' : '74815'}, {'location' :  'Superior' , 'fips' : '75640'},
		{'location' :  'Swink' , 'fips' : '75970'}, {'location' :  'Telluride' , 'fips' : '76795'},
		{'location' :  'Thornton' , 'fips' : '77290'}, {'location' :  'Timnath' , 'fips' : '77510'},
		{'location' :  'Trinidad' , 'fips' : '78610'}, {'location' :  'Two Buttes' , 'fips' : '79270'},
		{'location' :  'Vail' , 'fips' : '80040'}, {'location' :  'Victor' , 'fips' : '80865'},
		{'location' :  'Vilas' , 'fips' : '81030'}, {'location' :  'Vona' , 'fips' : '81690'},
		{'location' :  'Walden' , 'fips' : '82130'}, {'location' :  'Walsenburg' , 'fips' : '82350'},
		{'location' :  'Walsh' , 'fips' : '82460'}, {'location' :  'Ward' , 'fips' : '82735'},
		{'location' :  'Wellington' , 'fips' : '83230'}, {'location' :  'Westcliffe' , 'fips' : '83450'},
		{'location' :  'Westminster' , 'fips' : '83835'}, {'location' :  'Wheat Ridge' , 'fips' : '84440'},
		{'location' :  'Wiggins' , 'fips' : '84770'}, {'location' :  'Wiley' , 'fips' : '85045'},
		{'location' :  'Williamsburg' , 'fips' : '85155'}, {'location' :  'Windsor' , 'fips' : '85485'},
		{'location' :  'Winter Park' , 'fips' : '85705'}, {'location' :  'Woodland Park' , 'fips' : '86090'},
		{'location' :  'Wray' , 'fips' : '86310'}, {'location' :  'Yampa' , 'fips' : '86475'}]

//places
var place =[{'location' :  'Acres Green CDP' , 'fips' : '00320'}, {'location' :  'Aetna Estates CDP' , 'fips' : '00620'},
		{'location' :  'Air Force Academy CDP' , 'fips' : '00870'}, {'location' :  'Alamosa East CDP' , 'fips' : '01145'},
		{'location' :  'Allenspark CDP' , 'fips' : '01420'}, {'location' :  'Alpine CDP' , 'fips' : '01640'},
		{'location' :  'Altona CDP' , 'fips' : '01740'}, {'location' :  'Amherst CDP' , 'fips' : '01915'},
		{'location' :  'Applewood CDP' , 'fips' : '02575'}, {'location' :  'Arboles CDP' , 'fips' : '02905'},
		{'location' :  'Aristocrat Ranchettes CDP' , 'fips' : '03015'}, {'location' :  'Aspen Park CDP' , 'fips' : '03730'},
		{'location' :  'Atwood CDP' , 'fips' : '03840'}, {'location' :  'Avondale CDP' , 'fips' : '04165'},
		{'location' :  'Bark Ranch CDP' , 'fips' : '04620'}, {'location' :  'Battlement Mesa CDP' , 'fips' : '05120'},
		{'location' :  'Berkley CDP' , 'fips' : '06172'}, {'location' :  'Beulah Valley CDP' , 'fips' : '06602'},
		{'location' :  'Black Forest CDP' , 'fips' : '06970'}, {'location' :  'Blende CDP' , 'fips' : '07245'},
		{'location' :  'Blue Sky CDP' , 'fips' : '07420'}, {'location' :  'Bonanza Mountain Estates CDP' , 'fips' : '07580'},
		{'location' :  'Brandon CDP' , 'fips' : '08290'}, {'location' :  'Brick Center CDP' , 'fips' : '08530'},
		{'location' :  'Byers CDP' , 'fips' : '10985'}, {'location' :  'Capulin CDP' , 'fips' : '11975'},
		{'location' :  'Cascade-Chipita Park CDP' , 'fips' : '12325'}, {'location' :  'Castle Pines CDP' , 'fips' : '12387'},
		{'location' :  'Cathedral CDP' , 'fips' : '12450'}, {'location' :  'Catherine CDP' , 'fips' : '12460'},
		{'location' :  'Cattle Creek CDP' , 'fips' : '12470'}, {'location' :  'Chacra CDP' , 'fips' : '12945'},
		{'location' :  'Cherry Creek CDP' , 'fips' : '13590'}, {'location' :  'Cimarron Hills CDP' , 'fips' : '14587'},
		{'location' :  'Clifton CDP' , 'fips' : '15165'}, {'location' :  'Coal Creek CDP' , 'fips' : '15302'},
		{'location' :  'Coaldale CDP' , 'fips' : '15440'}, {'location' :  'Colona CDP' , 'fips' : '15825'},
		{'location' :  'Colorado City CDP' , 'fips' : '15935'}, {'location' :  'Columbine CDP' , 'fips' : '16110'},
		{'location' :  'Comanche Creek CDP' , 'fips' : '16465'}, {'location' :  'Conejos CDP' , 'fips' : '16715'},
		{'location' :  'Copper Mountain CDP' , 'fips' : '17150'}, {'location' :  'Cotopaxi CDP' , 'fips' : '17485'},
		{'location' :  'Crisman CDP' , 'fips' : '18585'}, {'location' :  'Dakota Ridge CDP' , 'fips' : '19150'},
		{'location' :  'Derby CDP' , 'fips' : '20275'}, {'location' :  'Divide CDP' , 'fips' : '20605'},
		{'location' :  'Dotsero CDP' , 'fips' : '21155'}, {'location' :  'Dove Valley CDP' , 'fips' : '21330'},
		{'location' :  'Downieville-Lawson-Dumont CDP' , 'fips' : '21390'}, {'location' :  'East Pleasant View CDP' , 'fips' : '22575'},
		{'location' :  'Edwards CDP' , 'fips' : '23300'}, {'location' :  'El Jebel CDP' , 'fips' : '23795'},
		{'location' :  'El Moro CDP' , 'fips' : '24290'}, {'location' :  'Elbert CDP' , 'fips' : '23520'},
		{'location' :  'Eldora CDP' , 'fips' : '23575'}, {'location' :  'Eldorado Springs CDP' , 'fips' : '23630'},
		{'location' :  'Ellicott CDP' , 'fips' : '24235'}, {'location' :  'Evergreen CDP' , 'fips' : '25390'},
		{'location' :  'Fairmount CDP' , 'fips' : '25550'}, {'location' :  'Florissant CDP' , 'fips' : '27095'},
		{'location' :  'Floyd Hill CDP' , 'fips' : '27175'}, {'location' :  'Fort Carson CDP' , 'fips' : '27370'},
		{'location' :  'Fort Garland CDP' , 'fips' : '27535'}, {'location' :  'Franktown CDP' , 'fips' : '28250'},
		{'location' :  'Fruitvale CDP' , 'fips' : '28800'}, {'location' :  'Fulford CDP' , 'fips' : '28830'},
		{'location' :  'Garfield CDP' , 'fips' : '29295'}, {'location' :  'Genesee CDP' , 'fips' : '29625'},
		{'location' :  'Gerrard CDP' , 'fips' : '29845'}, {'location' :  'Glendale CDP' , 'fips' : '30350'},
		{'location' :  'Gleneagle CDP' , 'fips' : '30420'}, {'location' :  'Gold Hill CDP' , 'fips' : '30945'},
		{'location' :  'Goldfield CDP' , 'fips' : '30890'}, {'location' :  'Grand View Estates CDP' , 'fips' : '31935'},
		{'location' :  'Guffey CDP' , 'fips' : '33420'}, {'location' :  'Gunbarrel CDP' , 'fips' : '33502'},
		{'location' :  'Hasty CDP' , 'fips' : '34685'}, {'location' :  'Heeney CDP' , 'fips' : '35400'},
		{'location' :  'Hidden Lake CDP' , 'fips' : '35860'}, {'location' :  'Highlands Ranch CDP' , 'fips' : '36410'},
		{'location' :  'Hoehne CDP' , 'fips' : '36940'}, {'location' :  'Holly Hills CDP' , 'fips' : '37220'},
		{'location' :  'Howard CDP' , 'fips' : '37655'}, {'location' :  'Idalia CDP' , 'fips' : '38425'},
		{'location' :  'Idledale CDP' , 'fips' : '38480'}, {'location' :  'Indian Hills CDP' , 'fips' : '38810'},
		{'location' :  'Inverness CDP' , 'fips' : '38910'}, {'location' :  'Jackson Lake CDP' , 'fips' : '39160'},
		{'location' :  'Jansen CDP' , 'fips' : '39250'}, {'location' :  'Joes CDP' , 'fips' : '39745'},
		{'location' :  'Johnson Village CDP' , 'fips' : '39800'}, {'location' :  'Ken Caryl CDP' , 'fips' : '40377'},
		{'location' :  'Keystone CDP' , 'fips' : '40550'}, {'location' :  'Kirk CDP' , 'fips' : '40900'},
		{'location' :  'Kittredge CDP' , 'fips' : '41065'}, {'location' :  'La Junta Gardens CDP' , 'fips' : '42165'},
		{'location' :  'Laird CDP' , 'fips' : '42000'}, {'location' :  'Laporte CDP' , 'fips' : '43220'},
		{'location' :  'Lazy Acres CDP' , 'fips' : '44270'}, {'location' :  'Leadville North CDP' , 'fips' : '44375'},
		{'location' :  'Lewis CDP' , 'fips' : '44595'}, {'location' :  'Leyner CDP' , 'fips' : '44695'},
		{'location' :  'Lincoln Park CDP' , 'fips' : '45145'}, {'location' :  'Loghill Village CDP' , 'fips' : '45680'},
		{'location' :  'Loma CDP' , 'fips' : '45750'}, {'location' :  'Louviers CDP' , 'fips' : '46410'},
		{'location' :  'Lynn CDP' , 'fips' : '47015'}, {'location' :  'Maybell CDP' , 'fips' : '49325'},
		{'location' :  'Maysville CDP' , 'fips' : '49490'}, {'location' :  'McCoy CDP' , 'fips' : '47345'},
		{'location' :  'Meridian CDP' , 'fips' : '50012'}, {'location' :  'Midland CDP' , 'fips' : '50380'},
		{'location' :  'Morgan Heights CDP' , 'fips' : '51975'}, {'location' :  'Mountain Meadows CDP' , 'fips' : '52210'},
		{'location' :  'Mulford CDP' , 'fips' : '52820'}, {'location' :  'Niwot CDP' , 'fips' : '53780'},
		{'location' :  'No Name CDP' , 'fips' : '53875'}, {'location' :  'Norrie CDP' , 'fips' : '53945'},
		{'location' :  'North La Junta CDP' , 'fips' : '54495'}, {'location' :  'North Washington CDP' , 'fips' : '54750'},
		{'location' :  'Orchard CDP' , 'fips' : '55925'}, {'location' :  'Orchard Mesa CDP' , 'fips' : '56035'},
		{'location' :  'Padroni CDP' , 'fips' : '56695'}, {'location' :  'Paragon Estates CDP' , 'fips' : '57445'},
		{'location' :  'Parshall CDP' , 'fips' : '57850'}, {'location' :  'Penrose CDP' , 'fips' : '58400'},
		{'location' :  'Peoria CDP' , 'fips' : '58510'}, {'location' :  'Perry Park CDP' , 'fips' : '58592'},
		{'location' :  'Peyton CDP' , 'fips' : '58675'}, {'location' :  'Phippsburg CDP' , 'fips' : '58758'},
		{'location' :  'Piedra CDP' , 'fips' : '58960'}, {'location' :  'Pine Brook Hill CDP' , 'fips' : '59240'},
		{'location' :  'Ponderosa Park CDP' , 'fips' : '60655'}, {'location' :  'Portland CDP' , 'fips' : '60765'},
		{'location' :  'Pueblo West CDP' , 'fips' : '62220'}, {'location' :  'Red Feather Lakes CDP' , 'fips' : '63320'},
		{'location' :  'Redlands CDP' , 'fips' : '63375'}, {'location' :  'Redstone CDP' , 'fips' : '63650'},
		{'location' :  'Redvale CDP' , 'fips' : '63705'}, {'location' :  'Rock Creek Park CDP' , 'fips' : '64870'},
		{'location' :  'Rollinsville CDP' , 'fips' : '65685'}, {'location' :  'Roxborough Park CDP' , 'fips' : '66197'},
		{'location' :  'Saddle Ridge CDP' , 'fips' : '66995'}, {'location' :  'Salt Creek CDP' , 'fips' : '67445'},
		{'location' :  'San Acacio CDP' , 'fips' : '67500'}, {'location' :  'Security-Widefield CDP' , 'fips' : '68847'},
		{'location' :  'Sedalia CDP' , 'fips' : '68875'}, {'location' :  'Segundo CDP' , 'fips' : '68985'},
		{'location' :  'Seven Hills CDP' , 'fips' : '69110'}, {'location' :  'Shaw Heights CDP' , 'fips' : '69480'},
		{'location' :  'Sherrelwood CDP' , 'fips' : '69810'}, {'location' :  'Smeltertown CDP' , 'fips' : '71625'},
		{'location' :  'Snyder CDP' , 'fips' : '71790'}, {'location' :  'Southern Ute CDP' , 'fips' : '72320'},
		{'location' :  'St. Ann Highlands CDP' , 'fips' : '67040'}, {'location' :  'St. Mary\'s CDP' , 'fips' : '67142'},
		{'location' :  'Stonegate CDP' , 'fips' : '74080'}, {'location' :  'Stonewall Gap CDP' , 'fips' : '74275'},
		{'location' :  'Strasburg CDP' , 'fips' : '74375'}, {'location' :  'Stratmoor CDP' , 'fips' : '74430'},
		{'location' :  'Sugarloaf CDP' , 'fips' : '74980'}, {'location' :  'Sunshine CDP' , 'fips' : '75585'},
		{'location' :  'Tabernash CDP' , 'fips' : '76190'}, {'location' :  'Tall Timber CDP' , 'fips' : '76325'},
		{'location' :  'The Pinery CDP' , 'fips' : '77235'}, {'location' :  'Todd Creek CDP' , 'fips' : '77757'},
		{'location' :  'Towaoc CDP' , 'fips' : '78280'}, {'location' :  'Towner CDP' , 'fips' : '78335'},
		{'location' :  'Trail Side CDP' , 'fips' : '78345'}, {'location' :  'Twin Lakes CDP' , 'fips' : '79100'},
		{'location' :  'Twin Lakes CDP' , 'fips' : '79105'}, {'location' :  'Upper Bear Creek CDP' , 'fips' : '79785'},
		{'location' :  'Valdez CDP' , 'fips' : '80095'}, {'location' :  'Valmont CDP' , 'fips' : '80370'},
		{'location' :  'Vernon CDP' , 'fips' : '80755'}, {'location' :  'Vineland CDP' , 'fips' : '81305'},
		{'location' :  'Watkins CDP' , 'fips' : '82905'}, {'location' :  'Welby CDP' , 'fips' : '83120'},
		{'location' :  'Weldona CDP' , 'fips' : '83175'}, {'location' :  'West Pleasant View CDP' , 'fips' : '84042'},
		{'location' :  'Westcreek CDP' , 'fips' : '83500'}, {'location' :  'Weston CDP' , 'fips' : '84000'},
		{'location' :  'Wolcott CDP' , 'fips' : '85760'}, {'location' :  'Woodmoor CDP' , 'fips' : '86117'}]

//Profile selection -- Removing Comparisons and CDPs  
var profile = [{'location' :  'Select Profile' , 'fips' : ''},{'location' :  'Region' , 'fips' : 'region'}, {'location' :  'County' , 'fips' : 'county'},
		{'location' :  'Municipality', 'fips' : 'municipality'}
	/*
        {'location' :  'Census Designated Place' , 'fips' : 'place'},
		{'location' :  'Regional Comparison' , 'fips' : 'regioncomp'}, {'location' :  'County Comparison' , 'fips' : 'countycomp'},
        {'location' :  'Municipal Comparison', 'fips' : 'municipalitycomp'}
	,   {'location' :  'Census Designated Place Comparison' , 'fips' : 'placecomp'}
	*/
	]	

if(level == 'region') { var locarr = region};
if(callpg == 'profile') { //removes "Colorado" from the county array when called by the profile
	if(level == 'county') {
		var tmpcty = county;
		tmpcty.shift();
		var locarr = tmpcty;
	}
} else {
   if(level == 'county') {var locarr = county};
}
if(level == 'municipality') { var locarr = municipality};
if(level == 'place') { var locarr = place};
if(level == 'regioncomp') {var locarr = region};
if(level == 'countycomp') {var locarr = county};
if(level == 'municipalitycomp') { var locarr = municipality};
if(level == 'placecomp') { var locarr = place};
if(level == 'profile') { var locarr = profile};

var sel = document.getElementById(ddid);
sel.innerHTML = "";

if(level == 'region' || level == 'regioncomp') {

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
}; //end of popDropdown	

//popCtyDrop  Populates the regiona deopdown and facilitates drill down...
function popCtyDrop(regnum,ddid){

	reg_num = parseInt(regnum);
	reg_name = regionName(reg_num);
	fips_list = regionCOL(reg_num);
	var outlist = [];
	outlist.push({'fips' : regnum, 'location' : reg_name});

	for(i = 0; i < fips_list[0].fips.length; i++){
		var cnum = parseInt(fips_list[0].fips[i]);
		outlist.push({'fips' : fips_list[0].fips[i], 'location' : countyName(cnum)});
	}

var sel = document.getElementById(ddid);
    sel.innerHTML = "";
	for(var i = 0; i < outlist.length; i++) {
		var el = document.createElement("option");
		el.textContent = outlist[i].location;
		el.value = outlist[i].fips;
		sel.appendChild(el);
	}
} //end of popCtyDrop


//regioncty  returns te fips codes and color codes for a input region number
//Color Pallettes
//Geographic Regions  DOLA Reds
//Management Regions DOLA Purples
//Metro Regions DOLA tree greens
//Micro Regions DOLA Left Mountain Greens
//Denver DOLA Rignh Mountain Teal
function regionCOL(regnum) {
	var fips = []; 
if(regnum == 1) {fips.push({'fips' : ['015', '019', '027', '043', '047', '055', '065', '071', '093'], 'color' : '#EE6677'})};
if(regnum == 2) {fips.push({'fips' : ['009', '011', '017', '025', '039', '061', '063', '073', '075', '087', '089', '095', '099', '115', '121', '125'],  'color' : '#228833'})};
if(regnum == 3) {fips.push({'fips' : ['001', '005', '013', '014', '031', '035', '041', '059', '069', '101','119','123'],  'color' : '#4477AA'})};
if(regnum == 4) {fips.push({'fips' : ['003', '021', '023', '079', '105', '109'],  'color' : '#CCBB44'})};
if(regnum == 5) {fips.push({'fips' : ['007', '029', '033', '037', '045', '049', '051', '053', '057', '067', '077', '081', '083', '085', '091', '097', '103', '107', '111', '113', '117'],  'color' : '#66CCEE'})};
if(regnum == 6) {fips.push({'fips' : ['075','087','095','115','121','125'], 'color' : '#AA3377'})};
if(regnum == 7) {fips.push({'fips' : ['069','123'],  'color' : '#BBBBBB'})};
if(regnum == 8) {fips.push({'fips' : ['001','005','013','014','019','031','035','047','059'], 'color' : '#505050'})};
if(regnum == 9) {fips.push({'fips' : ['041','093','119'],  'color' : '#44AA99'})};
if(regnum == 10) {fips.push({'fips' : ['017','039','063','073'], 'color' : '#117733'})};
if(regnum == 11) {fips.push({'fips' : ['009','011','025','061','089','099'],  'color' : '#332288'})};
if(regnum == 12) {fips.push({'fips' : ['101'],  'color' : '#DDCC77'})};
if(regnum == 13) {fips.push({'fips' : ['003','021','023','079','105','109'],  'color' : '#999933'})};
if(regnum == 14) {fips.push({'fips' : ['007','033','067','083','111'],  'color' : '#CC6677'})};
if(regnum == 15) {fips.push({'fips' : ['029','051','053','085','091','113'], 'color' : '#F8F8F8'})};
if(regnum == 16) {fips.push({'fips' : ['045','077','081','103','107'],  'color' : '#AA4499'})};
if(regnum == 17) {fips.push({'fips' : ['037','049','057','097','117'], 'color' : '#DDDDDD'})};
if(regnum == 18) {fips.push({'fips' : ['015','027','043','065'], 'color' : '#BBCC33'})};
if(regnum == 19) {fips.push({'fips' : ['055','071'],  'color' : '#AAAA00'})};
if(regnum == 20) {fips.push({'fips' : ['013'], 'color' : '#77AADD'})};
if(regnum == 21) {fips.push({'fips' : ['041','119'], 'color' : '#EE8866'})};
if(regnum == 22) {fips.push({'fips' : ['001','005','014','019','031','035','039','047','059','093'],  'color' : '#EEDD88'})};
if(regnum == 23) {fips.push({'fips' : ['069'],  'color' : '#FFAABB'})};
if(regnum == 24) {fips.push({'fips' : ['077'],  'color' : '#99DDFF'})};
if(regnum == 25) {fips.push({'fips' : ['123'],  'color' : '#44BB99'})};
if(regnum == 26) {fips.push({'fips' : ['101'],  'color' : '#DDCC77'})};
if(regnum == 27) {fips.push({'fips' : ['117'], 'color' : '#E69F00'})};
if(regnum == 28) {fips.push({'fips' : ['043'],  'color' : '#56B4E9'})};
if(regnum == 29) {fips.push({'fips' : ['081'],  'color' : '#009E73'})};
if(regnum == 30) {fips.push({'fips' : ['067'],  'color' : '#F0E442'})};
if(regnum == 31) {fips.push({'fips' : ['037'],  'color' : '#0072B2'})};
if(regnum == 32) {fips.push({'fips' : ['087'],  'color' : '#D55E00'})};
if(regnum == 33) {fips.push({'fips' : ['045','097'],  'color' : '#CC79A7'})};
if(regnum == 34) {fips.push({'fips' : ['085','091'],  'color' : '#696969'})};
if(regnum == 35) {fips.push({'fips' : ['107'], 'color' : '#808080'})};
if(regnum == 36) {fips.push({'fips' : ['075'],  'color' : '#A9A9A9'})};
if(regnum == 37) {fips.push({'fips' : ['001', '005', '014', '031', '035', '059'],  'color' : '#505050'})};
if(regnum == 38) {fips.push({'fips' : ['001', '005', '013', '014', '031', '035', '059'], 'color' : '#C0C0C0'})};
if(regnum == 39) {fips.push({'fips' : ['001', '005', '013', '014', '031', '035', '059', '123'],  'color' : '#D3D3D3'})};

	 return fips;
	};

//restructureRace restructures race data 
function restructureRace(inData) {
    var output = [];
   var WH, HP, BL, AS, AM;
   var ages = [... new Set(inData.map(tag => tag.age))];

    for(i = 0; i < ages.length; i++) {
		var tmp = inData.filter(function(d) {return d.age == ages[i];});
		for(j = 0; j < tmp.length; j++) {
				  if( tmp[j].race_eth == "White NH") { WH = tmp[j].population};
				  if( tmp[j].race_eth == "Hispanic") { HP = tmp[j].population};
				  if( tmp[j].race_eth == "Black NH") { BL = tmp[j].population};
				  if( tmp[j].race_eth == "Asian/Pacific Islander NH") {AS = tmp[j].population};
				  if( tmp[j].race_eth == "American Indian NH") {AM = tmp[j].population};
				}
		output.push({ 'age' : tmp[0].age, "Hisapnic" : HP, "White NH" : WH, "Black NH" : BL, "Asian/Pacific Islander NH" : AS, "American Indian" : AM});
		};
    return output;
};
// end restructureRace


//includeHTML  taken from W3  https://www.w3schools.com/howto/howto_html_include.asp
function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}


function transpose(data) {
  let result = {};
  for (let row of data) {
    for (let [key, value] of Object.entries(row)) {
      result[key] = result[key] || [];
	result[key].push([{'name' : key, 'value' : value}]); 
    }
  }
  return result;
};



//exporttoCsv  downloads the a selected file
function exportToCsv(cname, type, rows, yr) {

        var csvFile = d3.csvFormat(rows);
		if(type == 'test'){
			var fileName = "Test values.csv";
			}
		if(type == 'estimate') {
			var fileName = "Population Estimates " + cname + ".csv";
		};
		if(type == 'forecast') {
			var fileName = "Population Forecast " + cname + ".csv";
		};
		if(type == 'coc') {
			var fileName = "Components of Change " + cname + ".csv";
		};
		if(type == 'netmig') {
			var fileName = "Net Migration by Age " + cname + ".csv";
		};
		if(type == 'age') {
			var fileName = "Age Categories " + cname + ".csv";
		};
		if(type == 'ageest') {
			var fileName = "Age Estimate " + cname;
		};
		if(type == 'agefor') {
			var fileName = "Age Forecast " + cname;
		};
		if(type == 'agepyr') {
			var fileName = "Age Pyramid " + cname;
		};

		if(type == 'popchng') {
			var fileName = "Population Change by Age Group " + cname + ".csv";
		};
		
		if(type == 'line'){
			var fileName = "Single Year of Age by Race " + cname +  " " + yr + ".csv";
		};
		if(type == 'white'){
			var fileName = "Single Year of Age by Race White NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'hisp'){
			var fileName = "Single Year of Age by Race Hispanic " + cname +  " " + yr + ".csv";
		};
		if(type == 'black'){
			var fileName = "Single Year of Age by Race Black NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'asian'){
			var fileName = "Single Year of Age by Race Asian NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'amind'){
			var fileName = "Single Year of Age by Race American Indian NH " + cname +  " " + yr + ".csv";
		};
		if(type == 'netmign'){
			var fileName =  "Net Migration by Age " + cname + ".csv"
		};
		if(type == 'netmigrrate'){
			var fileName =  "Net Migration by Age " + cname + ".csv"
		};
		if(type == 'netmigwa'){
			var fileName =  "Net Migration by Year.csv"
		};
		if(type == 'netmigrwa'){
			var fileName =  "Net Migration by Year.csv"
		};
		if(type == 'nethist') {
			var fileName = "Long Term Trend Birth Death Migration " + cname + ".csv"
		};
		if(type == 'hhchart') {
			var fileName = "Household Projections Age Group x Household Type " + cname + ".csv"
		};
		if(type == 'agechart') {
			var fileName = "Household Projections Household Type x Age Group " + cname + ".csv"
		};

        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, fileName);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", fileName);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    };

function plotDownload(plotdiv,filename){
		Plotly.toImage(plotdiv, { format: 'png', width: 600, height: 400 }).then(function (dataURL) {
			var a = document.createElement('a');
			a.href = dataURL;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
		});
}

//exportToPng  Exports plotly trace and layout to PNG file
function exportToPng(cname, type, graphDiv, yr){
	  	if(type == 'estimate') {
			var fileName = "Population Estimates " + cname;
		};
		if(type == 'forecast') {
			var fileName = "Population Forecast " + cname;
		};
		if(type == 'coc') {
			var fileName = "Components of Change " + cname;
		};
		if(type == 'netmig') {
			var fileName = "Net Migration by Age 2000-2010 " + cname;
		};
		if(type == 'age') {
			var fileName = "Age Categories " + cname;
		}
		if(type == 'ageest') {
			var fileName = "Age Estimate " + cname;
		};
		if(type == 'agefor') {
			var fileName = "Age Forecast " + cname;
		};
		if(type == 'agepyr') {
			var fileName = "Age Pyramid ";
		};
		if(type == 'popchng') {
			var fileName = "Population Change by Age Group " + cname;
		};
		
		if(type == 'line'){
			var fileName = "Single Year of Age by Race " + cname +  " " + yr;
		};
		if(type == 'white'){
			var fileName = "Single Year of Age by Race White NH " + cname +  " " + yr;
		};
		if(type == 'hisp'){
			var fileName = "Single Year of Age by Race Hispanic " + cname +  " " + yr;
		};
		if(type == 'black'){
			var fileName = "Single Year of Age by Race Black NH " + cname +  " " + yr;
		};
		if(type == 'asian'){
			var fileName = "Single Year of Age by Race Asian NH " + cname +  " " + yr;
		};
		if(type == 'amind'){
			var fileName = "Single Year of Age by Race American Indian NH " + cname +  " " + yr;
		};
		if(type == 'netmign'){
			var fileName =  "Net Migration by Age " + cname
		};
		if(type == 'netmigrrate'){
			var fileName =  "Net Migration Rate by Age " + cname
		};
		if(type == 'netmigwa'){
			var fileName =  "Net Migration by Year "
		};
		if(type == 'netmigrwa'){
			var fileName =  "Net Migration by Year "
		};
		if(type == 'birth') {
			var fileName = "Long Term Trend Births " + cname 
		};
		if(type == 'death') {
			var fileName = "Long Term Trend Deaths " + cname 
		};
		if(type == 'mig') {
			var fileName = "Long Term Trend Net Migration " + cname 
		};
		if(type == 'hhchart') {
			var fileName = "Household Projections Age Group x Household Type " + cname 
		};
		if(type == 'agechart') {
			var fileName = "Household Projections Household Type x Age Group " + cname 
		};
	
	if(type == "agepyr") {
		if(Array.isArray(graphDiv)){
			for(i = 0; i < graphDiv.length; i++){
               plotDownload(graphDiv[i].plot,graphDiv[i].fName);
			};  //i
		} else {
			var fn = fileName + cname + ".png";
		Plotly.toImage(graphDiv, { format: 'png', width: 900, height: 400 }).then(function (dataURL) {
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = fn;
        document.body.appendChild(a);
         a.click();
        document.body.removeChild(a);
    });
		};
	} else {
	  var fn =  fileName + ".png";
	   Plotly.toImage(graphDiv, { format: 'png', width: 800, height: 360 }).then(function (dataURL) {
        var a = document.createElement('a');
        a.href = dataURL;
        a.download = fn;
        document.body.appendChild(a);
         a.click();
        document.body.removeChild(a);
    });
	}
};

//educData reads in the ACS Education data file and output the summary file information
function educData(indata,fips) {
 //extract data from indata object
	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};

	var outdata = [];
	 
	for(a = 0; a < proc_data.length; a++){ 
	 	 var temp = [];
	 if(fips == "000"){
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'total_est' : Number(proc_data[a].b15003001),
			 'total_moe' : Number(proc_data[a].b15003_moe001),
			 'baplus_est' : Number(proc_data[a].b15003022) + Number(proc_data[a].b15003023) + Number(proc_data[a].b15003024) + Number(proc_data[a].b15003025),
			 'baplus_moe' : Number(proc_data[a].b15003_moe022)**2 + Number(proc_data[a].b15003_moe023)**2 + Number(proc_data[a].b15003_moe024)**2 + Number(proc_data[a].b15003_moe025)**2,
			 'baplus_est_pct' : 0,
			 'baplus_moe_pct' : 0
		});
	 } else {
			temp.push({
			'county' : Number(proc_data[a].county),
			 'total_est' : Number(proc_data[a].b15003001),
			 'total_moe' : Number(proc_data[a].b15003_moe001),
			 'baplus_est' : Number(proc_data[a].b15003022) + Number(proc_data[a].b15003023) + Number(proc_data[a].b15003024) + Number(proc_data[a].b15003025),
			 'baplus_moe' : Number(proc_data[a].b15003_moe022)**2 + Number(proc_data[a].b15003_moe023)**2 + Number(proc_data[a].b15003_moe024)**2 + Number(proc_data[a].b15003_moe025)**2,
			 'baplus_est_pct' : 0,
			 'baplus_moe_pct' : 0
			 });
	 };

	 temp[0]['baplus_moe'] = Math.sqrt(temp[0]['baplus_moe']);
	 temp[0]['baplus_est_pct'] = temp[0]['baplus_est']/temp[0]['total_est'];
	 temp[0]['baplus_moe_pct'] = temp[0]['baplus_moe']/temp[0]['total_est'];
	 outdata.push(temp);	
    }; //end of a loop


  //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'baplus_est' : outdata[i][0].baplus_est,
			 'baplus_moe' : outdata[i][0].baplus_moe,
			 'baplus_est_pct' : outdata[i][0].baplus_est_pct,
			 'baplus_moe_pct' : outdata[i][0].baplus_moe_pct 
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'baplus_est' : outdata[i][0].baplus_est,
			 'baplus_moe' : outdata[i][0].baplus_moe,
			 'baplus_est_pct' : outdata[i][0].baplus_est_pct,
			 'baplus_moe_pct' : outdata[i][0].baplus_moe_pct 
		});
    };
	};
 //removing Puerto Rico and the District of Columbia
 
 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of educData

//povData reads in the ACS Poverty data file and output the summary file information
function povData(indata,fips) {
  //extract data from indata object
	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};

	var outdata = [];
	for(a = 0; a < proc_data.length; a++){ 

	 var temp = [];
	 if(fips == "000"){
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'total_est' : Number(proc_data[a].b06012001),
			 'total_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est' : Number(proc_data[a].b06012002),
			 'pov_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est_pct' : Number(proc_data[a].b06012002)/Number(proc_data[a].b06012001),
			 'pov_moe_pct' : Number(proc_data[a].b06012_moe002)/Number(proc_data[a].b06012001)
		});
	 } else {
		temp.push({
			 'county' : Number(proc_data[a].county),
			 'total_est' : Number(proc_data[a].b06012001),
			 'total_moe' : Number(proc_data[a].b06012_moe001),
			 'pov_est' : Number(proc_data[a].b06012002),
			 'pov_moe' : Number(proc_data[a].b06012_moe002),
			 'pov_est_pct' : Number(proc_data[a].b06012002)/Number(proc_data[a].b06012001),
			 'pov_moe_pct' : Number(proc_data[a].b06012_moe002)/Number(proc_data[a].b06012001)
		 });
	 };
	
	 outdata.push(temp);	
    }; //end of a loop

 //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'pov_est' : outdata[i][0].pov_est,
			 'pov_moe' : outdata[i][0].pov_moe,
			 'pov_est_pct' : outdata[i][0].pov_est_pct,
			 'pov_moe_pct' : outdata[i][0].pov_moe_pct 
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'pov_est' : outdata[i][0].pov_est,
			 'pov_moe' : outdata[i][0].pov_moe,
			 'pov_est_pct' : outdata[i][0].pov_est_pct,
			 'pov_moe_pct' : outdata[i][0].pov_moe_pct 
		});
    };
	};
 //removing Puerto Rico and the District of Columbia
 
 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of povData

//tenureData reads in the ACS Poverty data file and output the summary file information
function tenureData(indata,fips) {
  //extract data from indata object

	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};

	var outdata = [];
	for(a = 0; a < proc_data.length; a++){ 

	 var temp = [];
	 if(fips == "000"){
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'total_est' : Number(proc_data[a].b07013001),
			 'total_moe' : Number(proc_data[a].b07013_moe001),
			 'oo_est' : Number(proc_data[a].b07013002),
			 'oo_moe' : Number(proc_data[a].b07013_moe002),
			 'oo_est_pct' : Number(proc_data[a].b07013002)/Number(proc_data[a].b07013001),
			 'oo_moe_pct' : Number(proc_data[a].b07013_moe002)/Number(proc_data[a].b07013001),
			 'rent_est' : Number(proc_data[a].b07013003),
			 'rent_moe' : Number(proc_data[a].b07013_moe003),
			 'rent_est_pct' : Number(proc_data[a].b07013003)/Number(proc_data[a].b07013001),
			 'rent_moe_pct' : Number(proc_data[a].b07013_moe003)/Number(proc_data[a].b07013001) 
		});
	 } else {
		temp.push({
			 'county' : Number(proc_data[a].county),
			 'total_est' : Number(proc_data[a].b07013001),
			 'total_moe' : Number(proc_data[a].b07013_moe001),
			 'oo_est' : Number(proc_data[a].b07013002),
			 'oo_moe' : Number(proc_data[a].b07013_moe002),
			 'oo_est_pct' : Number(proc_data[a].b07013002)/Number(proc_data[a].b07013001),
			 'oo_moe_pct' : Number(proc_data[a].b07013_moe002)/Number(proc_data[a].b07013001),
			 'rent_est' : Number(proc_data[a].b07013003),
			 'rent_moe' : Number(proc_data[a].b07013_moe003),
			 'rent_est_pct' : Number(proc_data[a].b07013003)/Number(proc_data[a].b07013001),
			 'rent_moe_pct' : Number(proc_data[a].b07013_moe003)/Number(proc_data[a].b07013001) 
		 });
	 };
	
	 outdata.push(temp);	
    }; //end of a loop

 //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'oo_est' : outdata[i][0].oo_est,
			 'oo_moe' : outdata[i][0].oo_moe,
			 'oo_est_pct' : outdata[i][0].oo_est_pct,
			 'oo_moe_pct' : outdata[i][0].oo_moe_pct,
			 'rent_est' : outdata[i][0].rent_est,
			 'rent_moe' : outdata[i][0].rent_moe,
			 'rent_est_pct' : outdata[i][0].rent_est_pct,
			 'rent_moe_pct' : outdata[i][0].rent_moe_pct 			 
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'total_est' : outdata[i][0].total_est,
			 'total_moe' : outdata[i][0].total_moe,
			 'oo_est' : outdata[i][0].oo_est,
			 'oo_moe' : outdata[i][0].oo_moe,
			 'oo_est_pct' : outdata[i][0].oo_est_pct,
			 'oo_moe_pct' : outdata[i][0].oo_moe_pct,
			 'rent_est' : outdata[i][0].rent_est,
			 'rent_moe' : outdata[i][0].rent_moe,
			 'rent_est_pct' : outdata[i][0].rent_est_pct,
			 'rent_moe_pct' : outdata[i][0].rent_moe_pct 			 
	});
    };
	};
 //removing Puerto Rico and the District of Columbia

 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of tenureData

//incData reads in the ACS Median Household Income, Median Home Value and Median Gross Rent data file and output the summary file information
function incData(indata, type, fips) {  //Type: HH: Household Income, MORT: home value, RENT : gross rent
	  //extract data from indata object
	var proc_data = [];
	for(i = 0; i < indata.data.length; i++) {
	   proc_data.push(indata.data[i]);
	};
	
	var outdata = [];
	for(a = 0; a < proc_data.length; a++){ 
	 	 var temp = [];
	 if(fips == "000"){
		if(type == "HH") {
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'inc_est' : Number(proc_data[a].b19013001),
			 'inc_moe' : Number(proc_data[a].b19013_moe001)
		});
		 };
		if(type == "MORT") {
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'inc_est' : Number(proc_data[a].b25097001),
			 'inc_moe' : Number(proc_data[a].b25097_moe001)
		});
		 };
		if(type == "RENT") {
	    temp.push({
			 'state' : Number(proc_data[a].state),
			 'inc_est' : Number(proc_data[a].b25064001),
			 'inc_moe' : Number(proc_data[a].b25064_moe001)
		});
		 };
	 } else {
		if(type == "HH") {
	    temp.push({
			 'county' : Number(proc_data[a].county),
			 'inc_est' : Number(proc_data[a].b19013001),
			 'inc_moe' : Number(proc_data[a].b19013_moe001)
		});
		 };
		if(type == "MORT") {
	    temp.push({
			 'county' : Number(proc_data[a].county),
			 'inc_est' : Number(proc_data[a].b25097001),
			 'inc_moe' : Number(proc_data[a].b25097_moe001)
		});
		 };
		if(type == "RENT") {
	    temp.push({
			 'county' : Number(proc_data[a].county),
			 'inc_est' : Number(proc_data[a].b25064001),
			 'inc_moe' : Number(proc_data[a].b25064_moe001)
		});
		 };
	 };
	
	 outdata.push(temp);	
    }; //end of a loop

 //flatten 
var outdata_flat = [];
for(i = 0; i < outdata.length; i++){
	if(fips == "000") {
		outdata_flat.push ({
			'state' : outdata[i][0].state,
			 'inc_est' : outdata[i][0].inc_est,
			 'inc_moe' : outdata[i][0].inc_moe
		});
	} else {
		outdata_flat.push ({
			'county' : outdata[i][0].county,
			 'inc_est' : outdata[i][0].inc_est,
			 'inc_moe' : outdata[i][0].inc_moe
		});
    };
	};
 //removing Puerto Rico and the District of Columbia
 
 if(fips == "000"){
   var outdata2 = outdata_flat.sort(function(a, b){ return d3.ascending(a['state'], b['state']); });
   var outdata3 = outdata2.filter(function(d) {return d.state != 11 & d.state != 72;});
 } else {
	var outdata3 = outdata_flat.sort(function(a, b){ return d3.ascending(a['county'], b['county']); });
 };	
 
  return(outdata3);
}; //end of incData

//returnRank returns the ranked value of selected field
function returnRank(indata,fips){
	var rval = 0;
	for(i = 0; i < indata.length; i++){
		if(fips == "000") {
			if(indata[i]['state'] == 8){
				rval = i + 1;
			};
		} else {
			if(indata[i]['county'] == parseInt(fips)){
				rval = i + 1;
			};
		};
	};
 return(rval);
};  //end of returnRank 

//chkDiff checjs for significant increase or decrease in quantity
function chkDiff(curpct,curmoe, prevpct, prevmoe) {
	var prev_low = prevpct - prevmoe;
	var prev_high = prevpct + prevmoe;
	var outcome = 'equal';
	
	if(curpct > prevpct && curpct > prev_high) {
		outcome = 'increase';
	}
	if(curpct < prevpct && curpct < prev_low) {
		outcome = 'decrease';
	}
return(outcome);
}; //end of chkDiff

//genACSUrl  Generates ACS call from the Census API
function genACSUrl(acsyear, table, startidx, endidx, geotype,geolist){
	if(geotype == "Region"){
		var geoName = 'county';
	} else {
		if(geotype == 'Municipality'){
		  var geoName = 'place';
		} else {
		  var geoName = geotype.toLowerCase();
		}
	}
	
	//ACS Call has a different structure for tables with more thn 50 vars
	var acshead = 'https://api.census.gov/data/'+ acsyear;
	var varArr = ['NAME'];
	// Geneerating lists of varibles  If table is an array  -- for special cases
	if(Array.isArray(table)) {
		for(i = 0; i < table.length; i++){	
           if(table[i] == "B19051"){ //expand for special cases
 		      varArr.push(table[i] + "_001" + "E");
		      varArr.push(table[i] + "_001" + "M");
 		      varArr.push(table[i] + "_002" + "E");
		      varArr.push(table[i] + "_002" + "M");
			}  else {
               if(i > 8){ //This is the B19061 - B19070 series
				varArr.push(table[i] + "_001" + "E");
				varArr.push(table[i] + "_001"  + "M");
			   } else {
				varArr.push(table[i] + "_002" + "E");
				varArr.push(table[i] + "_002"  + "M");
			}
			}
		}
		var varList = varArr.toString();
	} else {
		for(i = startidx; i <= endidx; i++){
		 var idx3 = ('000'+i).slice(-3);
	     varArr.push(table + "_" + idx3 + "E");
	     varArr.push(table + "_" + idx3 + "M");
		}
		var varList = varArr.toString();
	}
//Generating final acstail	
if(endidx >= 24) {
	if(geoName == 'state'){
		var acstail = '/acs/acs5?get=group(' + table +')&for=state:08&key=08fe07c2a7bf781b7771d7cccb264fe7ff8965ce';
	} else {
	  var acstail = '/acs/acs5?get=group(' + table +')&for=' + geoName + ':' + geolist + '&in=state:08&key=08fe07c2a7bf781b7771d7cccb264fe7ff8965ce';
	}
	} else {
	if(geotype == 'state'){
		var acstail = '/acs/acs5?get=' + varList +'&for=state:08&key=08fe07c2a7bf781b7771d7cccb264fe7ff8965ce';
	} else {
	  var acstail = '/acs/acs5?get=' + varList +'&for=' + geoName + ':' + geolist + '&in=state:08&key=08fe07c2a7bf781b7771d7cccb264fe7ff8965ce';
	}
	}

var acsUrl = acshead + acstail;
return(acsUrl)
}; //end of genACSUrl

//Data Aqusition functions

//genSYA creates the single year of age data sets for inclusion in table and outputs table to DOM
function genSYA(fips,yrvalue){
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");


//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
  var prevyear = yrvalue - 1;
  var year10 = 2030;
  var yr_list = prevyear + "," + yrvalue + "," + year10;
 
 //Generate url
 if(fips == "000") {
 var urlstr = "https://gis.dola.colorado.gov/lookups/sya_regions?reg_num=" + fips_list + "&year=" + yr_list + "&choice=single"
 } else {
     var urlstr = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + yr_list + "&choice=single&group=3"
 }
 
 var totaldata = [];

d3.json(urlstr).then(function(data){
   data.forEach(function(obj) {
    if(obj.age >=  0 && obj.age <= 17) {obj.age_cat = "0 to 17"; }
    if(obj.age >= 18 && obj.age <= 24) {obj.age_cat = "18 to 24";}
    if(obj.age >= 25 && obj.age <= 44) {obj.age_cat = "25 to 44"; }
    if(obj.age >= 45 && obj.age <= 64) {obj.age_cat = "45 to 64"; }
    if(obj.age >= 65) {obj.age_cat = "65 +";}
    totaldata.push({'year' : obj.year, 'age_cat' : obj.age_cat, 'totalpopulation' : parseInt(obj.totalpopulation)});
 });

 
      //  Totals
var total_ann = d3.rollup(totaldata, v => d3.sum(v, d => d.totalpopulation), d => d.year);
var total_age = d3.rollup(totaldata, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.age_cat);

//Flatten Arrays for output

var total_ann_tmp = [];
for (let [key, value] of total_ann) {
  total_ann_tmp.push({'year' : key, 'totalpopulation' : value});
    };

var total_ann_flat = total_ann_tmp.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });

var total_age_tmp = [];
for (let [key1, value] of total_age) {
for (let[key2, value2] of value) {
   total_age_tmp.push({'year' : key1, 'age_cat' : key2, 'totalpopulation' : value2});
}
};

var total_age_flat = total_age_tmp.sort(function(a,b) {return d3.ascending(a['age_cat'],b['age_cat']);})
            .sort(function(a, b){ return d3.ascending(a['year'], b['year']); });

// Create table array for output
var tbl_arr = []
tbl_arr.push({'age_cat' : '<b>Total</b>', 'prevval' : "<b>"+ fmt_comma(total_ann_flat[0].totalpopulation) + "</b>", 'curval' : "<b>"+fmt_comma(total_ann_flat[1].totalpopulation) + "</b>", 'forval' : "<b>" + fmt_comma(total_ann_flat[2].totalpopulation) +"</b>"});

var ages = [... new Set(total_age_flat.map(tag => tag.age_cat))];
for(i = 0; i < ages.length; i++) {
	var filt = total_age_flat.filter(function(d) {return d.age_cat == ages[i]});
	tbl_arr.push({'age_cat' : ages[i], 'prevval' : fmt_comma(filt[0].totalpopulation), 'curval' : fmt_comma(filt[1].totalpopulation), 'forval' : fmt_comma(filt[2].totalpopulation)});
  };

//Generate Table
var tblcolumns1 = [
    {'text' :'Population Estimates by Age', 'colspan' : 2},
	{'text' : "<a href='https://gis.dola.colorado.gov/population/data/sya-county/' target=_blank>Single Year of Age Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Ages','Number, '+ prevyear,'Number, '+ yrvalue,'2030 Forecast'];
// Output table 
d3.select('#PopTab').html("");
var syatab = d3.select('#PopTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","50%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","25%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "25%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.age_cat; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.prevval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.curval; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.forval; });


}); //d3.json
} //end of genSYA

//genCOC generates components of change data for table
function genCOC(fips,yrvalue){
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");
// Extracts and summarizes COC data for output table
//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value   
 
  var prevyear = yrvalue - 1;
  var yr_list = prevyear + "," + yrvalue;
  
   //Generate url
 var urlstr = "https://gis.dola.colorado.gov/lookups/components?county=" + fips_list + "&year=" + yr_list
  var COCdata = [];
  d3.json(urlstr).then(function(data){
       data.forEach( function(obj){  
      COCdata.push({'year' : obj.year, 'estimate' : parseInt(obj.estimate), 'Births' : parseInt(obj.births),
                    'Deaths' : parseInt(obj.deaths), 'Net Migration' : parseInt(obj.netmig), 'natincr' : parseInt(obj.change)});
  }); 
  
var COC_T = transpose(COCdata);

var COC_fint = Object.values(COC_T);

//Extracting data for table
var tbl_arr = [];
var outname;
var prevVal;
var curVal;
var pctchg;
var forVal;

for(i = 2; i <= 4; i++){
	outname = COC_fint[i][0][0]['name'];
	prevVal = COC_fint[i][0][0]['value'];
	curVal = COC_fint[i][1][0]['value'];
	pctchg = prevVal  == 0 ?  0 : (curVal - prevVal)/prevVal;
	tbl_arr.push({'coc_name' : outname, 'prevval' : fmt_comma(prevVal), 'curval' : fmt_comma(curVal), 'pct_chg' : fmt_pct(pctchg)});
}
//Generate Table
var tblcolumns1 = [
    {'text' :'Components of Change', 'colspan' : 2},
	{'text' : "<a href='https://gis.dola.colorado.gov/births-deaths-migration/data/components-change/#components-of-change' target=_blank>Components of Change Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Component','Number,  ' + prevyear,'Number,  ' + yrvalue,'Change'];
// Output table 
d3.select('#COCTab').html("");
var syatab = d3.select('#COCTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","50%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","25%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "25%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.coc_name; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.prevval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.curval; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.pct_chg; });
	
  }); //d3.json  
} //end genCOC

//genRaceEth generates race and ethnicity data for table
function genRaceEth(fips,yrvalue){
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");

//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
  var prevyear = yrvalue - 1;
  var year10 = 2030;
  var yr_list = prevyear + "," + yrvalue //This is the list for the estimates call.  Year10 is used in the forecast call
 
var age_list = "0";
for(i = 1; i<= 100; i++){
   age_list = age_list + "," + i;
  };
  
 //Generate url
 if(fips == "000") {
 fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";

 } 
//estimates urls
urlstr_hispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yrvalue +"&race=1,2,3,4&ethnicity=1&sex=b&group=opt7";
urlstr_nonhispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yrvalue +"&race=1,2,3,4&ethnicity=2&sex=b&group=opt7";

//forecast urls
urlstr_for = "https://gis.dola.colorado.gov/lookups/sya-race-forecast?age=0,18,65&county=" + fips_list + "&year=" + year10 + "&race=1,2,3,4,5&group=opt7";

var hisp_est = [];
var nonhisp_est = [];
var raceeth_for = [];
//Promise Structure
var prom = [d3.json(urlstr_hispest),d3.json(urlstr_nonhispest),d3.json(urlstr_for)];

Promise.all(prom).then(function(data){
//push out vars and count to number
data[0].forEach(function(obj) {
hisp_est.push({'year' : obj.year, 'sex' : obj.sex, 'population' : parseInt(obj.count)});
});
    data[1].forEach(function(obj) {
	 if(obj.race ==  "Asian/Pacific Islander") {obj.race ="Asian/ Pacific Islander";}
     nonhisp_est.push({'year' : obj.year, 'sex' : obj.sex, 'race' : obj.race, 'population' : parseInt(obj.count)});
});
    data[2].forEach(function(obj) {
     raceeth_for.push({'year' : obj.year, 'race_eth' : obj.race, 'population' : parseInt(obj.count)});
});



for(i = 0; i < raceeth_for.length; i++){
	if(raceeth_for[i].race_eth == "White non Hispanic"){ raceeth_for[i].race_eth = "White NH"};
	if(raceeth_for[i].race_eth == "Black non Hispanic"){ raceeth_for[i].race_eth = "Black NH"};
	if(raceeth_for[i].race_eth == "American Indian non Hispanic"){ raceeth_for[i].race_eth = "American Indian NH"};
     if(raceeth_for[i].race_eth == "Asian non Hispanic"){ raceeth_for[i].race_eth = "Asian/ Pacific Islander NH"};
};
   
//Rolling up the hispanic and non-hispanic datasets
var hisp_total = d3.rollup(hisp_est, v => d3.sum(v, d => d.population), d => d.year);
var nonhisp_total = d3.rollup(nonhisp_est, v => d3.sum(v, d => d.population), d => d.year, d=> d.race);

//Flattening the datasets
    var hisp_flat = [];
for (let [key, value] of hisp_total) {
  hisp_flat.push({'year' : key, 'race_eth' : 'Hispanic',  'population' : value});
    }
var nonhisp_flat = [];
for (let [key1, value] of nonhisp_total) {
for (let[key2, value2] of value) {
   nonhisp_flat.push({'year' : key1, 'race_eth' : key2 + ' NH', 'population' : value2});
}
}

var raceeth_est = hisp_flat.concat(nonhisp_flat);
var raceeth_fin = [];

raceeth_est.concat(raceeth_for).forEach(function(obj) {
    raceeth_fin.push({'year' : obj.year, 'race_eth' : obj.race_eth, 'population' : obj.population});
    });


// Create table array for output
var tbl_arr = []
var race_eth_sum = d3.sum(raceeth_est, d => d.population);
var raceth = ["Hispanic", "White NH", "Black NH", "Asian/ Pacific Islander NH", "American Indian NH"];

for(i = 0; i < raceth.length; i++) {
	var filt = raceeth_fin.filter(function(d) {return d.race_eth == raceth[i]});
	tbl_arr.push({'race_eth' : raceth[i], 'percent' : fmt_pct(filt[0].population/race_eth_sum), 'curval' : fmt_comma(filt[0].population), 'forval' : fmt_comma(filt[1].population)});
  };


//Generate Table
var tblcolumns1 = [
    {'text' :'Race/ Ethnicity: '+ yrvalue, 'colspan' : 2},
	{'text' : "<a href='https://gis.dola.colorado.gov/population/data/race-estimate/#county-race-by-age-estimates' target=_blank>Race/Ethnicity Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Race/ Ethnicity','Percentage, ' + yrvalue,'Number,  '+ yrvalue,year10 + ' Forecast'];
// Output table 
d3.select('#RaceTab').html("");
var syatab = d3.select('#RaceTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","50%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","25%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "25%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.race_eth; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.percent; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.curval; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.forval; });


}); //end of Promise

}; //end of genRaceEth



//genTenure Pulls multiple data sources from the ACS 5-year files to create final table
//Housing Tenure B07013

function genTenure(fips,yrvalue){

var fmt_pct = d3.format(".2%");
var fmt_count = d3.format(",");
var fmt_dollar = d3.format("$,");
var fmt_yr = d3.format("00");

var curACS = "acs" + fmt_yr(yrvalue - 2004) + fmt_yr(yrvalue - 2000);

if(fips == "000") {    
	   var tenurestr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b07013&moe=yes&sumlev=40&type=json";
   } else {
      var tenurestr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b07013&moe=yes&sumlev=50&type=json&state=8";
   };
   
  
 //Housing Tenure Variables and Objests
 var tenure_cur = [];
 
d3.json(tenurestr_cur).then(function(data){

//Housing Tenure Processing

    tenure_cur = tenureData(data,fips);

	//Calculate rank 
	var oo_val = [];
	var rental_val = [];
	for(i = 0; i < tenure_cur.length; i++){
		if(fips == "000") { 
		  oo_val.push({"fips" : tenure_cur[i].state, "count" : tenure_cur[i].oo_est, "percent" :  tenure_cur[i].oo_est_pct});
		  rental_val.push({"fips" : tenure_cur[i].state, "count" : tenure_cur[i].rent_est, "percent" :  tenure_cur[i].rent_est_pct});
		} else {
		  oo_val.push({"fips" : tenure_cur[i].county, "count" : tenure_cur[i].oo_est, "percent" :  tenure_cur[i].oo_est_pct});
		  rental_val.push({"fips" : tenure_cur[i].county, "count" : tenure_cur[i].rent_est, "percent" :  tenure_cur[i].rent_est_pct});
		}	
	}

//Building Table Array

//Selcting fips
if(fips == "000"){
	oo_tab = oo_val.filter(function(d) {return d.fips == 8;});
	rental_tab = rental_val.filter(function(d) {return d.fips == 8;});
   } else {
	oo_tab = oo_val.filter(function(d) {return d.fips == Number(fips);});
	rental_tab = rental_val.filter(function(d) {return d.fips == Number(fips);});
   };

 out_tab = oo_tab.concat(rental_tab)

var tbl_arr = [];
var censstub = "https://data.census.gov/cedsci/table?q=";

var tabno = "B07013";
var tabname = ["Owner Occupied Housing Units", "Rental Housing Units"];

if(fips == "000") {
    var censgeo = "&g=0400000US08&tid=ACSDT5Y"+ yrvalue + ".";
} else {
	var censgeo = "&g=0500000US08"+ fips +"&tid=ACSDT5Y"+ yrvalue + ".";
};

for(i = 0; i < tabname.length;i++) {
	var topic = "<a href='" + censstub + tabno + censgeo + tabno +"' target=_blank>" + tabname[i] + "</a>"
    tbl_arr.push({'topic' : topic,
	              'count' : fmt_count(out_tab[i].count),
				  'percent' : fmt_pct(out_tab[i].percent)
                 });
	}
	

var curyr4 = yrvalue - 4;


//Generate Table
var tblcolumns1 = [
    {'text' :'Housing Tenure '+ yrvalue},
	{'text' : "<a href='https://data.census.gov/cedsci/' target=_blank>American Community Survey "+ curyr4 + "-" + yrvalue + " 5-year data</a>", 'colspan' : 2}
	];

     var tblcolumns2 = ['Housing Units', 'Number', 'Percentage'];


// Output table 
d3.select('#TenureTab').html("");
var tenuretab = d3.select('#TenureTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = tenuretab.append('thead');
tbody = tenuretab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","20%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","20%")
   .style("text-align", "center")
   .style("font-weight", "bold");
   
 //Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "20%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.topic; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.count; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.percent; });
 }); //end of promise
}; //end of genTenure


//genACS Pulls multiple data sources from the ACS 5-year files to create final table
//Poverty  B06012
//Educ ACS B15003
//Median Household income  B19013_001
//Median Home Value B25097
//Median Gross Rent B25064

function genACS(fips,yrvalue){

var fmt_pct = d3.format(".2%");
var fmt_count = d3.format(",");
var fmt_dollar = d3.format("$,");
var fmt_yr = d3.format("00");

var prevyr = yrvalue - 5;
var curACS = "acs" + fmt_yr(yrvalue - 2004) + fmt_yr(yrvalue - 2000);
var prevACS = "acs" + fmt_yr(prevyr - 2004) + fmt_yr(prevyr - 2000);


if(fips == "000") { 
       var povstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS + "&schema=data&table=b06012&moe=yes&sumlev=40&type=json";
	   var povstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS + "&schema=data&table=b06012&moe=yes&sumlev=40&type=json";

       var educstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS + "&schema=data&table=b15003&moe=yes&sumlev=40&type=json";
	   var educstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS + "&schema=data&table=b15003&moe=yes&sumlev=40&type=json";
	   
       var incstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS + "&schema=data&table=b19013&moe=yes&sumlev=40&type=json";
	   var incstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS + "&schema=data&table=b19013&moe=yes&sumlev=40&type=json";
	   
	   var homestr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25097&moe=yes&sumlev=40&type=json";
	   var homestr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25097&moe=yes&sumlev=40&type=json";
	   
       var rentstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25064&moe=yes&sumlev=40&type=json";
	   var rentstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25064&moe=yes&sumlev=40&type=json";
   } else {
	  var povstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b06012&moe=yes&sumlev=50&type=json&state=8";
	  var povstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b06012&moe=yes&sumlev=50&type=json&state=8";

      var educstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b15003&moe=yes&sumlev=50&type=json&state=8";
	  var educstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b15003&moe=yes&sumlev=50&type=json&state=8";
	  
      var incstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b19013&moe=yes&sumlev=50&type=json&state=8";
	  var incstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b19013&moe=yes&sumlev=50&type=json&state=8";
	  
      var homestr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25097&moe=yes&sumlev=50&type=json&state=8";
	  var homestr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25097&moe=yes&sumlev=50&type=json&state=8";
	  
      var rentstr_cur = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + curACS +"&schema=data&table=b25064&moe=yes&sumlev=50&type=json&state=8";
	  var rentstr_prev = "https://gis.dola.colorado.gov/capi/demog?limit=99999&db=" + prevACS +"&schema=data&table=b25064&moe=yes&sumlev=50&type=json&state=8";
   };
   
 //Poverty Variables and Objects
 var pov_cur = [];
 var pov_prev = [];
 var pov_comp = [];
 var pov_rank = [];
 var povRank;
 var povDiff;
 
//Education Variables and Objects
 var educ_cur = [];
 var educ_prev = [];
 var educ_comp = [];
 var educ_rank = [];
 var educRank;
 var educDiff;
 
 //Household Income Variables and Objects
 var inc_cur = [];
 var inc_prev = [];
 var inc_comp = [];
 var inc_rank = [];
 var incRank;
 var incDiff;
 
//Median Home Value Variables and Objects
 var home_cur = [];
 var home_prev = [];
 var home_comp = [];
 var home_rank = [];
 var homeRank;
 var homeDiff;
 
 //Median Gross Rent Variables and Objects
 var rent_cur = [];
 var rent_prev = [];
 var rent_comp = [];
 var rent_rank = [];
 var rentRank;
 var rentDiff;
 
  
 //Promise Structure
var prom = [d3.json(povstr_prev),d3.json(povstr_cur),d3.json(educstr_prev),d3.json(educstr_cur),
            d3.json(incstr_prev),d3.json(incstr_cur),d3.json(homestr_prev),d3.json(homestr_cur),
			d3.json(rentstr_prev),d3.json(rentstr_cur)];

Promise.all(prom).then(function(data){

//Poverty Processing
    pov_prev = povData(data[0],fips);
	pov_cur = povData(data[1],fips);

//Calculate rank 
	pov_rank = pov_cur.sort(function(a, b){ return d3.ascending(b['pov_est_pct'], a['pov_est_pct']); });
	povRank = returnRank(pov_rank,fips);
	 
	//Comparing current and previous values
	if(fips == "000") {
		pov_comp = pov_cur.filter(function(d) {return d.state == 8;})
		pov_comp.push(pov_prev.filter(function(d) {return d.state == 8;}));
	} else {
		pov_comp = pov_cur.filter(function(d) {return d.county == parseInt(fips);})
		pov_comp.push(pov_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	
	povDiff = chkDiff(pov_comp[0]['pov_est_pct'], pov_comp[0]['pov_moe_pct'], pov_comp[1][0]['pov_est_pct'], pov_comp[1][0]['pov_moe_pct']);

//Education Processing

    educ_prev = educData(data[2],fips);
	educ_cur = educData(data[3],fips);
 
	//Calculate rank 
	educ_rank = educ_cur.sort(function(a, b){ return d3.ascending(b['baplus_est_pct'], a['baplus_est_pct']); });
	educRank = returnRank(educ_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		educ_comp = educ_cur.filter(function(d) {return d.state == 8;})
		educ_comp.push(educ_prev.filter(function(d) {return d.state == 8;}));
	} else {
		educ_comp = educ_cur.filter(function(d) {return d.county == parseInt(fips);})
		educ_comp.push(educ_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	educDiff = chkDiff(educ_comp[0]['baplus_est_pct'], educ_comp[0]['baplus_moe_pct'], educ_comp[1][0]['baplus_est_pct'], educ_comp[1][0]['baplus_moe_pct']);

//Median Household Income Processing

    inc_prev = incData(data[4],"HH",fips);
	inc_cur = incData(data[5],"HH",fips);
	
	//Calculate rank 
	inc_rank = inc_cur.sort(function(a, b){ return d3.ascending(b['inc_est'], a['inc_est']); });
	incRank = returnRank(inc_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		inc_comp = inc_cur.filter(function(d) {return d.state == 8;})
		inc_comp.push(inc_prev.filter(function(d) {return d.state == 8;}));
	} else {
		inc_comp = inc_cur.filter(function(d) {return d.county == parseInt(fips);})
		inc_comp.push(inc_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	incDiff = chkDiff(inc_comp[0]['inc_est'], inc_comp[0]['inc_moe'], inc_comp[1][0]['inc_est'], inc_comp[1][0]['inc_moe']);
	
//Median Home Value  Processing
	
    home_prev = incData(data[6],"MORT",fips);
	home_cur = incData(data[7],"MORT",fips);
	
	//Calculate rank 
	home_rank = home_cur.sort(function(a, b){ return d3.ascending(b['inc_est'], a['inc_est']); });
	homeRank = returnRank(home_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		home_comp = home_cur.filter(function(d) {return d.state == 8;})
		home_comp.push(home_prev.filter(function(d) {return d.state == 8;}));
	} else {
		home_comp = home_cur.filter(function(d) {return d.county == parseInt(fips);})
		home_comp.push(home_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	homeDiff = chkDiff(home_comp[0]['inc_est'], home_comp[0]['inc_moe'], home_comp[1][0]['inc_est'], home_comp[1][0]['inc_moe']);
	
//Median Gross Rent Processing

    rent_prev = incData(data[8],"RENT",fips);
	rent_cur = incData(data[9],"RENT",fips);

	//Calculate rank 
	rent_rank = rent_cur.sort(function(a, b){ return d3.ascending(b['inc_est'], a['inc_est']); });
	rentRank = returnRank(rent_rank,fips);
	
//Comparing current and previous values
	if(fips == "000") {
		rent_comp = rent_cur.filter(function(d) {return d.state == 8;})
		rent_comp.push(rent_prev.filter(function(d) {return d.state == 8;}));
	} else {
		rent_comp = rent_cur.filter(function(d) {return d.county == parseInt(fips);})
		rent_comp.push(rent_prev.filter(function(d) {return d.county == parseInt(fips);}));
    };
	rentDiff = chkDiff(rent_comp[0]['inc_est'], rent_comp[0]['inc_moe'], rent_comp[1][0]['inc_est'], rent_comp[1][0]['inc_moe']);
	
//Building Table Array

var tbl_arr = [];
var censstub = "https://data.census.gov/cedsci/table?q=";

var tabno = ["B06012","B15003","B19013","B25097","B25064","","B07013","B07013"];
var tabname = ["% living in Poverty","% with Bachelor's Degree+",
              "Median Household Income", "Median Home Value", "Median Gross Rent"];

if(fips == "000") {
    var censgeo = "&g=0400000US08&tid=ACSDT5Y" + yrvalue + ".";
} else {
	var censgeo = "&g=0500000US08"+ fips +"&tid=ACSDT5Y" + yrvalue + ".";
};


for(i = 0; i < 5; i++){
	var topic = "<a href='" + censstub + tabno[i] + censgeo + tabno[i] +"' target=_blank>" + tabname[i] + "</a>"
	if(i == 0) {//poverty
	  var value = fmt_pct(pov_comp[0]['pov_est_pct']);
	  if(povDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: red;'></i>";
	  };
	  if(povDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: green;'></i>";
	  };
	  if(povDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = povRank;
	}; 

	if(i == 1) {//education
	  var value = fmt_pct(educ_comp[0]['baplus_est_pct']);
	  if(educDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(educDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(educDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = educRank;
	}; 

	if(i == 2) {//Household Income
	  var value = fmt_dollar(inc_comp[0]['inc_est']);
	  if(incDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(incDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(incDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = incRank;
	}; 

	if(i == 3) {//homevalue
	  var value = fmt_dollar(home_comp[0]['inc_est']);
	  if(homeDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(homeDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(homeDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = homeRank;
	}; 
	
	if(i == 4) {//gross rent
	  var value = fmt_dollar(rent_comp[0]['inc_est']);
	  if(rentDiff == "increase"){
		 var diffIcon = "<i class='fas fa-arrow-up' style='color: green;'></i>";
	  };
	  if(rentDiff == "decrease"){
		 var diffIcon = "<i class='fas fa-arrow-down' style='color: red;'></i>";
	  };
	  if(rentDiff == "equal") {
		  var diffIcon = "<i class='fas fa-equals' style='color: grey;'></i>";
	  };
	 var rank = rentRank;
	}; 
	 
	tbl_arr.push({ 'topic' : topic,
	               'value' : value, 
	               'diff' : diffIcon,
				   'rank' : rank});
}; //tbl_arr i loop

var curyr4 = yrvalue - 4;
var prevyr4 = prevyr - 4;

//Generate Table
var tblcolumns1 = [
    {'text' :'Selected Statistics: '+ yrvalue, 'colspan' :2},
	{'text' : "<a href='https://data.census.gov/cedsci/' target=_blank>American Community Survey "+ curyr4 + "-" + yrvalue + " 5-year data</a>", 'colspan' : 2}
	];

if(fips == "000"){	
     var tblcolumns2 = ['Topic', 'Number', 'Change from ' + prevyr4 + "-" + prevyr + " ACS","U. S. Rank"];
} else {
	 var tblcolumns2 = ['Topic', 'Value', 'Change from ' + prevyr4 + "-" + prevyr + " ACS","County Rank"];
};

// Output table 
d3.select('#ACSTab').html("");
var syatab = d3.select('#ACSTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","20%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","20%")
   .style("text-align", "center")
   .style("font-weight", "bold");
   
 //Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "20%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.topic; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.value; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.diff; });
 rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.rank; });
 }); //end of promise
}; //end of genACS


//genHousing generates housing data for table From the SDO County Profile
function genHousing(fips, yrvalue) {
	var fmt_pct = d3.format(".2%")
	var fmt_comma = d3.format(",");
	var fmt_dec = d3.format(".2");

//Specify fips_list
var fips_list = parseInt(fips); 
   
//extract year value 
 
  var prevyear = yrvalue - 1;
  var yr_list = prevyear + "," + yrvalue;
 
 //Generate url
 if(fips == "000") {
 fips_list = "1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125";
 } 
//estimates urls
urlstr = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalhousingunits,householdpopulation,groupquarterspopulation,households,censusbuildingpermits,vacanthousingunits";

var hous_tmp = [];
d3.json(urlstr).then(function(data){

 data.forEach(function(obj) {
 hous_tmp.push({'year' : obj.year,  'county' : obj.county,
     'totalhousingunits' : parseInt(obj.totalhousingunits),
     'householdpopulation' : parseInt(obj.householdpopulation),
	 'groupquarterspopulation' : parseInt(obj.groupquarterspopulation),
	 'households' : parseInt(obj.households),
	 'censusbuildingpermits' : parseInt(obj.censusbuildingpermits),
	 'vacanthousingunits' : parseInt(obj.vacanthousingunits)});
 });
 
var columnsToSum = ['totalhousingunits','householdpopulation','groupquarterspopulation', 'households', 'censusbuildingpermits', 'vacanthousingunits']
 
      //  Totals
var housing_temp = d3.rollup(hous_tmp,
                  v => Object.fromEntries(columnsToSum.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);

var housing_fin = [];
for (let [key, obj] of housing_temp) {
	housing_fin.push( {'year' : key,  
                        'totalhousingunits' : obj.totalhousingunits,
                        'householdpopulation' : obj.householdpopulation,
	                    'groupquarterspopulation' : obj.groupquarterspopulation,
	                    'households' : obj.households,
						'household_size' : obj.householdpopulation/obj.households,
	                    'censusbuildingpermits' : obj.censusbuildingpermits,
						'vacanthousingunits' : obj.vacanthousingunits});
 };


var housing_T = transpose(housing_fin);

var housing_fint = Object.values(housing_T);


var tbl_arr = [];
var out_name  = "";
var currentVal = 0;
var prevVal = 0;
var cVal = 0;
var pctVal = 0;

for(i = 1; i < housing_fint.length; i++){
	currentVal = housing_fint[i][1][0]['value'];
	prevVal = housing_fint[i][0][0]['value']; 
	
	if(housing_fint[i][0][0].name == 'totalhousingunits') { out_name = "Total Housing Units";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal-prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'householdpopulation') { out_name = "Household Population";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'groupquarterspopulation') { out_name = "Group Quarters Population";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'households') { out_name = "Households";
	                                                     cVal = fmt_comma(currentVal);
														 pctVal = fmt_pct((currentVal - prevVal)/prevVal);
													   };
	if(housing_fint[i][0][0].name == 'vacanthousingunits') { out_name = "Vacant Housing Units";
	                                                     cVal = fmt_comma(currentVal);
														 if(prevVal != 0) {
														   pctVal = fmt_pct((currentVal - prevVal)/prevVal);
														 } else {
														   pctVal = " ";
														 };
													   };												   
	if(housing_fint[i][0][0].name == 'household_size') { out_name = "Household Size";
	                                                     cVal = fmt_dec(currentVal);
														 pctVal = "";
													   };
	if(housing_fint[i][0][0].name == 'censusbuildingpermits') { out_name = "Annual Building Permits";
	                                                     cVal = fmt_comma(currentVal);
														 if(prevVal != 0) {
														   pctVal = fmt_pct((currentVal - prevVal)/prevVal);
														 } else {
														   pctVal = " ";
														 };
													   };

	tbl_arr.push({ 'row_name' : out_name,
	               'curval' : cVal, 
	               'pct_chg' : pctVal});
};

//Generate Table
var tblcolumns1 = [
    {'text' :'Housing Characteristics: '+ yrvalue, 'colspan' : 1},
	{'text' : "<a href='https://gis.dola.colorado.gov/population/data/county-data-lookup/' target=_blank>County Profile Lookup</a>", 'colspan' : 2}
	 ];
var tblcolumns2 = ['Housing Type', 'Number', 'Change from ' + prevyear];
// Output table 
d3.select('#HousTab').html("");
var syatab = d3.select('#HousTab')
               .append('table')
               .style('table-layout', 'fixed');
			   
thead = syatab.append('thead');
tbody = syatab.append('tbody');
//Header
thead.append('tr')
       .selectAll('th')
   .data(tblcolumns1).enter()
   .append('th')
   .html(function(d) {return d.text;})
   .attr("colspan", function(d) {return d.colspan;})
   .style("border", "1px black solid")
   .style("width","33%")
 	
thead.append('tr')
   .selectAll('th')
   .data(tblcolumns2).enter()
   .append('th')
   .text(function(d) {return d;})
   .style("border", "1px black solid")
   .style("width","33%")
   .style("text-align", "center")
   .style("font-weight", "bold");
//Rows   

var rows = tbody
    .selectAll('tr')
    .data(tbl_arr).enter()
    .append('tr')
	.attr("width", "33%")
	.attr("border-spacing","0")
	.style("color","black");

//Columns
rows.append('td')
      .style("text-align", "left")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
	  .html(function(m) { return m.row_name; });
rows.append('td')
      .style("text-align", "right")
	  .style('font-size','10pt')
	  .attr("border-spacing","0")
      .html(function(m) { return m.curval; });
rows.append('td')
       .style("text-align", "right") 
	   .style('font-size','10pt')
	   .attr("border-spacing","0")
       .html(function(m) { return m.pct_chg; });

}); //d3.json
}; // End of genHousing

//Component Functions for Demograpic Dashboard 
function estPlot(inData, app, level, plotdiv, yrvalue, fips, ctyName){
    const fmt_date = d3.timeFormat("%B %d, %Y");

var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var ESTIMATE = document.getElementById(plotdiv);
ESTIMATE.innerHTML = "";

if(app == "profile") {
	  pgSetup(level, plotdiv,"County Population Estimates",false,fips, ctyName);
	  var ESTIMATE = document.getElementById('PlotDiv2');
}

//Prepping Plot

var year_est_arr =[];
var pop_est_arr = [];

est_flat = inData.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
year_est_arr = est_flat.map(item => item.year);
pop_est_arr = est_flat.map(item => item.totalpopulation);

var est_trace = { 
               x: year_est_arr,
               y : pop_est_arr,
			   mode : 'lines+markers'
			};

var est_data = [est_trace];
var est_layout = {
		title: "Population Estimates 1985 to "+ yrvalue + ", " + ctyName,
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
		
Plotly.newPlot(ESTIMATE, est_data, est_layout,config);
if(app == 'profile'){
var profileDat2 = document.getElementById('profileDat2');
var profileImg2 = document.getElementById('profileImg2');
profileDat2.onclick = function() {exportToCsv(ctyName, 'estimate', est_flat,0)};
profileImg2.onclick = function() {exportToPng(ctyName, 'estimate', ESTIMATE,0)};
} //profile
}; //end of estPlot

//Forecasts    
function forecastPlot(inData, app, plotdiv,yrvalue,fips,ctyName) {


    const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_pct = d3.format(".0%");
	const fmt_pct1 = d3.format(".1%");
	const fmt_comma = d3.format(",");
	var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs

if(app == "dashboard") {   //This indivates that the call is the dashboard...
var FORECAST = document.getElementById(plotdiv[0]);
FORECAST.innerHTML = "";


//Population Projections  This data is a single Geo by age...
//Rollup
	var columnsFor = ['totalpopulation'];
	var forecast_sum = d3.rollup(inData, v => Object.fromEntries(columnsFor.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);

	var forecast_data = [];
		for (let[key, value] of forecast_sum) {
		   forecast_data.push({'fips' : fips, 'name' : ctyName, 'year' :  key, 'totalpopulation' : value.totalpopulation});
		}


var year_forec_arr =[];
var pop_forec_arr = [];

forec_flat = forecast_data.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
year_forec_arr = forec_flat.map(item => item.year);
pop_forec_arr = forec_flat.map(item => item.totalpopulation);

var forec_trace = { 
               x: year_forec_arr,
               y : pop_forec_arr,
			   mode : 'lines+markers'
			};

var forec_data = [forec_trace];

var forec_layout = {
		title: "Population Projections 2010 to 2050, " + ctyName ,
		  autosize: false,
		  width: 1000,
		  height: 400,
		  xaxis: {
			title : 'Year',
			showgrid: true,
			zeroline: false,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis: {
			title : 'Total Population',
			automargin: true,
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(FORECAST, forec_data, forec_layout,config);

//Output for Age Plot (Current year by age categories...
var AGEPLOT = document.getElementById(plotdiv[1]);

AGEPLOT.innerHTML = "";

//Creating data
var endyr = yrvalue + 10;
var selYr = [yrvalue, endyr];

var popName0 = "Population_" + yrvalue;
var popName1 = "Population_" + endyr;
var agedata =  inData.filter(item => selYr.includes(item.year));
var totaldata = [];
agedata.forEach(function(obj) {
    if(obj.age >=  0 && obj.age <= 17) {obj.age_cat = "0 to 17"; }
    if(obj.age >= 18 && obj.age <= 24) {obj.age_cat = "18 to 24";}
    if(obj.age >= 25 && obj.age <= 44) {obj.age_cat = "25 to 44"; }
    if(obj.age >= 45 && obj.age <= 54) {obj.age_cat = "45 to 54"; }
    if(obj.age >= 55 && obj.age <= 64) {obj.age_cat = "55 to 64"; }
	if(obj.age >= 65 && obj.age <= 74) {obj.age_cat = "65 to 74"; }
	if(obj.age >= 75 && obj.age <= 84) {obj.age_cat = "75 to 84"; }
    if(obj.age >= 85 ) {obj.age_cat = "85 +";}
    totaldata.push({'year' : obj.year, 'age_cat' : obj.age_cat, 'totalpopulation' : obj.totalpopulation});
});

//  Totals
var total_ann = d3.rollup(totaldata, v => d3.sum(v, d => d.totalpopulation), d => d.year);
var total_age = d3.rollup(totaldata, v => d3.sum(v, d => d.totalpopulation), d => d.year, d => d.age_cat);


//Flatten Arrays for output
var total_ann_flat = [];
for (let [key, value] of total_ann) {
  total_ann_flat.push({'year' : key, 'totalpopulation' : value});
    };

var age_idx;
var total_age_flat = [];
for (let [key1, value] of total_age) {
for (let[key2, value2] of value) {
  //Setting index value
   if(key2 == "85 +") {age_idx = 7};
   if(key2 == "0 to 17") {age_idx = 0};
   if(key2 == "18 to 24") {age_idx = 1};
   if(key2 == "25 to 44") {age_idx = 2};
   if(key2 == "45 to 54") {age_idx = 3};
   if(key2 == "55 to 64") {age_idx = 4};
   if(key2 == "65 to 74") {age_idx = 5};
   if(key2 == "75 to 84") {age_idx = 6};
  
   total_age_flat.push({'year' : key1, 'index' : age_idx, 'age_cat' : key2, 'totalpopulation' : value2});
}
}

//calculate percentages for age plot
var agep = total_age_flat.filter(d => d.year == selYr[0]);
var agetotal = total_ann_flat.filter(d => d.year == selYr[0]);
var ageplot = [];
agep.forEach( function(d) {
      ageplot.push({'index' : d.index, 'age_cat' : d.age_cat, 'totalpopulation' : d.totalpopulation, 'percent' : d.totalpopulation/agetotal[0].totalpopulation});
});


var age_arr =[];
var pct_arr = [];

//generate the plot
ageplot_flat = ageplot.sort(function(a, b){ return d3.ascending(a['index'], b['index']); });
age_arr = ageplot_flat.map(item => item.age_cat);
pct_arr = ageplot_flat.map(item => item.percent);


var age_trace = { 
               x: pct_arr,
               y : age_arr,
			   type : 'bar',
			   orientation : 'h'
			};

var age_data = [age_trace];

var age_layout = {
		title: "Population by Age Group " + yrvalue + ", " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400,
		  xaxis: {
			title : 'Percentage',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: ',.0%'
		  },
		  yaxis: {
            autorange : 'reversed',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		}; 
		
Plotly.newPlot(AGEPLOT, age_data, age_layout,config);

//10-year change plot...
var POPCHNG = document.getElementById(plotdiv[2]);

POPCHNG.innerHTML = "";

// Data
total_age_flat = total_age_flat.sort(function(a, b){ return d3.ascending(a['index'], b['index']); });

var agep0 = total_age_flat.filter(d => d.year == selYr[0]);
var agep1 = total_age_flat.filter(d => d.year == selYr[1]);
var popchng = [];
for(i = 0; i < agep0.length; i++){
    popchng.push({ 'index' : agep0[i].index, 'age_cat' : agep0[i].age_cat, 'p0' : agep0[i].totalpopulation, 'p1' : agep1[i].totalpopulation, 
	'pctchng' : ((agep1[i].totalpopulation - agep0[i].totalpopulation)/agep0[i].totalpopulation) });
}

//Adding total change
var total_chng =[];
 total_chng.push({ 'index' : -1, 'age_cat' : 'All Ages', 'p0' : total_ann_flat[0].totalpopulation, 'p1' : total_ann_flat[1].totalpopulation, 
	'pctchng' : ((total_ann_flat[1].totalpopulation - total_ann_flat[0].totalpopulation)/total_ann_flat[0].totalpopulation) });

popchng = total_chng.concat(popchng)


//Plotting
var popchng_pct_arr = [];
var popchng_cat_arr = [];

popchng_flat = popchng.sort(function(a, b){ return d3.ascending(a['index'], b['index']); });
popchng_cat_arr = popchng_flat.map(item => item.age_cat);
popchng_pct_arr = popchng_flat.map(item => item.pctchng);
popchng_pct_fmt = popchng_flat.map(item => fmt_pct(item.pctchng));


var popchng_trace = { 
               x: popchng_pct_arr,
               y : popchng_cat_arr,
			   type : 'bar',
			   orientation : 'h',
			   text: popchng_pct_fmt.map(String),
			  textposition: 'auto',
			  hoverinfo: 'none',
			  marker: {
				color: 'blue',
				opacity: 0.9,
				line: {
				  color: 'blue',
				  width: 1.5
				}
			  }
			};

var popchng_data = [popchng_trace];

var popchng_layout = {
		title: "Projected Population Change by Age Group, " + selYr[0] + " to "+ selYr[1] + ", " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400,
		  xaxis: {
			title : 'Percent Change',
			showgrid: true,
			zeroline: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: ',.0%'
		  },
		  yaxis: {
            autorange : 'reversed',
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  font : { color : 'black' },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 Plotly.newPlot(POPCHNG, popchng_data, popchng_layout,config);
 
 return([forec_flat, ageplot_flat, popchng_flat]);
}  //Dashboard
if(app == "profile") {
	var FORECAST = document.getElementById(plotdiv);
	FORECAST.innerHTML = "";
	
//Population Projections  This data is a single Geo by age...
pgSetup('County', plotdiv,"County Population Forecasts",false,fips, ctyName)
var FORECAST = document.getElementById('PlotDiv3');
//Rollup
	var columnsFor = ['totalpopulation'];
	var forecast_sum = d3.rollup(inData, v => Object.fromEntries(columnsFor.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);

	var forecast_data = [];
		for (let[key, value] of forecast_sum) {
		   forecast_data.push({'fips' : fips, 'name' : ctyName, 'year' :  key, 'totalpopulation' : value.totalpopulation});
		}


var year_forec_arr =[];
var pop_forec_arr = [];

forec_flat = forecast_data.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });
year_forec_arr = forec_flat.map(item => item.year);
pop_forec_arr = forec_flat.map(item => item.totalpopulation);

var forec_trace = { 
               x: year_forec_arr,
               y : pop_forec_arr,
			   mode : 'lines+markers'
			};

var forec_data = [forec_trace];

var forec_layout = {
		title: "Population Projections 2010 to 2050, " + ctyName ,
		  autosize: false,
		  width: 1000,
		  height: 400,
		  xaxis: {
			title : 'Year',
			showgrid: true,
			zeroline: false,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2
		  },
		  yaxis: {
			title : 'Total Population',
			automargin: true,
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(FORECAST, forec_data, forec_layout,config);
var profileDat3 = document.getElementById('profileDat3');
var profileImg3 = document.getElementById('profileImg3');
profileDat3.onclick = function() {exportToCsv(ctyName, 'forecast', forec_flat,0)};
profileImg3.onclick = function() {exportToPng(ctyName, 'forecast', FORECAST,0)};
return([forec_flat]);
}  //profile
}; //forecast plot

//netmigPlot  --Currently a place holder for a net mig by age plot...
function netmigPlot(inData, plotdiv, fips, ctyName) {
 const fmt_date = d3.timeFormat("%B %d, %Y");
 
//Plotting 
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var NETMIG = document.getElementById(plotdiv);

NETMIG.innerHTML = "";

//Net Migration 
var NetMigAge =[];
var NetMig9500 = [];
var NetMig0010 = [];
var NetMig1020 = [];

netmig_flat = inData.sort(function(a, b){ return d3.ascending(parseInt(a['age']), parseInt(b['age'])); });
NetMigAge = netmig_flat.map(item => parseInt(item.age));
NetMig9500 = netmig_flat.map(item => parseInt(item.NetMig9500));
NetMig0010 = netmig_flat.map(item => parseInt(item.NetMig0010));
NetMig1020 = netmig_flat.map(item => parseInt(item.NetMig1020));

//plotting

var NetMig9500_line = { 
               x: NetMigAge,
               y : NetMig9500,
			   name : '1995 to 2000',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'blue',
				  symbol: 'circle',
                  size: 8
                },
			   line : {
					color: 'blue',
					width : 3
				}
			};

var NetMig0010_line = { 
               x: NetMigAge,
               y : NetMig0010,
			   name : '2000 to 2010',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'orange',
				  symbol: 'square',
                  size: 8
                },
			   line : {
					color: 'orange',
					width : 3
				}
			};

var NetMig1020_line = { 
               x: NetMigAge,
               y : NetMig1020,
			   name : '2010 to 2020',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'green',
				  symbol: 'diamond',
                  size: 8
                },
			   line : {
					color: 'green',
					dash : 'dash',
					width : 3
				}
			};
			
var NetMig_data = [NetMig9500_line, NetMig0010_line, NetMig1020_line];

var NetMig_layout = {
		title: "Net Migration by Age -- Net Migrants " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			  title : 'Net Migration',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};

Plotly.newPlot(NETMIG, NetMig_data, NetMig_layout,config);
}; //netmigPlot

//Coc Plot
function cocPlot(inData,app, plotdiv,yrvalue,fips,ctyName) {
	    const fmt_date = d3.timeFormat("%B %d, %Y");

var coc_flat = inData;

//Calculating total population change for coc_flat
for(i = 1; i < coc_flat.length; i++){
    coc_flat[i].popchng = coc_flat[i].totalpopulation - coc_flat[i-1].totalpopulation;
    };

	
//Plotting 
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var COC = document.getElementById(plotdiv);

COC.innerHTML = "";

if(app == 'profile') {
		  pgSetup('County', plotdiv,"County Components of Change",false,fips, ctyName);
		  var COC = document.getElementById('PlotDiv4');
}
//Components of Change
var year_coc_arr =[];
var pop_coc_arr = [];
var birth_coc_arr = [];
var death_coc_arr = [];
var incr_coc_arr = [];
var migr_coc_arr = [];


coc_flat = coc_flat.sort(function(a, b){ return d3.ascending(a['year'], b['year']); });

year_coc_arr = coc_flat.map(item => item.year);
pop_coc_arr = coc_flat.map(item => item.popchng);
birth_coc_arr = coc_flat.map(item => item.births);
death_coc_arr = coc_flat.map(item => item.deaths);
incr_coc_arr = coc_flat.map(item => item.naturalincrease);
migr_coc_arr = coc_flat.map(item => item.netmigration);

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
var coc_data = [coc_trace1, coc_trace2, coc_trace3, coc_trace4]

var coc_layout = {
		title: "Births, Deaths and Net Migration 1985 to " + yrvalue + ", " + ctyName,
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(COC, coc_data, coc_layout,config);	
if(app == 'profile') {
	var profileDat4 = document.getElementById('profileDat4');
	var profileImg4 = document.getElementById('profileImg4');
	profileDat4.onclick = function() {exportToCsv(ctyName, 'coc', coc_flat,0)};
    profileImg4.onclick = function() {exportToPng(ctyName, 'coc', COC,0)};
}
}; //cocplot

//genDEMO outputs Plotly charts for the Demographic Dashboard
function genDEMO(geotype, fips, ctyName, yrvalue){

    const fmt_date = d3.timeFormat("%B %d, %Y");
	const fmt_pct1 = d3.format(".1%");
	const fmt_comma = d3.format(",");
    var endyr = yrvalue + 10;
	var fips_list; 
	
	if(geotype == "region"){
		var fips_tmp = regionCOL(parseInt(fips));
	    fips_list = fips_tmp[0].fips;
		for(i = 0; i < fips_list.length; i++){
			 fips_list[i] = parseInt(fips_list[i]);
		}
	} else {
	if(fips == "000") {
      fips_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
    } else {
		fips_list = [parseInt(fips)];
	};		
	};
//Estimates and components of change chart

	var yr_list = 1985;
	for(i = 1986; i <= yrvalue; i++){
		yr_list = yr_list + "," + i;
	};
	
	var esturl = "https://gis.dola.colorado.gov/lookups/profile?county=" + fips_list + "&year=" + yr_list + "&vars=totalpopulation,births,deaths,naturalincrease,netmigration";
	
//forecasts and age projections
   var forc_yrs = 2010;
   	for(i = 2011; i <= 2050; i++){
		forc_yrs = forc_yrs + "," + i;
	};
		var forcurl = "https://gis.dola.colorado.gov/lookups/sya?county=" + fips_list + "&year=" + forc_yrs + "&choice=single&group=3"


//Net migration by age -- this is net migration by SYA  need to use this in net migr 18-64?
//NEED TO FIND THE SOURCE OF THIS DATA and SEE IF WE CAN USE A DATA SERIES BY AGE
   var netmigurl = "../data/NetMigrationByAgeComparison.csv";


var prom = [d3.json(esturl),d3.json(forcurl),d3.csv(netmigurl)];


Promise.all(prom).then(function(data){

	
//Rollup for region
if(geotype == "region"){
//Estimates
	var columnsEst = ['totalpopulation', 'births', 'deaths', 'naturalincrease','netmigration'];
 	var est_sum =      d3.rollup(data[0], v => Object.fromEntries(columnsEst.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
//Flatten Arrays
	var est_data = [];
	for (let [key, value] of est_sum) {
	  est_data.push({'type' : 'region', 'fips' : parseInt(fips), 'name' : ctyName, 'year' : key, 'totalpopulation' : value.totalpopulation, 
	   'births' : value.births, 'deaths' : value.deaths, 'naturalincrease' : value.naturalincrease, 
	   'netmigration' : value.netmigration});
		}

//Forecast
	var columnsFor = ['totalpopulation'];
	var forecast_sum = d3.rollup(data[1], v => Object.fromEntries(columnsFor.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.age);

	var forecast_data = [];
	for (let [key1, value] of forecast_sum) {
		for (let[key2, value2] of value) {
		   forecast_data.push({'type' : 'region', 'fips' : parseInt(fips), 'name' : ctyName, 'year' : key1, 'age' : key2, 'totalpopulation' : value2.totalpopulation});
		}
	};

//NetMig SEE NOTE ABOVE
var columnsNet = ['NetMig9500',	'NetMig0010', 'NetMig1020'];
var netMig_filt = data[2].filter(d => fips_list.includes(parseInt(d.FIPS)));
var netmig_sum  =  d3.rollup(netMig_filt, v => Object.fromEntries(columnsNet.map(col => [col, d3.sum(v, d => +d[col])])), d => d.FiveYearAgeGroups);

var netmig_data = [];
   for (let [key, value] of netmig_sum) {
	  netmig_data.push({'type' : 'region', 'fips' : parseInt(fips), 'name' : ctyName, 'age' : parseInt(key), 
	        'NetMig9500' : value.NetMig9500, 'NetMig0010' : value.NetMig0010, 'NetMig1020' : value.NetMig1020,});
		}
		
} else {
	if(fips =="000") { //Colorado as a whole
	//estimate
	var columnsEst = ['totalpopulation', 'births', 'deaths', 'naturalincrease','netmigration'];
 	var est_sum =      d3.rollup(data[0], v => Object.fromEntries(columnsEst.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year);
	var est_data = [];
	for (let [key, value] of est_sum) {
	  est_data.push({'type' : 'state', 'fips' : 0, 'name' : 'Colorado', 'year' : key, 'totalpopulation' : value.totalpopulation, 
	   'births' : value.births, 'deaths' : value.deaths, 'naturalincrease' : value.naturalincrease, 
	   'netmigration' : value.netmigration});
		};

	//Forecast
	var columnsFor = ['totalpopulation'];
	var forecast_sum = d3.rollup(data[1], v => Object.fromEntries(columnsFor.map(col => [col, d3.sum(v, d => +d[col])])), d => d.year, d => d.age);

	var forecast_data = [];
	for (let [key1, value] of forecast_sum) {
		for (let[key2, value2] of value) {
		   forecast_data.push({'type' : 'state', 'fips' : 0, 'name' : 'Colorado', 'year' : key1, 'age' : key2, 'totalpopulation' : value2.totalpopulation});
		}
	};	
	//NetMig
	var columnsNet = ['NetMig9500',	'NetMig0010', 'NetMig1020']; 
	var netmig_sum  =  d3.rollup(data[2], v => Object.fromEntries(columnsNet.map(col => [col, d3.sum(v, d => +d[col])])), d => d.FiveYearAgeGroups);

	var netmig_data = [];
	   for (let [key, value] of netmig_sum) {
		  netmig_data.push({'type' : 'region', 'fips' : parseInt(fips), 'name' : ctyName, 'age' : parseInt(key), 
				'NetMig9500' : value.NetMig9500, 'NetMig0010' : value.NetMig0010, 'NetMig1020' : value.NetMig1020,});
			}

	} else {
	var est_data = [];
	for(i = 0; i < data[0].length; i++){
		  est_data.push({'type' : 'county', 'fips' : data[0][i].countyfips, 'name' : countyName(data[0][i].countyfips),
		  'year' : data[0][i].year, 'totalpopulation' : data[0][i].totalpopulation, 
		   'births' : data[0][i].births, 'deaths' : data[0][i].deaths, 'naturalincrease' : data[0][i].naturalincrease, 
		   'netmigration' : data[0][i].netmigration});
		}
	
	var forecast_data = [];
	for (i = 0; i < data[1].length; i++) {
		   forecast_data.push({'type' : 'county', 'fips' : data[1][i].countyfips, 'name' : countyName(data[1][i].countyfips), 'year' : data[1][i].year,
        		   'age' : data[1][i].age, 'totalpopulation' : data[1][i].totalpopulation});
		}

	var columnsNet = ['NetMig9500',	'NetMig0010', 'NetMig1020'];
	var netmig_sum = data[2].filter(d => fips_list.includes(parseInt(d.FIPS)));
    var netmig_data = [];
	   for(i = 0; i < netmig_sum.length; i++) {
		  netmig_data.push({'type' : 'county', 'fips' : parseInt(fips), 'name' : ctyName, 'age' : parseInt(netmig_sum[i].FiveYearAgeGroups), 
				'NetMig9500' : netmig_sum[i].NetMig9500, 'NetMig0010' : netmig_sum[i].NetMig0010, 'NetMig1020' : netmig_sum[i].NetMig1020,});
			}
};
}; 
//Plotting 

var fore_output = ["forec_output","ageest_output", "popchng_output"];

	estPlot(est_data, "dashboard", "County",  "est_output", yrvalue, fips, ctyName);
	
var	fore_Data = forecastPlot(forecast_data, "dashboard", fore_output, yrvalue, fips, ctyName);
	netmigPlot(netmig_data, "mig_output", fips, ctyName);
	cocPlot(est_data, "dashboard","coc_output", yrvalue, fips, ctyName);

//Preparing final datafiles
//Estimates
var est_names = {
	   fips : "FIPS",
	   name : "Location",
	   year : "Year",
	   totalpopulation : "Population Estimate"
       };
 
var est_shift =[];  
for(i = 0; i < est_data.length; i++){
    est_shift.push({ fips : fips,
                     name : ctyName,
					 year : est_data[i].year,
					 totalpopulation : fmt_comma(est_data[i].totalpopulation)
	})
}

var est_out = changeKeyObjects(est_shift, est_names);

//Forecasts
var forecast_names = {
	       fips : 'FIPS',
		   name : 'Location',
		   year : 'Year',
		   totalpopulation : "Population"
         };
		 
var forecast_shift = [];
 for(i = 0; i < fore_Data[0].length; i++){
	 forecast_shift.push({fips : fips,
	                      name : ctyName,
						  year : fore_Data[0][i].year,
						  totalpopulation : fmt_comma(fore_Data[0][i].totalpopulation)
	 });
 }
var forecast_out = changeKeyObjects(forecast_shift,forecast_names);

//Coc
var coc_names = {
	    fips : 'FIPS',
		name : 'Location',
		year : 'Year',
		totalpopulation : 'Total Population',
		births : 'Births',
		death : 'Deaths',
		naturalincrease : 'Natural Increase',
		netmigration : 'Net Migration'
}

var coc_shift = [];
for(i = 0; i < est_data.length; i++){
	coc_shift.push({
		   fips : fips,
		   name : ctyName,
		   year : est_data[i].year,
		   totalpopulation : fmt_comma(est_data[i].totalpopulation),
		   births : fmt_comma(est_data[i].births),
		   deaths : fmt_comma(est_data[i].deaths),
           naturalincrease : fmt_comma(est_data[i].naturalincrease),
		   netmigration : fmt_comma(est_data[i].netmigration)
	})
}	
var coc_out = changeKeyObjects(coc_shift,coc_names);
	
//Netmig 
var netmig_names = {
			fips : "FIPS",
			loc : "Location",
	        age : "Age Group",
			NetMig9500 : "Net Migration 1995-2000",
			NetMig0010 : "Net Migration 2000 -2010",
			NetMig1020 : "Net Migration 2010-2020"
		}
var netmig_shift = [];
for(i = 0; i < netmig_data.length; i++){
    netmig_shift.push({ fips : fips,
	                    loc : ctyName,
	                    age : netmig_data[i].age,
						NetMig9500 : fmt_comma(netmig_data[i].NetMig9500),
						NetMig0010 : fmt_comma(netmig_data[i].NetMig0010),
						NetMig1020 : fmt_comma(netmig_data[i].NetMig1020)
	})
	}
	var netmig_out = changeKeyObjects(netmig_shift, netmig_names);
	
//Age change

 var agedata_names = {
	        fips : "FIPS",
			loc : "Location",
	        age_cat : "Age Group",
			totalpopulation : "Total Population " + yrvalue,
            percent : "Percent"
			};
 
var agedata_shift =[];
for(i = 0; i < fore_Data[1].length; i++){
	agedata_shift.push({ fips : fips,
	                     loc : ctyName,
	                     age_cat : fore_Data[1][i].age_cat,
	                     totalpopulation : fmt_comma(fore_Data[1][i].totalpopulation),
	                     percent : fmt_pct1(fore_Data[1][i].percent) 
						 });
};

 var agedata_out  = changeKeyObjects(agedata_shift, agedata_names);
 
//Popchng
 var popchng_names = {
	        fips : "FIPS",
			loc : "Location",
	        age_cat : "Age Group",
			p0 : "Population " + yrvalue,
			p1 : "Population " + endyr,
            pctchng : "Percent Change"
			};


 var popchng_shift = [];
 for(i = 0; i < fore_Data[2].length;  i++){
	 popchng_shift.push({
		               fips : fips,
					   loc : ctyName,
		               age_cat : fore_Data[2][i].age_cat,
	                   p0 : fmt_comma(fore_Data[2][i].p0),
					   p1 : fmt_comma(fore_Data[2][i].p1),
	                   pctchng: (fore_Data[2][i].pctchng < 0) ? "-" + fmt_pct1(fore_Data[2][i].pctchng * -1) : fmt_pct1(fore_Data[2][i].pctchng)
	 })
 };
 
 var popchng_out = changeKeyObjects(popchng_shift,popchng_names);
 
//Download trigger events
//Generating DOM links
var ESTIMATE = document.getElementById("est_output");
var FORECAST = document.getElementById("forec_output")
var AGEPLOT = document.getElementById("ageest_output");
var POPCHNG = document.getElementById("popchng_output");
var NETMIG = document.getElementById("mig_output");
var COC = document.getElementById("coc_output");

//Estimates
var est_csv = document.getElementById('est_csv');
var est_png = document.getElementById('est_png');
est_csv.onclick = function() {
	  exportToCsv(ctyName, 'estimate', est_out,0);
     }; 
est_png.onclick = function() {
	   exportToPng(ctyName, 'estimate', ESTIMATE,0);
     };
	 
//Forecasts
var forec_csv = document.getElementById('forec_csv');
var forec_png = document.getElementById('forec_png');
forec_csv.onclick = function() {
	  exportToCsv(ctyName, 'forecast', forecast_out,0);
     }; 
forec_png.onclick = function() {
	   exportToPng(ctyName, 'forecast', FORECAST,0);
     };
	 
//Components of Change
var coc_csv = document.getElementById('coc_csv');
var coc_png = document.getElementById('coc_png');
coc_csv.onclick = function() {
	  exportToCsv(ctyName, 'coc', coc_out,0);
     }; 
coc_png.onclick = function() {
	   exportToPng(ctyName, 'coc', COC,0);
     };
	 
//Net Migration
var mig_csv = document.getElementById('mig_csv');
var mig_png = document.getElementById('mig_png');
mig_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmig', netmig_out,0);
     }; 
mig_png.onclick = function() {
	   exportToPng(ctyName, 'netmig', NETMIG,0);
     };
	 
//Age

var age_csv = document.getElementById('age_csv');
var age_png = document.getElementById('age_png');
age_csv.onclick = function() {
	  exportToCsv(ctyName, 'age', agedata_out,0);
     }; 
age_png.onclick = function() {
	   exportToPng(ctyName, 'age', AGEPLOT,0);
     };
	 
//popchng
var popchng_csv = document.getElementById('popchng_csv');
var popchng_png = document.getElementById('popchng_png');
popchng_csv.onclick = function() {
	  exportToCsv(ctyName, 'popchng', popchng_out,0);
     }; 
popchng_png.onclick = function() {
	   exportToPng(ctyName, 'popchng', POPCHNG,0);
     };
}); //end of promise
} //end of genDEMO

//genRACEVIS Generates the Race/Ethncity visualization
function genRACEVIS(geotype, fips,ctyName, yrvalue) {
	const fmt_comma = d3.format(",");
    const fmt_date = d3.timeFormat("%B %d, %Y");
	//Verifying if region is input
	
	if(RegionNum(ctyName) == 0) {
		geotype == 'county'
	}


//Specify fips_list
 var fips_list; 
	
	if(geotype == "region"){
		var fips_tmp = regionCOL(parseInt(fips));
	    fips_list = fips_tmp[0].fips;
		for(i = 0; i < fips_list.length; i++){
			 fips_list[i] = parseInt(fips_list[i]);
		}
	} else {
	if(fips == "000") {
      fips_list = [1,3,5,7,9,11,13,14,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,113,115,117,119,121,123,125];
    } else {
		fips_list = [parseInt(fips)];
	};		
	};
   
//extract year value 
 
var age_list = "0";
for(i = 1; i<= 100; i++){
   age_list = age_list + "," + i;
  };
  
 
//estimates urls
urlstr_hispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yrvalue +"&race=1,2,3,4&ethnicity=1&sex=b";
urlstr_nonhispest = "https://gis.dola.colorado.gov/lookups/sya-race-estimates?age="+ age_list + "&county="+ fips_list +"&year="+ yrvalue +"&race=1,2,3,4&ethnicity=2&sex=b";

//Promise Structure
var prom = [d3.json(urlstr_hispest),d3.json(urlstr_nonhispest)];

Promise.all(prom).then(function(data){
	var hisp_est = [];
    var nonhisp_est = [];

	
if(fips == "000") {	
	data[0].forEach(obj => {
		 hisp_est.push({'fips' : 0,'year' : obj.year, 'age' : parseInt(obj.age), 'sex' : obj.sex, 'population' : parseInt(obj.count)}); 
	    });
    data[1].forEach(obj => {
		nonhisp_est.push({'fips' : 0, 'year' : obj.year, 'age' : parseInt(obj.age),'sex' : obj.sex, 'race' : obj.race, 'population' : parseInt(obj.count)}); 
	    });
} else {
	data[0].forEach(obj => {
		 hisp_est.push({'fips' : obj.county_fips,'year' : obj.year, 'age' : parseInt(obj.age), 'sex' : obj.sex, 'population' : parseInt(obj.count)}); 
	    });
    data[1].forEach(obj => {
		nonhisp_est.push({'fips' : obj.county_fips, 'year' : obj.year, 'age' : parseInt(obj.age),'sex' : obj.sex, 'race' : obj.race, 'population' : parseInt(obj.count)}); 
	    });
};

//Rolling up the hispanic and non-hispanic datasets
var hisp_total = d3.rollup(hisp_est, v => d3.sum(v, d => d.population), d => d.fips, d => d.age);
var nonhisp_total = d3.rollup(nonhisp_est, v => d3.sum(v, d => d.population), d => d.fips,  d => d.age, d=> d.race);
	
//Flattening the datasets
var hisp_flat = [];
for (let [key, value] of hisp_total) {
for (let[key2, value2] of value) {
        hisp_flat.push({'fips' : key, 'name' : countyName(key), 'age' : key2, 'race_eth' : 'Hispanic',  'population' : value2});
    }
}
var nonhisp_flat = [];
for (let [key, value] of nonhisp_total) {
for (let[key2, value2] of value) {
for (let[key3, value3] of value2) { 
   nonhisp_flat.push({'fips' : key, 'name' : countyName(key), 'age' : key2, 'race_eth' : key3 + ' NH', 'population' : value3});
}
}
}

var race_flat = hisp_flat.concat(nonhisp_flat).sort(function(a, b){ return d3.ascending(a['race_eth'], b['race_eth']); })
                .sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
				.sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });

if(geotype == 'region') {
	var race_reg = d3.rollup(race_flat, v => d3.sum(v, d => d.population),  d => d.age, d=> d.race_eth);
	var race_flat = [];
	for (let [key, value] of race_reg) {
	for (let[key2, value2] of value) {
        race_flat.push({'fips' : -101, 'name' : ctyName, 'age' : key, 'race_eth' : key2,  'population' : value2});
    }
    }

	var race_flat = race_flat.sort(function(a, b){ return d3.ascending(a['race_eth'], b['race_eth']); })
                .sort(function(a, b){ return d3.ascending(a['age'], b['age']); })
				.sort(function(a, b){ return d3.ascending(a['fips'], b['fips']); });
};


//Plotting 
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var LINE = document.getElementById("line_output");
var WHITE = document.getElementById("white_output");
var HISPANIC = document.getElementById("hisp_output");
var BLACK = document.getElementById("black_output");
var ASIAN = document.getElementById("asian_output");
var AMIND = document.getElementById("amind_output");
LINE.innerHTML = "";
WHITE.innerHTML = "";
HISPANIC.innerHTML = "";
BLACK.innerHTML = "";
ASIAN.innerHTML = "";
AMIND.innerHTML = "";

//line chart

var age_line_arr_w = [];
var pop_line_arr_w = [];
var age_line_arr_h = [];
var pop_line_arr_h = [];
var age_line_arr_b = [];
var pop_line_arr_b = [];
var age_line_arr_as = [];
var pop_line_arr_as = [];
var age_line_arr_ai = [];
var pop_line_arr_ai = [];

for(i = 0; i < race_flat.length; i++){
	if(race_flat[i].race_eth == "White NH" && race_flat[i].age < 85){
		age_line_arr_w.push(race_flat[i].age);
		pop_line_arr_w.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "Hispanic" && race_flat[i].age < 85){
		age_line_arr_h.push(race_flat[i].age);
		pop_line_arr_h.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "Black NH" && race_flat[i].age < 85){
		age_line_arr_b.push(race_flat[i].age);
		pop_line_arr_b.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "Asian/Pacific Islander NH" && race_flat[i].age < 85){
		age_line_arr_as.push(race_flat[i].age);
		pop_line_arr_as.push(race_flat[i].population);
	};
	if(race_flat[i].race_eth == "American Indian NH" && race_flat[i].age < 85){
		age_line_arr_ai.push(race_flat[i].age);
		pop_line_arr_ai.push(race_flat[i].population);
	};
};

var white_line = { 
               x: age_line_arr_w,
               y : pop_line_arr_w,
			   name : 'White, NH',
			   mode : 'lines', 
			   line : {
					color: 'blue',
					width : 3
				}
			};

var hisp_line = { 
               x: age_line_arr_h,
               y : pop_line_arr_h,
			   name : 'Hispanic',
			   mode : 'lines', 
			   line : {
					color: 'orange',
					width : 3
				}
			};

var black_line = { 
               x: age_line_arr_b,
               y : pop_line_arr_b,
			   name : 'Black, NH',
			   mode : 'lines', 
			   line : {
					color: 'green',
					width : 3
				}
			};

var asian_line = { 
               x: age_line_arr_as,
               y : pop_line_arr_as,
			   name : 'Asian/Pacific Islander, NH',
			   mode : 'lines', 
			   line : {
					color: 'red',
					width : 3
				}
			};
			
var amind_line = { 
               x: age_line_arr_ai,
               y : pop_line_arr_ai,
			   name : 'American Indian, NH',
			   mode : 'lines', 
    		   line : {
					color: 'purple',
					width : 3
				}
			};
			
//Traces for Barcharts
var white_bar = { 
               x: age_line_arr_w,
               y : pop_line_arr_w,
			   type : 'bar',
			   marker : { color: 'blue' }
			};

var hisp_bar = { 
               x: age_line_arr_h,
               y : pop_line_arr_h,
			   type : 'bar',
			   marker : { color : 'orange'}
			};

var black_bar = { 
               x: age_line_arr_b,
               y : pop_line_arr_b,
			   type : 'bar',
			   marker : { color: 'green' }
			};

var asian_bar = { 
               x: age_line_arr_as,
               y : pop_line_arr_as,
			   type : 'bar',
			   marker : { color : 'red' }
			};
			
var amind_bar = { 
               x: age_line_arr_ai,
               y : pop_line_arr_ai,
			   type : 'bar',
			   marker : { color : 'purple' }
			};
			
var line_data = [white_line, hisp_line, black_line, asian_line, amind_line];
var white_trace = [white_bar];
var hisp_trace = [hisp_bar];
var black_trace = [black_bar];
var asian_trace = [asian_bar];
var amind_trace = [amind_bar];

var line_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(LINE, line_data, line_layout,config);

var white_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " White, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(WHITE, white_trace, white_layout,config);

var hisp_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " Hispanic",
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(HISPANIC, hisp_trace, hisp_layout,config);

var black_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " Black, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(BLACK, black_trace, black_layout,config);

var asian_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " Asian/Pacific Islander, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(ASIAN, asian_trace, asian_layout,config);

var amind_layout = {
		title: "Single Year of Age by Race/Ethnicity: " + ctyName + ", " + yrvalue + " American Indian, NH",
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
Plotly.newPlot(AMIND, amind_trace, amind_layout,config);

//Download trigger events
// Make race_flat wide
var race_wide = restructureRace(race_flat);

//Line Chart
var line_csv = document.getElementById('line_csv');
var line_png = document.getElementById('line_png');
line_csv.onclick = function() {
	  exportToCsv(ctyName, 'line', race_wide, yrvalue);
     }; 
line_png.onclick = function() {
	   exportToPng(ctyName, 'line', LINE, yrvalue);
     };
	 
//WhiteChart
var white_csv = document.getElementById('white_csv');
var white_png = document.getElementById('white_png');
white_csv.onclick = function() {
	  exportToCsv(ctyName, 'white', race_flat.filter(function(d) {return d.race_eth == "White NH";}), yrvalue);
     }; 
white_png.onclick = function() {
	   exportToPng(ctyName, 'white', WHITE, yrvalue);
     };
	 
//Hispanic Chart
var hisp_csv = document.getElementById('hisp_csv');
var hisp_png = document.getElementById('hisp_png');
hisp_csv.onclick = function() {
	  exportToCsv(ctyName, 'hisp', race_flat.filter(function(d) {return d.race_eth == "Hispanic";}), yrvalue);
     }; 
hisp_png.onclick = function() {
	   exportToPng(ctyName, 'hisp', HISPANIC,yrvalue);
     };
	 
//Black Chart
var black_csv = document.getElementById('black_csv');
var black_png = document.getElementById('black_png');
black_csv.onclick = function() {
	  exportToCsv(ctyName, 'black', race_flat.filter(function(d) {return d.race_eth == "Black NH";}), yrvalue);
     }; 
black_png.onclick = function() {
	   exportToPng(ctyName, 'black', BLACK,yrvalue);
     };
	 

//asian Chart
var asian_csv = document.getElementById('asian_csv');
var asian_png = document.getElementById('asian_png');
asian_csv.onclick = function() {
	  exportToCsv(ctyName, 'asian', race_flat.filter(function(d) {return d.race_eth == "Asian NH";}), yrvalue);
     }; 
asian_png.onclick = function() {
	   exportToPng(ctyName, 'asian', ASIAN,yrvalue);
     };
	 
//Amind Chart
var amind_csv = document.getElementById('amind_csv');
var amind_png = document.getElementById('amind_png');
amind_csv.onclick = function() {
	  exportToCsv(ctyName, 'amind', race_flat.filter(function(d) {return d.race_eth == "American Indiam NH";}), yrvalue);
     }; 
amind_png.onclick = function() {
	   exportToPng(ctyName, 'amind', AMIND,yrvalue);
     };
}); //End of Promise
}; //end of genRaceVis

//genNETMIGCOMP generates the Net Migration Comparison charts 
//Uses data from NetMigrationByAgeComparison Must be updated after Census 2020 is available

function genNETMIGCOMP(fips, ctyName, yrvalue) {
	 const fmt_date = d3.timeFormat("%B %d, %Y");

	var fipsNum = parseInt(fips);

//Reading Raw data
var data_csv = "../data/NetMigrationByAgeComparison.csv";
d3.csv(data_csv).then(function(data){
  var datafilt = data.filter(function(d) {return d.FIPS == fipsNum;});
  var NetMigAge = [];
  var NetMig9500 = [];
  var NetMig0010 = [];
  var NetMig1020 = [];
  var Rate9500 = [];
  var Rate0010 = [];
  var Rate1020 = [];

  datafilt.forEach(function(obj) {
	  NetMigAge.push(Number(obj.FiveYearAgeGroups));
	  NetMig9500.push(Number(obj.NetMig9500));
	  NetMig0010.push(Number(obj.NetMig0010));
	  NetMig1020.push(Number(obj.NetMig1020));
	  Rate9500.push(Number(obj.Rate9500) * 1000);
	  Rate0010.push(Number(obj.Rate0010) * 1000);
	  Rate1020.push(Number(obj.Rate1020) * 1000);
  });
  
var NetMig9500_line = { 
               x: NetMigAge,
               y : NetMig9500,
			   name : '1995 to 2000',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'blue',
				  symbol: 'circle',
                  size: 8
                },
			   line : {
					color: 'blue',
					width : 3
				}
			};

var NetMig0010_line = { 
               x: NetMigAge,
               y : NetMig0010,
			   name : '2000 to 2010',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'orange',
				  symbol: 'square',
                  size: 8
                },
			   line : {
					color: 'orange',
					width : 3
				}
			};

var NetMig1020_line = { 
               x: NetMigAge,
               y : NetMig1020,
			   name : '2010 to 2020',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'green',
				  symbol: 'diamond',
                  size: 8
                },
			   line : {
					color: 'green',
					dash : 'dash',
					width : 3
				}
			};
			
var NetMig_trace = [NetMig9500_line, NetMig0010_line, NetMig1020_line];

var Rate9500_line = { 
               x: NetMigAge,
               y : Rate9500,
			   name : '1995 to 2000',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'blue',
				  symbol: 'circle',
                  size: 8
                },
			   line : {
					color: 'blue',
					width : 3
				}
			};

var Rate0010_line = { 
               x: NetMigAge,
               y : Rate0010,
			   name : '2000 to 2010',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'orange',
				  symbol: 'square',
                  size: 8
                },
			   line : {
					color: 'orange',
					width : 3
				}
			};

var Rate1020_line = { 
               x: NetMigAge,
               y : Rate1020,
			   name : '2010 to 2020',
			   mode : 'lines+markers', 
			    marker: {
                  color: 'green',
				  symbol: 'diamond',
                  size: 8
                },
			   line : {
					color: 'green',
					dash : 'dash',
					width : 3
				}
			};
			
var Rate_trace = [Rate9500_line, Rate0010_line, Rate1020_line];

var NetMig_layout = {
		title: "Net Migration by Age -- Net Migrants " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			  title : 'Net Migration',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
 
 var Rate_layout = {
		title: "Net Migration by Age -- Rates " + ctyName,
		  autosize: false,
		  width: 1000,
		  height: 400, 
		  xaxis: {
			title : 'Age',
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
			  title : 'Net Migration Rate (per 1,000 Population)',
			  automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat:  '.2f'
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
		
var config = {responsive: true,
              displayModeBar: false};
//Clearing out divs
var NETMIG = document.getElementById("netmign_output");
var NETMIGRATE = document.getElementById("netmigrrate_output");

NETMIG.innerHTML = "";
NETMIGRATE.innerHTML = "";

Plotly.newPlot(NETMIG, NetMig_trace, NetMig_layout,config);
Plotly.newPlot(NETMIGRATE, Rate_trace, Rate_layout,config);


//Button Events
//Net Migration Chart
var netmign_csv = document.getElementById('netmign_csv');
var netmign_png = document.getElementById('netmign_png');
netmign_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmign', datafilt, 0);
     }; 
netmign_png.onclick = function() {
	   exportToPng(ctyName, 'netmign', NETMIG, 0);
     };
	 
// Net Migration Rate
var netmigrrate_csv = document.getElementById('netmigrrate_csv');
var netmigrrate_png = document.getElementById('netmigrrate_png');
netmigrrate_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmigrrate', datafilt, 0);
     }; 
netmigrrate_png.onclick = function() {
	   exportToPng(ctyName, 'netmigrrate', NETMIGRATE, 0);
     };
	 

}); //End of d3.csv
} //end of genNETMIGCOMP


//genNETMIG1864 Historical NetMigration charts, inclusing working age population was net_mig 1864
//Uses data from netmig_1864x Must be updated after Census 2020 is available
function genNETMIG1864(fipsVal, ctyName, ageSeries, chartType, yrvalue){

const fmt_date = d3.timeFormat("%B %d, %Y");

var data_csv = "../data/netmig_1864x.csv";

	
//Building Chart Title and filename

var titStr = "Net Migration by Year: ";

if(ctyName.length == 1) {
	titStr = titStr + ctyName[0];
   } else { 
	   for (i = 0; i < ctyName.length; i++){
		 if(i == (ctyName.length -1)){
			 titStr = titStr + " and " + ctyName[i];
		 } else {
		if (ctyName.length == 2){
			titStr = titStr +  ctyName[i] + " ";
		} else {
          titStr = titStr +  ctyName[i] + ", ";
		 }
       }
	   }
   }; 
   
//Creating second line of title
if(ageSeries == "ageall"){	   
	 var titStrTot = titStr + "<br>Total Population Counts";
	 var  titStrRate = titStr + "<br>Total Population Rate per 100";
	} else {
		var titStrTot = titStr + "<br>Working Age Population Counts (Age 18-64)";
		var titStrRate = titStr + "<br>Working Age Population Rate per 100 (Age 18-64)";
	};


	
d3.csv(data_csv).then(function(data){
	var tot_trace = [];
	var rate_trace = [];

	if(fipsVal.length == 1) {
		var datafilt = data.filter(function(d,i) {return d.fips == fipsVal[0];});
	} else {
		var datafilt = data.filter(function(d,i) {return fipsVal.indexOf(d.fips)  >= 0;});
	};


		for(i = 0; i < fipsVal.length; i++) {
			var datafilt_multi = datafilt.filter(function(d) {return d.fips == fipsVal[i];});
			var xDataYear = [];
			var yDataTot = [];
			var yDataRate = [];
			for(j = 0; j < datafilt_multi.length; j++) {
			  if(ageSeries == 'age1864'){
				  if(datafilt_multi[j].year >= 1990){
				   xDataYear.push(Number(datafilt_multi[j].year));
				   yDataTot.push(Number(datafilt_multi[j].netmigration_1864));
				   yDataRate.push(Number(datafilt_multi[j].rate_1864));
				  }
				} else {  
				  xDataYear.push(Number(datafilt_multi[j].year));
				  yDataTot.push(Number(datafilt_multi[j].netmigration_total));
				  yDataRate.push(Number(datafilt_multi[j].rate_total));
			};
			};

if(chartType == 'bar'){
		var tot_tmp = { 
					   x: xDataYear,
					   y :  yDataTot,
					   name : ctyName[i],
					   type : 'bar'
					};
		var rate_tmp = { 
					   x: xDataYear,
					   y : yDataRate,
					   name : ctyName[i],
					   type : 'bar'
					};			
	} else {
		var tot_tmp = { 
					   x: xDataYear,
					   y : yDataTot,
					   name : ctyName[i],
					   mode : 'lines+markers'
					};
		var rate_tmp = { 
					   x: xDataYear,
					   y : yDataRate,
					   name : ctyName[i],
					   mode : 'lines+markers'
					};			
};

tot_trace.push(tot_tmp);
rate_trace.push(rate_tmp);
};


	


//Generating Chart	
var config = {responsive: true,
              displayModeBar: false};
			  
	
//Clearing out Divs
var NETMIGTOT = document.getElementById("netmigtot_output");
var NETMIGRATE = document.getElementById("netmigrrate_output");

NETMIGTOT.innerHTML = "";
NETMIGRATE.innerHTML = "";

var tot_layout = {
		title: titStrTot,
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
			  title : 'Persons',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};


var rate_layout = {
		title: titStrRate,
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
			  title : 'Rate per 100 Persons',
			  automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			 tickformat:  '.2f'
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
		//Chart Call

Plotly.newPlot(NETMIGTOT, tot_trace, tot_layout, config);
Plotly.newPlot(NETMIGRATE, rate_trace, rate_layout, config);

//Button Events
//Net Migration Chart

var netmigwa_csv = document.getElementById('netmigwa_csv');
var netmigwa_png = document.getElementById('netmigwa_png');
netmigwa_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmigwa', datafilt, 0);
     }; 
netmigwa_png.onclick = function() {
	   exportToPng(ctyName, 'netmigwa', NETMIGTOT, 0);
     };
	 
// Net Migration Rate

var netmigrwa_csv = document.getElementById('netmigrwa_csv');
var netmigrwa_png = document.getElementById('netmigrwa_png');
netmigrwa_csv.onclick = function() {
	  exportToCsv(ctyName, 'netmigrwa', datafilt, 0);
     }; 
netmigrwa_png.onclick = function() {
	   exportToPng(ctyName, 'netmigrwa', NETMIGRATE, 0);
     };
	 
}); //end of d3 csv
}; // end of genNETMIGWA

//genCOCHIST generates long-term COC charts
function genCOCHIST(fipsVal, ctyName) {
const fmt_date = d3.timeFormat("%B %d, %Y");

//Generating urls
var ctyfips  = parseInt(fipsVal);
var yrlist = 1970;
for(i = 1971; i <= 2050; i++){
	yrlist = yrlist + "," + i;
};

if(fipsVal == "000") {
	 var dataurl = 'https://gis.dola.colorado.gov/lookups/components_region?reg_num=' + ctyfips + '&year=' + yrlist;
} else {
	var dataurl = 'https://gis.dola.colorado.gov/lookups/components?county=' + ctyfips + '&year=' + yrlist;
}
var year_est = [];
var year_forc = [];
var birth_est = [];
var birth_forc = [];
var death_est = [];
var death_forc = [];
var mig_est = [];
var mig_forc = [];
var out_data = [];

d3.json(dataurl).then(function(data){
	   for(i = 0; i < data.length; i++){
		   out_data.push({'Year' : data[i].year, 'County' : ctyName, 'Births' : Number(data[i].births), 'Deaths' : Number(data[i].deaths), 
		                  'Net Migration' : Number(data[i].netmig), 'Data Type' : data[i].datatype});
		   if(data[i].datatype == "Estimate"){
			year_est.push(data[i].year);
		    birth_est.push(Number(data[i].births));
			death_est.push(Number(data[i].deaths));
			mig_est.push(Number(data[i].netmig));
		   } else {
			year_forc.push(data[i].year);
		    birth_forc.push(Number(data[i].births));
			death_forc.push(Number(data[i].deaths));
			mig_forc.push(Number(data[i].netmig));
		   };
	   };
//Traces
var birth_tmp1 = { 
					   x: year_est,
					   y : birth_est,
					   name : 'Estimate',
					   mode : 'lines',
					   line: {
						dash: 'solid',
						color : 'black',
						width: 3
						}
					};

var birth_tmp2 = { 
					   x: year_forc,
					   y : birth_forc,
					   name : 'Forecast',
					   mode : 'lines',
					   line: {
						dash: 'dash',
						color : 'black',
						width: 3
						}
					};
var birth_trace = [birth_tmp1, birth_tmp2];

var death_tmp1 = { 
					   x: year_est,
					   y : death_est,
					   name : 'Estimate',
					   mode : 'lines',
					   line: {
						dash: 'solid',
						color : 'grey',
						width: 3
						}
					};

var death_tmp2 = { 
					   x: year_forc,
					   y : death_forc,
					   name : 'Forecast',
					   mode : 'lines',
					   line: {
						dash: 'dash',
						color : 'grey',
						width: 3
						}
					};
var death_trace = [death_tmp1, death_tmp2];

var mig_tmp1 = { 
					   x: year_est,
					   y : mig_est,
					   name : 'Estimate',
					   mode : 'lines',
					   line: {
						dash: 'solid',
						color : 'green',
						width: 3
						}
					};

var mig_tmp2 = { 
					   x: year_forc,
					   y : mig_forc,
					   name : 'Forecast',
					   mode : 'lines',
					   line: {
						dash: 'dash',
						color : 'green',
						width: 3
						}
					};
var mig_trace = [mig_tmp1, mig_tmp2];

//Generating Chart	
var config = {responsive: true,
              displayModeBar: false};
			  
	
//Clearing out Divs
var BIRTH = document.getElementById("birth_output");
var DEATH = document.getElementById("death_output");
var MIG = document.getElementById("netmig_output");

BIRTH.innerHTML = "";
DEATH.innerHTML = "";
MIG.innerHTML = "";

var birth_layout = {
		title: "Birth Estimate and Forecast " + ctyName,
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
			  title : 'Persons',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
		
var death_layout = {
		title: "Death Estimate and Forecast " + ctyName,
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
			  title : 'Persons',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
		
var mig_layout = {
		title: "Net Migration Estimate and Forecast " + ctyName,
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
			  title : 'Persons',
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
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
		

Plotly.newPlot(BIRTH, birth_trace, birth_layout, config);
Plotly.newPlot(DEATH, death_trace, death_layout, config);
Plotly.newPlot(MIG, mig_trace, mig_layout, config);

//Button Events
//Net Migration Chart

var birth_csv = document.getElementById('birth_csv');
var birth_png = document.getElementById('birth_png');
birth_csv.onclick = function() {
	  exportToCsv(ctyName, 'nethist', out_data, 0);
     }; 
birth_png.onclick = function() {
	   exportToPng(ctyName, 'birth', BIRTH, 0);
     };
	 

var death_csv = document.getElementById('death_csv');
var death_png = document.getElementById('death_png');
death_csv.onclick = function() {
	  exportToCsv(ctyName, 'nethist', out_data, 0);
     }; 
death_png.onclick = function() {
	   exportToPng(ctyName, 'death', DEATH, 0);
     };
	 
var mig_csv = document.getElementById('netmig_csv');
var mig_png = document.getElementById('netmig_png');
mig_csv.onclick = function() {
	  exportToCsv(ctyName, 'nethist', out_data, 0);
     }; 
mig_png.onclick = function() {
	   exportToPng(ctyName, 'mig', MIG, 0);
     };
	 
}); //end of d3 json
}; //end of genCOCHIST

//genHOUSEDASH Housing Dashboard

//genHOUSEAGE  Household forecast by age and hh type
function genHOUSEAGE(fipsVal,ctyName, varType, seriesType){
	const fmt_date = d3.timeFormat("%B %d, %Y");

	var fips_list = parseInt(fipsVal);

   var yr_trace = [2010];

 	var yr_list = 2010;
	for(i = 2011; i <= 2050; i++){
		yr_list = yr_list + "," + i;
		yr_trace.push(Number(i));
	};


var urlstr = "https://gis.dola.colorado.gov/lookups/household?county="+ fips_list + "&year=" + yr_list + "&age=0,1,2,3,4&household=0,1,2,3,4";


var dataplot = [];
var datahh = [];
var dataage = [];
var hh_arr = ["All Households", "One adult with no children", "One adult with children", "More than one adult with no children", "More than one adult with children"]
var age_arr = ["Total", "18-24", "25-44", "45-64","65 and Older"]
d3.json(urlstr).then(function(data){
   data.forEach(function(obj) {
    obj.household = hh_arr[obj.household_type_id];
    obj.age = age_arr[obj.age_group_id];
    dataplot.push({'year' : obj.year, 'household' : obj.household, 'age' : obj.age, 'total_households' : Number(obj.total_households)});
 });
 //Calculating Age by Housing Type percentage

for(i = 2010; i <= 2050;i++){
	var tmp = dataplot.filter(function(d) {return d.year == i;});

	for(j = 0; j < 5;j++){
		var tmp2 = tmp.filter(function(d) {return d.household == hh_arr[j];});
		for(k = 0; k < tmp2.length; k++){
			if(tmp2[k].age == age_arr[0]) {
			  var base_total = tmp2[k].total_households;
			} else {
			  var age_pct = tmp2[k].total_households/base_total;
			  datahh.push({'year' : tmp2[k].year, 'household' : tmp2[k].household, 'age' : tmp2[k].age, 'total_households' : Math.round(tmp2[k].total_households), 'age_pct' : age_pct});
		};
		};
    };
};

 //Calculating Housing Type by Age Group percentage

for(i = 2010; i <= 2050;i++){
	var tmp = dataplot.filter(function(d) {return d.year == i;});

	for(j = 0; j < 5;j++){
		var tmp2 = tmp.filter(function(d) {return d.age == age_arr[j];});
		for(k = 0; k < tmp2.length; k++){
			if(tmp2[k].household == hh_arr[0]) {
			  var base_total = tmp2[k].total_households;
			} else {
			  var hh_pct = tmp2[k].total_households/base_total;
			  dataage.push({'year' : tmp2[k].year, 'household' : tmp2[k].household, 'age' : tmp2[k].age, 'total_households' : Math.round(tmp2[k].total_households), 'hh_pct' : hh_pct});
		};
		};
    };
};

//Preparing charts

var tr_0 = [];  //These are the individual traces
var tr_1 = [];
var tr_2 = [];
var tr_3 = [];
var tr_4 = [];

var ch_0 = [];  //These are the chart traces 5 lines per chart
var ch_1 = [];
var ch_2 = [];
var ch_3 = [];
var ch_4 = [];

if(varType == "hhold") { //Age by HH
for(i = 0; i < hh_arr.length; i++){
	for(j = 1; j < age_arr.length; j++) {
		var tmphh = datahh.filter(function(d) {return d.household == hh_arr[i] && d.age == age_arr[j];});
		var yData = [];
		for(k = 0; k < tmphh.length; k++){
			if(seriesType == "num"){
		       yData.push(tmphh[k].total_households);
			} else {
		       yData.push(tmphh[k].age_pct);
			};	
		};	

	if(j == 0){
   	tr_0 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 1){
   	tr_1 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 2){
   	tr_2 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};	
	if(j == 3){
   	tr_3 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 4){
   	tr_4 = {x: yr_trace,
			y :  yData,
			name : age_arr[j],
			mode : 'lines+markers'
			};
	};
   	} //J loop
	//Making the compined Traces
	if(i == 0) { ch_0 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 1) { ch_1 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 2) { ch_2 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 3) { ch_3 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 4) { ch_4 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
} //I Loop
} else {  //HH by Age
	for(i = 0; i < age_arr.length; i++){
	for(j = 1; j < hh_arr.length; j++) {
		
		var tmpage = dataage.filter(function(d) {return d.household == hh_arr[j] && d.age == age_arr[i];});
		var yData = [];
		for(k = 0; k < tmpage.length; k++){
			if(seriesType == "num"){
		       yData.push(tmpage[k].total_households);
			} else {
		       yData.push(tmpage[k].hh_pct);
			};	
		};	

	if(j == 0){
   	tr_0 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 1){
   	tr_1 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 2){
   	tr_2 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};	
	if(j == 3){
   	tr_3 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
	if(j == 4){
   	tr_4 = {x: yr_trace,
			y :  yData,
			name : hh_arr[j],
			mode : 'lines+markers'
			};
	};
   	} //J loop
	//Making the compined Traces
	if(i == 0) { ch_0 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 1) { ch_1 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 2) { ch_2 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 3) { ch_3 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
	if(i == 4) { ch_4 = [tr_0, tr_1, tr_2, tr_3, tr_4];};
} //I Loop
}; //Trace 	

//Titles
var ch_layout = [];

if(varType == "hhold") {
for(i = 0; i < hh_arr.length; i++){
	var tit_str = "Projected Households by Age and Household Type " + ctyName + " 2010 to 2050<br>Household Type: " + hh_arr[i];
	if(seriesType == "num") {
		tit_str = tit_str + " Number of Housing Units";
		y_title = "Households";
		y_ticks = ',';
    } else {
		tit_str = tit_str + " Percentage of Housing Units";
		y_title = "Percentage";
		y_ticks = ',.0%';
	};
	
//layouts
  var layout = {
		title: tit_str,
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
			linewidth: 2,
			type: 'date'
		  },
		  yaxis: {
			title : y_title,
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: y_ticks
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
ch_layout.push(layout);
};
} else {
	for(i = 0; i < age_arr.length; i++){
	var tit_str = "Projected Households by Household Type and Age " + ctyName + " 2010 to 2050<br> Age Group: " + age_arr[i];
	if(seriesType == "num") {
		tit_str = tit_str + " Number of Housing Units";
		y_title = "Households";
		y_ticks = ',';
    } else {
		tit_str = tit_str + " Percentage of Housing Units";
		y_title = "Percentage";
		y_ticks = ',.0%';
	};
	
//layouts
  var layout = {
		title: tit_str,
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
			title : y_title,
			automargin : true,
			showgrid: true,
			showline: true,
			mirror: 'ticks',
			gridcolor: '#bdbdbd',
			gridwidth: 2,
			linecolor: 'black',
			linewidth: 2,
			tickformat: y_ticks
		  },
			annotations : [{text :  'Data and Visualization by the Colorado State Demography Office.  Print Date: ' +  fmt_date(new Date) , 
               xref : 'paper', 
			   x : 0, 
			   yref : 'paper', 
			   y : -0.45, 
			   align : 'left', 
			   showarrow : false}]
		};
ch_layout.push(layout);
};
};

//Generating Chart	
var config = {responsive: true,
              displayModeBar: false};
			  
	
//Clearing out Divs
var CHART0 = document.getElementById("chart0_output");
var CHART1 = document.getElementById("chart1_output");
var CHART2 = document.getElementById("chart2_output");
var CHART3 = document.getElementById("chart3_output");
var CHART4 = document.getElementById("chart4_output");

CHART0.innerHTML = "";
CHART1.innerHTML = "";
CHART2.innerHTML = "";
CHART3.innerHTML = "";
CHART4.innerHTML = "";

Plotly.newPlot(CHART0, ch_0, ch_layout[0], config);
Plotly.newPlot(CHART1, ch_1, ch_layout[1], config);
Plotly.newPlot(CHART2, ch_2, ch_layout[2], config);
Plotly.newPlot(CHART3, ch_3, ch_layout[3], config);
Plotly.newPlot(CHART4, ch_4, ch_layout[4], config);

//Button Events

var chart0_csv = document.getElementById('chart0_csv');
var chart0_png = document.getElementById('chart0_png');
var chart1_csv = document.getElementById('chart1_csv');
var chart1_png = document.getElementById('chart1_png');
var chart2_csv = document.getElementById('chart2_csv');
var chart2_png = document.getElementById('chart2_png');
var chart3_csv = document.getElementById('chart3_csv');
var chart3_png = document.getElementById('chart3_png');
var chart4_csv = document.getElementById('chart4_csv');
var chart4_png = document.getElementById('chart4_png');
if(varType == "hhold") { 
	chart0_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart1_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart2_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart3_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	chart4_csv.onclick = function() { exportToCsv(ctyName, 'hhchart', datahh, 0); }; 
	
	chart0_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART0, 0); }; 
	chart1_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART1, 0); }; 
	chart2_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART2, 0); }; 
	chart3_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART3, 0); }; 
	chart4_png.onclick = function() { exportToPng(ctyName, 'hhchart', CHART4, 0); }; 
} else {
	chart0_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart1_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart2_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart3_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 
	chart4_csv.onclick = function() { exportToCsv(ctyName, 'agechart', dataage, 0); }; 

	chart0_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART0, 0); }; 
	chart1_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART1, 0); }; 
	chart2_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART2, 0); }; 
	chart3_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART3, 0); }; 
	chart4_png.onclick = function() { exportToPng(ctyName, 'agechart', CHART4, 0); }; 
};	

}); //end of d3 json
}; //end of genHOUSEAGE
