module.exports = {
    idCode: ['ff','ff','ff','ff'], // ID Code: 255.255.255.255
    reserve: ['00', '00'], // Reservation
    packetType: ['68'], // Packet Type
    cardType: ['32'], // Card Type
    cardId: ['00'], // Card ID: fixed for TCP comm
    protocol: ['7B'], // Protocol Code
    marks: ['01'], // Additional Information / Confirmation Mark
    packetNo: ['00'], // Packet Number
    lastPacketNo: ['00'], // Last Packet Number
}
