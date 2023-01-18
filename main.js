draw_set=["flower","tree","square","triangle","pencil","leaf","diamond"];

random_number=Math.floor((Math.random()*draw_set.length)+1);
sketch=draw_set[random_number];
document.getElementById("drawing_name").innerHTML="Sketch To Be Drawn : "+sketch;

timer_counter=0;
score=0;
timer_check="";
drawn_sketch="";
anwser_holder="";


function preload(){
classifier=ml5.imageClassifier("DoodleNet");
}
function setup (){
canvas=createCanvas(280, 280);
canvas.center();
background("white");
canvas.mouseReleased(classifyCanvas);


}
function draw(){
stroke(0);
strokeWeight(9);
if(mouseIsPressed){
    line(pmouseX, pmouseY, mouseX, mouseY);
}
}
check_sketch()
if (drawn_sketch==sketch){
    anwser_holder="set";
    score++;
    document.getElementById("score").innerHTML="score"+score;
}
function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log("error");
    } 
    console.log(results);
    drawn_sketch=results[0].label;
    document.getElementById("label").innerHTML="Your sketch : "+drawn_sketch;
    document.getElementById("confident").innerHTML="Confidence : "+Math.round(results[0].confidence*100)+"%";
}
function check_sketch(){
    timer_counter++;
    document.getElementById("timer").innerHTML="timer"+timer_counter;
    console.log(timer_counter);

    if (timer_counter>400){
        timer_counter=0;
        timer_check="Time up";
    }

    if (timer_check=="Time up" || anwser_holder=="set"){
        timer_check="";
        anwser_holder="";
        updateCanvas();
    }
}
function updateCanvas(){
    background("white");
    random_number=Math.floor((Math.random()*draw_set.length)+1);
sketch=draw_set[random_number];
document.getElementsById("draw_name").innerHTML="Sketch To Be Drawn : "+sketch;
}
function clearCanvas(){
    background("white");
}