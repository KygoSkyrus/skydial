"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/page",{

/***/ "(app-pages-browser)/./app/page.js":
/*!*********************!*\
  !*** ./app/page.js ***!
  \*********************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n// import { useRouter } from 'next/navigation';\n// import Layout from './layout';\nfunction Home() {\n    _s();\n    const [roomId, setRoomId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    // const router = useRouter();\n    const handleJoinRoom = (e)=>{\n        e.preventDefault();\n    // router.push(`/room/${roomId}`);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"flex min-h-screen flex-col items-center justify-between p-24 \",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            div: true,\n            className: \"relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1] text-5xl font-bold \",\n            children: \"SKYDIAL\"\n        }, void 0, false, {\n            fileName: \"E:\\\\sky\\\\bloggingSite\\\\skydial\\\\app\\\\page.js\",\n            lineNumber: 44,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"E:\\\\sky\\\\bloggingSite\\\\skydial\\\\app\\\\page.js\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"7rRd7ryFXdanXC6PGPRYufpFY7Y=\");\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9wYWdlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQytCO0FBQ0Y7QUFDVztBQUN4QywrQ0FBK0M7QUFDL0MsaUNBQWlDO0FBRWxCLFNBQVNJOztJQUN0QixNQUFNLENBQUNDLFFBQVFDLFVBQVUsR0FBR0gsK0NBQVFBLENBQUM7SUFDckMsOEJBQThCO0lBRTlCLE1BQU1JLGlCQUFpQixDQUFDQztRQUN0QkEsRUFBRUMsY0FBYztJQUNoQixrQ0FBa0M7SUFDcEM7SUFDQSxxQkFDRSw4REFBQ0M7UUFBS0MsV0FBVTtrQkEyQmQsNEVBQUNDO1lBQUlBLEdBQUc7WUFBQ0QsV0FBVTtzQkFRWDs7Ozs7Ozs7Ozs7QUE4Q2Q7R0ExRndCUDtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9hcHAvcGFnZS5qcz9iZTY3Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiXHJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiO1xyXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCI7XHJcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcclxuLy8gaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcclxuLy8gaW1wb3J0IExheW91dCBmcm9tICcuL2xheW91dCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gIGNvbnN0IFtyb29tSWQsIHNldFJvb21JZF0gPSB1c2VTdGF0ZSgnJyk7XHJcbiAgLy8gY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZUpvaW5Sb29tID0gKGUpID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIHJvdXRlci5wdXNoKGAvcm9vbS8ke3Jvb21JZH1gKTtcclxuICB9O1xyXG4gIHJldHVybiAoXHJcbiAgICA8bWFpbiBjbGFzc05hbWU9XCJmbGV4IG1pbi1oLXNjcmVlbiBmbGV4LWNvbCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMjQgXCI+XHJcbiAgICAgIHsvKiA8ZGl2IGNsYXNzTmFtZT1cInotMTAgbWF4LXctNXhsIHctZnVsbCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGZvbnQtbW9ubyB0ZXh0LXNtIGxnOmZsZXhcIj5cclxuICAgICAgICA8cCBjbGFzc05hbWU9XCJmaXhlZCBsZWZ0LTAgdG9wLTAgZmxleCB3LWZ1bGwganVzdGlmeS1jZW50ZXIgYm9yZGVyLWIgYm9yZGVyLWdyYXktMzAwIGJnLWdyYWRpZW50LXRvLWIgZnJvbS16aW5jLTIwMCBwYi02IHB0LTggYmFja2Ryb3AtYmx1ci0yeGwgZGFyazpib3JkZXItbmV1dHJhbC04MDAgZGFyazpiZy16aW5jLTgwMC8zMCBkYXJrOmZyb20taW5oZXJpdCBsZzpzdGF0aWMgbGc6dy1hdXRvICBsZzpyb3VuZGVkLXhsIGxnOmJvcmRlciBsZzpiZy1ncmF5LTIwMCBsZzpwLTQgbGc6ZGFyazpiZy16aW5jLTgwMC8zMFwiPlxyXG4gICAgICAgICAgR2V0IHN0YXJ0ZWQgYnkgZWRpdGluZyB0ZXN0Jm5ic3A7XHJcbiAgICAgICAgICA8Y29kZSBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkXCI+YXBwL3BhZ2UuanM8L2NvZGU+XHJcbiAgICAgICAgPC9wPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZml4ZWQgYm90dG9tLTAgbGVmdC0wIGZsZXggaC00OCB3LWZ1bGwgaXRlbXMtZW5kIGp1c3RpZnktY2VudGVyIGJnLWdyYWRpZW50LXRvLXQgZnJvbS13aGl0ZSB2aWEtd2hpdGUgZGFyazpmcm9tLWJsYWNrIGRhcms6dmlhLWJsYWNrIGxnOnN0YXRpYyBsZzpoLWF1dG8gbGc6dy1hdXRvIGxnOmJnLW5vbmVcIj5cclxuICAgICAgICAgIDxhXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInBvaW50ZXItZXZlbnRzLW5vbmUgZmxleCBwbGFjZS1pdGVtcy1jZW50ZXIgZ2FwLTIgcC04IGxnOnBvaW50ZXItZXZlbnRzLWF1dG8gbGc6cC0wXCJcclxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vdmVyY2VsLmNvbT91dG1fc291cmNlPWNyZWF0ZS1uZXh0LWFwcCZ1dG1fbWVkaXVtPWFwcGRpci10ZW1wbGF0ZSZ1dG1fY2FtcGFpZ249Y3JlYXRlLW5leHQtYXBwXCJcclxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcclxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXHJcbiAgICAgICAgICA+XHJcbiAgICAgICAgICAgIFNLWUNIQVRcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxJbWFnZVxyXG4gICAgICAgICAgICAgIHNyYz1cIi92ZXJjZWwuc3ZnXCJcclxuICAgICAgICAgICAgICBhbHQ9XCJWZXJjZWwgTG9nb1wiXHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGFyazppbnZlcnRcIlxyXG4gICAgICAgICAgICAgIHdpZHRoPXsxMDB9XHJcbiAgICAgICAgICAgICAgaGVpZ2h0PXsyNH1cclxuICAgICAgICAgICAgICBwcmlvcml0eVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgPC9hPlxyXG4gICAgICAgIDwvZGl2ID5cclxuICAgICAgPC9kaXYgPiAgKi99XHJcblxyXG4gICAgICA8ZGl2IGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBmbGV4IHBsYWNlLWl0ZW1zLWNlbnRlciBiZWZvcmU6YWJzb2x1dGUgYmVmb3JlOmgtWzMwMHB4XSBiZWZvcmU6dy1mdWxsIHNtOmJlZm9yZTp3LVs0ODBweF0gYmVmb3JlOi10cmFuc2xhdGUteC0xLzIgYmVmb3JlOnJvdW5kZWQtZnVsbCBiZWZvcmU6YmctZ3JhZGllbnQtcmFkaWFsIGJlZm9yZTpmcm9tLXdoaXRlIGJlZm9yZTp0by10cmFuc3BhcmVudCBiZWZvcmU6Ymx1ci0yeGwgYmVmb3JlOmNvbnRlbnQtWycnXSBhZnRlcjphYnNvbHV0ZSBhZnRlcjotei0yMCBhZnRlcjpoLVsxODBweF0gYWZ0ZXI6dy1mdWxsIHNtOmFmdGVyOnctWzI0MHB4XSBhZnRlcjp0cmFuc2xhdGUteC0xLzMgYWZ0ZXI6YmctZ3JhZGllbnQtY29uaWMgYWZ0ZXI6ZnJvbS1za3ktMjAwIGFmdGVyOnZpYS1ibHVlLTIwMCBhZnRlcjpibHVyLTJ4bCBhZnRlcjpjb250ZW50LVsnJ10gYmVmb3JlOmRhcms6YmctZ3JhZGllbnQtdG8tYnIgYmVmb3JlOmRhcms6ZnJvbS10cmFuc3BhcmVudCBiZWZvcmU6ZGFyazp0by1ibHVlLTcwMCBiZWZvcmU6ZGFyazpvcGFjaXR5LTEwIGFmdGVyOmRhcms6ZnJvbS1za3ktOTAwIGFmdGVyOmRhcms6dmlhLVsjMDE0MWZmXSBhZnRlcjpkYXJrOm9wYWNpdHktNDAgYmVmb3JlOmxnOmgtWzM2MHB4XSB6LVstMV0gdGV4dC01eGwgZm9udC1ib2xkIFwiID5cclxuICAgICAgICB7LyogPEltYWdlXHJcbiAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZSBkYXJrOmRyb3Atc2hhZG93LVswXzBfMC4zcmVtXyNmZmZmZmY3MF0gZGFyazppbnZlcnRcIlxyXG4gICAgICAgICAgc3JjPVwiL25leHQuc3ZnXCJcclxuICAgICAgICAgIGFsdD1cIk5leHQuanMgTG9nb1wiXHJcbiAgICAgICAgICB3aWR0aD17MTgwfVxyXG4gICAgICAgICAgaGVpZ2h0PXszN31cclxuICAgICAgICAgIHByaW9yaXR5XHJcbiAgICAgICAgLz4gKi99XHJcbiAgICAgICAgU0tZRElBTFxyXG4gICAgICA8L2RpdiA+XHJcblxyXG4gICAgICB7LyogPGRpdj5cclxuICAgICAgICA8aDI+Sm9pbiBvciBDcmVhdGUgYSBWaWRlbyBDYWxsPC9oMj5cclxuICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlSm9pblJvb219PlxyXG4gICAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJSb29tIElEXCJcclxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ibGFja1wiXHJcbiAgICAgICAgICAgIHZhbHVlPXtyb29tSWR9XHJcbiAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0Um9vbUlkKGUudGFyZ2V0LnZhbHVlKX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIj5Kb2luPC9idXR0b24+XHJcbiAgICAgICAgPC9mb3JtPlxyXG4gICAgICA8L2Rpdj4gKi99XHJcblxyXG4gICAgICB7LyogPGRpdiBjbGFzc05hbWU9XCJtYi0zMiBncmlkIHRleHQtY2VudGVyIGxnOm1heC13LTV4bCBsZzp3LWZ1bGwgbGc6bWItMCBsZzpncmlkLWNvbHMtNCBsZzp0ZXh0LWxlZnRcIj5cclxuICAgICAgICA8YVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IHB4LTUgcHktNCB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjpib3JkZXItZ3JheS0zMDAgaG92ZXI6YmctZ3JheS0xMDAgZGFyazpib3JkZXItbmV1dHJhbC03MDAgaG92ZXI6ZGFyazpiZy1uZXV0cmFsLTgwMC8zMFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT17YG1iLTMgdGV4dC0yeGwgZm9udC1zZW1pYm9sZGB9PlxyXG4gICAgICAgICAgICBTdGFydCBjYWxsXHJcbiAgICAgICAgICA8L2gyPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJkaWFsIGlkXCIgY2xhc3NOYW1lPVwicm91bmRlZC1zbSBtYi0zXCIgLz5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17YG0tMCBtYXgtdy1bMzBjaF0gdGV4dC1zbSBvcGFjaXR5LTUwYH0+XHJcbiAgICAgICAgICAgIHlvdSBjYW4gaW52aXRlIHlvdXIgZnJpZW5kcyBhZnRlciB5b3Ugc3RhcnQgYSBjYWxsXHJcbiAgICAgICAgICA8L3A+XHJcbiAgICAgICAgPC9hPlxyXG5cclxuICAgICAgICA8YVxyXG4gICAgICAgICAgY2xhc3NOYW1lPVwiZ3JvdXAgcm91bmRlZC1sZyBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IHB4LTUgcHktNCB0cmFuc2l0aW9uLWNvbG9ycyBob3Zlcjpib3JkZXItZ3JheS0zMDAgaG92ZXI6YmctZ3JheS0xMDAgZGFyazpib3JkZXItbmV1dHJhbC03MDAgaG92ZXI6ZGFyazpiZy1uZXV0cmFsLTgwMC8zMFwiXHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgPGgyIGNsYXNzTmFtZT17YG1iLTMgdGV4dC0yeGwgZm9udC1zZW1pYm9sZGB9PlxyXG4gICAgICAgICAgICBKb2luIGNhbGxcclxuICAgICAgICAgIDwvaDI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cImRpYWwgaWRcIiBjbGFzc05hbWU9XCJyb3VuZGVkLXNtIG1iLTNcIiAvPlxyXG4gICAgICAgICAgPExpbmsgY2xhc3NOYW1lPVwiYm9yZGVyIHJvdW5kZWQgcHgtMyBweS0xXCIgaHJlZj1cIi9yb29tXCI+Sm9pbjwvTGluaz5cclxuICAgICAgICAgIDxwIGNsYXNzTmFtZT17YG0tMCBtYXgtdy1bMzBjaF0gdGV4dC1zbSBvcGFjaXR5LTUwYH0+XHJcbiAgICAgICAgICAgIGVudGVyIHRoZSBpZCB0byBqb2luIGEgY2FsbFxyXG4gICAgICAgICAgPC9wPlxyXG4gICAgICAgIDwvYT5cclxuICAgICAgPC9kaXY+ICovfVxyXG4gICAgPC9tYWluID5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJJbWFnZSIsIkxpbmsiLCJSZWFjdCIsInVzZVN0YXRlIiwiSG9tZSIsInJvb21JZCIsInNldFJvb21JZCIsImhhbmRsZUpvaW5Sb29tIiwiZSIsInByZXZlbnREZWZhdWx0IiwibWFpbiIsImNsYXNzTmFtZSIsImRpdiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/page.js\n"));

/***/ })

});