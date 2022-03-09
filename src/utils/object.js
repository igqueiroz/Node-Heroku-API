class Obj {

    static missingKeys(obj = {}, keys = []) {
        const keysToMatch = Object.keys(obj)
        return keys.reduce((all, cur) => {
            return void(ObjectUtils.addIfNotExist(keysToMatch, cur, all)) || all
        }, [])
    }
    
    static emailValidation(email) {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    }

    static cpfValidation(cpf) {
        const re = /^[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}$/ 
        return re.test(cpf) && this.cpfTest(cpf)
    }

    static cpfTest(cpf) {
        var strCPF = cpf;
        var Plus;
        var Remainder;
        Plus = 0;
        if (strCPF == "00000000000") return false;
    
        for (let i=1; i<=9; i++) Plus = Plus + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        Remainder = (Plus * 10) % 11;
    
        if ((Remainder == 10) || (Remainder == 11))  Remainder = 0;
        if (Remainder != parseInt(strCPF.substring(9, 10)) ) return false;
    
        Plus = 0;
        for (let i = 1; i <= 10; i++) Plus = Plus + parseInt(strCPF.substring(i-1, i)) * (12 - i);
        Remainder = (Plus * 10) % 11;
    
        if ((Remainder == 10) || (Remainder == 11))  Remainder = 0;
        if (Remainder != parseInt(strCPF.substring(10, 11) ) ) return false;
        return true;

    }

    static convertToQueryParams(json) {
        return Object.keys(json)
            .map(key => `${key}=${json[key]}`)
            .join('&');
    }

}

module.exports = Obj