(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=script&lang=js&":
/*!***********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--2!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/app.vue?vue&type=script&lang=js& ***!
  \***********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../plugins/vuetify */ "./src/plugins/vuetify.js");
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* eslint-disable no-console */



function httpCallAuthenticated(url, options) {
  requirejs(["DS/WAFData/WAFData"], function (WAFData) {
    WAFData.authenticatedRequest(url, options);
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  name: "App",
  components: {},
  data: function data() {
    return {
      // Help the user know something is loading
      loadingbar: true,
      // Used to log information
      snackbarMsg: "",
      snackbar: false,
      // Data loaded from DS and from preferences
      tenantId: -1,
      tenants: []
    };
  },
  computed: {
    message: function message() {
      return this.$store.state.message;
    }
  },
  // As soon as we get mounted start searching the tenant list
  mounted: function mounted() {
    var _this = this;

    var that = this;
    that.loadingbar = true;
    _plugins_vuetify__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$on("onSearch", function (txt) {
      that.search = txt;
    });
    _plugins_vuetify__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$on("reloadwidget", function () {
      that.reload();
    }); // Start loading bar aswell

    if (widget.id === undefined) {
      setTimeout(function () {
        that.tenantDataLoaded([{
          id: -1
        }]);
      }, 500);
    } else {
      requirejs(["DS/i3DXCompassServices/i3DXCompassServices"], function (i3DXCompassServices) {
        i3DXCompassServices.getPlatformServices({
          platformId: undefined,
          onComplete: _this.tenantDataLoaded
        });
      });
    }
  },
  methods: {
    log: function log(msg) {
      this.snackbarMsg = msg;
      this.snackbar = true;
    },
    getCSRF: function getCSRF(_onComplete, _onFailure) {
      var that = this; // Retrive CSRF ticket

      var _3dspace = that.tenants[that.tenantId]["3DSpace"];
      httpCallAuthenticated(_3dspace + "/resources/v1/application/CSRF", {
        onComplete: function onComplete(response) {
          var res = JSON.parse(response);

          _onComplete(res.csrf.value);
        },
        onFailure: function onFailure(response) {
          that.log(response);

          _onFailure();
        }
      });
    },
    reload: function reload() {
      var that = this;
      that.loadingbar = true;
      that.tenantId = widget.getValue("_CurrentTenantID_");

      if (widget.id !== undefined) {
        // use all the api stuff
        that.loadingbar = false;
      } else {
        // simulate some data so we can test locally
        that.loadingbar = false;
      }
    },
    // Load the tenant data & its services URLs based on the ID
    tenantDataLoaded: function tenantDataLoaded(data) {
      this.tenants = [];
      var _TenantOpts = [];
      var j = 0; // Load all the tenants

      for (var i = 0; i < data.length; i++) {
        if (data[i]["3DSpace"] === undefined) continue;

        _TenantOpts.push({
          value: "".concat(j++),
          label: "".concat(data[i].platformId, " - ").concat(data[i].displayName)
        });

        this.tenants.push(data[i]);
      } // Setup your preferences...


      widget.addPreference({
        name: "_CurrentTenantID_",
        type: "list",
        label: "Tenant",
        defaultValue: "0",
        options: _TenantOpts
      }); // Loads the prefs if available

      _plugins_vuetify__WEBPACK_IMPORTED_MODULE_0__["EventBus"].$emit("reloadwidget");
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=style&index=0&lang=css&":
/*!**************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/app.vue?vue&type=style&index=0&lang=css& ***!
  \**************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(false);
// Module
exports.push([module.i, "\nhtml, body {\n    overflow-y: auto !important;\n    width: 100%;\n    padding: 0;\n    margin: 0;\n    background-color:#ffffff;\n}\n", ""]);


/***/ }),

/***/ "./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=style&index=0&lang=css&":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/app.vue?vue&type=style&index=0&lang=css& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vuetify-loader/lib/loader.js!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=style&index=0&lang=css&");

if (typeof content === 'string') {
  content = [[module.i, content, '']];
}

var options = {}

options.insert = "head";
options.singleton = false;

var update = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js")(content, options);

if (content.locals) {
  module.exports = content.locals;
}

if (true) {
  if (!content.locals) {
    module.hot.accept(
      /*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vuetify-loader/lib/loader.js!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=style&index=0&lang=css&",
      function () {
        var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vuetify-loader/lib/loader.js!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=css& */ "./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=style&index=0&lang=css&");

        if (typeof newContent === 'string') {
          newContent = [[module.i, newContent, '']];
        }
        
        update(newContent);
      }
    )
  }

  module.hot.dispose(function() { 
    update();
  });
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=template&id=6c0a0fc1&":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib??vue-loader-options!./src/components/app.vue?vue&type=template&id=6c0a0fc1& ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-content",
        [
          _c("v-progress-linear", {
            attrs: {
              color: "blue accent-4",
              indeterminate: "",
              height: "10",
              active: _vm.loadingbar,
              absolute: "",
              app: ""
            }
          }),
          _vm._v(" "),
          _c(
            "v-snackbar",
            {
              model: {
                value: _vm.snackbar,
                callback: function($$v) {
                  _vm.snackbar = $$v
                },
                expression: "snackbar"
              }
            },
            [
              _vm._v(
                "\n            " + _vm._s(_vm.snackbarMsg) + "\n            "
              ),
              _c(
                "v-btn",
                {
                  attrs: { color: "grey", text: "" },
                  on: {
                    click: function($event) {
                      _vm.snackbar = false
                    }
                  }
                },
                [_vm._v("\n                Close\n            ")]
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-btn",
            {
              on: {
                click: function($event) {
                  return _vm.connectserver()
                }
              }
            },
            [_vm._v(" Click me! ")]
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./src/components/app.vue":
/*!********************************!*\
  !*** ./src/components/app.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=6c0a0fc1& */ "./src/components/app.vue?vue&type=template&id=6c0a0fc1&");
/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ "./src/components/app.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.vue?vue&type=style&index=0&lang=css& */ "./src/components/app.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VApp */ "./node_modules/vuetify/lib/components/VApp/index.js");
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VContent__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VContent */ "./node_modules/vuetify/lib/components/VContent/index.js");
/* harmony import */ var vuetify_lib_components_VProgressLinear__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VProgressLinear */ "./node_modules/vuetify/lib/components/VProgressLinear/index.js");
/* harmony import */ var vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! vuetify/lib/components/VSnackbar */ "./node_modules/vuetify/lib/components/VSnackbar/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* vuetify-loader */






_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VApp: vuetify_lib_components_VApp__WEBPACK_IMPORTED_MODULE_5__["VApp"],VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_6__["VBtn"],VContent: vuetify_lib_components_VContent__WEBPACK_IMPORTED_MODULE_7__["VContent"],VProgressLinear: vuetify_lib_components_VProgressLinear__WEBPACK_IMPORTED_MODULE_8__["VProgressLinear"],VSnackbar: vuetify_lib_components_VSnackbar__WEBPACK_IMPORTED_MODULE_9__["VSnackbar"]})


