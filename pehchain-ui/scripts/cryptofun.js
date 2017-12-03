
function privateKeyHash(fingerprintID, password) {
    //    var key;
    //    scrypt(password, 'saltysalt', {
    //        N: 16384,
    //        r: 8,
    //        p: 1,
    //        dkLen: 16,
    //        encoding: 'Uint8Array'
    //    }, function (derivedKey) {
    //        key = derivedKey; // "5012b74fca8ec8a4a0a62ffdeeee959d"
    //    });
    var privatekey = CryptoJS.SHA256(fingerprintID.toString() + password.toString());
    return privatekey.toString();
}

function encrypt(text) {
    var password = Math.random().toString(36);
    var key;
    scrypt(password, 'saltysalt', {
        N: 16384,
        r: 8,
        p: 1,
        dkLen: 16,
        encoding: 'Uint8Array'
    }, function (derivedKey) {
        key = derivedKey; // "5012b74fca8ec8a4a0a62ffdeeee959d"
    });
    savedatakey(password);
    // Convert text to bytes
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1

    var aesEnc = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var aesDec = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

    var encryptedBytes = aesEnc.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
    //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"

    // When ready to decrypt the hex string, convert it back to bytes
    var encryptedBytes = aesjs.utils.hex.toBytes(encryptedHex);

    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.

    var decryptedBytes = aesDec.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    return encryptedHex;
}

function passtoKey(text){
    var key;
    scrypt(text, 'saltysalt', {
        N: 16384,
        r: 8,
        p: 1,
        dkLen: 128,
        encoding: 'hex'
    }, function (derivedKey) {
        key = derivedKey; // "5012b74fca8ec8a4a0a62ffdeeee959d"
    });
    console.log(key.toString());
    return key.toString();
}
console.log(passtoKey('karan'));