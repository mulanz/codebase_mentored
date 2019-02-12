/*the bug is that nodes only bubble max once, and bubbling only works with some sets of numbers*/
/*would be cool to have the list get updated as it heaps */
var X_OFFSET = 140;
var Y_OFFSET = 90;
var test_array;
var test_heap;
//var bub1;
function setup() {
  var cnv = createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);
  fill('#5C7AFF');
  stroke('#5C7AFF');
  rect(0, 0, windowWidth/2, windowHeight);

  fill('#FFFFFF');
  stroke('#FFFFFF');
  textSize(40);
  text("List", 30, 60);
  fill('#5C7AFF');
  stroke('#5C7AFF');
  text("Max Heap", 30 + windowWidth/2, 60);

  test_array = ['2', '9', '6', '8', '2', '7', '1'];
  test_heap = new Heap(test_array);
  console.log(test_heap);
  // console.log(test_bub_array[4]);
  // console.log(test_bub_array[5]);
  // bub1 = new Bubble('1');
  // bub1.position = new Position(windowWidth/2, windowHeight/6);
}

function draw() {
  //bub1.display();
  textSize(30);
  next_Button_Display();
  /*displaying the bubbles*/
  for (var i = 0; i < test_heap.final_bubbles.length; i++) {
    if (test_heap.final_bubbles[i].position != null) {
      if (test_heap.final_bubbles[i].color == 0) {
        fill('#5C7AFF');
        stroke('#5C7AFF');
      }
      else {
        fill('#59D2FE');
        stroke('#59D2FE');
      }
       strokeWeight(1);
       ellipse(test_heap.final_bubbles[i].position.x, test_heap.final_bubbles[i].position.y, 80, 80);
       stroke('#FFFFFF');
       fill('#FFFFFF');
       text(test_heap.final_bubbles[i].number, test_heap.final_bubbles[i].position.x - 9, test_heap.final_bubbles[i].position.y + 9);
    }
  }

  for (var i = 0; i < test_heap.bubble_array.length; i++) {
    strokeWeight(1);
    if (test_heap.current_bubble_index == i + 1) {
      fill('#59D2FE');
      stroke('#59D2FE');
      text("^", test_heap.bubble_array[i].array_position.x, test_heap.bubble_array[i].array_position.y + 50);
    }
    else {
      fill('#5C7AFF');
      stroke('#5C7AFF');
      text("^", test_heap.bubble_array[i].array_position.x, test_heap.bubble_array[i].array_position.y + 50);
      stroke('#FFFFFF');
      fill('#FFFFFF');
    }
    text(test_heap.bubble_array[i].number, test_heap.bubble_array[i].array_position.x, test_heap.bubble_array[i].array_position.y);
    strokeWeight(3);
    line(test_heap.bubble_array[i].array_position.x - 10, test_heap.bubble_array[i].array_position.y + 10, test_heap.bubble_array[i].array_position.x + 25, test_heap.bubble_array[i].array_position.y + 10);
  }
}

