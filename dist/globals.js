/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('globals');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    creepCount: {
        MAX_BUILDERS: 2,
        MAX_HARVESTERS: 2,
        MAX_UPGRADERS: 2,
        MAX_MINERS: 1,
        MAX_CLAIMERS: 1
    },
    creeps:{
        builder:{
            max:2,
            body:[MOVE,WORK,WORK,WORK,WORK,WORK],
            baseMemory:{role:"builder"}
        },
        harvester:{
            max:2,
            body:[MOVE,WORK,WORK,WORK,WORK,WORK],
            baseMemory:{role:"harvester"}
        },
        upgrader:{
            max:1,
            body:[MOVE,WORK,WORK,WORK,WORK,WORK],
            baseMemory:{role:"upgrader"}
        },
        miner:{
            max:1,
            body:[MOVE,WORK,WORK,WORK,WORK,WORK],
            baseMemory:{role:"miner"}
        },
        courier:{
            max:2,
            body:[MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
            baseMemory:{role:"courier"}
        }
    },
    alerts:{
        NO_COURIERS:{
            message:"There are no couriers left!!",
            repeatDelay: 1.8e+6
        }
    },
    timings:{
        minTicksToDowngrade:2000
    }
    
    
};