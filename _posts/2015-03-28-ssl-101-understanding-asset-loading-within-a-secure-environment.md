---
layout: default
title: "SSL 101: Understanding asset loading within a secure environment"
---

# {{ page.title }}

In my experience, I have  found that there is generally a lot of confusion surrounding the loading of assets within a web page that exists within a secure environment. To help eliminate that confusion, here is a small guide that will hopefully explain which elements are and are not affected by SSL. It really comes down to two things: Outbound and Inbound.

##Outbound

Outbound refers to any hyperlinks or form posts that leave the page.

The following is a non-secure hyperlink to <code>http://archive.tmp.com</code>. The secure environment that this link renders within (the page you are now reading - look in the address bar) has no bearing on it. Outbound links will work as they always have. There is no need to alter them programatically. In fact, the web is built on hyperlinks, so it would be silly to even suggest to our clients that they set up a secure environment to link to or only allow them to link to other secure pages.

<a href="http://archive.tmp.com">http://archive.tmp.com</a>

## &#10003; Solution

Do nothing!

<hr/>

## Inbound

Inbound refers to any asset that is pulled into and contributes to the rendering of that page. A couple of inbound examples include:

### Images

The following image (that is one crazy looking contraption) is loaded in from a non-secure environment (<code>http://archive.tmp.com/images/content-our-work-overview.jpg</code>)

<img src="http://archive.tmp.com/images/content-our-work-overview.jpg" alt=""/>

It will likely load for you (this is considered <a href="https://developer.mozilla.org/en-US/docs/Security/MixedContent#Mixed_passive.2Fdisplay_content">passive mixed content</a>), however, all browsers will complain about it in some form or another (some more obnoxiously than others, I might add) and user can still block this if they wish. Examples:

### Chrome

<img src="https://dl.dropboxusercontent.com/u/58819/ui-tmp-com/web/img/security-chrome.png" alt=""/>

In console, you will also see the following warning:

The page at "https://dl.dropboxusercontent.com/u/58819/ui-tmp-com/web/articles/ssl-101.html" was loaded over HTTPS, but displayed insecure content from "http://archive.tmp.com/images/content-our-work-overview.jpg": this content should also be loaded over HTTPS.

### Internet Explorer (Older)

<img src="https://dl.dropboxusercontent.com/u/58819/ui-tmp-com/web/img/security-ie.jpg" alt=""/>

## &#10003; Solution

If your assets are hosted within a secure location, use <code>https</code> as a default. <a href="http://www.paulirish.com/2010/the-protocol-relative-url/">Protocol-relative URLs</a> may also be acceptable.

<hr/>

### Scripts

Let's try loading a third-party script library, such as jQuery, from a non-secure location.

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>

<code>&lt;script src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"&gt;&lt;/script&gt;</code>

We'll also write a simple selector that will change the color of the text below from red to green.

<code>$("#script-test").addClass("make-green");</code>

<p id="script-test">I &#9829; web standards!</p>

<script>$("#script-test").addClass("make-green");</script>

<p>In many browsers, the text, "I &#9829; web standards!", will remain red. This means that the script library has not loaded. The security policies that revolve around scripting within a secure page (and several other elemets - see list below) may be much more stringent. Scripts from a non-secure location will simply not load, and your script based functionality will fail. Sometimes siliently, as was the case with Advanced Job Search from within Facebook Job Search (Ajax requests must also come from a secure location).</p>

<p>Indeed, here is the error being thrown in Chrome's console:</p>

<p class="alert">[blocked] The page at "https://dl.dropboxusercontent.com/u/58819/ui-tmp-com/web/articles/ssl-101.html" was loaded over HTTPS, but ran insecure content from "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js": this content should also be loaded over HTTPS.</p>

<h3>Other Elements</h3>

<p>The following elements may also fail to pull in or throw warnings on non-secure assets, media and/or external pages:</p>

<ul>
	<li>audio</li>
	<li>embed</li>
	<li>frameset</li>
	<li>iframe</li>
	<li>link</li>
	<li>object</li>
	<li>source</li>
	<li>video</li>
</ul>

<h2 class="hdr-solution">&#10003; Solution</h2>

<p>Use <a href="http://www.paulirish.com/2010/the-protocol-relative-url/">protocol-relative URLs</a> or <code>https</code> as a default in these cases.</p>

<p><b>Note:</b> Pages that you would like to pull into an <code>iframe</code> could very well have extra measures applied to them by their server administrators. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options">X-Frame-Options</a> response header for more information. The same goes for other cross-site server requests. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">HTTP Access Control (CORS)</a>.</p>

<p>So, there you go! It's not that hard to wrap your head around it when you come at it like that! Hope this helps! &#9786;</p>

<hr/>

<img src="https://www.gravatar.com/avatar/89e429d4a3effa9601cd19a851c0003e?s=200" alt="Michael Spellacy" style="width: 100px; height: 100px; border-radius: 50%;">

<p>I am Michael "Spell" Spellacy, Director of User Interface Design and Development at <a href="http://www.tmp.com/">TMP Worldwide</a>. If you have any questions, feel free to contact me on <a href="https://github.com/michaelspellacy">Github</a> or follow me on <a href="https://twitter.com/spellacy">Twitter</a>.</p>