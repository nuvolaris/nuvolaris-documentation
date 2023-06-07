function main(args) {
  message = []
  errors = []

  if (args.name) {
    message.push("name: " + args.name)
  } else {
    errors.push("No name provided")
  }
  var re = /\S+@\S+\.\S+/;
  if (args.email && re.test(args.email)) {
    message.push("email: " + args.email)
  } else {
    errors.push("Email missing or incorrect.")
  }
  if (args.phone && args.phone.match(/\d/g).length >= 10) {
    message.push("phone: " + args.phone)
  } else {
    errors.push("Phone number missing or incorrect.")
  }
  if (args.message) {
    message.push("message:" + args.message)
  }

  if (errors.length) {
    var errs = "<ul><li>" + errors.join("</li><li>") + "</li></ul>"
    return {
      body: "<h1>Errors!</h1>" +
        data + errs +
        '<br><a href="javascript:window.history.back()">Back</a>'
    }
  } else {
    var data = "<pre>" + message.join("\n") + "</pre>"
    // storing in the database
    // TODO: <Store the message in the database> 
    return {
      body: "<h1>Thank you!</h1>" + data
    }
  }

}
