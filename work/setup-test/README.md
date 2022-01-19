# Assignment - Testing node and git

**Due: Sun Jan 30, 11:59pm PT** 

# Instructions

NOTE: This assumes you have followed all of the instructions from the "setup-for-this-class" document.  Do that first.

From this directory, at the command line:

1. Run `npm install`
  * You should see some text while it downloads a library or two
  * If you see a permission error (EACCES) you probably installed something as root/administrator, and now your normal user account can't override it. That's a bit messy to clean up, but it's doable and you want to clean that up NOW rather than later in the semester.
  * Lots of ways of addressing this exist, with varying levels of success and computer security.  Speak up on Slack if this is an issue for you.
  * You only need to run this successfully once.  Once the dependencies are installed, you can run the program (see below) as much as needed without reinstalling.  Reinstalling is only necessary if the dependencies are changed.
1. Run `node list.js`
  * You should see some names printed to the console
1. You are going to make changes, so you should first create a "feature branch" to create those changes in
  * run `git checkout -b setup-info6250`
  * This branch name, "setup-info6250", is specific to this assignment.  Each assignment will be done in its own branch with a unique name.
1. Edit list.js and add your name, NEU ID, Slack handle (with an `@`), and github id to the list (Make sure you match the upper/lower case!)
1. Run `node list.js` again now that you've saved your changes
  * You should see your name added to the list that outputs
  * Everything should run smoothly
  * Fix any errors that do turn up and repeat this step until everything runs smoothly
1. Add the file to the list of files to commit: `git add list.js`
1. Run `git status` and make sure nothing is listed as an 'Untracked file' and only `list.js` is listed to be added.
  * I have never heard *anyone* say "I run git status too much".  It is much easier to clean up a commit BEFORE you make it, so always run git status before doing a commit.  Always pay attention to the output of git status.  Multiple students forget this step each semester.
  * If you have git troubles, I recommend consulting the list of common solutions at https://ohshitgit.com
1. Commit the file: `git commit -m "Adds MYNAME"` (Example: `git commit -m"Adds Lex"`
  * This commit message reflects your changes.  If you make other changes and have to commit those, and when you commit other assignments, the commit messages should reflect THOSE changes, they should NOT say "Adds MYNAME".
  * Repeat: Future assignments should not have commit messages that say "Adds MYNAME", that is specific to this assignment
1. Send your changes to github: `git push origin setup-info6250` 
1. Go to the github page for this repository and create a Pull Request(PR), with 'main' on the left dropdown and your setup-info6250 branch on the right dropdown.
  * Do not merge, you must create a Pull Request.  Your repositories should be set so that you cannot merge to main without a Pull Request, but they are created without that requirement so there is a period of time where you can merge, but you shouldn't do it.  Learn how to create the PR, because that's how all assignments for the class will be turned in, and if you do it wrong, your grade could suffer.
  * Add myself and the TA to review the PR.  If you don't do this, we may not know your work is ready and you won't get credit for it.
2. If the changes look correct, Create the Pull Request.
  * If you edited and added `.gitignore`, that change should be listed as well as your changes to list.js
  * There should NOT be changes to other files.
  * Be sure to **add me (and any TAs) as reviewer** on the PR.
1. Remember to return the main branch!  `git checkout main`.  In this branch, your changes do not exist (not until they are approved, merged in, and you pull the updated main branch)

Then you're done! At some point your code will be reviewed merged into main. This is where our work is different than a "real" job: For most employers you are usually responsible for merging your code after it is approved, but for this class the TA/instructor will merge it after approval.

