let redfonts;
let back;
let fishgroup;
let alpha = 0;
let graphics;
let fadeSpeed = 7;
let ww=500;
let hh=500;
let www=1520;
let hhh=750;
let w2=2886/5;
let h2=692/5;
let imageOn = true ;


function preload(){
   font1 = loadFont('lib/DYSONFUTURA-BOOK.TTF');
    back = loadImage("firstpage.png");
    redfonts=loadImage("redfonts.png");
    fishgroup=loadImage("fishgroup.png");
  }
  function setup(){
    createCanvas(1920,1080);
    graphics = createGraphics(width, height);
    background(back);

  }
  function jumpPage(){
    window.location.href = 'modal.html';
  }
  function draw(){
    
    

    graphics.clear();
    graphics.image(fishgroup, www/2-ww/2, hhh/2-hh/2-80, ww,hh);
    graphics.image(redfonts, www/2-w2/2+50, hhh/2-h2/2+280, w2,h2);
    graphics.noStroke();
    graphics.fill(0, alpha);
    graphics.rect(0, 0, 2000, 2000);
    
    if(mouseButton == LEFT){
      alpha += fadeSpeed;
      if (alpha > 255) {
        alpha = 255;
      }
      setTimeout(jumpPage,1000);
      
  }
  image(graphics, 0, 0);
  
    
  

    }
    