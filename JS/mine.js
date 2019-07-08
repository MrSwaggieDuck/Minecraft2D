canvas.addEventListener('mousedown', startMining, false);
canvas.addEventListener('mousemove', MouseMove, false);
canvas.addEventListener('mouseup', stopMining, false);
var mining = false;
var tileX;
var tileY;
var blockDamage;

function Mine() {
    var minedBlock = gamemap[Math.floor(tileY)][Math.floor(tileX)];
    gamemap[Math.floor(tileY)][Math.floor(tileX)] = 0;

    tool = inventory[selectedSlot];

    if (toBlock(minedBlock) == Coal_Ore) {
        if (tool == Wooden_Pickaxe || tool == Stone_Pickaxe || tool == Iron_Pickaxe || tool == Diamond_Pickaxe || tool == Golden_Pickaxe) { 
            Coal.amount += 1; minedBlock = 263;
        }        
    } else if (toBlock(minedBlock) == Stone || toBlock(minedBlock) == Cobblestone) {
        if (tool == Wooden_Pickaxe || tool == Stone_Pickaxe || tool == Iron_Pickaxe || tool == Diamond_Pickaxe || tool == Golden_Pickaxe) { 
            Cobblestone.amount += 1; minedBlock = 4
        }
    } else if (toBlock(minedBlock) == Iron_Ore) {
        if (tool == Stone_Pickaxe || tool == Iron_Pickaxe || tool == Diamond_Pickaxe) { 
            Iron_Ore.amount += 1; minedBlock = 15;
        }
    } else if (toBlock(minedBlock) == Gold_Ore) {
        if (tool == Iron_Pickaxe || tool == Diamond_Pickaxe) { 
            Gold_Ore.amount += 1; minedBlock = 14;
        }
    } else if (toBlock(minedBlock) == Redstone_Ore) {
        if (tool == Iron_Pickaxe || tool == Diamond_Pickaxe) { 
            Redstone.amount += 1; minedBlock = 331;
        }
    } else if (toBlock(minedBlock) == Lapis_Ore) {
        if (tool == Stone_Pickaxe || tool == Iron_Pickaxe || tool == Diamond_Pickaxe) { 
            Lapis.amount += 4 + Math.round(Math.random()*4); minedBlock = 351.4;
        }
    } else if (toBlock(minedBlock) == Diamond_Ore) {
        if (tool == Iron_Pickaxe || tool == Diamond_Pickaxe) { 
            Diamond.amount += 1; minedBlock = 264;
        }
    } else if (toBlock(minedBlock) == Emerald_Ore) {
        if (tool == Iron_Pickaxe || tool == Diamond_Pickaxe) { 
            Emerald.amount += 1; minedBlock = 388;
        }
    } else if (toBlock(minedBlock) == Oak_Leaves) {

    } else {
        toBlock(minedBlock).amount += 1;
    }
    
    PlaceInventory(toBlock(minedBlock));
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
    }

    if (keys[16] == true && gamemap[tileY][tileX] == 0) {
        if (inventory[selectedSlot] == null || inventory[selectedSlot].type == 'tool') { return }

        if (inventory[selectedSlot].type == 'block') {
            if (inventory[selectedSlot].id == 61) {
                console.log('NEW FURNACE')
                furnaces.push(new Furnace(tileX, tileY));
            }

            gamemap[tileY][tileX] = inventory[selectedSlot].id;
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

    block = gamemap[tileY][tileX];
    
    if (inventory[selectedSlot] == Wooden_Pickaxe) {
        if (block == 1)  { blockDamage += 7.5/1.15; }
        else if (block == 4) { blockDamage += 10/1.5}
        else if (block == 16) { blockDamage += 15/2.25; } 
        else if (block == 15) { blockDamage += 15/7.5; }
        else if (block == 14) { blockDamage += 15/7.5; }
        else if (block == 21) { blockDamage += 15/7.5; }
        else if (block == 56) { blockDamage += 15/7.5; }
        else if (block == 73) { blockDamage += 15/7.5; }
        else if (block == 129) { blockDamage += 15/7.5; }
        else { blockDamage += 1 };
    } else if (inventory[selectedSlot] == Wooden_Axe) {
        if (block == 17) { blockDamage += 3/1.5 }
        else if (block == 5) { blockDamage += 3/1.5}
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Wooden_Shovel) {
        if (block == 2) { blockDamage += 0.9/0.45 }
        else if (block == 3) { blockDamage += 0.75/0.4 } 
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Stone_Pickaxe) {
        if (block == 1)  { blockDamage += 7.5/0.6; }
        else if (block == 4) { blockDamage += 10/0.75}
        else if (block == 16) { blockDamage += 15/1.15; } 
        else if (block == 15) { blockDamage += 15/1.15; }
        else if (block == 14) { blockDamage += 15/3.75; }
        else if (block == 21) { blockDamage += 15/1.15; }
        else if (block == 56) { blockDamage += 15/3.75; }
        else if (block == 73) { blockDamage += 15/3.75; }
        else if (block == 129) { blockDamage += 15/3.75; }
        else { blockDamage += 1 };
    } else if (inventory[selectedSlot] == Stone_Axe) {
        if (block == 17) { blockDamage += 3/0.75 }
        else if (block == 5) { blockDamage += 3/0.75 }
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Stone_Shovel) {
        if (block == 2) { blockDamage += 0.9/0.25 }
        else if (block == 3) { blockDamage += 0.75/0.2 } 
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Iron_Pickaxe) {
        if (block == 1)  { blockDamage += 7.5/0.4; }
        else if (block == 4) { blockDamage += 10/0.5}
        else if (block == 16) { blockDamage += 15/0.75; } 
        else if (block == 15) { blockDamage += 15/0.75; }
        else if (block == 14) { blockDamage += 15/0.75; }
        else if (block == 21) { blockDamage += 15/0.75; }
        else if (block == 56) { blockDamage += 15/0.75; }
        else if (block == 73) { blockDamage += 15/0.75; }
        else if (block == 129) { blockDamage += 15/0.75; }
        else { blockDamage += 1 };
    } else if (inventory[selectedSlot] == Iron_Axe) {
        if (block == 17) { blockDamage += 3/0.5 }
        else if (block == 5) { blockDamage += 3/0.5 }
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Iron_Shovel) {
        if (block == 2) { blockDamage += 0.9/0.15 }
        else if (block == 3) { blockDamage += 0.75/0.15 } 
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Diamond_Pickaxe) {
        if (block == 1)  { blockDamage += 7.5/0.4; }
        else if (block == 4) { blockDamage += 10/0.4}
        else if (block == 16) { blockDamage += 15/0.6; } 
        else if (block == 15) { blockDamage += 15/0.6; }
        else if (block == 14) { blockDamage += 15/0.6; }
        else if (block == 21) { blockDamage += 15/0.6; }
        else if (block == 56) { blockDamage += 15/0.6; }
        else if (block == 73) { blockDamage += 15/0.6; }
        else if (block == 129) { blockDamage += 15/0.6; }
        else { blockDamage += 1 };
    } else if (inventory[selectedSlot] == Diamond_Axe) {
        if (block == 17) { blockDamage += 3/0.4 }
        else if (block == 5) { blockDamage += 3/0.4 }
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Diamond_Shovel) {
        if (block == 2) { blockDamage += 0.9/0.15 }
        else if (block == 3) { blockDamage += 0.75/0.1 } 
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Golden_Pickaxe) {
        if (block == 1)  { blockDamage += 7.5/0.4; }
        else if (block == 4) { blockDamage += 10/0.25}
        else if (block == 16) { blockDamage += 15/0.4; } 
        else if (block == 15) { blockDamage += 15/1.25; }
        else if (block == 14) { blockDamage += 15/1.25; }
        else if (block == 21) { blockDamage += 15/1.25; }
        else if (block == 56) { blockDamage += 15/1.25; }
        else if (block == 73) { blockDamage += 15/1.25; }
        else if (block == 129) { blockDamage += 15/1.25; }
        else { blockDamage += 1 };
    } else if (inventory[selectedSlot] == Golden_Axe) {
        if (block == 17) { blockDamage += 3/0.25 }
        else if (block == 5) { blockDamage += 3/0.25 }
        else { blockDamage += 1 }
    } else if (inventory[selectedSlot] == Golden_Shovel) {
        if (block == 2) { blockDamage += 0.9/0.1 }
        else if (block == 3) { blockDamage += 0.75/0.1 } 
        else { blockDamage += 1 }
    }
    
    
    
    {
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