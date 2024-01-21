/*
    * Name: Xavier Beltran
    * Course: CSC350
    * Project 2: Drawing
 */

"use strict";

var canvas;
var gl;

// To keep track of the points and colors
var t = [];

// To keep track of the various shapes and points being drawn
var shapes = [];
var numOfVerts = 0;
var index = 0;

// Holds the max number of positions allowed
var maxNumTriangles = 200;
var maxNumPositions = 3 * maxNumTriangles;

// To note if it is the first point being drawn for circle and rectangle
var first = true;

// To keep track of the shape that is selected from the menu
var shapeMenuIndex = 0;

// Keeps track of the first and second point for the circle
var first_point;
var second_point;

// To keep track of the color selected from the menu
var cIndex = 0;

// To keep track of the point size and location of variable in the shader code
var pointLoc;
var pointVal = 10.0;

var colors = [
    vec4(0.0, 0.0, 0.0, 1.0),  // black
    vec4(1.0, 0.0, 0.0, 1.0),  // red
    vec4(1.0, 1.0, 0.0, 1.0),  // yellow
    vec4(0.0, 1.0, 0.0, 1.0),  // green
    vec4(0.0, 0.0, 1.0, 1.0),  // blue
    vec4(1.0, 0.0, 1.0, 1.0),  // magenta
    vec4(0.0, 1.0, 1.0, 1.0)   // cyan
];


window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.5, 0.5, 0.5, 1.0);

    //  Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumPositions, gl.STATIC_DRAW);

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    var cBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 16 * maxNumPositions, gl.STATIC_DRAW);

    var colorLoc = gl.getAttribLocation(program, "aColor");
    gl.vertexAttribPointer(colorLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(colorLoc);

    // To get the location for the point value from the shader code
    pointLoc = gl.getUniformLocation(program, "point");
    // To set the point value to the default value, 10.0.
    gl.uniform1f(pointLoc, pointVal);

    // To clear the screen if the user presses the clear button
    var clear = document.getElementById("ClearButton");
    clear.addEventListener("click", function () {
        index = 0;
        shapes = [];
        t = [];
        tt = [];
        first = true;
    });

    // To select the color and get the color value from the menu
    var m = document.getElementById("ColorMenu");
    m.addEventListener("click", function () {
        cIndex = m.selectedIndex;
    });

    // To get the shape menu index
    var shapeM = document.getElementById("ShapeMenu");
    shapeM.addEventListener("click", function () {
        shapeMenuIndex = shapeM.selectedIndex;
    });

    // Event listener to draw the different shapes
    canvas.addEventListener("mousedown", function (event) {
        // Starting point of the mouse
        var canv_rect = canvas.getBoundingClientRect();
        var mouseX1 = event.clientX - canv_rect.left;
        var mouseY1 = event.clientY - canv_rect.top;
        var mouseX = 2 * mouseX1 / canvas.width - 1;
        var mouseY = 2 * (canvas.height - mouseY1) / canvas.height - 1;

        // Handles the situation to draw the circle
        if (shapeMenuIndex == 7 || shapeMenuIndex == 8) {
            // Add value to shape list
            shapes.push([shapeMenuIndex, index]);
            // Get the first point of the diameter
            if(first) {
                first = false;
                first_point = vec2(mouseX, mouseY);
            }

            else {
                // Get the other point on the diameter
                first = true;
                second_point = vec2(mouseX, mouseY);

                // Calculate the center and radius based on the two points
                var center = vec2((first_point[0]+second_point[0])/2, (first_point[1]+second_point[1])/2);
                var radius = Math.sqrt(Math.pow(first_point[0]-second_point[0], 2)+Math.pow(first_point[1]-second_point[1], 2))/2;

                // Draw the circle based on the two points
                const pi_val = Math.PI / 16;
                let theta_val = 0;
                for (let i = 0; i < 33; i++) {
                    t[i] = vec2(radius * (Math.cos(theta_val)) + center[0], radius * (Math.sin(theta_val)) + center[1]);
                    theta_val = theta_val + pi_val;
                }

                // Update the vertex buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
                for (var i = 0; i <= 32; i++) gl.bufferSubData(gl.ARRAY_BUFFER, 8 * (index + i), flatten(t[i]));
                index += 33;

                // Update the color buffer
                gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
                var tt = vec4(colors[cIndex]);
                for (var i = 0; i <= 32; i++) gl.bufferSubData(gl.ARRAY_BUFFER, 16 * (index - 33 + i), flatten(tt))
            }
        }

        // To draw the rectangle
        else if (shapeMenuIndex == 5 || shapeMenuIndex == 6) {

            if(first) {
                // Add value to shape list
                shapes.push([shapeMenuIndex, index]);
                first = false;

                // Get the first point of the rectangle
                t[0] = vec2(mouseX, mouseY);
            }

            else {
                first = true;
                // Get the other point of the rectangle and draw other two points based on first and second
                t[2] = vec2(mouseX, mouseY);
                t[1] = vec2(t[0][0], t[2][1]);
                t[3] = vec2(t[2][0], t[0][1]);

                // Update the buffers
                gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer)
                for(var i=0; i<4; i++) gl.bufferSubData(gl.ARRAY_BUFFER, 8*(index+i), flatten(t[i]));
                index += 4;

                gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer);
                var tt = vec4(colors[cIndex]);
                for(var i=0; i<4; i++) gl.bufferSubData(gl.ARRAY_BUFFER, 16*(index-4+i), flatten(tt));
            }
        }
        // To handle the other shapes
        else {
            // Add value to shape list
            shapes.push([shapeMenuIndex, index]);

            // Update the buffers
            gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
            var ts = vec2(mouseX, mouseY);
            gl.bufferSubData(gl.ARRAY_BUFFER, 8 * index, flatten(ts));

            gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
            // Updates with color from the menu
            ts = vec4(colors[cIndex]);
            gl.bufferSubData(gl.ARRAY_BUFFER, 16 * index, flatten(ts));
            index++;
        }
    });

    render();
}


