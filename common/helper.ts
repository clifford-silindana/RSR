export default class Helper {
    static processFile(file, success, error) {
        var fr = new FileReader();
        fr.addEventListener('error', error, false);
        if (fr.readAsBinaryString) {
            fr.addEventListener('load', function () {
                var string = this.resultString != null ? this.resultString : this.result;
                var result = new Uint8Array(string.length);
                for (var i = 0; i < string.length; i++) {
                    result[i] = string.charCodeAt(i);
                }
                success(result.buffer);
            }, false);
            return fr.readAsBinaryString(file);
        } else {
            fr.addEventListener('load', function () {
                success(this.result);
            }, false);
            return fr.readAsArrayBuffer(file);
        }
    }
}

