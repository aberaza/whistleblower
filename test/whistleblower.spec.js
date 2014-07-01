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

describe("Allows for many blowers/loggers to register and listen events", function(){
    var spyBlower = new wb.Blower();
    spyBlower.blow = jasmine.createSpy("blow");

    it("spyBlower must not get any event before being registered", function(){
        wb.log("Test log");
       expect(spyBlower.blow).not.toHaveBeenCalled();

    });

    it("must allow to register spyBlower",function(){
        expect(spyBlower.register()>0).toBe(true);
    });

    it("must redirect log events to any registered blower", function(){
        wb.log("Test log");
        expect(spyBlower.blow).toHaveBeenCalled();
    });
});

describe("Allows to set masks to filter output levels", function(){

    it("Has INFO level enabled by default", function(){
        expect((wb.outputMask & wb.INFO_MASK) !== 0).toBe(true);
    });

    it("Can disable INFO level", function(){
        wb.removeMask(wb.INFO_MASK);
        expect((wb.outputMask & wb.INFO_MASK) !== 0).toBe(false);
    });

    it("Can enable INFO level", function(){
        wb.addMask(wb.INFO_MASK);
        expect((wb.outputMask & wb.INFO_MASK) !== 0).toBe(true);
    });

    it("Has WARN level enabled by default", function(){
        expect((wb.outputMask & wb.WARN_MASK) !== 0).toBe(true);
    });

    it("Can disable WARN level", function(){
        wb.removeMask(wb.WARN_MASK);
        expect((wb.outputMask & wb.WARN_MASK) !== 0).toBe(false);
    });

    it("Can enable WARN level", function(){
        wb.addMask(wb.WARN_MASK);
        expect((wb.outputMask & wb.WARN_MASK) !== 0).toBe(true);
    });

    it("Has ERROR level enabled by default", function(){
        expect((wb.outputMask & wb.ERROR_MASK) !== 0).toBe(true);
    });

    it("Can disable ERROR level", function(){
        wb.removeMask(wb.ERROR_MASK);
        expect((wb.outputMask & wb.ERROR_MASK) !== 0).toBe(false);
    });

    it("Can enable ERROR level", function(){
        wb.addMask(wb.ERROR_MASK);
        expect((wb.outputMask & wb.ERROR_MASK) !== 0).toBe(true);
    });

    it("Has TRACE level enabled by default", function(){
        expect((wb.outputMask & wb.TRACE_MASK) !== 0).toBe(true);
    });

    it("Can disable TRACE level", function(){
        wb.removeMask(wb.TRACE_MASK);
        expect((wb.outputMask & wb.TRACE_MASK) !== 0).toBe(false);
    });

    it("Can enable TRACE level", function(){
        wb.addMask(wb.TRACE_MASK);
        expect((wb.outputMask & wb.TRACE_MASK) !== 0).toBe(true);
    });
})
