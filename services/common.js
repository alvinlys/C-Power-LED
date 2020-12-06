const cf = require('../configs/config');

var calcHex = function(int) {
    var str = int.toString("16");
    if (str.length == 1){
        str = '0' + str;
    }
    return str;
}

var calcCheckSum = function(data) {
    var total = 0;
    for(var i = 0; i < data.length; i++) {
        total += parseInt(data[i], 16);
    }
    var hex = total.toString(16);
    return [(hex.toUpperCase().substring(1, 3)), ('0' + hex.toUpperCase().substring(0, 1))];
}

var calcDataLength = function(data) {
    return [calcHex((data.length.toString('16').toUpperCase())), '00'];
}

var processBuffer = function(rawHex) {
    var bufferData = [];
    for(var i = 0; i < rawHex.length; i++) {
        bufferData.push('0x' + rawHex[i]);
    }
    return Buffer.from(bufferData);
}

var textData = function(text) {
    var textData = function(nFontSize, pChar) {
        return [('1' + nFontSize), calcHex(0), calcHex(pChar.charCodeAt())];
    }
    
    var data = [
        '02',                                   // fixed code (send text)
        calcHex(0),                             // windows sequence number 0-7
        calcHex(text.length > 8 ? 11 : 0),      // mode 
        calcHex(1),                             // alignment 0-2
        calcHex(13),                            // speed 1-100
        calcHex(0), calcHex(0)                  // stay time
    ];

    for(var i = 0; i < text.length; i++) {
        data = data.concat(textData('2', text[i]));
    }

    return data;
}

var instantMessage = function(text, stayTime) {
    var data = [
        '11',                                       // fixed code (send text)
        calcHex(1),                                 // play times/loop 0-255
        calcHex(text.length > 8 ? 11 : 0),          // mode 
        calcHex(text.length > 8 ? 0 : 1),           // alignment 0-2
        calcHex(13),                                // speed 1-100
        calcHex(0), calcHex(parseInt(stayTime)),    // stay time
        calcHex(2),                                 // font
        calcHex(255), calcHex(0), calcHex(0)        // RGB
    ];

    for(var i = 0; i < text.length; i++) {
        data = data.concat(calcHex(text[i].charCodeAt()));
    }
    
    return data.concat(calcHex(0));
}

var CP5200Write = function (data) {
    switch(parseInt(data.type)) {
        case 0:
            data = textData(data.text);
            break;
        case 1:
            data = instantMessage(data.text, data.stayTime);
            break;
        default:
            data = textData(data.text);
            break;
    }
    var packetData = cf.packetType
                    .concat(cf.cardType)
                    .concat(cf.cardId)
                    .concat(cf.protocol)
                    .concat(cf.marks)
                    .concat(calcDataLength(data))
                    .concat(cf.packetNo)
                    .concat(cf.lastPacketNo)
                    .concat(data);
    var checkSum = calcCheckSum(packetData);
    var netData = packetData
                  .concat(checkSum);
    var netDataLen = calcDataLength(netData);
    var result = cf.idCode
                .concat(netDataLen)
                .concat(cf.reserve)
                .concat(netData);
    var hex = processBuffer(result);
    return hex;
}

var CP5200Read = function (hex, cb) {
    var hex = hex.toString('hex');
    if (hex) return cb(null, new Error('Invalid Hex'));
    var tmp = [];
    var data = {};
    var i = 0;
    while (i < hex.length) {
        tmp.push(hex[i]+hex[i+1]);
        i+=2;
    }
    data['idCode'] = [tmp[0],tmp[1],tmp[2],tmp[3]];
    data['netDataLen'] = [tmp[4],tmp[5]];
    data['reserve'] = [tmp[6],tmp[7]];
    data['packetType'] = tmp[8];
    data['cardType'] = tmp[9];
    data['cardId'] = tmp[10];
    data['protocol'] = tmp[11];
    data['returnCode'] = tmp[12]; // '00' ? Success : Fail
    data['packetDataLen'] = [tmp[13],tmp[14]];
    data['packetNo'] = tmp[15];
    data['lastPacketNo'] = tmp[16];
    data['data'] = [];
    for (var i = 17; i <= tmp.length-3; i++) {
        data['data'].push(tmp[i]);
    }
    data['checkSum'] = [tmp[tmp.length-2],tmp[tmp.length-1]];

    return cb(data);
}

module.exports = {
    calcHex,
    calcCheckSum,
    calcDataLength,
    processBuffer,
    textData,
    instantMessage,
    CP5200Write,
    CP5200Read
}
