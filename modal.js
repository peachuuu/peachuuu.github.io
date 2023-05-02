let diameter = 50; // 圆的直径
let brightness = 0; // 圆的亮度
let speed = 10; // 控制亮度变化的速度，可通过修改该变量来改变亮度变化的频率
let increasing = true; // 是否在增加亮度
let fish;
let size;
let a = 180;


let circles = [];
let cirarrs = []
let cjarr = [300, 1200, 2500, 3250, 3700, 4100, 4200, 4400, 4600, 4800, 5000, 5200, 5400]
let orderarr = ['CARCHARHINIFORMES', 'MYLIOBATIFORMES', 'SQUALIFORMES', 'RAJIFORMES', 'LAMNIFORMES', 'TORPEDINIFORMES', 'Orectolobiformes', 'RHINOPRISTIFORMES', 'CHIMAERIFORMES', 'HEXANCHIFORMES', 'SQUATINIFORMES', 'HETERODONTIFORMES', 'PRISTIOPHORIFORMES']
let trendRadio;
let sizeRadio;
let threatRadio;
let radio;
let button;

function preload() {
  fish = loadTable('fish.csv', "csv", 'header');
  font1 = loadFont('lib/DYSONFUTURA-BOOK.TTF');
  back = loadImage("background.png");
}
function setup() {
  createCanvas(6000, 1080);
  
  background_thing()
  //初始化所有的圆
  for (let i = 0; i < 217; i++) {
    let x = 5 * i;
    let H = fish.getNum(i, 'High');
    let L = fish.getNum(i, 'Low');
    let y = Math.round((H + L) / 300) * 100 + 100;
    let size = fish.getNum(i, 'Redlist');
    let trend = fish.getString(i, 'Trend');
    let order = fish.getString(i, 'Order');
    let threats = fish.getString(i, 'Threat');
    let threat = threats.split(',');
    let name = fish.getString(i, 'Name');
    let habitats = fish.getString(i, 'Habitat');
    let habitat = habitats.split(',');
    let conversations = fish.getString(i, 'Conservation');
    let conversation = conversations.split(',');
    let list = fish.getString(i, 'Redlist2');
    if (trend == 'Decreasing') {
      color_r = 5
      color_g = 67
      color_b = 100
    }
    if (trend == 'Increasing') {
      color_r = 125
      color_g = 4
      color_b = 2
    }
    if (trend == 'Unknown') {
      color_r = 162
      color_g = 165
      color_b = 167
    }
    if (trend == 'Stable') {
      color_r = 255
      color_g = 255
      color_b = 255
    }
    let cir = new circle(x, y)
    cir.H = H
    cir.L = L
    cir.size = size
    cir.color_r = color_r
    cir.color_g = color_g
    cir.color_b = color_b
    cir.trend = trend
    cir.brightness = 255
    cir.increasing = true
    cir.order = order
    cir.threat = threat
    cir.name = name
    cir.habitat = habitat
    cir.conversation = conversation
    cir.list = list
    circles.push(cir);
  }
  //把每个圆放到对应的圆组(circlearr)中
  for (let j = 0; j < 13; j++) {
    let xx = cjarr[j]
    let c = new circlearr(xx)
    c.order = orderarr[j]
    for (let i = 0; i < circles.length; i++) {
      let cir = circles[i]
      if (cir.order == c.order) {
        c.cirarr.push(cir)
      }
    }
    cirarrs.push(c)
  }
  print(cirarrs)
  print(circles)
  shaixuan()
  DrawCircle();

}
function draw() {
  background(9,116,172);

  background_thing()
  // DrawCircle();
  DrawCircle_shai();
  howtoread()

}

function DrawCircle() {
  for (let i = 0; i < cirarrs.length; i++) {
    let c = cirarrs[i]
    for (let j = 0; j < c.cirarr.length; j++) {
      let cir = c.cirarr[j];

      fill(cir.color_r, cir.color_g, cir.color_b, 200);
      noStroke();
      ellipse(j * 20 + c.x, cir.y, (5 * cir.size + 5), (5 * cir.size + 5));
    }
  }
}

