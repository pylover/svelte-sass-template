#! /usr/bin/env python3
from yhttp import Application, json, validate, statuses


app = Application()
app.settings.debug = False

app.staticdirectory('/', 'public', default=True, fallback=True)
app.ready()
try:
    app.climain(['serve', '-b0.0.0.0:8080'])
except OSError:
    print('The port is alredy taken.')
