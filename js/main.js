
var id_array = [];
//When adding a product, the 'total products' div show up. Right now it toggleing.
$(document).on("click", '.beer_div', function(e){
    
    if($('.right_pane').css("display") == ("none")){
        $('.right_pane').slideDown();
        $('.left_pane').animate({"width": '-=33%'}, 500);
    } else {
        //$('.left_pane').animate({"width": '+=33%'}, 500);
    }
    
    //$('.right_pane').toggle('slow');

    //Checking duplicate entry on the purchase form:
    function check() {
        for (var i = 0; i < id_array.length; i++) {
            //alert("fu");
            console.log("fu " + id_array[i] + " " + e.currentTarget.id);
            if (id_array[i] == parseInt(e.currentTarget.id)){
                console.log("TRUUUEE " + i);
                return i;
            }
        }
        return -1;
    }

    var counter = -1;
    counter = check();
    console.log("counter: " + counter);

    if(counter == -1){
        id_array[id_array.length] = e.currentTarget.id;
        console.log(id_array);
        createDiv();
    }
    else
    {
        var value = parseInt($('#purchase_form').children(':nth('+counter+')').children(':nth(2)').html());
        
        value++;
        
        $('#purchase_form').children(':nth('+counter+')').children(':nth(2)').html(value);
    }

    //console.log($('#purchase_form').children(':nth('+counter+')').children(':nth(2)').html());



    //Putting Data into the onClick div
  //  console.log($('#'+e.currentTarget.id+'').children(':nth(2)').html());
    
    
    function createDiv(){
    $('#purchase_form').append('' +
        '<div class="selected_article">' +
            '<input type="hidden" value="'+e.currentTarget.id+'">' +
        '   <p class="beer_name"> '+ $('#'+e.currentTarget.id+'').children(':nth(1)').html()+ "</p>" +
        '   <p class="quantity">1</p>' +
        '   <span class="increment">' +
        '       <button class="button_inc_dec">+</button>' +
        '       <button class="button_inc_dec">-</button>' +
        '   </span>' +
        '   <p class="price">'+ $('#'+e.currentTarget.id+'').children(':nth(2)').html()+ "</p>" +
        '<button class="delete">x</button>' +
        '</div>>');
    }
});


$(document).on("click", '.btn_success', function(e){
    
    var uName = $('#uName').val();
    var pWord = $('#pWord').val();
    var userlist = {};
    console.log("Name:"+uName+"Word:"+pWord);
    

    $.getJSON("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=user_get_all", function(result){
        $.each(result, function(i, field){                 
            if(i == "payload"){
                for(var j=0; j < field.length; j++){
                    userlist[field[j].username] = field[j].password;
                }
                if(uName in userlist){

                    if(pWord == userlist[uName]){       
                        getData();
                    }else{
                        alert("Wrong Password!");
                    }
                }else{
                    alert("Wrong Username and Password!");
                }
                console.log(userlist);
               
            }
        });
    });

});


function getData(){

    $.getJSON("http://pub.jamaica-inn.net/fpdb/api.php?username=jorass&password=jorass&action=inventory_get", function(result){
        $.each(result, function(i, field){
            $("#note").append(field + "");
            console.log(i,field.length, field[0].price);


            if(i == "payload"){
                for(var j = 0; j < field.length; j++) {
                    var is_hidden = 'none';
                    if(field[j].namn != "" && parseInt(field[j].count) >= 1)
                    {
                        if(parseInt(field[j].count)<11)
                        {
                            is_hidden = 'initial';
                        }
                        $("#notebook").append("<div class='beer_div' id="+field[j].beer_id+">"+
                            "<label class='nameLabel'>Name: </label>" +
                            "<p class='name'>"+field[j].namn+"</p> " +
                            "<label class='priceLabel' for='priceVal'>Price: </label><label id='priceVal' class='priceValue'>"+field[j].price+"</label>" +
                            "<br>" +
                            "<p class='count' style='display: "+is_hidden+"'>Count: "+field[j].count+"</p>" +
                        " </div>");
                    }
                }
            }
        });
    });
}

    
 getData();