/* hot reload */
if (true) {
  var api = __webpack_require__(/*! ./node_modules/vue-hot-reload-api/dist/index.js */ "./node_modules/vue-hot-reload-api/dist/index.js")
  api.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js"))
  if (api.compatible) {
    module.hot.accept()
    if (!api.isRecorded('6c0a0fc1')) {
      api.createRecord('6c0a0fc1', component.options)
    } else {
      api.reload('6c0a0fc1', component.options)
    }
    module.hot.accept(/*! ./app.vue?vue&type=template&id=6c0a0fc1& */ "./src/components/app.vue?vue&type=template&id=6c0a0fc1&", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=6c0a0fc1& */ "./src/components/app.vue?vue&type=template&id=6c0a0fc1&");
(function () {
      api.rerender('6c0a0fc1', {
        render: _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["render"],
        staticRenderFns: _app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]
      })
    })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this))
  }
}
component.options.__file = "src/components/app.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./src/components/app.vue?vue&type=script&lang=js&":
/*!*********************************************************!*\
  !*** ./src/components/app.vue?vue&type=script&lang=js& ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_2_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/babel-loader/lib??ref--2!../../node_modules/vuetify-loader/lib/loader.js!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_2_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./src/components/app.vue?vue&type=style&index=0&lang=css&":
/*!*****************************************************************!*\
  !*** ./src/components/app.vue?vue&type=style&index=0&lang=css& ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/style-loader/dist!../../node_modules/css-loader/dist/cjs.js!../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../node_modules/vuetify-loader/lib/loader.js!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/index.js!./node_modules/css-loader/dist/cjs.js!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_style_loader_dist_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_dist_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_dist_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_dist_index_js_node_modules_css_loader_dist_cjs_js_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./src/components/app.vue?vue&type=template&id=6c0a0fc1&":
/*!***************************************************************!*\
  !*** ./src/components/app.vue?vue&type=template&id=6c0a0fc1& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../node_modules/vuetify-loader/lib/loader.js!../../node_modules/vue-loader/lib??vue-loader-options!./app.vue?vue&type=template&id=6c0a0fc1& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js!./node_modules/vue-loader/lib/index.js?!./src/components/app.vue?vue&type=template&id=6c0a0fc1&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_6c0a0fc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/widget */ "./src/lib/widget.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var _components_app_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/app.vue */ "./src/components/app.vue");
/* harmony import */ var _plugins_vuetify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./plugins/vuetify */ "./src/plugins/vuetify.js");
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./store */ "./src/store/index.js");


 // eslint-disable-next-line import/no-duplicates


 // eslint-disable-next-line import/no-duplicates



