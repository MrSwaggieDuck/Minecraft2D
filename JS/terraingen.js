var gamemapReady = false;
var heights = [];
var biomes = [];
var collisionmap = [];
var gamemap = [];

function GenerateTerrain(w, h) {
    var terrain = [];

    for (i = 0; i < h; i++) {
        terrain[i] = [];
        collisionmap[i] = [];
        for(j = 0; j < w; j++) {
            terrain[i][j] = 0;
            collisionmap[i][j] = 0;
        }
    }

    var height = Math.floor(h*0.6);
    var biome = 'forest';
    var lastBiome = 0;
    

    for (x = 0; x < w; x++) {
        if(Math.random() < 0.2 && height < Math.floor(h*0.6)+4) {
            height += 1;
        }
        if(Math.random() > 0.8 && height > Math.floor(h*0.6)-4) {
            height -= 1;
        }
        
        if ((Math.random() < 1/(lastBiome) && lastBiome > 64) || lastBiome > 128) {
            if (biome == 'forest') {
                if (Math.random() < 0.5){ biome = 'snow' } else { biome = 'desert' }
            } else if (biome == 'snow') {
                if (Math.random() < 0.5){ biome = 'forest'} else { biome = 'desert'}
            } else if (biome == 'desert') {
                if (Math.random() < 0.5){biome = 'forest'} else { biome = 'snow'}
            }
            lastBiome = 0;
        }

        lastBiome += 1;
        console.log(biome);

        var airlayer = {start: 0, end: h-height};
        var grasslayer = {start: airlayer.end+1, end: airlayer.end+1};
        var dirtlayer = {start: grasslayer.end+1, end: grasslayer.end+6};
        var stonedirtlayer = {start: dirtlayer.end+1, end: dirtlayer.end+6};
        var stonelayer1 = {start: stonedirtlayer.end+1, end: stonedirtlayer.end+Math.floor(h/5)};
        var stonelayer2 = {start: stonelayer1.end+1, end: stonelayer1.end+Math.floor(h/5)};
        var stonelayer3 = {start: stonelayer2.end+1, end: h-1};

        heights[x] = height;
        biomes[x] = biome;
        if (biome == 'forest') {
            for (y = 0; y < h; y++) {
                if (y >= airlayer.start && y <= airlayer.end) {
                    terrain[y][x] = 0;
                    collisionmap[y][x] = 0;
                } else if (y >= grasslayer.start && y <= grasslayer.end) {
                    terrain[y][x] = 2;
                    collisionmap[y][x] = 1;
                } else if (y >= dirtlayer.start && y <= dirtlayer.end) {
                    terrain[y][x] = 3;
                    collisionmap[y][x] = 1;
                } else if (y >= stonedirtlayer.start && y <= stonedirtlayer.end) {
                    chance = Math.random();
                    if(chance < 1/3) { terrain[y][x] = 3 } 
                    else if (chance < 2/3) { terrain[y][x] = 13 }
                    else { terrain[y][x] = 1};
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer1.start && y <= stonelayer1.end) {
                    chance = Math.random();
                    if (chance < 0.1) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.15) {
                        terrain[y][x] = 15;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer2.start && y <= stonelayer2.end) {
                    chance = Math.random();
                    if (chance < 0.015) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.03) {
                        terrain[y][x] = 15;
                    } else if (chance < 0.0325) {
                        terrain[y][x] = 14;
                    } else if (chance < 0.0425) {
                        terrain[y][x] = 73;
                    } else if (chance < 0.0475) {
                        terrain[y][x] = 21;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer3.start && y <= stonelayer3.end) {
                    chance = Math.random();
                    if (chance < 0.005) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.015) {
                        terrain[y][x] = 15;
                    } else if (chance < 0.025) {
                        terrain[y][x] = 14;
                    } else if (chance < 0.03) {
                        terrain[y][x] = 73
                    } else if (chance < 0.04) {
                        terrain[y][x] = 21;
                    } else if (chance < 0.0425) {
                        terrain[y][x] = 56;
                    } else if (chance < 0.0435) {
                        terrain[y][x] = 129;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                }
            } 
        } else if (biome == 'snow') {
            for (y = 0; y < h; y++) {
                if (y >= airlayer.start && y <= airlayer.end) {
                    terrain[y][x] = 0;
                    collisionmap[y][x] = 0;
                } else if (y >= grasslayer.start && y <= grasslayer.end) {
                    terrain[y][x] = 2;
                    collisionmap[y][x] = 1;
                } else if (y >= dirtlayer.start && y <= dirtlayer.end) {
                    terrain[y][x] = 3;
                    collisionmap[y][x] = 1;
                } else if (y >= stonedirtlayer.start && y <= stonedirtlayer.end) {
                    chance = Math.random();
                    if(chance < 1/3) { terrain[y][x] = 3 } 
                    else if (chance < 2/3) { terrain[y][x] = 13 }
                    else { terrain[y][x] = 1};
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer1.start && y <= stonelayer1.end) {
                    chance = Math.random();
                    if (chance < 0.1) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.15) {
                        terrain[y][x] = 15;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer2.start && y <= stonelayer2.end) {
                    chance = Math.random();
                    if (chance < 0.015) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.03) {
                        terrain[y][x] = 15;
                    } else if (chance < 0.0325) {
                        terrain[y][x] = 14;
                    } else if (chance < 0.0425) {
                        terrain[y][x] = 73;
                    } else if (chance < 0.0475) {
                        terrain[y][x] = 21;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer3.start && y <= stonelayer3.end) {
                    chance = Math.random();
                    if (chance < 0.005) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.015) {
                        terrain[y][x] = 15;
                    } else if (chance < 0.025) {
                        terrain[y][x] = 14;
                    } else if (chance < 0.03) {
                        terrain[y][x] = 73
                    } else if (chance < 0.04) {
                        terrain[y][x] = 21;
                    } else if (chance < 0.0425) {
                        terrain[y][x] = 56;
                    } else if (chance < 0.0435) {
                        terrain[y][x] = 129;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                }
            }
        } else if (biome == 'desert') {
            for (y = 0; y < h; y++) {
                if (y >= airlayer.start && y <= airlayer.end) {
                    terrain[y][x] = 0;
                    collisionmap[y][x] = 0;
                } else if (y >= grasslayer.start && y <= grasslayer.end) {
                    terrain[y][x] = 12;
                    collisionmap[y][x] = 1;
                } else if (y >= dirtlayer.start && y <= dirtlayer.end) {
                    if (Math.random() < 0.5) {
                        terrain[y][x] = 12;
                    } else {
                        terrain[y][x] = 24;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonedirtlayer.start && y <= stonedirtlayer.end) {
                    chance = Math.random();
                    if(chance < 1/3) { terrain[y][x] = 24 } 
                    else if (chance < 2/3) { terrain[y][x] = 13 }
                    else { terrain[y][x] = 1};
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer1.start && y <= stonelayer1.end) {
                    chance = Math.random();
                    if (chance < 0.1) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.15) {
                        terrain[y][x] = 15;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer2.start && y <= stonelayer2.end) {
                    chance = Math.random();
                    if (chance < 0.015) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.03) {
                        terrain[y][x] = 15;
                    } else if (chance < 0.0325) {
                        terrain[y][x] = 14;
                    } else if (chance < 0.0425) {
                        terrain[y][x] = 73;
                    } else if (chance < 0.0475) {
                        terrain[y][x] = 21;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                } else if (y >= stonelayer3.start && y <= stonelayer3.end) {
                    chance = Math.random();
                    if (chance < 0.005) {
                        terrain[y][x] = 16;
                    } else if (chance < 0.015) {
                        terrain[y][x] = 15;
                    } else if (chance < 0.025) {
                        terrain[y][x] = 14;
                    } else if (chance < 0.03) {
                        terrain[y][x] = 73
                    } else if (chance < 0.04) {
                        terrain[y][x] = 21;
                    } else if (chance < 0.0425) {
                        terrain[y][x] = 56;
                    } else if (chance < 0.0435) {
                        terrain[y][x] = 129;
                    } else {
                        terrain[y][x] = 1;
                    }
                    collisionmap[y][x] = 1;
                }
            }
        }
}
    
    //TREES
    lastTree = 0;
    for (x = 0; x < heights.length; x++) {
        chance = Math.random();

        if (chance < (lastTree-4)*0.1) {
            if (biomes[x] == 'forest') {
                terrain[h-heights[x]][x] = 17;
                terrain[h-heights[x]-1][x] = 17;
                terrain[h-heights[x]-2][x] = 17;
            
                terrain[h-heights[x]-4][x] = 18;
                terrain[h-heights[x]-3][x] = 18;
                terrain[h-heights[x]-3][x-1] = 18;
                terrain[h-heights[x]-2][x-1] = 18;
                terrain[h-heights[x]-2][x-2] = 18;
                terrain[h-heights[x]-3][x+1] = 18;
                terrain[h-heights[x]-2][x+1] = 18;
                terrain[h-heights[x]-2][x+2] = 18;
            } else if (biomes[x] == 'snow'){
                terrain[h-heights[x]][x] = 17.1;
                terrain[h-heights[x]-1][x] = 17.1;
                terrain[h-heights[x]-2][x] = 17.1;
            
                terrain[h-heights[x]-4][x] = 18.1;
                terrain[h-heights[x]-3][x] = 18.1;
                terrain[h-heights[x]-3][x-1] = 18.1;
                terrain[h-heights[x]-2][x-1] = 18.1;
                terrain[h-heights[x]-2][x-2] = 18.1;
                terrain[h-heights[x]-3][x+1] = 18.1;
                terrain[h-heights[x]-2][x+1] = 18.1;
                terrain[h-heights[x]-2][x+2] = 18.1;
            }
            lastTree = 0;
        } else {
            lastTree += 1;
        }
    }
    gamemapReady = true;
    return terrain;
}

if (localStorage.getItem('gamemap') == null) {
    gamemap = GenerateTerrain(1024,128);
} else {
    gamemap = JSON.parse(localStorage.getItem('gamemap'));
    collisionmap = JSON.parse(localStorage.getItem('collisionmap'));
}

gamemapReady = true;

