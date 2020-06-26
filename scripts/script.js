var can = document.getElementById("can");
var ctx = can.getContext("2d");

var gui = new dat.GUI();
var angle = 600, outer_angle = 600;
var points = [];
var settings = {
    "total particles": 1000,
    "total circles": 9,
    "outer radius": 150 ,
    "inner radius": 150,
    "point 1 delay": -80,
    "point 2 delay": -60,
};
var settings_copy = {};
function resize() {
    can.width = 700;
    can.height = 700;
}
function lerp(a, b, t) {
    return (1 - t) * a + t * b;
}

function x(offset, angle, r) {
    if (!r) r = settings["inner radius"];
    return offset + Math.sin(angle) * r;
}
function y(offset, angle, r) {
    if (!r) r = settings["inner radius"];
    return offset + Math.cos(angle) * r;
}
function setup() {
    points = [];
    for (var i = 0; i < settings["total circles"]; ++i) {
        points.push({
            angle: Math.random() * Math.PI * 2
        });
    }
}
function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 700, 700);

    var circles = settings["total circles"];
    var center = {
        x: can.width / 2,
        y: can.height / 2
    };

    for (var i = 0; i < circles; ++i) {
        if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
            setup();
            settings_copy = Object.assign({}, settings);
        }
        
        var ang = outer_angle + i * 10 * Math.PI / circles;
        var point = {
            x: x(center.x, ang, settings["outer radius"]),
            y: y(center.y, ang, settings["outer radius"]),
        };
        var inner_point = {
            x: x(point.x, points[i].angle),
            y: y(point.y, points[i].angle)
        }
        
        ctx.beginPath();
        ctx.fillStyle = 'white'//"#4F3BE5";
        
       
        ctx.arc(inner_point.x, inner_point.y, 5, 0, Math.PI * 100);
        ctx.closePath();
        ctx.fill();

        var total = settings["total particles"];


        var ang1 = outer_angle + (i + 1) * 2 * Math.PI / circles;
        // console.log(ang1);
        
        var point1 = {
            x: x(center.x, ang1, settings["outer radius"]),
            y: y(center.y, ang1, settings["outer radius"]),
        };


        for (var j = 0; j < total; ++j) {
            ctx.beginPath();
            var between = j / total;
            // console.log('betwe', between);
            // console.log('j',j);
            // console.log('total', total);
            var temp = {
                x: lerp(
                    x(point.x, points[i].angle - between * settings['point 1 delay']),
                    x(point1.x, points[(i + 1) % circles].angle - (1 - between) * settings['point 2 delay']),
                   between
                ),
                y: lerp(
                    y(point.y, points[i].angle - between * settings['point 1 delay']),
                    y(point1.y, points[(i + 1) % circles].angle - (1 - between) * settings['point 2 delay']),
                    between
                )
                
                
            };
           
             if(ang1 > 601){
                ctx.fillStyle= 'rgba(30,26,159, 0.6)'
                // ctx.fillStyle='rgba(255,255,255, 0.6)';
            } else {
               // ctx.fillStyle = '#1E1A9F';
                ctx.fillStyle = 'rgba(30,26,159, 1)'
            }
            
            ctx.arc(temp.x, temp.y, 0.8, -3, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }


    for (var i = 0; i < circles; ++i) {
        points[i].angle += Math.PI / 500;
    }
    outer_angle += -Math.PI / 50;
    // console.log('ange', outer_angle);
    
    requestAnimationFrame(draw);
}
window.onresize = resize;
resize();

draw();
