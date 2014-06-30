var wb = require("../js/whistleblower.js");

describe("Interface tests: Is conforming to CommonJS", function(){

    it("has a method log", function(){
        expect(wb.log !== undefined).toBe(true);
        expect(typeof wb.log).toBe("function");
    });

    it("has a method warn", function(){
        expect(wb.warn !== undefined).toBe(true);
        expect(typeof wb.warn).toBe("function");
    });

    it("has a method error", function(){
        expect(wb.error !== undefined).toBe(true);
        expect(typeof wb.error).toBe("function");
    });

    it("has a method dir", function(){
        expect(wb.dir !== undefined).toBe(true);
        expect(typeof wb.dir).toBe("function");
    });

    it("has a method clear", function(){
        expect(wb.clear !== undefined).toBe(true);
        expect(typeof wb.clear).toBe("function");
    });

    it("has a method assert", function(){
        expect(wb.assert !== undefined).toBe(true);
        expect(typeof wb.assert).toBe("function");
    });

    it("has a method debug", function(){
        expect(wb.debug !== undefined).toBe(true);
        expect(typeof wb.debug).toBe("function");
    });

    it("has a method group", function(){
        expect(wb.group !== undefined).toBe(true);
        expect(typeof wb.group).toBe("function");
    });

    it("has a method groupCollapsed", function(){
        expect(wb.groupCollapsed !== undefined).toBe(true);
        expect(typeof wb.groupCollapsed).toBe("function");
    });

    it("has a method groupEnd", function(){
        expect(wb.groupEnd !== undefined).toBe(true);
        expect(typeof wb.groupEnd).toBe("function");
    });

    it("has a method time", function(){
        expect(wb.time !== undefined).toBe(true);
        expect(typeof wb.time).toBe("function");
    });

    it("has a method timeEnd", function(){
        expect(wb.timeEnd !== undefined).toBe(true);
        expect(typeof wb.timeEnd).toBe("function");
    });

});

describe("Allows for many blowers/loggers to register", function(){
});
