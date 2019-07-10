var furnaceHidden = true;
var currentFurnace = null;
var furnaces = [];

function drawFurnace() {
    document.getElementById('furnace').hidden = furnaceHidden;
    if (currentFurnace != null) {
        if (currentFurnace.item != null) {
            document.getElementById('furnace-item').style.backgroundImage = 'url('+currentFurnace.item.block.img+')';
        } else {
            document.getElementById('furnace-item').style.backgroundImage = 'none';
        }
        if (currentFurnace.fuel != null) {
            document.getElementById('furnace-fuel').style.backgroundImage = 'url('+currentFurnace.fuel.block.img+')';
        } else {
            document.getElementById('furnace-fuel').style.backgroundImage = 'none';
        }
        if (currentFurnace.result != null) {
            document.getElementById('furnace-result').style.backgroundImage = 'url('+currentFurnace.result.block.img+')';
        } else {
            document.getElementById('furnace-result').style.backgroundImage = 'none';
        }
    } 

    for (j = 0; j < furnaces.length; j++) {
        furnaces[j].tick();
    }

    if (!furnaceHidden) {
        if (currentFurnace.fuel != null) {
            document.getElementById('furnace-fuel').innerHTML = '<div class="blockCount">'+currentFurnace.fuel.amount+'</div>';
        } else {
            document.getElementById('furnace-fuel').innerHTML = '';
        }
        if (currentFurnace.item != null) {
            document.getElementById('furnace-item').innerHTML = '<div class="blockCount">'+currentFurnace.item.amount+'</div>';
        } else {
            document.getElementById('furnace-item').innerHTML = '';
        }
        if (currentFurnace.result != null) {
            document.getElementById('furnace-result').innerHTML = '<div class="blockCount">'+currentFurnace.result.amount+'</div>';
        } else {
            document.getElementById('furnace-result').innerHTML = '';
        }

        document.getElementById('current-furnace-progress').style.height = currentFurnace.progress/600*100 +'%';
        document.getElementById('current-furnace-progress').style.top =  100 - currentFurnace.progress/600*100 +'%';
        
    }
    
}

function oFurnace(posx, posy) {
    this.pos = {
        x: posx,
        y: posy, 
    }
    this.fuel;
    this.hp;
    this.item;
    this.result;
    this.progress = 0;

    this.collectResult = function() {
        PlaceInventory(this.result.block, this.result.amount);
        this.result = null;
    }
    this.tick = function() {
        if (this.fuel == null || this.item == null) { this.progress = 0; return };
        if ((this.fuel.block == Coal || Math.floor(this.fuel.block.id) == 17) && this.item.block.meltable[0] == true) {
            this.progress += 1;
            this.fuel.hp -= 1;
        } else {
            this.progress = 0;
        }
        if (this.progress > 600) {
            if (this.result == null) {
                this.result = new Stack(toBlock(this.item.block.meltable[1]));
            }
            this.result.amount += 1;
            this.item.amount -= 1;
            this.progress = 0;
        }
        if (this.fuel.hp <= 0) {
            this.fuel.amount -= 1;
            if (currentFurnace.fuel.block == Coal) { this.fuel.hp = 8*600 }
            else if (Math.floor(currentFurnace.fuel.block.id) == 17) { this.fuel.hp = 1.5*600 }
        }
        
    }
}

function setFurnaceSlot(num) {
    if (num == 0) {
        if (inventory[selectedSlot] == null) {
            if (currentFurnace.item != null) {
                PlaceInventory(currentFurnace.item.block, currentFurnace.item.amount);
            }
            currentFurnace.item = null;
        } else {
            if (currentFurnace.item != null) {
                itemI = inventory[selectedSlot];
                itemF = currentFurnace.item;
                currentFurnace.item = itemI;
                inventory[selectedSlot] = itemF;
            } else {
                itemI = inventory[selectedSlot];
                itemF = currentFurnace.item;
                currentFurnace.item = itemI;
                inventory[selectedSlot] = itemF;
            }
        }
        
    } else if (num == 1) {
        if (inventory[selectedSlot] == null) {
            if (currentFurnace.fuel != null) {
                if (currentFurnace.progress > 0) {
                    currentFurnace.fuel.amount -= 1;
                }
                PlaceInventory(currentFurnace.fuel.block, currentFurnace.fuel.amount);
            }
            currentFurnace.fuel = null;
        } else {
            if (currentFurnace.fuel != null) {
                PlaceInventory(currentFurnace.fuel.block, currentFurnace.fuel.amount);
            }
            currentFurnace.fuel = inventory[selectedSlot];
            inventory[selectedSlot] = null;
            if (currentFurnace.fuel.block == Coal) { currentFurnace.hp = 8*600 }
            else if (Math.floor(currentFurnace.fuel.block.id) == 17) { currentFurnace.hp = 1.5*600 }
        }
    }
}

function openFurnace(x, y) {
    for (i = 0; i < furnaces.length; i++) {
        if (furnaces[i].pos.x == x && furnaces[i].pos.y == y) {
            currentFurnace = furnaces[i];
            i = furnaces.length + 1;
        }
    }
}

function getFurnaceResult() {
    if (currentFurnace.result == null) {
        return;
    }
    currentFurnace.collectResult();
}