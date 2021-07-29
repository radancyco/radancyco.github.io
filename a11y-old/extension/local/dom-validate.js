javascript: (function () {

  function c(a, b) {

    var c = document.createElement("textarea");
    c.name = a;
    c.value = b;
    d.appendChild(c);

  }

  var e = (function (a) {

    for (var b = "", a = a.firstChild; a; ) {

      switch (a.nodeType) {

        case Node.ELEMENT_NODE:
        b += a.outerHTML;
        break;

        case Node.TEXT_NODE:
        b += a.nodeValue;
        break;

        case Node.CDATA_SECTION_NODE:
        b += "<![CDATA[" + a.nodeValue + "]]>";
        break;

        case Node.COMMENT_NODE:
        b += "<!--" + a.nodeValue + "-->";
        break;

        case Node.DOCUMENT_TYPE_NODE:
        b += "<!DOCTYPE " + a.name + ">\n";
        }

        a = a.nextSibling;

    }

    return b;

  })(document),

  d = document.createElement("form");
  d.method = "POST";
  d.action = "https://validator.w3.org/nu/";
  d.enctype = "multipart/form-data";
  d.target = "_blank";
  d.acceptCharset = "utf-8";
  c("showsource", "yes");
  c("content", e);
  document.body.appendChild(d);
  d.submit();

})();
