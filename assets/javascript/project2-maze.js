


/*
    * Name: Xavier Beltran
    * Course: CSC350
    * Project 2: Maze
 */

"use strict";

var gl;
var points;

// Change variable if the number of positions will be higher
// Buffer overflow was encountered so this was the solution
var maxNumPositions = 1000;

// Variable to hold values of maze, path, and if the circle reached the end
var total_maze_vertices = 0;
var cirEnd = false;
var total_path_points = 0;

// Constants that will be used throughout the code
const cell_iter = 1 / 6;
const pi_val = Math.PI / 16;
const line_val = 2;
const circle_val = 33;

/**** Change below variables to play with different mazes ****/

// Variable to represent circle start point
var circleX = -11/12;
var circleY = 5/12;

// Variable to represent circle end point
var circleXEnd = 11/12;
var circleYEnd = -7/12;

// Variable to represent the maze
var maze_val = [
    "95153D551553",
    "ABABC395697A",
    "86AC542A9296",
    "69293D686C6B",
    "96EAC53C3D52",
    "855457C3C53A",
    "A953955697C2",
    "AABAAD116956",
    "AAAAC3AA96D3",
    "AC2C3AEAAD10",
    "ABABEC3AC56A",
    "C6C4556C5556"
];

// Maze that I created
// Note that the cells are not encoded correctly,
// so there are points where the circle can go through walls
// Uncomment the code and comment above maze to try it out

// // Variable to represent circle start point
// var circleX = 9/12;
// var circleY = 11/12;

// // Variable to represent circle end point
// var circleXEnd = 5/12;
// var circleYEnd = -11/12;

// // Variable to represent the maze
// var maze_val = [
//     "B11F115111C3",
//     "8611C1D11C3A",
//     "E16216162146",
//     "861469686C6B",
//     "9642C43C3D52",
//     "805457C3C53A",
//     "A043955627C2",
//     "AABAAD11C156",
//     "821AC3FA9603",
//     "AC2C38EAA002",
//     "AFAB0243AC56A",
//     "C6C4556C0556"
// ];


