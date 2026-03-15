---
layout: default
title: Contents
description: Proudly Serving table of contents.
permalink: /contents/
redirect_from:
  - /download/
  - /manuscript/
  - /book/
---

{% if site.contents %}
  <div class="container">
    <div class="row">
      <div class="col-12">
        {% for section in site.data.contents.docs %}
          <h3>{{ section.name | capitalize }}</h3>
          <div class="card-group mt-4 mb-5">
            {% for chapter in section.chapters %}
              {% for item in site.contents %}
                {% if item.title == chapter %}
                  {% include card-contents.html %}
                {% endif %}
              {% endfor %}
            {% endfor %}
          </div>
        {% endfor %}
      </div>
    </div>
  </div>
{% endif %}