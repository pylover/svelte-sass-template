#! /usr/bin/env python3
import sys
import signal

from yhttp import Application, text


def sighandler(sig, frame):
    sys.exit(0)


signal.signal(signal.SIGTERM, sighandler)

app = Application()
app.staticdirectory('/', 'public', default=True, fallback=True)
app.ready()
try:
    app.climain(['s'])
except OSError:
    pass
