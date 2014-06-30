// Define the main object
var wb = {};

//(function (console, undefined) {

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

    /**Format strings
     * Available variables are
     * time -> Timestamp
     * funcName -> Function name
     * funcArgs -> Function invocation arguments
     * level -> log level 
     * appName -> application name that logs the action
     * log -> The actual information to log
     */
    //function FORMAT_LOG = ["[", time, "]\t{", level,"}\t|", appName, "|\t", log];

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
            _whistle(new LogObject("LOG", undefined, Array.prototype.slice.call(arguments)));
        }
    };

    wb.warn = function warn(){
        if(wb.outputMask & wb.WARN_MASK){
            _whistle(new LogObject("WARN", undefined, Array.prototype.slice.call(arguments), new Error()));
        }
    };

    wb.error = function error(){
        if(wb.outputMask & wb.ERROR_MASK){
            _whistle(new LogObject("ERROR", undefined, Array.prototype.slice.call(arguments), new Error()));
        }
    };

    wb.dir = function dir(element){
        if(wb.outputMask & wb.INFO_MASK){
            _whistle(new LogObject("DIR", undefined, element));
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
    wb.assert = function assert(){
    };

    wb.clear = function clear(){
    };

    wb.group = function group(){
    };

    wb.groupCollapsed = function groupCollapsed(){
    };

    wb.groupEnd = function groupEnd(){
    }

    wb.time = function time(){
    };

    wb.timeEnd = function timeEnd(){
    };

    
//})(console)

function LogObject(level, app, data, trace){
    this.level = level;
    this.app = app;
    this.logData = data;
    this.trace = trace;
    this.time = Date.now();
}

function Blower(){
    this.blow = function(data){};
    this.register = function(){
        listeners[listeners.length] = this;
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

listeners.push(consoleBlower);

exports = module.exports = wb;
