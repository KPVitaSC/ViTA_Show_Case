function vita_circles(objectDiv){
    /**
    * Generar HTML 
    */

    //LEYENDA
    objectDiv.append("<p id='L'>Legend</p>");
    objectDiv.append("<div id='legend'></div>");
    $('#legend').append("<div id='type_difficulty'></div>");
    $('#type_difficulty').append("<div>Difficulty Levels</div>");
    $('#type_difficulty').append("<div class='text'>Very easy</div>");
    $('#type_difficulty').append("<div id='color_diff'></div>");
    $('#type_difficulty').append("<div class='text'>Very difficult</div>");
    $('#legend').append("<div id='type_skill'></div>");
    $('#type_skill').append("<div>Skill Levels</div>");
    $('#type_skill').append("<div class='text'>Novice</div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_1'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_2'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_3'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_4'></div>");
    $('#type_skill').append("<div class='valor_skill' id='skill_5'></div>");
    $('#type_skill').append("<div class='text'>Expert</div>");
    //VISUALIZACIÓN
    objectDiv.append("<div id='mainBubble'></div>")
    //INFORMACIÓN
    objectDiv.append("<h5 class='info' id='info'></h5>");
    objectDiv.append("<div id='information'></div>");
    $('#information').append("<div id='info_gen'></div>");
    $('#info_gen').append("<p class='info' id='unit'></p>");
    $('#info_gen').append("<p class='info' id='topic'></p>");
    $('#info_gen').append("<p class='info' id='actives'></p>");
    $('#info_gen').append("<p class='info' id='countL'></p>");
    $('#info_gen').append("</br>");
    $('#info_gen').append("<p class='info' id='contributions'></p>");
    $('#info_gen').append("<p class='info' id='contributor'></p>");
    $('#info_gen').append("<p class='info' id='url'></p>");
    $('#info_gen').append("<p class='info' id='keywords'></p>");
    $('#information').append("<div id='info_me'></div>");
    $('#info_me').append("<div class='info' id='vis_me'></div>");
    $('#info_me').append("<p class='info' id='difficulty'></p><select  id='difficultySelect'><option value='0'>Unknown<option value='1'>Very easy<option value='2'>Easy<option value='3'>Medium difficulty<option value='4'>Difficult<option value='5'>Very difficult</select>");
    $('#info_me').append("<p class='info' id='skill'></p><select id='skillSelect'><option value='0'>Unknown<option value='1'>Novice<option value='2'>Beginner<option value='3'>Intermediate<option value='4'>Advanced<option value='5'>Expert</select>");
    $('#information').append("<div id='info_group'></div>");
    $('#info_group').append("<div class='info' id='vis_group'></div>");
    $('#info_group').append("<p class='info' id='difficultyG'></p>");
    $('#info_group').append("<p class='info' id='studentD'></p>");
    $('#info_group').append("<p class='info' id='skillG'></p>");
    $('#info_group').append("<p class='info' id='studentS'></p>");


    $('#difficultySelect').hide();
    $('#skillSelect').hide();

    /**
    * Para ocultar y mostrar leyenda
    */
    $('#legend').hide();
    $('#L').on('click', function(){
        $('#legend').slideToggle(400);
    });

    /**
    * Visualización
    */    
    var w = window.innerWidth - 30;//width
    console.log("width " + w);
    var h = Math.ceil(w);//height
    console.log("height " + h);
    var oR = 0;
    var nUnits = 0;
    var nTopics = 0;

    var svgContainer = d3.select("#mainBubble")
    .style("height", h+"px");

    var svg = d3.select("#mainBubble").append("svg")
    .attr("class", "mainBubbleSVG")
    .attr("width", w)
    .attr("height", h)
    .on("dblclick", function(){ return resetBubbles(); });

    d3.json("u001_c1.json", function(datos){
        //$("#course").text(datos["course"].name); //nombre del curso
        nUnits = datos["course"].units.length; //cantidad de unidades del curso
        nTopics = datos["learnerState"].topics.length; //cantidad de topicos del curso

        oR = w/(1+4*nUnits);
        h = Math.ceil(w/nUnits*2) - 150;
        svgContainer.style("height",h+"px");
        console.log("height " + h);

        var unitObj = svg.selectAll(".unitBubble")
        .data(datos["course"].units)
        .enter().append("g");

        var spaceU = 0;
        unitObj.append("circle")
        .attr("class", "unitBubble")
        .attr("id", function(d,i){ return "unitBubble" + i; })
        .attr("r", function(d){ return oR; })
        .attr("cx", function(d,i){ 
            for(var j = 1; j <= nUnits; j++){
                if(d.id == j){
                    if(j == 1){
                        spaceU = 0;
                    }
                    else{
                        spaceU = spaceU + oR;
                    }
                }
            }
            return ((oR*(3*(1+i)-1))) + spaceU; 
        })
        .attr("cy", (h+oR)/3)
        .style("stroke","#666")
        .style("stroke-width", "1px")
        .style("fill", function(d,i){
            var myTopics = d.topics.length;
            var promDiff = 0;
            var promSkill = 0;
            for (var i = 0; i < myTopics; i++){
                for(var j = 0; j < nTopics; j++){
                    if(d.topics[i].id === datos["learnerState"].topics[j].topicId){
                        promDiff = promDiff + parseInt(datos["learnerState"].topics[j].difficultyLevel);
                        promSkill = promSkill + parseInt(datos["learnerState"].topics[j].skillLevel);
                    }
                }
            }
            promDiff = promDiff/myTopics;
            promSkill = promSkill/myTopics;

            if(promDiff > 0 && promDiff <= 1.5){
                return "#1a9641";
            }
            if(promDiff > 1.5 && promDiff <=2.5) {
                return "#a6d96a";
            }
            if(promDiff > 2.5 && promDiff <=3.5) {
                return "#ffffbf";
            }
            if(promDiff > 3.5 && promDiff <=4.5) {
                return "#fdae61";
            }
            if(promDiff > 4.5) {
                return "#d7191c";
            }

        })
        .on("click", function(d,i){
            return activateBubble(d,i);
        });

        unitObj.append("text")
        .attr("class", "unitBubbleText")
        .attr("x", function(d,i){
            for(var j = 1; j <= nUnits; j++){
                if(d.id == j){
                    if(j == 1){
                        spaceU = 0;
                    }
                    else{
                        spaceU = spaceU + oR;
                    }
                }
            }
            return oR*(3*(1+i)-1) + spaceU; 
        })
        .attr("y", (h+oR)/3)
        .style("fill", "#000")
        .attr("font-size", "0.875rem")
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("alignment-baseline", "middle")
        //.attr("textLength", oR+oR/2)
        .text(function(d){ return d.name })   
        .on("click", function(d,i){ 
            return activateBubble(d,i);
        });

        var spaceT = 0;

        for(var iB = 0; iB < nUnits; iB++){

            topicObj = svg.selectAll(".topicBubble" + iB)
            .data(datos["course"].units[iB].topics)
            .enter().append("g");

            topicObj.append("circle")
            .attr("class", "topicBubble" + iB)
            .attr("id", function(d,i) {return "topicBubble_" + iB + "sub_" + i;})
            .attr("r",  function(d) {return (oR/3.0);})
            .attr("cx", function(d,i) {return (oR*(3*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926)) + spaceT;})
            .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
            .attr("cursor","pointer")
            .style("stroke","#666")
            .style("stroke-width", function(d){
                var valor = "";
                for(var j = 0; j < nTopics; j++){
                    if(d.id === datos["learnerState"].topics[j].topicId){
                        if (datos["learnerState"].topics[j].skillLevel == 0) {
                            valor = "0px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 1) {
                            valor = "1px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 2) {
                            valor = "4px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 3) {
                            valor = "7px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 4) {
                            valor = "10px";
                        }
                        if (datos["learnerState"].topics[j].skillLevel == 5) {
                            valor = "13px";
                        }
                    }
                }
                return valor;
            })
            .style("fill", function(d){
                var color = "";
                for(var j = 0; j < nTopics; j++){
                    if(d.id === datos["learnerState"].topics[j].topicId){
                        if (datos["learnerState"].topics[j].difficultyLevel == 0) {
                            color = "#CCCCCC";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 1) {
                            color = "#1a9641";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 2) {
                            color = "#a6d96a";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 3) {
                            color = "#ffffbf";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 4) {
                            color = "#fdae61";
                        }
                        if (datos["learnerState"].topics[j].difficultyLevel == 5) {
                            color = "#d7191c";
                        }
                    }
                }
                return color;
            })
            .on("click", function(d){
                svg.selectAll("circle").style("fill-opacity","0.3").style("stroke-opacity","0.3");
                $(this).css("fill-opacity","1");
                $(this).css("stroke-opacity","1");

                $("#info").text("Información");
                $("#topic").text(d.name);
                $("#actives").text("Actives students: "+datos["groupState"].activeLearners.length);
                $("#countL").text("Total students: "+datos["groupState"].learnersCount);
                for(var j = 0; j < nTopics; j++){
                    if(d.id === datos["learnerState"].topics[j].topicId){
                        $("#contributions").text("");
                        $("#contributor").text("");
                        $("#url").text("");
                        $("#keywords").text("");
                        for(var k = 0; k < datos["contributions"].length; k++){
                            if(datos["learnerState"].topics[j].topicId === datos["contributions"][k].topicId){
                                $("#contributions").text("Contributions:");
                                $("#contributor").text("Contributor: "+ datos["contributions"][k].contributorId);
                                $("#url").text("URL: "+ datos["contributions"][k].url);
                                $("#keywords").text("Keywords: "+ datos["contributions"][k].keywords);
                            }
                        }
                        //me
                        var colorMe = $(this).css("fill");
                        var valorMe = $(this).css("stroke-width");
                        var stylesMe = { fill: colorMe, strokeWidth: valorMe};
                        $("#vis_me").append("<svg><circle cx='50%' cy='25%' r='30' stroke='#666'/></svg>").css(stylesMe);
                        $("#difficulty").text("My difficulty level:")
                        $("#difficultySelect").val(datos["learnerState"].topics[j].difficultyLevel);
                        $("#difficultySelect").show();
                        $("#skill").text("My skill level: ");
                        $("#skillSelect").val(datos["learnerState"].topics[j].skillLevel);
                        $("#skillSelect").show();
                        //group
                        //Expertiz grupo
                        var valorG = "";
                        var sG = "";
                        if (datos["groupState"].topicLevels[j].skillLevel == 0) {
                            valorG = "0px";
                            sG = "Unknown";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 1) {
                            valorG = "1px";
                            sG = "Novice";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 2) {
                            valorG = "4px";
                            sG = "Beginner";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 3) {
                            valorG = "7px";
                            sG = "Intermediate";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 4) {
                            valorG = "10px";
                            sG = "Advanced";
                        }
                        if (datos["groupState"].topicLevels[j].skillLevel == 5) {
                            valorG = "13px";
                            sG = "Expert";
                        }
                        //Dificultad grupo
                        var colorG = "";
                        var dG = "";
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 0) {
                            colorG = "#CCCCCC";
                            dG = "Unknown";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 1) {
                            colorG = "#1a9641";
                            dG = "Very easy";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 2) {
                            colorG = "#a6d96a";
                            dG = "Easy";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 3) {
                            colorG = "#ffffbf";
                            dG = "Medium difficulty";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 4) {
                            colorG = "#fdae61";
                            dG = "Difficult";
                        }
                        if (datos["groupState"].topicLevels[j].difficultyLevel == 5) {
                            colorG = "#d7191c";
                            dG = "Very difficult";
                        }
                        var stylesG = { fill: colorG, strokeWidth: valorG};

                        $("#vis_group").append("<svg><circle cx='50%' cy='25%' r='30' stroke='#666'/></svg>").css(stylesG);
                        $("#difficultyG").text("Group difficulty level: "+ dG);
                        $("#studentD").text("Total students: "+datos["groupState"].topicLevels[j].difficultyLevelLCount);
                        $("#skillG").text("Group skill level: "+ sG);
                        $("#studentS").text("Total students: "+datos["groupState"].topicLevels[j].skillLevelLCount);
                    }
                }
            })
            .append("svg:title");

            topicObj.append("text")
            .attr("class", "topicBubbleText" + iB)
            .attr("x", function(d,i){return (oR*(3*(iB+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
            .attr("y", function(d,i){return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
            .attr("text-anchor", "middle")
            .style("fill", "black")
            .attr("font-size", 6)
            .attr("cursor","pointer")
            .attr("dominant-baseline", "middle")
            .attr("alignment-baseline", "middle")
            .style("text-shadow","2px 2px 2px white")
            .style("visibility","hidden")
            .on("click", function(d){
                $("#info").text("Información");
                $("#topic").text(d.name);
                $("#actives").text("Actives students: "+datos["groupState"].activeLearners.length);
                $("#countL").text("Total students: "+datos["groupState"].learnersCount);
            })
            .text(function(d){return d.name});

            spaceT = spaceT + oR;

        }
    });

    resetBubbles = function (){
        $(".info").text("");
        $('#difficultySelect').hide();
        $('#skillSelect').hide();
        svg.selectAll("circle").style("fill-opacity","1").style("stroke-opacity","1");

        w = window.innerWidth - 30;
        oR = w/(1+4*nUnits);

        h = Math.ceil(w/nUnits*2) - 150;
        svgContainer.style("height", h+"px");
           
        svg.attr("width", w);
        svg.attr("height", h);       
       
        var t = svg.transition()
            .duration(650);
        
        var spaceU = 0;
        t.selectAll(".unitBubble")
            .style("visibility","visible")
            .attr("r", function(d) { return oR; })
            .attr("cx", function(d, i) {
                for(var j = 1; j <= nUnits; j++){
                    if(d.id == j){
                        if(j == 1){
                            spaceU = 0;
                        }
                        else{
                            spaceU = spaceU + oR;
                        }
                    }
                }
                return oR*(3*(1+i)-1) + spaceU; 
            })
            .attr("cy", (h+oR)/3);
 
        t.selectAll(".unitBubbleText")
            .style("visibility","visible")
            .attr("font-size", "0.875rem")
            .attr("x", function(d, i) {
                for(var j = 1; j <= nUnits; j++){
                    if(d.id == j){
                        if(j == 1){
                            spaceU = 0;
                        }
                        else{
                            spaceU = spaceU + oR;
                        }
                    }
                }
                return oR*(3*(1+i)-1) + spaceU; 
            })
            .attr("y", (h+oR)/3);

     var spaceT = 0;
      for(var k = 0; k < nUnits; k++){
        t.selectAll(".topicBubbleText" + k)
            .attr("x", function(d,i) { return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926));})
            .attr("y", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));})
            .attr("font-size", 6)
            .style("visibility","hidden")
            .style("opacity",1);
            
        t.selectAll(".topicBubble" + k)
            .attr("r",  function(d) {return oR/3.0;})
            .style("opacity", 1)
            .style("visibility","visible")
            .attr("cx", function(d,i) {return (oR*(3*(k+1)-1) + oR*1.5*Math.cos((i-1)*45/180*3.1415926))+spaceT;})
            .attr("cy", function(d,i) {return ((h+oR)/3 +        oR*1.5*Math.sin((i-1)*45/180*3.1415926));});         
        
            spaceT = spaceT + oR;
        }   
    }

    function activateBubble(d,i){
        $("#unit").text(d.name);
        $("#info").text("Información");

        var t = svg.transition()
            .duration(d3.event.altKey ? 7500 : 350);
        
        var right = 1;

        t.selectAll(".unitBubble")
            .attr("cx", function(d,ii){
                if(i == ii) {
                    if(ii == 0){right = 1.5} 
                    return oR*(3*(1+ii)-1)*right - 0.6*oR*(ii-1);
                }
                else {
                    if(ii < i){
                        return oR*0.6*(3*(1+ii)-1);
                    } else {
                        return oR*(nUnits*3+1) - oR*0.6*(3*(nUnits-ii)-1);
                    }
                }              
            })
            .attr("cy", (h+oR)/2.3)
            .attr("r", function(d, ii) { 
                if(i == ii)
                    return oR*1.4;
                else
                    return oR*0.8;
            })
            .style("fill-opacity",function(d, ii) { 
                if(i == ii)
                    return "1";
                else
                    return "0.3";
            });

                    
        t.selectAll(".unitBubbleText")
            .attr("x", function(d,ii){
                if(i == ii) {
                    if(ii == 0){right = 1.5} 
                    return oR*(3*(1+ii)-1)*right - 0.6*oR*(ii-1);
                } else {
                    if(ii < i){
                        return oR*0.6*(3*(1+ii)-1);
                    } else {
                        return oR*(nUnits*3+1) - oR*0.6*(3*(nUnits-ii)-1);
                    }
                }               
            })
            .attr("y", (h+oR)/2.3)          
            .attr("font-size", function(d,ii){
                if(i == ii)
                    return 12*1.5;
                else
                    return 12*0.6;              
            });
                 
        var signSide = -1;
        for(var k = 0; k < nUnits; k++){
            signSide = 1;
            right = 1;
            if(k < nUnits/2) signSide = 1;
            if(k==0) right = 1.5;
            t.selectAll(".topicBubbleText" + k)
                .attr("x", function(d,i) { return (oR*(3*(k+1)-1)*right - 0.6*oR*(k-1) + signSide*oR*2.2*Math.cos((i-1)*45/180*3.1415926)); })
                .attr("y", function(d,i) {return ((h+oR)/2.3 + signSide*oR*2.2*Math.sin((i-1)*45/180*3.1415926));})
                .attr("font-size", function(){
                    return (k==i)?12:6;
                })
                .style("visibility",function(){
                    return (k==i)? "visible":"hidden";
                });
                     
             t.selectAll(".topicBubble" + k)
                .attr("cx", function(d,i) {return (oR*(3*(k+1)-1)*right - 0.6*oR*(k-1) + signSide*oR*2.2*Math.cos((i-1)*45/180*3.1415926));})
                .attr("cy", function(d,i) {return ((h+oR)/2.3 + signSide*oR*2.2*Math.sin((i-1)*45/180*3.1415926));})
                .attr("r", function(){
                    return (k==i)?(oR*0.55):(oR/3.0);               
                })
                .style("visibility",function(){
                    return (k==i)? "visible":"hidden";
                });
        }                   
    }
    window.onresize = resetBubbles;
}

$(document).ready(function() {
	vita_circles($('#vita_circles'));
});