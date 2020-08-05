<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bootstrap Simple Login Form</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel="stylesheet" href="libs/custom.css">

<style type="text/css">
    

	.login-form {
        width: 340px;
        
	}
    .login-form form {
    	margin-bottom: 15px;
        background: #f7fbef;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }
    .login-form h2 {
        margin: 0 0 15px;
    }
    .form-control, .btn {
        min-height: 38px;
        border-radius: 2px;
    }
    .btn {        
        font-size: 15px;
        font-weight: bold;
    }
    body{
        height: 100vh;
        justify-content: center;
        align-items: center;
        display: flex;
        background :#474b4f;
        box-sizing: border-box !important;
    }      
    
</style>

</head>
<body>
    <?php 
        include 'includes/layout-comps/loading-screen.php';
    ?>

    <div class="login-form">
    <form action="" method="post">
        <h2 class="text-center">Log in</h2>       
        <div class="form-group mb-2">
            <input type="text" class="form-control" id="uname" placeholder="Username" required="required">
            <div class="err-msg text-danger"></div>
        </div>
        <div class="form-group my-3">
            <input type="password" class="form-control" id="pwd" placeholder="Password" required="required">
            <div class="err-msg text-danger"></div>
        </div>
        <div class="form-group">
            <button type="button"  id="login-btn" class="btn btn-primary btn-block">Log in</button>
        </div>    
    </form>
</div>

    <script src="vendors/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
    <script src="scripts/login.js"></script>
</body>
</html>                                		                            