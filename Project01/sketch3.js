var serial;
var portName = 'here is the port name';

var outByte = 0;
var myData;
var dataList = false;
var lastDataList = false;
var i = 0;

function preload() {
  var url = 'https://webspace.ocad.ca/~3165076/FDTP/departures.json';
  myData = loadJSON(url);
}

// function preload(){
// 	var mydata = JSON.parse(departures);
// }

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
	//var inByte = serial.read();
	var inString = serial.readLine();
	if(inString.length > 0){
		var inData = Number(inString);
	}
}
function printList(portList){
	for (var i=0; i< portList.length; i++){
		console.log(i + "" + portList[i]);
	}
}
function serverConnected(){console.log('connected to server.');}
function portOpen(){concole.log('the serial port opened.');}
function portClose(){console.log('the serial port closed.');}
function serialError(err){console.log('Something went wrong with the serial port.' + err);}
/**************************************/

function draw(){
	timer();
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
function timer(){
	var now = new Date();
	var nowTime = now.getSeconds();

	if(nowTime > 0&& nowTime%5 ==0){
		dataList = true;
	}else if(nowTime == 0){
		dataList = true;
	}else{
		dataList = false;
	}

	if(dataList != lastDataList){
		if(dataList == true){
			i = i+1;
			getData();
		}
		lastDataList = dataList;
	}
}
/*******************************/


function getData(){
	var dataID = myData.departures[i].slot;
	var dataTime = myData.departures[i].time;
	var dataDryer = myData.departures[i].airdryer;

	console.log("here is the data id" + dataID);
	console.log("here is the data time" + dataTime);
	console.log("here is the data dryers" + dataDryer);

	outByte = dataDryer;

	sendData();
}

function sendData(){
	serial.write(outByte);


}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight);
}