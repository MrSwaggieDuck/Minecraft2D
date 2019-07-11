var fps, fpsInterval, then, now, elapsed, frames;

function StartGame(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    frames = 0;
    Animate();
}

function Animate() {

    requestAnimationFrame(Animate);

    now = Date.now();
    elapsed = now - then;

    if(elapsed > fpsInterval && gamemapReady) {
        then = now - (elapsed % fpsInterval);
        frames += 1; 

        requestAnimationFrame(drawGame);
        requestAnimationFrame(drawCraftingTable);
        requestAnimationFrame(drawInventory);
        requestAnimationFrame(Mining);
        requestAnimationFrame(drawFurnace);
        requestAnimationFrame(drawChest);
        
        if (frames > 100) {
            localStorage.setItem('gamemap', JSON.stringify(gamemap));
            localStorage.setItem('collisionmap', JSON.stringify(collisionmap));
            playerdate = {
                x: player.pos.x,
                y: player.pos.y,
            }
            localStorage.setItem('player', JSON.stringify(playerdate));
            localStorage.setItem('inventory', JSON.stringify(inventory));
            localStorage.setItem('furnaces', JSON.stringify(furnaces));
            localStorage.setItem('chests', JSON.stringify(chests));
            frames = 0;
        }
        
    }

}

StartGame(60)