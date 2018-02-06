var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1411';  // fill in your serial port name here
var inData;                             // for incoming serial data
var xPos = 0;                           // x position of the graph

var outByte = 0;                       // for outgoing data


//here is input practise//------------------------------------------
// function setup() 
// {
// 	 serial = new p5.SerialPort(); // make a new instance of the serialport library
// 	 serial.on('list', printList); // set a callback function for the serialport list event
// 	 serial.on('connected', serverConnected); // callback for connecting to the server
// 	 serial.on('open', portOpen);        // callback for the port opening
// 	 serial.on('data', serialEvent);     // callback for when new data arrives
// 	 serial.on('error', serialError);    // callback for errors
// 	 serial.on('close', portClose);      // callback for the port closing
// 	 serial.list(); // list the serial ports

// 	 serial.open(portName);              // open a serial port

// 	 createCanvas(windowWidth, windowHeight);
// 	 background(0);
// }

// function serialEvent() {
//   // read a string from the serial port:
//   var inString = serial.readLine();
//   // check to see that there's actually a string there:
//   if (inString.length > 0 ) {
//   // convert it to a number:
//   inData = Number(inString);
//   }
// }

// // get the list of ports:
// function printList(portList) {
//  // portList is an array of serial port names
//  for (var i = 0; i < portList.length; i++) {
//  // Display the list the console:
//  console.log(i + " " + portList[i]);
//  }
// }

// function serverConnected() {
//   console.log('connected to server.');
// }
 
// function portOpen() {
//   console.log('the serial port opened.')
// }
 
// function serialError(err) {
//   console.log('Something went wrong with the serial port. ' + err);
// }
 
// function portClose() {
//   console.log('The serial port closed.');
// }

// function graphData(newData) {
//   // map the range of the input to the window height:
//   var yPos = map(newData, 0, 255, 0, height);
//   // draw the line in a pretty color:
//   stroke(0xA8, 0xD9, 0xA7);
//   line(xPos, height, xPos, height - yPos);
//   // at the edge of the screen, go back to the beginning:
//   if (xPos >= width) {
//     xPos = 0;
//     // clear the screen by resetting the background:
//     background(0x08, 0x16, 0x40);
//   } else {
//     // increment the horizontal position for the next reading:
//     xPos++;
//   }
// }

// function draw() 
// {
//   fill(255);
//   text("sensor value: " + inData, 30, 30);

//   graphData(inData);

// }

// function windowResized() 
// {
//   resizeCanvas(windowWidth, windowHeight);

// }


//here is output practise//------------------------------------------
function setup() {
 createCanvas(400, 300);          // make the canvas
 serial = new p5.SerialPort();    // make a new instance of the serialport library
 serial.on('data', serialEvent);  // callback for when new data arrives
 serial.on('error', serialError); // callback for errors
 serial.open(portName);           // open a serial port
}

function serialEvent() {
 // read a byte from the serial port:
 var inByte = serial.read();
 // store it in a global variable:
 inData = inByte;
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}

function mouseDragged() {
 // map the mouseY to a range from 0 to 255:
 outByte = int(map(mouseY, 0, height, 0, 255));
 // send it out the serial port:
 serial.write(outByte);
}
// function keyPressed() {
//  if (key >=0 && key <=9) { // if the user presses 0 through 9
//  outByte = byte(key * 25); // map the key to a range from 0 to 225
//  }
//  serial.write(outByte); // send it out the serial port
// }

function keyPressed() {
 if (key ==='H' || key ==='L') { // if the user presses H or L
 serial.write(key);              // send it out the serial port
 }
}

function draw() {
 // black background, white text:
 background(0);
 fill(255);
 // display the incoming serial data as a string:
 text("incoming value: " + inData, 30, 30);
}





