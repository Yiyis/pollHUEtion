void setup() {
    Serial.begin(9600);     // initialize serial communications
    Serial.setTimeout(10);  // set the timeout for parseInt
    pinMode(11, OUTPUT);
    pinMode(12, OUTPUT);
    pinMode(13, OUTPUT);
  }
  
  void loop() {
    if (Serial.available() > 0) {     // if there's serial data available
      int inByte = Serial.parseInt(); // read it
      /*********turn on hairdryer1************/
      if (inByte ==1) {        
        digitalWrite(11, HIGH);       
        delay(25000);
        digitalWrite(11, LOW);         
      }
      /*********turn on hairdryer2************/
        else if (inByte ==2) {       
        digitalWrite(11, HIGH);
        digitalWrite(12, HIGH);      
        delay(25000);
        digitalWrite(11, LOW); 
        digitalWrite(12, LOW); 
      }
      /*********turn on hairdryer3************/
        else if (inByte ==3) {              
        digitalWrite(11, HIGH);
        digitalWrite(12, HIGH);
        digitalWrite(13, HIGH);       
        delay(25000);
        digitalWrite(11, LOW); 
        digitalWrite(12, LOW);
        digitalWrite(13, LOW); 
      }
      /*********message to tell when it's the end************/
        else if (inByte ==4) {             
        digitalWrite(11, HIGH);
        digitalWrite(12, HIGH);
        digitalWrite(13, HIGH);       
        delay(1000);
        digitalWrite(11, LOW); 
        digitalWrite(12, LOW);
        digitalWrite(13, LOW);
        delay(1000); 
        digitalWrite(11, HIGH);
        digitalWrite(12, HIGH);
        digitalWrite(13, HIGH);       
        delay(1000);
        digitalWrite(11, LOW); 
        digitalWrite(12, LOW);
        digitalWrite(13, LOW); 
      }
    }
  }

