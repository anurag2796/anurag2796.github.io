#!/usr/bin/env python3
import os
import sys

def should_ignore(path):
    ignored_dirs = {'.git', '__pycache__', 'node_modules', 'dist', 'public', '.vscode', '.github'}
    ignored_extensions = {'.pdf', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico', '.lock', '.webp', '.mp4', '.mov'}
    
    parts = path.split(os.sep)
    if any(part in ignored_dirs for part in parts):
        return True
    
    _, ext = os.path.splitext(path)
    if ext.lower() in ignored_extensions:
        return True
        
    return False

def export_codebase(output_file='notebookllm_source.txt'):
    # Script is in scripts/ export_for_notebooklm.py, so root is ..
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
    output_path = os.path.join(root_dir, output_file)
    
    valid_extensions = {'.ts', '.tsx', '.js', '.jsx', '.json', '.html', '.css', '.md', '.py', '.yml', '.yaml'}
    
    with open(output_path, 'w', encoding='utf-8') as outfile:
        for dirpath, dirnames, filenames in os.walk(root_dir):
            if should_ignore(dirpath):
                continue
                
            for filename in filenames:
                filepath = os.path.join(dirpath, filename)
                rel_path = os.path.relpath(filepath, root_dir)
                
                # prevent self-parsing or parsing the output file
                if should_ignore(rel_path) or filename == output_file or filename == os.path.basename(__file__):
                    continue
                    
                _, ext = os.path.splitext(filename)
                # Include specific files without extensions or specific extensions
                if ext.lower() not in valid_extensions and filename not in ['package.json', 'tsconfig.json', '.gitignore', 'postcss.config.mjs']:
                    continue
                    
                outfile.write(f"\n\n{'='*7} FILE: {rel_path} {'='*7}\n\n")
                
                try:
                    with open(filepath, 'r', encoding='utf-8') as infile:
                        outfile.write(infile.read())
                except Exception as e:
                    outfile.write(f"// Error reading file: {e}\n")
                    
    print(f"✅ Successfully exported codebase to {output_path}")

if __name__ == "__main__":
    export_codebase()
