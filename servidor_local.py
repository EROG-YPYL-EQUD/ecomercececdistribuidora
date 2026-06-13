import http.server
import socketserver
import webbrowser
import threading
import time
import os

PORT = 8000

class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        super().end_headers()

def open_browser():
    time.sleep(1)
    webbrowser.open(f"http://localhost:{PORT}/admin.html")

if __name__ == "__main__":
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    threading.Thread(target=open_browser, daemon=True).start()
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("")
        print("C & C Distribuidora - servidor local iniciado")
        print(f"Admin: http://localhost:{PORT}/admin.html")
        print(f"Loja:  http://localhost:{PORT}/loja.html")
        print("")
        print("Para encerrar, feche esta janela ou aperte CTRL+C.")
        print("")
        httpd.serve_forever()
