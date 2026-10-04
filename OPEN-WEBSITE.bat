@echo off
rem Adepa House sample. Starts a small local server and opens the site.
cd /d "%~dp0"
start "" http://localhost:4190
py -m http.server 4190