window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    gl = canvas.getContext('webgl2');
    if (!gl) { alert( "WebGL 2.0 isn't available" ); }

    var vertices = [

    ];

    var colors = [

    ];

    // Variable to hold path that circle traverses through
    var path_vertices = [
        vec2(circleX, circleY),
    ];

    // Function to convert hex value to binary value
    function hexToBin(hex) {
        return (parseInt(hex, 16).toString(2)).padStart(4, '0');
    }

    // Function to check if the move is valid`
    function isValidMove(cirX, cirY, dir) {
        // Get the binary value of the cell the circle is in
        var cellBinVal = hexToBin(maze_val[Math.floor((1 - cirY) * 6)][Math.floor((cirX + 1) * 6)])
        // If the user is trying to move left
        if (dir == 0) {
            // Check if the move will allow the circle to reach the end of the maze
            if ((cirX - cell_iter).toFixed(5) == circleXEnd.toFixed(5) && cirY.toFixed(5) == circleYEnd.toFixed(5)) {
                path_vertices.push(vec2(cirX - cell_iter * 2, cirY));
                cirEnd = true;
                return true;
            }
            // Check if the move will allow the circle to go out of bounds
            if (cirX - cell_iter < -1) {
                return false;
            }
            // Check if the move will allow the circle to go through a wall
            if (cellBinVal[0] == 1) {
                return false;
            }
        }
        // If the user is trying to move down
        if (dir == 1) {
            // Check if the move will allow the circle to reach the end of the maze
            if ((cirY - cell_iter).toFixed(5) == circleYEnd.toFixed(5) && cirX.toFixed(5) == circleXEnd.toFixed(5)) {
                path_vertices.push(vec2(cirX, cirY - cell_iter * 2));
                cirEnd = true;
                return true;
            }
            // Check if the move will allow the circle to go out of bounds
            if (cirY - cell_iter < -1) {
                return false;
            }
            // Check if the move will allow the circle to go through a wall
            if (cellBinVal[1] == 1) {
                return false;
            }
        }
        // If the user is trying to move right
        if (dir == 2) {
            // Check if the move will allow the circle to reach the end of the maze
            if ((cirX + cell_iter).toFixed(5) == circleXEnd.toFixed(5) && cirY.toFixed(5) == circleYEnd.toFixed(5)) {
                path_vertices.push(vec2(cirX + cell_iter * 2, cirY));
                cirEnd = true;
                return true;
            }
            // Check if the move will allow the circle to go out of bounds
            if (cirX + cell_iter > 1) {
                return false;
            }
            // Check if the move will allow the circle to go through a wall
            if (cellBinVal[2] == 1) {
                return false;
            }
        }
        // If the user is trying to move up
        if (dir == 3) {
            // Check if the move will allow the circle to reach the end of the maze
            if ((cirY + cell_iter).toFixed(5) == circleYEnd.toFixed(5) && cirX.toFixed(5) == circleXEnd.toFixed(5)) {
                path_vertices.push(vec2(cirX, cirY + cell_iter * 2));
                cirEnd = true;
                return true;
            }
            // Check if the move will allow the circle to go out of bounds
            if (cirY + cell_iter > 1) {
                return false;
            }
            // Check if the move will allow the circle to go through a wall
            if (cellBinVal[3] == 1) {
                return false;
            }
        }
        // If the function makes it to the end, then it is a valid move
        return true;
    }

    // Function to draw maze based on the variable maze_val
    function drawMaze() {
        let y = 1;
        // For each row in the maze values
        for (let i = 0; i < maze_val.length; i++) {
            let x = -1;
            // For each value in the row
            for (let j = 0; j < maze_val[i].length; j++) {
                // Convert the hex value to binary
                let bin_val = hexToBin(maze_val[i][j]);
                // To draw the left wall
                if (bin_val[0] == 1) {
                    vertices.push(vec2(x, y));
                    colors.push(vec3(0, 0, 0));
                    vertices.push(vec2(x, y - cell_iter));
                    colors.push(vec3(0, 0, 0));
                    total_maze_vertices++;
                }
                // To draw the bottom wall
                if (bin_val[1] == 1) {
                    vertices.push(vec2(x, y - cell_iter));
                    colors.push(vec3(0, 0, 0));
                    vertices.push(vec2(x + cell_iter, y - cell_iter));
                    colors.push(vec3(0, 0, 0));
                    total_maze_vertices++;
                }
                // To draw the right wall
                if (bin_val[2] == 1) {
                    vertices.push(vec2(x + cell_iter, y));
                    colors.push(vec3(0, 0, 0));
                    vertices.push(vec2(x + cell_iter, y - cell_iter));
                    colors.push(vec3(0, 0, 0));
                    total_maze_vertices++;
                }
                // To draw the top wall
                if (bin_val[3] == 1) {
                    vertices.push(vec2(x, y));
                    colors.push(vec3(0, 0, 0));
                    vertices.push(vec2(x + cell_iter, y));
                    colors.push(vec3(0, 0, 0));
                    total_maze_vertices++;
                }
                // Iterator to move to the next square
                x += cell_iter;
            }
            // Iterator to move to the next row
            y -= cell_iter;
        }
    }

    // Function to draw the circle at a center point, cirX and cirY with a radius of 1/20
    function drawCircle(cirX, cirY, radius=1/20) {
        let theta_val = 0;
        for (let i = 0; i < circle_val; i++) {
            vertices.push(vec2(radius * (Math.cos(theta_val)) + cirX, radius * (Math.sin(theta_val)) + cirY));
            colors.push(vec3(1, 0, 0));
            theta_val = theta_val + pi_val;
        }
    }

    // Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    // Load shaders and initialize attribute buffers
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    this.console.log("message");

    // Load the data into the GPU
    // Note that the buffer is created based on maxNumPositions rather than flatten(colors)
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, 16 * maxNumPositions, gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    // Load the data into the GPU
    // Note that the buffer is created based on maxNumPositions rather than flatten(vertices)
    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, 8 * maxNumPositions, gl.STATIC_DRAW);

    // Associate out shader variables with our data buffer
    var vPosition = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    // Initial draw of maze and circle
    drawMaze();
    drawCircle(circleX, circleY);

    // Need to update buffer data to draw the initial circle position and the maze
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

    gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));

    // Event listener for key presses
    window.onkeydown = function (event) {
        // If the circle reached the end point, then the event should not be handled
        if (cirEnd) {
            return;
        }
        switch (event.key) {
            // If the user presses a given key, then check if the move is valid and update the circle position
            // Add the new circle position to the path_vertices array
            case "ArrowRight":
                if (isValidMove(circleX, circleY, 2)) {
                    circleX += cell_iter;
                    path_vertices.push(vec2(circleX, circleY));
                }
                break;
            case "ArrowLeft":
                if (isValidMove(circleX, circleY, 0)) {
                    circleX -= cell_iter;
                    path_vertices.push(vec2(circleX, circleY));
                }
                break;
            case "ArrowUp":
                if (isValidMove(circleX, circleY, 3)) {
                    circleY += cell_iter;
                    path_vertices.push(vec2(circleX, circleY));
                }
                break;
            case "ArrowDown":
                if (isValidMove(circleX, circleY, 1)) {
                    circleY -= cell_iter;
                    path_vertices.push(vec2(circleX, circleY));
                }
                break;
        }

        // Reset all of the initial values
        total_maze_vertices = 0;
        total_path_points = path_vertices.length;
        vertices = [];
        colors = [];

        // Draw the maze
        drawMaze();

        // If the circle is at the end, draw it at the origin
        if (cirEnd) {
            drawCircle(0, 0);
        }
        // Otherwise draw it at the new position
        else {
            drawCircle(circleX, circleY);
        }

        // Add the path vertices to the vertices and colors array
        for (let i = 0; i < total_path_points; i++) {
            vertices.push(path_vertices[i]);
            colors.push(vec3(1, 0, 0));
        }

        // Update the buffer data for both vertices and colors with maze, circle, and path
        gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(vertices));

        gl.bindBuffer(gl.ARRAY_BUFFER, cBuffer);
        gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(colors));
    }

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw the lines for each wall of the maze
    let buffer_val = -2;
    for (let i = 0; i < total_maze_vertices; i++) {
        gl.drawArrays(gl.LINE_STRIP, buffer_val+=line_val, line_val);
    }
    // Draw the circle
    gl.drawArrays(gl.TRIANGLE_FAN, buffer_val+=line_val, circle_val);

    // Draw the path that the circle traverses through if there is more than one point
    if (total_path_points > 1) {
        gl.drawArrays(gl.LINE_STRIP, buffer_val+=circle_val, total_path_points);
    }

    requestAnimationFrame(render);
}
