var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;
$(document).ready(function(){
    mapArray=[0,0,3,1,3,3,2,0,2,0,0,1,3,0,3,0,3,1,0,1,0,2,0,0,3];
    judgeArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    ctx=$("#myCanvas")[0].getContext("2d");
    imgMain=new Image();
    imgMain.src="RPG/images/spriteSheet.png";
    currentImgMainX=0;
    currentImgMainY=0;
    imgMain.onload=function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    };
    imgMountain=new Image();
    imgMountain.src="RPG/images/material.png";
    imgEnemy=new Image();
    imgEnemy.src="RPG/images/Enemy.png";
    imgFood=new Image();
    imgFood.src="RPG/images/material.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray){
                if(mapArray[x]==1){
                    ctx.drawImage(imgMountain,0,97,32,32,x%5*200,Math.floor(x/5)*200,200,200);
                }else if(mapArray[x]==3){
                    ctx.drawImage(imgEnemy,7,40,104,135,x%5*200,Math.floor(x/5)*200,200,200);
                }
                else if(mapArray[x]==2){
                    ctx.drawImage(imgFood,65,65,32,32,x%5*200,Math.floor(x/5)*200,200,200);
                }
            }
        };
    };
});

$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    event.preventDefault();
    switch(event.which){
        case 37:
            targetImgMainX = currentImgMainX - 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 175;
            break;
        case 38:
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY - 200;
            cutImagePositionX = 355;
            break;
        case 39:
            targetImgMainX = currentImgMainX + 200;
            targetImgMainY = currentImgMainY;
            cutImagePositionX = 540;
            break;
        case 40:
            targetImgMainX = currentImgMainX;
            targetImgMainY = currentImgMainY + 200;
            cutImagePositionX = 0;
            break;
        default:
            return;
    }
    
    if(targetImgMainX<=800 && targetImgMainX>=0 && targetImgMainY<=800 && targetImgMainY>=0){
        targetBlock=targetImgMainX/200+targetImgMainY/200*5;
    }
    else{
        targetBlock=-1;
    }
    ctx.clearRect(currentImgMainX, currentImgMainY,200,200);
    if(targetBlock==-1 || mapArray[targetBlock]==3){
        
    }
    else{
        $("#talkBox").text("");
        currentImgMainX=targetImgMainX;
        currentImgMainY=targetImgMainY;
    }
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
   
    switch(mapArray[targetBlock]){
        case undefined:
            $("#talkBox").text("邊界");
            break;
        case 1:
            if(judgeArray[targetBlock]==0){
                $("#talkBox").text("好吃!");
                judgeArray[targetBlock]=1;
            }
            break;
        case 2:
            if(judgeArray[targetBlock]==0){
                $("#talkBox").text("好吃!");
                judgeArray[targetBlock]=1;
            }
            break;
        case 3:
            $("#talkBox").text("有人");
            break;
    }
});