// Initialise the app
$(function() {
  console.log( "ready!" );
  randomBackground();
});


// A function with an array of background images from the assets folder that swaps the background of the body randomly
function randomBackground() {
  const images = [
    "assets/images/clothes.jpeg",
    "assets/images/girl.jpeg",
    "assets/images/groceries.jpeg",
    "assets/images/old-man.jpeg",
    "assets/images/street-market.jpeg",
  ];
  const randomImage = images[Math.floor(Math.random() * images.length)];
  $("body").css("background-image", "url(" + randomImage + ")");
}
