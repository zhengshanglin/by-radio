/*!
 * Radio.js
 * Copyright (c) 2016 xyzhanjiang & contributors
 *
 * Licensed under the MIT License.
 *
 * @author xyzhanjiang <xyzhanjiang@qq.com>
 */

var Radio = function(element, options) {
  this.$el           = $(element)
  this.options       = $.extend({}, Radio.DEFAULTS, options)
  this.isInitialized = null
}

/*
 * @description init
 */
Radio.prototype.init = function() {
  var $parent
    , el = this.$el[0]
    , id = el.id
    , type = this.options.type || el.type

  if (this.isInitialized) return

  $parent = this.$el.wrap('<div class="by-' + type + '">').parent()

  if (el.className) {
    $parent.addClass(el.className)
    el.className = ''
  }

  if (!id) {
    id = 'by-radio-' + new Date().getTime()
    el.id = id
  }

  $parent.append('<label for="' + id + '"></label>')
  this.isInitialized = true
}

/*
 * @description destroy
 */
Radio.prototype.destroy = function() {
  if (!this.isInitialized) return

  this.$el
    .addClass(this.$el.parent()[0].className)
    .removeClass('by-' + this.$el[0].type)
    .next('label')
    .remove()

  this.$el.unwrap()
  this.isInitialized = false
}

function Plugin(option) {
  return this.each(function() {
    var $this   = $(this)
    var data    = $this.data('byRadio')
    var options = $.extend({}, $this.data(), typeof option === 'object' && option)

    if (!data) $this.data('byRadio', (data = new Radio(this, options)))
    if (typeof option === 'string' && typeof data[option] === 'function') data[option]()
    else data.init()
  })
}

$.fn.byRadio = Plugin

$(window).on('load.by.radio', function() {
  Plugin.call($('[data-init="by-radio"]'))
})
