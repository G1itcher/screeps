var globals = require("globals");

var roleCourier = {

    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity) {
            let target;

            if(!creep.memory.pickupTarget)
            {

                let harvesters = creep.room.find(FIND_MY_CREEPS, {
                    filter: (creep) => creep.memory.role === globals.creeps.harvester.baseMemory.role && creep.memory.full
                });

                let newTarget = harvesters[0];
                if(newTarget == null)
                {
                    return;
                }
                creep.memory.pickupTarget = newTarget.id;
                target = newTarget;
            }
            else{
                target = Game.getObjectById(creep.memory.pickupTarget);
            }

            

            if(!target){
                creep.memory.pickupTarget = null;
            }
            else if(creep.withdraw(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {

            var target;

            if(!creep.memory.dropOffTarget)
            {

                let highPriority = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION ||
                            structure.structureType === STRUCTURE_SPAWN ||
                            structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                    }
                });
                let creepWorkers = creep.room.find(FIND_MY_CREEPS, {
                    filter: creep => creep.memory.role === globals.creeps.upgrader.baseMemory.role ||
                                    creep.memory.role === globals.creeps.builder.baseMemory.role
                });

                highPriority.push(..._.filter(creepWorkers, creep.memory.role === globals.creeps.builder.baseMemory.role));
                let upgraders = _.filter(creepWorkers, creep.memory.role === globals.creeps.builder.upgrader.role);

                let controller = creep.room.find(FIND_MY_STRUCTURES, {
                    filter: s => s.structureType === STRUCTURE_CONTROLLER
                })[0];

                let newTarget = controller && controller.ticksToDowngrade < globals.timings.minTicksToDowngrade?
                                upgraders[0] :
                                highPriority[Math.floor(Math.random()*highPriority.length)];

                creep.memory.dropOffTarget = newTarget.id;
                target = newTarget;
            }
            else{
                target = Game.getObjectById[creep.memory.dropOffTarget];
            }

            if(!target){
                creep.memory.dropOffTarget = null;
            }
            else if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleCourier;