var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleFixer = require('role.fixer');
//var roleMiner = require('role.miner');
var roleCourier = require('role.courier');
var behaviourSpawn = require("behaviour.spawning");

module.exports.loop = function () {

    var somethingToSpawn = behaviourSpawn.spawn();
    console.log("Creepers to spawn: "+somethingToSpawn);
    
    function findRole(creep){
        if(creep.room.find(FIND_CONSTRUCTION_SITES).length)
        {
            creep.memory.currentRole = "builder";
            roleBuilder.run(creep);
        }
        else{
            creep.memory.currentRole = "fixer";
            roleFixer.run(creep);
        }
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role === 'harvester') {
            creep.memory.currentRole = "harvester";
            roleHarvester.run(creep);
        }
        if(creep.memory.role === 'upgrader') {
            creep.memory.currentRole = "upgrader";
            roleUpgrader.run(creep);
        }
        else if(creep.memory.role === 'builder') {
            findRole(creep);
        }
        else if(creep.memory.role === 'miner') {
            if(somethingToSpawn > 0)
            {
                creep.memory.currentRole = "harvester";
                roleHarvester.run(creep);
            }
            else{
                creep.memory.currentRole = "upgrader";
                roleUpgrader.run(creep);
            }
        }
        else if(creep.memory.role === 'courier') {
            creep.memory.currentRole = "courier";
            roleCourier.run(creep);
        }
    }
};
