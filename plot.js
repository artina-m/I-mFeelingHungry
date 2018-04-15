// Add images to foreground and background
var vizSVG = d3.select("#animate")
      .append("svg")
      .attr("class", "vizSVG")
      .attr("width", "100%")
      .attr("height", "500px")

vizSVG.append("image")
    .attr("xlink:href","plate.png")
    .attr("x", 150)
    .attr("y", 300)
    .attr("width", 500)
    .style("z-index", 1)

//vizSVG.append("line")
//    .attr("x1", 250).attr("x2", 500)
//    .attr("y1", 400).attr("y2", 400)
//    .attr("stroke", "lightgrey")
vizSVG.append("image")
    .attr("xlink:href","lid.png")
    .attr("class", "lid")
    .attr("id", "lid")
    .attr("x", 180)
    .attr("y", 135)
    .attr("width", 450)
    .style("z-index", 10)

// Functions to trigger animation
function openLid(){
    var lid = d3.select("#lid")
    lid.transition()
    .attr("transform", "rotate(45)")
    .attr("x", 300).attr("y", -550)
}

function closeLid(){
     var lid = d3.select("#lid")
    lid.transition()
    .attr("transform", "rotate(0)")
    .attr("x", 180).attr("y", 135)
}


// Geneate restaurant


function triggerLid(){
    closeLid()
    // Do something
    setTimeout(openLid, 500)
}



function createCard(d) {
    // This function takes a row from a dataset
    // Creates one card
    // id = resturant name 
    
    var card = document.createElement("div");
    card.className = "card";
    card.id = d.name;

    // Photo
    var restPhoto = document.createElement("div")
    restPhoto.id = "rest_photo";

    var photo = document.createElement("img")
    photo.className = "photo"
    photo.src = d.img_url;
    restPhoto.appendChild(photo)

    // Details
    var restInfo = document.createElement("div")
    restInfo.id = "rest_info";

    var para = document.createElement("p");
    para.id = "rest_name"
    var rest_name = document.createTextNode(d.name);
    para.appendChild(rest_name);
    restInfo.appendChild(para);

    var para = document.createElement("p");
    para.id = "rest_cat"
    var rest_cat = document.createTextNode(d.categories);
    para.appendChild(rest_cat);
    restInfo.appendChild(para)

    var para = document.createElement("p");
    para.id = "rest_stars"
    var rest_stars = document.createTextNode("  " + d.rating + "   ");
    para.appendChild(rest_stars);
    restInfo.appendChild(para)

    var para = document.createElement("p");
    para.id = "rest_dollars"
    var rest_dollars = document.createTextNode(d.dollar_sign);
    para.appendChild(rest_dollars);
    restInfo.appendChild(para)

    var para = document.createElement("a");
    para.id = "rest_website"
    para.href = d.url
    para.target = "_blank"
    var rest_website = document.createTextNode("  |  Reviews");
    para.appendChild(rest_website);
    restInfo.appendChild(para)

    // Create card
    card.appendChild(restPhoto)
    card.appendChild(restInfo)
    
    document.getElementById("results").appendChild(card)
    
}