let DOMstrings = {
	taskType:'.task',
	barchart: 'chart',
	taskID:'task',
	taskData: '.dataType',
	taskDataID:'dataType',
	fromDate:'.fromDate',
	toDate:'.toDate',
	toDateID:'toDate',
	fromDateID:'fromDate',
}

let month="01";
let year="2019";
let day;
let heights=[];// to store heights of inr bars.
let heightsg=[];// for gbp;
let x=1;
let dataSrc='';
day="0"+x;



//get json data
document.querySelector(DOMstrings.taskData).addEventListener('change', function() { 
	dataSrc=document.querySelector(DOMstrings.taskData).value;
	console.log(dataSrc);
	async function getData() {
 		 let response = await fetch(dataSrc);
 		 let data = await response.json()
 		 return data;
	}

	getData()
		.then(data => callf(data)); 
});

function callf(data) {

//populate options with currency names:
for (x in data.rates["2019-02-05"]) {
	//console.log(x);
	let node = document.createElement("option");      
	let textnode = document.createTextNode("EUR vs "+x);        
	node.appendChild(textnode); 
	node.setAttribute("value",x);  
	document.getElementById(DOMstrings.taskID).appendChild(node);
} 


function clearGraph() {
	let list = document.getElementById(DOMstrings.barchart);
	while (list.hasChildNodes()) {  
 		list.removeChild(list.firstChild);
	}
}

function plotBar(i,cur,month,day) {
	if(data.rates.hasOwnProperty(year+"-"+month+"-"+day)) {
				if(data.rates[year+"-"+month+"-"+day].hasOwnProperty(cur)) {
					heights[i]=data.rates[year+"-"+month+"-"+day][cur];
					console.log(heights[i]);
					let node = document.createElement("LI");                 
					let textnode = document.createTextNode(cur);         
					node.appendChild(textnode); 
					node.setAttribute("id", "bar"+day); 
					node.setAttribute("date", year+"-"+month+"-"+day);  
					node.setAttribute("val", Math.round(heights[i]*100)/100);                           
					document.getElementById(DOMstrings.barchart).appendChild(node);
					if(cur=="ISK"||cur=="HUF"||cur=="KRW") {
						document.getElementById("bar"+day).style.height=heights[i]+"px";
					}
					else {
						document.getElementById("bar"+day).style.height=heights[i]+"%";
					}


				}
				else {
					heights[i]=-1;
				}
			}
			else {
				heights[i]=-1;
			}
			x=x+1;
}


function plotGraph(cur,fromMonth, fromDay, toMonth, toDay) {
	if(fromMonth>toMonth) {
		alert("invalid range");
	}
	else if(fromMonth==""||toMonth==""){
		alert("Please select date range");
	}
	console.log("in plot graph");
	for(let i=parseInt(fromDay);i<=31;i++) {
			month=fromMonth;
			if(i<10) {
				day="0"+i;
			}else {
				day=i;
			}
			plotBar(i,cur,month,day);
	}
			
		if(fromMonth!=toMonth) {

			for(let i=1;i<=parseInt(toDay);i++) {
				month=toMonth;
				if(i<10) {
					day="0"+i;
				}else {
					day=i;
				}
			
				plotBar(i,cur,month,day);			
			}
		}
	
		console.log(heights);
		
}


document.querySelector(DOMstrings.taskType).addEventListener('change', function() {

	//1. clear graph.
	clearGraph();
	console.log("button clicked");
	//2.get date range:
	let to=document.getElementById(DOMstrings.toDateID).value;
	//console.log(to);
	let toMonth = to.substr(5, 2);
  	let toDay = to.substr(8, 2);
  	let from=document.getElementById(DOMstrings.fromDateID).value;
	var fromMonth = from.substr(5, 2);
  	var fromDay = from.substr(8, 2);

	//3.plot graph
	let task=document.querySelector(DOMstrings.taskType).value;

	if(task=="T1") {
		plotGraph("INR","01","01","01","31");
		
	}
	else if(task=="T2") {
		year="2019";
		month="01";
		for(let i=1;i<=31;i++) {
			if(i<10) {
				day="0"+i;
			}else {
				day=i;
			}
			if(data.rates.hasOwnProperty(year+"-"+month+"-"+day)) {
				if(data.rates[year+"-"+month+"-"+day].hasOwnProperty("INR") && data.rates[year+"-"+month+"-"+day].hasOwnProperty("GBP")) {
					heights[i]=data.rates[year+"-"+month+"-"+day].INR;
					heightsg[i]=data.rates[year+"-"+month+"-"+day].GBP;
					console.log(heights[i]);
					console.log(heightsg[i]);
					let node = document.createElement("LI");                 
					let textnode = document.createTextNode("INR");         
					node.appendChild(textnode); 
					node.setAttribute("id", "bar"+day); 
					node.setAttribute("date", year+"-"+month+"-"+day);  
					node.setAttribute("val", Math.round(heights[i]*10)/10);                           
					document.getElementById(DOMstrings.barchart).appendChild(node);
					document.getElementById("bar"+day).style.height=heights[i]+"%";

					//for gbp:
					node = document.createElement("LI");                 
					textnode = document.createTextNode("GBP");        
					node.appendChild(textnode); 
					node.setAttribute("id", "bar1"+day); 
					node.setAttribute("val", Math.round(heightsg[i]*10)/10); 
					//node.setAttribute("value", year+"-"+month+"-"+day);                            
					document.getElementById(DOMstrings.barchart).appendChild(node);
					document.getElementById("bar1"+day).style.height=heightsg[i]+"%";
					document.getElementById("bar1"+day).style.color="#636e72";


				}
				else {
					heights[i]=-1;
					heightsg[i]=-1;

				}
			}
			else {
				heights[i]=-1;
				heightsg[i]=-1;
			}
			x=x+1;
		}
	}
	else {
		if(task=="IDR"||task=="HUF"||task=="KRW"||task=="ISK") {
			alert("Graph scaled to height");
		}
		plotGraph(task,fromMonth,toMonth, fromDay, toDay);
	}
});



}




//console.log(data);
/*let cur="INR";
console.log(data[0].rates["2019-02-05"][cur]);
*/

