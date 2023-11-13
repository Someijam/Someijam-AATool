// In: savesPath
// Out: advancementsInfo
const fs = require('fs');
var path = require('path');

const advancementsNameList = [
    //story
    "minecraft:story/root",
    "minecraft:story/mine_stone",
    "minecraft:story/upgrade_tools",
    "minecraft:story/smelt_iron",
    "minecraft:story/obtain_armor",
    "minecraft:story/lava_bucket",
    "minecraft:story/iron_tools",
    "minecraft:story/deflect_arrow",
    "minecraft:story/form_obsidian",
    "minecraft:story/mine_diamond",
    "minecraft:story/enter_the_nether",
    "minecraft:story/shiny_gear",
    "minecraft:story/enchant_item",
    "minecraft:story/cure_zombie_villager",
    "minecraft:story/follow_ender_eye",
    "minecraft:story/enter_the_end",
    // nether
    "minecraft:nether/root",
    "minecraft:nether/return_to_sender",
    "minecraft:nether/find_bastion",
    "minecraft:nether/obtain_ancient_debris",
    "minecraft:nether/fast_travel",
    "minecraft:nether/find_fortress",
    "minecraft:nether/obtain_crying_obsidian",
    "minecraft:nether/distract_piglin",
    "minecraft:nether/ride_strider",
    "minecraft:nether/uneasy_alliance",
    "minecraft:nether/loot_bastion",
    "minecraft:nether/use_lodestone",
    "minecraft:nether/netherite_armor",
    "minecraft:nether/get_wither_skull",
    "minecraft:nether/obtain_blaze_rod",
    "minecraft:nether/charge_respawn_anchor",
    "minecraft:nether/ride_strider_in_overworld_lava",
    "minecraft:nether/explore_nether",
    "minecraft:nether/summon_wither",
    "minecraft:nether/brew_potion",
    "minecraft:nether/create_beacon",
    "minecraft:nether/all_potions",
    "minecraft:nether/create_full_beacon",
    "minecraft:nether/all_effects",
    // end
    "minecraft:end/root",
    "minecraft:end/kill_dragon",
    "minecraft:end/dragon_egg",
    "minecraft:end/enter_end_gateway",
    "minecraft:end/respawn_dragon",
    "minecraft:end/dragon_breath",
    "minecraft:end/find_end_city",
    "minecraft:end/elytra",
    "minecraft:end/levitate",
    // adventure
    "minecraft:adventure/root",
    "minecraft:adventure/voluntary_exile",
    "minecraft:adventure/spyglass_at_parrot",
    "minecraft:adventure/kill_a_mob",
    "minecraft:adventure/read_power_from_chiseled_bookshelf",
    "minecraft:adventure/trade",
    "minecraft:adventure/trim_with_any_armor_pattern",
    "minecraft:adventure/honey_block_slide",
    "minecraft:adventure/ol_betsy",
    "minecraft:adventure/lightning_rod_with_villager_no_fire",
    "minecraft:adventure/fall_from_world_height",
    "minecraft:adventure/salvage_sherd",
    "minecraft:adventure/avoid_vibration",
    "minecraft:adventure/sleep_in_bed",
    "minecraft:adventure/hero_of_the_village",
    "minecraft:adventure/spyglass_at_ghast",
    "minecraft:adventure/throw_trident",
    "minecraft:adventure/kill_mob_near_sculk_catalyst",
    "minecraft:adventure/shoot_arrow",
    "minecraft:adventure/kill_all_mobs",
    "minecraft:adventure/totem_of_undying",
    "minecraft:adventure/summon_iron_golem",
    "minecraft:adventure/trade_at_world_height",
    "minecraft:adventure/trim_with_all_exclusive_armor_patterns",
    "minecraft:adventure/two_birds_one_arrow",
    "minecraft:adventure/whos_the_pillager_now",
    "minecraft:adventure/arbalistic",
    "minecraft:adventure/craft_decorated_pot_using_only_sherds",
    "minecraft:adventure/adventuring_time",
    "minecraft:adventure/play_jukebox_in_meadows",
    "minecraft:adventure/walk_on_powder_snow_with_leather_boots",
    "minecraft:adventure/spyglass_at_dragon",
    "minecraft:adventure/very_very_frightening",
    "minecraft:adventure/sniper_duel",
    "minecraft:adventure/bullseye",
    // husbandry
    "minecraft:husbandry/root",
    "minecraft:husbandry/safely_harvest_honey",
    "minecraft:husbandry/breed_an_animal",
    "minecraft:husbandry/allay_deliver_item_to_player",
    "minecraft:husbandry/ride_a_boat_with_a_goat",
    "minecraft:husbandry/tame_an_animal",
    "minecraft:husbandry/make_a_sign_glow",
    "minecraft:husbandry/fishy_business",
    "minecraft:husbandry/silk_touch_nest",
    "minecraft:husbandry/tadpole_in_a_bucket",
    "minecraft:husbandry/obtain_sniffer_egg",
    "minecraft:husbandry/plant_seed",
    "minecraft:husbandry/wax_on",
    "minecraft:husbandry/bred_all_animals",
    "minecraft:husbandry/allay_deliver_cake_to_note_block",
    "minecraft:husbandry/complete_catalogue",
    "minecraft:husbandry/tactical_fishing",
    "minecraft:husbandry/leash_all_frog_variants",
    "minecraft:husbandry/feed_snifflet",
    "minecraft:husbandry/balanced_diet",
    "minecraft:husbandry/obtain_netherite_hoe",
    "minecraft:husbandry/wax_off",
    "minecraft:husbandry/axolotl_in_a_bucket",
    "minecraft:husbandry/froglights",
    "minecraft:husbandry/plant_any_sniffer_seed",
    "minecraft:husbandry/kill_axolotl_target"
]
const overworldBiomesList = [
    "minecraft:snowy_slopes",
    "minecraft:old_growth_pine_taiga",
    "minecraft:mushroom_fields",
    "minecraft:taiga",
    "minecraft:deep_ocean",
    "minecraft:eroded_badlands",
    "minecraft:frozen_river",
    "minecraft:cherry_grove",
    "minecraft:sunflower_plains",
    "minecraft:birch_forest",
    "minecraft:windswept_hills",
    "minecraft:bamboo_jungle",
    "minecraft:wooded_badlands",
    "minecraft:badlands",
    "minecraft:savanna_plateau",
    "minecraft:beach",
    "minecraft:dark_forest",
    "minecraft:stony_peaks",
    "minecraft:mangrove_swamp",
    "minecraft:sparse_jungle",
    "minecraft:lukewarm_ocean",
    "minecraft:river",
    "minecraft:snowy_plains",
    "minecraft:stony_shore",
    "minecraft:dripstone_caves",
    "minecraft:snowy_taiga",
    "minecraft:grove",
    "minecraft:swamp",
    "minecraft:jagged_peaks",
    "minecraft:cold_ocean",
    "minecraft:forest",
    "minecraft:lush_caves",
    "minecraft:deep_cold_ocean",
    "minecraft:ice_spikes",
    "minecraft:frozen_ocean",
    "minecraft:desert",
    "minecraft:deep_frozen_ocean",
    "minecraft:windswept_forest",
    "minecraft:jungle",
    "minecraft:ocean",
    "minecraft:old_growth_spruce_taiga",
    "minecraft:snowy_beach",
    "minecraft:windswept_savanna",
    "minecraft:warm_ocean",
    "minecraft:deep_lukewarm_ocean",
    "minecraft:flower_forest",
    "minecraft:frozen_peaks",
    "minecraft:old_growth_birch_forest",
    "minecraft:deep_dark",
    "minecraft:meadow",
    "minecraft:windswept_gravelly_hills",
    "minecraft:savanna",
    "minecraft:plains"
]
const netherBiomesList = [
    "minecraft:basalt_deltas",
    "minecraft:crimson_forest",
    "minecraft:soul_sand_valley",
    "minecraft:warped_forest",
    "minecraft:nether_wastes"
]
const mobsList = [
    "minecraft:blaze",
    "minecraft:pillager",
    "minecraft:skeleton",
    "minecraft:elder_guardian",
    "minecraft:zoglin",
    "minecraft:ravager",
    "minecraft:ghast",
    "minecraft:hoglin",
    "minecraft:guardian",
    "minecraft:vindicator",
    "minecraft:magma_cube",
    "minecraft:piglin_brute",
    "minecraft:spider",
    "minecraft:creeper",
    "minecraft:wither",
    "minecraft:evoker",
    "minecraft:slime",
    "minecraft:phantom",
    "minecraft:zombified_piglin",
    "minecraft:witch",
    "minecraft:wither_skeleton",
    "minecraft:husk",
    "minecraft:ender_dragon",
    "minecraft:shulker",
    "minecraft:cave_spider",
    "minecraft:piglin",
    "minecraft:enderman",
    "minecraft:silverfish",
    "minecraft:stray",
    "minecraft:endermite",
    "minecraft:vex",
    "minecraft:zombie",
    "minecraft:drowned",
    "minecraft:zombie_villager",
]
const breedableAnimalsList = [
    "minecraft:cat",
    "minecraft:donkey",
    "minecraft:fox",
    "minecraft:llama",
    "minecraft:pig",
    "minecraft:frog",
    "minecraft:turtle",
    "minecraft:sheep",
    "minecraft:mule",
    "minecraft:hoglin",
    "minecraft:sniffer",
    "minecraft:mooshroom",
    "minecraft:strider",
    "minecraft:ocelot",
    "minecraft:cow",
    "minecraft:goat",
    "minecraft:camel",
    "minecraft:chicken",
    "minecraft:wolf",
    "minecraft:panda",
    "minecraft:horse",
    "minecraft:rabbit",
    "minecraft:bee",
    "minecraft:axolotl"
]
const catsList = [
    "minecraft:white",
    "minecraft:tabby",
    "minecraft:calico",
    "minecraft:siamese",
    "minecraft:jellie",
    "minecraft:persian",
    "minecraft:black",
    "minecraft:all_black",
    "minecraft:ragdoll",
    "minecraft:british_shorthair",
    "minecraft:red"
]
const foodsList = [
    "cooked_porkchop",
    "chicken",
    "honey_bottle",
    "cooked_mutton",
    "sweet_berries",
    "chorus_fruit",
    "cooked_beef",
    "baked_potato",
    "beef",
    "porkchop",
    "tropical_fish",
    "beetroot_soup",
    "apple",
    "spider_eye",
    "potato",
    "cooked_cod",
    "rabbit",
    "poisonous_potato",
    "pumpkin_pie",
    "mutton",
    "pufferfish",
    "bread",
    "golden_apple",
    "cookie",
    "rotten_flesh",
    "suspicious_stew",
    "glow_berries",
    "dried_kelp",
    "salmon",
    "melon_slice",
    "beetroot",
    "golden_carrot",
    "cooked_rabbit",
    "cooked_chicken",
    "enchanted_golden_apple",
    "mushroom_stew",
    "cod",
    "rabbit_stew",
    "cooked_salmon",
    "carrot"
]
const templatesList = [
    "armor_trimmed_minecraft:silence_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:wayfinder_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:tide_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:spire_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:vex_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:ward_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:rib_armor_trim_smithing_template_smithing_trim",
    "armor_trimmed_minecraft:snout_armor_trim_smithing_template_smithing_trim"
]

