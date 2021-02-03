---
title: User Interface Standards and Guidelines
---

<h2>Abstract</h2>

This document defines best practices for HTML, CSS, and JavaScript development, as well as other industry wide best practices that have been adopted by {{ site.company-name }} designers and developers. This document seeks to foster a standard approach to user interace development and should be shared with any designers and developers who produce user interfaces within our company as well as with vendors who produce interfaces for {{ site.company-name }}.

Please note that this is a living document that changes *frequently*. You may bookmark it and check back on a regular basis or [subscribe to notifications]({{ site.repo }}/subscription) for this repository.

Help us make this document even better! [Contributions are encouraged!](#contributors)

{% include toc.md %}

## 1. General Concepts

At {{ site.company-name }}, we embrace web standards and keep up-to-date with the latest developments within the web industry. We are committed to giving all users the best experience possible by using the latest methods and techniques, while also sticking to core principles, such as [Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) and [Resilient Design](https://resilientwebdesign.com/). In this endeavor, we use the following front-end languages in the majority of our work:

* HTML5
* CSS3
* JavaScript (ES6/ES5)
* jQuery (Latest)

### 1.1 Accessibility

All of your prospective job candidates, regardless of physical or technological capabilities, have the right to learn more about your company and access all job listings. To preserve a users right to universal access, our baseline development standards for all of our web offerings attempt to meet WCAG 2.1 Level AA guidelines at all times.

* [WCAG 2.1 Documentation](https://www.w3.org/TR/WCAG21/)
* [How to Meet WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.1)
* [Understanding WCAG 2.1](https://www.w3.org/WAI/WCAG21/Understanding/)
* [Techniques for WCAG 2.1](https://www.w3.org/WAI/WCAG21/Techniques/)

### 1.2 Operating System Support

{{ site.company-name }} supports websites and applications on the following operating systems:

See [{{ site.company-name }} Support]({{ site.company-url }}/support/#operating-systems) for more details.

### 1.3 Browser Support

{{ site.company-name }} supports the **current** and **prior** major release versions of all browsers. Corresponding to the date in which your project has launched, we test all development in the following:

See [{{ site.company-name }} Support]({{ site.company-url }}/support/#browser) for more details.

### 1.4 File Naming Conventions

* Only use lowercase alphanumeric characters and hyphens.
  * Non-indexable files (such as SASS) may also contain underscores.
* Names should be descriptive of the file's contents or image.

<p class="alert">Not Recommended</p>

<pre><code>Banner Home Background.jpg
logo_1.png
doc-How_To_Apply.pdf
coffee.shop.jpg</code></pre>

<p class="success"> Recommended</p>

<pre><code>home-banner-background.jpg
logo-1.png
doc-how-to-apply.pdf
coffee-shop.jpg</code></pre>

[Return to Table of Contents](#toc){: .back-to-toc }

## 2. Optimization

### 2.1 Validation

Code validation is an easy way to spot issues that you might have missed without having to examine every element. Things like accessibility issues can easily be identified and fixed without much time wasted.

Check each completed project using the [W3C Markup Validation Service](https://validator.w3.org/) to scan for issues.

Many browser add-ons and development tools have validation built right in, so be sure to use them.

<section id="axe-core" class="a11y-info" markdown="1">

<h2>Accessibility Testing</h2>

A really great tool to have at your disposal is Deque System's [aXe extension](https://www.deque.com/products/axe/). If you are interested in including aXe testing within your local development or build process, please see [Accessibility Testing with aXe-core](https://www.deque.com/products/axe-core).

</section>

### 2.2 Page Load Speed

Loading time is a major contributing factor to page abandonment. After completion of a site, each user interface developer should test their site using the [Google Developers PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) or [Pingdom](https://tools.pingdom.com/fpt/) for more detailed results. It is as easy as copying and pasting the URL into the text field.

Our desired score should be anything above 70/100, however our absolute lowest score should not fall below 60/100 on both mobile and desktop tests.

While it might not be possible to always achieve a perfect or near-perfect score, we should strive for a site that has the best possible score while maintaining the client requirements. Some issues might be out of our control as user interface developers, but we can take other precautions in order to develop the most efficient site possible.

### 2.3 Performance Budget

As part of our commitment to provide users with the best experience possible, we adhere to a performance budget for sites that we develop. Each user interface developer should monitor site performance during development, and each site goes through a performance audit during the QA process.

Our performance budget is:

* HTTP Requests: **~75-85**
* Cumulative Page Weight: **~1.5 and 2MB**

### 2.4 Image Compression

**All** images should be run through an image optimization tool in order to reduce their file sizes for the web. In many cases, image file sizes can be drastically reduced, resulting in faster load times and helping to deliver the best experience possible to the user. This will also contribute to adhering to our [Performance Budget](#performance-budget). There are various tools for this including (but not limited to):

* [Tiny PNG](https://tinypng.com/) (Online Tool, not only png)
* [Compressor.io](https://compressor.io/) (Online Tool)
* [JPEGmini](https://www.jpegmini.com/) (Online Tool, jpg only)
* [RIOT](http://luci.criosweb.ro/riot/) (Standalone Application)

### 2.5 Video Optimization

Make all efforts to optimize video as much as possible—especially if it is being self-hosted. [Handbrake](https://handbrake.fr/) is a very useful tool for this task. There are lots of great tutorials on the web that can teach you how to use Handbrake and tighten up the screws for optimal video streaming and playback.

<section id="video-captions" class="a11y-info" markdown="1">

<h2>Video Captions</h2>

Did you know that all video needs to be captioned in order to meet basic accessibility guidelines (See [Understanding Success Criterion 1.2.1](https://www.w3.org/WAI/WCAG21/Understanding/audio-only-and-video-only-prerecorded))? If you are not hosting your video on Youtube, which can generate captions for you, then you will need to manually add captions. There are great services, like [Rev](https://www.rev.com/), that can perform this task for you very easily.

</section>

### 2.6 Minify

#### 2.6.1 HTML

Do not minify HTML.

#### 2.6.2 CSS

CSS should be minified if saving memory is worth sacrificing readability. Such occasions would include extremely large CSS files, or when minifying the code would push the site size under the designated performance budget and all other optimizations have been exhausted.

#### 2.6.3 Sass (SCSS)

SCSS should never be minified. If the server has the ability to tie in a CSS preprocessor, no CSS output file should exist. However, if server-side CSS preprocessing is not available, all compiled CSS should be minified.

#### 2.6.4 JavaScript

JavaScript should be minified if saving memory is worth sacrificing readability. Such occasions would include extremely large JS files, or when minifying the code would push the site size under the designated performance budget and all other optimizations have been exhausted. Another occasion would include a custom library commonly used on many sites with a solid understanding of how to implement it among all team members.

#### 2.6.5 Third-Party Libraries

All third-party libraries should be minified unless some sort of customization has been made to it and requires readability.

[Return to Table of Contents](#toc){: .back-to-toc }

## 3. Markup

### 3.1 HTML Coding Style

#### 3.1.1 HTML Spacing & Line Breaks

* Use soft tabs with a 2-space indentation. This is important because it's the only way to guarantee that the code will look the same in any development environment.
* Do not leave white-space at the end of any lines.

#### 3.1.2 HTML Formatting

* Use double-quotes around attributes.
* Classes should be used instead of IDs unless you need to link (anchor) to something specific on the page.
* Place the `id` and `class` attributes first, respectively, within an opening tag.
    * E.g. `<a id="foo" class="bar baz" href="#quux" ...>...</a>`.
* Do not use trailing slashes in self-closing elements.
    * E.g. `<img src="...">` instead of `<img src="..." />`, `<br>` rather than `<br />`, and `<hr>` instead of `<hr />`.
* Boolean attributes don't require a value, so don't set one.
    * E.g. `<input type="text" required>`.
* Avoid writing closing tag comments.
    * E.g. `<!-- /.class -->`.

#### 3.1.3 HTML Semantics & Nesting

* HTML should be as semantic and purposeful as possible.
* Take care not to unnecessarily nest elements.
* Before you use an element purely for styling purposes, ask these questions:
  * Can the parent element or a parent sibling be styled, instead, to achieve the same effect?
  * Can a pseudo-element be used in place of a span or div?
  * Can the HTML be restructured to be just as semantic *and* easier to style?

<p class="alert">Not Recommended: Using a span</p>

<pre><code>.nav-item {
padding: .5em;

  span {
  background: url('../img/nav-item.png') no-repeat center;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
  }

}</code></pre>

<p class="success">Recommended: Using a pseudo-element</p>

<pre><code>.nav-item {
padding: .5em;

  &::after {
  background: url('../img/nav-item.png') no-repeat center;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
  }

}</code></pre>

[Return to Table of Contents](#toc){: .back-to-toc }

## 4. CSS

### 4.1 CSS Coding Style

#### 4.1.1 Author Comment Block

**Always include an author comment block at the top of your CSS.** This is an important resource for any developers who work on the code after you.

<pre><code>/*!

Title: [Project Title]
Author: [Company & Office Name]
Developer: Full Name (Email Address)
Ticket: [Ticket Number]
Creation Date: [YYYY-MM-DD]

****** Change Log ******

Ticket: [Ticket Number]
Developer: Full Name (Email Address)
Manager: PSS or DPM Name (Email Address)
Date: [YYYY-MM-DD]
Comments: [Succinct description of tasks performed]

*/</code></pre>

#### 4.1.2 CSS Spacing & Line Breaks

* Use soft tabs with a 2-space indentation. This is important because it's the only way to guarantee that the code will look the same in any environment.
* Align all rule declarations to the left edge of the editor.
* Do not leave white-space at the end of any lines.
* Use a space before `{` in rule declarations.
* Place each property declaration on a separate line.
* Use one space after `:` in property declarations.
* Place spaces after commas in lists:
    * E.g. `color: rgba(0, 0, 0, .5);`.
* Put `}` in rule declarations on a separate line.
* When grouping selectors, put each selector on a separate line.

#### 4.1.3 CSS Formatting

* Use hex codes for colors, unless using rgba() for alpha transparency.
* Use the three-character color shorthand when possible.
    * E.g `#000`.
* Do not specify a unit for a 0 value.
    * E.g. `margin: 0;`, not `margin: 0em;`.
* Do not include a 0 for decimals less than 1.
    * E.g. `margin: .5em;`, not `margin: 0.5em;`.
* Numeric values should not contain unnecessary fractions.
    * E.g `margin: 1em;`, not `margin: 1.0em;`.
* Use shorthand values when possible.
    * E.g. `margin: 1px 1px 0 1px;` should be `margin: 1px 1px 0;`.
* Use single quotes around strings (or URLs), unless the single quotes would need to be escaped.
    * E.g. `url('hello-world.png');` or `content: "'this has single quotes'";`.

<pre><code>/* Example */

.box {
background-color: #fff;
box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
padding: .5em;
}

.box::before {
content: 'Example';
display: block;
}

.box + .box {
margin-top: 1em;
}</code></pre>

#### 4.1.4 CSS Selectors

##### 4.1.4.1 Specificity

At most, aim for three levels or less of selector specificity, not counting pseudo selectors or media queries.

<p class="alert">Not Recommended</p>

<pre><code>.one .two .three .four div {
display: block;
}</code></pre>

<p class="success">Recommended</p>

<pre><code>.one .two div {
display: block;
}
</code></pre>

##### 4.1.4.2 Naming

* CSS selectors should be semantic, describing the elements' function. Semantic names do not include:
    * the name of a person.
    * an elements' placement on the page, such as `.left` or `.top`.
* Selectors should use hyphens to separate levels.
    * E.g. `.job-group-title`.
* Selectors should not include underscores or any uncommon Unicode characters.
* Selectors should not use camelCase.

<p class="alert">Not Recommended</p>

<pre><code>.parent__child {}
.parent_child {}
.left-box {}</code></pre>

<p class="success">Recommended</p>

<pre><code>.parent-name-child-name {}
.related-links {}</code></pre>

##### 4.1.4.3 Complexity

* Avoid using overly complex selector combinations and naming schemes.
* Use as few selectors as possible to apply styling, while also keeping the CSS modular and flexible.
* Avoid littering HTML class attributes with selectors that only apply one or two lines of CSS.

<p class="alert">Not Recommended</p>

<pre><code>&lt;ul class="floatLeft paddingT10 paddingB10 nav-parent"&gt;
  &lt;li class="caps paddingL10 paddingR10 marginT10"&gt;&lt;a class="bold textRed" href="#link-1"&gt;Link 1&lt;/a&gt;&lt;/li&gt;
  &lt;li class="caps paddingL10 paddingR10 marginT10"&gt;&lt;a class="bold textRed" href="#link-2"&gt;Link 2&lt;/a&gt;&lt;/li&gt;
  &lt;li class="caps paddingL10 paddingR10 marginT10"&gt;&lt;a class="bold textRed" href="#link-3"&gt;Link 3&lt;/a&gt;&lt;/li&gt;
  &lt;li class="caps paddingL10 paddingR10 marginT10"&gt;&lt;a class="bold textRed" href="#link-4"&gt;Link 4&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<p class="success">Recommended</p>

<pre><code>&lt;ul class="nav-parent"&gt;
  &lt;li&gt;&lt;a href="#link-1"&gt;Link 1&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#link-2"&gt;Link 2&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#link-3"&gt;Link 3&lt;/a&gt;&lt;/li&gt;
  &lt;li&gt;&lt;a href="#link-4"&gt;Link 4&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</code></pre>

[Return to Table of Contents](#toc){: .back-to-toc }

## 5. SASS

SASS is the preprocessor of choice for {{ site.company-name }} developers. All preprocessed CSS should be written in SASS to ensure the interoperability of the code.

### 5.1 SASS Coding Style

The same rules for CSS also apply to SASS, unless specified below.

#### 5.1.1 SASS Spacing & Line Breaks

* Align first-level rule declarations to the left edge of the editor.
* Nested rule declarations should have two-space indentation from the edge of the parent.
* Put one blank line between property declarations and nested rule declarations.

#### 5.1.2 SASS Formatting

* Always put imports (`@import`) at the top of the document.
* Always place mixins (`@include`) at the top of rule declarations, unless it **must** go somewhere else.

#### 5.1.3 SASS Selectors

* At most, aim for three levels of selector specificity, not counting pseudo selectors, media queries, or mixins.

#### 5.1.4 SASS Variables, Functions, and Mixins

* Variables, functions, and mixins should follow the same naming rules as CSS selectors.
* Variables, functions, and mixins should be kept together in their respective groupings.
    * E.g. `variables.scss`, `functions.scss`, `mixins.scss`.

### 5.2 SASS Directory Structure

It is very important that all UI Developers have a consistent and uniform structure for their SASS directories. You will find yourself using the same base SASS files for multiple projects.

<pre><code>scss/
├── core/        Variables, functions, mixins
├── partials/    Global styles
├── vendor/      Vendor-provided styles, e.g. Flexslider
├── views/       Page-specific styles
└── global.scss  Primary SASS file</code></pre>

[Return to Table of Contents](#toc){: .back-to-toc }

## 6. JavaScript

### 6.1 JavaScript Coding Style

#### 6.1.1 JavaScript Spacing & Line-Breaks

* Use soft tabs with a 2-space indentation. This is important because it's the only way to guarantee that the code will look the same in any environment.
* Do not leave white-space at the end of any lines.
* Separate function declarations and control statements (`if`, `switch`, etc.) with a blank line, unless the function is a closure.
* Curly braces (`{}`) can be omitted in `if` statements if the statement can comfortably fit on one line.
    * E.g. `if(x == 1) return true;`.
* There should be no space between the name of a function or control statement and the opening `(`.
* Use a space before `{` in function declarations and control statements.
* Closing `}` (`})` for closures) for functions and control statements should be on a separate line.

#### 6.1.2 JavaScript Formatting

* Use single-quotes around strings.
* Declare new variables with `var`.
* Use the following conventions for naming:
    * `variableOrFunctionName` (camelCase)
    * `ClassName` (PascalCase/CapitalCase)
    * `CONSTANT_NAME` (UPPER_CASE)
* End all variable assignments, function calls, and `return` statements with a `;`.

[Return to Table of Contents](#toc){: .back-to-toc }

## 7. Images

### 7.1 Image File Types

While extracting images from a creative design, it's important to consider which file type to use. Not all file types are created equal and while some offer images that are smaller, others are better suited to different situations.

* **.jpg** &mdash; The JPEG format is recommended for most of the images that you will come across in a design. They offer lossy compression (reduced file size) while keeping decent image quality, depending on your settings. The JPEG format does not support transparency. Depending on the detail in the image, **a Photoshop JPEG compression setting between 60 (High) and 80 (Very High) is recommended** to keep a good balance between image quality and file size. Use your best judgement.
* **.png** &mdash; PNG is a lossless format (larger file size) and is recommended in situations where the quality of the image is important, or where transparency is required. A possible use-case for a PNG image is a clients' logo, where the quality of the logo is important and may contain transparent sections around it.
* **.svg** &mdash; SVG is an older vector image format that has recently become a more viable option for the web. SVG is recommended for more simple images that need to scale or retain sharpness on a number of different screen densities. SVG also supports transparency. A great use-case for the SVG format would be, again, a logo or icons.

<section id="alternative-text" class="a11y-info" markdown="1">

<h2>Alternative Text</h2>

Alternative text is very important to assistive technology users. If an image has text in it or is relevant to the surrounding content, then these are cases where alternative text is typically required. Images within hyperlinks also require alternative text. If you are not sure about when to add alternative text, then check out this handy [Alternative Text Decision Tree](https://www.w3.org/WAI/tutorials/images/decision-tree/).

</section>

### 7.2 Image Sprites

To aid in adhering to our [Performance Budget](#performance-budget), it's recommended that logos, icons, and other small images be combined into a sprite. This results in a reduction in page requests, as well as a small reduction in file size.

If you're not using a build tool, such as [Grunt](https://gruntjs.com/), you can create a sprite in an image editing program or use a [sprite generator](http://spritegen.website-performance.org/).

[Return to Table of Contents](#toc){: .back-to-toc }

## 8. Git

### 8.1 Git Commits

When committing changes to a repository, use the standardized commit message template to detail your changes.

To configure Git to use the commit template:

1. [Download the standardized commit message template](../../docs/commit-template.txt) and place it in a permanent location on your local hard drive.
1. From your shell, type `git config --global commit.template path/to/commit/message`. Be sure to replace `path/to/commit/message` with the actual path to the commit message template.

When you make a new commit, do not use the `-m` option. Instead just use `git commit` and let Git create a new commit message using the template.

[Return to Table of Contents](#toc){: .back-to-toc }

## 9. Patterns & Anti-patterns

Through the trial and errors of our community or just plain common sense, we have come to discover what works better for users on on the web and what does not. This section is dedicated to sharing some of this conventional wisdom.

### 9.1 New Window Links

If new windows must be opened, please ensure they are being implemented properly, otherwise it is often best to avoid the practice entirely. Before making a decision, please read [The Last Word (Maybe) on Opening New Windows](https://michaelspellacy.com/the-last-word-on-opening-new-windows/).

### 9.2 Focus Outlines

The decision to remove outlines from focusable elements must be carefully considered. Users with low-vision may depend on outlines to navigate through the page they are visiting in their browser. Please note that many browsers may render outlines differently. If these default outlines are not desirable, a new default outline can be designed, but should be just as clear in bringing attention to the element that is being interacted with. Before taking this approach, keep in mind that many users may expect outlines to look and behave the same way that they do when they visit other websites, so changing outlines could have a negative impact on the user experience.

[Return to Table of Contents](#toc){: .back-to-toc }

## 10. Recommended Tools

### 10.1 Editors

* [Sublime Text](https://www.sublimetext.com/)
* [Atom](https://atom.io/)

#### 10.1.1 Editor Plugins

Below are recommended plugins listed for each recommended editor (if they support plugins).

##### 10.1.1.1 Sublime Text

* [Package Control](https://sublime.wbond.net/)
* [EditorConfig](https://sublime.wbond.net/packages/EditorConfig)
    * [Download our standard EditorConfig file](../../docs/editorconfig.txt), rename it to `.editorconfig`, and place it in your project root.
* [Emmet](https://sublime.wbond.net/packages/Emmet)
* [HTML-CSS-JS Prettify](https://sublime.wbond.net/packages/HTML-CSS-JS%20Prettify)
* [Nettuts+ Fetch](https://sublime.wbond.net/packages/Nettuts%2B%20Fetch)
* [SASS](https://sublime.wbond.net/packages/Sass)
* [SublimeLinter](https://sublime.wbond.net/packages/SublimeLinter)
    * [SublimeLinter-contrib-scss-lint](https://sublime.wbond.net/packages/SublimeLinter-contrib-scss-lint)
    * [SublimeLinter-csslint](https://sublime.wbond.net/packages/SublimeLinter-csslint)
    * [SublimeLinter-html-tidy](https://sublime.wbond.net/packages/SublimeLinter-html-tidy)
    * [SublimeLinter-jshint](https://sublime.wbond.net/packages/SublimeLinter-jshint)

[Return to Table of Contents](#toc){: .back-to-toc }

## 11. Publications

### 11.1 Required Reading

* [A Dao of Web Design by John Allsopp](https://alistapart.com/article/dao)
* [Ethical Design Manifesto](https://2017.ind.ie/)
* [Resilient Web Design by Jeremy Keith](https://resilientwebdesign.com/)

### 11.2 (Highly) Recommended Reading

* [Accessibility for Everyone by Laura Kalbag](https://abookapart.com/products/accessibility-for-everyone/)
* [Adaptive Web Design (1st Edition) by Aaron Gustafson](https://adaptivewebdesign.info/1st-edition/)
* [Anything written by Scott O'Hara](https://www.scottohara.me/writing/)
* [DOM Scripting: Web Design with JavaScript and the Document Object Model by Jeremy Keith and Jeffery Sambells](https://www.amazon.com/DOM-Scripting-Design-JavaScript-Document/dp/1430233893)
* [Designing with Progressive Enhancement: Building the Web that Works for Everyone by Todd Parker, Scott Jehl, Maggie Costello Wachs, Patty Toland](https://www.amazon.com/Designing-Progressive-Enhancement-Building-Everyone/dp/0321658884/ref=sr_1_1?s=books&ie=UTF8&qid=1422386916&sr=1-1&keywords=progressive+enhancement)
* [Designing with Web Standards (3rd Edition) by Jeffery Zeldman](https://www.amazon.com/Designing-Web-Standards-3rd-Edition/dp/0321616952)
* [Developing with Web Standards by John Allsopp](https://www.amazon.com/Developing-Web-Standards-John-Allsopp/dp/0321646924)
* [Don't Make Me Think: A Common Sense Approach to Web Usability (3rd Edition) by Steve Krug](https://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515/ref=dp_ob_title_bk)
* [Inclusive Design Patterns by Heydon Pickering](https://shop.smashingmagazine.com/products/inclusive-design-patterns)
* [JavaScript: The Good Parts by Douglas Crockford](https://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742)
* [Mobile First by Luke Wroblewski](https://www.abookapart.com/products/mobile-first)
* [Responsive Web Design (2nd Edition) by Ethan Marcotte](https://www.abookapart.com/products/responsive-web-design)
* [Using ARIA by Steve Faulkner and David MacDonald](https://www.w3.org/TR/using-aria/)

[Return to Table of Contents](#toc){: .back-to-toc }
