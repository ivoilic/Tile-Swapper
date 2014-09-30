/*!
 *  Tile Swapper 1.1
 *
 *  Copyright 2014 - Ivo Ilic
 *  Free for non-commercial use as long as this credit remains intact
 *
 *  Depends:
 *  ~jquery.js
 *
 *   How to use:
 *  1. Create div elements with either the "tile-swap" class (The div must have a position value of "relative","fixed","absolute" and must have a width and height in px)
 *  2. Give the div the "data-tile-width" attribute with the width of tile you want in px
 *  3. Give the div the "data-tile-height" attribute with the height of tile you want in px
 *  4. For automatic tile swapping give the div the "data-tile-speed" attribute with a time value in milliseconds
 *  5. Inside of the div create any number of img elements to be used (For manual tile swapping the images will cycle in the order in which they appear within the div)
 *  6. Make sure to provide a width and height attribute for each img element
 */
!function ($) {
    $(function(){
        $(".tile-swap").each(function(){
            
            var obj = this;
            $(obj).css({"overflow":"hidden"});
            var obj_width = $(obj).width();
            var obj_height = $(obj).height();
            var swap_speed = parseInt($(obj).attr("data-tile-speed"));
            var tile_width = parseInt($(obj).attr("data-tile-width"));
            var tile_height = parseInt($(obj).attr("data-tile-height"));
            var tile_count = (obj_width/tile_width) * (obj_height/tile_height);
            var given_imgs = jQuery.makeArray($(obj).children("img"));
            for (var i=0;i<given_imgs.length;i++){
                given_imgs[i].remove();
            };
            
            swap_tile = function(tile){
                var image_num = parseInt($(tile).attr("data-tile-image"))+1;
                if (image_num >= given_imgs.length) {
                    image_num = 0;
                }
                $(tile).attr("data-tile-image",image_num);
                var background_image = $(given_imgs[image_num]).attr("src");
                var image_left = (parseInt($(tile).attr("data-tile-column"))*tile_width*-1)+"px";
                var image_top = (parseInt($(tile).attr("data-tile-row"))*tile_height*-1)+"px";
                $(tile).css({
                    "background":"url('"+background_image+"') "+image_left+" "+image_top,
                    "background-size":obj_width+"px "+obj_height+"px"
                });
            };
            
            var pos_top = 0;
            
            
            for (var i=0;i<(obj_height/tile_height);i++) {
                var pos_left = 0;
                for(var a=0;a<(obj_width/tile_width);a++){
                    if (isNaN(swap_speed)==false) {
                        var image_pick = Math.floor(Math.random()*given_imgs.length); 
                    }else{
                        var image_pick = -1;
                    };
                    $("<div data-tile-image='"+image_pick+"' data-tile-column='"+a+"' data-tile-row='"+i+"' class='tile-swap-tile'>").appendTo(obj).width(tile_width).height(tile_height).css({"left":pos_left,"top":pos_top,"position":"absolute","background-color":"red"});
                    swap_tile($(obj).children(".tile-swap-tile[data-tile-column='"+a+"'][data-tile-row='"+i+"']"));
                    pos_left = pos_left+tile_width;
                };
                pos_top = pos_top+tile_height;
            };
            if (isNaN(swap_speed)==false && swap_speed !== 0) {
                var rand_tile = function(){
                    var rand_column = Math.floor(Math.random()*(obj_width/tile_width));
                    var rand_row = Math.floor(Math.random()*(obj_height/tile_height));
                    swap_tile($(obj).children(".tile-swap-tile[data-tile-column='"+rand_column+"'][data-tile-row='"+rand_row+"']"));
                };
                time_interval = setInterval(rand_tile,swap_speed);
            };
            
        });
         $(".tile-swap-tile").on("click",function(){swap_tile(this)});
   })

}(window.jQuery)
