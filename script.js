let DOMstrings = {
	plotBtn: '.btn',
	taskType:'.task',
	barchart: 'chart',
	taskID:'task',
	taskData: '.dataType',
	taskDataID:'dataType',
}


let month="01";
let year="2019";
let day;
let heights=[];// to store heights of inr bars.
let heightsg=[];// for gbp;
let x=1;
let dataSrc='';
day="0"+x;


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

/*async function getData() {
  let response = await fetch(dataSrc);
  let data = await response.json()
  return data;
}

getData()
	.then(data => callf(data)); 
*/


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

function plotGraph(cur) {
	for(let i=1;i<=31;i++) {
			if(i<10) {
				day="0"+i;
			}else {
				day=i;
			}
			
			if(data.rates.hasOwnProperty(year+"-"+month+"-"+day)) {
				if(data.rates[year+"-"+month+"-"+day].hasOwnProperty(cur)) {
					heights[i]=data.rates[year+"-"+month+"-"+day][cur];
					console.log(heights[i]);
					let node = document.createElement("LI");                 
					let textnode = document.createTextNode(Math.round(heights[i]*10)/10);         
					node.appendChild(textnode); 
					node.setAttribute("id", "bar"+day); 
					node.setAttribute("value", year+"-"+month+"-"+day);  
					node.setAttribute("cur", cur);                           
					document.getElementById(DOMstrings.barchart).appendChild(node);
					document.getElementById("bar"+day).style.height=heights[i]+"%";


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
		console.log(heights);
		
}


document.querySelector(DOMstrings.taskType).addEventListener('change', function() {
	//1. clear graph.
	clearGraph();
	console.log("button clicked");
	
	let task=document.querySelector(DOMstrings.taskType).value;
	if(task=="T1") {
		//2. Plot graph
		plotGraph("INR");
		
	}
	else if(task=="T2") {
		//2. Plot graph
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
					let node = document.createElement("LI");                 // Create a <li> node
					let textnode = document.createTextNode(heights[i]);         // Create a text node
					node.appendChild(textnode); // Append the text to <li>
					node.setAttribute("id", "bar"+day); 
					node.setAttribute("value", year+"-"+month+"-"+day);  
					node.setAttribute("cur", "INR");                           
					document.getElementById(DOMstrings.barchart).appendChild(node);
					document.getElementById("bar"+day).style.height=heights[i]+"%";

					//for gbp:
					node = document.createElement("LI");                 // Create a <li> node
					textnode = document.createTextNode(heightsg[i]);         // Create a text node
					node.appendChild(textnode); // Append the text to <li>
					node.setAttribute("id", "bar1"+day); 
					node.setAttribute("cur", "GBP"); 
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
		plotGraph(task);
	}
});



}




//console.log(data);
/*let cur="INR";
console.log(data[0].rates["2019-02-05"][cur]);
*/

