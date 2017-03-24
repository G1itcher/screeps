var globals = require("globals");
var creepCounts = globals.creepCount;

var spawnBehaviour = {

    spawn: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
                console.log('Clearing non-existing creep memory:', name);
            }
        }

        var currentSpawn;

        for(let spawn in Game.spawns)
        {
            currentSpawn = Game.spawns[spawn];
            break;
        }

        var somethingToSpawn = 0;
    
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role === 'harvester');
        console.log('Harvesters: ' + harvesters.length);

        var couriers = _.filter(Game.creeps, (creep) => creep.memory.role === 'courier');
        console.log('Couriers: ' + couriers.length);
        
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role === 'upgrader');
        console.log('Upgraders: ' + upgraders.length);
        
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role === 'builder');
        console.log('Builders: ' + builders.length);
        
        var miners = _.filter(Game.creeps, (creep) => creep.memory.role === 'miner');
        console.log('Miners: ' + miners.length);
    
    
        if(harvesters.length < creepCounts.MAX_HARVESTERS) {
            let newName = currentSpawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
            somethingToSpawn += creepCounts.MAX_HARVESTERS - harvesters.length;
            console.log('Spawning new harvester: ' + newName);
        }

        if(couriers.length < creepCounts.MAX_HARVESTERS) {
            let newName = currentSpawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'courier'});
            somethingToSpawn += creepCounts.MAX_HARVESTERS - couriers.length;
            console.log('Spawning new courier: ' + newName);
        }
        
        if(upgraders.length < creepCounts.MAX_UPGRADERS) {
            let newName = currentSpawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
            somethingToSpawn += creepCounts.MAX_UPGRADERS - upgraders.length;
            console.log('Spawning new upgrader: ' + newName);
        }
        
        if(builders.length < creepCounts.MAX_BUILDERS) {
            let newName = currentSpawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
            somethingToSpawn += creepCounts.MAX_BUILDERS - builders.length;
            console.log('Spawning new builder: ' + newName);
        }
        
        if(miners.length < creepCounts.MAX_MINERS) {
            let newName = currentSpawn.createCreep([WORK,CARRY,MOVE], undefined, {role: 'miner'});
            somethingToSpawn += creepCounts.MAX_MINERS - miners.length;
            console.log('Spawning new miner: ' + newName);
        }

        
    
        if(currentSpawn.spawning) {
            var spawningCreep = Game.creeps[currentSpawn.spawning.name];
            currentSpawn.room.visual.text(
                '🛠️' + spawningCreep.memory.role,
                currentSpawn.pos.x + 1,
                currentSpawn.pos.y,
                {align: 'left', opacity: 0.8});
        }
        
        return somethingToSpawn;
    }
};

module.exports = spawnBehaviour;