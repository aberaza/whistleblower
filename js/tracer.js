(function(){
    //private members:
    //var FORMAT_FUNCTION_IN = "[%s]>> %s(%s)"; // params: timestamp string, function name, function arguments
    function FORMAT_FUNCTION_IN(time, funcName, args){ return "[" + time + "] >> " + funcName + "("+args+")"; }// params: timestamp string, function name, function arguments
    //var FORMAT_FUNCTION_OUT = "[%s]<< returns: %s"; // params: timestamp string, return value
    function FORMAT_FUNCTION_OUT(time, retVal){ return "[" + time + "] >> returns: " + retVal ; } // params: timestamp string, return value
    //var FORMAT_FUNCTION_IN_OUT = "[%s]>> %s(%s) returns: %s <<"; // params: timestamp string, function name, function arguments, return value
    function FORMAT_FUNCTION_IN_OUT(time, funcName, args, retVal){ return "[" + time + "] >> " + funcName + "("+args+") returns: " + retVal + " <<"; } // params: timestamp string, function name, function arguments, return value
    //var FORMAT_LOG = "[%s] LOG: "; //params: timestamp, message
    function FORMAT_LOG(time){ return "[" + time + "] INFO: "};
    //var FORMAT_INFO = "[%s] INFO: "; //params: timestamp, message
    function FORMAT_INFO(time){ return "[" + time + "] INFO: "};
    //var FORMAT_ERROR = "[%s] ERROR!!! <%s> : "; //params: timestamp, function name, message
    function FORMAT_ERROR(time, functionName){ return "[" + time + "] ERROR: <" + functionName + "> : ";};
    //var FORMAT_WARN = "[%s] WARN! <%s> : "; //params: timestamp, function name, message
    function FORMAT_WARN(time, functionName){ return "[" + time + "] LOG: <" + functionName + "> : ";};


    function composeArguments(prefix, args){
        args = Array.prototype.slice.call(args);
        prefix[0]+=args[0];
        return prefix.concat(args.slice(1, args.length));
    }

    function joinArguments(args, separator){
        return Array.prototype.slice.call(args).join(separator);
    }

    function getDateString(){
        var date = new Date();
        return '' + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "." + date.getMilliseconds();
    }

    if(window.console !== undefined){
        console._log = console.log.bind(console);
        console._warn = console.warn.bind(console);
        console._info = console.info.bind(console);
        console._error = console.error.bind(console);
        console.group = console.group || console._log;
        console.groupEnd = console.groupEnd || console._log;
    }else{
        console={_log : function(){}, _warn : function(){}, _info : function(){}, _error:function(){}};
    }

    // SIMPLE LOGS BY LEVEL (alernative to overwriting console.xxx methods)
    /**
     * @function
     * Log an event to the console. This trace is managed by console.INFO_MASK.
     */
    console.log = function (msg){
        if(console.OUTPUT_MASK & console.INFO_MASK && console.enabled){
            console._log.apply(this,composeArguments([FORMAT_LOG(getDateString())], arguments));
        }
    }

    /**
     * @function
     * Log an information to the console. This trace is managed by console.INFO_MASK.
     */
    console.info = function (msg) {
        if(console.OUTPUT_MASK & console.INFO_MASK && console.enabled)
            console._info.apply(this, composeArguments([FORMAT_INFO(getDateString())], arguments));
    }

    /**
     * @function
     * Log a warning message to the console. This trace is managed by console.WARN_MASK.
     */
    console.warn = function (msg) {
        if(console.OUTPUT_MASK & console.WARN_MASK && console.enabled){
            console._warn.apply(this,composeArguments([FORMAT_WARN(getDateString(), this.name)], arguments));
            // display stack trace
            console.trace();
        }
    }

    /**
     * @function
     * Log an error to the console. This trace is managed by console.ERROR_MASK.
     */
    console.error = function (msg) {
        if(console.OUTPUT_MASK & console.ERROR_MASK && console.enabled){
            console._error.apply(this,composeArguments([FORMAT_ERROR(getDateString(), this.name)], arguments));
            //stack trace. Not needed, console.error does show it by default.
        }
    }

    // ADD NEW METHODS FOR FUNCTION IN, OUT, OBJECT PARSE, ETC
    /**
     * @function
     * Log the entry into a function. This trace is managed by console.INOUT_MASK.
     * @param self
     * @param args
     */
    console.in = function(self, args){
        if(!(this.OUTPUT_MASK & this.INOUT_MASK)) return;
        console.group.apply(this, [FORMAT_FUNCTION_IN(getDateString(), (args.callee.name || 'anonymousFunction'), joinArguments(args, ', '))]);
    }

    /**
     * @function
     * Log the end of a function execution. This trace is managed by console.INOUT_MASK.
     * @param self
     * @param result
     */
    console.out = function(self, result){
        if(!(this.OUTPUT_MASK & this.INOUT_MASK)) return;
        console.groupEnd.apply(this, [FORMAT_FUNCTION_OUT(getDateString(), (result || "void"))]);
    }
    /**
     * Log entry and leave of a short function that does not call other methods. This trace is managed by console.INOUT_MASK.
     * @param self
     * @param args
     * @param result
     */
    console.inout = function(self, args, result){
        if(!(this.OUTPUT_MASK & this.INOUT_MASK)) return;
        console._log.apply(this, [FORMAT_FUNCTION_IN_OUT(getDateString(), (args.callee.name || 'anonymousFunction'), joinArguments(args, ', '), (result || "void"))]);
    }

    // MASK AND LOG LEVEL MANAGEMENT FUNCTIONS AND DECLARATIONS
    console.INFO_MASK = 0x01;
    console.WARN_MASK = 0x02;
    console.ERROR_MASK = 0x04;
    //SPECIAL EVENTS
    console.INOUT_MASK = 0x08;

    console.DEFAULT_MASK = console.INFO_MASK | console.WARN_MASK | console.ERROR_MASK | console.INOUT_MASK;

    console.OUTPUT_MASK=console.DEFAULT_MASK;
    console.enabled = true;

    /* TRACER & MASK MANAGEMENT METHODS */

    /**
     * @function
     * Activates the console. Optionally a mask to configure the log level can be passed. If
     * none, DEFAULT_MASK will be used.
     * @param outputMask BITMASK to parametrice shown logs
     */
    console.enable = function(outputMask){
        console.enabled = true;
        console.OUTPUT_MASK = outputMask || console.OUTPUT_MASK;
    }

    /**
     * @function
     * Disables the console. No further logs will be shown untill tracer is activated again.
     */
    console.disable = function(){
        console.enabled = false;
    }

    /**
     * @function
     * Adds the mask in the parameter to the current output mask.
     * @param addMask
     */
    console.add = function(addMask){
        console.OUTPUT_MASK = console.OUTPUT_MASK | addMask;
    }

    /**
     * @function
     * Removes the mask sent as parameter to the current output mask
     * @param removeMask
     */
    console.remove = function(removeMask){
        console.OUTPUT_MASK = console.OUTPUT_MASK & (~ removeMask);
    }
})();
