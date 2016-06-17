---
layout: default
title: Development Standards, Guidelines, Tools and Best Practices
---

# Development Standards, Guidelines, Tools and Best Practices

Welcome to TMP Worldwide's open development resource on GitHub! We believe in open standards, transparency, collaboration and want to give back to a community that has given us so much! Feel free to contribute to these documents or fork and use as a basis for your own development standards.

## User Interface Developmemt

{% include ui-toc.md %}

## Articles

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: '%B %d, %Y' }}</a>
    </li>
  {% endfor %}
</ul> 