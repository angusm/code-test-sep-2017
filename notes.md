Notes
====

Shortcuts Taken
----
- Brought in gulpfile and packages from previous hobby projects and code tests
  - Could benefit from becoming more familiar with generators such as yeoman etc.
  
Tech Used
----
- Javascript
  - Should either get more comfortable with Typescript or transition to and pickup Clojure
- Brought in Angular due to familiarity.
  - Next personal development goal (after securing employment) is to improve
  proficiency and comfort level with React.

Debugging
----


Testing
----


Best Practices
----
I've set up a couple of goals for myself with this project.

### Be idempotent:
- Minimizes need for mocks in unit tests
- Removes side effects, simplifies testing and debugging
### Short functions
- Smaller functions are quick and easy to read
- Allows complexity to be pushed down
- Creates more opportunities for naming to serve as documentation
  - For example:
  //TODO: Add example
### Re-Use
- Code re-use minimizes redundant code
- Minimizing redundant code reduces overall LOC
- Fewer LOC reduces the problem space when debugging
- Fewer LOC requires fewer tests to gain coverage
### One Export Per File
- Keeps the purpose of files clear
- Makes sharing globals between Classes/Modules/etc. difficult
  - This difficulty can highlight the need to extract/abstract shared
  values/behaviour. 
### Misc Practices
Making note of other best practices as I run across them
- Minimize your JS and CSS
  - Could be doing a better job of this using Closure Compiler
- Place blocking JS at the bottom of the page
- Store strings in constants:
  - Allows for changing string values in a centralized place
  - Better supports automatic refactoring tools
  - Make an exception for one-time use values (such as module names) to avoid
  cluttering up the code with variables.

Action Items and Takeaways
----
- Start using Typescript or Clojure in hobby projects for front end
- Become familiar with generators if moving to more frequent smaller projects
- Improve skill level with React so as to not rely on Angular for these types of things
- Get more familiar with setting up Closure Compiler with NPM
