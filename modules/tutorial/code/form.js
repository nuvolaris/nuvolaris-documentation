function main() {
    return {
        body: `<html><head>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css"
      rel="stylesheet" id="bootstrap-css">
</head><body>
 <div id="container">
  <div class="row">
   <div class="col-md-8 col-md-offset-2">
    <h4>Get in Touch</h4>
    <form method="POST" action="submit">
     <div class="form-group">
       <input type="text" name="name"
        class="form-control" placeholder="Name">
     </div>
     <div class="form-group">
        <input type="email" name="email"
         class="form-control" placeholder="E-mail">
     </div>
     <div class="form-group">
        <input type="tel" name="phone"
         class="form-control" placeholder="Phone">
     </div>
     <div class="form-group">
        <textarea  name="message" rows="3"
         class="form-control" placeholder="Message"
         ></textarea>
      </div>
      <button class="btn btn-default" type="submit" name="button">
        Send
      </button>
    </form>
   </div>
  </div>
 </div>
</body></html>`
    }
}
