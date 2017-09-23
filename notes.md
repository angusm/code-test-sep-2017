Notes
====

Shortcuts Taken
----
- Brought in gulpfile and packages from previous hobby projects and code tests
  - Could benefit from becoming more familiar with generators such as yeoman
  etc.
- Brought in `handies` dir from an existing hobby project.
  - https://github.com/angusm/chaffers/tree/master/resources/static/javascript/src/handies
  - Exceptions:
    - Created and added MultiValueMap and DynamicDefaultMultiValueMap
  
Tech Used
----
- Javascript
  - Should either get more comfortable with Typescript or transition to and
  pickup Clojure
- Brought in Angular due to familiarity.
  - Next personal development goal (after securing employment) is to improve
  proficiency and comfort level with React.

Debugging
----
### Problem with MultiValueMap recursion

Testing
----


Best Practices
----
I've set up a couple of goals for myself with this project.

### Be idempotent:
- Minimizes need for mocks in unit tests
- Removes side effects, simplifies testing and debugging
- Exceptions made:
  - Made an exception for MultiValueMap and DynamicDefaultMultiValueMap.
    - DynamicDefaultMap was already available to be extended and was not written
    to be an immutable data type. Creating MultiValueMap and
    DynamicDefaultMultiValueMap was easy by extending, but making them immutable
    would create a serious departure from their parent classes or require
    re-writing the parent classes. It didn't seem practical.
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
### Angular Practices
- Minimize use of Angular
  - Allows for re-use of more code in other frameworks
  - Reduces $digest and watcher overload that can crush performance
  - Examples
    - Avoiding an Angular $http and using generic AJAX for retrieving products.
    Since the products aren't going to be displayed until the user scrolls down
    we don't necessarily need to trigger a digest loop when the results are
    returned.
### Short lines
- Keep lines to a relatively small column limit. (Using 80 chars).
    - Makes splitting views between files easy.
    - Encourages a line to only do one thing.
    - Exceptions:
    - Imports. The leftmost values are typically the only ones that are
    relevant.
    - URLS in markup (HTML or Markdown).
### Store strings in constants:
- Allows for changing string values in a centralized place
- Better supports automatic refactoring tools
- Exceptions:
  - One-time use values (such as module names) to avoid cluttering up the code
  with many variables.
### Use the Rectangle Rule
- A simple rule for keeping line breaks readable.
  - It is mandated by Google's styleguide but I cannot find an external-facing
  reference.
  - The short version is when breaking to a new line, break by logical groups
  such that a rectangle can be drawn around them. A logical group would be
  something like a function call, an arguments function, etc.
  - You can see it referenced in the external-facing Google JS style guide in
  the example here:
  https://google.github.io/styleguide/jsguide.html#formatting-function-arguments
### Follow a style-guide
- A good way to lay out best-practices regarding readability
- Keeps code consistent
- Reduces noise in diffs relating to stylistic changes between shifting dev
preferences.
- Roughly following: https://google.github.io/styleguide/jsguide.html
### Misc Practices
Making note of other best practices as I run across them
- Leverage FastDOM for effects and interactions
 - Minimizes layout thrashing by batching DOM queries and updates
- Minimize your JS and CSS
  - Could be doing a better job of this using Closure Compiler
- Place blocking JS at the bottom of the page
- Use `!!` to denote intentional boolean evaluation of non-boolean value
  - More or less a way of documenting intent

Action Items and Takeaways
----
- Start using Typescript or Clojure in hobby projects for front end
- Become familiar with generators if moving to more frequent smaller projects
- Improve skill level with React so as to not rely on Angular for these types of
things
- Get more familiar with setting up Closure Compiler with NPM
