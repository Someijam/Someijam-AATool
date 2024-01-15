const { app, BrowserWindow } = require('electron')
const { queryAdvancement,queryAdvCriteria,queryNumberOfThings } = require('./queryAdv.js');
const { advancementsNameList, overworldBiomesList, netherBiomesList, mobsList, breedableAnimalsList, catsList, foodsList, templatesList } = require('./nameList.js');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')
}

console.log('欢迎来到 Electron 👋')
// 设置跟踪目录
var savesPath = "/Users/someijamling/Documents/Minecraft/.minecraft/versions/1.20.2/saves"
global.savesPath = savesPath

// 总体进度
console.log("\nAdvancements:")
for(var key of advancementsNameList)
{
    console.log(key + ": " + queryAdvancement(key))
}

// 各统计型进度要求项目
console.log("\nOverworld Biomes:")
for(var key of overworldBiomesList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:adventure/adventuring_time",key))
}
console.log("\nNether Biomes:")
for(var key of netherBiomesList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:nether/explore_nether",key))
}
console.log("\nMobs:")
for(var key of mobsList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:adventure/kill_all_mobs",key))
}
console.log("\nBreedable Animals:")
for(var key of breedableAnimalsList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:husbandry/bred_all_animals",key))
}
console.log("\nCats:")
for(var key of catsList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:husbandry/complete_catalogue",key))
}
console.log("\nFoods:")
for(var key of foodsList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:husbandry/balanced_diet",key))
}
console.log("\nTemplates:")
for(var key of templatesList)
{
    console.log(key + ": " + queryAdvCriteria("minecraft:adventure/trim_with_all_exclusive_armor_patterns",key))
}

// 收集特定物品的数量
// TODO

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})