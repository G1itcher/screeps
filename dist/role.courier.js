var globals = require("globals");

var roleCourier = {

    /** @param {Creep} creep **/
    run: function(creep){
        if(creep.carry.energy < creep.carryCapacity) {
            creep.memory.dropOffTarget = null;
            let target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (creep) => creep.memory.role === globals.creeps.harvester.baseMemory.role && creep.memory.full
            }) ||

            creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                filter: (creep) => creep.memory.role === globals.creeps.harvester.baseMemory.role
            });

            if(target == null){
                return;
            }
            else{
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {

            var target;
            creep.memory.pickupTarget = null;
            if(!creep.memory.dropOffTarget)
            {
                //ORDER OF IMPORTANCE!

                //Spawner/extensions trying to spawn stuff
                
                //          \/-------------------
                //Spawner/extensions trying to spawn stuff
                //Fixers on Orange flags        |//TODO
                //Builders on red flags         |
                //Anything less than 50% energy |-- 10% of going to an upgrader anyway
                //Builders / Fixers             |//TODO
                //Anything not full             |
                //          /\-------------------
                //Upgraders                     

                let doAnUpgrade = Math.random() <= 0.1;

                //Spawner/extensions trying to spawn stuff
                if(creep.room.memory.spawnerHasQue){
                    target = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity;
                        }
                    });

                    target = target[Math.floor(Math.random()*target.length)];
                }

                //Fixers on orange flags
                if(!target && creep.room.memory.hasRepairFlags){
                    target = creep.room.find(FIND_MY_CREEPS, {
                            filter: creep => creep.memory.currentRole === globals.creeps.builder.baseMemory.role &&
                                             creep.memory.onRepairFlag &&
                                             _.sum(creep.carry) < creep.carryCapacity
                    });

                    target = target[Math.floor(Math.random()*target.length)];
                }

                //Builders on red flags
                if(!target && creep.room.memory.hasBuildFlags){
                    target = creep.room.find(FIND_MY_CREEPS, {
                            filter: creep => creep.memory.currentRole === globals.creeps.builder.baseMemory.role &&
                                             creep.memory.onBuildFlag &&
                                             _.sum(creep.carry) < creep.carryCapacity
                    });

                    target = target[Math.floor(Math.random()*target.length)];
                }

                //Builders
                if(!target){
                    if(Math.random() < 0.5){
                        target = creep.room.find(FIND_MY_CREEPS, {
                                filter: creep => creep.memory.currentRole === globals.creeps.builder.baseMemory.role &&
                                                _.sum(creep.carry) < creep.carryCapacity
                        });
                    }
                    else{
                        target = creep.room.find(FIND_MY_CREEPS, {
                                filter: creep => creep.memory.currentRole === globals.creeps.fixer.baseMemory.role && creep.memory.fixingSomething &&
                                                _.sum(creep.carry) < creep.carryCapacity
                        });
                    }

                    target = target[Math.floor(Math.random()*target.length)];
                }

                //Anything less than 50% energy
                if(!target){
                    target = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN ||
                                structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity * 0.5;
                        }
                    });

                    target = target[Math.floor(Math.random()*target.length)];
                }
                //Anything not full
                if(!target){
                    target = creep.room.find(FIND_MY_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION ||
                                structure.structureType === STRUCTURE_SPAWN ||
                                structure.structureType === STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                        }
                    });

                    target = target[Math.floor(Math.random()*target.length)];
                }

                //Upgraders (10% of the time)
                if(doAnUpgrade || !target){
                    target = creep.room.find(FIND_MY_CREEPS, {
                        filter: creep => creep.memory.currentRole === globals.creeps.upgrader.baseMemory.role && _.sum(creep.carry) < creep.carryCapacity
                    });

                    target = target[Math.floor(Math.random()*target.length)];
                }

                creep.memory.dropOffTarget = target.id;
            }
            else{
                target = Game.getObjectById(creep.memory.dropOffTarget);
            }

            if(!target){
                creep.memory.dropOffTarget = null;
            }
            else if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            else{
                creep.memory.dropOffTarget = null;
            }
        }
    }
};

module.exports = roleCourier;