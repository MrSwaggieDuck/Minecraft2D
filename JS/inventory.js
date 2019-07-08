var invHidden = true;
var invCrafting = [0,0,0,0];

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 69) {
        if (!tableHidden) {
            tableHidden = true;
            invHidden = true;
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
                    if (invCrafting[i] != 0) {
                        toBlock(invCrafting[i]).amount += 1;
                        PlaceInventory(toBlock(invCrafting[i]));
                        console.log(invCrafting.length);
                    }
                    
                }
                invCrafting = [0,0,0,0]; 
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

    var correct = 0;
    for(i = 0; i < resources.length; i++) {
        correct = 0;
        if (resources[i].recipe.inv != null) {
            for(j = 0; j < invCrafting.length; j++) {
                if (invCrafting[j] == resources[i].recipe.inv[j]) {
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
            document.getElementById('inv'+i).style.backgroundImage = 'url('+inventory[i].img+')';
            document.getElementById('inv'+i).innerHTML =  '<p class="blockCount">'+inventory[i].amount+'</p>';        
        } else if (inventory[i] == null) {
            document.getElementById('inv'+i).style.backgroundImage = 'none';
            document.getElementById('inv'+i).innerHTML =  '';  
        }
    }

    for(i = 0; i < invCrafting.length; i++) {
        if(invCrafting[i] != 0) {
            document.getElementById('invcraft'+i).style.backgroundImage = 'url('+toBlock(invCrafting[i]).img+')';
        } else {
            document.getElementById('invcraft'+i).style.backgroundImage = 'none';
        }
    }
}

function setCraftingSlot(slot, type) {
    if (type == 'inv') {
        if(invCrafting[slot] != 0) {
            toBlock(invCrafting[slot]).amount += 1;
            PlaceInventory(toBlock(invCrafting[slot]));
            invCrafting[slot] = 0;
        } else {
            if(selectedSlot == null || inventory[selectedSlot] == null) { 
                invCrafting[slot] = 0;
            } else {
                invCrafting[slot] = inventory[selectedSlot].id;
                inventory[selectedSlot].amount -= 1;
            }
        }
    } else if (type == 'table') {
        if(craftingTable[slot] != 0) {
            toBlock(craftingTable[slot]).amount += 1;
            PlaceInventory(toBlock(craftingTable[slot]));
            craftingTable[slot] = 0;
        } else {
            if(selectedSlot == null || inventory[selectedSlot] == null) { 
                craftingTable[slot] = 0;
            } else {
                craftingTable[slot] = inventory[selectedSlot].id;
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
        if (invCraftableBlock.amount == 0) {
            searching = true;
            j = 0;
            while(searching) {
                if(inventory[j] == null) {
                    searching = false;
                    inventory[j] = invCraftableBlock;
                } else {
                    j++;
                }
            }
        }
    
        invCraftableBlock.amount += invCraftableBlock.recipe.inv[4];
 
        invCrafting = [0,0, 0,0];

    } else if (type == 'table') {
        if (tableCraftableBlock.amount == 0) {
            PlaceInventory(tableCraftableBlock);
        }
    
        tableCraftableBlock.amount += tableCraftableBlock.recipe.table[9];
    
        craftingTable = [0,0,0, 0,0,0, 0,0,0];
    }
    
}

loaded[5] = true;

