canvas.addEventListener('mousedown', startMining, false);
canvas.addEventListener('mousemove', MouseMove, false);
canvas.addEventListener('mouseup', stopMining, false);
var mining = false;
var tileX;
var tileY;
var blockDamage;

function Mine() {
    var minedBlock = gamemap[Math.floor(tileY)][Math.floor(tileX)];
    gamemap[tileY][tileX] = 0;
    collisionmap[tileY][tileX] = 0;

    if (inventory[selectedSlot] != null) {
        tool = inventory[selectedSlot].block.id;
    } else {
        tool = null;
    }
    

    if (toBlock(minedBlock) == Coal_Ore) {
        if (tool == Wooden_Pickaxe.id || tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id || tool == Golden_Pickaxe.id) { 
            PlaceInventory(Coal, 1);
        }        
    } else if (toBlock(minedBlock) == Stone || toBlock(minedBlock) == Cobblestone) {
        if (tool == Wooden_Pickaxe.id || tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id || tool == Golden_Pickaxe.id) { 
            PlaceInventory(Cobblestone, 1);
        }
    } else if (toBlock(minedBlock) == Iron_Ore) {
        if (tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Iron_Ore, 1);
        }
    } else if (toBlock(minedBlock) == Gold_Ore) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Gold_Ore, 1);
        }
    } else if (toBlock(minedBlock) == Redstone_Ore) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Redstone, 4 + Math.round(Math.random()*4))
        }
    } else if (toBlock(minedBlock) == Lapis_Ore) {
        if (tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Lapis, 4 + Math.round(Math.random()*4))
        }
    } else if (toBlock(minedBlock) == Diamond_Ore) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Diamond, 1)
        }
    } else if (toBlock(minedBlock) == Emerald_Ore) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Emerald, 1);
        }
    } else if (toBlock(minedBlock) == Oak_Leaves || toBlock(minedBlock) == Spruce_Leaves) {
        console.log('leaves');
        if (Math.random() > 0.5) {
            PlaceInventory(Apple, 1);
        }
    } else if (toBlock(minedBlock) == Coal_Block) {
        if (tool == Wooden_Pickaxe.id || tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id || tool == Golden_Pickaxe.id) { 
            PlaceInventory(Coal_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Iron_Block) {
        if (tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Iron_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Gold_Block) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Gold_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Lapis_Block) {
        if (tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Lapis_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Redstone_Block) {
        if (tool == Wooden_Pickaxe.id || tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id || tool == Golden_Pickaxe.id) { 
            PlaceInventory(Redstone_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Diamond_Block) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Diamond_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Emerald_Block) {
        if (tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id) { 
            PlaceInventory(Emerald_Block, 1);
        }  
    } else if (toBlock(minedBlock) == Furnace) {
        if (tool == Wooden_Pickaxe.id || tool == Stone_Pickaxe.id || tool == Iron_Pickaxe.id || tool == Diamond_Pickaxe.id || tool == Golden_Pickaxe.id) { 
            PlaceInventory(Furnace, 1);
        }
    } else {
        PlaceInventory(toBlock(minedBlock), 1);
    }

    if (toBlock(minedBlock) == Chest) {
        removeChest(tileX, tileY);
    } else if (toBlock(minedBlock) == Furnace) {
        removeFurnace(tileX, tileY);
    }

    blockDamage = 0;
}

function startMining(e) {
    x = e.clientX - viewport.offset.x;
    y = e.clientY - viewport.offset.y;
    tileX = Math.floor(x/tileW);
    tileY = Math.floor(y/tileH);

    BRtile = {x: Math.floor(player.BR.x/tileW), y: Math.floor(player.BR.y/tileH)};
    BLtile = {x: Math.floor(player.BL.x/tileW), y: Math.floor(player.BL.y/tileH)};
    TRtile = {x: Math.floor(player.TR.x/tileW), y: Math.floor(player.TR.y/tileH)};
    TLtile = {x: Math.floor(player.TL.x/tileW), y: Math.floor(player.TL.y/tileH)};

    if (Math.floor(x/tileW) == BRtile.x && Math.floor(y/tileH) == BRtile.y) { return };
    if (Math.floor(x/tileW) == BLtile.x && Math.floor(y/tileH) == BLtile.y) { return };
    if (Math.floor(x/tileW) == TRtile.x && Math.floor(y/tileH) == TRtile.y) { return };
    if (Math.floor(x/tileW) == TLtile.x && Math.floor(y/tileH) == TLtile.y) { return };

    if (tileX < 0 || tileX > mapW || tileY < 0 || tileY > mapH) { return };
    if (!invHidden) { return}

    if (gamemap[Math.floor(y/tileH)][Math.floor(x/tileW)] == 58 && keys[16]) {
        tableHidden = false;
        invHidden = false;
        return;
    } else if (gamemap[tileY][tileX] == 61 && keys[16]) {
        furnaceHidden = false;
        invHidden = false;
        openFurnace(tileX, tileY);
    } else if (gamemap[tileY][tileX] == 54 && keys[16]) {
        chestHidden = false;
        invHidden = false;
        openChest(tileX, tileY);
    } 

    if (inventory[selectedSlot] != null && inventory[selectedSlot].block.id == Apple.id && keys[16]) {
        player.food += 20;
        if (player.food > 100) {
            player.food = 100;
        }
        inventory[selectedSlot].amount -= 1;
    }

    if (keys[16] == true && gamemap[tileY][tileX] == 0) {
        if (inventory[selectedSlot] == null || inventory[selectedSlot].block.type == 'tool') { return }

        if (inventory[selectedSlot].block.type == 'block') {
            if (inventory[selectedSlot].block.id == 65) {
                gamemap[tileY][tileX] = 65;
                collisionmap[tileY][tileX] = 0;
                inventory[selectedSlot].amount -= 1;
                return;
            }
            if (inventory[selectedSlot].block.id == 61) {
                furnaces.push(new oFurnace(tileX, tileY));
            } else if (inventory[selectedSlot].block.id == 54) {
                chests.push(new oChest(tileX, tileY));
            }

            if (inventory[selectedSlot].block.id == 61 || inventory[selectedSlot].block.id == 54 || inventory[selectedSlot].block.id == 58 || inventory[selectedSlot].block.id == 50) {
                collisionmap[tileY][tileX] = 0;
            } else {
                collisionmap[tileY][tileX] = 1;
            }

            gamemap[tileY][tileX] = inventory[selectedSlot].block.id;
            inventory[selectedSlot].amount -= 1; 
        }
        return;
    }

    if (gamemap[Math.floor(y/tileH)][Math.floor(x/tileW)] == 7 || gamemap[Math.floor(y/tileH)][Math.floor(x/tileW)] == 0) {
        return;
    }

    

    mining = true;
    blockDamage = 0;
    blockHP = toBlock(gamemap[tileY][tileX]).hp;
}

function Mining() {
    if (mining == false) { return }
    if (blockDamage >= blockHP) {
        Mine();
        return;
    }

    if (!invHidden) { mining == false; return}

    if (gamemap[tileY][tileX] == 0) {
        return;
    }

    block = toBlock(gamemap[tileY][tileX]);
    if (inventory[selectedSlot] != null) {
        if (inventory[selectedSlot].block.id == Wooden_Pickaxe.id) {
            if (block == Stone)  { blockDamage += 7.5/1.15; }
            else if (block == Cobblestone) { blockDamage += 10/1.5}
            else if (block == Coal_Ore) { blockDamage += 15/2.25; } 
            else if (block == Iron_Ore) { blockDamage += 15/7.5; }
            else if (block == Gold_Ore) { blockDamage += 15/7.5; }
            else if (block == Lapis_Ore) { blockDamage += 15/7.5; }
            else if (block == Diamond_Ore) { blockDamage += 15/7.5; }
            else if (block == Redstone_Ore) { blockDamage += 15/7.5; }
            else if (block == Emerald_Ore) { blockDamage += 15/7.5; }
            else if (block == Furnace) { blockDamage += 17.5/2.65 }
            else if (block == Coal_Block) { blockDamage += 25/3.75 }
            else if (block == Iron_Block) { blockDamage += 25/12.5 }
            else if (block == Gold_Block) { blockDamage += 15/7.5 }
            else if (block == Lapis_Block) { blockDamage += 15/7.5 }
            else if (block == Redstone_Block) { blockDamage += 25/3.75 }
            else if (block == Diamond_Block) { blockDamage += 25/12.5 }
            else if (block == Emerald_Block) { blockDamage += 25/12.5}
            else if (block == Sandstone) { blockDamage += 4/0.65 }
            else { blockDamage += 1 };
        } else if (inventory[selectedSlot].block.id == Wooden_Axe.id) {
            if (block == Oak_Wood || block == Spruce_Wood) { blockDamage += 3/1.5 }
            else if (block == Oak_Planks || block == Spruce_Planks) { blockDamage += 3/1.5}
            else if (block == Crafting_Table || block == Chest) { blockDamage += 3.75/1.9 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Wooden_Shovel.id) {
            if (block == Grass) { blockDamage += 0.9/0.45 }
            else if (block == Dirt || block == Sand) { blockDamage += 0.75/0.4 } 
            else if (block == Gravel) { blockDamage += 0.9/0.45 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Stone_Pickaxe.id) {
            if (block == Stone)  { blockDamage += 7.5/0.6; }
            else if (block == Cobblestone) { blockDamage += 10/0.75}
            else if (block == Coal_Ore) { blockDamage += 15/1.15; } 
            else if (block == Iron_Ore) { blockDamage += 15/1.15; }
            else if (block == Gold_Ore) { blockDamage += 15/3.75; }
            else if (block == Lapis_Ore) { blockDamage += 15/1.15; }
            else if (block == Diamond_Ore) { blockDamage += 15/3.75; }
            else if (block == Redstone_Ore) { blockDamage += 15/3.75; }
            else if (block == Emerald_Ore) { blockDamage += 15/3.75; }
            else if (block == Furnace) { blockDamage += 17.5/1.35 }
            else if (block == Coal_Block) { blockDamage += 25/1.9 }
            else if (block == Iron_Block) { blockDamage += 25/1.9 }
            else if (block == Gold_Block) { blockDamage += 15/3.75 }
            else if (block == Lapis_Block) { blockDamage += 15/1.15 }
            else if (block == Redstone_Block) { blockDamage += 25/1.9 }
            else if (block == Diamond_Block) { blockDamage += 25/6.25 }
            else if (block == Emerald_Block) { blockDamage += 25/6.25}
            else if (block == Sandstone) { blockDamage += 4/0.35 }
            else { blockDamage += 1 };
        } else if (inventory[selectedSlot].block.id == Stone_Axe.id) {
            if (block == Oak_Wood || block == Spruce_Wood) { blockDamage += 3/0.75 }
            else if (block == Oak_Planks || block == Spruce_Planks) { blockDamage += 3/0.75 }
            else if (block == Crafting_Table || block == Chest) { blockDamage += 3.75/0.95 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Stone_Shovel.id) {
            if (block == Grass) { blockDamage += 0.9/0.25 }
            else if (block == Dirt || block == Sand) { blockDamage += 0.75/0.2 } 
            else if (block == Gravel) { blockDamage += 0.9/0.25 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Iron_Pickaxe.id) {
            if (block == Stone)  { blockDamage += 7.5/0.4; }
            else if (block == Cobblestone) { blockDamage += 10/0.5}
            else if (block == Coal_Ore) { blockDamage += 15/0.75; } 
            else if (block == Iron_Ore) { blockDamage += 15/0.75; }
            else if (block == Gold_Ore) { blockDamage += 15/0.75; }
            else if (block == Lapis_Ore) { blockDamage += 15/0.75; }
            else if (block == Diamond_Ore) { blockDamage += 15/0.75; }
            else if (block == Redstone_Ore) { blockDamage += 15/0.75; }
            else if (block == Emerald_Ore) { blockDamage += 15/0.75; }
            else if (block == Furnace) { blockDamage += 17.5/0.9 }
            else if (block == Coal_Block) { blockDamage += 25/1.25 }
            else if (block == Iron_Block) { blockDamage += 25/1.25 }
            else if (block == Gold_Block) { blockDamage += 15/0.75 }
            else if (block == Lapis_Block) { blockDamage += 15/0.75 }
            else if (block == Redstone_Block) { blockDamage += 25/1.25 }
            else if (block == Diamond_Block) { blockDamage += 25/1.25 }
            else if (block == Emerald_Block) { blockDamage += 25/1.25}
            else if (block == Sandstone) { blockDamage += 4/0.2 }
            else { blockDamage += 1 };
        } else if (inventory[selectedSlot].block.id == Iron_Axe.id) {
            if (block == Oak_Wood || block == Spruce_Wood) { blockDamage += 3/0.5 }
            else if (block == Oak_Planks || block == Spruce_Planks) { blockDamage += 3/0.5 }
            else if (block == Crafting_Table || block == Chest) { blockDamage += 3.75/0.65 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Iron_Shovel.id) {
            if (block == Grass) { blockDamage += 0.9/0.15 }
            else if (block == Dirt || block == Sand) { blockDamage += 0.75/0.15 } 
            else if (block == Gravel) { blockDamage += 0.9/0.15 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Diamond_Pickaxe.id) {
            if (block == Stone)  { blockDamage += 7.5/0.4; }
            else if (block == Cobblestone) { blockDamage += 10/0.4}
            else if (block == Coal_Ore) { blockDamage += 15/0.6; } 
            else if (block == Iron_Ore) { blockDamage += 15/0.6; }
            else if (block == Gold_Ore) { blockDamage += 15/0.6; }
            else if (block == Lapis_Ore) { blockDamage += 15/0.6; }
            else if (block == Diamond_Ore) { blockDamage += 15/0.6; }
            else if (block == Redstone_Ore) { blockDamage += 15/0.6; }
            else if (block == Emerald_Ore) { blockDamage += 15/0.6; }
            else if (block == Furnace) { blockDamage += 17.5/0.7 }
            else if (block == Coal_Block) { blockDamage += 25/0.95 }
            else if (block == Iron_Block) { blockDamage += 25/0.95 }
            else if (block == Gold_Block) { blockDamage += 15/0.6 }
            else if (block == Lapis_Block) { blockDamage += 15/0.6 }
            else if (block == Redstone_Block) { blockDamage += 25/0.95 }
            else if (block == Diamond_Block) { blockDamage += 25/0.95 }
            else if (block == Emerald_Block) { blockDamage += 25/0.95}
            else if (block == Sandstone) { blockDamage += 4/0.2 }
            else { blockDamage += 1 };
        } else if (inventory[selectedSlot].block.id == Diamond_Axe.id) {
            if (block == Oak_Wood || block == Spruce_Wood) { blockDamage += 3/0.4 }
            else if (block == Oak_Planks || block == Spruce_Planks) { blockDamage += 3/0.4 }
            else if (block == Crafting_Table || block == Chest) { blockDamage += 3.75/0.5 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Diamond_Shovel.id) {
            if (block == Grass) { blockDamage += 0.9/0.15 }
            else if (block == Dirt || block == Sand) { blockDamage += 0.75/0.1 } 
            else if (block == Gravel) { blockDamage += 0.9/0.15 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Golden_Pickaxe.id) {
            if (block == Stone)  { blockDamage += 7.5/0.4; }
            else if (block == Cobblestone) { blockDamage += 10/0.25}
            else if (block == Coal_Ore) { blockDamage += 15/0.4; } 
            else if (block == Iron_Ore) { blockDamage += 15/1.25; }
            else if (block == Gold_Ore) { blockDamage += 15/1.25; }
            else if (block == Lapis_Ore) { blockDamage += 15/1.25; }
            else if (block == Diamond_Ore) { blockDamage += 15/1.25; }
            else if (block == Redstone_Ore) { blockDamage += 15/1.25; }
            else if (block == Emerald_Ore) { blockDamage += 15/1.25; }
            else if (block == Furnace) { blockDamage += 17.5/0.45 }
            else if (block == Coal_Block) { blockDamage += 25/0.65 }
            else if (block == Iron_Block) { blockDamage += 25/2.1 }
            else if (block == Gold_Block) { blockDamage += 15/1.25 }
            else if (block == Lapis_Block) { blockDamage += 15/1.25 }
            else if (block == Redstone_Block) { blockDamage += 25/0.65 }
            else if (block == Diamond_Block) { blockDamage += 25/2.1 }
            else if (block == Emerald_Block) { blockDamage += 25/2.1 }
            else if (block == Sandstone) { blockDamage += 4/0.1 }
            else { blockDamage += 1 };
        } else if (inventory[selectedSlot].block.id == Golden_Axe.id) {
            if (block == Oak_Wood || block == Spruce_Wood) { blockDamage += 3/0.25 }
            else if (block == Oak_Planks || block == Spruce_Planks) { blockDamage += 3/0.25 }
            else if (block == Crafting_Table || block == Chest) { blockDamage += 3.75/0.35 }
            else { blockDamage += 1 }
        } else if (inventory[selectedSlot].block.id == Golden_Shovel.id) {
            if (block == Grass) { blockDamage += 0.9/0.1 }
            else if (block == Dirt || block == Sand) { blockDamage += 0.75/0.1 } 
            else if (block == Gravel) { blockDamage += 0.9/0.1 }
            else { blockDamage += 1 }
        } else {
            blockDamage += 1;
        }
    } else {
        blockDamage += 1;
    }
    
    
    
    blockDamageSize = blockDamage/blockHP*tileH;
    ctx.fillStyle = 'rgba(255,255,255, 0.5)';
    ctx.fillRect(viewport.offset.x + tileX*tileW, viewport.offset.y + tileY*tileH, tileW, blockDamageSize);
}

function stopMining() {
    mining = false;
}

function MouseMove(e) {
    newX = e.clientX - viewport.offset.x;
    newY = e.clientY - viewport.offset.y;
    newTileX = Math.floor(newX/tileW);
    newTileY = Math.floor(newY/tileH);

    if (newTileX == tileX && newTileY == tileY) {
        return;
    } else if (mining == true){
        startMining(e);
    } else {
        return;
    }
}

loaded[4] = true;