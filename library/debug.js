function sendAllMidiMessages() {
    var lowest = 128;
    var highest = 255;
    
    for (portnum = 0; portnum <= 1; portnum++) {
       var port = host.getMidiOutPort(portnum);
 
       for (status = lowest; status <= highest; status++) {
          for (data1 = 0; data1 <= 127; data1++) {
             for (data2 = 0; data2 <= 127; data2++) {
                println("Testing status " + status + " with data1 " + data1 + " and data2 " + data2 + " on port " + portnum + ".");
                port.sendMidi(status, data1, data2);
             }
          }
       }
    }
 }
 