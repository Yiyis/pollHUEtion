var serial;
var portName = '/dev/cu.usbmodem1411';

var outByte = 0;
var myData;
var dataList = false;
var lastDataList = false;
var i = 0;
var myLength;
var END = true;


function preload(){
	myData = departures;
}

function setup(){
	createCanvas(windowWidth,windowHeight);
	background(255, 204, 0);

	serial = new p5.SerialPort();
	serial.on('list', printList); // set a callback function for the serialport list event
	serial.on('connected', serverConnected); // callback for connecting to the server
	serial.on('open', portOpen);        // callback for the port opening
	serial.on('data', serialEvent);     // callback for when new data arrives
	serial.on('error', serialError);    // callback for errors
	serial.on('close', portClose);      // callback for the port closing
	serial.list(); // list the serial ports

	serial.open(portName);
}

/**********some default function for serial. keep them here in case for debugging*******************/
function serialEvent(){
}

function printList(portList){
	for (var i=0; i< portList.length; i++){
		console.log(i + "" + portList[i]);
	}
}
function serverConnected(){console.log('connected to server.');}
function portOpen(){console.log('the serial port opened.');}
function portClose(){console.log('the serial port closed.');}
function serialError(err){console.log('Something went wrong with the serial port.' + err);}
/**************************************/

function draw(){
	if(END){
		timer();
	}

}

// function timer(){
// 	var now = new Date();
// 	var nowMinutes = now.getMinutes();
// 	//var nowMinutes = now.getSeconds();
// 	//console.log(nowMinutes);

// 	if(nowMinutes > 0&& nowMinutes%5 ==0){
// 		dataList = true;
// 	}else if(nowMinutes == 0){
// 		dataList = true;
// 	}else{
// 		dataList = false;
// 	}

// 	if(dataList != lastDataList){
// 		if(dataList == true){
// 			i = i+1;
// 			getData();
// 		}
// 		lastDataList = dataList;
// 	}
// }
/*********The below is for demo********/
/*function timer(){
	var now = new Date();
	var nowTime = now.getSeconds();

	//console.log("now second is " + nowTime);

	if(nowTime > 0&& nowTime%5 ==0){
		dataList = true;
	}else if(nowTime == 0){
		dataList = true;
	}else{
		dataList = false;
	}

	if(dataList != lastDataList){
		if(dataList == true){
			getData();
		}
		lastDataList = dataList;
	}
}*/
/*********The below is for demo2********/
function timer(){
    var now = new Date();
    var nowTime = now.getSeconds();
    
    if(nowTime == 30){
		dataList = true;
	}else if(nowTime == 0){
		dataList = true;
	}else{
		dataList = false;
	}

	if(dataList != lastDataList){
		if(dataList == true){
			getData();
		}
		lastDataList = dataList;
	}
    
}
/*******************************/
var once = (function(){
	var executed = false;
	return function(){
		if(!executed){
			executed = true;
			myLength = myData.length; 
			console.log("Length of data:"+" "+myLength);

		}
	};
})();

function getData(){
	once();

	if(i< myLength){
		var dataID = myData[i].slot;
		var dataTime = myData[i].time;
		var dataDryer = myData[i].airdryer;

		console.log("here is the data id" + dataID);
		console.log("here is the data time" + dataTime);
		console.log("here is the data dryers" + dataDryer);

		outByte = dataDryer;
        console.log(outByte);
        console.log(typeof outByte);

	}else{
		outByte = 4;
		END = false;
		console.log("here is the end of the json");
	}
	sendData();
}

function sendData(){
    
  
	switch(outByte){
		case 0:
			serial.write(0+ '\n');
			break;
		case 1:
			serial.write(1+ '\n');
			break;
		case 2:
			serial.write(2+ '\n');
			break;
		case 3:
			serial.write(3+ '\n');
			break;
		case 4:
			serial.write(4+ '\n');
	}
  
	i = i+1;
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}