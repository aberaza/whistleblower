// Define the main object
var wb = {};

// Masks levels

var listeners = [];

wb.INFO_MASK = 0x01;
wb.WARN_MASK = 0x02;
wb.ERROR_MASK = 0x04;
wb.TRACE_MASK = 0x08;

wb.INOUT_MASK = 0x10;

wb.DEFAULT_MASK = wb.INFO_MASK | wb.WARN_MASK | wb.ERROR_MASK | wb.TRACE_MASK | wb.INOUT_MASK;

wb.outputMask = wb.DEFAULT_MASK;

// PRIVATE MEMBERS

function _formatString(format){
    returns;
}

function _whistle(log){
    listeners.forEach(function(l){l.blow(log)});
}

// PUBLIC MEMBERS

wb.log = function log(){
    if(wb.outputMask & wb.INFO_MASK){
        // var formatedText = ["WB" +  Array.prototype.slice.call(arguments).join("")];
        //console.log.apply(console, formatedText);
        _whistle(new LogObject("LOG", arguments., undefined, Array.prototype.slice.call(arguments)));
    }
};

wb.warn = function warn(){
    if(wb.outputMask & wb.WARN_MASK){
        _whistle(new LogObject("WARN", undefined, undefined, Array.prototype.slice.call(arguments), new Error()));
    }
};

wb.error = function error(){
    if(wb.outputMask & wb.ERROR_MASK){
        _whistle(new LogObject("ERROR", undefined, undefined, Array.prototype.slice.call(arguments), new Error()));
    }
};

wb.dir = function dir(element){
    if(wb.outputMask & wb.INFO_MASK){
        _whistle(new LogObject("DIR", undefined, undefined, element));
    }
};

/**
 * Writhe a log with a link to the source code
 */
wb.debug = function debug(){
};

/**
 * test an expression. If not true, throw an exception
 */
wb.assert = function assert(exp, msg){
    if(wb.outputMask & wb.INFO_MASK){
        if(!exp){
            _whistle(new LogObject("ASSERT", undefined, undefined, msg || "Assertion Failure"));
        }
    }
};

wb.clear = function clear(){
};

wb.group = function group(){
};

wb.groupCollapsed = function groupCollapsed(){
};

wb.groupEnd = function groupEnd(){
}

var TIMERS = {};
var activeTimers = 0;

wb.time = function time(timerId){
    activeTimers++;
    TIMERS[timerId] = Date.now();
};

wb.timeEnd = function timeEnd(timerId){
    var end = Date.now();
    var start = TIMERS[timerId];

    if(wb.outputMask & wb.INFO_MASK){
        if(start === undefined){
            throw "No timer " + timerId + " exists.";
        }
        _whistle(new LogObject("TIMER", undefined, undefined, {id : timerId, time : end - start}));

        if(--activeTimers<1) { //Don't like delete
            TIMERS = {};
            activeTimers=0;
        }
    }
};


// MASK MANAGEMENT
wb.addMask = function addMask(mask){
    wb.outputMask |= mask;
    return this.outputMask;
}

wb.removeMask = function removeMask(mask){
    //Bitwise NOT does not seem to work as expected everywhere
    wb.outputMask = (wb.outputMask & mask)? wb.outputMask ^ mask : wb.outputMask;
    return this.outputMask;
}

function LogObject(level, file, logStack, data, trace){
    this.level = level;
    this.file = file;
    this.logStack = logStack;
    this.logData = data;
    this.trace = trace;
    this.time = Date.now();
}

function Blower(){
    this.blow = function(data){
    };
    this.register = function(){
        listeners[listeners.length] = this;
        return listeners.length;
    }
}

var consoleBlower = new Blower();
consoleBlower.blow = function(data){
    switch(data.level){
        case "DIR":
            console.dir.apply(console, data.logData);
            break;
        default :
            console.log.apply(console, ["[%s]\t%s\t{%s}\t> ", data.time, data.app, data.level].concat(data.logData));
    }
}


wb.Blower = Blower;
wb.consoleBlower = consoleBlower;

exports = module.exports = wb;
