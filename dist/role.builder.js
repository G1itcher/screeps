var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy === 0) {
            creep.say('🔄 Need Energy!');
        }
        if(!creep.memory.building) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.room.memory.hasCouriers) {
            var buildFlags = creep.room.find(FIND_FLAGS, (flag) => flag.color === COLOR_RED);
            var ImportantBuildTargets = [];
            var oldFlags = [];
            if(buildFlags.length){
                for(var flag of buildFlags){
                    var consSite = creep.room.lookForAt(LOOK_CONSTRUCTION_SITES, flag.pos);
                    if(consSite){
                        ImportantBuildTargets.push(consSite);
                    }
                    else{
                        oldFlags.push(flag);
                    }
                }
            }
            
            oldFlags.forEach(flag => flag.remove());

            creep.memory.onBuildFlag = creep.room.memory.hasBuildFlags = ImportantBuildTargets.length > 0;

            
            var target = ImportantBuildTargets.length? ImportantBuildTargets : creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) === ERR_NOT_IN_RANGE || creep.carry.energy === 0) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
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