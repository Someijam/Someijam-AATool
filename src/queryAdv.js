var fs = require('fs');

function getAdvancementsFileName() {
    // Find the newest subfolder under "saves" folder
    var newest = null;
    var newestTime = 0;
    fs.readdirSync(savesPath).forEach(subfolder => {
        var stats = fs.statSync(savesPath + "/" + subfolder);
        if (stats.isDirectory()) {
            var ctime = stats.ctime.getTime();
            if (ctime > newestTime) {
                newest = subfolder;
                newestTime = ctime;
            }
        }
    });
    // Read "advancements/uuid.json" in the newest subfolder under "saves" folder
    var advancementsPath = savesPath + "/" + newest + "/advancements"
    var advancements = fs.readdirSync(advancementsPath).sort().reverse()[0]
    var advancementsFile = advancementsPath + "/" + advancements
    // console.log("Current advancements path: " + advancementsFile)
    return advancementsFile
}

function getStatsFileName() {
    // Find the newest subfolder under "saves" folder
    var newest = null;
    var newestTime = 0;
    fs.readdirSync(savesPath).forEach(subfolder => {
        var stats = fs.statSync(savesPath + "/" + subfolder);
        if (stats.isDirectory()) {
            var ctime = stats.ctime.getTime();
            if (ctime > newestTime) {
                newest = subfolder;
                newestTime = ctime;
            }
        }
    });
    // Read "stats/uuid.json" in the newest subfolder under "saves" folder
    var statsPath = savesPath + "/" + newest + "/stats"
    var stats = fs.readdirSync(statsPath).sort().reverse()[0]
    var statsFile = statsPath + "/" + stats
    // console.log("Current stats path: " + statsFile)
    return statsFile
}

function queryAdvancement(nameKey) // Boolean
{
    var advancementsFile = getAdvancementsFileName()
    // var advancementsFile = "./example-advancements.json"
    var advancementsData = JSON.parse(fs.readFileSync(advancementsFile, 'utf8'));

    try {
        return advancementsData[nameKey].done
    } catch (error) {
        return false
    }
}

function queryAdvCriteria(advName,nameKey) //Boolean
{
    var advancementsFile = getAdvancementsFileName()
    // var advancementsFile = "./example-advancements.json"
    var advancementsData = JSON.parse(fs.readFileSync(advancementsFile, 'utf8'));

    try {
        return (advancementsData[advName].criteria[nameKey] != null)
    } catch (error) {
        return false
    }
}

function queryNumberOfThings(method,nameKey) //Integer 
{
    var statsFile = getStatsFileName()
    // var statsFile = "./example-stats.json"
    var statsData = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
    if(nameKey == "minecraft:enchanted_golden_apple")
    {
        try {
            if(advancementsData["minecraft:recipes/misc/mojang_banner_pattern"].done == true)
                return 1;
            else
                return 0;
        } catch (error) {
            return 0;
        }
    }
    
    try {
        return statsData.stats[method][nameKey]
    } catch (error) {
        return 0
    }
}

// export { queryAdvancement, queryAdvCriteria, queryNumberOfThings }
module.exports = { queryAdvancement, queryAdvCriteria, queryNumberOfThings }
