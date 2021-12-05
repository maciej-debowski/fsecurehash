function fsh(inputvalue) {

    String.prototype.splitAt5 = function() {
        let old = this
        let new__ = []

        let b = ''
        for(let i = 0; i < old.length; i++) {
            
            b+=old[i]

            if(i%5==1) {
                new__.push(b)
                b = ''
            }
        }

        return new__
    }

    function toFixed(x) {
        if (Math.abs(x) < 1.0) {
          var e = parseInt(x.toString().split('e-')[1]);
          if (e) {
              x *= Math.pow(10,e-1);
              x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
          }
        } else {
          var e = parseInt(x.toString().split('+')[1]);
          if (e > 20) {
              e -= 20;
              x /= Math.pow(10,e);
              x += (new Array(e+1)).join('0');
          }
        }
        return x;
      }
    
    function getHaskKey(val, bin) {
        let key = ''

        val.split("").reverse().forEach(x => {
            key += ("" + toFixed(parseInt((x.charCodeAt() >>> 0).toString(2)) * bin)).toString()
        })

        key += "0"

        key = key.split("").map((x, key2) => {
            return x == 0 ? (key2 != 0 ? (parseInt(key[key2 - 1]) + 1) * key2 : key2) : x
        }).join("")

        key = key.split("").filter((x, key2) => parseInt(x) % key[Math.min(key2 + 1, key.length)] == 0).join("")

        return key
    }

    let inBinary = ''
    inputvalue.split("").forEach(x => {
        inBinary += "" + (x.charCodeAt() >>> 0).toString(2)
    })
    
    const key = getHaskKey(inputvalue, inBinary)

    let out = ''
    
    inputvalue.split("").forEach((x, key2) => {
        let stamp = key.split("").filter((y, key3) => {
            return key3 > key2 - 16 && key3 < key2 + 16
        }).join("")

        keystamp = toFixed(parseInt(stamp))
        out += toFixed(x.charCodeAt() * keystamp)
    })

    let oldout = out
    let newout = out.split("").filter(x => {
        return x != "0"
    }).join("")

    out = oldout + newout

    out = out.splitAt5().map(x => {
        return parseInt(x).toString(36)
    }).join("")

    return out
}

module.exports = fsh