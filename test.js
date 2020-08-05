
$('.btn').click(()=>{
  $('#exampleModal').modal();
});

$('#exampleModal').on('show.bs.modal',(e)=>{
  $('#name').val("");
  $('#name').next().text("");
  console.log('about to show');
  //$('#name').focus();
});

$('#exampleModal').on('shown.bs.modal',(e)=>{
  console.log($('#name').val());
  $('#name').focus();

  
  console.log('shown');
});

$('#name').blur(function (e) { 
  e.preventDefault();
  console.log('blur');
  
});

