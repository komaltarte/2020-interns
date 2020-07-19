import {data} from './data.js'
console.log(data);
//console.log(data[0].rates["2019-02-05"].INR);

var DOMstrings = {
	plotBtn: '.btn',
	taskType:'.task',
}

document.querySelector(DOMstrings.plotBtn).addEventListener('click', function() {
	var month="01";
	var year="2019";
	var day;
	var cur="INR";
	var heights=[];
	var x=2;
	day="0"+x;
	console.log("button clicked");
	//console.log(data[0].rates[year+"-"+month+"-"+day].INR);
	//console.log(day);
	var task=document.querySelector(DOMstrings.taskType).value;
	if(task=="T1") {
		console.log(task);
		for(var i=1;i<=31;i++) {
			day="0"+x;
			if(data[0].rates.hasOwnProperty(year+"-"+month+"-"+day)) {
				if(data[0].rates[year+"-"+month+"-"+day].hasOwnProperty("INR")) {
					heights[i]=data[0].rates[year+"-"+month+"-"+day].INR;
					console.log(heights[i]);
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
	else if(task=="T2") {
		console.log(task);
	}
});