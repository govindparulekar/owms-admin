
<?php
include '../config/path-setting.php';
include "$header_path";
include "$sidenav_path";
include "$createsweepermodal_path";
include "$viewsweepermodal_path";

?>
  <input id="current-page" type="hidden" value="manage">
  <input type="hidden" id="zone" value="">
  <div class="col-lg-9">
    <div class="wrapper d-flex justify-content-between px-2 pt-3">
      <div id="search-box-container">
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text" for="inputGroupSelect01">Search By</label>
          </div>
          <select class="custom-select" id="search-by">
            <option selected value="adhaar">Adhaar</option>
            <option value="email">Email ID</option>
          </select>
          <input type="text" class="form-control" placeholder="Search sweeper" aria-label="Recipient's username" aria-describedby="button-addon2" id="search-box">
        </div>
      </div>
      <div class="btn btn-success btn-sm btn-check-req" id="add-sweeper" data-toggle="modal">Add sweeper</div>
      <div class="btn btn-primary btn-sm mr-3" id="refresh-btn">Refresh</div>
    </div>
          
    <div class="table-wrapper">
      <div class="alert alert-primary mx-auto text-center">Loading..</div>
      <div class="alert alert-warning mx-auto text-center"></div>
      <table class="table table-bordered table-hover table-sm">
        <thead class="thead-light">
          <tr>
            <th class="table-head" scope="col" style="padding:">Sweeper Id</th>
            <th class="table-head" scope="col">Name</th>
            <th class="table-head"scope="col">Zone</th>
            <th class="table-head" scope="col"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  </div>
</div>
    <script src="../vendors/jquery.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <!-- My own Javascript -->
    <script src="../scripts/manage-sweepers.js"></script>
    <script src="../scripts/main.js"></script>
    <script src="../scripts/logout.js"></script>
    
    <!-- jquery file 
    -->

    <?php

include "$notificationpanel_path";

?>

</body>

</html>




  