var furnaceHidden = true;
var currentFurnace = null;
var furnaces = [];

function drawFurnace() {
    document.getElementById('furnace').hidden = furnaceHidden;
    if (currentFurnace != null) {
        if (currentFurnace.item.type != null) {
            document.getElementById('furnace-item').style.backgroundImage = 'url('+currentFurnace.item.type.img+')';
        } else {
            document.getElementById('furnace-item').style.backgroundImage = 'none';
        }
        if (currentFurnace.fuel.type != null) {
            document.getElementById('furnace-fuel').style.backgroundImage = 'url('+currentFurnace.fuel.type.img+')';
        } else {
            document.getElementById('furnace-fuel').style.backgroundImage = 'none';
        }
        if (currentFurnace.result.type != null) {
            document.getElementById('furnace-result').style.backgroundImage = 'url('+currentFurnace.result.type.img+')';
        } else {
            document.getElementById('furnace-result').style.backgroundImage = 'none';
        }
    } 

    for (j = 0; j < furnaces.length; j++) {
        furnaces[j].tick();
    }

    if (!furnaceHidden) {
        if (currentFurnace.fuel.type != null) {
            document.getElementById('furnace-fuel').innerHTML = '<div class="blockCount">'+currentFurnace.fuel.amount+'</div>';
        } else {
            document.getElementById('furnace-fuel').innerHTML = '';
        }
        if (currentFurnace.item.type != null) {
            document.getElementById('furnace-item').innerHTML = '<div class="blockCount">'+currentFurnace.item.amount+'</div>';
        } else {
            document.getElementById('furnace-item').innerHTML = '';
        }
        if (currentFurnace.result.type != null) {
            document.getElementById('furnace-result').innerHTML = '<div class="blockCount">'+currentFurnace.result.amount+'</div>';
        } else {
            document.getElementById('furnace-result').innerHTML = '';
        }

        document.getElementById('current-furnace-progress').style.height = currentFurnace.progress/600*100 +'%';
        document.getElementById('current-furnace-progress').style.top =  100 - currentFurnace.progress/600*100 +'%';
        
    }
    
}

function Furnace(posx, posy) {
    this.pos = {
        x: posx,
        y: posy, 
    }
    this.fuel = {type: null, amount: 0, hp: 0};
    this.item = {type: null, amount: 0};
    this.result = {type: null, amount: 0};
    this.progress = 0;

    this.collectResult = function() {
        this.result.type.amount += this.result.amount;
        PlaceInventory(this.result.type);
        this.result.type = null;
        this.result.amount = 0;
    }
    this.tick = function() {
        if (this.fuel.type == null || this.item.type == null) { this.progress = 0; return };
        if ((this.fuel.type.id == 263 || Math.floor(this.fuel.type.id) == 17) && this.item.type.meltable[0] == true) {
            this.progress += 1;
            this.fuel.hp -= 1;
        } else {
            this.progress = 0;
        }
        if (this.progress > 600) {
            this.result.type = toBlock(this.item.type.meltable[1]);
            this.result.amount += 1;
            this.item.amount -= 1;
            this.progress = 0;
        }
        if (this.fuel.hp <= 0) {
            this.fuel.amount -= 1;
            if (currentFurnace.fuel.type == Coal) { this.fuel.hp = 8*600 }
            else if (Math.floor(currentFurnace.fuel.type.id) == 17) { this.fuel.hp = 1.5*600 }
        }
        
    }
}

function setFurnaceSlot(num) {
    if (num == 0) {
        if (inventory[selectedSlot] == null) {
            if (currentFurnace.item.type != null) {
                currentFurnace.item.type.amount += currentFurnace.item.amount;
                PlaceInventory(currentFurnace.item.type);
            }
            currentFurnace.item.type = null;
            currentFurnace.item.amount = 0;
        } else {
            if (currentFurnace.item.type != null) {
                currentFurnace.item.type.amount += currentFurnace.item.amount;
                PlaceInventory(currentFurnace.item.type);
            }
            currentFurnace.item.type = inventory[selectedSlot];
            currentFurnace.item.amount = inventory[selectedSlot].amount;
            inventory[selectedSlot].amount = 0;
        }
        
    } else if (num == 1) {
        if (inventory[selectedSlot] == null) {
            if (currentFurnace.fuel.type != null) {
                currentFurnace.fuel.type.amount += currentFurnace.fuel.amount;
                if (currentFurnace.progress > 0) {
                    currentFurnace.fuel.type.amount -= 1;
                }
                PlaceInventory(currentFurnace.fuel.type);
            }
            currentFurnace.fuel.type = null;
            currentFurnace.fuel.amount = 0;
        } else {
            if (currentFurnace.fuel.type != null) {
                currentFurnace.fuel.type.amount += currentFurnace.fuel.amount;
                PlaceInventory(currentFurnace.fuel.type);
            }
            currentFurnace.fuel.type = inventory[selectedSlot];
            currentFurnace.fuel.amount = inventory[selectedSlot].amount;
            inventory[selectedSlot].amount = 0;
            if (currentFurnace.fuel.type == Coal) { currentFurnace.fuel.hp = 8*600 }
            else if (Math.floor(currentFurnace.fuel.type.id) == 17) { currentFurnace.fuel.hp = 1.5*600 }
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
    if (currentFurnace.result.type == null) {
        return;
    }
    currentFurnace.collectResult();
}