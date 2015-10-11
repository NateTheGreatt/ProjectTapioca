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
        
        this.pending = [];
        
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
            if(e.keyCode == 73) { // 73 = I
                scope.header.visible = !scope.header.visible;
                scope.bg.visible = !scope.bg.visible;
            }
        }
        
    }
    
    Inventory.prototype = Object.create(Component.prototype);
    Inventory.prototype.constructor = Inventory;
    
    Inventory.prototype.addItem = function(item) {
        this.pending.push(item);
    };
    
    Inventory.prototype.processItem = function(item) {
        
        function findSlotWithSameItem(item) {
            for(var i=0;i<scope.bg.slots.length;i++) {
                var slot = scope.bg.slots[i];
                if(slot.item) { // if slot has item and it can be stacked
                    if(slot.item.json.name == item.json.name // if names are the same
                    && slot.item.stack < slot.item.maxStack) // and it's not a full stack
                        return slot;
                }
            }
            return false;
        }
        
        function findFirstEmptySlot() {
            for(var i=0;i<scope.bg.slots.length;i++) {
                var slot = scope.bg.slots[i]; 
                if(slot.item == undefined) {
                    return slot;
                }
            }
            return false;
        }
        
        var stackSlot = findSlotWithSameItem(item);
        if(item.maxStack && stackSlot) {
            stackSlot.item.stack++;
            
            // update stack txt, else add stack txt
            if(stackSlot.item.children[0]) stackSlot.item.children[0].setText(stackSlot.item.stack);
            else {
                var stackTxt = game.add.text(0,0,stackSlot.item.stack,{font: '8px Courier New', fill: '#ffffff'});
                stackSlot.item.addChild(stackTxt);
            }
            
            item.kill();
            registry.ui.removeChild(item);
        } else {
            var emptySlot = findFirstEmptySlot();
            if(emptySlot) {
                registry.ui.remove(item);
                
                item.x = emptySlot.x;
                item.y = emptySlot.y;
                item.width = icoSize;
                item.height = icoSize;
                item.inputEnabled = true;
                item.input.enableDrag();
                
                scope.bg.addChild(item);
                emptySlot.item = item;
                item.slot = emptySlot;
                scope.items.push(item);
                
                function findClosestSlotTo(sprite) {
                    var closestSlot,dist;
                    var lastDist = 50; // if sprite is beyond this distance from any slot it will be deleted
                    scope.bg.slots.forEach(function(slot) {
                        dist = game.math.distance(slot.x,slot.y,sprite.x,sprite.y);
                        if(dist < lastDist) {
                            lastDist = dist;
                            closestSlot = slot;
                        }
                    });
                    return closestSlot;
                }
                
                var heldItemSlot;
                item.events.onDragStart.add(function(heldItem, pointer) {
                    
                    // put heldItem at top of display list by removing it and then re-adding it
                    scope.bg.removeChild(heldItem);
                    scope.bg.addChild(heldItem);
                    
                    heldItemSlot = heldItem.slot;
                });
                item.events.onDragStop.add(function(heldItem, pointer) {
                    
                    var closestSlot = findClosestSlotTo(heldItem);
                    
                    if(closestSlot) {
                        // if closestSlot has an item in it
                        if(closestSlot.item != undefined) {
                            
                            var closestItem = closestSlot.item;
                            
                            // move that item to the held item's slot
                            closestItem.x = heldItemSlot.x;
                            closestItem.y = heldItemSlot.y;
                            
                            // swap slot references
                            closestItem.slot = heldItemSlot;
                            heldItem.slot = closestSlot;
                            
                            // swap item references
                            closestSlot.item = heldItem;
                            heldItemSlot.item = closestItem;
                            
                            
                        } else { // if slot is empty
                            
                            heldItem.slot = closestSlot;
                            closestSlot.item = heldItem;
                            
                            heldItemSlot.item = null;
                            
                        }
                        
                        // move held item to closest slot no matter what
                        heldItem.x = closestSlot.x;
                        heldItem.y = closestSlot.y;
                        
                        
                        
                    } else { // dragged too far out of bounds, so delete item
                        // heldItem.kill();
                        heldItem.slot.item = undefined;
                        scope.bg.removeChild(heldItem);
                        scope.items.splice(scope.items.indexOf(heldItem),1);
                        
                        // add back to the game world
                        heldItem.width = 6;
                        heldItem.height = 6;
                        heldItem.x = scope.parent.x;
                        heldItem.y = scope.parent.y;
                        heldItem.events.destroy();
                        registry.drops.add(heldItem);
                    }
                });
                
                item.events.onInputDown.add(function(item, pointer) {
                    if(pointer.rightButton.isDown) {
                        if(item.stack > 1) {
                            item.stack--;
                            item.children[0].setText(item.stack);
                        } else {
                            item.kill();
                            item.slot.item = undefined;
                            scope.bg.removeChild(item);
                            scope.items.splice(scope.items.indexOf(item),1);
                        }
                        
                        // item.consume();
                    }
                });

            }
        }
        
    }
    
    Inventory.prototype.update = function() {
        
        while(this.pending.length > 0) {
            this.processItem(this.pending.shift());
        }
        
        if(scope.bg.cameraOffset.x != scope.header.cameraOffset.x) scope.bg.cameraOffset.x = scope.header.cameraOffset.x;
        if(scope.bg.cameraOffset.y != scope.header.cameraOffset.y+12) scope.bg.cameraOffset.y = scope.header.cameraOffset.y+12;
    };
    
    return Inventory;
    
});