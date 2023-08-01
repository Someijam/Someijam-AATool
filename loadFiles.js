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

//Count stats counts
var statsCountList = new Map()
//TODO: add stats count
// Nesseccary stats
// numeral count items
// 20 (ancient debris + netherite scrap + 4*nethrite ingots)
// 3 (wither skulls)
// 164 (blocks of gold/iron/diamond/emerald)
// 8 (shells)
// 1 (trident)
// 1 (music disc)
// 1 (enchanted golden apple)
// ---
// collective items
// 5 nether biomes
// 53 overworld biomes
// 34 mobs
// 24 breedable animals
// 11 kinds of cats
// 40 kinds of foods