function start() {
  _lib_widget__WEBPACK_IMPORTED_MODULE_0__["x3DDashboardUtils"].disableCSS(true);
  window.title = "Tablue Vue";
  widget.setTitle(window.title);
  var main = new vue__WEBPACK_IMPORTED_MODULE_1__["default"]({
    store: _store__WEBPACK_IMPORTED_MODULE_4__["store"],
    vuetify: _plugins_vuetify__WEBPACK_IMPORTED_MODULE_3__["default"],
    render: function render(h) {
      return h(_components_app_vue__WEBPACK_IMPORTED_MODULE_2__["default"]);
    }
  });
  main.$mount("app");
}
/**
 * Entry point for both standalone & 3DDashboard modes
 * Assuming widget object has been loaded through widget-starter module
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  widget.addEvent("onLoad", function () {
    start();
  });
  widget.addEvent("onRefresh", function () {
    _plugins_vuetify__WEBPACK_IMPORTED_MODULE_3__["EventBus"].$emit("reloadwidget");
  });
  widget.addEvent("onSearch", function (searchQuery) {
    _plugins_vuetify__WEBPACK_IMPORTED_MODULE_3__["EventBus"].$emit("onSearch", searchQuery);
  });
  widget.addEvent("onResetSearch", function () {
    _plugins_vuetify__WEBPACK_IMPORTED_MODULE_3__["EventBus"].$emit("onSearch", "");
  });
});

/***/ }),

/***/ "./src/plugins/vuetify.js":
/*!********************************!*\
  !*** ./src/plugins/vuetify.js ***!
  \********************************/
/*! exports provided: EventBus, default, CSVToArray */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventBus", function() { return EventBus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CSVToArray", function() { return CSVToArray; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vuetify_lib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuetify/lib */ "./node_modules/vuetify/lib/index.js");
/* harmony import */ var _mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @mdi/font/css/materialdesignicons.css */ "./node_modules/@mdi/font/css/materialdesignicons.css");
/* harmony import */ var _mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_mdi_font_css_materialdesignicons_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var material_design_icons_iconfont_dist_material_design_icons_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! material-design-icons-iconfont/dist/material-design-icons.css */ "./node_modules/material-design-icons-iconfont/dist/material-design-icons.css");
/* harmony import */ var material_design_icons_iconfont_dist_material_design_icons_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(material_design_icons_iconfont_dist_material_design_icons_css__WEBPACK_IMPORTED_MODULE_3__);




vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuetify_lib__WEBPACK_IMPORTED_MODULE_1__["default"]);
var EventBus = new vue__WEBPACK_IMPORTED_MODULE_0__["default"]();
/* harmony default export */ __webpack_exports__["default"] = (new vuetify_lib__WEBPACK_IMPORTED_MODULE_1__["default"]({
  icons: {
    iconfont: "mdi"
  }
}));
function CSVToArray(strData, strDelimiter) {
  strDelimiter = strDelimiter || ",";
  var objPattern = new RegExp( // Delimiters.
  "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" + // Quoted fields.
  "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" + // Standard fields.
  "([^\"\\" + strDelimiter + "\\r\\n]*))", "gi");
  var arrData = [[]];
  var arrMatches = null;
  var strMatchedValue = null;

  while (arrMatches = objPattern.exec(strData)) {
    var strMatchedDelimiter = arrMatches[1];

    if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) {
      arrData.push([]);
    }

    if (arrMatches[2]) {
      strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
    } else {
      strMatchedValue = arrMatches[3];
    }

    arrData[arrData.length - 1].push(strMatchedValue);
  } // Return the parsed data.


  return arrData;
}

/***/ }),

/***/ "./src/store/index.js":
/*!****************************!*\
  !*** ./src/store/index.js ***!
  \****************************/
/*! exports provided: store */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.runtime.esm.js");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0__["default"].use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]); // init store

