Implementiamo adesso un servizio di chat con OpenAI.

Si tratta di una versione semplificata del famoso ChatGPT.

Utilizzeremo per questo esempio la "completions" API.

Assumiamo di avere un accesso a OpenaAI nell'oggetto `AI`

La completions API è la seguente:

(notare la funzione `req` spiegata dopo):


```
MODEL = "gpt-3.5-turbo"

comp = AI.chat.completions.create(model=MODEL, messages=req(input))
```

Si tratta semplicemente della API che data una richiesta produce una risposta,
ma non ha memoria del contesto e delle richieste precedenti.

***  API senza memoria del contesto

La completions API prende tutte le richieste in una unica soluzione,
infatti la funzione `req` fa proprio questo:

```
ROLE = """You are a friendly assistant"""

def req(msg):
    return [{"role": "system", "content": ROLE}, 
            {"role": "user", "content": msg}]
```

Produce l'input che viene inviato ad OpenAI, la richiesta dell'utente ma anche il ruolo che si vuole che l'assistente svolga. 

Sono come informazioni di configurazione della richiesta.


Possiamo quindi scrivere la funzione `ask` per effettuare delle richieste:

```
def ask(input):
    comp = AI.chat.completions.create(model=MODEL, messages=req(input))
```

La risposta `comp` è un oggetto abbastanza complesso, e comprende anche una serie di possibili risposte. Noi prenderemo il primo:

```
    if len(comp.choices) > 0:
       return comp.choices[0].message.content
    return "ERROR"
```

Copmletiamo quindi il codice con un `main` che si collegerà a OpenAI, 


```
def main(args):
    global AI
    AI = OpenAI(api_key=args.get("OPENAI_API_KEY"))
```

e poi leggerà un input e ritornerà un output:


```
    input = args.get("input", "")
    output = ask(input)

    return {"body": {"output": output}}
```

