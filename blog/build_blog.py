import os
import mammoth
import re
from jinja2 import Environment, FileSystemLoader

# --- CONFIGURAZIONE ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_FILE = 'blog_template.html'
IGNORE_LIST = ['build_blog.py', 'blog_template.html', '__pycache__', '.git', '.DS_Store']

env = Environment(loader=FileSystemLoader(BASE_DIR))

def make_image_converter(output_dir_path):
    """ Estrae le immagini dal Word e le salva nella cartella evento """
    def convert_image(image):
        ext = image.content_type.split('/')[1] if '/' in image.content_type else 'png'
        convert_image.counter += 1
        filename = f"img_{convert_image.counter}.{ext}"
        path = os.path.join(output_dir_path, filename)
        try:
            with image.open() as image_bytes:
                with open(path, "wb") as f:
                    f.write(image_bytes.read())
        except Exception as e:
            print(f"    ⚠️ Errore salvataggio immagine: {e}")
        return {"src": filename}
    convert_image.counter = 0
    return convert_image

def process_folder(folder_name):
    folder_path = os.path.join(BASE_DIR, folder_name)
    if not os.path.isdir(folder_path): return

    docx_file = None
    pdf_file = None
    try:
        files = os.listdir(folder_path)
    except: return

    for f in files:
        if f.endswith('.docx') and not f.startswith('~$'): docx_file = f
        elif f.endswith('.pdf'): pdf_file = f
            
    if not docx_file: return

    # Controllo se evento.html esiste già (rimuovi questo check se vuoi sovrascrivere sempre)
    output_path = os.path.join(folder_path, 'evento.html')
    
    print(f"📂 Elaborazione: {folder_name}...")
    docx_path = os.path.join(folder_path, docx_file)
    image_handler = make_image_converter(folder_path)
    
    try:
        with open(docx_path, "rb") as docx_obj:
            result = mammoth.convert_to_html(docx_obj, convert_image=mammoth.images.img_element(image_handler))
            html_body = result.value
    except Exception as e:
        print(f"    ❌ Errore conversione: {e}")
        return

    # --- LOGICA DI ESTRAZIONE MIGLIORATA ---
    
    # 1. Estrai TITOLO (H1)
    title = folder_name.replace('_', ' ')
    h1_match = re.search(r'<h1>(.*?)</h1>', html_body, re.IGNORECASE)
    if h1_match:
        title = h1_match.group(1).strip()
        html_body = re.sub(r'<h1>.*?</h1>', '', html_body, count=1, flags=re.IGNORECASE)

    # 2. Estrai SOTTOTITOLO/DATA (Primo Paragrafo)
    # Assumiamo che il primo <p> dopo il titolo sia la data/luogo
    subtitle = ""
    p_match = re.search(r'<p>(.*?)</p>', html_body, re.IGNORECASE)
    if p_match:
        subtitle = p_match.group(1).strip()
        # Rimuoviamo il sottotitolo dal corpo per non ripeterlo
        html_body = re.sub(r'<p>.*?</p>', '', html_body, count=1, flags=re.IGNORECASE)

    # Renderizza Template
    template_data = {
        'title': title,
        'subtitle': subtitle, # Passiamo il nuovo campo
        'content': html_body,
        'pdf_filename': pdf_file
    }
    
    try:
        template = env.get_template(TEMPLATE_FILE)
        output_html = template.render(**template_data)
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(output_html)
        print(f"    ✅ Generato: {folder_name}/evento.html")
    except Exception as e:
        print(f"    ❌ Errore template: {e}")

def main():
    print("🚀 Blog Generator Potenziato...")
    for item in os.listdir(BASE_DIR):
        if item in IGNORE_LIST or item.startswith('.'): continue
        process_folder(item)
    print("\n✨ Finito.")

if __name__ == "__main__":
    main()