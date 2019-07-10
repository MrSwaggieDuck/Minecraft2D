var craftingTable = [null,null,null,null,null,null,null,null,null];
var tableHidden = true;
var tableCraftableBlock = null;

function drawCraftingTable() {
    if (tableHidden) { 
        document.getElementById('craftingTable').hidden = true;
        return;
    }
    if (!tableHidden) {
        document.getElementById('craftingTable').hidden = false;
    }

    for(i = 0; i < resources.length; i++) {
        correct = 0;
        if (resources[i].recipe.table != null) {
            for(j = 0; j < craftingTable.length; j++) {
                if (craftingTable[j] == null && resources[i].recipe.table[j] == 0) {
                    correct += 1;
                } else if (craftingTable[j] == null && resources[i].recipe.table[j] != 0) {
                    correct = 0;
                } else if (craftingTable[j].block.id == resources[i].recipe.table[j]) {
                    correct += 1;
                } else {
                    correct = 0;
                }
            }
            if (correct == 9) {
                document.getElementById('crafting-result-table').style.backgroundImage = 'url('+resources[i].img+')';
                tableCraftableBlock = resources[i];
                i = resources.length + 1;
            } else {
                tableCraftableBlock = null;
                document.getElementById('crafting-result-table').style.backgroundImage = 'none';
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

    for(i = 0; i < craftingTable.length; i++) {
        if (craftingTable[i] == null || craftingTable[i].amount <= 0) {
            craftingTable[i] = null;
        }
        if(craftingTable[i] != null) {
            document.getElementById('tablecraft'+i).style.backgroundImage = 'url('+craftingTable[i].block.img+')';
            document.getElementById('tablecraft'+i).innerHTML = '<p class="blockCount">'+craftingTable[i].amount+'</p>';
        } else {
            document.getElementById('tablecraft'+i).style.backgroundImage = 'none';
            document.getElementById('tablecraft'+i).innerHTML = '';
        }
    }
}