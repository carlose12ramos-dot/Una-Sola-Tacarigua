from pathlib import Path
from PyPDF2 import PdfReader

source = Path('public/TacariguaGeografía.pdf')
output = Path('tmp_pdf_extract.txt')
print('source exists:', source.exists())
reader = PdfReader(source)
print('pages:', len(reader.pages))
with output.open('w', encoding='utf-8') as f:
    for i, page in enumerate(reader.pages[:10]):
        text = page.extract_text() or ''
        f.write(f'PAGE {i+1}\n')
        f.write(text)
        f.write('\n' + '='*40 + '\n')
print('written to', output)
