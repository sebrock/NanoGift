
/*! Copyright (C) TetraLoom LLC - All Rights Reserved                                               
 *  Unauthorized copying of this file, via any medium is strictly prohibited                        
 *  Proprietary and confidential                                                                    
 *  Written by Noah Franks <TetraLoom@pm.me>, May 2020 */

const supported    = document.getElementById(  'supported');
const unsupported  = document.getElementById('unsupported');
const toptext      = document.getElementById(    'toptext');
const special      = document.getElementById(    'special');
const qrcode       = document.getElementById(     'qrcode');
const copy         = document.getElementById(       'copy');
const field        = document.getElementById(      'field');
var   amount       = "1000000000000000000000000000000";
var   nano_address = "nano_35xyc65gt96ndpyucf7escx9zt9ta14r5uh7sohmckn1hwqdzt1dedc7i43s";

function create_qrcode() {
    
    const payload = 'nano:' + nano_address + '?amount=' + amount;
    
    qrcode.innerHTML = new QRCode({
        content: payload,
        color: "#000000",
        background: "#ffffff",
        ecl: 'M',
        width: 192,
        height: 192,
        padding: 0,
    }).svg();
}

function failure() {
    toptext.innerHTML = "No Address";
    toptext.style.marginBottom = 0;
    unsupported.style.display = "block";
}

(() => {
    
    chrome.tabs.query({currentWindow: true, active: true}, tabs => {
        
        var url = tabs[0].url;
        
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            
            toptext.innerHTML = "Special Page";
            toptext.style.marginBottom = 0;
            special.style.display = 'block';
            
            create_qrcode();
            supported.style.display = "block";
            return;
        }
        
        url = url.substr(Math.max(
            url.indexOf('http://' ) + 'http://' .length,
            url.indexOf('https://') + 'https://'.length
        ));
        
        const base = url.split('/')[0];
        
        const xhr = new XMLHttpRequest();
        
        xhr.addEventListener('load', function(event) {
            
            if (xhr.status !== 200)
                return failure();
            
            var result = xhr.responseText;
            
            if (!/^[0-9a-zA-Z_]+(\n?)$/.test(result))
                return failure();
            
            if (!result.startsWith('nano_') && !result.startsWith('xrb_'))
                return failure();
            
            nano_address = result;
            
            create_qrcode();
            
            toptext.innerHTML = "Scan to Donate";
            supported.style.display = "block";
        });
        
        xhr.addEventListener('error', function(event) {
            return failure();
        });
        
        xhr.open('GET', 'https://' + base + '/nanogift.txt', true);
        xhr.send(null);
    });
})();

function setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
		        this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            } else {
                this.value = "";
            }
        });
    });
}

setInputFilter(field, function(value) { return /^\d*[.,]?\d*$/.test(value); });

field.addEventListener('keyup', event => {
    
    var e = event || window.event;
    var amount_entered = field.value !== "" ? parseFloat(field.value) : 0;
    
    if (amount_entered === 0)
        return;
    
    const right = amount_entered % 1;
    const left  = Math.floor(amount_entered - right);
    
    const tiny  = Math.floor(right * 10000000).toString();
    
    amount = '' + left + '0'.repeat(7 - tiny.length) + tiny + '0'.repeat(23);
    
    create_qrcode();
});


var copy_timer = null;
function copy_address() {
    
    copy.innerHTML = "Copied!";
    
    navigator.clipboard.writeText(nano_address);
    
    if (copy_timer !== null)
        clearTimeout(copy_timer);
    
    copy_timer = setTimeout(() => {
        copy.innerHTML = "Click to copy";
    }, 1000);
}

qrcode.addEventListener('click', copy_address);
copy  .addEventListener('click', copy_address);
