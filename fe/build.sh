rm -rf build
export appname=`basename $PWD`
echo $appname
parcel build index.html -d build --public-url "/static/$appname"
#sed 's/^[^{]*//g' index.html | sed 's/[^}]*$//' build/index.html > "../../templates/$appname/index.html"
cp -R build/ "static/$appname"
mv build/index.html templates/$appname/index.html 