var store = new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  state: {},
  mutations: {},
  getters: {}
});

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vc3JjL2NvbXBvbmVudHMvYXBwLnZ1ZSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hcHAudnVlPzhjMDkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXBwLnZ1ZT80OGE5Iiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FwcC52dWU/MmE0MyIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hcHAudnVlIiwid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FwcC52dWU/N2JjYSIsIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9hcHAudnVlPzFmMWUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvYXBwLnZ1ZT9hNTMwIiwid2VicGFjazovLy8uL3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9wbHVnaW5zL3Z1ZXRpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL2luZGV4LmpzIl0sIm5hbWVzIjpbInN0YXJ0IiwieDNERGFzaGJvYXJkVXRpbHMiLCJkaXNhYmxlQ1NTIiwid2luZG93IiwidGl0bGUiLCJ3aWRnZXQiLCJzZXRUaXRsZSIsIm1haW4iLCJWdWUiLCJzdG9yZSIsInZ1ZXRpZnkiLCJyZW5kZXIiLCJoIiwiQXBwIiwiJG1vdW50IiwiYWRkRXZlbnQiLCJFdmVudEJ1cyIsIiRlbWl0Iiwic2VhcmNoUXVlcnkiLCJ1c2UiLCJWdWV0aWZ5IiwiaWNvbnMiLCJpY29uZm9udCIsIkNTVlRvQXJyYXkiLCJzdHJEYXRhIiwic3RyRGVsaW1pdGVyIiwib2JqUGF0dGVybiIsIlJlZ0V4cCIsImFyckRhdGEiLCJhcnJNYXRjaGVzIiwic3RyTWF0Y2hlZFZhbHVlIiwiZXhlYyIsInN0ck1hdGNoZWREZWxpbWl0ZXIiLCJsZW5ndGgiLCJwdXNoIiwicmVwbGFjZSIsIlZ1ZXgiLCJTdG9yZSIsInN0YXRlIiwibXV0YXRpb25zIiwiZ2V0dGVycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7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QUR5QjtBQUVoQ0MsV0FBUyxFQUFFLEVBRnFCO0FBR2hDQyxTQUFPLEVBQUU7QUFIdUIsQ0FBZixDQUFkLEMiLCJmaWxlIjoiMS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPHYtYXBwPlxuICAgICAgICA8di1jb250ZW50PlxuICAgICAgICAgICAgPCEtLSBoZWFkZXIgcHJvZ3Jlc3MgYmFyIC0tPlxuICAgICAgICAgICAgPHYtcHJvZ3Jlc3MtbGluZWFyXG4gICAgICAgICAgICAgICAgY29sb3I9XCJibHVlIGFjY2VudC00XCJcbiAgICAgICAgICAgICAgICBpbmRldGVybWluYXRlXG4gICAgICAgICAgICAgICAgaGVpZ2h0PVwiMTBcIlxuICAgICAgICAgICAgICAgIDphY3RpdmU9XCJsb2FkaW5nYmFyXCJcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVxuICAgICAgICAgICAgICAgIGFwcFxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPCEtLSB3aWRnZXQgbm90aWZhY3Rpb24gbW9kdWxlIC0tPlxuICAgICAgICAgICAgPHYtc25hY2tiYXIgdi1tb2RlbD1cInNuYWNrYmFyXCI+XG4gICAgICAgICAgICAgICAge3sgc25hY2tiYXJNc2cgfX1cbiAgICAgICAgICAgICAgICA8di1idG5cbiAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJncmV5XCJcbiAgICAgICAgICAgICAgICAgICAgdGV4dFxuICAgICAgICAgICAgICAgICAgICBAY2xpY2s9XCJzbmFja2JhciA9IGZhbHNlXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIENsb3NlXG4gICAgICAgICAgICAgICAgPC92LWJ0bj5cbiAgICAgICAgICAgIDwvdi1zbmFja2Jhcj5cblxuICAgICAgICAgICAgPHYtYnRuIEBjbGljaz1cImNvbm5lY3RzZXJ2ZXIoKVwiPiBDbGljayBtZSEgPC92LWJ0bj5cbiAgICAgICAgPC92LWNvbnRlbnQ+XG4gICAgPC92LWFwcD5cbjwvdGVtcGxhdGU+XG5cbjwhLS0gbm8gc2NvcGUgZm9yIGFwcC52dWUsIHN0eWxlIGRlZmluZWQgaGVyZSBpcyBnbG9iYWwgZm9yIHRoZSBhcHAgLS0+XG48c3R5bGU+XG5odG1sLCBib2R5IHtcbiAgICBvdmVyZmxvdy15OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMDtcbiAgICBtYXJnaW46IDA7XG4gICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmO1xufVxuPC9zdHlsZT5cblxuPHNjcmlwdD5cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCB7IEV2ZW50QnVzIH0gZnJvbSBcIi4uL3BsdWdpbnMvdnVldGlmeVwiO1xuaW1wb3J0IHsgQ1NWVG9BcnJheSB9IGZyb20gXCIuLi9wbHVnaW5zL3Z1ZXRpZnlcIjtcblxuZnVuY3Rpb24gaHR0cENhbGxBdXRoZW50aWNhdGVkKHVybCwgb3B0aW9ucykge1xuICAgIHJlcXVpcmVqcyhbXCJEUy9XQUZEYXRhL1dBRkRhdGFcIl0sIChXQUZEYXRhKSA9PiB7XG4gICAgICAgIFdBRkRhdGEuYXV0aGVudGljYXRlZFJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICAgIG5hbWU6IFwiQXBwXCIsXG5cbiAgICBjb21wb25lbnRzOiB7XG4gICAgfSxcblxuICAgIGRhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLy8gSGVscCB0aGUgdXNlciBrbm93IHNvbWV0aGluZyBpcyBsb2FkaW5nXG4gICAgICAgICAgICBsb2FkaW5nYmFyOiB0cnVlLFxuXG4gICAgICAgICAgICAvLyBVc2VkIHRvIGxvZyBpbmZvcm1hdGlvblxuICAgICAgICAgICAgc25hY2tiYXJNc2c6IFwiXCIsXG4gICAgICAgICAgICBzbmFja2JhcjogZmFsc2UsXG5cbiAgICAgICAgICAgIC8vIERhdGEgbG9hZGVkIGZyb20gRFMgYW5kIGZyb20gcHJlZmVyZW5jZXNcbiAgICAgICAgICAgIHRlbmFudElkOiAtMSxcbiAgICAgICAgICAgIHRlbmFudHM6IFtdXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXB1dGVkOiB7XG4gICAgICAgIG1lc3NhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLnN0YXRlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gQXMgc29vbiBhcyB3ZSBnZXQgbW91bnRlZCBzdGFydCBzZWFyY2hpbmcgdGhlIHRlbmFudCBsaXN0XG4gICAgbW91bnRlZDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCB0aGF0ID0gdGhpcztcblxuICAgICAgICB0aGF0LmxvYWRpbmdiYXIgPSB0cnVlO1xuXG4gICAgICAgIEV2ZW50QnVzLiRvbihcIm9uU2VhcmNoXCIsICh0eHQpID0+IHsgdGhhdC5zZWFyY2ggPSB0eHQ7IH0pO1xuICAgICAgICBFdmVudEJ1cy4kb24oXCJyZWxvYWR3aWRnZXRcIiwgKCkgPT4geyB0aGF0LnJlbG9hZCgpOyB9KTtcblxuICAgICAgICAvLyBTdGFydCBsb2FkaW5nIGJhciBhc3dlbGxcbiAgICAgICAgaWYgKHdpZGdldC5pZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgdGhhdC50ZW5hbnREYXRhTG9hZGVkKFt7IGlkOiAtMSB9XSk7IH0sIDUwMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXF1aXJlanMoW1wiRFMvaTNEWENvbXBhc3NTZXJ2aWNlcy9pM0RYQ29tcGFzc1NlcnZpY2VzXCJdLCBpM0RYQ29tcGFzc1NlcnZpY2VzID0+IHtcbiAgICAgICAgICAgICAgICBpM0RYQ29tcGFzc1NlcnZpY2VzLmdldFBsYXRmb3JtU2VydmljZXMoe1xuICAgICAgICAgICAgICAgICAgICBwbGF0Zm9ybUlkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IHRoaXMudGVuYW50RGF0YUxvYWRlZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBsb2cobXNnKSB7XG4gICAgICAgICAgICB0aGlzLnNuYWNrYmFyTXNnID0gbXNnO1xuICAgICAgICAgICAgdGhpcy5zbmFja2JhciA9IHRydWU7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0Q1NSRihvbkNvbXBsZXRlLCBvbkZhaWx1cmUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyBSZXRyaXZlIENTUkYgdGlja2V0XG4gICAgICAgICAgICBjb25zdCBfM2RzcGFjZSA9IHRoYXQudGVuYW50c1t0aGF0LnRlbmFudElkXVtcIjNEU3BhY2VcIl07XG4gICAgICAgICAgICBodHRwQ2FsbEF1dGhlbnRpY2F0ZWQoXzNkc3BhY2UgKyBcIi9yZXNvdXJjZXMvdjEvYXBwbGljYXRpb24vQ1NSRlwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9uQ29tcGxldGU6IChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBKU09OLnBhcnNlKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgb25Db21wbGV0ZShyZXMuY3NyZi52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIG9uRmFpbHVyZTogKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAgICAgb25GYWlsdXJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgcmVsb2FkKCkge1xuICAgICAgICAgICAgY29uc3QgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoYXQubG9hZGluZ2JhciA9IHRydWU7XG4gICAgICAgICAgICB0aGF0LnRlbmFudElkID0gd2lkZ2V0LmdldFZhbHVlKFwiX0N1cnJlbnRUZW5hbnRJRF9cIik7XG5cbiAgICAgICAgICAgIGlmICh3aWRnZXQuaWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIHVzZSBhbGwgdGhlIGFwaSBzdHVmZlxuICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ2JhciA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBzaW11bGF0ZSBzb21lIGRhdGEgc28gd2UgY2FuIHRlc3QgbG9jYWxseVxuICAgICAgICAgICAgICAgIHRoYXQubG9hZGluZ2JhciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIC8vIExvYWQgdGhlIHRlbmFudCBkYXRhICYgaXRzIHNlcnZpY2VzIFVSTHMgYmFzZWQgb24gdGhlIElEXG4gICAgICAgIHRlbmFudERhdGFMb2FkZWQoZGF0YSkge1xuICAgICAgICAgICAgdGhpcy50ZW5hbnRzID0gW107XG4gICAgICAgICAgICBjb25zdCBfVGVuYW50T3B0cyA9IFtdO1xuXG4gICAgICAgICAgICBsZXQgaiA9IDA7XG5cbiAgICAgICAgICAgIC8vIExvYWQgYWxsIHRoZSB0ZW5hbnRzXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YVtpXVtcIjNEU3BhY2VcIl0gPT09IHVuZGVmaW5lZCkgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICBfVGVuYW50T3B0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGAke2orK31gLFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7ZGF0YVtpXS5wbGF0Zm9ybUlkfSAtICR7ZGF0YVtpXS5kaXNwbGF5TmFtZX1gXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnRlbmFudHMucHVzaChkYXRhW2ldKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2V0dXAgeW91ciBwcmVmZXJlbmNlcy4uLlxuICAgICAgICAgICAgd2lkZ2V0LmFkZFByZWZlcmVuY2Uoe1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiX0N1cnJlbnRUZW5hbnRJRF9cIixcbiAgICAgICAgICAgICAgICB0eXBlOiBcImxpc3RcIixcbiAgICAgICAgICAgICAgICBsYWJlbDogXCJUZW5hbnRcIixcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWU6IFwiMFwiLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IF9UZW5hbnRPcHRzXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTG9hZHMgdGhlIHByZWZzIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgRXZlbnRCdXMuJGVtaXQoXCJyZWxvYWR3aWRnZXRcIik7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG48L3NjcmlwdD5cbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCIpKGZhbHNlKTtcbi8vIE1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiXFxuaHRtbCwgYm9keSB7XFxuICAgIG92ZXJmbG93LXk6IGF1dG8gIWltcG9ydGFudDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmO1xcbn1cXG5cIiwgXCJcIl0pO1xuIiwidmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9hcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIpO1xuXG5pZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbn1cblxudmFyIG9wdGlvbnMgPSB7fVxuXG5vcHRpb25zLmluc2VydCA9IFwiaGVhZFwiO1xub3B0aW9ucy5zaW5nbGV0b24gPSBmYWxzZTtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZiAoY29udGVudC5sb2NhbHMpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbn1cblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgaWYgKCFjb250ZW50LmxvY2Fscykge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFxuICAgICAgXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVldGlmeS1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIixcbiAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9hcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHVwZGF0ZShuZXdDb250ZW50KTtcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IFxuICAgIHVwZGF0ZSgpO1xuICB9KTtcbn0iLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFxuICAgIFwidi1hcHBcIixcbiAgICBbXG4gICAgICBfYyhcbiAgICAgICAgXCJ2LWNvbnRlbnRcIixcbiAgICAgICAgW1xuICAgICAgICAgIF9jKFwidi1wcm9ncmVzcy1saW5lYXJcIiwge1xuICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgY29sb3I6IFwiYmx1ZSBhY2NlbnQtNFwiLFxuICAgICAgICAgICAgICBpbmRldGVybWluYXRlOiBcIlwiLFxuICAgICAgICAgICAgICBoZWlnaHQ6IFwiMTBcIixcbiAgICAgICAgICAgICAgYWN0aXZlOiBfdm0ubG9hZGluZ2JhcixcbiAgICAgICAgICAgICAgYWJzb2x1dGU6IFwiXCIsXG4gICAgICAgICAgICAgIGFwcDogXCJcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgX2MoXG4gICAgICAgICAgICBcInYtc25hY2tiYXJcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnNuYWNrYmFyLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiBmdW5jdGlvbigkJHYpIHtcbiAgICAgICAgICAgICAgICAgIF92bS5zbmFja2JhciA9ICQkdlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJzbmFja2JhclwiXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgIF92bS5fdihcbiAgICAgICAgICAgICAgICBcIlxcbiAgICAgICAgICAgIFwiICsgX3ZtLl9zKF92bS5zbmFja2Jhck1zZykgKyBcIlxcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIF9jKFxuICAgICAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBhdHRyczogeyBjb2xvcjogXCJncmV5XCIsIHRleHQ6IFwiXCIgfSxcbiAgICAgICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsaWNrOiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBfdm0uc25hY2tiYXIgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBbX3ZtLl92KFwiXFxuICAgICAgICAgICAgICAgIENsb3NlXFxuICAgICAgICAgICAgXCIpXVxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMVxuICAgICAgICAgICksXG4gICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICBfYyhcbiAgICAgICAgICAgIFwidi1idG5cIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgb246IHtcbiAgICAgICAgICAgICAgICBjbGljazogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gX3ZtLmNvbm5lY3RzZXJ2ZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCIgQ2xpY2sgbWUhIFwiKV1cbiAgICAgICAgICApXG4gICAgICAgIF0sXG4gICAgICAgIDFcbiAgICAgIClcbiAgICBdLFxuICAgIDFcbiAgKVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vYXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02YzBhMGZjMSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9hcHAudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5pbXBvcnQgc3R5bGUwIGZyb20gXCIuL2FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIlxuXG5cbi8qIG5vcm1hbGl6ZSBjb21wb25lbnQgKi9cbmltcG9ydCBub3JtYWxpemVyIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3J1bnRpbWUvY29tcG9uZW50Tm9ybWFsaXplci5qc1wiXG52YXIgY29tcG9uZW50ID0gbm9ybWFsaXplcihcbiAgc2NyaXB0LFxuICByZW5kZXIsXG4gIHN0YXRpY1JlbmRlckZucyxcbiAgZmFsc2UsXG4gIG51bGwsXG4gIG51bGwsXG4gIG51bGxcbiAgXG4pXG5cbi8qIHZ1ZXRpZnktbG9hZGVyICovXG5pbXBvcnQgaW5zdGFsbENvbXBvbmVudHMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvdnVldGlmeS1sb2FkZXIvbGliL3J1bnRpbWUvaW5zdGFsbENvbXBvbmVudHMuanNcIlxuaW1wb3J0IHsgVkFwcCB9IGZyb20gJ3Z1ZXRpZnkvbGliL2NvbXBvbmVudHMvVkFwcCc7XG5pbXBvcnQgeyBWQnRuIH0gZnJvbSAndnVldGlmeS9saWIvY29tcG9uZW50cy9WQnRuJztcbmltcG9ydCB7IFZDb250ZW50IH0gZnJvbSAndnVldGlmeS9saWIvY29tcG9uZW50cy9WQ29udGVudCc7XG5pbXBvcnQgeyBWUHJvZ3Jlc3NMaW5lYXIgfSBmcm9tICd2dWV0aWZ5L2xpYi9jb21wb25lbnRzL1ZQcm9ncmVzc0xpbmVhcic7XG5pbXBvcnQgeyBWU25hY2tiYXIgfSBmcm9tICd2dWV0aWZ5L2xpYi9jb21wb25lbnRzL1ZTbmFja2Jhcic7XG5pbnN0YWxsQ29tcG9uZW50cyhjb21wb25lbnQsIHtWQXBwLFZCdG4sVkNvbnRlbnQsVlByb2dyZXNzTGluZWFyLFZTbmFja2Jhcn0pXG5cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCJEOlxcXFxSZXBvc2l0b3JpZXNcXFxcYmxlbm1pbmVyLmdpdGh1Yi5pb1xcXFx3aWRnZXRzXFxcXEZvcm1hdGlvblxcXFxub2RlX21vZHVsZXNcXFxcdnVlLWhvdC1yZWxvYWQtYXBpXFxcXGRpc3RcXFxcaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIWFwaS5pc1JlY29yZGVkKCc2YzBhMGZjMScpKSB7XG4gICAgICBhcGkuY3JlYXRlUmVjb3JkKCc2YzBhMGZjMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVsb2FkKCc2YzBhMGZjMScsIGNvbXBvbmVudC5vcHRpb25zKVxuICAgIH1cbiAgICBtb2R1bGUuaG90LmFjY2VwdChcIi4vYXBwLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD02YzBhMGZjMSZcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgYXBpLnJlcmVuZGVyKCc2YzBhMGZjMScsIHtcbiAgICAgICAgcmVuZGVyOiByZW5kZXIsXG4gICAgICAgIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cbmNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwic3JjL2NvbXBvbmVudHMvYXBwLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVldGlmeS1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMiEuLi8uLi9ub2RlX21vZHVsZXMvdnVldGlmeS1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2FwcC52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCIiLCJpbXBvcnQgbW9kIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9pbmRleC5qcyEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvbG9hZGVycy9zdHlsZVBvc3RMb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9hcHAudnVlP3Z1ZSZ0eXBlPXN0eWxlJmluZGV4PTAmbGFuZz1jc3MmXCI7IGV4cG9ydCBkZWZhdWx0IG1vZDsgZXhwb3J0ICogZnJvbSBcIi0hLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L2luZGV4LmpzIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3N0eWxlUG9zdExvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVldGlmeS1sb2FkZXIvbGliL2xvYWRlci5qcyEuLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL2FwcC52dWU/dnVlJnR5cGU9c3R5bGUmaW5kZXg9MCZsYW5nPWNzcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZXRpZnktbG9hZGVyL2xpYi9sb2FkZXIuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9hcHAudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTZjMGEwZmMxJlwiIiwiaW1wb3J0IHsgeDNERGFzaGJvYXJkVXRpbHMgfSBmcm9tIFwiLi9saWIvd2lkZ2V0XCI7XG5pbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBBcHAgZnJvbSBcIi4vY29tcG9uZW50cy9hcHAudnVlXCI7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWR1cGxpY2F0ZXNcbmltcG9ydCB2dWV0aWZ5IGZyb20gXCIuL3BsdWdpbnMvdnVldGlmeVwiO1xuaW1wb3J0IHsgc3RvcmUgfSBmcm9tIFwiLi9zdG9yZVwiO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWR1cGxpY2F0ZXNcbmltcG9ydCB7IEV2ZW50QnVzIH0gZnJvbSBcIi4vcGx1Z2lucy92dWV0aWZ5XCI7XG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIHgzRERhc2hib2FyZFV0aWxzLmRpc2FibGVDU1ModHJ1ZSk7XG5cbiAgICB3aW5kb3cudGl0bGUgPSBcIlRhYmx1ZSBWdWVcIjtcbiAgICB3aWRnZXQuc2V0VGl0bGUod2luZG93LnRpdGxlKTtcblxuICAgIGNvbnN0IG1haW4gPSBuZXcgVnVlKHtcbiAgICAgICAgc3RvcmUsXG4gICAgICAgIHZ1ZXRpZnksXG4gICAgICAgIHJlbmRlcjogaCA9PiBoKEFwcClcbiAgICB9KTtcblxuICAgIG1haW4uJG1vdW50KFwiYXBwXCIpO1xufVxuXG4vKipcbiAqIEVudHJ5IHBvaW50IGZvciBib3RoIHN0YW5kYWxvbmUgJiAzRERhc2hib2FyZCBtb2Rlc1xuICogQXNzdW1pbmcgd2lkZ2V0IG9iamVjdCBoYXMgYmVlbiBsb2FkZWQgdGhyb3VnaCB3aWRnZXQtc3RhcnRlciBtb2R1bGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgd2lkZ2V0LmFkZEV2ZW50KFwib25Mb2FkXCIsICgpID0+IHtcbiAgICAgICAgc3RhcnQoKTtcbiAgICB9KTtcblxuICAgIHdpZGdldC5hZGRFdmVudChcIm9uUmVmcmVzaFwiLCAoKSA9PiB7XG4gICAgICAgIEV2ZW50QnVzLiRlbWl0KFwicmVsb2Fkd2lkZ2V0XCIpO1xuICAgIH0pO1xuXG4gICAgd2lkZ2V0LmFkZEV2ZW50KFwib25TZWFyY2hcIiwgKHNlYXJjaFF1ZXJ5KSA9PiB7XG4gICAgICAgIEV2ZW50QnVzLiRlbWl0KFwib25TZWFyY2hcIiwgc2VhcmNoUXVlcnkpO1xuICAgIH0pO1xuXG4gICAgd2lkZ2V0LmFkZEV2ZW50KFwib25SZXNldFNlYXJjaFwiLCAoKSA9PiB7XG4gICAgICAgIEV2ZW50QnVzLiRlbWl0KFwib25TZWFyY2hcIiwgXCJcIik7XG4gICAgfSk7XG59XG4iLCJpbXBvcnQgVnVlIGZyb20gXCJ2dWVcIjtcbmltcG9ydCBWdWV0aWZ5IGZyb20gXCJ2dWV0aWZ5L2xpYlwiO1xuaW1wb3J0IFwiQG1kaS9mb250L2Nzcy9tYXRlcmlhbGRlc2lnbmljb25zLmNzc1wiO1xuaW1wb3J0IFwibWF0ZXJpYWwtZGVzaWduLWljb25zLWljb25mb250L2Rpc3QvbWF0ZXJpYWwtZGVzaWduLWljb25zLmNzc1wiO1xuXG5WdWUudXNlKFZ1ZXRpZnkpO1xuXG5leHBvcnQgY29uc3QgRXZlbnRCdXMgPSBuZXcgVnVlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IG5ldyBWdWV0aWZ5KHtcbiAgICBpY29uczoge1xuICAgICAgICBpY29uZm9udDogXCJtZGlcIlxuICAgIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gQ1NWVG9BcnJheShzdHJEYXRhLCBzdHJEZWxpbWl0ZXIpIHtcbiAgICBzdHJEZWxpbWl0ZXIgPSAoc3RyRGVsaW1pdGVyIHx8IFwiLFwiKTtcblxuICAgIGNvbnN0IG9ialBhdHRlcm4gPSBuZXcgUmVnRXhwKFxuICAgICAgICAoXG4gICAgICAgICAgICAvLyBEZWxpbWl0ZXJzLlxuICAgICAgICAgICAgXCIoXFxcXFwiICsgc3RyRGVsaW1pdGVyICsgXCJ8XFxcXHI/XFxcXG58XFxcXHJ8XilcIiArXG5cbiAgICAgICAgICAgIC8vIFF1b3RlZCBmaWVsZHMuXG4gICAgICAgICAgICBcIig/OlxcXCIoW15cXFwiXSooPzpcXFwiXFxcIlteXFxcIl0qKSopXFxcInxcIiArXG5cbiAgICAgICAgICAgIC8vIFN0YW5kYXJkIGZpZWxkcy5cbiAgICAgICAgICAgIFwiKFteXFxcIlxcXFxcIiArIHN0ckRlbGltaXRlciArIFwiXFxcXHJcXFxcbl0qKSlcIlxuICAgICAgICApLFxuICAgICAgICBcImdpXCJcbiAgICAgICAgKTtcblxuICAgIGNvbnN0IGFyckRhdGEgPSBbW11dO1xuICAgIGxldCBhcnJNYXRjaGVzID0gbnVsbDtcbiAgICBsZXQgc3RyTWF0Y2hlZFZhbHVlID0gbnVsbDtcblxuICAgIHdoaWxlICgoYXJyTWF0Y2hlcyA9IG9ialBhdHRlcm4uZXhlYyhzdHJEYXRhKSkpIHtcbiAgICAgICAgY29uc3Qgc3RyTWF0Y2hlZERlbGltaXRlciA9IGFyck1hdGNoZXNbMV07XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHN0ck1hdGNoZWREZWxpbWl0ZXIubGVuZ3RoICYmXG4gICAgICAgICAgICAoc3RyTWF0Y2hlZERlbGltaXRlciAhPT0gc3RyRGVsaW1pdGVyKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICBhcnJEYXRhLnB1c2goW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFyck1hdGNoZXNbMl0pIHtcbiAgICAgICAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbMl0ucmVwbGFjZShcbiAgICAgICAgICAgICAgICBuZXcgUmVnRXhwKFwiXFxcIlxcXCJcIiwgXCJnXCIpLFxuICAgICAgICAgICAgICAgIFwiXFxcIlwiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0ck1hdGNoZWRWYWx1ZSA9IGFyck1hdGNoZXNbM107XG4gICAgICAgIH1cblxuICAgICAgICBhcnJEYXRhW2FyckRhdGEubGVuZ3RoIC0gMV0ucHVzaChzdHJNYXRjaGVkVmFsdWUpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiB0aGUgcGFyc2VkIGRhdGEuXG4gICAgcmV0dXJuIChhcnJEYXRhKTtcbn1cbiIsImltcG9ydCBWdWUgZnJvbSBcInZ1ZVwiO1xuaW1wb3J0IFZ1ZXggZnJvbSBcInZ1ZXhcIjtcblxuVnVlLnVzZShWdWV4KTtcblxuLy8gaW5pdCBzdG9yZVxuZXhwb3J0IGNvbnN0IHN0b3JlID0gbmV3IFZ1ZXguU3RvcmUoe1xuICAgIHN0YXRlOiB7fSxcbiAgICBtdXRhdGlvbnM6IHt9LFxuICAgIGdldHRlcnM6IHt9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiIn0=