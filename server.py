#!/usr/bin/env python3
import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def log_message(self, fmt, *args):
        pass


if __name__ == '__main__':
    server = ThreadingHTTPServer(('0.0.0.0', 8765), Handler)
    print('Serving fitness program on http://0.0.0.0:8765')
    server.serve_forever()
