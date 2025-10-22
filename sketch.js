// Add some header info
// For TM template code

// Video
let video;
let label = 'waiting...';
let lyd1,lyd2;
let classifier;
let uiBox, startBtn;
let started = false;

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

  // Startknap (viser sig oven på canvas)
  startBtn = createButton("Start");
  startBtn.position(width / 2 - 50, height / 2 + 40);
  startBtn.style("font-size", "20px");
  startBtn.style("padding", "10px 20px");
  startBtn.mousePressed(startExperience);
}

function startExperience() {
  userStartAudio(); // vigtigt for at lyd virker i browser
  lyd1.loop();
  lyd1.setVolume(0);
  lyd2.loop();
  lyd2.setVolume(0);
  classifyVideo();
  startBtn.hide(); // fjern knappen
  started = true; // skift til "oplevelse"
}

// STEP 2 classify!
function classifyVideo(){
    classifier.classify(video, gotResults);
}

function draw() {
  if (!started) {
    // --- STARTSKÆRM ---
    background(0);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("Kast din hånd helt foran mit lækre kamera\n Åben og Luk den for at se hvad der venter sig", width / 2, height / 2 - 40);
    return; // stopper her indtil man har startet
  }

  // --- HOVEDDEL AF OPLEVELSEN ---
  background(0);

  if (label === "No hands") {
    background(0, 255, 0);
    lyd1.setVolume(0);
    lyd2.setVolume(0);
  } else if (label === "Closed hands") {
    background(255, 0, 0);
    lyd1.setVolume(1);
    lyd2.setVolume(0);
  } else if (label === "Open hands") {
    background(0, 0, 255);
    lyd1.setVolume(0);
    lyd2.setVolume(1);
  }

  imageMode(CENTER);
  image(video, width / 2, height / 2);

  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height - 16);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label;
  classifyVideo();
}