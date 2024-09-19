import os
import subprocess
import time
import winreg

def get_libreoffice_path():
    try:
        # Try to get LibreOffice path from Windows registry
        with winreg.OpenKey(winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\LibreOffice\LibreOffice") as key:
            install_path = winreg.QueryValueEx(key, "Path")[0]
        return os.path.join(install_path, "program", "soffice.exe")
    except WindowsError:
        # If registry key not found, return default path
        return r"C:\Program Files (x86)\LibreOffice\program\soffice.exe"

def convert_docx_to_pdf(docx_path, pdf_path=None):
    # If pdf_path is not provided, create it based on the docx_path
    if pdf_path is None:
        pdf_path = os.path.splitext(docx_path)[0] + ".pdf"
    
    # Ensure we have absolute paths
    docx_path = os.path.abspath(docx_path)
    pdf_path = os.path.abspath(pdf_path)
    
    # Get LibreOffice executable path
    libreoffice_path = get_libreoffice_path()
    
    if not os.path.exists(libreoffice_path):
        raise FileNotFoundError(f"LibreOffice not found at {libreoffice_path}")
    
    try:
        # Command to convert DOCX to PDF using LibreOffice
        cmd = [
            libreoffice_path,
            '--headless',
            '--convert-to',
            'pdf',
            '--outdir',
            os.path.dirname(pdf_path),
            docx_path
        ]

        # Use a custom environment
        custom_env = os.environ.copy()
        custom_env['PATH'] = f"{os.path.dirname(libreoffice_path)};{custom_env.get('PATH', '')}"
        
        # Run the command
        process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        stdout, stderr = process.communicate()
        
        if process.returncode != 0:
            raise subprocess.CalledProcessError(process.returncode, cmd, stdout, stderr)
        
        # Wait for the file to be created (LibreOffice conversion might take a moment)
        max_wait = 30  # maximum wait time in seconds
        wait_time = 0
        while not os.path.exists(pdf_path) and wait_time < max_wait:
            time.sleep(1)
            wait_time += 1
        
        if os.path.exists(pdf_path):
            print(f"Successfully converted {docx_path} to {pdf_path}")
        else:
            raise FileNotFoundError(f"Conversion seemed to succeed, but {pdf_path} was not found")
    
    except subprocess.CalledProcessError as e:
        print(f"Conversion failed: {e}")
        print(f"STDOUT: {e.stdout.decode('utf-8', errors='ignore')}")
        print(f"STDERR: {e.stderr.decode('utf-8', errors='ignore')}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Example usage
# convert_docx_to_pdf(r"C:\path\to\your\document.docx")