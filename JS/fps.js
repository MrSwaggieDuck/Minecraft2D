var fps, fpsInterval, then, now, elapsed;


function StartGame(fps) {
    fpsInterval = 1000/fps;
    then = Date.now();
    Animate();
}

function Animate() {

    requestAnimationFrame(Animate);

    now = Date.now();
    elapsed = now - then;

    if(elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        requestAnimationFrame(drawGame);
        requestAnimationFrame(drawCraftingTable);
        requestAnimationFrame(drawInventory);
        requestAnimationFrame(Mining);
        requestAnimationFrame(drawFurnace);
    }

}

StartGame(60)