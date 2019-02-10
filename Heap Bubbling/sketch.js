//var TRANSPARENT_BUBBLE = loadImage('images/transparent');
//var PINK_BUBBLE = loadImage('images/transparent');
//var ROOT_POSITION = new Position(windowWidth/2, windowHeight/4);
var X_OFFSET = 30;
var Y_OFFSET = 30;
var bub1;
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  

  bub1 = new Bubble('1');
  bub1.position = new Position(windowWidth/2, windowHeight/6);
}

function draw() {
  bub1.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function arrayToBubble(num_arr) {
  var bubble_array = new Array(num_arr.length);
  for (var i = 0; i < num_arr.length; i++) {
    var temp_bubble = new Bubble(num_arr[i]);
    bubble_array[i] = temp_bubble;
  }
  return assignBubbleProperties(bubble_array);
  /*assign parents, children, and positions of bubbles*/
}

function assignBubbleProperties(bubble_array) {
  /*the first element of the bubble array*/
  var root = bubble_array[0];
  root.position = new Position(windowWidth/2, windowHeight/4);
  if (bubble_array.length == 2) {
    root.children = [bubble_array[1]];
    root.children[0].position = new Position(root.position.x - X_OFFSET, root.position.y + Y_OFFSET);
  }
  else if (bubble_array.length > 2) {
    root.children = [bubble_array[1], bubble_array[2]];
    root.children[0].position = new Position(root.position.x - X_OFFSET, root.position.y + Y_OFFSET);
    root.children[1].position = new Position(root.position.x + X_OFFSET, root.position.y + Y_OFFSET);
  }
  /*the rest of the bubble array*/
  for (var i = 1; i < Math.floor(bubble_array.length/2); i++) {
    var current = bubble_array[i];
    current.parent = Math.floor((i-1)/2);
    if ((2*i + 2) < bubble_array.length) {
      current.children = [bubble_array[2*i + 1], bubble_array[2*i + 2]];
      current.children[0].position = new Position(current.position.x - X_OFFSET, current.position.y + Y_OFFSET);
      current.children[1].position = new Position(current.position.x + X_OFFSET, current.position.y + Y_OFFSET);
    }
    else if ((2*i + 1) < bubble_array.length) {
      current.children = [bubble_array[2*i + 1]];
      current.children[0].position = new Position(current.position.x - X_OFFSET, current.position.y + Y_OFFSET);
    }
  }
  return bubble_array;
}

class Heap {
  constructor(bubble_array) {
    this.sorted = 0;
    this.bubble_array = this.bubble_array;
  }

  heapify() {

  }

  swap() {

  }

  display_Heap() {

  }

  display_Array() {

  }
}

class Bubble {
  constructor(number) {
    this.number = number;
    //this.bubble = bubble;
    this.parent = null;
    this.children = null;
    this.position = null;
    // if (this.parent == null) {
    //   this.x = windowWidth/2;
    //   this.y = windowHeight/2;
    // }
    /*implement position setting*/
  }

  display() {
    //image(this.bubble, this.position.x, this.position.y, this.bubble.width/2, this.bubble.height/2);
    ellipse(this.position.x, this.position.y, 80, 80);
    text(this.number, this.position.x, this.position.y);
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  change_X(new_x) {
    this.x = new_x;
  }
  change_Y(new_y) {
    this.y = new_y;
  }
}
