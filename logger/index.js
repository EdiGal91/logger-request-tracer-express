class Logger {
    constructor(output, severity, tracer){
        if(Logger.instance){
            return Logger.instance
        }
        
        this.output = output
        this.severity = severity
        this.tracer = tracer
        
        return Logger.instance = this
    }

    get requestId(){
        return this.tracer.id()
    }

    get requestIdMsg(){
        return this.requestId ? `[requestId:${this.requestId}]:` : ''
    }

    info(msg){
        this._log(this.severity.INFO, msg)
    }

    _log(severity, msg){
        this.output(severity, `${this.requestIdMsg} ${msg}`)
    }
}

module.exports = Logger