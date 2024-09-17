import docx
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from docx2pdf import convert
import os
import win32com.client
import pythoncom

def convert_docx_to_pdf(docx_path, pdf_path=None):
    # Read the DOCX file
    if pdf_path is None:
        pdf_path = os.path.splitext(docx_path)[0] + ".pdf"
    
    # Ensure we have absolute paths
    docx_path = os.path.abspath(docx_path)
    pdf_path = os.path.abspath(pdf_path)
    
    try:
        pythoncom.CoInitialize()
        word = win32com.client.Dispatch("Word.Application")
        doc = word.Documents.Open(docx_path)
        doc.SaveAs(pdf_path, FileFormat=17)  # FileFormat=17 is for PDF
        doc.Close()
        word.Quit()
        print(f"Successfully converted {docx_path} to {pdf_path}")
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    finally:
        pythoncom.CoUninitialize()