function setup() {
  // put setup code here
  createCanvas(720, 400);
  // Pick colors randomly
  r = random(255);
  g = random(255);
  b = random(255);
}

function draw() {
  // put drawing code here
  strokeWeight(2);
  stroke(r, g, b);
  fill(r, g, b, 127);
  ellipse(56, 46, 60, 60)
  if (mousePressed()) {
    temp1 = random(1280)
    temp2 = random(720)
    ellipse(, 60, 60)
  }
}

function mousePressed() {
  // Check if mouse is inside the circle
  let d = dist(mouseX, mouseY, 56, 46);
  if (d < 30) {
    // Pick new random color values
    r = random(255);
    g = random(255);
    b = random(255);
  }
}
