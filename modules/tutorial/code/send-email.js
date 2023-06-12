async function main(args) {
    let res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + args.sendgrid
        },
        body: JSON.stringify({
            "from": { "email": args.from },
            "subject": "[Contact Form]",
            "personalizations": [
                { "to": [{ "email": args.to }] }
            ],
            "content": [
                { "type": "text/plain", "value": args.body }
            ]
        })
    })
    return { body: { ok: res.ok } }
}