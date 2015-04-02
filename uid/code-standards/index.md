---
layout: default
title: Front-end Standards and Guidelines

---

# Front-end Standards and Guidelines

## Abstract

This document defines best practices for HTML, CSS, and JavaScript development, as well as other industry wide best practices that have been adopted by TMP Worldwide developers. This document seeks to foster a standard approach to front-end development and should be shared with any developers who produce front-end code within our company as well as with vendors who produce code for TMP Worldwide.

* This is a living document that changes often. [Bookmark it](/uid/code-standards) and check back on regular basis.
* [Contributions are encouraged!](#how-to-contribute)

<section id="our-standards" markdown="block">

## 1. General Concepts

As front-end developers at TMP Worldwide, we embrace web standards and keep up-to-date with the latest developments within the web industry. We are committed to giving users the best experience possible by using the latest methods and techniques, while also sticking to the core principles of [Progressive Enhancement](http://en.wikipedia.org/wiki/Progressive_enhancement). In this endeavor, we use the following front-end languages in the majority of our work:

* HTML5
* CSS3
* ECMAScript 5.1 (JavaScript)
* jQuery

### 1.1 Accessibility

> All of your prospective job candidates, regardless of physical or technological capabilities, have the right to learn more about your company and access all job listings. To preserve users' right of universal access, our baseline development standards for all of our web offerings attempt to meet [WCAG 2.0 Level A guidelines](http://www.tmp.com/web-standards/docs/wcag-2-level-a-overview.pdf).
> <cite>&mdash; [TMP Web Standards](http://www.tmp.com/web-standards/)</cite>

* [WCAG 2.0 Documentation](http://www.w3.org/TR/WCAG20/)
* [How to Meet WCAG 2.0](http://www.w3.org/WAI/WCAG20/quickref/)
* [Understanding WCAG 2.0](http://www.w3.org/TR/UNDERSTANDING-WCAG20/)
* [Techniques for WCAG 2.0](http://www.w3.org/TR/WCAG20-TECHS/)

### 1.2 Operating System Support

TMP supports applications on the following operating systems:

* Windows 8/8.1
* Windows 7
* Mac OS 10.10
* iOS 8
* iOS 7
* Android 5.x
* Android 4.x

### 1.3 Browser Support

TMP supports the *current* and *prior* major release versions of all browsers. Corresponding to the date in which your project has launched, we test all development in the following:

* Google Chrome
* Mozilla Firefox
* Safari
* Internet Explorer

### 1.4 HTTP Protocols

HTTP protocols should be omitted unless absolutely necessary.

<p markdown="block">
{% highlight html %}
<!-- Not recommended -->
<script src="http://seostatic.tmp.com/script.js"></script>

<!-- Recommended -->
<script src="//seostatic.tmp.com/script.js"></script>
{% endhighlight %}

{% highlight css %}
/* Not recommended */
.example {
  background: url('http://seostatic.tmp.com/styles.css');
}

/* Recommended */
.example {
  background: url('//seostatic.tmp.com/styles.css');
}
{% endhighlight %}
</p>

### 1.5 File Naming Conventions

#### 1.5.1 General Files

* Only use lowercase alphanumeric characters, hyphens, and underscores.
* Separate sections with hyphens and words with underscores.

{% highlight html %}
<!-- Not recommended -->
Banner Home 1.jpg
banner_custom_l2-1.jpg
logo_1.png
doc-How-To-Apply.pdf

<!-- Recommended -->
home-banner-1.jpg
custom_l2-banner-1.jpg
logo-1.png
doc-how_to_apply.pdf
{% endhighlight %}

#### 1.5.2 Images

* Image filenames should follow this structure: `page-descriptor-#.extension`.
    * **page** &mdash; Name of the page where the image appears.
    * **descriptor** &mdash; Short, concise description of image. Prefer the location of the image on the page. E.g. The first banner image on the homepage is `home-banner-1.jpg`.
    * **#** &mdash; Number of the image in a series.

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

## 2. Optimization

### 2.1 Validation

Code validation is an easy way to spot small issues that you might have missed without having to examine every element. Things like accessibility issues can easily be identified and fixed without much time wasted. 

Check each completed project using the [W3C Markup Validation Service](http://validator.w3.org/) to scan for issues.

### 2.2 Page Load Speed

Loading time is a major contributing factor to page abandonment. So after completion of a site, each front-end developer should test their site using the [Google Developers PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) or [Pingdom](http://tools.pingdom.com/fpt/) for more detailed results. It is as easy as copying and pasting the URL into the text field.

Our desired score should be anything above 70/100, however our absolute lowest score should not fall below 60/100 on both mobile and desktop tests.

While it might not be possible to always achieve a perfect or near-perfect score, we should strive for a site that has the best possible score while maintaining the client requirements. Some issues might be out of our control as front-end developers, but we can take other precautions in order to develop the most efficient site possible.

### 2.3 Performance Budget

As part of our commitment to provide users with the best experience possible, we adhere to a performance budget for sites that we develop. Each front-end developer should monitor site performance during development, and each site goes through a performance audit during the QA process.

Our performance budget is:

* **HTTP Requests:** ~40-50
* **Cumulative Page Weight:** ~450-550 KB

### 2.4 Image Compression

**All** images should be run through an image optimization tool in order to reduce their file sizes for the web. In many cases, image file sizes can be drastically reduced, resulting in faster load times and helping to deliver the best experience possible to the user. This will also contribute to adhering to our [Performance Budget](#performance-budget). There are various tools for this including (but not limited to):

* [Tiny PNG](https://tinypng.com/) (Online Tool, not only png)
* [Compressor.io](https://compressor.io/) (Online Tool)
* [JPEGmini](http://www.jpegmini.com/) (Online Tool, jpg only)
* [RIOT](http://luci.criosweb.ro/riot/) (Standalone Application)

### 2.5 Minify

#### 2.5.1 HTML
Do not minify HTML.

#### 2.5.2 CSS
CSS should be minified if saving memory is worth sacrificing readability. Such occasions would include extremely large CSS files, or when minifying the code would push the site size under the designated performance budget and all other optimizations have been exhausted.

#### 2.5.3 SCSS
SCSS should never be minified. If the server has the ability to tie in a CSS preprocessor, no CSS output file should exist. However, if server-side CSS preprocessing is not available, all compiled CSS should be minified.

#### 2.5.4 Javascript
Javascript should be minified if saving memory is worth sacrificing readability. Such occasions would include extremely large JS files, or when minifying the code would push the site size under the designated performance budget and all other optimizations have been exhausted. Another occasion would include a custom library commonly used on many sites with a solid understanding of how to implement it among all team members.

#### 2.5.5 Third-Party Libraries
All third-party libraries should be minified unless some sort of customization has been made to it and requires readability.

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

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
    * Can a psuedo-element be used in place of a span or div?
    * Can the HTML be restructured to be just as semantic *and* easier to style?

{%  highlight scss %}
/* Not recommended - using a span */
.nav-item {
  padding: .5em;

  span {
    background: url('//fake.path/images/nav-item.png') no-repeat center;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }
}

/* Recommended - using a pseudo-element */
.nav-item {
  padding: .5em;

  &:after {
    background: url('//fake.path/images/nav-item.png') no-repeat center;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }
}
{% endhighlight %}

### 3.2 New Window Links

Inappropriate use of spawning new windows may actually confuse users or make the experience unnecessarily complex or unpleasant. Some mobile devices even cap out the amount of windows one can have open. There are, of course, some good reasons to spawn new windows, but for the most part, the decision to open a link in a window should be left up to the end user to decide.

#### 3.2.1 Accessibility & New Windows

When a developer is required to spawn a new window, it is considered very good form to pepper in some additional helper text for the benefit of those who may be using assistive technology, such as a screen reader.
 
<p markdown="block">
{% highlight html %}
<a href="link.com" target="_blank" alt="">Web Accessibility in Mind <span class="wai">(link opens in new window)</span></a>
{% endhighlight %}

{% highlight scss %}
.wai {
    position: absolute;
    display: block;
    overflow: hidden;
    width: 1px;
    height: 1px;
}
{% endhighlight %}
</p>

#### 3.2.2 Media

User initiated media is another example:

<p markdown="block">
{% highlight html %}
<a href="https://www.youtube.com/watch?v=4wGR4-SeuJ0" target="_blank">
  <span class="wai">Video opens in new window</span>
  <img src="img-path.jpg" alt="">
</a>
{% endhighlight %}

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

## 4. CSS

### 4.1 CSS Coding Style

#### 4.1.1 Author Comment Block

**Always include an author comment block at the top of your CSS.** This is an important resource for any developers who work on the code after you.

<p markdown="block">
{% highlight css %}
/**
 * Authored: 2014-06-18 John Foo <john.foo@tmp.com>
 * Modified: 2014-07-25 Jane Bar <jane.bar@tmp.com> [#12345] Edits to the color scheme
 *           2014-08-10 Jeff Baz <jeff.baz@tmp.com> [#23456, #34567] Added job matching
 */
{% endhighlight %}
</p>

#### 4.1.2 CSS Spacing & Line Breaks

* Use soft tabs with a 2-space indentation. This is important because it's the only way to guarantee that the code will look the same in any environment.
* Align all rule declarations to the left edge of the editor.
* Do not leave white-space at the end of any lines.
* Use a space before `{` in rule declarations.
* Place each property declaration on a separate line.
* Use one space after `:` in property declarations.
* Place spaces after commas in lists.
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

{% highlight css %}
/* Example */
.box {
  background: #fff;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, .5);
  padding: .5em;
}

.box::before {
  content: 'Example';
  display: block;
}

.box + .box {
  margin-top: 1em;
}
{% endhighlight %}

#### 4.1.4 Border-box
Use `box-sizing: border-box` with fallbacks on the HTML element along with `box-sizing: inherit` on the universal selector. When an element does not need border-box, you can apply `box-sizing: content-box`. Since the universal selector uses inheritance, when `content-box` is applied to an element, all of its descendants are converted as well. 

<p markdown="block">
{% highlight css %}
html {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
{% endhighlight %}
</p>

#### 4.1.5 CSS Selectors

##### 4.1.5.1 Specificity

At most, aim for three levels or less of selector specificity, not counting pseudo selectors or media queries.

<p markdown="block">
{% highlight css %}
/* Not recommended */
.one .two .three .four div {
  display: block;
}

/* Recommended */
.one .two div {
  display: block;
}

.one .two div:hover {
  display: none;
}
{% endhighlight %}
</p>

##### 4.1.5.2 Naming

* CSS selectors should be semantic, describing the elements' function. Semantic names do not include:
    * the name of a person.
    * an elements' placement on the page, such as `.left` or `.top`.
* Selectors should be camelCase and use hyphens to separate levels.
    * E.g. `.jobGroup-title`.
* Selectors should not include underscores or any uncommon unicode characters.

<p markdown="block">
{% highlight css %}
/* Not recommended */
.parent__child {}
.parent_child {}
.left-box {}

/* Recommended */
.parentName-childName {}
.relatedLinks {}
{% endhighlight %}
</p>

##### 4.1.5.3 Complexity

* Avoid using overly complex selector combinations and naming schemes.
* Use as few selectors as possible to apply styling, while also keeping the CSS modular and flexible.
* Avoid littering HTML class attributes with selectors that only apply one or two lines of CSS.

<p markdown="block">
{% highlight html %}
<!-- Not recommended -->
<ul class="floatLeft paddingT10 paddingB10 nav-parent">
  <li class="caps paddingL10 paddingR10 marginT10"><a class="bold textRed" href="#link-1">Link 1</a></li>
  <li class="caps paddingL10 paddingR10 marginT10"><a class="bold textRed" href="#link-2">Link 2</a></li>
  <li class="caps paddingL10 paddingR10 marginT10"><a class="bold textRed" href="#link-3">Link 3</a></li>
  <li class="caps paddingL10 paddingR10 marginT10"><a class="bold textRed" href="#link-4">Link 4</a></li>
</ul>

<!-- Recommended -->
<ul class="nav-parent">
  <li><a href="#link-1">Link 1</a></li>
  <li><a href="#link-2">Link 2</a></li>
  <li><a href="#link-3">Link 3</a></li>
  <li><a href="#link-4">Link 4</a></li>
</ul>
{% endhighlight %}
</p>

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

## 5. SASS

SASS is the preprocessor of choice for TMP front-end developers. All preprocessed CSS should be written in SASS to ensure the interoperability of the code.

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

{% highlight html %}
scss/
├── core/        Variables, functions, mixins
├── partials/    Global styles
├── vendor/      Vendor-provided styles, e.g. Flexslider
├── views/       Page-specific styles
└── main.scss    Primary SASS file
{% endhighlight %}

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

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

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

## 7. Images

### 7.1 Image File Types

While extracting images from a creative design, it's important to consider which file type to use. Not all file types are created equal and while some offer images that are smaller, others are better suited to different situations.

* **.jpg** &mdash; The JPEG format is recommended for most of the images that you will come across in a design. They offer lossy compression (reduced file size) while keeping decent image quality, depending on your settings. The JPEG format does not support transparency. Depending on the detail in the image, **a Photoshop JPEG compression setting between 60 (High) and 80 (Very High) is recommended** to keep a good balance between image quality and file size. Use your best judgement.
* **.png** &mdash; PNG is a lossless format (larger file size) and is recommended in situations where the quality of the image is important, or where transparency is required. A possible use-case for a PNG image is a clients' logo, where the quality of the logo is important and may contain transparent sections around it.
* **.svg** &mdash; SVG is an older vector image format that has recently become a more viable option for the web. SVG is recommended for more simple images that need to scale or retain sharpness on a number of different screen densities. SVG also supports transparency. A great use-case for the SVG format would be, again, a logo or icons.

### 7.2 Image Sprites

To aid in adhering to our [Performance Budget](#performance-budget), it's recommended that logos, icons, and other small images be combined into a sprite. This results in a reduction in page requests, as well as a small reduction in file size.

If you're not using a build tool, such as [Grunt](http://gruntjs.com/), you can create a sprite in an image editing program or use a [sprite generator](http://spritegen.website-performance.org/).

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

## 8. Git

### 8.1 Git Commits

When committing changes to a repository, use the standardized commit message template to detail your changes.

To configure Git to use the commit template:

1. [Download the standardized commit message template](/docs/commit-template.txt) and place it in a permanent location on your local hard drive.
1. From your shell, type `git config --global commit.template path/to/commit/message`. Be sure to replace `path/to/commit/message` with the actual path to the commit message template.

When you make a new commit, do not use the `-m` option. Instead just use `git commit` and let Git create a new commit message using the template.

[Return to Table of Contents](#table-of-contents){: .back-to-toc }

## 9. Recommended Tools

### 9.1 Editors

* [Sublime Text 2/3](http://www.sublimetext.com/)

#### 9.1.1 Editor Plugins

Below are recommended plugins listed for each recommended editor (if they support plugins).

##### 9.1.1.1 Sublime Text

* [Package Control](https://sublime.wbond.net/)
* [EditorConfig](https://sublime.wbond.net/packages/EditorConfig)
    * [Download our standard EditorConfig file](/docs/editorconfig.txt), rename it to `.editorconfig`, and place it in your project root.
* [Emmet](https://sublime.wbond.net/packages/Emmet)
* [HTML-CSS-JS Prettify](https://sublime.wbond.net/packages/HTML-CSS-JS%20Prettify)
* [Nettuts+ Fetch](https://sublime.wbond.net/packages/Nettuts%2B%20Fetch)
* [SASS](https://sublime.wbond.net/packages/Sass)
* [SublimeLinter](https://sublime.wbond.net/packages/SublimeLinter)
    * [SublimeLinter-contrib-scss-lint](https://sublime.wbond.net/packages/SublimeLinter-contrib-scss-lint)
    * [SublimeLinter-csslint](https://sublime.wbond.net/packages/SublimeLinter-csslint)
    * [SublimeLinter-html-tidy](https://sublime.wbond.net/packages/SublimeLinter-html-tidy)
    * [SublimeLinter-jshint](https://sublime.wbond.net/packages/SublimeLinter-jshint)

## 10. Required Reading

* [A Dao of Web Design by John Allsopp](http://alistapart.com/article/dao)

## 11. (Highly) Recommended Reading

* [Designing with Web Standards (3rd Edition) by Jeffery Zeldman](http://www.amazon.com/Designing-Web-Standards-3rd-Edition/dp/0321616952)
* [Developing with Web Standards by John Allsopp](http://www.amazon.com/Developing-Web-Standards-John-Allsopp/dp/0321646924)
* [Don't Make Me Think: A Common Sense Approach to Web Usability (3rd Edition) by Steve Krug](http://www.amazon.com/Dont-Make-Think-Revisited-Usability/dp/0321965515/ref=dp_ob_title_bk)
* [JavaScript: The Good Parts by Douglas Crockford](http://www.amazon.com/JavaScript-Good-Parts-Douglas-Crockford/dp/0596517742)
* [DOM Scripting: Web Design with JavaScript and the Document Object Model by Jeremy Keith and Jeffery Sambells](http://www.amazon.com/DOM-Scripting-Design-JavaScript-Document/dp/1430233893)
* [Designing with Progressive Enhancement: Building the Web that Works for Everyone by by Todd Parker, Scott Jehl, Maggie Costello Wachs, Patty Toland](http://www.amazon.com/Designing-Progressive-Enhancement-Building-Everyone/dp/0321658884/ref=sr_1_1?s=books&ie=UTF8&qid=1422386916&sr=1-1&keywords=progressive+enhancement)
* [Mobile First by Luke Wroblewski](http://www.abookapart.com/products/mobile-first)
* [Responsive Web Design (2nd Edition) by Ethan Marcotte](http://www.abookapart.com/products/responsive-web-design)
* [Adaptive Web Design (First Edition) by Aaron Gustafson](http://adaptivewebdesign.info/1st-edition/)

## 12. Daily Reading

* [A List Apart](http://alistapart.com/)
* [Sitepoint](http://sitepoint.com)

[Return to Table of Contents](#table-of-contents){: .back-to-toc }
