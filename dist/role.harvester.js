var globals = require("globals");
var alertManager = require("alerts");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity) {
            creep.memory.full = false;
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            creep.memory.full = true;
            var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (creep) => {
                    return creep.memory.role === globals.creeps.courier.baseMemory.role;
                }
            });
            if(target) {
                creep.transfer(target, RESOURCE_ENERGY);
            }
            else{
                alertManager.sendAlert(globals.alerts.NO_COURIERS);
                let highPriority = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                if(creep.transfer(highPriority[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE)
                {
                    creep.moveTo(highPriority[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }

            }
        }
    }
};

module.exports = roleHarvester;