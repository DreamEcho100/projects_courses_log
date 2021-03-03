# "projects_courses_log"

&amp;
The site is ready at <https://dreamecho100.github.io/projects_courses_log/>.
&amp;

## �or create a new repository on the command line

echo "# projects_courses_log" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M master
git remote add origin <https://github.com/DreamEcho100/projects_courses_log.git>
git push -u origin master
&amp;

## �or push an existing repository from the command line

git remote add origin <https://github.com/DreamEcho100/projects_courses_log.git>
git branch -M master
git push -u origin master

##

git add .

git commit -m "Uplaod&Update..."

git push -u origin master

&amp;

##

git init
git remote add origin https://github.com/DreamEcho100/projects_courses_log.git
git status
git log -p
git pull .
git add .
git commit -m "Uplaod&Update..."
git push -u origin master

##

git init
git clone https://github.com/DreamEcho100/projects_courses_log.git
git remove remote origin
git remote add origin https://github.com/DreamEcho100/projects_courses_log.git
git status
git log -p
git pull .
git add .
git commit -m "Uplaod&Update..."
git push -u origin master

##

Install dependencies from package.json: npm install == yarn

Install a package and add to package.json: npm install package --save == yarn add package

Install a devDependency to package.json: npm install package --save-dev == yarn add package --dev

Remove a dependency from package.json: npm uninstall package --save == yarn remove package

Upgrade a package to its latest version: npm update --save == yarn upgrade

Install a package globally: npm install package -g == yarn global add package

## Deply To heroku First Time

heroku login
git init
git add .
git commit -m "Uplaod&Update..."
heroku create
--see your heroku dashbord -> your new repos -> deploy -> follow insturaction

cd my-project/
git init
heroku git:remote -a ..................
heroku buildpacks:set heroku/nodejs
git add .
git commit -am "make it better"
git push heroku master

## Running JS through command line

npm init -y
chmod +x index.js
<#!/usr/bin/env node>
npm link

## Creating a new file in Windows

[type nul >> your_file.txt]
[echo.>> your_file.txt]
->-Creates a new file
->>-Preserves content of the file

[fsutil file createnew filename requiredSize]
The parameters info as followed:
fsutil - File system utility ( the executable you are running )
file - triggers a file action
createnew - the action to perform (create a new file)
filename - would be literally the name of the file
requiredSize - would allocate a file size in bytes in the created file

[copy NUL FileName.FileExtension]
[$>>filename]

## Moving Files In Wndows

mkdir client
MOVE \*.js client

##

ls
pwd
cd
cd ..
clear
cd / **—> root director**
cd ~
cd <folder/folder/folder> ** <> means to add your own folder names that exist on your computer.
mkdir <folder>
open <folder> **for windows use: start <folder>
touch index.html **for windows use: echo "" > index.html
open index.html **for windows use: start index.html
open -a “Sublime Text” **for windows see the note about this at the bottom of this lecture!!
open . **for windows use: start .
mv index.html about.html
\*Try using the Up and Down arrow.

rm <file>
rm -r <folder>
say hello **(only on Mac)**

~/.config/fish/config.fish

    set normal (set_color normal)
    set magenta (set_color magenta)
    set yellow (set_color yellow)
    set green (set_color green)
    set red (set_color red)
    set gray (set_color -o black)

    # Fish git prompt
    set __fish_git_prompt_showdirtystate 'yes'
    set __fish_git_prompt_showstashstate 'yes'
    set __fish_git_prompt_showuntrackedfiles 'yes'
    set __fish_git_prompt_showupstream 'yes'
    set __fish_git_prompt_color_branch yellow
    set __fish_git_prompt_color_upstream_ahead green
    set __fish_git_prompt_color_upstream_behind red

    # Status Chars
    set __fish_git_prompt_char_dirtystate '⚡'
    set __fish_git_prompt_char_stagedstate '→'
    set __fish_git_prompt_char_untrackedfiles '☡'
    set __fish_git_prompt_char_stashstate '↩'
    set __fish_git_prompt_char_upstream_ahead '+'
    set __fish_git_prompt_char_upstream_behind '-'


    function fish_prompt
      set last_status $status

      set_color $fish_color_cwd
      printf '%s' (prompt_pwd)
      set_color normal

      printf '%s ' (__fish_git_prompt)

      set_color normal
    end


    e git remote -v and press Enter. You'll see the current configured remote repository for your fork.

    	git remote -v
    	origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
    	origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)

    Type git remote add upstream, and then paste the URL you would copy from the original repository if you were to do a git clone. Press Enter. It will look like this:

    	git remote add upstream https://github.com/zero-to-mastery/PROJECT_NAME.git

    To verify the new upstream repository you've specified for your fork, type git remote -v again. You should see the URL for your fork as origin, and the URL for the original repository as upstream.

    	git remote -v
    	origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
    	origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
    	upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
    	upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)

Now, you can keep your fork synced with the upstream repository with a few Git commands.

One simple way is to do the below command from the master of your forked repository:

    git pull upstream master

Or you can follow along another method here: "Syncing a fork."

## Postgresql

CREATE TABLE users_test (name text, age smallint, birthday date);

INSERT INTO users_test (name, age, bithday) VALUES ("Andrei", 31, "1930-01-25");

select \* from users_test;

SELECT name FROM users_test;

SELECT name, bithday, age FROM users_test;

SELECT \* FROM users_test WHERE name LIKE 'A%';

ALTER TABLE users_test ADD score smallint;

UPDATE users_test SET score = 50 WHERE name = 'Andrei';

UPDATE users_test SET score = 100 WHERE name = 'Sally' OR name = 'john';

SELECT \* FROM users_test ORDER BY score DESC;

SELECT \* FROM users_test WHERE name LIKE '%y' ORDER BY score DESC;

SELECT AVG(score) FROM users_test;

SELECT SUM(AGE) FROM users_test;

SELECT COUNT(NAME) FROM users_test;

CREATE TABLE login (
ID serial NOT NULL PRIMARY KEY,
secret VARCHAR (100) NOT NULL,
name TEXT UNIQUE NOT NULL
);

INSERT INTO login (secret, name) VALUES ('abc', 'Andrei');
INSERT INTO login (secret, name) VALUES ('xyz', 'Sally');

SELECT \* FROM users_test JOIN login ON users_test.name = login.name;

DELETE FROM users_test WHERE name='Sally';

DROP TABLE login;

CREATE TABLE users (
id serial PRIMARY KEY,
name VARCHAR(100),
email TEXT UNIQUE NOT NULL,
entries BIGINT DEFAULT 0,
joined TIMESTAMP NOT NULL
);

CREATE TABLE login (
id serial PRIMARY KEY,
hash varchar(100),
email TEXT UNIQUE NOT NULL
);
