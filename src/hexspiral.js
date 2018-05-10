
var hexspiral = (function () {

    var cubeDirections = [
        {x:+1, y:-1, z:0},
        {x:+1, y:0, z:-1},
        {x:0, y:+1, z:-1},
        {x:-1, y:+1, z:0},
        {x:-1, y:0, z:+1},
        {x:0, y:-1, z:+1}
    ];

    function createCube(x, y, z) {
        return {'x':x, 'y':y, 'z':z};
    }

    function cubeAdd(c1, c2) {
        return {x:c1.x+c2.x, y:c1.y+c2.y, z:c1.z+c2.z};
    }

    function cubeScale(c1, scale) {
        return {x:c1.x*scale, y:c1.y*scale, z:c1.z*scale};
    }

    function cubeDirection(direction) {
        return cubeDirections[direction];
    }

    function cubeNeighbor(cube, direction) {
        return cubeAdd(cube, cubeDirection(direction));
    }

    function cubeRing(center, ringRadius) {
        var results = [];
        var cube = cubeAdd(center, cubeScale(cubeDirection(4), ringRadius));
        for (var i = 0; i < 6; i++) {
            for (var j = 0; j < ringRadius; j++) {
                results.push(cube);
                cube = cubeNeighbor(cube, i);
            }
        }
        return results;
    }

    function cubeSpiral(center, radius) {
        var results = [center];
        for (var k = 1; k <= radius; k++) {
            results = results.concat(cubeRing(center, k));
        }
        return results;
    }

    function cubeToCartesian(cube, hexRadius, xOffset, yOffset) {
        var cy = 3.0/2 * hexRadius * cube.z;
        var cx = Math.sqrt(3) * hexRadius * (parseFloat(cube.z)/2 + cube.x);
        return {'x':cx + xOffset, 'y':cy + yOffset};
    }

    function generateHexCenters(cx, cy, hexRadius, n) {
        var k = Math.ceil((-1 + Math.sqrt(1 - 4 * (1 - n) / 3)) / 2);
        var spiral = cubeSpiral(createCube(0, 0, 0), k);
        var centers = spiral.slice(0, n).map(function(cube) {
            return cubeToCartesian(cube, hexRadius, cx, cy);
        });
        return centers;
    }

    return {
        generateHexCenters: generateHexCenters
    }

})();
