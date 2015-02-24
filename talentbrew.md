---
layout: default
---

![TMP Worldwide, LLC](assets/img/hdr-logo.png)

# TalentBrew Development Standards and Guidelines

## Abstract

This document presents boilerplate markup/styling for common TalentBrew features. This code is meant to be very basic and easily modified to fit the needs of many designs.

* This is a living document and is likely to change. Read it often.
* [Contributions are encouraged!](#how-to-contribute)

<div class="toc" markdown="block">
## Table of Contents
1. [Front-end Standards and Guidelines](../)
1. [Common TalentBrew Features](#common-talentbrew-features)<span>+</span>
    1. [Search](#search)
    1. [Job Groups](#job-groups)
1. [Schemas](#schemas)<span>+</span>
    1. [Job Posting Schema](#job-posting-schema)
    1. [Open Graph Schema](#open-graph-schema)
    1. [Twitter Card Schema](#twitter-card-schema)
    1. [DC Schema](#dc-schema)
1. [Keepers of the Standards Guide](#keepers-of-the-standards-guide)
1. [Contributors](#contributors)<span>+</span>
    1. [How to Contribute](#how-to-contribute)
</div>

## Common Talentbrew Features

The recommended boilerplate code for specific sections of a TalentBrew site can be found below. This code is only a boilerplate, so feel free to modify it to your needs.

### Search

#### Search HTML

{% highlight html %}
<div class="search">
  <div class="search-basic"><!--**SearchTag**--></div>
  <div class="search-advanced"><!--**AdvancedSearchTag**--></div>
  <span class="search-toggle" tabindex="0">Advanced Search</span>
</div>
{% endhighlight %}

#### Search CSS

{% highlight css %}
.search-advanced {
  display: none;
}

.search.open .search-basic {
  display: none;
}

.search.open .search-advanced {
  display: block;
}
{% endhighlight %}

#### Search SASS

{% highlight scss %}
.search {
  &.open {
    .search-basic {
      display: none;
    }

    .search-advanced {
      display: block;
    }
  }
}

.search-advanced {
  display: none;
}
{% endhighlight %}

#### Search JS

{% highlight js %}
$(function() {
  var search       = $('.search'),
      searchToggle = $('.search-toggle');

  searchToggle.click(function() {
    (!search.hasClass('open') ? search.addClass('open') : search.removeClass('open'));
  }).keypress(function(event) {
    if(event.which == 13) $(this).trigger('click');
  });
});
{% endhighlight %}

### Job Groups

#### Job Groups HTML

Aside from the search, job group dropdowns are the only way for a job seeker to navigation a TalentBrew. For this reason, it's important that they are marked up within a `<nav>` element.

{% highlight html %}
<nav class="jobGroups">
  <div class="jobGroup jobGroup-loc">
    <span class="jobGroup-title" tabindex="0">Browse Jobs by Location</span>
    <div class="jobGroup-list">
      <!--**StateListHTML**-->
    </div>
  </div>
  <div class="jobGroup jobGroup-cat">
    <span class="jobGroup-title" tabindex="0">Browse Jobs by Category</span>
    <div class="jobGroup-list">
      <!--**CategoryListHTML**-->
    </div>
  </div>
  <div class="jobGroup jobGroup-grp">
    <span class="jobGroup-title" tabindex="0">Browse Jobs by Group</span>
    <div class="jobGroup-list">
      <!--**CategoryPlusStateListHTML**-->
    </div>
  </div>
</nav>
{% endhighlight %}

#### Job Groups CSS

{% highlight css %}
.jobGroup-list {
  display: none;
}

.jobGroup.open .jobGroup-list {
  display: block;
}
{% endhighlight %}

#### Job Groups SASS

{% highlight scss %}
.jobGroup {
  &.open {
    .jobGroup-list {
      display: block;
    }
  }
}

.jobGroup-list {
  display: none;
}
{% endhighlight %}

#### Job Groups JS

{% highlight js %}
$(function() {
  var jobGroups = $('.jobGroup');
  
  $('.jobGroup-title').click(function() {
    var parent = $(this).parent();
    
    if(!parent.hasClass('open')) {
      jobGroups.removeClass('open');
      parent.addClass('open');
    } else {
      parent.removeClass('open');
    }
  }).keypress(function(event) {
    if(event.which == 13) $(this).trigger('click');
  });
});
{% endhighlight %}

[Back to ToC](#table-of-contents){: .back-to-toc }

## Schemas

### Job Posting Schema

{% highlight html %}
<article class="job" itemscope itemtype="http://schema.org/JobPosting">
  <!-- schema.org markup -->
  <meta itemprop="datePosted" content="<!--**CreateDateTime**-->"/>
  <span itemprop="jobLocation" itemscope  itemtype="http://schema.org/Place">
    <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">
      <meta itemprop="addressLocality" content="<!--**LocationCity**-->"/>
      <meta itemprop="addressRegion" content="<!--**LocationStateAbbreviation**-->"/>
    </span>
  </span>
  <span itemprop="hiringOrganization" itemscope itemtype="http://schema.org/Organization">
    <meta itemprop="name" content="<!--**CompanyName**--> "/>
  </span>
  <meta itemprop="occupationalCategory" content="<!--**CategoryTitle**-->"/>
  <!-- /schema.org markup -->
  <!-- ... job info and description markup here ... -->
</article>
{% endhighlight %}

### Open Graph Schema

{% highlight html %}
<meta property="og:title" content="title goes here">
<meta property="og:type" content="website">
<meta property="og:url" content="http://urlgoeshere.com">
<meta property="og:image" content="http://linktoimage.jpg">
<meta property="og:site_name" content="Company Name">
<meta property="og:description" content="description goes here">
{% endhighlight %}

### Twitter Card Schema

{% highlight html %}
<meta name="twitter:card" content="summary">
<meta name="twitter:url" content="http://website.com">
<meta name="twitter:title" content="Title Goes Here">
<meta name="twitter:description" content="description goes here">
<meta name="twitter:image" content="http://imagegoeshere.com/image.jpg">
{% endhighlight %}

### DC Schema

{% highlight html %}
<link rel="schema.DC" href="http://purl.org/dc/elements/1.1/">
<link rel="schema.DCTERMS" href="http://purl.org/dc/terms/">
<meta name="DC.title" lang="en" content="title goes here">
<meta name="DC.creator" content="TMP Worldwide">
<meta name="DCTERMS.issued" scheme="DCTERMS.W3CDTF" content="2014-06-08">
<meta name="DCTERMS.abstract" content="description goes here">
<meta name="DC.format" scheme="DCTERMS.IMT" content="text/html">
<meta name="DC.type" scheme="DCTERMS.DCMIType" content="Text">
{% endhighlight %}

[Back to ToC](#table-of-contents){: .back-to-toc }

## Keepers of the Standards Guide

* [Seth "Slopez" Lopez](https://github.com/sethlopezme)
* [Stephanie "Plum" Plumeri](https://github.com/s-plum)
* [Michael "Spell" Spellacy](https://github.com/michaelspellacy)

[Back to ToC](#table-of-contents){: .back-to-toc }

## Contributors

[The TMP Worldwide UID Team](https://github.com/tmpworldwide/ui-dev-standards/graphs/contributors)

### How to Contribute

* Suggest a change or offer your opinion by [opening or commenting on an issue](https://guides.github.com/features/issues/).
* [Fork](https://guides.github.com/activities/forking/) the UI Dev Standards project, make some changes, and [create a pull request](https://guides.github.com/activities/forking/#making-a-pull-request).
* New to GitHub? [Learn the basics with the guide](https://guides.github.com/activities/hello-world/), and [learn the GitHub flow](https://guides.github.com/introduction/flow/).

[Back to ToC](#table-of-contents){: .back-to-toc }
