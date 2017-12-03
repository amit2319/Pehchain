var privatekey;

var aadhardata;

var encrypteaadhardata;

var datakey;

var encrypteddatakey;

function saveencrypteddatakey(privatekey){
    window.encrypteddatakey = privatekey;
}

function encryptedgetdatakey(){
    return window.encrypteddatakey;
}

function savedatakey(privatekey){
    window.datakey = privatekey;
}

function getdatakey(){
    return window.datakey;
}


function saveprivatekey(privatekey){
    window.privatekey = privatekey;
}

function getprivatekey(){
    return window.privatekey;
}

function saveaadhardata(privatekey){
    window.aadhardata = privatekey;
}

function getaadhardata(){
    return window.aadhardata;
}

function saveencryptedaadhardata(privatekey){
    window.encyptedaadhardata = privatekey;
}

function getencryptedaadhardata(){
    return window.encrypedaadhardata;
}