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
        this.TR = {x: this.pos.x + this.size.w/2 - 1, y: this.pos.y - this.size.h/2};
        this.TL = {x: this.pos.x - this.size.w/2, y: this.pos.y - this.size.h/2};

        if(gamemap[Math.floor((this.BR.y+1)/tileH)][Math.floor(this.BR.x/tileW)] == 0 && gamemap[Math.floor((this.BL.y+1)/tileH)][Math.floor(this.BL.x/tileW)] == 0){
            this.force.y = this.force.y + gravity;
        } else { this.force.y = 0};

        if(keys[38] || keys[87]) {
            if (gamemap[Math.floor((this.BR.y+1)/tileH)][Math.floor(this.BR.x/tileW)] != 0 || gamemap[Math.floor((this.BL.y+1)/tileH)][Math.floor(this.BL.x/tileW)] != 0) {
                this.force.y = -12;
            }
        } 

        //console.log('jump:'+gamemap[Math.floor((this.BR.y+1)/tileH)][Math.floor(this.BR.x/tileW)]+''+gamemap[Math.floor((this.BL.y+1)/tileH)][Math.floor(this.BL.x/tileW)])

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
        
        //VERTICAL COLLISION DETECTION
        if (this.force.y > 0) {
            if(gamemap[Math.floor((this.BR.y+this.force.y)/tileH)][Math.floor(this.BR.x/tileW)] == 0 && gamemap[Math.floor((this.BL.y+this.force.y)/tileH)][Math.floor(this.BL.x/tileW)] == 0) {
                this.pos.y += this.force.y;
            } else {
                i = 0;
                while(gamemap[Math.floor((this.BR.y+i)/tileH)][Math.floor(this.BR.x/tileW)] == 0 && gamemap[Math.floor((this.BL.y+i)/tileH)][Math.floor(this.BL.x/tileW)] == 0) {
                    i += 1;
                }
                this.pos.y += i-1;
            }
        } else if (this.force.y < 0) {
            if(gamemap[Math.floor((this.TR.y+this.force.y)/tileH)][Math.floor(this.TR.x/tileW)] == 0 && gamemap[Math.floor((this.TL.y+this.force.y)/tileH)][Math.floor(this.TL.x/tileW)] == 0) {
                this.pos.y += this.force.y;
            } else {
                i = 0;
                while(gamemap[Math.floor((this.TR.y-i)/tileH)][Math.floor(this.TR.x/tileW)] == 0 && gamemap[Math.floor((this.TL.y-i)/tileH)][Math.floor(this.TL.x/tileW)] == 0) {
                    i += 1;
                }
                this.pos.y -= i-1;
                this.force.y = 0;
            }
        }

        //HORIZONTAL COLLISION DETECTION
        if (this.force.x > 0) {
            if(gamemap[Math.floor(this.BR.y/tileH)][Math.floor((this.BR.x+this.force.x)/tileW)] == 0 && gamemap[Math.floor(this.TR.y/tileH)][Math.floor((this.TR.x+this.force.x)/tileW)] == 0) {
                this.pos.x += this.force.x;
            } else if (gamemap[Math.floor(this.BR.y/tileH)][Math.floor((this.BR.x+1)/tileW)] == 0 && gamemap[Math.floor(this.TR.y/tileH)][Math.floor((this.TR.x+1)/tileW)] == 0) {
                i = 0;
                while(gamemap[Math.floor(this.BR.y/tileH)][Math.floor((this.BR.x+i)/tileW)] == 0 && gamemap[Math.floor(this.TR.y/tileH)][Math.floor((this.TR.x+i)/tileW)]) {
                    i += 1;
                }
                this.pos.x += i;
            }
        } else if (this.force.x < 0) {
            if(gamemap[Math.floor(this.BL.y/tileH)][Math.floor((this.BL.x+this.force.x)/tileW)] == 0 && gamemap[Math.floor(this.TL.y/tileH)][Math.floor((this.TL.x+this.force.x)/tileW)] == 0) {
                this.pos.x += this.force.x;
            } else if (gamemap[Math.floor(this.BL.y/tileH)][Math.floor((this.BL.x-1)/tileW)] == 0 && gamemap[Math.floor(this.TL.y/tileH)][Math.floor((this.TL.x-1)/tileW)] == 0) {
                i = 0;
                while(gamemap[Math.floor(this.BL.y/tileH)][Math.floor((this.BL.x-i)/tileW)] == 0 && gamemap[Math.floor(this.TL.y/tileH)][Math.floor((this.TL.x-i)/tileW)]) {
                    i += 1;
                }
                this.pos.x -= i;
            }
        }

        //console.log(gamemap[Math.floor(this.BR.y/tileH)][Math.floor(this.BR.x/tileW)]  + ':' + gamemap[Math.floor(this.BL.y/tileH)][Math.floor(this.BL.x/tileW)])
        //console.log(this.force.y);
        //console.log(keys);

    }

    this.draw = function() {
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(this.pos.x - this.size.w/2 + viewport.offset.x, this.pos.y - this.size.h/2 + viewport.offset.y, this.size.w, this.size.h);

        ctx.fillStyle=  '#ff00ff';
        ctx.fillRect(this.TL.x + viewport.offset.x, this.TL.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.TR.x + viewport.offset.x, this.TR.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.BL.x + viewport.offset.x, this.BL.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.BR.x + viewport.offset.x, this.BR.y + viewport.offset.y, 1, 1);
        ctx.fillRect(this.pos.x + viewport.offset.x, this.pos.y + viewport.offset.y, 1, 1);
    }
}

var player = new Character(100, 100, Math.ceil(tileW*0.75), Math.ceil(tileH*1.8));

loaded[3] = true;