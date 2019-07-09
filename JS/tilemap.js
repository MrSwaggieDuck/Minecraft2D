var ctx = document.getElementById('game').getContext('2d');
var canvas = document.getElementById('game');
ctx.imageSmoothingEnabled = false;
var i = 0;
var keys = {
    37: false,
    38: false,
    39: false,
    40: false,
    65: false,
    87: false,
    68: false,
    83: false,
    16: false,
}

window.addEventListener('keydown', function(e) {
    if (e.keyCode>=37 && e.keyCode<=40 || e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 16) {
        keys[e.keyCode] = true;
    }
})

window.addEventListener('keyup', function(e) {
    if (e.keyCode>=37 && e.keyCode<=40 || e.keyCode == 65 || e.keyCode == 87 || e.keyCode == 68 || e.keyCode == 83 || e.keyCode == 16) {
        keys[e.keyCode] = false;
    }
})

var tiles = {
    stone: new Image(),
    grass: new Image(),
    dirt:  new Image(),
    oak_wood: new Image(),
    oak_planks: new Image(),
    bedrock: new Image(),
    cobblestone: new Image(),
    oak_leaves: new Image(),
    coal_ore: new Image(),
    iron_ore: new Image(),
    redstone_ore: new Image(),
    diamond_ore: new Image(),
    emerald_ore: new Image(),
    lapis_ore: new Image(),
    gold_ore: new Image(),
    crafting_table: new Image(),
    furnace: new Image(),
    coal_block: new Image(),
    iron_block: new Image(),
    gold_block: new Image(),
    lapis_block: new Image(),
    redstone_block: new Image(),
    diamond_block: new Image(),
    emerald_block: new Image(),
    gravel: new Image(),
}
tiles.stone.src = 'Images/Tiles/Stone.png';
tiles.grass.src = 'Images/Tiles/Grass.png';
tiles.dirt.src = 'Images/Tiles/Dirt.png';
tiles.oak_wood.src = 'Images/Tiles/Oak_Wood.png';
tiles.oak_planks.src = 'Images/Tiles/Oak_Planks.png';
tiles.bedrock.src = 'Images/Tiles/Bedrock.png';
tiles.cobblestone.src = 'Images/Tiles/Cobblestone.png';
tiles.oak_leaves.src = 'Images/Tiles/Oak_Leaves.png';
tiles.coal_ore.src = 'Images/Tiles/Coal_Ore.png';
tiles.iron_ore.src = 'Images/Tiles/Iron_Ore.png';
tiles.redstone_ore.src = 'Images/Tiles/Redstone_Ore.png';
tiles.diamond_ore.src = 'Images/Tiles/Diamond_Ore.png';
tiles.emerald_ore.src = 'Images/Tiles/Emerald_Ore.png';
tiles.lapis_ore.src = 'Images/Tiles/Lapis_Ore.png';
tiles.gold_ore.src = 'Images/Tiles/Gold_Ore.png';
tiles.crafting_table.src = 'Images/Tiles/Crafting_Table.png';
tiles.furnace.src = 'Images/Tiles/Furnace.png';
tiles.coal_block.src = 'Images/Tiles/Coal_Block.png';
tiles.iron_block.src = 'Images/Tiles/Iron_Block.png';
tiles.gold_block.src = 'Images/Tiles/Gold_Block.png';
tiles.lapis_block.src = 'Images/Tiles/Lapis_Block.png';
tiles.redstone_block.src = 'Images/Tiles/Redstone_Block.png';
tiles.diamond_block.src = 'Images/Tiles/Diamond_Block.png';
tiles.emerald_block.src = 'Images/Tiles/Emerald_Block.png';
tiles.gravel.src = 'Images/Tiles/Gravel.png';

var tileW = 800/16, tileH = 800/16, mapW = gamemap[0].length, mapH = gamemap.length;

var gravity = 1;
var viewport = {
    screen:     {w: canvas.clientWidth, h: canvas.clientHeight},
    startTile:  {x: 0, y: 0},
    endTile:    {x: 0, y: 0},
    offset:     {x: 0, y: 0},
    update:     function(px, py) {
        this.offset.x = Math.floor((this.screen.w / 2) - px);
        this.offset.y = Math.floor((this.screen.h / 2) - py);

        var tile = {x: Math.floor(px/tileW), y: Math.floor(py/tileH)};

        this.startTile.x = tile.x - 1 - Math.ceil((this.screen.w / 2) / tileW);
        this.startTile.y = tile.y - 1 - Math.ceil((this.screen.h / 2) / tileH);

        this.endTile.x = tile.x + 1 + Math.ceil((this.screen.w / 2) / tileW);
        this.endTile.y = tile.y + 1 + Math.ceil((this.screen.h / 2) / tileH)

        if (this.startTile.x < 0) { this.startTile.x = 0 }
        if (this.startTile.y < 0) { this.startTile.y = 0 }

        if (this.endTile.x >= mapW) { this.endTile.x = mapW - 1 }
        if (this.endTile.y >= mapH) { this.endTile.y = mapH - 1 }
    }
}



function drawGame() {
    if(gamemapReady == false) { return};
    if(loaded[3] == false) { return};

    player.move();
    viewport.update(player.pos.x + (player.size.w/2), player.pos.y + (player.size.h/2));
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, mapW*tileW, mapH*tileH);

    for(x = viewport.startTile.x; x <= viewport.endTile.x; x++) {
        for(y = viewport.startTile.y; y <= viewport.endTile.y; y++) {
            if (gamemap[y][x] != 0) {
                switch(gamemap[y][x]) {
                    case 1: image = tiles.stone; break;
                    case 2: image = tiles.grass; break;
                    case 3: image = tiles.dirt; break;
                    case 4: image = tiles.cobblestone; break;
                    case 5: image = tiles.oak_planks; break;
                    case 7: image = tiles.bedrock; break;
                    case 13: image = tiles.gravel; break;
                    case 14: image = tiles.gold_ore; break;
                    case 15: image = tiles.iron_ore; break;
                    case 16: image = tiles.coal_ore; break;
                    case 17: image = tiles.oak_wood; break;
                    case 18: image = tiles.oak_leaves; break;
                    case 21: image = tiles.lapis_ore; break;
                    case 22: image = tiles.lapis_block; break;
                    case 41: image = tiles.gold_block; break;
                    case 42: image = tiles.iron_block; break;
                    case 56: image = tiles.diamond_ore; break;
                    case 57: image = tiles.diamond_block; break;
                    case 58: image = tiles.crafting_table; break;
                    case 61: image = tiles.furnace; break;
                    case 73: image = tiles.redstone_ore; break;
                    case 129: image = tiles.emerald_ore; break;
                    case 133: image = tiles.emerald_block; break;
                    case 152: image = tiles.redstone_block; break;
                    case 173: image = tiles.coal_block; break;
                }
                ctx.drawImage(image, viewport.offset.x + x*tileW, viewport.offset.y + y*tileH, tileW, tileH)
            } else {
                ctx.fillStyle = '#80ebff';
                ctx.fillRect(viewport.offset.x + x*tileW, viewport.offset.y + y*tileH, tileW, tileH);
            }
        }
    }

    

    ctx.fillStyle = '#ff0000';
    player.draw();
    localStorage.setItem('gamemap', JSON.stringify(gamemap));
}

function setMap(block, x, y) {
    gamemap[y][x] = block;
}

loaded[2] = true;
