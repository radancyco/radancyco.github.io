
## User Interface Developmemt

* [Front-end Standards and Guidelines](/uid/code-standards/) - Best practices for HTML, CSS, and JavaScript development, as well as other industry wide best practices that have been adopted by TMP Worldwide developers
* [Resource Library](/tmp-resource-library/) - A library of common design patterns, resources, and functional code found on Talentbrew and many of our other custom crafted websites.
* [Code Review Process](/uid/code-review/) - Provides a record of the different resources used to create the code standards guide.
* [Photoshop Guidelines](/uid/photoshop-guidelines/) - Guidelines for preparing a photoshop file to be handed off to development teams.

## Team Articles

<ul>
{% for post in site.posts %}
    
	<li><a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: '%B %d, %Y' }}</a></li>

{% endfor %}
</ul>