function mousePressed() {
  var d = dist(mouseX, mouseY, windowWidth/2, windowHeight*(3/4) + 30);
  if (d < 15) {
    if (test_heap.sorted == 0) {
      var heaped = test_heap.heapify();
      if (heaped == 1) {
        window.alert("CONGRATS YOU HEAPIFIED THIS LIST! get back to ur heaps of hw")
      }
      console.log(test_heap);
      //test_heap.display();
      return 1;
    }
  return 0
  }
  // if (d < )
}
function next_Button_Display() {
  fill('#FFFFFF');
  strokeWeight(3);
  stroke('#5C7AFF');
  circle(windowWidth/2, windowHeight*(3/4) + 30, 30, 30);
  fill('#5C7AFF');
  strokeWeight(1);
  stroke('#5C7AFF');
  text('>', windowWidth/2 - 8, windowHeight*(3/4) + 9 + 2 + 30);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function arrayToBubble(num_arr) {
  counter = 1;
  var bubble_array = new Array(num_arr.length);
  for (var i = 0; i < num_arr.length; i++) {
    var temp_bubble = new Bubble(num_arr[i]);
    temp_bubble.array_position = new Position(counter*(windowWidth/(2*num_arr.length)) - windowWidth/(4*num_arr.length) - 10, windowHeight/2);
    counter ++;
    bubble_array[i] = temp_bubble;
  }
  return assignBubbleProperties(bubble_array);
  /*assign parents, children, and positions of bubbles*/
}

function assignBubbleProperties(bubble_array) {
  /*the first element of the bubble array*/
  var counter = 1;
  var line = Math.pow(2, counter);
  var root = bubble_array[0];
  root.position = new Position(windowWidth*(3/4), windowHeight/4);
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
  for (var i = 1; i < bubble_array.length; i++) {
    if (line == 0) {
      counter ++;
      line = Math.pow(2, counter);
    }
    var current = bubble_array[i];
    current.parent = bubble_array[Math.floor((i-1)/2)];
    //console.log(current.parent);
    if ((2*i + 2) < bubble_array.length) {
      current.children = [bubble_array[2*i + 1], bubble_array[2*i + 2]];
      current.children[0].position = new Position(current.position.x - (0.5*counter)*X_OFFSET, current.position.y + (1.7*counter)*Y_OFFSET);
      current.children[1].position = new Position(current.position.x + (0.5*counter)*X_OFFSET, current.position.y + (1.7*counter)*Y_OFFSET);
    }
    else if ((2*i + 1) < bubble_array.length) {
      current.children = [bubble_array[2*i + 1]];
      current.children[0].position = new Position(current.position.x - (0.5*counter)*X_OFFSET, current.position.y + (1.7*Y_OFFSET));
    }
  }
  line --;
  return bubble_array;
}

class Heap {
  constructor(num_array) {
    this.sorted = 0;
    //this.round_sorted = 1;

    this.num_array = num_array;
    this.bubble_array = arrayToBubble(num_array);

    this.current_bubble_index = 0;
    this.final_bubble_index = 0;

    this.final_nums = [];
    this.final_bubbles = [];
  }

  heapify() {
    //console.log(this);
    //console.log(this.final_bubbles);
    //console.log(test_heap);
    var bub = this.bubble_array[this.current_bubble_index]
    if (this.current_bubble_index >= this.bubble_array.length) {
      this.sorted = 1;
      //this.display();
      //console.log(1);
      return 1;
    }
    else if (this.final_bubble_index == 0) {
      this.final_nums.push(bub.number);
      this.final_bubbles = arrayToBubble(this.final_nums);
      this.final_bubble_index = this.final_bubbles.length - 1;
      if (this.final_bubbles.length > 0) {
        this.final_bubbles[0].color = 0;
        this.final_bubbles[this.final_bubble_index].color = 1;
      }
      this.current_bubble_index += 1;
      //this.display();
      //console.log(2);
      // this.final_bubbles.push(this.bubble_array[this.current_bubble_index]);
      // this.final_bubbles = assignBubbleProperties(this.final_bubbles);
      // this.final_bubble_index = this.final_bubbles.length - 1;
      // this.current_bubble_index += 1;
      return 0;
    }
    else if (this.final_nums[this.final_bubble_index] > this.final_nums[Math.floor((this.final_bubble_index - 1)/2)]) {
      var temp = this.final_nums[this.final_bubble_index];
      this.final_nums[this.final_bubble_index] = this.final_nums[Math.floor((this.final_bubble_index - 1)/2)];
      this.final_nums[Math.floor((this.final_bubble_index - 1)/2)] = temp;
      this.final_bubble_index = Math.floor((this.final_bubble_index - 1)/2);
      this.final_bubbles = arrayToBubble(this.final_nums);
      this.final_bubbles[this.final_bubble_index].color = 1;
      //this.display();
      //console.log(3);
      // var temp = this.final_bubbles[this.final_bubble_index];
      // this.final_bubbles[this.final_bubble_index] = this.final_bubbles[this.final_bubble_index].parent;
      // this.final_bubbles[this.final_bubble_index].parent = temp;
      // this.final_bubbles = assignBubbleProperties(this.final_bubbles);
      return 0;
    }
    else {
      this.final_nums.push(bub.number);
      this.final_bubbles = arrayToBubble(this.final_nums);
      this.final_bubble_index = this.final_bubbles.length - 1;
      this.final_bubbles[this.final_bubble_index].color = 1;
      this.current_bubble_index += 1;
      //this.display();
      //console.log(4);
      return 0;
    }


  }

  swap() {

  }

  display() {
    for (var i = 0; i < this.final_bubble_index; i++) {
      //console.log(this.final_bubble_index);
      //console.log(this.final_bubbles[this.final_bubble_index]);
      this.final_bubbles[this.final_bubble_index].display();
      //console.log(this.final_bubbles[this.final_bubble_index]);
        //console.log(this.final_bubbles[this.final_bubble_index]);
    }
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
    this.array_position = null;
    this.color = 0;
    // if (this.parent == null) {
    //   this.x = windowWidth/2;
    //   this.y = windowHeight/2;
    // }
    /*implement position setting*/
  }

  display() {
    //image(this.bubble, this.position.x, this.position.y, this.bubble.width/2, this.bubble.height/2);
    fill('#5C7AFF');
    strokeWeight(1);
    stroke('#5C7AFF');
    ellipse(this.position.x, this.position.y, 80, 80);
    stroke('#FFFFFF');
    fill('#FFFFFF');
    text(this.number, this.position.x - 9, this.position.y + 9);
    //console.log(this);
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