// Provide "saves" folder path
var savesPath="/Users/someijamling/Documents/Minecraft/.minecraft/versions/1.20.1/saves"
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
// var advancementsFile = "./example-advancements.json"
var advancementsData = JSON.parse(fs.readFileSync(advancementsFile, 'utf8'));
console.log("Current advancements path: " + advancementsFile)

// Read "stats/uuid.json" in the newest subfolder under "saves" folder
var statsPath = savesPath + "/" + newest + "/stats"
var stats = fs.readdirSync(statsPath).sort().reverse()[0]
var statsFile = statsPath + "/" + stats
var statsData = JSON.parse(fs.readFileSync(statsFile, 'utf8'));
console.log("Current stats path: " + statsFile)

//Now we saved everything we need

// advancementsData :
// {
//     "minecraft:命名空间ID": {
//     "criteria": {
//          "条件1": 达成时间1,
//          "条件2": 达成时间2
//      },
//     "done": true/false
// }

// statsData :
// {
//    "stats": {
//         "minecraft:方式": {
//              "对象名1": 次数1,
//              "对象名2": 次数2
//         }
//    "DataVersion": 3465
// }

// Data structure of advancements:
// {[name1,status1],[name2,status2],...,[nameN,statusN]}
// Data structure of stats:
// {[name1,count1],[name2,count2],...,[nameN,countN]}

