import os
import yaml
import markdown # Libreria per convertire MD -> HTML
from jinja2 import Environment, FileSystemLoader

# Configurazione
PROJECTS_MAPPING = {
    'industrial': 'progetti/Applicazioni_Industriali',
    'knowledge': 'progetti/Gestione_Conoscenza',
    'tutorial': 'progetti/Tutorial_Formazione'
}
TEMPLATE_DIR = 'templates'

# Prepariamo Jinja2
env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))
home_template = env.get_template('index.html')
project_template = env.get_template('projects.html')

def process_project(base_dir, project_folder, category):
    """
    1. Legge README.md
    2. Estrae YAML (Frontmatter)
    3. Converte il corpo Markdown in HTML
    4. Genera index.html dentro la cartella del progetto
    5. Restituisce i metadati per la home page
    """
    project_path = os.path.join(base_dir, project_folder)
    readme_path = os.path.join(project_path, 'README.md')
    
    if not os.path.exists(readme_path):
        return None

    with open(readme_path, 'r', encoding='utf-8') as f:
        full_content = f.read()

    # Parsing YAML Frontmatter vs Markdown Content
    metadata = {}
    markdown_content = full_content

    if full_content.startswith('---'):
        end_idx = full_content.find('---', 3)
        if end_idx != -1:
            yaml_text = full_content[3:end_idx]
            try:
                metadata = yaml.safe_load(yaml_text)
                # Il contenuto vero inizia dopo il secondo ---
                markdown_content = full_content[end_idx+3:].strip()
            except yaml.YAMLError as e:
                print(f"Errore YAML in {project_folder}: {e}")

    # Convertiamo Markdown -> HTML
    # extensions=['fenced_code', 'tables'] serve per codice e tabelle belle
    html_content = markdown.markdown(markdown_content, extensions=['fenced_code', 'tables'])

    # Dati per il Template Progetto
    template_data = {
        'title': metadata.get('title', project_folder),
        'summary': metadata.get('summary', ''),
        'labels': metadata.get('labels', []),
        'media_url': metadata.get('media', ''), # URL immagine/video hero
        'repo_url': metadata.get('repo_url', ''), # URL GitHub
        'content': html_content # Il corpo convertito
    }

    # GENERIAMO IL FILE readme.html DEL PROGETTO
    output_html = project_template.render(**template_data)
    output_path = os.path.join(project_path, 'readme.html')
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output_html)
    
    print(f"  ✨ Generata pagina per: {metadata.get('title')}")

    # Aggiungiamo dati extra per la Home Page (path relativo)
    metadata['path'] = project_path.replace('\\', '/')
    metadata['category'] = category
    return metadata

def main():
    print("🚀 Inizio generazione sito completo...")
    all_projects = []

    # Scansione Cartelle
    for category, base_dir in PROJECTS_MAPPING.items():
        if os.path.exists(base_dir):
            for project_folder in os.listdir(base_dir):
                full_path = os.path.join(base_dir, project_folder)
                
                # Ignoriamo file sparsi, processiamo solo cartelle
                if os.path.isdir(full_path) and not project_folder.startswith('.'):
                    data = process_project(base_dir, project_folder, category)
                    if data:
                        all_projects.append(data)

    # GENERIAMO LA HOME PAGE
    home_html = home_template.render(projects=all_projects)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(home_html)

    print("🏁 Sito generato con successo! (Home + Pagine Progetto)")

if __name__ == "__main__":
    main()