function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Iterate through the shapes list and draw the shapes
    for (var i = 0; i < shapes.length; i++) {
        // First get the value for the type of shape
        var shapeVal = shapes[i][0];

        // Get the index of the shape and where it begins in the buffer
        var shapeIndex = shapes[i][1];

        // Loop to calculate the number of vertices for the shape
        var shapeCount = 1;
        for (var j = i + 1; j < shapes.length; j++) {
            if (shapes[j][0] == shapeVal) {
                shapeCount++;
            } else {
                break;
            }
        }

        // To draw points
        if (shapeVal == 0) {
            gl.drawArrays(gl.POINTS, shapeIndex, 1);
        }

        // To draw lines
        if (shapeVal == 1) {
            if (shapeCount > 1) {
                gl.drawArrays(gl.LINES, shapeIndex, 2);
                i++;
            }
        }

        // To draw line strips
        if (shapeVal == 2) {
            if (shapeCount > 1) {
                gl.drawArrays(gl.LINE_STRIP, shapeIndex, shapeCount);
                i+=shapeCount-1;
            }
        }

        // To draw the unfilled polygons
        if (shapeVal == 3) {
            gl.drawArrays(gl.LINE_LOOP, shapeIndex, shapeCount);
            i+=shapeCount-1;
        }

        // To draw the filled polygons
        if (shapeVal == 4) {
            gl.drawArrays(gl.TRIANGLE_FAN, shapeIndex, shapeCount);
            i+=shapeCount-1;
        }

        // To draw the unfilled rectangle
        if (shapeVal == 5) {
            gl.drawArrays(gl.LINE_LOOP, shapeIndex, 4);
        }

        // To draw the filled rectangle
        if (shapeVal == 6) {
            gl.drawArrays(gl.TRIANGLE_FAN, shapeIndex, 4);
        }

        // to draw circle unfilled
        if (shapeVal == 7) {
            gl.drawArrays(gl.LINE_STRIP, shapeIndex, 33);
        }

        // To draw circles filled
        if (shapeVal == 8) {
            gl.drawArrays(gl.TRIANGLE_FAN, shapeIndex, 32);
        }
    }
    requestAnimationFrame(render);
}
