
var can = document.getElementById("can");
var ctx = can.getContext("2d");

var gui = new dat.GUI();
var angle = 600, outer_angle = 600, angle2 = 600;
var points = [];
var settings = {
    "total particles": 1000,
    "total circles": 6,
    "total circles 2": 4,
    "outer radius": 100 ,
    "inner radius": 100,
    "point 1 delay": -100,
    "point 2 delay": -80,
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
    points2 = [];
    for (var i = 0; i < settings["total circles"]; ++i) {
        points.push({
            angle: Math.random() * Math.PI * 2
        });
    }
    for (var i = 0; i < settings["total circles 2"]; ++i) {
        points2.push({
            angle2: Math.random() * Math.PI * 2
        });
    }
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 700, 700);

    var circles = settings["total circles"];
    var circles2 = settings["total circles 2"];
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
        ctx.fillStyle = '#2979FF '//"#4F3BE5";
        
       
        ctx.arc(inner_point.x, inner_point.y, 4, 0, Math.PI * 100);
        // ctx.arc(inner_point1.x, inner_point1.y, 4, 5, Math.PI);

     
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
            var between = j / 3000 ;

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
                ctx.fillStyle= 'rgba(41,121,255,0.6)'
                // ctx.fillStyle='rgba(255,255,255, 0.6)';
            } else {
               // ctx.fillStyle = '#1E1A9F';
                ctx.fillStyle = 'rgba(41,121,255,0.7)'
            }
            
            ctx.arc(temp.x, temp.y, 0.8, -3, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    for (var i = 0; i < circles2; ++i) {
        if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
            setup();
            settings_copy = Object.assign({}, settings);
        }
        
        var ang2 = outer_angle + i * 10 * Math.PI / circles2;
        var point2 = {
            x: x(center.x, ang2, settings["outer radius"]),
            y: y(center.y, ang2, settings["outer radius"]),
        };
       
        var inner_point_1 = {
            x: x(point2.x, points2[i].angle2),
            y: y(point2.y, points2[i].angle2)
        }
     
        
        ctx.beginPath();
        ctx.fillStyle = '#0B3F95  '//"#4F3BE5";
        
       
        ctx.arc(inner_point_1.x, inner_point_1.y, 4, 0, Math.PI * 100);
        // ctx.arc(inner_point1.x, inner_point1.y, 4, 5, Math.PI);

     
        ctx.closePath();
        ctx.fill();
      
    
        var total2 = settings["total particles"];


        var ang_diff = outer_angle + (i + 1) * 2 * Math.PI / circles2;
        // console.log(ang1);
        
        var point_diff = {
            x: x(center.x, ang_diff, settings["outer radius"]),
            y: y(center.y, ang_diff, settings["outer radius"]),
        };


        for (var j = 0; j < total2; ++j) {
            ctx.beginPath();
            var between = j / 3000 ;

            var temp = {
                x: lerp(
                    x(point2.x, points2[i].angle2 - between * settings['point 1 delay']),
                    x(point_diff.x, points2[(i + 1) % circles2].angle2 - (1 - between) * settings['point 2 delay']),
                   between
                ),
                y: lerp(
                    y(point2.y, points2[i].angle2 - between * settings['point 1 delay']),
                    y(point_diff.y, points2[(i + 1) % circles2].angle2 - (1 - between) * settings['point 2 delay']),
                    between
                )
                
                
            };
           
             if(ang1 > 601){
                ctx.fillStyle= '#0B3F95 '
                // ctx.fillStyle='rgba(255,255,255, 0.6)';
            } else {
               // ctx.fillStyle = '#1E1A9F';
                ctx.fillStyle = '#0B3F95 '
            }
            
            ctx.arc(temp.x, temp.y, 0.8, -3, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }


    for (var i = 0; i < circles; ++i) {
        points[i].angle += Math.PI / 1000;
    }
    for (var i = 0; i < circles2; ++i) {
        points2[i].angle2 += Math.PI / 1000;
    }
    outer_angle += -Math.PI / 50;
    // console.log('ange', outer_angle);
    
    requestAnimationFrame(draw);
}
window.onresize = resize;
resize();
// dgui();
draw();
