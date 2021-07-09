#! /usr/bin/env python3
import sys

from yhttp import Application, text


app = Application()
app.staticdirectory('/', 'public', default=True, fallback=True)
app.ready()
try:
    app.climain(['s'])
except OSError:
    print('The port is alredy taken.')
    pass
