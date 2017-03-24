var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.building && creep.carry.energy === 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy === creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            var buildFlags = creep.room.find(FIND_FLAGS, (flag) => flag.color === COLOR_RED);
            var ImportantBuildTargets = [];
            var oldFlags = [];
            if(buildFlags.length){
                for(var flag of buildFlags){
                    var consSite = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, flag.pos);
                    if(consSite.length){
                        ImportantBuildTargets.push(consSite[0]);
                    }
                    else{
                        oldFlags.push(flag);
                    }
                }
            }
            
            oldFlags.forEach(flag => flag.remove());
            
            var targets = ImportantBuildTargets.length? ImportantBuildTargets : creep.room.find(FIND_CONSTRUCTION_SITES);
            if(targets.length) {
                if(creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};

module.exports = roleBuilder;