function DrawCircle_shai() {
  let val1 = trendRadio.value();
  let val2 = sizeRadio.value();
  let val3 = threatRadio.value();
  for (let j = 0; j < cirarrs.length; j++) {
    let c = cirarrs[j]
    for (let i = 0; i < c.cirarr.length; i++) {
      let cir = c.cirarr[i];
      if (val1 == 'All' && val2 == 'All' && val3 == 'All') {
        fill(cir.color_r, cir.color_g, cir.color_b, 160);
        noStroke();
        ellipse(i * 20 + c.x, cir.y, (5 * cir.size + 5), (5 * cir.size + 5));
      }
      else {
        if (val1 == cir.trend || val1 == 'All') {
          if (cir.threat.includes(val3) || val3 == 'All') {
            if (val2 == cir.list || val2 == 'All') {
              fill(cir.color_r, cir.color_g, cir.color_b, 160);
              noStroke();
              ellipse(i * 20 + c.x, cir.y, (5 * cir.size + 5), (5 * cir.size + 5));
            }
          }
        }
      }
    }
  }
  for (let j = 0; j < cirarrs.length; j++) {
    let c = cirarrs[j]
    for (let i = 0; i < c.cirarr.length; i++) {
      let cir = c.cirarr[i];
      if (val1 == 'All' && val2 == 'All' && val3 == 'All') {
        if (dist(mouseX, mouseY, 20 * i + c.x, cir.y) < (5 * cir.size + 5) / 2) {
          print(cir)
          push()
          translate(i * 20 + c.x, cir.y)
          scale(2)
          fill(cir.color_r, cir.color_g, cir.color_b);
          noStroke();
          ellipse(0, 0, 5 * cir.size + 5);
          fill(255);
          rect(10, 0 + 10, 180, 120);
          textSize(10);
          textFont(font1);
          textStyle(BOLD);
          fill('#134187');
          textAlign(LEFT, LEFT);
          textSize(10);
          text(cir.name, 10 + 7, 0 + 10 + 13, 150, 100);
          textSize(8);
          fill(0);
          text('Order:', 10 + 7, 0 + 10 + 28, 75, 100);
          text('Low:', 10 + 7, 0 + 10 + 38, 75, 100);
          text('Redlist:', 10 + 90, 0 + 10 + 28, 75, 100);
          text('High:', 10 + 90, 0 + 10 + 38, 75, 100);
          text('Habitat:', 10 + 7, 0 + 10 + 50, 75, 100);
          text('Threat:', 10 + 7, 0 + 10 + 70, 75, 100);
          text('Conversation:', 10 + 7, 0 + 10 + 95, 75, 100);
          textStyle(NORMAL);
          text(cir.L, 10 + 25, 0 + 10 + 38, 75, 100);
          text(cir.H, 10 + 110, 0 + 10 + 38, 75, 100);
          textSize(6);
          text(cir.habitat, 10 + 37, 0 + 10 + 50, 150, 100);
          text(cir.threat, 10 + 34, 0 + 10 + 70, 145, 100);
          text(cir.conversation, 10 + 57, 0 + 10 + 95, 120, 100)
          //redlist
          if (cir.size == 1) {
            text('Critically Endangered', 10 + 115, 0 + 10 + 27.5, 75, 100);
          } if (cir.size == 2) {
            text('Endangered', 10 + 115, 0 + 10 + 28, 75, 100);
          } if (cir.size == 3) {
            text('Vulnerable', 10 + 115, 0 + 10 + 28, 75, 100);
          } if (cir.size == 4) {
            text('Near Threatened', 10 + 115, 0 + 10 + 28, 75, 100);
          } if (cir.size == 5) {
            text('Least Concern', 10 + 115, 0 + 10 + 28, 75, 100);
          } if (cir.size == 6) {
            text('Data Deficient', 10 + 115, 0 + 10 + 28, 75, 100);
          }
          textSize(5);
          text(cir.order, 10 + 32, 0 + 10 + 27.5, 75, 100);
          // 威胁环
          if (cir.threat.includes('Biological resource use')) {
            stroke('#EE2C24');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(0), radians(30));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(0), radians(30));
            noStroke();

          }
          if (cir.threat.includes('Energy production & mining')) {
            stroke('#E76F51');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(45), radians(75));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(45), radians(75));
            noStroke();
          }
          if (cir.threat.includes('Human intrusions & disturbance')) {
            stroke('#86E0C2');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(90), radians(120));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(90), radians(120));
            noStroke();
          }

          if (cir.threat.includes('Residential & commercial development')) {
            stroke('#2A9D8F');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(135), radians(165));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(135), radians(165));
            noStroke();

          }
          if (cir.threat.includes('Climate change & severe weather')) {
            stroke('#A7CCED');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(180), radians(210));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(180), radians(210));
            noStroke();

          }
          if (cir.threat.includes('Agriculture & aquaculture')) {
            stroke('#545E75');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(225), radians(255));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(225), radians(255));
            noStroke();

          }
          if (cir.threat.includes('Natural system modifications')) {
            stroke('#56ACED');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(270), radians(300));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(270), radians(300));
            noStroke();

          }
          if (cir.threat.includes('Pollution')) {
            stroke('#FFCB77');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(315), radians(345));
            noStroke();
          } else {
            stroke('#FFFFFF');
            strokeWeight(1.5);
            noFill();
            arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(315), radians(345));
            noStroke();

          }
          pop()
        }
      }
      else {
        if (val1 == cir.trend || val1 == 'All') {
          if (cir.threat.includes(val3) || val3 == 'All') {
            if (val2 == cir.list || val2 == 'All') {
              if (dist(mouseX, mouseY, 20 * i + c.x, cir.y) < (5 * cir.size + 5) / 2) {
                print(cir)
                push()
                translate(i * 20 + c.x, cir.y)
                scale(2)
                fill(cir.color_r, cir.color_g, cir.color_b);
                noStroke();
                ellipse(0, 0, 5 * cir.size + 5);
                fill(255);
                rect(10, 0 + 10, 180, 120);
                textSize(10);
                textFont(font1);
                textStyle(BOLD);
                fill('#134187');
                textAlign(LEFT, LEFT);
                textSize(10);
                text(cir.name, 10 + 7, 0 + 10 + 13, 150, 100);
                textSize(8);
                fill(0);
                text('Order:', 10 + 7, 0 + 10 + 28, 75, 100);
                text('Low:', 10 + 7, 0 + 10 + 38, 75, 100);
                text('Redlist:', 10 + 90, 0 + 10 + 28, 75, 100);
                text('High:', 10 + 90, 0 + 10 + 38, 75, 100);
                text('Habitat:', 10 + 7, 0 + 10 + 50, 75, 100);
                text('Threat:', 10 + 7, 0 + 10 + 70, 75, 100);
                text('Conversation:', 10 + 7, 0 + 10 + 95, 75, 100);
                textStyle(NORMAL);
                text(cir.L, 10 + 25, 0 + 10 + 38, 75, 100);
                text(cir.H, 10 + 110, 0 + 10 + 38, 75, 100);
                textSize(6);
                text(cir.habitat, 10 + 37, 0 + 10 + 50, 150, 100);
                text(cir.threat, 10 + 34, 0 + 10 + 70, 145, 100);
                text(cir.conversation, 10 + 57, 0 + 10 + 95, 120, 100)
                //redlist
                if (cir.size == 1) {
                  text('Critically Endangered', 10 + 115, 0 + 10 + 27.5, 75, 100);
                } if (cir.size == 2) {
                  text('Endangered', 10 + 115, 0 + 10 + 28, 75, 100);
                } if (cir.size == 3) {
                  text('Vulnerable', 10 + 115, 0 + 10 + 28, 75, 100);
                } if (cir.size == 4) {
                  text('Near Threatened', 10 + 115, 0 + 10 + 28, 75, 100);
                } if (cir.size == 5) {
                  text('Least Concern', 10 + 115, 0 + 10 + 28, 75, 100);
                } if (cir.size == 6) {
                  text('Data Deficient', 10 + 115, 0 + 10 + 28, 75, 100);
                }
                textSize(5);
                text(cir.order, 10 + 32, 0 + 10 + 27.5, 75, 100);
                // 威胁环
                if (cir.threat.includes('Biological resource use')) {
                  stroke('#EE2C24');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(0), radians(30));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(0), radians(30));
                  noStroke();

                }
                if (cir.threat.includes('Energy production & mining')) {
                  stroke('#E76F51');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(45), radians(75));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(45), radians(75));
                  noStroke();
                }
                if (cir.threat.includes('Human intrusions & disturbance')) {
                  stroke('#86E0C2');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(90), radians(120));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(90), radians(120));
                  noStroke();
                }

                if (cir.threat.includes('Residential & commercial development')) {
                  stroke('#2A9D8F');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(135), radians(165));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(135), radians(165));
                  noStroke();

                }
                if (cir.threat.includes('Climate change & severe weather')) {
                  stroke('#A7CCED');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(180), radians(210));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(180), radians(210));
                  noStroke();

                }
                if (cir.threat.includes('Agriculture & aquaculture')) {
                  stroke('#545E75');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(225), radians(255));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(225), radians(255));
                  noStroke();

                }
                if (cir.threat.includes('Natural system modifications')) {
                  stroke('#56ACED');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(270), radians(300));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(270), radians(300));
                  noStroke();

                }
                if (cir.threat.includes('Pollution')) {
                  stroke('#FFCB77');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(315), radians(345));
                  noStroke();
                } else {
                  stroke('#FFFFFF');
                  strokeWeight(1.5);
                  noFill();
                  arc(0, 0, 5 * cir.size + 10, 5 * cir.size + 10, radians(315), radians(345));
                  noStroke();

                }
                pop()
              }
            }
          }
        }
      }
    }
  }
}
class circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.H
    this.L
    this.size
    this.color_r
    this.color_g
    this.color_b
    this.trend
    this.brightness = 255
    this.increasing = true
    this.order
    this.threat
    this.name
    this.habitat
    this.conversation
    this.list
  }
}

