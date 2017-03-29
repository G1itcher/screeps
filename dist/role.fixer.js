var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.carry.energy === 0) {
            creep.say('🔄 Need Energy!');
        }
        if(!creep.memory.building) {
            creep.memory.building = true;
            creep.say('🚧 repair');
        }

        if(creep.room.memory.hasCouriers) {
            var repairFlags = creep.room.find(FIND_FLAGS, (flag) => flag.color === COLOR_ORANGE);
            var ImportantRepairTargets = [];
            var oldFlags = [];
            if(repairFlags.length){
                for(var flag of repairFlags){
                    var consSite = creep.room.lookForAt(LOOK_STRUCTURES, flag.pos);
                    if(consSite && consSite.hits < consSite.hitsMax){
                        ImportantRepairTargets.push(consSite);
                    }
                    else{
                        oldFlags.push(flag);
                    }
                }
            }
            
            oldFlags.forEach(flag => flag.remove());

            creep.memory.onRepairFlag = creep.room.memory.hasRepairFlags = ImportantRepairTargets.length > 0;

            
            var target = ImportantRepairTargets.length? ImportantRepairTargets : creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: c => c.hits < c.hitsMax
            }) || creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: c => c.hits < c.hitsMax * 0.5 && c.structureType === STRUCTURE_ROAD
            });
            console.log(target);
            if(target) {
                if(creep.repair(target) === ERR_NOT_IN_RANGE || creep.carry.energy === 0) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
                creep.memory.fixingSomething = true;
                return true;
            }
            else{
                creep.memory.fixingSomething = false;
                return false;
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
            return true;
        }
    }
};

module.exports = roleBuilder;