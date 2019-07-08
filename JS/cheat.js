function GiveItems() {
    for (i = 0; i < resources.length; i++) {
        resources[i].amount += 50;
        PlaceInventory(resources[i]);
    }
}