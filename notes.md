Notes
====

Known Bugs
----
- Different random parameters sent to the server for advertisements will return
the same kitten picture. Looking at the code it seems to use modulo 16, so
I will adjust the front-end to accommodate as an interim fix.
- Maps in `handies/structs` do not fully match to the native ES6 Map API.
- Not properly responsive.

Shortcuts Taken
----
- Brought in gulpfile and packages from previous hobby projects and code tests
  - Could benefit from becoming more familiar with generators such as yeoman
  etc.
- Brought in `handies` dir from an existing hobby project.
  - https://github.com/angusm/chaffers/tree/master/resources/static/javascript/src/handies
  - Exceptions:
    - Created and added MultiValueMap and DynamicDefaultMultiValueMap
    - Created and added files in `dom` folder.
    - Created `is-in-range.js`
  
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
Commit Hash: fd564a863641d5b9e4ac4d3339b87e74b902c778
The has function for the MultiValueMap is recursing infinitely. Will be logging
actions taken here as a list in the order approached.
- Starting with initial approach to see if the `has` will return if given no
params.
- It did not return with the empty set and was not being called where expected.
- Examining the stack trace it appears the error is coming from the `get`
property in DynamicDefaultMultiValueMap which is being called from the
MultiValueMap `has` which in turn is calling the DynamicDefaultMultiValueMap get
and continuing in this way infinitely.
- Original code was not super readable and had redundancies, re-wrote and
re-structured to use a separate function to get the inner map nested at the
keys given.
  - Would not re-write so hastily on existing code, but there was no
  pre-existing functionality to be concerned with.
- New central inner map function returns the final instance now necessitating
privately labelled (not actually private) methods for calling the super versions
of `has`/`set`/`get`.
- Adding `console.log` to ensure `getInnerMap` function terminates.
- So it looks like the `getInnerMap` relies on the super `get`, which `set`s,
which calls the MultiValueMap `set` which relies on the `getInnerMap`.
- Found a solution by setting the default case in MultiValueMap `set` to be the
single key, single value set of params.
- Lesson learned was that using substitute supers on instances rather than
maintaining the `this` context confused which function was called. Will re-write
accordingly.
- Had to add special handling in `set` for inner maps and a property to
designate inner maps. It would seem that `instanceof` is failing me now though.
Most likely that I'm using it incorrectly or a transpile error.
- And the final bug was silly. Had `const value = remainder.slice(-1);` where I
needed `const [value] = remainder.slice(-1);`
- And a second final bug :) I had re-used a private variable name in
DynamicDefaultMultiValueMap.

### Problem with duplicated ads
I'd thought I'd addressed the duplicated ads by checking for matching generated
values using the random seed provided in the initial markup. But I was noticing
duplicated ads when testing.
- I opened up the inspector to check the values in the src attribute of the
images.
- Seeing that they were different I opened them in a new tab to see what was
happening and it seemed they were re-directing somewhere else.
- I left the issue for a while to focus on other features.
- I re-visited the issue once I was close to feature complete (I still need
the "You've reached the end" notification) and took a look at the backend code.
- Since the backend was taking the given value and running it through modulo 16
and I was supposed to be using the same markup to generate my values as what was
provided, I adjusted the comparison against the previous value to take this into
consideration.

Testing
----
Unfortunately I did not have time this weekend to set up testing, but I did code
with them in mind.
- Minimizing the impact of Angular has minimized the number of tests that need
to use Angular dependency injection and corresponding mocks.
- Minimizing side effects would make testing more focused and reduce the amount
of state that needs to be taken into account when testing.

Best Practices
----
I've set up a couple of goals for myself with this project.

### Be idempotent:
Unfortunately I did not succeed as much as I would have liked with this.
Thinking about programming in a functional manner doesn't come naturally yet and
I'll need to put in some work to get to that level. I think I could correct this
code with some dedicated time and re-writes. If I can carve out more time in the
future I think I'll approach this for my own skills development.
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
Minimize use of Angular:
- Allows for re-use of more code in other frameworks
- Reduces $digest and watcher overload that can crush performance
- Examples
- Avoiding an Angular $http and using generic AJAX for retrieving products.
Since the products won't be displayed until the user scrolls down we don't
necessarily need to trigger a digest loop when the results are returned.
### Short lines
Keep lines to a relatively small column limit. (Using 80 chars).
- Makes splitting views between files easy.
- Encourages a line to only do one thing.
- Exceptions:
- Imports. The leftmost values are typically the only ones that are relevant.
- URLS in markup (HTML or Markdown).
### Store strings in constants:
- Allows for changing string values in a centralized place
- Better supports automatic refactoring tools
- Exceptions:
  - One-time use values (such as module names) to avoid cluttering up the code
  with many variables.
### Use the Rectangle Rule
- A fairly simple rule for keeping line breaks readable and predictable.
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
### Extract smells
There's not always going to be time to research in the best way to do something
and on occasion I'll need to settle for something I know will work in the
interim. In these cases I try to abstract away pieces I'm less confident in to a
separate function so it can be more easily refactored or re-written later.
### Cleanup
Treat the first working version as a first draft of an essay. Take a minimal
second pass through new code to document and clean things up for future devs
whenever the schedule/budget allows for it.
### Misc Practices
Making note of other best practices as I run across them
- Leverage FastDOM for effects and interactions
  - Minimizes layout thrashing by batching DOM queries and updates
- Minimize your JS and CSS
  - Could be doing a better job of this using Closure Compiler
- Place blocking JS at the bottom of the page
- Use `!!` to denote intentional boolean evaluation of non-boolean value
  - More or less a way of documenting intent
- Remove error handling for cases of improper use.
  - http://thecodelesscode.com/case/115
- Use JSDocs to provide type information for documentation and prep for Closure
Compiler integration if ever necessary for any part of the code.

Action Items and Takeaways
----
- Start using Typescript or Clojure in hobby projects for front end
- Become familiar with generators if moving to more frequent smaller projects
- Improve skill level with React so as to not rely on Angular for these types of
things
- Get more familiar with setting up Closure Compiler with NPM
