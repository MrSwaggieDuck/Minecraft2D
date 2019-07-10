function toBlock(id) {
    for(k = 0; k < resources.length; k++) {
        if (id == resources[k].id) {
            return resources[k];
        }
    }
}



loaded[6] = true;