define([
    'game',
    'component/Component',
    'registry'
],
function(game,Component,registry) {
    
    var padding,icoSize,cols,width,height;
    
    var scope;
    
    function Inventory(parent) {
        Component.call(this,parent);
        
        scope = this;
        
        this.items = [];
        this.slots = 24;
        
        padding = 5;
        icoSize = 16;
        cols = 4;
        
        width = (icoSize * cols) + padding*cols + padding;
        height = (icoSize * Math.ceil(this.slots/cols) ) + padding*Math.ceil(this.slots/cols) + padding;

        var headerGfx = game.make.bitmapData(width,12);
        headerGfx.ctx.fillStyle = '#111111';
        headerGfx.ctx.fillRect(0, 0, width, 12);
        
        this.header = new Phaser.Sprite(game, 20,20, headerGfx);
        this.header.fixedToCamera = true;
        this.header.inputEnabled = true;
        this.header.input.enableDrag();
        registry.ui.add(this.header);
        

        var bgGfx = game.make.bitmapData(width, height);
        bgGfx.ctx.fillStyle = '#111111';
        bgGfx.ctx.fillRect(0, 0, width, height);
        this.bg = new Phaser.Sprite(game, this.header.x, this.header.y+12, bgGfx);
        this.bg.fixedToCamera = true;
        registry.ui.addChild(this.bg);
        this.bg.slots = [];
        this.bg.items = [];
        
        var icoGfx = game.make.bitmapData(icoSize,icoSize);
        icoGfx.ctx.fillStyle = '#666666';
        icoGfx.ctx.fillRect(0, 0, icoSize, icoSize);
        
        var count = 0;
        
        for(var y = padding; y < height; y+=icoSize+padding) {
            for(var x = padding; x < width; x+=icoSize+padding) {
                if(count < this.slots) {
                    var slot = new Phaser.Sprite(game,x,y,icoGfx);
                    this.bg.addChild(slot);
                    this.bg.slots.push(slot);
                }
                count++;
            }
        }
        
        var text = game.add.text(padding, padding-2, 'Inventory', {font: '9px Courier New', fill: '#ffffff'});
        this.header.addChild(text);
        
        game.input.keyboard.onDownCallback = function(e) {
            if(e.keyCode == 73) {
                scope.header.visible = !scope.header.visible;
                scope.bg.visible = !scope.bg.visible;
            }
        }
        
    }
    
    Inventory.prototype = Object.create(Component.prototype);
    Inventory.prototype.constructor = Inventory;
    
    Inventory.prototype.addItem = function(item) {
        
        item.kill();
        
        if(this.items.length < this.slots) {
            
        }
        
        var slot;
        
        function findSlotWithSameItem(item) {
            for(var i=0;i<scope.bg.slots.length;i++) {
                if(scope.bg.slots[i].item) {
                    if(scope.bg.slots[i].item.json.name == item.json.name) return scope.bg.slots[i];
                }
            }
            return false;
        }
        
        function findFirstFreeSlot() {
            for(var i=0;i<scope.bg.slots.length;i++) {
                if(scope.bg.slots[i].item == null) {
                    return scope.bg.slots[i];
                }
            }
            return false;
        }
        
        slot = findSlotWithSameItem(item);
        
        // if item is stackable and one exists in the inventory already
        if(item.json.stackable && slot) {
            // stack that shit
            slot.item.stack++;
            
            if(slot.item.children[0]) slot.item.children[0].setText(slot.item.stack)
            else {
                var stackTxt = game.add.text(0,0,slot.item.stack,{font: '9px Courier New', fill: '#ffffff'});
                slot.item.addChild(stackTxt);
            }
            
            
        } else {
            
            // otherwise put it into a new slot
            
            scope.items.push(item);
            
            slot = findFirstFreeSlot();
            
            var icoGfx = game.make.bitmapData(icoSize,icoSize);
            icoGfx.ctx.fillStyle = item.json.colorString;
            icoGfx.ctx.fillRect(0, 0, icoSize, icoSize);
            
            var inventorySprite = new Phaser.Sprite(game, slot.x, slot.y, icoGfx);
            
            inventorySprite.json = item.json;
            inventorySprite.stack = item.stack;
            
            inventorySprite.inputEnabled = true;
            inventorySprite.input.enableDrag();
    
            scope.bg.addChild(inventorySprite);
            scope.bg.items.push(inventorySprite);
            slot.item = inventorySprite;
            
            function findClosestSlotTo(sprite) {
                var closestSlot,dist;
                var lastDist = 100;
                scope.bg.slots.forEach(function(slot) {
                    dist = game.math.distance(slot.x,slot.y,sprite.x,sprite.y);
                    if(dist < lastDist) {
                        lastDist = dist;
                        closestSlot = slot;
                    }
                });
                return closestSlot;
            }
            
            var lastSlot;
            inventorySprite.events.onDragStart.add(function(heldItem, pointer) {
                
                // put heldItem at top of display list by removing it and then re-adding it
                scope.bg.removeChild(heldItem);
                scope.bg.addChild(heldItem);
                
                var closestSlot = findClosestSlotTo(heldItem);
                closestSlot.item = null;
                lastSlot = closestSlot;
            });
            inventorySprite.events.onDragStop.add(function(heldItem, pointer) {
                
                var closestSlot = findClosestSlotTo(heldItem);
                
                if(closestSlot) {
                    // swapping items
                    if(closestSlot.item) {
                        // move the contained item to the held item's previous slot
                        closestSlot.item.x = lastSlot.x;
                        closestSlot.item.y = lastSlot.y;
                        lastSlot.item = closestSlot.item;
                        lastSlot = null; // clear the reference
                    }
                    
                    heldItem.x = closestSlot.x;
                    heldItem.y = closestSlot.y;
                    closestSlot.item = heldItem;
                } else {
                    for(var i=0;i<scope.items.length;i++) {
                        var item = scope.items[i];
                        if(item.json.name == heldItem.json.name) {
                            heldItem.kill();
                            scope.items.splice(i,1);
                            break;
                        }
                    }
                    scope.items.forEach(function(item) {
                    })
                }
            });
            
            inventorySprite.events.onInputDown.add(function(item, pointer) {
                if(pointer.rightButton.isDown) {
                    
                }
            });
        }
    }
    
    Inventory.prototype.update = function() {
        if(scope.bg.cameraOffset.x != scope.header.cameraOffset.x) scope.bg.cameraOffset.x = scope.header.cameraOffset.x;
        if(scope.bg.cameraOffset.y != scope.header.cameraOffset.y+12) scope.bg.cameraOffset.y = scope.header.cameraOffset.y+12;
    };
    
    return Inventory;
    
});