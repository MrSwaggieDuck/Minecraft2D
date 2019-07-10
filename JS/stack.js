function Stack(block) {
    this.block = block;
    this.stacksize = block.stacksize;
    this.amount = 0;
}

function PlaceInventory(block, newamount) {
    if(block == undefined) { return }
    if(newamount == undefined) { console.log('AMOUNT UNDEFINED!')}

    searching = true
    found = false

    for(j = 0; j < inventory.length; j++) {
        if (inventory[j] != null) {
            if (inventory[j].block == block && inventory[j].stacksize > inventory[j].amount + newamount) { 
                searching = false; 
                found = true; 
                inventory[j].amount += newamount;
                console.log(1);
                return;
            } else if (inventory[j].block == block && inventory[j].stacksize > inventory[j].amount) {
                while(inventory[j].stacksize > inventory[j].amount) {
                    inventory[j].amount += 1;
                    newamount -= 1;
                    console.log(2);
                }
                PlaceInventory(block, newamount);
                return;
            }
        }
    }

    if (searching == true) {
        for(t = 0; t < inventory.length; t++) {
            if (inventory[t] == null) {
                inventory[t] = new Stack(block);
                inventory[t].amount = newamount;
                t = inventory.length;
                found = true;
            }
        }
    } 
    if (found != true) {
        return 'NO PLACE';
    }
    
}