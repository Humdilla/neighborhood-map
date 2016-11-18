@echo off
:: Minify CSS
del dist\css\*.css
for %%f in (src\css\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\css\%%~nf.css https://cssminifier.com/raw
)
:: Minify JS
del dist\js\*.js
for %%f in (src\js\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\js\%%~nf.js https://javascript-minifier.com/raw
)
del dist\js\lib\*.js
for %%f in (src\js\lib\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\js\lib\%%~nf.js https://javascript-minifier.com/raw
)
del dist\js\vm\*.js
for %%f in (src\js\vm\*) do (
  curl -X POST -s --data-urlencode input@%%f -o dist\js\vm\%%~nf.js https://javascript-minifier.com/raw
)
@echo on