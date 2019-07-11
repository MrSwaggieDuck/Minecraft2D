var currentChest = null;
var chests = [];
var chestHidden = true;

if (localStorage.getItem('chests') != null) {
    chests = JSON.parse(localStorage.getItem('chests'));
}

function oChest(posx, posy) {
    this.pos = {
        x: posx,
        y: posy,
    }
    this.content = [];
    for(i = 0; i < 27; i++) {
        this.content[i] = null;
    }
}

function drawChest() {
    if (chestHidden) {
        document.getElementById('chest').hidden = true;
        return;
    } else {
        document.getElementById('chest').hidden = false;
    }

    for (i = 0; i < currentChest.content.length; i++) {
        if (currentChest.content[i] != null && currentChest.content[i].amount <= 0) {
            currentChest.content[i] = null;
        }
        if (currentChest.content[i] != null) {
            document.getElementById('chest'+i).style.backgroundImage = 'url('+ currentChest.content[i].block.img+')';
            document.getElementById('chest'+i).innerHTML = '<p class="blockCount">'+currentChest.content[i].amount+'</p>';
        } else {
            document.getElementById('chest'+i).style.backgroundImage = 'none';
            document.getElementById('chest'+i).innerHTML = '';
        }
    }
}

function openChest(posx, posy) {  
    for (i = 0; i < chests.length; i++) {
        console.log(chests[i].pos.x+':'+chests[i].pos.y);
        console.log(posx+':'+posy);
        if (chests[i].pos.x == posx && chests[i].pos.y == posy) {
            currentChest = chests[i];
        }
    }
}

function setChestSlot(slot) {
    if (currentChest.content[slot] == null && inventory[selectedSlot] == null) {
        return;
    } else if (currentChest.content[slot] == null && inventory[selectedSlot] != null) {
        currentChest.content[slot] = new Stack(inventory[selectedSlot].block);
        currentChest.content[slot].amount += 1;
        inventory[selectedSlot].amount -= 1;
    } else if (currentChest.content[slot] != null && inventory[selectedSlot] == null) {
        PlaceInventory(currentChest.content[slot].block, currentChest.content[slot].amount);
        currentChest.content[slot] = null;
    } else if (currentChest.content[slot] != null && inventory[selectedSlot] != null) {
        if (currentChest.content[slot].block.id == inventory[selectedSlot].block.id) {
            currentChest.content[slot].amount += 1;
            inventory[selectedSlot].amount -= 1;
        } else {
            itemC = currentChest.content[slot];
            itemI = inventory[selectedSlot];
            currentChest.content[slot] = itemI;
            inventory[selectedSlot] = itemC;
        }
    }
}

function removeChest(x, y) {
    for (i = 0; i < chests.length; i++) {
        if (chests[i].pos.x == x && chests[i].pos.y == y) {
            chests.splice(i, 1);
        }
    }
}