class circlearr {
  constructor(x) {
    this.x = x
    this.order
    this.cirarr = []
  }
}

function background_thing() {
  stroke(255, 255, 255, 90);
  strokeWeight(2);
  line(1650, 50, 1650, 1000)
  line(2460, 50, 2460, 1000)
  line(3200, 50, 3200, 1000)
  line(3650, 50, 3650, 1000)
  line(3960, 50, 3960, 1000)
  line(4150, 50, 4150, 1000)
  line(4350, 50, 4350, 1000)
  line(4550, 50, 4550, 1000)
  line(4750, 50, 4750, 1000)
  line(4950, 50, 4950, 1000)
  line(5150, 50, 5150, 1000)
  line(5350, 50, 5350, 1000)

  noStroke();
  textSize(16);
  fill(255);
  textAlign(CENTER, CENTER); // 设置文本对齐方式为居中
  text('CARCHARHINIFORMES', 950, 50);
  text('MYLIOBATIFORMES', 2050, 50);
  text('SQUALIFORMES', 2820, 50);
  text('RAJIFORMES', 3420, 50);
  text('LAMNIFORMES', 3800, 50);
  text('TORPEDINIFORMES', 4050, 50);
  text('Orectolobiformes', 4250, 50);
  text('RHINOPRISTIFORMES', 4450, 50);
  text('CHIMAERIFORMES', 4650, 50);
  text('HEXANCHIFORMES', 4850, 50);
  text('SQUATINIFORMES', 5050, 50);
  text('HETERODONTIFORMES', 5250, 50);
  text('PRISTIOPHORIFORMES', 5450, 50);

  // fill('#0970A6');
  // stroke('#ffffff');
  // strokeWeight(10);
  // rect(25, 40, 250, 1000);

  textFont(font1);
  noStroke();
  textSize(18);
  fill(255);
  textStyle(BOLD);
  textAlign(CENTER, CENTER); // 设置文本对齐方式为居中
  text('HOW TO READ', 150, 75);

  noStroke();
  textSize(18);
  fill(255);
  textStyle(BOLD);
  text('Trend', 70, 120);
}

