// PLOT stuff
var Plotly = require("plotly.js");

// INVERTING COLORS
function handleFileSelect(evt)
{
    var files = evt.target.files;

    // files is a FileList of File objects. List some properties.
    var output = [];

    var rX = [];
    var rY = [];
    var gX = [];
    var gY = [];
    var bX = [];
    var bY = [];

    for (var i = 0, f; f = files[i]; i++) {
        output.push('<li><strong>', escape(f.name), '</strong> (', f.type || 'n/a', ') - ',
                    f.size, ' bytes, last modified: ',
                    f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
                    '</li>');

        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var img = document.getElementById("input");
        img.src = window.URL.createObjectURL(f);
        
        img.onload = function()
        {
            window.URL.revokeObjectURL(this.src);

            var c = document.getElementById("pad");
            var ctx = c.getContext("2d");
            var img = document.getElementById("input");  

            ctx.drawImage(img, 0, 0);

            var imgData = ctx.getImageData(0, 0, img.width, img.height);

            var i;

            for (i = 0; i < imgData.data.length; i += 4) {
                var yPos = i / 4; 

                // first row only
                if (yPos >= img.width)
                    break;

                var pixelX = yPos / img.width;
                
                // extract graph data
                rX.push(pixelX);
                gX.push(pixelX);
                bX.push(pixelX);

                var rYUnit = imgData.data[i] / 255.0;
                rY.push(rYUnit);
                var gYUnit = imgData.data[i + 1] / 255.0;
                gY.push(gYUnit);
                var bYUnit = imgData.data[i + 2] / 255.0;
                bY.push(bYUnit);

                // invert colors
                imgData.data[i] = 255 - imgData.data[i];
                imgData.data[i+1] = 255 - imgData.data[i+1];
                imgData.data[i+2] = 255 - imgData.data[i+2];
                imgData.data[i+3] = 255;
            }
            ctx.putImageData(imgData, 0, 0); 

            TESTER = document.getElementById('myDiv');

            Plotly.plot( TESTER, 
                [
                    {
                        x: rX,
                        y: rY,
                        line: {
                            color: "red",
                        },
                        name:"r", 
                    }
                    ,
                    {
                        x: gX,
                        y: gY, 
                        line: {
                            color: "green",
                        },
                        name:"g", 
                    }
                    ,{
                        x: bX,
                        y: bY,
                        line: {
                            color: "blue",
                        },
                        name:"b",                         
                    }

                ]
                ,
                { 
                    xaxis:
                    {
                        rangemode: "nonnegetive",
                        range: [0, 1],
                    },
                    yaxis:
                    {
                        rangemode: "nonnegetive",
                        range: [0, 1],
                    },                    
                }
            );
         
        };
    }

    // ADD FILE INFORMATION
    document.getElementById('fileInfo').innerHTML = '<ul>' + output.join('') + '</ul>';
};

document.getElementById("userImage").addEventListener('change', handleFileSelect, false);