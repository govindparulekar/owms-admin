<div class="modal fade" id="create_update-sweeper-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header d-block">
      <div class="row">
        <div class="col-md-4">
          <div class="modal-title"></div>
        </div>
        <div class="col-md-7">
          <h4 class="col-md-8 pt-1" id="suid"></h4>
        </div>
        <div class="col-md-1">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      
      </div>
        
        
      </div>
      <div class="modal-body">
        <div class="container">
            <form id="create-sweeper-form">
                <div class="form-group row">
                    <label for="fname" class="col-sm-3 col-form-label">First Name:</label>
                    <div class="col-sm-9">
                    <input type="text" required class="form-control" id="fname" placeholder="e.g. Govind">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="lname" class="col-sm-3 col-form-label">Last Name:</label>
                    <div class="col-sm-9">
                    <input type="text" required class="form-control" id="lname" placeholder="e.g. Parulekar">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="email" class="col-sm-3 col-form-label">Email:</label>
                    <div class="col-sm-9">
                    <input type="email"  required class="form-control" id="email" placeholder="e.g mike@some.com">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="mobile" class="col-sm-3 col-form-label">Contact No:</label>
                    <div class="col-sm-9">
                    <input type="tel" required class="form-control" id="mobile">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="adhaar" class="col-sm-3 col-form-label">Adhar:</label>
                    <div class="col-sm-9">
                    <input type="text" required class="form-control" id="adhaar" placeholder="1234-1234-1234">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="pan" class="col-sm-3 col-form-label">Pan</label>
                    <div class="col-sm-9">
                    <input type="text" required class="form-control" id="pan">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="dob" class="col-sm-3 col-form-label">DOB:</label>
                    <div class="col-sm-9">
                    <input type="date" required class="form-control" id="dob">
                    <div class="form-inp-msg"></div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="zone" class="col-sm-3 col-form-label">Zone:</label>
                    <div class="col-sm-9">
                    <input type="text" class="form-control"  id="szone" value="Chembur" readonly>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="address" class="col-sm-3 col-form-label">Address:</label>
                    <div class="col-sm-9">
                      <textarea id="address" cols="50" rows="4" required class="form-control"></textarea>
                      <div class="form-inp-msg"></div>
                    </div>
                </div>
                <input type="button" class="btn btn-primary" id="submit-btn" value="submit">
            </form>
        </div>
      </div>
    </div>
  </div>
</div>