# "projects_courses_log"

&amp;
The site is ready at https://dreamecho100.github.io/projects_courses_log/.
&amp;

## �or create a new repository on the command line

echo "# projects_courses_log" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin https://github.com/DreamEcho100/projects_courses_log.git
git push -u origin master
&amp;

## �or push an existing repository from the command line

git remote add origin https://github.com/DreamEcho100/projects_courses_log.git
git branch -M master
git push -u origin master

##

git add .
git commit -m "Uplaod&Update..."
git push -u origin master

&amp;

## Running JS through command line

npm init -y
chmod +x index.js
#!/usr/bin/env node
npm link

## Creating a new file in Windows
[type nul >> your_file.txt]
[echo.>> your_file.txt]
->-Creates a new file
->>-Preserves content of the file

[fsutil file createnew filename  requiredSize]
The parameters info as followed:
fsutil - File system utility ( the executable you are running )
file - triggers a file action
createnew - the action to perform (create a new file)
filename - would be literally the name of the file
requiredSize - would allocate a file size in bytes in the created file

[copy NUL FileName.FileExtension]
[$>>filename]