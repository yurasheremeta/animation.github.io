var can = document.getElementById("can");
var ctx = can.getContext("2d");

var gui = new dat.GUI();
var angle = 600, outer_angle = 600, angle2 = 600, angle3 = 400;
var points = [];
var settings = {
    "total particles": 1000,
    "total circles": 3,
    "total circles 2": 3,
    "total circles 3": 6,
    "outer radius": -100 ,
    "inner radius": -100,
    "point 1 delay": -80,
    "point 2 delay": -30,
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
    return offset + Math.sin(angle) * 100 ;
}
function y(offset, angle, r) {
    if (!r) r = settings["inner radius"];
    return offset + Math.cos(angle) * 100 ;
}
function setup() {
    points = [];
    points2 = [];
    points3 = [];
    for (var i = 0; i < settings["total circles"]; ++i) {
        points.push({
            angle: Math.random() *  100 * 2
        });
    }
    for (var i = 0; i < settings["total circles 2"]; ++i) {
        points2.push({
            angle2: Math.random() * 100 * 2
        });
    }
     for (var i = 0; i < settings["total circles 3"]; ++i) {
        points3.push({
            angle3: Math.random() * 10000
        });
    }
}

function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, 700, 700);

    var circles = settings["total circles"];
    var circles2 = settings["total circles 2"];
    var circles3 = settings["total circles 3"];
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
        
       
        ctx.arc(inner_point.x, inner_point.y, 4, 0, Math.PI * 1000);
        // ctx.arc(inner_point1.x, inner_point1.y, 4, 5, Math.PI);

     
        ctx.closePath();
        ctx.fill();
      
    
        var total = settings["total particles"];


        var ang1 = outer_angle + (i + 1) * 2 * Math.PI/ circles;
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
                    x(point.x, points[i] - between * settings['point 1 delay'] ),
                    x(point1.x, points[(i + 1) % circles] - (1 - between) * settings['point 2 delay'] + 100),
                   between
                ),
                y: lerp(
                    y(point.y, points[i] - between * settings['point 1 delay']  ),
                    y(point1.y, points[(i + 1) % circles] - (1 - between) * settings['point 2 delay'] + 100),
                    between
                )
                
                
            };
            ctx.globalAlpha = 0.6;

             if(ang1 > 601){
                ctx.fillStyle= 'rgba(41,121,255,0.6)'
                // ctx.fillStyle='rgba(255,255,255, 0.6)';
            } else {
               // ctx.fillStyle = '#1E1A9F';
                ctx.fillStyle = 'rgba(41,121,255,0.7)'
            }
            
            ctx.arc(temp.x, temp.y, 0.8, 10  , 100000 * 2);
            ctx.closePath();
            ctx.fill();
        }
    }
    for (var i = 0; i < circles2; ++i) {
        if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
            setup();
            settings_copy = Object.assign({}, settings);
        }
        
        var ang2 = outer_angle + i * 100 * Math.PI / circles2;
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
        
       
        ctx.arc(inner_point_1.x, inner_point_1.y, 4, 0, Math.random() * 100);
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
                    x(point2.x, points2[i] - between * settings['point 1 delay']),
                    x(point_diff.x, points2[(i + 1) % circles2] - (1 - between) * settings['point 2 delay']),
                   between
                ),
                y: lerp(
                    y(point2.y, points2[i] - between * settings['point 1 delay']),
                    y(point_diff.y, points2[(i + 1) % circles2] - (1 - between) * settings['point 2 delay']),
                    between
                )
                
                
            };

            
            ctx.globalAlpha = 0.6;
             if(ang1 > 601){
                ctx.fillStyle= '#0B3F95 '
                // ctx.fillOpacity= 0.3;
                // ctx.fillStyle='rgba(255,255,255, 0.6)';
            } else {
               // ctx.fillStyle = '#1E1A9F';
                ctx.fillStyle = '#0B3F95 '
            }
            
            ctx.arc(temp.x, temp.y, 0.8, -3, Math.random() * 100);
            ctx.closePath();
            ctx.fill();
        }
    }
     for (var i = 0; i < circles3; ++i) {
        if (JSON.stringify(settings_copy) != JSON.stringify(settings)) {
            setup();
            settings_copy = Object.assign({}, settings);
        }
        
        var ang3 = outer_angle + i * 10 *Math.PI / circles3;
        var point3 = {
            x: x(center.x, ang3, Math.random()),
            y: y(center.y, ang3, Math.random()),
        };
       
        var inner_point_2 = {
            x: x(point3.x, points3[i].angle3),
            y: y(point3.y, points3[i].angle3)
        }

      
     
        
        ctx.beginPath();
        ctx.fillStyle = 'white'//"#4F3BE5";
        
       
        ctx.arc(inner_point_2.x, inner_point_2.y, 4, 0, Math.random() * 1000);
        // ctx.arc(inner_point1.x, inner_point1.y, 4, 5, Math.PI);

     
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'red'//"#4F3BE5";
        
       
        // ctx.arc(inner_point_3.x, inner_point_2.y, 4, 0,Math.random() * 100);
        // ctx.arc(inner_point1.x, inner_point1.y, 4, 5, Math.PI);

     
        ctx.closePath();
        ctx.fill();
      
    
        var total3 = settings["total particles"];


        var ang_diff_3 = outer_angle + (i + 1) * 2 * Math.PI / circles3;
        
        var point_diff_3 = {
            x: x(center.x, ang_diff_3, settings["outer radius"]),
            y: y(center.y, ang_diff_3, settings["outer radius"]),
        };


        for (var j = 0; j < total3; ++j) {
            ctx.beginPath();
            // console.log('j',j);
            
            var between = j / 2000 ;

            var temp = {
                x: lerp(
                    x(point3.x, points3[i].angle3 - between * settings['point 1 delay']),
                    x(point_diff_3.x, points3[(i + 1) % circles3].angle3 - (1 - between) * settings['point 2 delay']),
                   between
                ),
                y: lerp(
                    y(point3.y, points3[i].angle3 - between * settings['point 1 delay']),
                    y(point_diff_3.y, points3[(i + 1) % circles3].angle3 - (1 - between) * settings['point 2 delay']),
                    between
                )
                
                
            };
            ctx.globalAlpha = 0.7;

            // console.log('temp', temp);
            // if( temp.x < 290 && tempmp.y < 300) {
                console.log('ctx', ctx);
                
                ctx.fillStyle= '#0B3F95'
            // } else {
            //     ctx.fillStyle= 'red'
            // }
            
         
            
                
                // ctx.fillStyle='rgba(255,255,255, 0.6)';
            
            
            ctx.arc(temp.x, temp.y, 1, -30, 100 * 100);
            ctx.closePath();
            ctx.fill();
        }
    }




    for (var i = 0; i < circles; ++i) {
        points[i].angle += Math.random() / 100   ;
    }
    for (var i = 0; i < circles2; ++i) {
        points2[i].angle2 += Math.random() / 10;
    }
    for (var i = 0; i < circles3; ++i) {
        points3[i].angle3 += Math.random()/ 100  ;
    }
    outer_angle += -0.09;
    // console.log('ange', outer_angle);
    
    requestAnimationFrame(draw);
}
window.onresize = resize;
resize();
draw();

