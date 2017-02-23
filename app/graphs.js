// PLOT stuff
var Plotly = require("plotly.js");

TESTER = document.getElementById('myDiv');

/* Current Plotly.js version */
console.log( Plotly.BUILD );

if (TESTER !== null)
{

Plotly.plot( TESTER, [{
    x: [0, 1],
    y: [1, 255] }], { 
    margin: { t: 0 } } );
}
else
{
    console.log( "Missing files");
}

