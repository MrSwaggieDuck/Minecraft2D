var selectedSlot = 0;

var Stone = new Block(1, 'Images/Items/Stone.png', 'block', 7.5, null, null, [false, null]);
var Grass = new Block(2, 'Images/Items/Grass.png', 'block', 0.9, null, null, [false, null]);
var Dirt = new Block(3, 'Images/Items/Dirt.png', 'block', 0.75, null, null, [false, null]);
var Cobblestone = new Block(4, 'Images/Items/Cobblestone.png', 'block', 10, null, null, [true, 1]);
var Oak_Planks = new Block(5, 'Images/Items/Oak_Planks.png', 'block', 3, [0,0, 0,17, 4], [0,0,0, 0,17,0, 0,0,0, 4], [false, null]);
var Gold_Ore = new Block(14, 'Images/Items/Gold_Ore.png', 'block', 15, null, null, [true, 266]);
var Iron_Ore = new Block(15, 'Images/Items/Iron_Ore.png', 'block', 15, null, null, [true, 265]);
var Coal_Ore = new Block(16, 'Images/Items/Coal_Ore.png', 'block', 15, null, null, [true, 263]);
var Oak_Wood = new Block(17, 'Images/Items/Oak_Wood.png', 'block', 3, null, null, [false, null]);
var Oak_Leaves = new Block(18, 'Images/Items/Oak_Leaves.png', 'block', 0.35, null, null, [false, null]);
var Lapis_Ore = new Block(21, 'Images/Items/Lapis_Ore.png', 'block', 15, null, null, [true, 351.4]);
var Diamond_Ore = new Block(56, 'Images/Items/Diamond_Ore.png', 'block', 15, null, null, [true, 264]);
var Crafting_Table = new Block(58, 'Images/Items/Crafting_Table.png', 'block', 3.75, [5,5, 5,5 ,1], [0,0,0, 0,5,5, 0,5,5, 1], [false, null]);
var Furnace = new Block(61, 'Images/Items/Furnace.png', 'block', 17.5, null, [4,4,4, 4,0,4, 4,4,4, 1], [false, null]);
var Redstone_Ore = new Block(73, 'Images/Items/Redstone_Ore.png', 'block', 15, null, null, [true, 331]);
var Emerald_Ore = new Block(129, 'Images/Items/Emerald_Ore.png', 'block', 15, null, null, [true, 388]);
var Iron_Shovel = new Block(256, 'Images/Items/Iron_Shovel.png', 'tool', null, null, [0,265,0, 0,280,0, 0,280,0, 1], [false, null]);
var Iron_Pickaxe = new Block(257, 'Images/Items/Iron_Pickaxe.png', 'tool', null, null, [265,265,265, 0,280,0, 0,280,0, 1], [false, null]);
var Iron_Axe = new Block(258, 'Images/Items/Iron_Axe.png', 'tool', null, null, [265,265,0, 265,280,0, 0,280,0, 1], [false, null]);
var Coal = new Block(263, 'Images/Items/Coal.png', 'tool', null, null, null, [false, null]);
var Diamond = new Block(264, 'Images/Items/Diamond.png', 'tool', null, null, null, [false, null])
var Iron = new Block(265, 'Images/Items/Iron.png', 'tool', null, null, null, [false, null]);
var Gold = new Block(266, 'Images/Items/Gold.png', 'tool', null, null, null, [false, null]);
var Wooden_Shovel = new Block(269, 'Images/Items/Wooden_Shovel.png', 'tool', null, null, [0,5,0, 0,280,0, 0,280,0, 1], [false, null]);
var Wooden_Pickaxe = new Block(270, 'Images/Items/Wooden_Pickaxe.png', 'tool', null, null, [5,5,5, 0,280,0, 0,280,0, 1], [false, null]);
var Wooden_Axe = new Block(271, 'Images/Items/Wooden_Axe.png', 'tool', null, null, [5,5,0, 5,280,0, 0,280,0, 1], [false, null]);
var Stone_Shovel = new Block(273, 'Images/Items/Stone_Shovel.png', 'tool', null, null, [0,4,0, 0,280,0, 0,280,0, 1], [false, null]);
var Stone_Pickaxe = new Block(274, 'Images/Items/Stone_Pickaxe.png', 'tool', null, null, [4,4,4, 0,280,0, 0,280,0, 1], [false, null]);
var Stone_Axe = new Block(275, 'Images/Items/Stone_Axe.png', 'tool', null, null, [4,4,0, 4,280,0, 0,280,0, 1], [false, null]);
var Diamond_Shovel = new Block(277, 'Images/Items/Diamond_Shovel.png', 'tool', null, null, [0,264,0, 0,280,0, 0,280,0, 1], [false, null]);
var Diamond_Pickaxe = new Block(278, 'Images/Items/Diamond_Pickaxe.png', 'tool', null, null, [264,264,264, 0,280,0, 0,280,0, 1], [false, null]);
var Diamond_Axe = new Block(279, 'Images/Items/Diamond_Axe.png', 'tool', null, null, [264,264,0, 264,280,0, 0,280,0, 1], [false, null])
var Stick = new Block(280, 'Images/Items/Stick.png', 'tool' , null, [0,5, 0,5, 4], [0,0,0, 0,5,0, 0,5,0, 4], [false, null]);
var Golden_Shovel = new Block(284, 'Images/Items/Golden_Shovel.png', 'tool', null, null, [0,266,0, 0,280,0, 0,280,0, 1], [false, null]);
var Golden_Pickaxe = new Block(285, 'Images/Items/Golden_Pickaxe.png', 'tool', null, null, [266,266,266, 0,280,0, 0,280,0, 1], [false, null]);
var Golden_Axe = new Block(286, 'Images/Items/Golden_Axe.png', 'tool', null, null, [266,266,0, 266,280,0, 0,280,0, 1], [false, null]);
var Redstone = new Block(331, 'Images/Items/Redstone.png', 'tool', null, null, null, [false, null]);
var Lapis = new Block(351.4, 'Images/Items/Lapis.png', 'tool', null, null, null, [false, null]);
var Emerald = new Block(388, 'Images/Items/Emerald.png', 'tool', null, null, null, [false, null]);

var resources = [Stone, Grass, Dirt, Cobblestone, Oak_Planks, Gold_Ore, Iron_Ore, Coal_Ore, Oak_Wood, Oak_Leaves, Lapis_Ore, Diamond_Ore, Crafting_Table, Furnace, Redstone_Ore, Emerald_Ore, Iron_Shovel, Iron_Pickaxe, Iron_Axe, Coal, Diamond, Iron, Gold, Wooden_Shovel, Wooden_Pickaxe, Wooden_Axe, Stone_Shovel, Stone_Pickaxe, Stone_Axe, Diamond_Shovel, Diamond_Pickaxe, Diamond_Axe, Stick, Golden_Shovel, Golden_Pickaxe, Golden_Axe, Redstone, Lapis, Emerald];

function Block(id, img, type, hp, invrecipe, tablerecipe, meltable) {
    this.amount = 0;
    this.id = id;
    this.img = img;
    this.type = type;
    if (this.type == 'block') {
        this.hp = hp*60;
    }
    this.recipe = {
        inv: invrecipe,
        table: tablerecipe,
    };
    this.meltable = meltable;
}

var loaded = [false, false, false, false ,false, false, false];
loaded[0] = true;