function shaixuan() {
  trendRadio = createRadio();
  trendRadio.option('All');
  trendRadio.option('Decreasing');
  trendRadio.option('Increasing');
  trendRadio.option('Stable');
  trendRadio.option('Unknown');
  trendRadio.style('100px', '60px');
  trendRadio.position(210, 120);
  trendRadio.selected('All');
  trendRadio.style('display', 'flex');
  trendRadio.style('flex-direction', 'column');
  trendRadio.style('gap', '-10px');

  // trendRadio.style('color',color(0,0,0,0))
  //textAlign(RIGHT);
  const radios = trendRadio.elt.getElementsByTagName('input');
  for (let i = 0; i < radios.length; i++) {
    radios[i].nextSibling.style.opacity = 0;
  }
  fill(255, 0, 0);

  sizeRadio = createRadio();
  sizeRadio.option('All');
  sizeRadio.option('Critically Endangered');
  sizeRadio.option('Endangered');
  sizeRadio.option('Vulnerable');
  sizeRadio.option('Near Threatened');
  sizeRadio.option('Least Concern');
  sizeRadio.option('Data Deficient');
  // sizeRadioo.style('100px', '60px');
  sizeRadio.position(170, 320);
  sizeRadio.selected('All');
  sizeRadio.style('display', 'flex');
  sizeRadio.style('flex-direction', 'column');
  const radios1 = sizeRadio.elt.getElementsByTagName('input');
  for (let i = 0; i < radios1.length; i++) {
    radios1[i].nextSibling.style.opacity = 0;
  }
  textAlign(RIGHT);
  fill(255, 0, 0);

  threatRadio = createRadio();
  threatRadio.option('All');
  threatRadio.option('Biological resource use');
  threatRadio.option('Energy production & mining');
  threatRadio.option('Human intrusions & disturbance');
  threatRadio.option('Residential & commercial development');
  threatRadio.option('Climate change & severe weather');
  threatRadio.option('Agriculture & aquaculture');
  threatRadio.option('Natural system modifications');
  threatRadio.option('Pollution');
  threatRadio.position(100, 550);
  threatRadio.selected('All');
  threatRadio.style('display', 'flex');
  threatRadio.style('flex-direction', 'column');
  //threatRadio.style('textSize', '100');
  const radios2 = threatRadio.elt.getElementsByTagName('input');
  for (let i = 0; i < radios2.length; i++) {
    radios2[i].nextSibling.style.opacity = 0;
  }
  threatRadio.style('gap', '100');
  textAlign(RIGHT);

}

