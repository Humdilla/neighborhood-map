@echo off
:: Minify CSS
del dist\css\*.min.css
for %%f in (src\css\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\css\%%~nf.min.css https://cssminifier.com/raw
)
:: Minify JS
del dist\js\*.min.js
for %%f in (src\js\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\js\%%~nf.min.js https://javascript-minifier.com/raw
)
del dist\js\lib\*.min.js
for %%f in (src\js\lib\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\js\lib\%%~nf.min.js https://javascript-minifier.com/raw
)
del dist\js\vm\*.min.js
for %%f in (src\js\vm\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\js\lib\%%~nf.min.js https://javascript-minifier.com/raw
)
@echo on