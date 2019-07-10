var invHidden = true;
var invCrafting = [null,null,null,null];
var invCraftableBlock = null;
var correct;

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 69) {
        if (!tableHidden) {
            tableHidden = true;
            invHidden = true;
            for(i = 0; i < craftingTable.length; i++) {
                if (craftingTable[i] != null) {
                    PlaceInventory(craftingTable[i].block, craftingTable[i].amount);
                }
            }
            craftingTable = [null,null,null,null,null,null,null,null,null];
            return;
        }
        if (!furnaceHidden) {
            furnaceHidden = true;
            invHidden = true;
            currentFurnace = null;
            return;
        }

        switch(invHidden) {
            case true:
                document.getElementById('inventory').hidden = false;
                document.getElementById('inv-crafting').hidden = false;
                invHidden = false; 
                break;
            case false: 
                document.getElementById('inventory').hidden = true; 
                document.getElementById('inv-crafting').hidden = true;
                invHidden = true;
                for(i = 0; i < invCrafting.length; i++) {
                    if (invCrafting[i] != null) {
                        PlaceInventory(invCrafting[i].block, invCrafting[i].amount);
                    }
                }
                invCrafting = [null,null,null,null]; 
                break;
        }
    }
})

window.addEventListener('keydown', function(e) {
    if(e.keyCode >= 49 && e.keyCode <= 57) {
        selectedSlot = e.keyCode - 49;
    } else if(e.keyCode == 48) {
        selectedSlot = null;
    } else if(e.keyCode == 67 && (!tableHidden || !invHidden)) {
        if (!tableHidden) {craft('table')} 
        else if (!invHidden) {craft('inv')}
    }
})


var inventory = [];
for(i = 0; i < 36; i++) {
    inventory[i] = null;
}

var selectedSlot = 0;

function drawInventory() {
    switch(invHidden) {
        case false:
            document.getElementById('inventory').hidden = false; 
            break;
        case true: 
            document.getElementById('inventory').hidden = true; 
    }

    for(i = 0; i < resources.length; i++) {
        correct = 0;
        if (resources[i].recipe.inv != null) {
            for(j = 0; j < invCrafting.length; j++) {
                if (invCrafting[j] == null && resources[i].recipe.inv[j] == 0) {
                    correct += 1;
                } else if (invCrafting[j] == null && resources[i].recipe.inv[j] != null) {
                    correct = 0;
                } else if (invCrafting[j].block.id == resources[i].recipe.inv[j]) {
                    correct += 1;
                } else {
                    correct = 0;
                }
            }
            if (correct == 4) {
                document.getElementById('crafting-result').style.backgroundImage = 'url('+resources[i].img+')';
                invCraftableBlock = resources[i];
                i = resources.length + 1;
            } else {
                invCraftableBlock = null;
                document.getElementById('crafting-result').style.backgroundImage = 'none';
            }
        }
    }

    for(i = 0; i < 36; i++) {
        document.getElementById('inv'+i).classList.remove('selected');
    }
    if (selectedSlot != null) {
        document.getElementById('inv'+selectedSlot).classList.add('selected');
    }

    for(i = 0; i < inventory.length; i++) {
        if (inventory[i] != null) {
            if(inventory[i].amount <= 0) {
                inventory[i] = null;
            }
        }
    }

    for(i = 0; i < inventory.length; i++) {
        if(inventory[i] != null) {
            document.getElementById('inv'+i).style.backgroundImage = 'url('+inventory[i].block.img+')';
            document.getElementById('inv'+i).innerHTML =  '<p class="blockCount">'+inventory[i].amount+'</p>';        
        } else if (inventory[i] == null) {
            document.getElementById('inv'+i).style.backgroundImage = 'none';
            document.getElementById('inv'+i).innerHTML =  '';  
        }
    }

    for(i = 0; i < invCrafting.length; i++) {
        if (invCrafting[i] == null || invCrafting[i].amount <= 0) {
            invCrafting[i] = null;
        }
        if(invCrafting[i] != null) {
            document.getElementById('invcraft'+i).style.backgroundImage = 'url('+invCrafting[i].block.img+')';
            document.getElementById('invcraft'+i).innerHTML =  '<p class="blockCount">'+invCrafting[i].amount+'</p>'; 
        } else {
            document.getElementById('invcraft'+i).style.backgroundImage = 'none';
            document.getElementById('invcraft'+i).innerHTML = '';
        }
    }
}

function setCraftingSlot(slot, type) {
    if (type == 'inv') {
        if (invCrafting[slot] == null && inventory[selectedSlot] == null) {
            return;
        } else if (invCrafting[slot] != null && inventory[selectedSlot] == null) {
            PlaceInventory(invCrafting[slot].block, invCrafting[slot].amount);
            invCrafting[slot] = null;
        } else if (invCrafting[slot] == null && inventory[selectedSlot] != null) {
            invCrafting[slot] = new Stack(inventory[selectedSlot].block);
            invCrafting[slot].amount += 1;
            inventory[selectedSlot].amount -= 1;
        } else if (invCrafting[slot] != null && inventory[selectedSlot] != null) {
            if (invCrafting[slot].block == inventory[selectedSlot].block) {
                invCrafting[slot].amount += 1;
                inventory[selectedSlot].amount -= 1;
            } else {
                PlaceInventory(invCrafting[slot].block, invCrafting[slot].amount);
                invCrafting[slot] = new Stack(inventory[selectedSlot].block);
                invCrafting[slot].amount += 1;
                inventory[selectedSlot].amount -= 1;
            }
        }
    } else if (type == 'table') {
        if (craftingTable[slot] == null && inventory[selectedSlot] == null) {
            return;
        } else if (craftingTable[slot] != null && inventory[selectedSlot] == null) {
            PlaceInventory(craftingTable[slot].block, craftingTable[slot].amount);
            craftingTable[slot] = null;
        } else if (craftingTable[slot] == null && inventory[selectedSlot] != null) {
            craftingTable[slot] = new Stack(inventory[selectedSlot].block);
            craftingTable[slot].amount += 1;
            inventory[selectedSlot].amount -= 1;
        } else if (craftingTable[slot] != null && inventory[selectedSlot] != null) {
            if (craftingTable[slot].block == inventory[selectedSlot].block) {
                craftingTable[slot].amount += 1;
                inventory[selectedSlot].amount -= 1;
            } else {
                PlaceInventory(craftingTable[slot].block, craftingTable[slot].amount);
                craftingTable[slot] = new Stack(inventory[selectedSlot].block);
                craftingTable[slot].amount += 1;
                inventory[selectedSlot].amount -= 1;
            }
        }
    }
    

    

   
}

function selectSlot(slot) {
    if (!keys[16]) {
        selectedSlot = slot;
    } else {
        itemSelectedSlot = inventory[selectedSlot];
        itemSlot = inventory[slot];

        inventory[slot] = itemSelectedSlot;
        inventory[selectedSlot] = itemSlot;
    }
    
}

function craft(type) {
    if(invCraftableBlock == null && tableCraftableBlock == null) { return }

    if (type == 'inv') {
        PlaceInventory(invCraftableBlock, invCraftableBlock.recipe.inv[4]);
        for (i = 0; i < invCrafting.length; i++) {
            if (invCrafting[i] != null) {
                invCrafting[i].amount -= 1;
            }
        } 
    } else if (type == 'table') {
        PlaceInventory(tableCraftableBlock, tableCraftableBlock.recipe.table[9]);
        for (i = 0; i < craftingTable.length; i++) {
            if (craftingTable[i] != null) {
                craftingTable[i].amount -= 1;
            }
        } 
    }
    
}

loaded[5] = true;

