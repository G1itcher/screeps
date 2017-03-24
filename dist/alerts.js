class AlertsManager{

    constructor(){
        this.previousAlerts = {};
    }

    sendAlert(alertType){
        if(new Date().getTime() - (this.previousAlerts[alertType] || 0) > alertType.repeatDelay)
        {
            Game.notify(alertType.message);
        }
    }

}

var alertMan = new AlertsManager();

module.exports = alertMan;