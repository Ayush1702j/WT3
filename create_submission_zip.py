import os
import zipfile
import sys

def create_zip(prn="2304362", name="Ayush"):
    project_dir = os.path.dirname(os.path.abspath(__file__))
    zip_filename = f"{prn}_{name}_P3_CourseEnrollment.zip"
    zip_filepath = os.path.join(project_dir, zip_filename)

    included_dirs = ["src"]
    included_files = ["index.html", "package.json", "package-lock.json", "vite.config.js", ".gitignore", "README.md"]

    # Explicit exclusions
    excluded_names = {"node_modules", ".git", "dist", ".vscode", "__pycache__"}

    with zipfile.ZipFile(zip_filepath, "w", zipfile.ZIP_DEFLATED) as zipf:
        for file in included_files:
            file_path = os.path.join(project_dir, file)
            if os.path.exists(file_path):
                zipf.write(file_path, file)
                print(f"Added file: {file}")

        for d in included_dirs:
            dir_path = os.path.join(project_dir, d)
            if os.path.exists(dir_path):
                for root, dirs, files in os.walk(dir_path):
                    # Filter out excluded directories in-place
                    dirs[:] = [d for d in dirs if d not in excluded_names]
                    for f in files:
                        if f.endswith(('.log', '.tmp', '.pyc')):
                            continue
                        full_p = os.path.join(root, f)
                        rel_p = os.path.relpath(full_p, project_dir)
                        zipf.write(full_p, rel_p)
                        print(f"Added: {rel_p}")

    print(f"\n[SUCCESS] Generated Assignment 3 zip: {zip_filepath} ({os.path.getsize(zip_filepath):,} bytes)")

if __name__ == "__main__":
    prn = sys.argv[1] if len(sys.argv) > 1 else "2304362"
    name = sys.argv[2] if len(sys.argv) > 2 else "Ayush"
    create_zip(prn, name)
