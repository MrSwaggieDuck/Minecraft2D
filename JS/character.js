function Character(posx, posy, sizew, sizeh) {
    this.pos = {x: posx, y: posy};
    this.size = {w: sizew, h: sizeh};
    this.force = {x: 0, y: 0};
    this.speed = 5;
    this.shifting = false;

    if(this.size.w % 2 != 0) {
        this.size.w += 1;
    }
    if(this.size.h % 2 != 0) {
        this.size.h += 1;
    }

    this.move = function() {

        if(keys[16] && this.shifting == false) {
            this.pos.y += this.size.h*0.2/2;
            this.size.h *= 0.8;
            this.shifting = true;
        } else if (keys[16] == false && this.shifting == true) {
            this.pos.y -= this.size.h/0.8*0.2/2;
            this.size.h /= 0.8;
            this.shifting = false;
        }

        this.BR = {x: this.pos.x + this.size.w/2 - 1, y: this.pos.y + this.size.h/2 - 1};
        this.BL = {x: this.pos.x - this.size.w/2, y: this.pos.y + this.size.h/2 - 1};
        this.MR = {x: this.pos.x + this.size.w/2 - 1, y: this.pos.y};
        this.ML = {x: this.pos.x - this.size.w/2, y: this.pos.y};
        this.TR = {x: this.pos.x + this.size.w/2 - 1, y: this.pos.y - this.size.h/2};
        this.TL = {x: this.pos.x - this.size.w/2, y: this.pos.y - this.size.h/2};

        if (gamemap[Math.floor(this.BR.y/tileH)][Math.floor(this.BR.x/tileW)] == 65 || gamemap[Math.floor(this.BL.y/tileH)][Math.floor(this.BL.x/tileW)] == 65 || gamemap[Math.floor(this.TR.y/tileH)][Math.floor(this.TR.x/tileW)] == 65 || gamemap[Math.floor(this.TL.y/tileH)][Math.floor(this.TL.x/tileW)] == 65 || gamemap[Math.floor(this.MR.y/tileH)][Math.floor(this.MR.x/tileW)] == 65 || gamemap[Math.floor(this.ML.y/tileH)][Math.floor(this.ML.x/tileW)] == 65) {
            gravity = 0;
            onLadder = true;
        } else {
            gravity = 1;
            onLadder = false;
        }

        if(!this.colliding(this.BR.x, this.BR.y+1) && !this.colliding(this.BL.x, this.BL.y+1)){
            this.force.y = this.force.y + gravity;
        } else { this.force.y = 0};

        if(keys[38] || keys[87]) {
            if (this.colliding(this.BR.x, this.BR.y+1) || this.colliding(this.BL.x, this.BL.y+1)) {
                this.force.y = -12;
            }
        } 
        if (onLadder && (keys[38] || keys[87])) {
            this.force.y = -5;
        } else if (onLadder && (keys[83] || keys[40])) {
            this.force.y = 5;
        }

        if(keys[37] || keys[65]) {
            this.force.x = -this.speed;
        } else if (keys[39] || keys[68]) {
            this.force.x = this.speed;
        } else {
            this.force.x *= 0.85;
            if (this.force.x < 1) {
                this.force.x = 0;
            }
        }
        
        //VERTICAL
        if (this.force.y > 0) {
            if(!this.colliding(this.BR.x, this.BR.y+this.force.y) && !this.colliding(this.BL.x, this.BL.y+this.force.y)){
                this.pos.y += this.force.y;
            } else {
                while(!this.colliding(this.BR.x, this.BR.y+1) && !this.colliding(this.BL.x, this.BL.y+1)) {
                    this.pos.y += 1;
                    this.BR.y += 1;
                    this.BL.y += 1;
                }
            }
        } else if (this.force.y < 0) {
            if(!this.colliding(this.TR.x, this.TR.y+this.force.y) && !this.colliding(this.TL.x, this.TL.y+this.force.y)) {
                this.pos.y += this.force.y;
            } else {
                while(!this.colliding(this.TR.x, this.TR.y-1) && !this.colliding(this.TL.x, this.TL.y-1)) {
                    this.pos.y -= 1;
                    this.TR.y -= 1;
                    this.TL.y -=1;
                }
                this.force.y = 0;
            }
        }

        //HORIZONTAL
        if (this.force.x > 0) {
            if(!this.colliding(this.BR.x + this.force.x, this.BR.y) && !this.colliding(this.TR.x+this.force.x, this.TR.y) && !this.colliding(this.MR.x+this.force.x, this.MR.y)) {
                this.pos.x += this.force.x;
            } else if (!this.colliding(this.BR.x+1, this.BR.y) && !this.colliding(this.TR.x+1, this.TR.y) && !this.colliding(this.MR.x+1, this.MR.y)) {
                while(!this.colliding(this.BR.x+1, this.BR.y) && !this.colliding(this.TR.x+1, this.TR.y) && !this.colliding(this.MR.x+1, this.MR.y)) {
                    this.pos.x += 1;
                    this.BR.x += 1;
                    this.MR.x += 1;
                    this.TR.x += 1;
                }
            }
        } else if (this.force.x < 0) {
            if(!this.colliding(this.BL.x + this.force.x, this.BL.y) && !this.colliding(this.TL.x+this.force.x, this.TL.y) && !this.colliding(this.ML.x+this.force.x, this.ML.y)) {
                this.pos.x += this.force.x;
            } else if (!this.colliding(this.BL.x-1, this.BL.y) && !this.colliding(this.TL.x-1, this.TL.y) && !this.colliding(this.ML.x-1, this.ML.y)) {
                while(!this.colliding(this.BL.x-1, this.BL.y) && !this.colliding(this.TL.x-1, this.TL.y) && !this.colliding(this.ML.x-1, this.ML.y)) {
                    this.pos.x -= 1;
                    this.BL.x -= 1;
                    this.ML.x -= 1;
                    this.TL.x -= 1;
                }
            }
        }

        if (onLadder) {
            this.force.y = 0;
        } 

    }

    this.colliding = function(posx, posy) {
        var tileX = Math.floor(posx/tileW);
        var tileY = Math.floor(posy/tileH);

        if (collisionmap[tileY][tileX] == 1) {
            return true;
        } else if (collisionmap[tileY][tileX] == 0) {
            return false;
        } else if (collisionmap[tileY][tileX] == undefined) {
            return true;
        }
    }

    this.draw = function() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.pos.x - this.size.w/2 + viewport.offset.x, this.pos.y - this.size.h/2 + viewport.offset.y, this.size.w, this.size.h);

        ctx.fillStyle=  '#ff00ff';
        ctx.fillRect(this.pos.x + viewport.offset.x, this.pos.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.TL.x + viewport.offset.x, this.TL.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.TR.x + viewport.offset.x, this.TR.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.BL.x + viewport.offset.x, this.BL.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.BR.x + viewport.offset.x, this.BR.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.ML.x + viewport.offset.x, this.ML.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.MR.x + viewport.offset.x, this.MR.y + viewport.offset.y, 1, 1);
    }
}

var player = new Character(tileW*mapW/2, 100, Math.ceil(tileW*0.75), Math.ceil(tileH*1.8));

loaded[3] = true;