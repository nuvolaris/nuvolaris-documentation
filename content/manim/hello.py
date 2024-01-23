
from pathlib import Path
OPENAI_API_KEY = Path("../../apikey.txt").read_text().strip()
args = {"OPENAI_API_KEY": OPENAI_API_KEY}
print(OPENAI_API_KEY)


from  openai import OpenAI

def models(args):
   ai = OpenAI(api_key=args['OPENAI_API_KEY'])
   data = ai.models.list().model_dump()
   models = [m['id'] for m in data['data']]
   return { "models": models }

print(models(args))