function howtoread() {
  //左侧How to Read
  push()
  fill('#0970A6');
  stroke('#ffffff');
  strokeWeight(10);
  rect(25, 40, 250, 955);

  textFont(font1);
  noStroke();
  textSize(18);
  fill(255);
  textStyle(BOLD);
  textAlign(CENTER, CENTER); // 设置文本对齐方式为居中
  text('HOW TO READ', 150, 75);
  //Trend
  noStroke();
  textSize(18);
  fill(255);
  textStyle(BOLD);
  text('Trend', 70, 120);

  noStroke();
  fill('#054364');
  ellipse(60, 155, 30);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Decreasing', 120, 155);

  noStroke();
  fill('#7D0402');
  ellipse(60, 195, 30);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Increasing', 120, 195);

  noStroke();
  fill('#FFFFFF');
  ellipse(60, 235, 30);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Stable', 109, 235);

  noStroke();
  fill('#A2A5A7');
  ellipse(60, 275, 30);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Unknown', 120, 275);

  //Redlist
  noStroke();
  textSize(18);
  fill(255);
  textStyle(BOLD);
  text('Redlist', 75, 315);

  noStroke();
  fill('#054364');
  ellipse(60, 350, 6);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Critically Endangered', 155, 348);

  noStroke();
  fill('#054364');
  ellipse(60, 380, 11);


  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Endangered', 130, 378);

  noStroke();
  fill('#054364');
  ellipse(60, 410, 16);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Vulnerable', 128, 408);

  noStroke();
  fill('#054364');
  ellipse(60, 440, 21);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Least Concern', 137, 438);

  noStroke();
  fill('#054364');
  ellipse(60, 470, 26);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Near Threatened', 145, 470);

  noStroke();
  fill('#054364');
  ellipse(60, 507, 31);

  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Data Deficient', 137, 505);
  //Threat

  noStroke();
  textSize(18);
  fill(255);
  textStyle(BOLD);
  text('Threat', 78, 545);

  //Biological resource use

  noStroke();
  fill('#054364');
  ellipse(65, 595, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  arc(65, 595, 40, 40, radians(0), radians(30));
  noStroke();
  stroke('#FFFFFF');
  strokeWeight(1.5);

  arc(65, 595, 40, 40, radians(45), radians(75));
  arc(65, 595, 40, 40, radians(90), radians(120));
  arc(65, 595, 40, 40, radians(135), radians(165));
  arc(65, 595, 40, 40, radians(180), radians(210));
  arc(65, 595, 40, 40, radians(225), radians(255));
  arc(65, 595, 40, 40, radians(270), radians(300));
  arc(65, 595, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  text('Biological resource use', 165, 598);

  //Energy production & mining
  noStroke();
  fill('#054364');
  ellipse(65, 645, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#E76F51');
  strokeWeight(1.5);
  noFill();
  arc(65, 645, 40, 40, radians(45), radians(75));

  noStroke();
  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 645, 40, 40, radians(0), radians(30));
  arc(65, 645, 40, 40, radians(90), radians(120));
  arc(65, 645, 40, 40, radians(135), radians(165));
  arc(65, 645, 40, 40, radians(180), radians(210));
  arc(65, 645, 40, 40, radians(225), radians(255));
  arc(65, 645, 40, 40, radians(270), radians(300));
  arc(65, 645, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Energy production \n& mining', 100, 598 + 50);
  //Human intrusions & disturbance

  noStroke();
  fill('#054364');
  ellipse(65, 695, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#86E0C2');
  strokeWeight(1.5);
  noFill();
  arc(65, 695, 40, 40, radians(90), radians(120));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 695, 40, 40, radians(0), radians(30));
  arc(65, 695, 40, 40, radians(45), radians(75));

  arc(65, 695, 40, 40, radians(135), radians(165));
  arc(65, 695, 40, 40, radians(180), radians(210));
  arc(65, 695, 40, 40, radians(225), radians(255));
  arc(65, 695, 40, 40, radians(270), radians(300));
  arc(65, 695, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Human intrusions \n& disturbance', 100, 695);

  //Residential & commercial development

  noStroke();
  fill('#054364');
  ellipse(65, 745, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#2A9D8F');
  strokeWeight(1.5);
  noFill();
  arc(65, 745, 40, 40, radians(135), radians(165));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 745, 40, 40, radians(0), radians(30));
  arc(65, 745, 40, 40, radians(45), radians(75));
  arc(65, 745, 40, 40, radians(90), radians(120));
  arc(65, 745, 40, 40, radians(180), radians(210));
  arc(65, 745, 40, 40, radians(225), radians(255));
  arc(65, 745, 40, 40, radians(270), radians(300));
  arc(65, 745, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Residential & commer\n-cial development', 100, 745);
  //Climate change & severe weather

  noStroke();
  fill('#054364');
  ellipse(65, 795, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#A7CCED');
  strokeWeight(1.5);
  noFill();
  arc(65, 795, 40, 40, radians(180), radians(210));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 795, 40, 40, radians(0), radians(30));
  arc(65, 795, 40, 40, radians(45), radians(75));
  arc(65, 795, 40, 40, radians(90), radians(120));
  arc(65, 795, 40, 40, radians(135), radians(165));

  arc(65, 795, 40, 40, radians(225), radians(255));
  arc(65, 795, 40, 40, radians(270), radians(300));
  arc(65, 795, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Climate change \n& severe weather', 100, 795);

  //Agriculture & aquaculture

  noStroke();
  fill('#054364');
  ellipse(65, 845, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#545E75');
  strokeWeight(1.5);
  noFill();
  arc(65, 845, 40, 40, radians(225), radians(255));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 845, 40, 40, radians(0), radians(30));
  arc(65, 845, 40, 40, radians(45), radians(75));
  arc(65, 845, 40, 40, radians(90), radians(120));
  arc(65, 845, 40, 40, radians(135), radians(165));
  arc(65, 845, 40, 40, radians(180), radians(210));
  arc(65, 845, 40, 40, radians(270), radians(300));
  arc(65, 845, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Agriculture \n& aquaculture', 100, 845);

  noStroke();
  fill('#054364');
  ellipse(65, 845, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#545E75');
  strokeWeight(1.5);
  noFill();
  arc(65, 845, 40, 40, radians(225), radians(255));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 845, 40, 40, radians(0), radians(30));
  arc(65, 845, 40, 40, radians(45), radians(75));
  arc(65, 845, 40, 40, radians(90), radians(120));
  arc(65, 845, 40, 40, radians(135), radians(165));
  arc(65, 845, 40, 40, radians(180), radians(210));
  arc(65, 845, 40, 40, radians(270), radians(300));
  arc(65, 845, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Agriculture \n& aquaculture', 100, 845);

  //Natural system modifications

  noStroke();
  fill('#054364');
  ellipse(65, 895, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#56ACED');
  strokeWeight(1.5);
  noFill();
  arc(65, 895, 40, 40, radians(270), radians(300));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 895, 40, 40, radians(0), radians(30));
  arc(65, 895, 40, 40, radians(45), radians(75));
  arc(65, 895, 40, 40, radians(90), radians(120));
  arc(65, 895, 40, 40, radians(135), radians(165));
  arc(65, 895, 40, 40, radians(180), radians(210));
  arc(65, 895, 40, 40, radians(225), radians(255));
  arc(65, 895, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Natural system\n modifications', 100, 895);


  //Pollution

  noStroke();
  fill('#054364');
  ellipse(65, 945, 20);
  stroke('#EE2C24');
  strokeWeight(1.5);
  noFill();

  stroke('#56ACED');
  strokeWeight(1.5);
  noFill();
  arc(65, 945, 40, 40, radians(270), radians(300));
  noStroke();

  stroke('#FFFFFF');
  strokeWeight(1.5);
  arc(65, 945, 40, 40, radians(0), radians(30));
  arc(65, 945, 40, 40, radians(45), radians(75));
  arc(65, 945, 40, 40, radians(90), radians(120));
  arc(65, 945, 40, 40, radians(135), radians(165));
  arc(65, 945, 40, 40, radians(180), radians(210));
  arc(65, 945, 40, 40, radians(225), radians(255));
  arc(65, 945, 40, 40, radians(315), radians(345));

  noStroke();
  textSize(14);
  fill(255);
  textStyle(BOLD);
  textAlign(LEFT);
  text('Pollution', 100, 945);
  pop()



}