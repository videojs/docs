echo checking out master
git checkout master
echo pulling origin master
git pull origin master
echo checking out gh-pages
git checkout gh-pages
echo pulling origin gh-pages
git pull origin gh-pages
echo merging master
git merge master
echo pushing gh-pages
git push origin gh-pages
echo finished...