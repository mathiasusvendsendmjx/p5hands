// Add some header info
// For TM template code

// Video
let video;

let label = 'waiting...';

let lyd1,lyd2;

let classifier;

// STEP 1: Load the model!
function preload() {
    classifier = ml5.imageClassifier(
      "https://teachablemachine.withgoogle.com/models/q_e6knNyN/model.json"
    );
    //soundFormats('wav');
    lyd1 = loadSound ('/audio/lyd1.wav');
    lyd2 = loadSound("/audio/lyd2.wav");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();

  // STEP 2: Start classifying
  classifyVideo();

  lyd1.play();
  lyd2.play();
}

// STEP 2 classify!
function classifyVideo(){
    classifier.classify(video, gotResults);
}

function draw() {
  background(0);

  if (label == "No hands") {
    background(0, 255, 0);
    lyd1.setVolume(0);
    lyd2.setVolume(0);
  } else if (label == "Closed hands") {
    background(255, 0, 0);
    lyd1.setVolume(1);
    lyd2.setVolume(0);
  } else if (label == "Open hands") {
    background(0, 0, 255);
    lyd1.setVolume(0);
    lyd2.setVolume(1);
  }
  imageMode(CENTER);
  image(video, width / 2, height / 2);

  // STEP 4: Draw the label
  textSize(32);
  textAlign(CENTER,CENTER);
  fill(255);
  text(label,width/2,height-16);
}

// STEP 3: Get the classification!
function gotResults(error, results){
    if (error) {
        console.error(error);
    }
    label = results[0].label;
    classifyVideo();
}