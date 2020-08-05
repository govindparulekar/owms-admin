console.log(sessionStorage.getItem('will'));
var promise;
$(document).ready(function(){
    var admin = {};
    const api_base_url = 'https://www.kshitijskincare.com/sweeperapi/api/complaint/';
    let ATkn = sessionStorage.getItem('ATkn');
    //show alert msg for process btn and reject btn
    
    //send request to fetch all incoming complaints2
    if(ATkn){//if user deletes session storage (angatle kide)
        promise = validate_access();
    }
    else{
        window.location = "../";
    }
//--------------------------------------------------------------------------------
//event handler for 3 buttons
$('#_scroll-content').click(function(e){
    let cid = e.target.getAttribute('data-complaint-id');
    let czone = e.target.getAttribute('data-complaint-zone');

    if(e.target.id=="complaint-View"){
            viewComplaint(cid,czone);
        
    }
    else if(e.target.id=="complaint-Reject"){
        removeComplaint(cid,e.target);
        
    }
    else{

    }
});
//when view button is clicked
function viewComplaint(id,zone){
    console.log(id,zone);

    $.get(`${api_base_url}readsingle.php`,{
        complaint_id: id,
        zone : zone
    },
    function(data,status){
        var complaint = data;
        console.log(complaint);
        var complainer = complaint.data[0].user_name;
        console.log(complainer);
        var zone = complaint.data[0].zone;
        var disc = complaint.data[0].placename;

        var date = complaint.data[0].complaint_date;
        var time = complaint.data[0].complaint_time;

        var complaint_modal = $('#view-complaint-modal');
        complaint_modal.find('#complainer').text(complainer);
        complaint_modal.find('#zone').text(zone);
        complaint_modal.find('#disc').text(disc);
        complaint_modal.find('#date').text(date);
        complaint_modal.find('#time').text(time);

    }
    );

}
   async function validate_access(){
       var admin_id;
       await $.post('../api/admin/validate_access.php',{
            ATkn:ATkn 
        },
        function(response){
            console.log(response);
            admin.uname = response.uname;
            admin.dp = response.dp;
            admin.zone = response.zone;
            admin.id = response.id;
            admin_id = admin.id;
            setUnameAndDp();
            showComplaints();
    })
    .fail(function(jqXHR){      
        if(jqXHR.status==401){
        window.location = "../";//back to login form
        }
    });
    return admin_id;
    }



    function showComplaints(){
        jQuery.get(`${api_base_url}getfinishedcomplaints.php`,{
            admin_id: 3
        },function(data,status){
            $('.wrapper').empty();
            $('.loading').hide();
            //console.log(data);
            complaints_data = data;
            console.log(complaints_data);
            let complaint_index = 0;
            let complaint_count = complaints_data.count;
            
                //I know this is bit of clumsy
            while(complaint_index<=(complaint_count-1)){
                var id = complaints_data.data[complaint_index].id;
                var complainer = complaints_data.data[complaint_index].user_uuid;
                var zone = complaints_data.data[complaint_index].zone;
                var date = complaints_data.data[complaint_index].complaint_date;
                var time = complaints_data.data[complaint_index].complaint_time;
                var town = complaints_data.data[complaint_index].town;
                var image_url = complaints_data.data[complaint_index].image_url;
                console.log(image_url);
                // making of complaint card components(I know this is bit of clumsy:)
                var card = $('<div class="card shadow" style="width:500px;"></div>');
                var card_row = $('<div class="row no-gutters"></div>');
                var card_col_md4 = $('<div class="col-md-4"></div>');
                var img_cont = $('<div class="img-cont"></div>');
                var card_img = $('<img class="rounded img-fluid card-img" alt="no image found">');
                card_img.attr('src',image_url);
                var card_col_md8 = $('<div class="col-md-8"></div');
                var card_body = $('<div class="card-body"></div>');
                var card_text = $('<div class="card-text"></div>');
                var complaint_lable_container = $('<div class="complaint-lable-container"></div>');
                var complaint_lable_arr = ['Complainer:','Zone:','Date:','Time:'];
                for(var i=0;i<complaint_lable_arr.length;i++){
                    var complaint_lable = $('<span class="complaint-lable d-block font-weight-bold">'+complaint_lable_arr[i]+'</span>');
                    complaint_lable_container.append(complaint_lable);
                }
                var complaint_info_container = $('<div class="complaint-info-container pl-2"></div>');
                var complaint_info_arr = [complainer,zone,date,time];
                for(var i=0; i<4; i++){
                    var complant_info = $('<span class="complaint-info d-block">'+complaint_info_arr[i]+'</span>');
                    complaint_info_container.append(complant_info);
                }
                var button_grp = $('<div class="button-group float-right"></div>');
                //making of view , process, remove buttons
                var view_btn = $('<div class="btn btn-primary btn-sm mr-2" data-toggle="modal" data-target="#view-complaint-modal" id="complaint-View" data-complaint-zone='+zone+' data-complaint-id='+id+'>View</div>');
                
                $('.wrapper').append(card);
                card.prepend(card_row);
                card_row.prepend(card_col_md4);
                card_col_md4.prepend(img_cont);
                img_cont.prepend(card_img);
                card_row.append(card_col_md8);
                card_col_md8.append(card_body);
                card_body.append(card_text);
                card_text.append(complaint_lable_container);
                card_text.append(complaint_info_container);
                card_body.append(button_grp);
                button_grp.append(view_btn);
                button_grp.append(process_btn);
                button_grp.append(remove_btn);

                complaint_index++;
            }
            
        
        })
        .fail(function(jqXHR){
            $('.loading').removeClass("alert-primary");
            $('.loading').addClass("alert-warning");
            $('.loading').show();
            console.log(jqXHR.status);
            if(jqXHR.status==404){
                $('.wrapper').empty();
                $('.loading').text("Complaints not found..");
            }
            else{
                $('.loading').text("Something went wrong..");
            }


        });
    }

    function setUnameAndDp(){
        $('.side-nav').find('.admin-img>img').attr("src","../register/"+admin.dp);
        $('.side-nav').find('#username').text(admin.uname);
    }

    
}
);

