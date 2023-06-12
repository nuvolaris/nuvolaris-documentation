var openwhisk = require('openwhisk')

function save(doc) {
  var ow = openwhisk({ api_key: "25cdfc80-1e9f-4863-9162-42e8d6ae11c6:0ESe6byS0fD8xi93OIZGeIHFb0siACR1d6OtjLfEeLzEFaWJ8ArddHzsiII8MHMO" })
  return ow.actions.invoke({
    "name": "contact/write",
    "params": {
      "name": doc.name,
      "email": doc.email,
      "phone": doc.phone,
      "message": doc.message
    }
  })
}

function main(args) {
  let message = []
  let errors = []

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
    save({
      "name": args.name,
      "email": args.email,
      "phone": args.phone,
      "message": args.message
    })
    return {
      body: "<h1>Thank you!</h1>" + data
    }
  }

}
