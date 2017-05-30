
## User Interface Developmemt

* [Front-end Standards and Guidelines](/uid/code-standards/) - Best practices for HTML, CSS, and JavaScript development, as well as other industry wide best practices that have been adopted by TMP Worldwide developers
* [Resource Library](/tmp-resource-library/) - A library of common design patterns, resources, and functional code found on Talentbrew and many of our other custom crafted websites.
* [Code Review Process](/uid/code-review/) - Provides a record of the different resources used to create the code standards guide.
* [Photoshop Guidelines](/uid/photoshop-guidelines/) - Guidelines for preparing a photoshop file to be handed off to development teams.

## Team Articles

Enjoy some of our teams thoughts on various web topics.

<ul>
{% for post in site.posts %}
    
	<li><a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: '%B %d, %Y' }}</a></li>

{% endfor %}
</ul>

## Tutorials

We like to teach at TMP. Here are but a few topics we have covered for our collegues over the years.

<ul>
	<li><a href="/uid/rwd-school-of-rock/">Responsive Web Design: School of Rock By Stephanie Plumeri & Michael Spellacy</a></li>
	<li><a href="/uid/respond-ie8/">Respond II: Responding to IE8 By Stephanie Plumeri</a></li>
	<li><a href="/uid/respond">Respond: Responsive Design 101 By Stephanie Plumeri</a></li>
</ul>

<ul>
{% for post in site.posts %}
    
	<li><a href="{{ post.url }}">{{ post.title }} - {{ post.date | date: '%B %d, %Y' }}</a></li>

{% endfor %}
</ul>

## Reported Browser Issues

Responsible web citizens report bugs to browser vendors. Here are a couple that we have dropped.

<ul>
	<li><a href="/bugs/ios-tappy-bug.html">YouTube embed not working in iOS 8 Safari and Chrome - April 30, 2015</a></li>
	<li><a href="/bugs/chrome-crossorigin.html">Performance: Chrome Downloads 2 Poster Images When Crossorigin Attribute (Anonymous) Present on Video - September 26, 2016</a></li>
</ul>