//Count advancements status
var advancementsStatusList = new Map()
for(var key of advancementsNameList) {
    try {
        // console.log(key, advancementsData[key].done)
        advancementsStatusList.set(key, advancementsData[key].done)
    } catch (error) {
        // console.log(error)
        advancementsStatusList.set(key, false)
    }
}

console.log(advancementsStatusList)

// console.log(statsData.stats)
//Count stats counts
var statsCountList = new Map()

numOfAncientDebris = statsData.stats["minecraft:mined"]["minecraft:ancient_debris"]
if(typeof numOfAncientDebris === 'undefined') numOfAncientDebris = 0
numOfGoldBlockMined = statsData.stats["minecraft:mined"]["minecraft:gold_block"]
if(typeof numOfGoldBlockMined === 'undefined') numOfGoldBlockMined = 0
numOfGoldBlockCrafted = statsData.stats["minecraft:crafted"]["minecraft:gold_block"]
if(typeof numOfGoldBlockCrafted === 'undefined') numOfGoldBlockCrafted = 0
numOfIronBlockCrafted = statsData.stats["minecraft:crafted"]["minecraft:iron_block"]
if(typeof numOfIronBlockCrafted === 'undefined') numOfIronBlockCrafted = 0
numOfDiamondBlockCrafted = statsData.stats["minecraft:crafted"]["minecraft:diamond_block"]
if(typeof numOfDiamondBlockCrafted === 'undefined') numOfDiamondBlockCrafted = 0
numOfTrident= statsData.stats["minecraft:picked_up"]["minecraft:trident"]
if(typeof numOfTrident === 'undefined') numOfTrident = 0
numOfShells = statsData.stats["minecraft:picked_up"]["minecraft:nautilus_shell"]
if(typeof numOfShells === 'undefined') numOfShells = 0
numOfSkulls = statsData.stats["minecraft:picked_up"]["minecraft:wither_skeleton_skull"]
if(typeof numOfSkulls === 'undefined') numOfSkulls = 0
numOfEggs = statsData.stats["minecraft:picked_up"]["minecraft:sniffer_egg"]
if(typeof numOfEggs === 'undefined') numOfEggs = 0


