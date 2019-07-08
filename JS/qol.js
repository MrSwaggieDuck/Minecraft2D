function toBlock(id) {
    for(k = 0; k < resources.length; k++) {
        if (id == resources[k].id) {
            return resources[k];
        }
    }
}

function PlaceInventory(block) {
    if(block == undefined) { return }

    searching = true
    found = false

    for(j = 0; j < inventory.length; j++) {
        if (inventory[j] == block) { searching = false; found = true; }
    }

    if (searching == true) {
        for(t = 0; t < inventory.length; t++) {
            if (inventory[t] == null) {
                inventory[t] = block;
                t = inventory.length;
                found = true;
            }
        }
    } 
    if (found != true) {
        block.amount = 0;
    }
    
}

loaded[6] = true;