statsCountList.set("ancient_debris", statsData.stats["minecraft:mined"]["minecraft:ancient_debris"])
statsCountList.set("metal_block", numOfGoldBlockMined + numOfGoldBlockCrafted + numOfIronBlockCrafted + numOfDiamondBlockCrafted)
statsCountList.set("enchanted_golden_apple", advancementsData["minecraft:recipes/misc/mojang_banner_pattern"].done)
statsCountList.set("trident", numOfTrident)
statsCountList.set("nautilus_shell", numOfShells)
statsCountList.set("wither_skeleton_skull", numOfSkulls)
statsCountList.set("sniffer_egg",numOfEggs)

console.log(statsCountList)

//TODO: add stats count
// Nesseccary stats
// numeral count items
// 1 (music disc)
// ---

var overworldBiomesStatusList = new Map()
for(var key of overworldBiomesList) {
    try {
        // console.log(key, advancementsData[key].done)
        overworldBiomesStatusList.set(key, advancementsData["minecraft:adventure/adventuring_time"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        overworldBiomesStatusList.set(key, false)
    }
}
console.log(overworldBiomesStatusList)

var netherBiomesStatusList = new Map()
for(var key of netherBiomesList) {
    try {
        // console.log(key, advancementsData[key].done)
        netherBiomesStatusList.set(key, advancementsData["minecraft:nether/explore_nether"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        netherBiomesStatusList.set(key, false)
    }
}
console.log(netherBiomesStatusList)

var killedMobStatusList = new Map()
for(var key of mobsList) {
    try {
        // console.log(key, advancementsData[key].done)
        killedMobStatusList.set(key, advancementsData["minecraft:adventure/kill_all_mobs"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        killedMobStatusList.set(key, false)
    }
}
console.log(killedMobStatusList)

var breedAnimalStatusList = new Map()
for(var key of breedableAnimalsList) {
    try {
        // console.log(key, advancementsData[key].done)
        breedAnimalStatusList.set(key, advancementsData["minecraft:husbandry/bred_all_animals"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        breedAnimalStatusList.set(key, false)
    }
}
console.log(breedAnimalStatusList)

var catStatusList = new Map()
for(var key of catsList) {
    try {
        // console.log(key, advancementsData[key].done)
        catStatusList.set(key, advancementsData["minecraft:husbandry/complete_catalogue"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        catStatusList.set(key, false)
    }
}
console.log(catStatusList)

var foodStatusList = new Map()
for(var key of foodsList) {
    try {
        // console.log(key, advancementsData[key].done)
        foodStatusList.set(key, advancementsData["minecraft:husbandry/balanced_diet"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        foodStatusList.set(key, false)
    }
}
console.log(foodStatusList)

var templatesStatusList = new Map()
for(var key of templatesList) {
    try {
        // console.log(key, advancementsData[key].done)
        templatesStatusList.set(key, advancementsData["minecraft:adventure/trim_with_all_exclusive_armor_patterns"].criteria[key] != null)
    } catch (error) {
        // console.log(error)
        templatesStatusList.set(key, false)
    }
}
console.log(templatesStatusList)
// collective items
// 5 nether biomes
// 53 overworld biomes
// 34 mobs
// 24 breedable animals
// 11 kinds of cats
// 40 kinds of foods
// 8 kinds of templates


// var advancementsStatusList = new Map()

// var statsCountList = new Map()

// var overworldBiomesStatusList = new Map()
// var netherBiomesStatusList = new Map()
// var killedMobStatusList = new Map()
// var breedAnimalStatusList = new Map()
// var catStatusList = new Map()
// var foodStatusList = new Map()
// var templatesStatusList = new Map()
